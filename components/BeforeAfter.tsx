import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props { beforeLabel: string; afterLabel: string; accent: string; start: number; style?: React.CSSProperties }

const bar = (w: string) => <div style={{ height: 7, width: w, borderRadius: 4, background: "#2b2b2b", margin: "6px 0" }} />

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function BeforeAfter(props: Props) {
    const { beforeLabel = "BEFORE · SPLIT VIEWS", afterLabel = "AFTER · ONE HUB", accent = "#FFDE05", start = 50, style } = props
    const [pos, setPos] = React.useState(start)
    const ref = React.useRef<HTMLDivElement>(null)
    const dragging = React.useRef(false)
    const update = (x: number) => { const r = ref.current?.getBoundingClientRect(); if (!r || r.width === 0) return; setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))) }
    const win = (label: string, l: string, t: string, w: string, h: string, bars: string[]) => (
        <div style={{ position: "absolute", left: l, top: t, width: w, height: h, background: "#181818", border: "1px solid #303030", borderRadius: 8, padding: 10, boxShadow: "0 8px 24px rgba(0,0,0,.5)", boxSizing: "border-box" }}>
            <div style={{ fontSize: 11, color: "#cfcfcf", fontWeight: 600, marginBottom: 8 }}>● ● {label}</div>
            {bars.map((b, i) => <React.Fragment key={i}>{bar(b)}</React.Fragment>)}
        </div>
    )
    const kpi = (label: string, hot: boolean) => (
        <div style={{ flex: 1, background: "#171717", border: "1px solid " + (hot ? "#5a2a2a" : "#2c2c2c"), borderRadius: 8, padding: 10, fontSize: 11, color: "#cfcfcf" }}>
            {label}<div style={{ height: 16, width: "46%", borderRadius: 4, background: hot ? "#ff5d5d" : "#333", marginTop: 8 }} />
        </div>
    )
    const lbl = (text: string, side: "left" | "right", on: boolean): React.CSSProperties => ({ position: "absolute", top: 14, [side]: 14, fontSize: 11, fontWeight: 700, letterSpacing: ".04em", padding: "4px 8px", borderRadius: 5, background: on ? accent : "#2a2a2a", color: on ? "#111" : "#ddd", zIndex: 2 } as React.CSSProperties)
    return (
        <div ref={ref} role="slider" aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} tabIndex={0}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5)); if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5)) }}
            onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId); update(e.clientX) }}
            onPointerMove={(e) => { if (dragging.current) update(e.clientX) }}
            onPointerUp={(e) => { dragging.current = false; (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId) }}
            style={{ ...style, position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #262626", cursor: "ew-resize", userSelect: "none", touchAction: "pan-y", fontFamily: "Inter, sans-serif", minWidth: 280, minHeight: 240 }}>
            <div style={{ position: "absolute", inset: 0, background: "#101010" }}>
                <span style={lbl(afterLabel, "right", true)}>{afterLabel}</span>
                <div style={{ position: "absolute", inset: "48px 24px 24px 24px", display: "flex", gap: 12 }}>
                    <div style={{ width: 120, background: "#151515", border: "1px solid #2a2a2a", borderRadius: 8, padding: 10, fontSize: 11, color: "#bbb", display: "flex", flexDirection: "column", gap: 9 }}>
                        <span style={{ background: accent, color: "#111", borderRadius: 5, padding: "3px 6px", fontWeight: 600 }}>Dashboard</span>
                        <span>Cases</span><span>Monitoring</span><span>Reports</span><span>Settings</span>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", gap: 10 }}>{kpi("Open cases", false)}{kpi("Overdue", true)}{kpi("High risk", true)}{kpi("New alerts", false)}</div>
                        <div style={{ flex: 1, display: "flex", gap: 10 }}>
                            <div style={{ flex: 1.4, background: "#151515", border: "1px solid #2a2a2a", borderRadius: 8, padding: 10, fontSize: 11, color: "#cfcfcf", position: "relative", overflow: "hidden" }}>Trends
                                <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", left: 10, right: 10, bottom: 10, width: "calc(100% - 20px)", height: "60%" }}><polyline fill="none" stroke={accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke" points="0,28 15,22 30,25 45,14 60,18 75,8 90,11 100,4" /></svg>
                            </div>
                            <div style={{ flex: 1, background: "#151515", border: "1px solid #2a2a2a", borderRadius: 8, padding: 10, fontSize: 11, color: "#cfcfcf" }}>Live activity{bar("100%")}{bar("80%")}{bar("65%")}{bar("72%")}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: "absolute", inset: 0, background: "#0e0e0e", clipPath: "inset(0 " + (100 - pos) + "% 0 0)" }}>
                <span style={lbl(beforeLabel, "left", false)}>{beforeLabel}</span>
                {win("Cases dashboard", "6%", "16%", "34%", "44%", ["100%", "70%", "85%"])}
                {win("Alerts", "30%", "34%", "32%", "44%", ["60%", "100%", "75%"])}
                {win("Monitoring", "54%", "12%", "34%", "40%", ["80%", "55%"])}
                {win("Reports", "62%", "50%", "30%", "38%", ["100%", "66%"])}
            </div>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: pos + "%", width: 2, background: accent, transform: "translateX(-1px)", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 34, height: 34, borderRadius: "50%", background: accent, color: "#111", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 700 }}>⟷</div>
            </div>
        </div>
    )
}

addPropertyControls(BeforeAfter, {
    beforeLabel: { type: ControlType.String, title: "Before", defaultValue: "BEFORE · SPLIT VIEWS" },
    afterLabel: { type: ControlType.String, title: "After", defaultValue: "AFTER · ONE HUB" },
    accent: { type: ControlType.Color, title: "Accent", defaultValue: "#FFDE05" },
    start: { type: ControlType.Number, title: "Start", defaultValue: 50, min: 0, max: 100, unit: "%" },
})
