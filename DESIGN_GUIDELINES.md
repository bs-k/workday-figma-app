# Workday — Design Guidelines
## For GitHub Copilot / AI-assisted porting

Use this document to replicate the visual language of the Workday prototype 1:1.
The UI is built with **React + Tailwind CSS v4**. All styling uses Tailwind utility classes directly in JSX.

---

## 1. Typography

### Fonts
```css
/* In your global CSS — import BEFORE any other rules */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
```

| Role | Family | Usage |
|------|--------|-------|
| UI text | **DM Sans** | All labels, body, headings |
| Numeric / code | **JetBrains Mono** | Progress values (`83 / 120`), times (`06:00–14:00`), codes (`WD-7K4P2`) |

### Type scale
```
Page title (h1):        text-2xl font-semibold   — 24px, 600
Section heading (h2):   text-xl  font-semibold   — 20px, 600
Card / sheet title:     text-base font-semibold  — 16px, 600
Body / labels:          text-sm  font-medium     — 14px, 500
Small labels:           text-xs  font-medium     — 12px, 500
Micro labels (nav):     text-[11px] font-medium  — 11px, 500
Uppercase eyebrow:      text-xs font-semibold uppercase tracking-widest text-gray-400
Mono value:             font-mono text-sm font-medium  (or font-semibold for large)
```

### Base HTML
```css
html {
  font-family: 'DM Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
}
body { margin: 0; background: #ffffff; color: #111111; }
```

---

## 2. Color palette

The palette is **restrained**. One blue accent, grays for everything structural.

### Grays (used for backgrounds, borders, text)
```
#ffffff   bg-white          — page background, card background
#f9fafb   bg-gray-50        — subtle row hover, table header, input background
#f3f4f6   bg-gray-100       — secondary button, toggle track, badge neutral
#e5e7eb   border-gray-200   — input borders, dividers
#d1d5db   border-gray-300   — checkbox borders
#9ca3af   text-gray-400     — placeholder text, inactive nav icons, helper text
#6b7280   text-gray-500     — secondary text, table sub-labels
#374151   text-gray-700     — label text
#1f2937   text-gray-800     — primary text alternative
#111827   text-gray-900     — main body text, headings
```

### Blue (primary accent — one shade family only)
```
#eff6ff   bg-blue-50        — active nav background, active state bg
#bfdbfe   border-blue-200   — light blue borders
#93c5fd   border-blue-300   — focus-adjacent
#3b82f6   bg-blue-500       — progress bars, chart fills
#2563eb   bg-blue-600       — PRIMARY buttons, active icon color, links
#1d4ed8   bg-blue-700       — button hover state
#1e40af   bg-blue-800       — button active/pressed state
#1e3a8a   text-blue-900     — dark blue text (rare)
```

### Semantic colors
```
Green (success / completed):
  bg-green-50  border-green-100  text-green-700  text-green-800
  bg-green-500 (progress bar fill when 100%)

Amber (warning / pending):
  bg-amber-50  border-amber-200  text-amber-700  text-amber-800

Red (danger / destructive):
  bg-red-50  border-red-200  text-red-500  text-red-600  text-red-700
  bg-red-600 (danger button)  hover:bg-red-700

Violet / Emerald / Cyan / Rose (avatar palette — deterministic by name hash):
  bg-blue-100 text-blue-700
  bg-violet-100 text-violet-700
  bg-emerald-100 text-emerald-700
  bg-amber-100 text-amber-700
  bg-rose-100 text-rose-700
  bg-cyan-100 text-cyan-700
```

### Dark surface (shift card, hero block)
```
bg-[#090e1a]   — near-black dark navy, used for shift display cards
text-white, text-gray-400, text-gray-500 on top
```

---

## 3. Spacing & layout

```
Page horizontal padding:   px-4  (mobile)   px-8  (desktop)
Page top spacing:          mt-5  below mobile header (~20px)
Section gap:               mb-6  between major sections
Card internal padding:     p-4  or  p-5
Inline gap (flex row):     gap-2  gap-3  gap-4
Stack gap (flex col):      space-y-3  space-y-4  space-y-5
```

### Mobile layout system
- Mobile = `< 1024px` (Tailwind `lg:` breakpoint)
- Desktop sidebar = `hidden lg:flex`
- Mobile-only elements = `lg:hidden`
- Full screen height = `height: 100dvh` (never `100vh`)

