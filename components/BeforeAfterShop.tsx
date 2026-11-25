import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props { beforeLabel: string; afterLabel: string; accent: string; start: number; style?: React.CSSProperties }

/**
 * Before/after slider: four stores vs one cart.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function BeforeAfterShop(props: Props) {
    const { beforeLabel = "BEFORE · FOUR STORES", afterLabel = "AFTER · ONE CART", accent = "#FFDE05", start = 50, style } = props
    const [pos, setPos] = React.useState(start)
    const ref = React.useRef<HTMLDivElement>(null)
    const dragging = React.useRef(false)
    const update = (x: number) => { const r = ref.current?.getBoundingClientRect(); if (!r || r.width === 0) return; setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))) }
    const bar = (w: string) => <div style={{ height: 7, width: w, borderRadius: 4, background: "#2b2b2b", margin: "6px 0" }} />
    const win = (label: string, l: string, t: string, w: string, h: string, bars: string[], rot: number) => (
        <div style={{ position: "absolute", left: l, top: t, width: w, height: h, background: "#181818", border: "1px solid #303030", borderRadius: 8, padding: 10, boxShadow: "0 8px 24px rgba(0,0,0,.5)", boxSizing: "border-box", transform: "rotate(" + rot + "deg)" }}>
            <div style={{ fontSize: 11, color: "#cfcfcf", fontWeight: 600, marginBottom: 8 }}>{label}</div>
            {bars.map((b, i) => <React.Fragment key={i}>{bar(b)}</React.Fragment>)}
        </div>
    )
    const item = (time: string, title: string, meta: string, next: boolean) => (
        <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
            <div style={{ width: 58, fontSize: 11, color: next ? accent : "#9a9a9a", fontWeight: 700, paddingTop: 10 }}>{time}</div>
            <div style={{ width: 2, background: next ? accent : "#2c2c2c", borderRadius: 2 }} />
            <div style={{ flex: 1, background: "#161616", border: "1px solid " + (next ? accent : "#2a2a2a"), borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 12, color: "#eee", fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 10, color: "#9a9a9a", marginTop: 3 }}>{meta}</div>
            </div>
        </div>
    )
    const lbl = (side: "left" | "right", on: boolean): React.CSSProperties => ({ position: "absolute", top: 14, [side]: 14, fontSize: 11, fontWeight: 700, letterSpacing: ".04em", padding: "4px 8px", borderRadius: 5, background: on ? accent : "#2a2a2a", color: on ? "#111" : "#ddd", zIndex: 2 } as React.CSSProperties)
    return (
        <div ref={ref} role="slider" aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} tabIndex={0}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5)); if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5)) }}
            onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId); update(e.clientX) }}
            onPointerMove={(e) => { if (dragging.current) update(e.clientX) }}
            onPointerUp={(e) => { dragging.current = false; (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId) }}
            style={{ ...style, position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #262626", cursor: "ew-resize", userSelect: "none", touchAction: "pan-y", fontFamily: "Inter, sans-serif", minWidth: 280, minHeight: 240 }}>
            <div style={{ position: "absolute", inset: 0, background: "#101010" }}>
                <span style={lbl("right", true)}>{afterLabel}</span>
                <div style={{ position: "absolute", inset: "52px 24px 20px 24px", display: "flex", flexDirection: "column", gap: 10, maxWidth: 520, margin: "0 auto" }}>
                    <div style={{ fontSize: 12, color: "#cfcfcf", fontWeight: 600 }}>Your cart <span style={{ color: accent }}>· 4 items, 1 delivery</span></div>
                    {item("Tech", "Laptop 16” · 19,999 lei", "Delivery in 1–2 days", false)}
                    {item("Home", "Office chair · 2,499 lei", "-22% Black Friday", true)}
                    {item("Pets", "Cat food 10 kg · 699 lei", "From Deal of the day", false)}
                    {item("Kids", "Building set · 549 lei", "Free delivery over 500 lei", false)}
                </div>
            </div>
            <div style={{ position: "absolute", inset: 0, background: "#0e0e0e", clipPath: "inset(0 " + (100 - pos) + "% 0 0)" }}>
                <span style={lbl("left", false)}>{beforeLabel}</span>
                {win("💻 Electronics store", "5%", "18%", "34%", "38%", ["100%", "70%", "85%"], -3)}
                {win("🛋 Furniture site", "30%", "40%", "32%", "38%", ["60%", "100%", "75%"], 2)}
                {win("👗 Fashion shop", "55%", "14%", "34%", "34%", ["80%", "55%"], -2)}
                {win("🐾 Pet shop", "62%", "54%", "30%", "34%", ["100%", "66%"], 3)}
            </div>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: pos + "%", width: 2, background: accent, transform: "translateX(-1px)", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 34, height: 34, borderRadius: "50%", background: accent, color: "#111", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 700 }}>⟷</div>
            </div>
        </div>
    )
}

addPropertyControls(BeforeAfterShop, {
    beforeLabel: { type: ControlType.String, title: "Before", defaultValue: "BEFORE · FOUR STORES" },
    afterLabel: { type: ControlType.String, title: "After", defaultValue: "AFTER · ONE CART" },
    accent: { type: ControlType.Color, title: "Accent", defaultValue: "#FFDE05" },
    start: { type: ControlType.Number, title: "Start", defaultValue: 50, min: 0, max: 100, unit: "%" },
})
