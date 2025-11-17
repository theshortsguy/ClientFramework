'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';

const preferredOrder = ['default', 'dark', 'dark-knight', 'colorblind', 'colorblind-dark'] as const;

export const useTheme = (customThemes?: string[], initialTheme?: string) => {
  const [themes, setThemes] = useState(() => {
    const incoming = Array.from(new Set<string>([...(customThemes ?? [])]));
    const ordered = [
      ...preferredOrder.filter((t) => true), // ensure base order
      ...incoming.filter((t) => !preferredOrder.includes(t as any)),
    ];
    const seen = new Set<string>();
    return ordered.filter((t) => t !== 'light' && !seen.has(t) && seen.add(t));
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    const t = initialTheme ?? 'default';
    // Normalize: treat 'default' and 'light' as the same visual theme
    return t === 'default' || t === 'light' || !t ? 'light' : t;
  });

  const setTheme = (newTheme: string) => {
    const html = document.documentElement;
    const classList = html.classList;

    // normalize: treat default/light as 'light'
    const isLight = newTheme === 'default' || newTheme === 'light' || !newTheme;
    const normalized = isLight ? 'light' : newTheme;

    // remove all known theme classes
    const ALL = ['default', 'light', 'dark', 'colorblind', 'colorblind-dark', 'dark-knight'];
    ALL.forEach((c) => classList.remove(c));

    if (!isLight) {
      classList.add(normalized);
    }

    // persist for SSR/reloads
    setCookie('theme', normalized, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });

    setCurrentTheme(normalized);
  };

  return { themes, currentTheme, setThemes, setTheme };
};
