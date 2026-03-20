
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './Button';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  amount: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      setErrorMessage('Payment failed or is still processing.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/40 dark:bg-white/5 p-6 rounded-[2rem] border border-braid-primary/10">
        <PaymentElement 
          options={{
            layout: 'tabs',
            theme: 'night', // or custom
          }} 
        />
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm"
          >
            <AlertCircle size={18} />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-braid-muted py-2">
        <ShieldCheck size={14} className="text-braid-primary" />
        Secure 256-bit SSL Encrypted Payment
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="flex-1 h-14"
        >
          {isProcessing ? 'Processing Ritual...' : `Reserve for $${amount / 100}`}
        </Button>
      </div>
    </form>
  );
};
