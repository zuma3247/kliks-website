import "./quantity-stepper.css";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  /** Used in the accessible names, e.g. "Decrease Kliks K3 quantity". */
  label?: string;
  min?: number;
  max?: number;
  className?: string;
};

export default function QuantityStepper({ value, onChange, label = "", min = 1, max = 99, className }: QuantityStepperProps) {
  const name = label ? `${label} quantity` : "quantity";
  return (
    <div className={["qty", className].filter(Boolean).join(" ")} role="group" aria-label={label ? `${label} quantity` : "Quantity"}>
      <button type="button" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Decrease ${name}`}><img src="/icons/checkout-minus.svg" alt="" aria-hidden="true" /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} aria-label={`Increase ${name}`}><img src="/icons/checkout-plus.svg" alt="" aria-hidden="true" /></button>
    </div>
  );
}
