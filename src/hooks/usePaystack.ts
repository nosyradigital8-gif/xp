// src/hooks/usePaystack.ts
//
// Drop-in replacement for react-paystack that uses Paystack's own
// inline JS directly — no peer-dependency conflicts, no duplicate React.

export interface PaystackOptions {
  key: string;              // your Paystack public key
  email: string;
  amount: number;           // in KOBO (multiply NGN by 100)
  currency?: string;        // 'NGN' (default) | 'GHS' | 'USD' | 'ZAR'
  ref?: string;             // auto-generated if omitted
  metadata?: Record<string, unknown>;
  onSuccess: (reference: { reference: string; status: string }) => void;
  onClose: () => void;
}

// Extend window type for Paystack
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }
    const existing = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
}

function generateRef(): string {
  return `xpola_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
}

/**
 * usePaystack — returns an `initializePayment` function.
 *
 * Usage:
 *   const initializePayment = usePaystack(options);
 *   <button onClick={() => initializePayment()}>Pay</button>
 */
export function usePaystack(options: PaystackOptions) {
  const initializePayment = async () => {
    try {
      await loadPaystackScript();

      const handler = window.PaystackPop.setup({
        key: options.key,
        email: options.email,
        amount: options.amount,          // already in kobo
        currency: options.currency ?? 'NGN',
        ref: options.ref ?? generateRef(),
        metadata: options.metadata ?? {},
        callback: options.onSuccess,
        onClose: options.onClose,
      });

      handler.openIframe();
    } catch (err) {
      console.error('Paystack initialization error:', err);
    }
  };

  return initializePayment;
}
