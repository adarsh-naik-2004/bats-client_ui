// src/components/remove-hydration-error.tsx
'use client';

import { useEffect } from 'react';

export default function RemoveHydrationError() {
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.removeAttribute('cz-shortcut-listen');
    }
  }, []);

  return null;
}