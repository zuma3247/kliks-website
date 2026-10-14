"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import QuantityStepper from "@/components/QuantityStepper";
import { useEffect, useState } from "react";
import "./checkout.css";

const CART_KEY = "kliks-cart-v1";
const DEMO_MESSAGE = "This is a demo payment; it does not process charges.";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  options?: string;
  quantity: number;
};

const recommendations: CartItem[] = [
  { id: "ocean-keycaps", name: "Ocean Keycap Set", price: 49, quantity: 1 },
  { id: "coiled-usb-cable", name: "Coiled USB-C Cable", price: 29, quantity: 1 },
];

function readCart(): CartItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter((item): item is CartItem =>
      item && typeof item.id === "string" && typeof item.name === "string" &&
      typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0 &&
      typeof item.quantity === "number" && Number.isFinite(item.quantity) && item.quantity > 0
    ).map(item => ({
      ...item,
      image: typeof item.image === "string" ? item.image.replace(/\.(?:png|jpe?g)(?=$|[?#])/i, ".webp") : item.image,
      quantity: Math.min(99, Math.floor(item.quantity)),
    }));
  } catch {
    return [];
  }
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");
  const [billing, setBilling] = useState<"same" | "different">("same");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });

  useEffect(() => {
    setCart(readCart());
    setReady(true);
    const syncCart = () => setCart(readCart());
    window.addEventListener("storage", syncCart);
    window.addEventListener("kliks-cart-updated", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("kliks-cart-updated", syncCart);
    };
  }, []);

  function updateCart(next: CartItem[]) {
    setCart(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("kliks-cart-updated"));
  }

  function changeQuantity(id: string, delta: number) {
    updateCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, Math.min(99, item.quantity + delta)) } : item));
  }

  function addRecommendation(item: CartItem) {
    const existing = cart.find(entry => entry.id === item.id);
    updateCart(existing
      ? cart.map(entry => entry.id === item.id ? { ...entry, quantity: Math.min(99, entry.quantity + 1) } : entry)
      : [...cart, item]);
  }

  function addAllRecommendations() {
    const next = [...cart];
    for (const item of recommendations) {
      const existing = next.find(entry => entry.id === item.id);
      if (existing) existing.quantity = Math.min(99, existing.quantity + 1);
      else next.push({ ...item });
    }
    updateCart(next);
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.075 * 100) / 100;
  const total = subtotal + tax;

  return <main className="checkout-page">
    <div className="checkout-shell">
      <header className="checkout-header">
        <Logo />
        <div className="checkout-desktop-progress" aria-label="Demo checkout step 2 of 3: Payment">
          <div className="checkout-step"><span>1</span><small>Shipping</small></div>
          <div className="checkout-step active"><span>2</span><small>Payment</small></div>
          <div className="checkout-step"><span>3</span><small>Review</small></div>
        </div>
        <span className="checkout-mobile-step">2 / 3 · PAYMENT</span>
        <div className="checkout-mobile-progress" aria-hidden="true"><i /><i /><i /></div>
      </header>

      <div className="checkout-grid">
        <section className="checkout-summary" aria-labelledby="checkout-heading">
          <div className="checkout-intro">
            <h1 id="checkout-heading">Complete your order</h1>
            <p>Almost there! Review your items and choose a payment method.</p>
            <p className="checkout-demo-label">UI/UX class demo · No purchase will be made</p>
          </div>

          {!ready ? <p className="checkout-empty">Loading your demo cart…</p> : cart.length === 0 ?
            <div className="checkout-empty"><h2>Your cart is empty</h2><p>Choose a keyboard on Home to see it here.</p><Link href="/">Explore keyboards <img className="checkout-arrow" src="/learn/arrow-forward.svg" alt="" aria-hidden="true" /></Link></div> :
            <div className="checkout-items">{cart.map(item => <article className="checkout-item" key={item.id}>
              <div className="checkout-item-image">{item.image ? <img src={item.image} alt="" /> : <span>PRODUCT<br />IMAGE</span>}</div>
              <div className="checkout-item-body">
                <div className="checkout-item-top"><h2>{item.name}</h2><button type="button" className="checkout-remove" onClick={() => updateCart(cart.filter(entry => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>Remove</button></div>
                <p className="checkout-item-options">{item.options || "Demo keyboard"}</p>
                <div className="checkout-item-bottom"><strong>{money(item.price)}</strong><QuantityStepper className="checkout-quantity" label={item.name} value={item.quantity} onChange={next => changeQuantity(item.id, next - item.quantity)} /></div>
              </div>
            </article>)}</div>}

          <div className="checkout-recommendation-heading"><h2>You might also like</h2><button type="button" onClick={addAllRecommendations}>Add to order <img className="checkout-arrow" src="/learn/arrow-forward.svg" alt="" aria-hidden="true" /></button></div>
          <div className="checkout-recommendations">{recommendations.map(item => <article className="checkout-recommendation" key={item.id}>
            <div className="checkout-recommendation-image">MEDIA</div>
            <div className="checkout-recommendation-body"><h3>{item.name}</h3><div><strong>{money(item.price)}</strong><button type="button" onClick={() => addRecommendation(item)}>Add</button></div></div>
          </article>)}</div>

          <div className="checkout-totals" aria-label="Demo order totals">
            <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div><span>Shipping</span><span>{money(0)}</span></div>
            <div><span>Estimated tax</span><span>{money(tax)}</span></div>
            <div className="checkout-total"><strong>Total</strong><strong>{money(total)}</strong></div>
          </div>
          <div className="checkout-shipping"><img className="checkout-truck" src="/icons/checkout-truck.svg" alt="" aria-hidden="true" /><div><strong>Free shipping</strong><span>You&apos;re eligible for free standard shipping.</span></div></div>
        </section>

        <section className="checkout-payment" aria-labelledby="payment-heading">
          <h2 id="payment-heading">Payment method</h2>
          <p className="checkout-payment-note">Demo form only. Entered details stay in this page and are never submitted.</p>
          <div className="checkout-wallets"><button className="apple" type="button" onClick={() => setDemoMessage(DEMO_MESSAGE)}>Apple Pay</button><button type="button" onClick={() => setDemoMessage(DEMO_MESSAGE)}>Google Pay</button><button className="link" type="button" onClick={() => setDemoMessage(DEMO_MESSAGE)}>Link</button></div>
          <div className="checkout-divider"><span>or pay with card</span></div>
          <div className="checkout-field"><label htmlFor="demo-card-number">Card number</label><input id="demo-card-number" inputMode="numeric" autoComplete="off" placeholder="1234 1234 1234 1234" value={card.number} onChange={event => setCard({ ...card, number: event.target.value })} /></div>
          <div className="checkout-card-brands" aria-hidden="true"><span>VISA</span><span>Mastercard</span><span>AMEX</span><span>Discover</span></div>
          <div className="checkout-field-row"><div className="checkout-field"><label htmlFor="demo-expiry">Expiration date</label><input id="demo-expiry" inputMode="numeric" autoComplete="off" placeholder="MM / YY" value={card.expiry} onChange={event => setCard({ ...card, expiry: event.target.value })} /></div><div className="checkout-field"><label htmlFor="demo-cvc">Security code</label><input id="demo-cvc" inputMode="numeric" autoComplete="off" placeholder="CVC" value={card.cvc} onChange={event => setCard({ ...card, cvc: event.target.value })} /></div></div>
          <div className="checkout-field"><label htmlFor="demo-card-name">Name on card</label><input id="demo-card-name" autoComplete="off" placeholder="John Doe" value={card.name} onChange={event => setCard({ ...card, name: event.target.value })} /></div>
          <h3 className="checkout-billing-heading">Billing address</h3>
          <label className={`checkout-billing-choice ${billing === "same" ? "selected" : ""}`}><input type="radio" name="billing" checked={billing === "same"} onChange={() => setBilling("same")} />Same as shipping address</label>
          <label className={`checkout-billing-choice ${billing === "different" ? "selected" : ""}`}><input type="radio" name="billing" checked={billing === "different"} onChange={() => setBilling("different")} />Use a different billing address</label>
          <label className="checkout-save"><input type="checkbox" defaultChecked /><span>Save my information for faster checkout with Link <small>Demo only; no information is saved.</small></span></label>
          <Button variant="primary" icon="trailing" fullWidth onClick={() => setDemoMessage(DEMO_MESSAGE)}>Review order</Button>
          {demoMessage && <p className="checkout-demo-message" role="status">{demoMessage}</p>}
          <p className="checkout-legal">Prototype checkout for a UI/UX class project. No order is placed.</p>
        </section>
      </div>
    </div>
  </main>;
}
