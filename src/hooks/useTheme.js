import { useState, useLayoutEffect } from "react";

const defaultTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || defaultTheme
    );

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, setTheme };
}