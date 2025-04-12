import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('accessToken')?.value;

    return Response.json({ token });
}
