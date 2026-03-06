
export async function GET(
    request: Request,
    { params }: { params: Promise<{orderId: string}> }
) {
    const { orderId } = await params;

    const baseUrl = process.env.ORDER_PROCESSOR_BE_URL as string;
    const apiPath = `orders/${orderId}/status`;

    const apiUrl = `${baseUrl}/${apiPath}`;

    try {
        const result = await fetch(apiUrl);
        const jsonResult = await result.json();
        return Response.json(jsonResult);
    } catch (error) {
        console.error(error);
        const errorMessage = (error as Error).message || "Something went wrong!!";
        return new Response(errorMessage, {
            status: 500
        });
    }
}