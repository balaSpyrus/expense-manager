import { type NextRequest } from 'next/server'
export const revalidate = 60


export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user-id", "dummy")

    const data = await fetch('https://startuptoolbox.koyeb.app/expense_manager/v1/dashboard', {
        headers: requestHeaders
    })
    const stats = await data.json()
    return Response.json(stats)
}