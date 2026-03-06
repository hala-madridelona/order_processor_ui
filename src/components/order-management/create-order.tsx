'use client';

import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button"
import { toast } from "sonner"

const CreateOrder = () => {
    const queryClient = useQueryClient();

    const handleCreateOrder = async () => {
        try {
            const result = await fetch('/api/orders', {
                method: 'POST',
            });
            toast.success(JSON.stringify(result));
            queryClient.invalidateQueries({ queryKey: ['orders']})
        } catch (error) {
            const errorMessage = (error as Error).message || 'Something went wrong in client handler';
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <Button
                className="cursor-pointer"
                onClick={handleCreateOrder}
            >
                Create order
            </Button>
        </div>
    )
}

export default CreateOrder;
