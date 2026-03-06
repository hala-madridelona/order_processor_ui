
export async function POST(request: Request) {

    const baseUrl = process.env.ORDER_PROCESSOR_BE_URL as string;
    const apiPath = 'create';
    
    const apiUrl = `${baseUrl}/${apiPath}`;
    
    try {
        const result = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "X-Id-Key": (Math.random()*1000).toString()
            }
        })
        const jsonResult = await result.json();
        console.log('RESULT => ', jsonResult);
        return Response.json(jsonResult);
    } catch (error) {
        const errorMessage = (error as Error).message || "Something went wrong!";
        return new Response(errorMessage, {
            status: 500
        })
    }
}

export async function GET(request: Request) {

    const baseUrl = process.env.ORDER_PROCESSOR_BE_URL as string;
    const apiPath = 'list';

    const apiUrl = `${baseUrl}/${apiPath}`;

    try {
        const result = await fetch(apiUrl);
        console.log('RESULT => ', result);
        const jsonResult = await result.json();
        console.log('JSON RESULT => ', jsonResult);
        return Response.json(jsonResult);
    } catch (error) {
        const errorMessage = (error as Error).message || "Something went wrong!!";
        return new Response(errorMessage, {
            status: 500
        })
    }

}