'use client';

import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useCallback, useEffect, useRef, useState } from "react";
import { OrderStatus } from "@/types/orders";
import { PaymentForm } from "../payment/payment-form";
import { usePaymentResult } from "@/app/hooks/use-payment-result";


type Order = {
    id: string;
    status: OrderStatus
}

const CreateOrder = () => {
    const queryClient = useQueryClient();
    usePaymentResult();
    const [order, setOrder] = useState<Order | null>(null);
    const statusFetcherTimer = useRef<number>(null);
    const [startPayment, setStartPayment] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentSecret, setPaymentSecret] = useState("");

    const handleCreateOrder = async () => {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
            });
            const result = await response.json(); 
            setOrder(result);
            toast.success(JSON.stringify(result));
            queryClient.invalidateQueries({ queryKey: ['orders']})
        } catch (error) {
            const errorMessage = (error as Error).message || 'Something went wrong in client handler';
            toast.error(errorMessage);
        }
    }

    const fetchOrderStatus = useCallback(async () => {
        if (!order || !order.id){
            return;
        }
        try {
            const statusResponse = await fetch(`/api/orders/${order.id}/status`);
            const statusResult = await statusResponse.json();
            if (statusResult.id === order.id){
                const newOrder = {
                    id: order.id,
                    status: statusResult.status as OrderStatus
                }
                setOrder(newOrder);
            }

            if (statusResult.status === OrderStatus.INVENTORY_RESERVATION_SUCCEEDED){
                setStartPayment(true);
                statusFetcherTimer.current && window.clearInterval(statusFetcherTimer.current);
                statusFetcherTimer.current = null;
            }
        } catch (error) {
            console.error('Trouble fetching status!');
        }

    }, [order]);


    useEffect(() => {
        if (!order?.id){
            return;
        }

        statusFetcherTimer.current = window.setInterval(fetchOrderStatus, 2500);

        return () => {
            statusFetcherTimer.current && window.clearInterval(statusFetcherTimer.current);
            statusFetcherTimer.current = null;
        }
    }, [order?.id]);

    useEffect(() => {
        if(!startPayment || !order?.id || (order?.status !== OrderStatus.INVENTORY_RESERVATION_SUCCEEDED)) {
            return;
        }

        (async () => {
            try {
                const response = await fetch(`/api/orders/${order?.id}/payment-intent`, {
                    method: 'POST'
                });
                const result = await response.json();
                if (result && result.clientSecret){
                    setPaymentSecret(result.clientSecret);
                    setShowPayment(true);
                }
            } catch (error){
                console.error('trouble creating payment intent!')
            }
        })();
        

    }, [startPayment])

    return (
        <div>
            <Button
                className="cursor-pointer"
                onClick={handleCreateOrder}
            >
                Create order
            </Button>
            
            <div id="order-details">
                <span>OrderId: {order?.id}</span>
                <span>Status: {order?.status}</span>
            </div>

            {showPayment && <PaymentForm clientSecret={paymentSecret} />}
        </div>
    )
}

export default CreateOrder;
