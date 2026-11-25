import { addPropertyControls, ControlType } from "framer"

/**
 * Pulsing status dot ("open for work").
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function PulseDot({ color, size, label }) {
    const css = `
    @keyframes pd-pulse { 0% { transform: scale(1); opacity: .6 } 70% { transform: scale(2.4); opacity: 0 } 100% { transform: scale(2.4); opacity: 0 } }
    .pd-ring { animation: pd-pulse 1.8s cubic-bezier(.4,0,.2,1) infinite }
    @media (prefers-reduced-motion: reduce) { .pd-ring { animation: none; opacity: 0 } }
    `
    return (
        <div role="img" aria-label={label} style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <style>{css}</style>
            <span style={{ position: "relative", width: size, height: size, display: "block" }}>
                <span className="pd-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}` }} />
            </span>
        </div>
    )
}

addPropertyControls(PulseDot, {
    color: { type: ControlType.Color, defaultValue: "#22C55E" },
    size: { type: ControlType.Number, defaultValue: 12, min: 4, max: 24 },
    label: { type: ControlType.String, defaultValue: "Available for work" },
})
