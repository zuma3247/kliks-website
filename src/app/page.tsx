"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Button from "../components/Button";
import CarouselArrows from "../components/CarouselArrows";
import QuantityStepper from "../components/QuantityStepper";
import "./home.css";

// The /next entry exports an async Server Component. Home is a Client Component,
// so load Spline's client entry instead.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false, loading: () => <img className="home-spline-poster" src="/images/kliks-3d-model.png" alt="Kliks 3D keyboard model" /> });
const SCENE = "https://prod.spline.design/K-uAyHz9OO1HvfNc/scene.splinecode";

type Product = { id: string; name: string; detail: string; price: number; rating: string; image: string; limited?: boolean };
const products: Product[] = [
  { id:"k3", name:"Kliks K3", detail:"Full-size comfort for every day", price:169, rating:"4.9 (214)", image:"/images/kliks-k3.png", limited:true },
  { id:"k2", name:"Kliks K2", detail:"TKL feel, more desk space", price:149, rating:"4.6 (86)", image:"/images/kliks-k2.png", limited:true },
  { id:"k4", name:"Kliks K4", detail:"A slim, compact favorite", price:119, rating:"4.7 (93)", image:"/images/kliks-k4.png", limited:true },
  { id:"k5", name:"Kliks K5", detail:"Color that brightens your desk", price:139, rating:"NEW ARRIVAL", image:"/images/kliks-k5.png" },
  { id:"k6", name:"Kliks K6", detail:"Full-size typing in graphite", price:159, rating:"NEW ARRIVAL", image:"/images/kliks-k6.png" },
  { id:"k7", name:"Kliks K7", detail:"Your new everyday companion", price:129, rating:"NEW ARRIVAL", image:"/images/kliks-k7.png" },
];
const discovery = [
  { title:"Sound", copy:"Quiet, clicky, or somewhere in between?", image:"/images/discovery-sound.png" },
  { title:"Feel", copy:"Light, tactile, or heavy?", image:"/images/discovery-feel-1.png" },
  { title:"Size", copy:"60%, 75%, TKL, or full-size?", image:"/images/discovery-size.png" },
  { title:"Use", copy:"Work, gaming, coding, or creating?", image:"/images/discovery-use.png" },
];
const switches = [
  {letter:"L",name:"Linear",description:"Smooth and consistent. No bump, just a clean keystroke.",frequency:290,color:"linear"},
  {letter:"T",name:"Tactile",description:"A subtle bump you can feel with each press.",frequency:230,color:"tactile"},
  {letter:"C",name:"Clicky",description:"A distinct, audible click with each press.",frequency:440,color:"clicky"},
];

function playSwitch(frequency:number) {
  try {
    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * .45, context.currentTime + .07);
    gain.gain.setValueAtTime(.045, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .08);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + .085);
    oscillator.onended = () => void context.close();
  } catch { /* Audio preview is optional if blocked by the browser. */ }
}

