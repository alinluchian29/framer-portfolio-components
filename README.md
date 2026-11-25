# Framer Portfolio Components

Custom React code components built for my product design portfolio, made with [Framer](https://www.framer.com).

- Live portfolio: https://alinluchian.framer.website

## Components

| Component | What it does | Used on |
|---|---|---|
| `BeforeAfter.tsx` | Draggable before/after slider: split views vs one hub | Clarytas case study |
| `BeforeAfterTrip.tsx` | Scattered bookings vs one trip timeline | Emageo case study |
| `BeforeAfterEvent.tsx` | Scattered planning vs one event plan | Veluna case study |
| `BeforeAfterShop.tsx` | Four stores vs one cart | MegaMega case study |
| `BeforeAfterPoll.tsx` | Group chat vs one photo poll | Chuuzer case study |
| `BeforeAfterOutdoor.tsx` | Four apps vs one outdoor plan | StepOut case study |
| `PulseDot.tsx` | Pulsing "available for work" status dot | Home |
| `SkipLink.tsx` | Keyboard "Skip to content" link, hidden until focused | Home |

The sliders are illustrations of each product's structure, not real product screens.

## Accessibility

- The sliders use `role="slider"` with `aria-valuenow`, and move with the Left and Right arrow keys.
- `PulseDot` respects `prefers-reduced-motion`.
- `SkipLink` appears only on keyboard focus and moves focus to the target section.

## Using a component in Framer

1. In your Framer project, open **Assets → Code → New code file**.
2. Paste the contents of a `.tsx` file and save.
3. Drag the component onto the canvas and adjust its properties in the right panel (labels, accent colour, starting position).

These files import from `framer`, so they run inside Framer, not as a standalone app.

## Note

The website itself is built and hosted in Framer. Framer does not export a site as code, so this repository contains only the custom code components.
