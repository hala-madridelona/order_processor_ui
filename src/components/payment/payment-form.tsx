'use client';

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

let stripe: any;
const getStripe = () => {
    if (!stripe) {
        stripe = typeof window != 'undefined' && window.Stripe && window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    }
    return stripe;
}


export const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
    const elementsRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!clientSecret){
            return;
        }

        const appearance = {
            theme: 'stripe'
        };

        const stripe = getStripe();
        const elements = stripe.elements({ appearance, clientSecret });
        elementsRef.current = elements;
        const paymentElementOptions = {
            layout: 'accordion'
        };

        const paymentElement = elements.create("payment", paymentElementOptions);
        paymentElement.mount('#payment-element');

    }, [clientSecret])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const stripe = getStripe();
        const { error } = await stripe.confirmPayment({
           elements: elementsRef.current,
           confirmParams: {
            return_url: "http://localhost:3001"
           }
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setLoading(false);
    }

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <div id="payment-element">
                </div>
                <button id="submit">
                <div className="spinner hidden" id="spinner"></div>
                <span id="button-text">Pay now</span>
                </button>
                <div id="payment-message" className="hidden"></div>
            </form>
            <div>
                <h2>Status</h2>
                {loading && <Loader2 />}
                {message && <span>{message}</span>}
            </div>
        </div>
    )
}