function addToCart(product:Product, quantity:number, options:string) {
  type CartItem = {id:string;name:string;price:number;image?:string;options?:string;quantity:number};
  let cart:CartItem[] = [];
  try { cart = JSON.parse(localStorage.getItem("kliks-cart-v1") || "[]"); if (!Array.isArray(cart)) cart = []; } catch { cart = []; }
  const id = `${product.id}-${options.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += quantity;
  else cart.push({id,name:product.name,price:product.price,image:product.image,options,quantity});
  localStorage.setItem("kliks-cart-v1", JSON.stringify(cart));
  window.dispatchEvent(new Event("kliks-cart-updated"));
}

export default function Home() {
  const [active, setActive] = useState<Product | null>(null);
  const [color, setColor] = useState("Onyx");
  const [switchType, setSwitchType] = useState("Linear");
  const [quantity, setQuantity] = useState(1);
  const [gallery, setGallery] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Spline cancels wheel events on its canvas to zoom the camera. Stop them at the
  // wrapper (capture phase) so they never reach the canvas and the page scrolls normally.
  // The scene's HTML-content iframe sits on top and swallows real wheel input, re-sending
  // it to the canvas as a synthetic event, so scroll the page ourselves for those.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const blockWheel = (event: WheelEvent) => {
      event.stopPropagation();
      if (event.isTrusted) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      window.scrollBy({ top: event.deltaY * unit, behavior: "instant" });
    };
    // Taps and hover reach the scene, but while a button/finger is down the movement is
    // swallowed so a press-and-drag can never orbit the camera into odd angles.
    const blockDrag = (event: Event) => {
      if (event instanceof PointerEvent || event instanceof MouseEvent) { if (event.buttons === 0) return; }
      event.stopPropagation();
    };
    const dragEvents = ["pointermove", "mousemove", "touchmove"] as const;
    scene.addEventListener("wheel", blockWheel, { capture: true, passive: true });
    dragEvents.forEach(name => scene.addEventListener(name, blockDrag, { capture: true, passive: true }));
    return () => {
      scene.removeEventListener("wheel", blockWheel, { capture: true });
      dragEvents.forEach(name => scene.removeEventListener(name, blockDrag, { capture: true }));
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSceneEnabled(!reduceMotion && !(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData);
    if (reduceMotion) return;
    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(".home-hero-inner")?.style.setProperty("--hero-scroll", `${Math.min(window.scrollY, 750)}px`);
      });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => { window.removeEventListener("scroll", updateParallax); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      const sound = switches.find(item => item.letter.toLowerCase() === event.key.toLowerCase());
      if (!sound) return;
      setPressedKey(sound.letter);
      playSwitch(sound.frequency);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (["l", "t", "c"].includes(event.key.toLowerCase())) setPressedKey(null);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("keyup", onKeyUp); };
  }, []);
  useEffect(() => { if (active) requestAnimationFrame(() => { detailRef.current?.scrollIntoView({behavior:"smooth",block:"center"}); detailRef.current?.focus({preventScroll:true}); }); }, [active]);

  function openProduct(product:Product, trigger:HTMLButtonElement) { triggerRef.current=trigger; setActive(product); setColor("Onyx"); setSwitchType("Linear"); setQuantity(1); setGallery(0); setAdded(false); }
  function closeProduct() { setActive(null); requestAnimationFrame(() => triggerRef.current?.focus()); }
  function toggleFavorite(id:string) { setFavorites(current => current.includes(id) ? current.filter(value => value!==id) : [...current,id]); }
  const galleryImages = active?.id === "k3" ? ["/images/kliks-k3-view-1.png","/images/kliks-k3-view-2.png","/images/kliks-k3-view-3.png","/images/kliks-k3-view-4.png","/images/kliks-k3-view-5.png"] : active ? [active.image] : [];

  return <><SiteHeader/><main className="home">
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-inner">
        <div className="home-wordmark" aria-hidden>KLIKS</div>
        <div className="home-scene" ref={sceneRef} aria-label="Interactive 3D keyboard">
          {sceneEnabled ? <Spline scene={SCENE} onLoad={app => app.setBackgroundColor("rgba(255,255,255,0)")} /> : <img className="home-spline-poster" src="/images/kliks-3d-model.png" alt="Kliks 3D keyboard model"/>}
        </div>
        <div className="home-hero-copy"><h1 id="home-title">Find a keyboard you&apos;ll love clicking.</h1><p>We&apos;ll help you understand switches, sounds, layouts, and everything else you need to choose the right keyboard.</p></div>
        <div className="home-hero-actions"><Button variant="primary" icon="trailing" href="/coming-soon?from=Find%20Your%20Keyboard">Find my keyboard</Button><Button variant="secondary" size="large" href="/learn">Learn the basics</Button></div>
      </div>
    </section>
    <section className="home-discovery" aria-labelledby="discovery-title"><div className="home-section-heading"><h2 id="discovery-title">What makes a keyboard right for you?</h2><p>Start with what matters most, and we&apos;ll guide you from there.</p></div><div className="home-discovery-grid">{discovery.map(item => <Link href="/learn#start-here" className="home-discovery-card" key={item.title}><img src={item.image} alt=""/><div className="home-discovery-shade"/><div className="home-discovery-copy"><h3>{item.title}</h3><p>{item.copy}</p><span>Explore&nbsp; <img className="home-icon" src="/icons/arrow-right.svg" alt="" /></span></div></Link>)}</div></section>
    <section className="home-sounds" id="hear-the-difference" aria-labelledby="sounds-title"><div className="home-sounds-inner"><div className="home-sounds-heading"><h2 id="sounds-title">Hear the difference.</h2><p>Tap a key here, or press L, T, or C on your keyboard to hear each switch.</p></div><div className="home-switches">{switches.map(item => <div className="home-switch" key={item.name}><button type="button" className={`home-keycap home-keycap-${item.color}${pressedKey===item.letter?" is-pressed":""}`} onClick={() => playSwitch(item.frequency)} onPointerDown={() => setPressedKey(item.letter)} onPointerUp={() => setPressedKey(null)} onPointerCancel={() => setPressedKey(null)} onBlur={() => setPressedKey(null)} aria-label={`Play ${item.name} switch demo sound`}>{item.letter}</button><div><h3>{item.name}</h3><p>{item.description}</p></div></div>)}</div></div></section>
    <section className="home-favorites" aria-labelledby="favorites-title"><div className="home-section-heading"><h2 id="favorites-title">Meet our favorites</h2><p>Thoughtful builds, great feel, and a sound you&apos;ll love.</p></div><div className="home-carousel" ref={carouselRef}>{products.map(product => <article className="home-product" key={product.id}><div className="home-product-media"><button className="home-product-open" type="button" onClick={event=>openProduct(product,event.currentTarget)} aria-label={`View ${product.name} details`}><img src={product.image} alt={`${product.name} mechanical keyboard`}/></button>{product.limited && <span className="home-product-badge">Limited edition</span>}<button className={favorites.includes(product.id) ? "home-favorite is-favorite" : "home-favorite"} type="button" onClick={()=>toggleFavorite(product.id)} aria-label={`${favorites.includes(product.id)?"Remove":"Add"} ${product.name} ${favorites.includes(product.id)?"from":"to"} wishlist`}><img src={favorites.includes(product.id)?"/icons/heart-filled.svg":"/icons/heart.svg"} alt="" /></button></div><div className="home-product-info"><button className="home-product-name" type="button" onClick={event=>openProduct(product,event.currentTarget)}>{product.name}</button><p>{product.detail}</p><span className="home-product-rating">{product.rating.startsWith("NEW") ? product.rating : <><img src="/icons/five-stars.svg" alt="5 stars" /> {product.rating}</>}</span><div className="home-product-bottom"><strong>${product.price}</strong><button type="button" className="home-quick-add" onClick={event=>openProduct(product,event.currentTarget)} aria-label={`Choose options for ${product.name}`}><img src="/icons/shopping-bag.svg" alt="" /></button></div></div></article>)}</div><CarouselArrows className="home-carousel-controls" previousLabel="Previous keyboards" nextLabel="Next keyboards" onPrevious={()=>carouselRef.current?.scrollBy({left:-364,behavior:"smooth"})} onNext={()=>carouselRef.current?.scrollBy({left:364,behavior:"smooth"})}/>
      {active && <div className="home-product-detail" ref={detailRef} tabIndex={-1} aria-label={`${active.name} details`}><button type="button" className="home-detail-close" onClick={closeProduct} aria-label="Close product details"><img src="/icons/close.svg" alt="" /></button><div className="home-detail-gallery"><div className="home-detail-image"><img src={galleryImages[gallery]} alt={`${active.name} view ${gallery+1}`}/>{active.limited && <span className="home-product-badge">Limited edition</span>}</div><div className="home-detail-thumbs">{galleryImages.map((src,index)=><button type="button" key={src} className={gallery===index?"is-selected":""} onClick={()=>setGallery(index)} aria-label={`Show ${active.name} view ${index+1}`}><img src={src} alt=""/></button>)}</div></div><div className="home-detail-copy"><span className="home-detail-eyebrow">{active.limited?"Limited edition":"Keyboard collection"}</span><h3>{active.name}</h3><p className="home-detail-subtitle">100% Mechanical Keyboard</p><p className="home-detail-rating"><img src="/icons/five-stars.svg" alt="5 stars" /> {active.rating.startsWith("NEW")?"4.9 (214)":active.rating}</p><strong className="home-detail-price">${active.price}</strong><p className="home-detail-description">A full-size keyboard designed for smooth typing, premium materials, and vibrant RGB lighting.</p><div className="home-detail-field"><span>Colorway</span><div className="home-colors">{[["Onyx","#10232e"],["Violet","#5a4674"],["Lavender","#ab78c8"],["Rose","#da8da3"]].map(([name,value])=><button type="button" key={name} className={color===name?"is-selected":""} style={{background:value}} onClick={()=>setColor(name)} aria-label={`${name} colorway`} aria-pressed={color===name}/>)}</div></div><div className="home-detail-field"><span>Switch Type</span><div className="home-switch-select">{["Linear","Tactile","Clicky"].map(type=><button key={type} type="button" className={switchType===type?"is-selected":""} onClick={()=>setSwitchType(type)} aria-pressed={switchType===type}>{type}</button>)}</div></div><div className="home-detail-buy"><QuantityStepper className="home-quantity" value={quantity} onChange={setQuantity}/><button type="button" className="home-add-cart" onClick={()=>{addToCart(active,quantity,`${color} · ${switchType}`);setAdded(true)}}>{added?<><span>Added to cart</span><img src="/icons/check.svg" alt="" /></>:"Add to cart"}</button></div><button type="button" className="home-detail-wishlist" onClick={()=>toggleFavorite(active.id)}><img src={favorites.includes(active.id)?"/icons/heart-filled.svg":"/icons/heart.svg"} alt="" /> {favorites.includes(active.id)?"Added to wishlist":"Add to wishlist"}</button>{added && <Link href="/checkout" className="home-view-checkout">View demo checkout <img className="home-icon" src="/icons/arrow-right.svg" alt="" /></Link>}</div></div>}
      <Button variant="secondary" size="large" href="/coming-soon?from=Shop" className="home-see-more">See more keyboards</Button>
    </section>
    <section className="home-learn-cta"><h2>Find out what makes a keyboard click for you.</h2><p>Explore switches, sounds, and layouts so you can choose your next keyboard with confidence.</p><Button variant="secondary" size="large" href="/learn">Learn the basics</Button></section>
  </main><SiteFooter/></>;
}
