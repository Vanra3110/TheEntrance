/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "background": "#09090b",
                "surface": "#18181b",
                "surface-dim": "#09090b",
                "surface-bright": "#27272a",
                "surface-container-lowest": "#000000",
                "surface-container-low": "#09090b",
                "surface-container": "#18181b",
                "surface-container-high": "#27272a",
                "surface-container-highest": "#3f3f46",
                "on-surface": "#fafafa",
                "on-surface-variant": "#a1a1aa",
                "outline": "#52525b",
                "outline-variant": "#3f3f46",
                "inverse-surface": "#fafafa",
                "inverse-on-surface": "#18181b",
                "primary": "#3b82f6",
                "on-primary": "#ffffff",
                "primary-container": "#1d4ed8",
                "on-primary-container": "#dbeafe",
                "primary-fixed": "#60a5fa",
                "on-primary-fixed": "#1e3a8a",
                "primary-fixed-dim": "#3b82f6",
                "on-primary-fixed-variant": "#bfdbfe",
                "inverse-primary": "#eff6ff",
                "secondary": "#6366f1",
                "on-secondary": "#ffffff",
                "secondary-container": "#4338ca",
                "on-secondary-container": "#e0e7ff",
                "secondary-fixed": "#818cf8",
                "secondary-fixed-dim": "#6366f1",
                "on-secondary-fixed": "#312e81",
                "on-secondary-fixed-variant": "#c7d2fe",
                "tertiary": "#14b8a6",
                "on-tertiary": "#ffffff",
                "tertiary-container": "#0f766e",
                "on-tertiary-container": "#ccfbf1",
                "tertiary-fixed": "#2dd4bf",
                "tertiary-fixed-dim": "#14b8a6",
                "on-tertiary-fixed": "#134e4a",
                "on-tertiary-fixed-variant": "#99f6e4",
                "error": "#ef4444",
                "on-error": "#ffffff",
                "error-container": "#b91c1c",
                "on-error-container": "#fef2f2",
                "surface-tint": "#3b82f6"
            },
            borderRadius: {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            spacing: {
                "base": "8px",
                "container-max": "1280px",
                "margin-desktop": "32px",
                "gutter": "24px",
                "margin-mobile": "16px"
            },
            fontFamily: {
                "display-lg-mobile": ["Inter"],
                "body-sm": ["Inter"],
                "label-md": ["Inter"],
                "body-lg": ["Inter"],
                "headline-lg": ["Inter"],
                "body-md": ["Inter"],
                "headline-md": ["Inter"],
                "label-sm": ["Inter"],
                "display-lg": ["Inter"]
            },
            fontSize: {
                "display-lg-mobile": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                "label-sm": ["12px", { "lineHeight": "14px", "fontWeight": "600" }],
                "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
            }
        }
    },
    plugins: [],
}