'use client';

import { Button } from "../ui/button"
import { toast } from "sonner"

const CreateOrder = () => {

    const handleCreateOrder = async () => {
        try {
            const result = await fetch('/api/order', {
                method: 'POST',
            });
            toast.success(JSON.stringify(result));
        } catch (error) {
            const errorMessage = (error as Error).message || 'Something went wrong in client handler';
            toast.error(errorMessage);
        }
    }

    return (
        <div>
            <Button
                onClick={handleCreateOrder}
            >
                Create order
            </Button>
        </div>
    )
}

export default CreateOrder;
