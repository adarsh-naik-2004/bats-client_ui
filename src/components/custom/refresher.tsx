'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import * as jose from 'jose';

const Refresher = ({ children }: { children: React.ReactNode }) => {
  const timeoutId = useRef<number | null>(null);

  const getAccessToken = async () => {
    const res = await fetch('/api/auth/accessToken');

    if (!res.ok) {
      return;
    }

    const accessToken = await res.json();
    return accessToken.token;
  };

  const startRefresh = useCallback(async () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) return;

      const token = jose.decodeJwt(accessToken);
      const exp = token.exp! * 1000;

      const currentTime = Date.now();
      const refreshTime = exp - currentTime - 5000;

      console.log(`Current time: ${new Date(currentTime).toISOString()}`);
      console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
      console.log(
        `Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`
      );

      timeoutId.current = window.setTimeout(() => {
        refreshAccessToken();
        console.log('Access token is refreshing...');
      }, refreshTime);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error in startRefresh:', error.message);
      } else {
        console.error('Unknown error in startRefresh:', error);
      }
    }
  }, []);

  const refreshAccessToken = async () => {
    try {
      const res = await fetch('/api/auth/refresh', { method: 'POST' });

      if (!res.ok) {
        console.log('Failed to refresh access token');
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error while refreshing the token:', error.message);
      } else {
        console.error('Unknown error during token refresh:', error);
      }
    }

    startRefresh();
  };

  useEffect(() => {
    startRefresh();

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [startRefresh]);

  return <div>{children}</div>;
};

export default Refresher;
