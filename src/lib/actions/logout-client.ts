// lib/actions/logout-client.ts
export const logout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('Logout failed', res.status);
      return false;
    }

    window.location.href = '/login';
    return true;
  } catch (err) {
    console.error('Logout error', err);
    return false;
  }
};
