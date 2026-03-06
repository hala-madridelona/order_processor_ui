'use client';

import { useQuery } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../data-table/data-table";
import { Loader2, TriangleAlert } from "lucide-react";
import { OrderEntity } from "@/types/orders";

type OrderClientEntity = Omit<OrderEntity, 'idempotencyKey'>;

const createGoodLookingDate = (isoString: string) => {
    const date = new Date(isoString);
    const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
    return formattedDate;
}

export const ListOrder = ({}) => {

    const { data, error, isError, isPending } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const resp = await fetch('/api/orders');
            const result = await resp.json();
            return result;
        }
    })

    const columnHelper = createColumnHelper<OrderClientEntity>();

    const columns = [
        columnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
            header: () => <span>Order Id</span>
        }),
        columnHelper.accessor('userId', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
            header: () => <span>User Id</span>
        }),
        columnHelper.accessor('createdAt', {
            cell: (info) => createGoodLookingDate(info.getValue()),
            footer: (info) => info.column.id,
            header: () => <span>Created at</span>
        }),
        columnHelper.accessor('updatedAt', {
            cell: (info) => createGoodLookingDate(info.getValue()),
            footer: (info) => info.column.id,
            header: () => <span>Updated at</span>
        }),
        columnHelper.accessor('status', {
            cell: (info) => <span className="p-1 bg-gray-700 text-white">{info.getValue()}</span>,
            footer: (info) => info.column.id,
            header: () => <span>Status</span>
        }),
        columnHelper.accessor('failureCode', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
            header: () => <span>Failure code</span>           
        }),
        columnHelper.accessor('failureReason', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
            header: () => <span>Failure Reason</span>           
        }),        
    ]


    if (isPending){
        <div className="w-full flex justify-center">
            <Loader2 />
        </div>
    }

    if (isError) {
        <div className="w-full flex justify-center">
            <TriangleAlert />
        </div>
    }


    return (
        <div>
            <DataTable data={data} columns={columns} />
        </div>
    )

}