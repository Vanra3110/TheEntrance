/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "background": "#f8fafc",
                "surface": "#ffffff",
                "surface-dim": "#f1f5f9",
                "surface-bright": "#ffffff",
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#f8fafc",
                "surface-container": "#f1f5f9",
                "surface-container-high": "#e2e8f0",
                "surface-container-highest": "#cbd5e1",
                "on-surface": "#0f172a",
                "on-surface-variant": "#475569",
                "outline": "#94a3b8",
                "outline-variant": "#cbd5e1",
                "inverse-surface": "#0f172a",
                "inverse-on-surface": "#f8fafc",
                "primary": "#2563eb",
                "on-primary": "#ffffff",
                "primary-container": "#dbeafe",
                "on-primary-container": "#1e3a8a",
                "primary-fixed": "#bfdbfe",
                "on-primary-fixed": "#1e3a8a",
                "primary-fixed-dim": "#60a5fa",
                "on-primary-fixed-variant": "#2563eb",
                "inverse-primary": "#bfdbfe",
                "secondary": "#0f172a",
                "on-secondary": "#ffffff",
                "secondary-container": "#334155",
                "on-secondary-container": "#f8fafc",
                "secondary-fixed": "#cbd5e1",
                "secondary-fixed-dim": "#94a3b8",
                "on-secondary-fixed": "#0f172a",
                "on-secondary-fixed-variant": "#334155",
                "tertiary": "#0f766e",
                "on-tertiary": "#ffffff",
                "tertiary-container": "#ccfbf1",
                "on-tertiary-container": "#115e59",
                "tertiary-fixed": "#99f6e4",
                "tertiary-fixed-dim": "#5eead4",
                "on-tertiary-fixed": "#042f2e",
                "on-tertiary-fixed-variant": "#0d9488",
                "error": "#dc2626",
                "on-error": "#ffffff",
                "error-container": "#fee2e2",
                "on-error-container": "#991b1b",
                "surface-tint": "#2563eb"
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