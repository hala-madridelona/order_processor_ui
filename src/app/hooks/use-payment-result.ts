
'use client';

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

let stripe: any;
const getStripe = () => {
    if (!stripe) {
        stripe = typeof window != 'undefined' && window.Stripe && window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    }
    return stripe;
}

export const usePaymentResult = () => {
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState("");
    const router = useRouter();

    const clientSecret = searchParams.get(
        "payment_intent_client_secret"
    )

    useEffect(() => {
        if (!clientSecret){
            return;
        }

        (async () => {
            try {
                const stripe = getStripe();
                const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret); 
                setPaymentStatus(paymentIntent.status);
                toast.success("Payment Successful. Redirecting to home page");
                setTimeout(() => {
                    router.replace('/');
                }, 1000)
            } catch (error) {
                console.error('Trouble consolidating payment status => ', error);
            }   
        })();

    }, [clientSecret])

    
    return null;
}