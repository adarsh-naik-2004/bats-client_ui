import { cookies } from 'next/headers';
import cookie from 'cookie';

export async function POST() {
    const cookieStore = await cookies();

    const accessTokenValue = cookieStore.get('accessToken')?.value;
    const refreshTokenValue = cookieStore.get('refreshToken')?.value;

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessTokenValue}`,
            Cookie: `refreshToken=${refreshTokenValue}`,
        },
    });

    if (!response.ok) {
        console.log('Refresh failed.');
        return Response.json({ success: false });
    }

    const setCookies = response.headers.getSetCookie();
    const accessToken = setCookies.find((cookie) => cookie.includes('accessToken'));
    const refreshToken = setCookies.find((cookie) => cookie.includes('refreshToken'));

    if (!accessToken || !refreshToken) {
        console.log('Tokens could not be found.');
        return Response.json({ success: false });
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    const newCookies = await cookies(); 

    if (parsedAccessToken.accessToken && parsedAccessToken.expires) {
        newCookies.set({
            name: 'accessToken',
            value: parsedAccessToken.accessToken,
            expires: new Date(parsedAccessToken.expires),
            httpOnly: parsedAccessToken.httpOnly === 'true',
            path: parsedAccessToken.Path,
            domain: parsedAccessToken.Domain,
            sameSite: parsedAccessToken.SameSite?.toLowerCase() as 'strict' | 'lax' | 'none',
        });
    }

    if (parsedRefreshToken.refreshToken && parsedRefreshToken.expires) {
        newCookies.set({
            name: 'refreshToken',
            value: parsedRefreshToken.refreshToken,
            expires: new Date(parsedRefreshToken.expires),
            httpOnly: parsedRefreshToken.httpOnly === 'true',
            path: parsedRefreshToken.Path,
            domain: parsedRefreshToken.Domain,
            sameSite: parsedRefreshToken.SameSite?.toLowerCase() as 'strict' | 'lax' | 'none',
        });
    }

    return Response.json({ success: true });
}
