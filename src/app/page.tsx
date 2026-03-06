import CreateOrder from "@/components/order-management/create-order";
import { ListOrder } from "@/components/order-management/list-order";

export default function Home() {
  return (

    <div className="w-full min-h-screen p-8">
      <div className="flex justify-end w-full">
        <CreateOrder />
      </div>

      <div className="flex flex-col items-center font-sans w-full dark:bg-black">
        <ListOrder />
      </div>
    </div>  
  );
}
