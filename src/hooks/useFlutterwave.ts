// FILE PATH: src/hooks/useFlutterwave.ts

interface FlutterwaveOptions {
  amount: number;
  currency: 'NGN' | 'CAD';
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  ref: string;
  meta?: Record<string, string>;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (options: Record<string, unknown>) => void;
  }
}

const loadFlutterwaveScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.FlutterwaveCheckout) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Flutterwave script'));
    document.head.appendChild(script);
  });
};

export const useFlutterwave = (options: FlutterwaveOptions) => {
  const initializePayment = async () => {
    try {
      await loadFlutterwaveScript();

      window.FlutterwaveCheckout({
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-your-key-here',
        tx_ref:     options.ref,
        amount:     options.amount,
        currency:   options.currency,
        payment_options: options.currency === 'NGN'
          ? 'card, banktransfer, ussd'
          : 'card',
        customer: {
          email:       options.customerEmail,
          name:        options.customerName,
          phonenumber: options.customerPhone,
        },
        meta: options.meta || {},
        customizations: {
          title:       'Xpola Store',
          description: `Order payment - ${options.currency}`,
          logo:        '/logo.png',
        },
        callback: (response: { status: string; transaction_id: string; tx_ref: string }) => {
          if (response.status === 'successful') {
            options.onSuccess(response.transaction_id.toString());
          }
        },
        onclose: options.onClose,
      });
    } catch (err) {
      console.error('Flutterwave error:', err);
      alert('Payment system failed to load. Please check your connection and try again.');
    }
  };

  return initializePayment;
};
