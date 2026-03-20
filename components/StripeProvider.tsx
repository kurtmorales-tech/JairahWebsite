
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe((process.env as any).STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret: string | null;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children, clientSecret }) => {
  if (!clientSecret) return <>{children}</>;

  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#c4a484', // Matching the braid-primary color
            colorBackground: '#1a1a1a',
            colorText: '#ffffff',
            borderRadius: '24px',
          }
        }
      }}
    >
      {children}
    </Elements>
  );
};