---

## 4. Border radius

The UI uses rounded-xl / rounded-2xl everywhere. **No sharp corners.**

```
Buttons:         rounded-xl   (12px)
Inputs:          rounded-xl   (12px)
Cards / panels:  rounded-2xl  (16px)
Bottom sheets:   rounded-t-3xl (top corners only, 24px)
Avatars:         rounded-full
Status dots:     rounded-full
Badges:          rounded-full
```

---

## 5. Shadows

Used **very sparingly**. Only for elevated surfaces.

```
Dropdown menus:   shadow-lg
Modals / sheets:  shadow-2xl
Drawer:           shadow-2xl
Floating toasts:  shadow-xl
Bulk action bar:  shadow-2xl
No card shadows   — cards use border-gray-100 only
```

---

## 6. Borders

All borders are hairline and low-contrast.

```
Standard divider:      border border-gray-100
Input border:          border border-gray-200
Active/focus:          border-blue-500 (via focus ring)
Card hover:            hover:border-gray-200 (from border-gray-100)
Dashed placeholder:    border border-dashed border-gray-300
Table row divider:      divide-y divide-gray-50  or  divide-gray-100
```

---

## 7. Component patterns

### Button (`Btn`)

Five variants, three sizes. Always `rounded-xl`, always `min-h-[44px]` (touch target).

```tsx
// primary
className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 px-4 py-2.5 text-sm font-medium rounded-xl"

// secondary
className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2.5 text-sm font-medium rounded-xl"

// outline
className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 text-sm font-medium rounded-xl"

// ghost
className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2.5 text-sm font-medium rounded-xl"

// danger
className="bg-red-600 text-white hover:bg-red-700 px-4 py-2.5 text-sm font-medium rounded-xl"

// Sizes:
//   sm:  px-3 py-2    text-xs  min-h-[36px]
//   md:  px-4 py-2.5  text-sm  min-h-[44px]   ← default
//   lg:  px-5 py-3.5  text-sm  min-h-[52px]

// Disabled:
className="... opacity-40 pointer-events-none"

// Focus:
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
```

### Input / Field

```tsx
className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900
           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
           focus:border-transparent bg-white min-h-[44px]"
```

Label: `text-sm font-medium text-gray-700 mb-1.5`
Required asterisk: `text-red-500 ml-0.5`
Helper text: `mt-1 text-xs text-gray-400`

### Select

```tsx
className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900
           bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
           focus:border-transparent appearance-none min-h-[44px]"
```

### Badge

```tsx
// base
className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"

// variants
active/completed: "bg-green-50 text-green-800 border border-green-200"
pending:          "bg-amber-50 text-amber-800 border border-amber-200"
inactive:         "bg-gray-100 text-gray-500 border border-gray-200"
info/trial:       "bg-blue-50 text-blue-700 border border-blue-200"
danger:           "bg-red-50 text-red-700 border border-red-200"
neutral:          "bg-gray-100 text-gray-700 border border-gray-200"
```

### Avatar (initials-based, color from name hash)

```tsx
// Palette (index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % 6)
const palette = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
]

// Sizes
xs: "w-7 h-7 text-[10px]"
sm: "w-9 h-9 text-xs"
md: "w-10 h-10 text-sm"
lg: "w-16 h-16 text-xl"

// Base
className="... rounded-full flex items-center justify-center font-semibold flex-shrink-0"
// Content: firstName[0] + lastName[0]
```

### Progress bar

```tsx
// Container
<div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }}/>
</div>

// With label above
<div className="flex justify-between items-baseline mb-1.5">
  <span className="font-mono text-sm font-medium text-gray-900">{current} / {total}</span>
  <span className="font-mono text-xs text-gray-400">{pct}%</span>
</div>

// Variants:
sm: h-1    (history rows)
md: h-1.5  (default cards)
lg: h-2    (progress editor)
lg+: h-3   (full-screen editor)
```

### Card / list item

```tsx
// Standard interactive card
className="border border-gray-100 rounded-2xl p-4 hover:border-gray-200 transition-colors"

// Stat card
className="border border-gray-100 rounded-2xl p-5"

// Table row
className="hover:bg-gray-50 group" // tbody tr

// Mobile list item (min touch target)
className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 min-h-[76px]"
```

