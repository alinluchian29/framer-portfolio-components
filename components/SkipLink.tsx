import { addPropertyControls, ControlType } from "framer"
import { useState } from "react"

/**
 * Skip link: hidden until it receives keyboard focus, then jumps to a section.
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function SkipLink({ label, target, accent }) {
    const [focused, setFocused] = useState(false)
    return (
        <a
            href={"#" + target}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={(e) => {
                const el = document.getElementById(target)
                if (el) {
                    e.preventDefault()
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1")
                    el.focus({ preventScroll: true })
                }
            }}
            style={{
                position: "fixed",
                top: 12,
                left: 12,
                zIndex: 1000,
                padding: "12px 18px",
                borderRadius: 10,
                background: accent,
                color: "#121212",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                transform: focused ? "translateY(0)" : "translateY(-200%)",
                opacity: focused ? 1 : 0,
                transition: "transform .2s ease, opacity .2s ease",
                outline: focused ? "2px solid #fff" : "none",
                outlineOffset: 2,
            }}
        >
            {label}
        </a>
    )
}

addPropertyControls(SkipLink, {
    label: { type: ControlType.String, defaultValue: "Skip to content" },
    target: { type: ControlType.String, defaultValue: "works" },
    accent: { type: ControlType.Color, defaultValue: "#FFDE05" },
})
