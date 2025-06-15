import { useState } from "react";
import { stripePromise } from "../lib/stripe";

interface FeatureButtonProps {
  eventId: string;
}

export default function FeatureButton({ eventId }: FeatureButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/feature-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        setError("Stripe failed to load");
      }
    } catch (err: any) {
      setError(err.message || "Error starting checkout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="mt-2 px-4 py-2 rounded bg-yellow-400 text-yellow-900 font-bold hover:bg-yellow-300 disabled:opacity-50"
    >
      {loading ? "Redirecting…" : "Feature for 24h ($10)"}
      {error && <span className="block text-red-500 text-xs mt-1">{error}</span>}
    </button>
  );
}