---

## 8. Modal / Sheet / Dialog patterns

### Bottom sheet (mobile — slides up)
```tsx
// Backdrop
<div className="fixed inset-0 bg-black/20 backdrop-blur-sm"/>

// Panel
<div className="relative bg-white rounded-t-3xl shadow-2xl w-full max-h-[85dvh] flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
    <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 min-w-[44px] min-h-[44px]">✕</button>
  </div>
  {/* Scrollable content */}
  <div className="overflow-y-auto flex-1 p-5 safe-area-bottom">{children}</div>
</div>
```

### Full-screen mobile surface (progress editor, complex forms)
```tsx
// Container — full device height
<div className="fixed inset-0 z-50 bg-white flex flex-col" style={{ height: '100dvh' }}>
  {/* Header */}
  <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 flex-shrink-0 safe-area-top">
    <button className="p-2 rounded-xl hover:bg-gray-100 min-w-[44px] min-h-[44px]">← back</button>
    <h2 className="text-base font-semibold text-gray-900">Title</h2>
  </div>
  {/* Scrollable body */}
  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
    {/* content */}
  </div>
  {/* Sticky footer — stays above keyboard */}
  <div className="flex-shrink-0 px-4 py-4 border-t border-gray-100 bg-white safe-area-bottom">
    <button className="w-full bg-blue-600 text-white text-base font-semibold py-4 rounded-2xl min-h-[60px]">
      Save progress
    </button>
  </div>
</div>
```

### Centered modal (desktop / simple confirmations)
```tsx
// Backdrop
<div className="fixed inset-0 bg-black/20 backdrop-blur-sm"/>
// Panel
<div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
  <div className="flex items-center justify-between p-5 border-b border-gray-100">
    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
    <button ...>✕</button>
  </div>
  <div className="p-5">{children}</div>
</div>
```

### Action sheet (iOS-style option list)
```tsx
// Options group
<div className="bg-white rounded-2xl overflow-hidden shadow-xl">
  <p className="text-xs font-semibold text-gray-400 text-center pt-4 px-5 pb-2">{title}</p>
  {options.map(opt => (
    <button className="w-full text-sm font-medium py-4 px-5 border-t border-gray-100 first:border-0
                       hover:bg-gray-50 text-left min-h-[52px]
                       [&.destructive]:text-red-600">
      {opt.label}
    </button>
  ))}
</div>
// Separate Cancel button
<button className="w-full bg-white rounded-2xl text-sm font-semibold text-gray-700 py-4 min-h-[52px] shadow-xl mt-2">
  Cancel
</button>
```

### Toast notification
```tsx
<div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]
                flex items-center gap-2 bg-gray-900 text-white
                text-sm font-medium px-4 py-3 rounded-2xl shadow-xl">
  ✓ Progress updated
</div>
// Auto-dismiss after 2200ms
```

---

## 9. Navigation patterns

### Desktop sidebar (Manager)
```tsx
// Sidebar shell
<aside className="hidden lg:flex w-56 flex-shrink-0 border-r border-gray-100 flex-col bg-white">

// Logo header
<div className="flex items-center gap-2.5 px-5 h-14 border-b border-gray-100">

// Nav item — inactive
<button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                   text-gray-600 hover:bg-gray-50 hover:text-gray-900 min-h-[44px]">

// Nav item — active
<button className="... bg-blue-50 text-blue-700">

// Section label
<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">
  WORK
</p>
```

### Mobile top bar (Manager, 56px + safe-area)
```tsx
<div className="lg:hidden flex items-center justify-between px-4 border-b border-gray-100
                bg-white flex-shrink-0 sticky top-0 z-30 safe-area-top"
     style={{ height: 'calc(56px + env(safe-area-inset-top))' }}>
  {/* hamburger | logo | avatar */}
</div>
```

### Mobile drawer (Manager)
```tsx
// Use 100dvh, safe-area-top, w-4/5 max-w-xs
<div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white flex flex-col shadow-2xl"
     style={{ height: '100dvh' }}>
```

### Mobile bottom nav (Employee — benchmark style)
```tsx
<nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100
                flex z-20 safe-area-bottom"
     style={{ minHeight: '56px' }}>
  {tabs.map(tab => (
    <button className={`flex-1 flex flex-col items-center justify-center gap-1 py-3
                        text-[11px] font-medium transition-colors min-h-[56px]
                        ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
      {icon}
      {label}
    </button>
  ))}
</nav>
```

### Mobile Quick Action Bar (Manager — matches bottom nav style)
```tsx
<div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100
                flex safe-area-bottom"
     style={{ minHeight: '56px' }}>
  <button className="flex-1 flex flex-col items-center justify-center gap-1 py-3
                     text-[11px] font-medium text-blue-600 hover:bg-gray-50 min-h-[56px]">
    {plusIcon} Add task
  </button>
  <button className="flex-1 flex flex-col items-center justify-center gap-1 py-3
                     text-[11px] font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-600 min-h-[56px]">
    {copyIcon} Template
  </button>
</div>
```

---

## 10. Touch targets & accessibility

```
Minimum touch target:    44×44px  (min-w-[44px] min-h-[44px])
Close / back buttons:    min-w-[44px] min-h-[44px] p-2 rounded-xl
+/- stepper buttons:     w-14 h-14 rounded-full (56px) — for numeric inputs
Day pill selectors:      min-w-[56px] min-h-[60px]
Bottom nav buttons:      flex-1 min-h-[56px]
Row items:               min-h-[52px] or min-h-[72px] for employee rows

Focus ring:
  :focus-visible { outline: 2px solid #0052cc; outline-offset: 2px; }
  or via Tailwind: focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
```

---

## 11. Safe area & viewport

```css
/* Utility classes — add to your global CSS */
.safe-area-top    { padding-top:    env(safe-area-inset-top); }
.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
.safe-area-left   { padding-left:   env(safe-area-inset-left); }
.safe-area-right  { padding-right:  env(safe-area-inset-right); }
.safe-area-x      { padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }
```

```
Apply safe-area-top to:     mobile top bar, drawer header
Apply safe-area-bottom to:  bottom nav, quick action bar, bottom sheet content, full-screen footer
Use 100dvh (not 100vh) for: progress editor, drawer, full-screen forms
```

---

## 12. Content bottom padding rules

When a fixed bar exists at the bottom, the scrollable content area needs matching padding so the last item is never hidden:

```
Employee bottom nav (56px):         pb-[72px]  on main content
Manager Quick Action Bar (56px):    pb-[88px]  on mobile screen content
Both bars present simultaneously:   not applicable (Manager has no bottom nav)
```

---

## 13. Scrollbar styling

```css
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: transparent; border-radius: 10px; }
*:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); }
```

Scrollbars are invisible by default and only appear on hover.

---

## 14. Transitions

```css
button, a, input, select, textarea {
  transition-property: color, background-color, border-color, box-shadow, opacity;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

In Tailwind: `transition-colors` (most elements) or `transition-all` where multiple properties change.

---

## 15. Logo

```tsx
// Blue rounded square with a stacked-lines icon (list/schedule metaphor)
<div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
    <rect x="3" y="5" width="18" height="2" rx="1"/>
    <rect x="3" y="11" width="13" height="2" rx="1"/>
    <rect x="3" y="17" width="9" height="2" rx="1"/>
  </svg>
</div>
```

Sizes: `w-6 h-6` (small), `w-7 h-7` (default nav), `w-8 h-8` (auth / onboarding hero)

---

## 16. Design principles (for Copilot context)

1. **No gradients.** Flat color fills only.
2. **No shadows on cards.** Cards use `border border-gray-100` only.
3. **No rounded-sm or rounded-md.** Minimum is `rounded-xl`.
4. **No bold colors except blue-600.** All other accents are muted (green-50, amber-50, etc.).
5. **Mono font for all numbers.** Any progress value, time, or code uses `font-mono`.
6. **Uppercase eyebrows are always `text-xs font-semibold uppercase tracking-widest text-gray-400`.**
7. **All form fields are full-width on mobile.** No two-column inputs below 640px.
8. **Primary actions are always blue-600.** Never another color.
9. **Destructive actions are always red-600.** Always visually separated from other actions.
10. **Touch targets are never smaller than 44px.** Even icon-only buttons get `min-w-[44px] min-h-[44px]`.
