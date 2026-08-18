# LAYOUT & MEASUREMENTS
# Workday — All Screens

Source of truth: `src/App.tsx` + `src/index.css`.
Measurements derived from Tailwind CSS v4 utility classes.
`1 Tailwind unit = 4px`.

---

## GLOBAL MEASUREMENTS

| Token | Value | Source |
|---|---|---|
| Base font | 16px | `html { font-size: 16px }` |
| Body bg | `#ffffff` | `body { background: #ffffff }` |
| Mobile breakpoint | 1024px | `lg:` prefix |
| Safe-area top | `env(safe-area-inset-top)` | `.safe-area-top` |
| Safe-area bottom | `env(safe-area-inset-bottom)` | `.safe-area-bottom` |
| Root height | `100dvh` | `h-dvh` |
| Focus ring | 2px solid `#0052cc`, offset 2px | `:focus-visible` |
| Scrollbar width | 5px | `::-webkit-scrollbar` |
| Scrollbar visible on | Parent hover | `*:hover::-webkit-scrollbar-thumb` |
| Transition default | 150ms `cubic-bezier(0.4, 0, 0.2, 1)` | `button, a, input, select` |

---

## MANAGER SHELL

### 1440px desktop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SIDEBAR 224px  │                  MAIN (flex-1)                            │
│                 │                                                           │
│  ┌───────────┐  │  ┌─────────────────────────────────────────────────────┐ │
│  │ Logo 28px │  │  │  Page content (overflow-y-auto)                     │ │
│  │ h=56px    │  │  │  padding: 32px (sm:p-8)                             │ │
│  └───────────┘  │  │  max-width varies per screen                        │ │
│  Trial banner   │  └─────────────────────────────────────────────────────┘ │
│  Nav groups     │                                                           │
│  Footer         │                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Element | Measurement |
|---|---|
| Sidebar width | 224px (`w-56`) |
| Sidebar header height | 56px (`h-14`) |
| Sidebar header padding | 20px horizontal (`px-5`) |
| Sidebar nav padding | 12px horizontal (`px-3`), 16px vertical (`py-4`) |
| Nav item height | min 44px (`min-h-[44px]`) |
| Nav item padding | `px-3 py-2.5` = 12px × 10px |
| Nav item radius | 12px (`rounded-xl`) |
| Nav group spacing | 16px (`space-y-4`) |
| Trial banner | `mx-3 mt-3 px-3 py-2.5 bg-blue-50 rounded-xl` |

### 375px mobile (iPhone)

```
┌─────────────────────────────────────┐
│  MOBILE TOP BAR 56px + safe-top     │
│  [☰]     [Workday]    [Avatar]      │
├─────────────────────────────────────┤
│                                     │
│  MAIN CONTENT (overflow-y-auto)     │
│  padding: 16px (p-4)                │
│                                     │
├─────────────────────────────────────┤
│  QUICK ACTION BAR 56px + safe-bot   │
│  [+ Add task]    [📄 Template]      │
└─────────────────────────────────────┘
```

| Element | Measurement |
|---|---|
| Mobile top bar height | `calc(56px + env(safe-area-inset-top))` |
| Mobile top bar padding | 16px horizontal (`px-4`) |
| Mobile top bar z-index | 30 |
| Hamburger button | 44×44px min (`min-w-[44px] min-h-[44px]`) |
| Quick action bar height | `minHeight: 56px` + safe-area-bottom |
| Quick action bar z-index | 30 |
| Nav drawer width | 80vw, max 320px (`w-4/5 max-w-xs`) |
| Nav drawer height | 100dvh |
| Nav drawer z-index | 50 |

---

## MANAGER DASHBOARD

| Element | Measurement |
|---|---|
| Container padding | `p-4` mobile (16px) / `sm:p-8` (32px) desktop |
| Bottom padding | `pb-[88px]` mobile (88px) / `lg:pb-8` (32px) desktop |
| Max content width | `max-w-2xl` (672px) |
| Top margin (mobile) | `mt-5` = 20px (below sticky top bar) |
| Stats grid | `grid-cols-1` mobile / `sm:grid-cols-2` (≥640px) |
| Card gap | `gap-3` = 12px |
| Card padding | `p-5` = 20px |
| Card radius | `rounded-2xl` = 24px |
| Stat number | `text-4xl` = 36px, `font-semibold` |
| Progress bar | `h-1.5` = 6px |
| Alert row min-height | 52px approx |
| Recent progress row | `min-h-[56px]` = 56px |
| Section header | `text-xs` = 12px, `uppercase tracking-widest`, margin-bottom 12px |

---

## MANAGER EMPLOYEES

| Element | Measurement |
|---|---|
| Container padding | `p-4` / `sm:p-8` |
| Page header margin-bottom | `mb-5` = 20px |
| Toolbar gap | `gap-3` = 12px |
| Toolbar margin-bottom | `mb-5` = 20px |
| Search input height | `min-h-[44px]` |
| Status tab group | `p-1` container + `px-3 py-1.5` tabs |
| Mobile card height | `min-h-[76px]` |
| Mobile card padding | `p-4` = 16px |
| Mobile card radius | `rounded-2xl` |
| Desktop table radius | `rounded-2xl` |
| Desktop table header | `py-3 px-4`, `bg-gray-50` |
| Desktop row divide | `divide-y divide-gray-50` |
| Bulk action bar | Fixed `bottom-6` (24px from bottom) |
| Bulk action bar padding | `px-5 py-3` |
| Bulk action bar radius | `rounded-2xl` |
| Employee detail sheet | `max-h-[85dvh]` |
| Edit/Invite modal width | `max-w-md` (448px) |

---

## MANAGER SCHEDULE

### Desktop

```
┌───────────────────────────────────────────────────────────────────────────┐
│  TOOLBAR (px-8 py-4, border-b)                                            │
│  [h1] [WeekNav]    [Search] [Team▾] [Copy prev week]                      │
├──────┬────────────────────────────────────────────────────────────────────┤
│ □    │ Employee│  MON 18 │  TUE 19 │  WED 20 │  THU 21 │  FRI 22 │...   │
│ 32px │ 192px   │  108px  │  108px  │ ≥108px  │  108px  │  108px  │      │
├──────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼──────┤
│  □   │ Emp 1   │  06–14  │  06–14  │    +    │  06–14  │    +    │      │
├──────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼──────┤
│  □   │ Emp 2   │    +    │  06–14  │  06–14  │    +    │  06–14  │      │
└──────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴──────┘
```

| Element | Measurement |
|---|---|
| Toolbar padding | `px-8 py-4` = 32px × 16px |
| Checkbox col width | 32px (`w-8`) |
| Employee col width | `w-48` = 192px |
| Day col min-width | `min-w-[108px]` |
| Day col padding | `px-1 py-3` |
| Shift cell padding | `px-1 py-2` |
| Shift cell radius | `rounded-lg` = 8px |
| Row divide | `divide-y divide-gray-50` |
| Header z-index | 20 (thead), 30 (sticky employee col) |
| Bulk float bar | Fixed `bottom-6`, centered, `px-5 py-3 rounded-2xl` |

### Mobile

```
┌──────────────────────────────────────┐
│  HEADER BLOCK (px-4 py-4 border-b)  │
│  [Schedule]              [⋯]        │
│  [◄] August 18–24 [►]    [Today]   │
│  MON TUE WED THU FRI SAT SUN        │  ← DayPills, scrollable
│  [🔍 Search employees    ] [Filters] │
├──────────────────────────────────────┤
│  MONDAY · AUG 18        [Select]    │  ← sticky
│  ─────────────────────────────────  │
│  [AK] Anna K.     [Team] [06–14]    │  min-h-72px
│  [JS] John S.     [Team] [06–14]    │
│  ─────────────────────────────────  │
│         (scrollable)                 │
├──────────────────────────────────────┤
│  QUICK ACTION BAR 56px               │
└──────────────────────────────────────┘
```

| Element | Measurement |
|---|---|
| Header block padding | `px-4 py-4` |
| Header inner gap | `space-y-3` = 12px |
| Day pill size | `min-w-[56px] min-h-[60px]` |
| Day label text | `text-[10px]` = 10px |
| Day number text | `text-lg` = 18px |
| Search input height | `min-h-[44px]` |
| Filters button height | `min-h-[44px]` |
| Active filter button | `border-blue-300 bg-blue-50 text-blue-700` |
| Employee row height | `min-h-[72px]` |
| Employee row padding | `px-4 py-3.5` |
| Shift button (set) | `px-3 py-2 rounded-xl min-h-[44px] min-w-[80px]` |
| Sticky day header | `sticky top-0 z-10 bg-white border-b border-gray-50` |
| Bulk action bar (selection mode) | Fixed `bottom-[64px]` above QuickActionBar |
| Content bottom padding | `pb-[88px]` |
| Dots menu dropdown | `min-w-[180px]`, right-aligned, `rounded-2xl shadow-lg z-50` |

---

## MANAGER TASKS & GOALS

### Desktop

| Element | Measurement |
|---|---|
| Toolbar padding | `px-8 py-4` |
| Toolbar rows | Row 1: h1 + action buttons; Row 2: WeekNav + day strip + filters + toggle |
| Employee col (week view) | `w-48` = 192px, sticky left |
| Day col min-width (week view) | `min-w-[100px]` |
| Task cell badge | `mx-auto rounded-xl px-2 py-1.5 text-xs` |
| Progress bar max-width | `max-w-[140px]` |

### Mobile

| Element | Measurement |
|---|---|
| Header padding | `px-4 py-4` |
| Header gap | `space-y-3` |
| Content padding | `pb-[88px]` |
| Employee header | `px-4 py-3 bg-gray-50/50` |
| Assignment row | `min-h-[56px] px-4 py-3` |
| Week view day header | `px-4 py-2.5 sticky top-0 z-10` |
| Week view employee sub-header | `px-4 pt-3 pb-1` |
| Week view assignment row | `min-h-[48px] px-4 py-2.5` |

---

## MANAGER SETTINGS

### Desktop

```
┌────────────────────────────────────────────────────────────────────┐
│  SETTINGS SIDEBAR 192px  │         CONTENT (p-8)                  │
│                          │         max-w-lg / max-w-xl / max-w-2xl│
│  Organization            │                                         │
│  Teams                   │  [Section content]                      │
│  Work areas              │                                         │
│  Shift templates         │                                         │
│  Task templates          │                                         │
│  Profile                 │                                         │
│  Subscription            │                                         │
└────────────────────────────────────────────────────────────────────┘
```

| Element | Measurement |
|---|---|
| Settings sidebar width | `w-48` = 192px |
| Settings sidebar padding | `py-6 px-3` |
| Settings nav item height | `min-h-[44px]` |
| Content padding | `p-8` = 32px |
| Org/Profile max-width | `max-w-lg` = 512px |
| Teams/Work areas/Templates max-width | `max-w-xl` = 576px |
| Billing max-width | `max-w-2xl` = 672px |

### Mobile

| Element | Measurement |
|---|---|
| List view padding | `p-4 mt-5` |
| Group card radius | `rounded-2xl` |
| Section item height | `min-h-[52px]` |
| Section detail back bar | `min-h-[52px] sticky top-0 bg-white z-10` |
| Section content padding | `p-4` |

### Billing cards

| Element | Measurement |
|---|---|
| Plan cards grid | `grid-cols-3` desktop / stack on mobile |
| Plan card border | `border-2` (active = blue-500, other = gray-100) |
| Plan card padding | `p-5` |
| Plan card radius | `rounded-2xl` |
| Current plan card | `border border-blue-100 bg-blue-50/40 rounded-2xl p-5 mb-6` |
| Progress bar | `h-1.5` |

---

## EMPLOYEE SHELL

| Element | Measurement |
|---|---|
| Desktop top nav height | `h-14` = 56px |
| Desktop top nav padding | `px-8` = 32px |
| Desktop nav tab height | `min-h-[40px]` |
| Desktop tab padding | `px-4 py-2` |
| Mobile bottom nav height | `minHeight: 56px` + safe-area-bottom |
| Mobile tab touch target | `flex-1 min-h-[56px]` |
| Content bottom padding | `calc(64px + env(safe-area-inset-bottom))` |
| Content max-width | `max-w-2xl` = 672px, centered |
| Content padding | `p-4 sm:p-6` |

---

## EMPLOYEE TODAY

| Element | Measurement |
|---|---|
| Shift card padding | `p-5` |
| Shift card radius | `rounded-2xl` |
| Shift time text | `text-4xl font-bold` |
| Task card padding | `p-4` |
| Task card radius | `rounded-2xl` |
| Task card gap | `space-y-3` = 12px |
| Goal count text | `font-mono text-2xl font-bold` |
| Goal bar height | `h-2` = 8px |
| Action button height | `min-h-[52px]` |

### Progress Editor (full-screen)

```
┌──────────────────────────────────────┐
│  HEADER (px-4 py-4 border-b)        │  flex-shrink-0, safe-area-top
│  [←]  Update progress               │
├──────────────────────────────────────┤
│  SCROLLABLE BODY (px-4 py-6)        │  flex-1 overflow-y-auto
│                                      │
│  Task name (text-xl font-bold)       │
│  Target: N unit (text-sm)           │
│                                      │
│  CURRENT PROGRESS label              │
│                                      │
│  ┌──────────────────────────────┐   │
│  │   83   (text-4xl font-mono)  │   │  min-h-80px, border-2 rounded-2xl
│  └──────────────────────────────┘   │
│                                      │
│  [−]      orders      [+]           │  gap-8, buttons w-56px h-56px
│                                      │
│  83 / 120                    69%    │
│  ████████████░░░░░░░░  (h-2)        │
│                                      │
├──────────────────────────────────────┤
│  FOOTER (px-4 py-4 border-t)        │  flex-shrink-0, safe-area-bottom
│  [        Save progress        ]    │  min-h-60px, bg-blue-600
└──────────────────────────────────────┘
```

| Element | Measurement |
|---|---|
| Header padding | `px-4 py-4` |
| Back button | `min-w-[44px] min-h-[44px]` |
| Body padding | `px-4 py-6` |
| Body gap | `space-y-6` = 24px |
| Number input | `w-full text-4xl font-mono font-bold py-5 min-h-[80px] rounded-2xl` |
| −/+ button | `w-14 h-14 rounded-full border-2` = 56×56px |
| −/+ row gap | `gap-8` = 32px |
| Progress bar | `h-2` = 8px |
| Save button | `w-full py-4 rounded-2xl min-h-[60px]` |
| Footer padding | `px-4 py-4` |

---

## EMPLOYEE SCHEDULE

| Element | Measurement |
|---|---|
| Page padding | `p-4 sm:p-6` |
| H1 margin-bottom | `mb-4` = 16px |
| WeekNav margin-bottom | `mb-4` |
| DayPills margin-bottom | `mb-5` = 20px |
| Shift card padding | `p-6` = 24px |
| Shift time | `text-4xl font-bold tracking-tight` |
| Note separator | `border-t border-gray-800 pt-3 mt-3` |
| Day-off card padding | `p-6 text-center` |

---

## EMPLOYEE HISTORY

| Element | Measurement |
|---|---|
| Page padding | `p-4 sm:p-6` |
| H1 margin-bottom | `mb-5` = 20px |
| Accordion gap | `space-y-2` = 8px |
| Week row border | `border border-gray-100 rounded-2xl` |
| Week header height | `min-h-[64px]` |
| Week header padding | `p-4` = 16px |
| Mini bar width | `w-16` = 64px |
| Mini bar height | `h-1.5` = 6px |
| Day row height | `min-h-[48px]` |
| Day row padding | `py-3` |
| Day bar width | `w-20` = 80px |
| Day bar height | `h-1` = 4px |

---

## OVERLAYS

### Modal

| Element | Measurement |
|---|---|
| Default width | `max-w-md` = 448px |
| Max height | `max-h-[90vh]` |
| Radius | `rounded-2xl` |
| Shadow | `shadow-2xl` |
| Backdrop | `bg-black/20 backdrop-blur-sm` |
| Header padding | `p-5` |
| Body padding | `p-5` |
| z-index | 50 |

### Sheet (bottom sheet)

| Element | Measurement |
|---|---|
| Max height | `max-h-[85dvh]` |
| Top radius | `rounded-t-3xl` = 24px |
| Shadow | `shadow-2xl` |
| Header padding | `px-5 py-4` |
| Body padding | `p-5` |
| z-index | 50 |

### ConfirmDialog

| Element | Measurement |
|---|---|
| Width | `max-w-sm` = 384px |
| Padding | `p-6` = 24px |
| Radius | `rounded-2xl` |
| Shadow | `shadow-xl` |
| z-index | 50 |

### ActionSheet

| Element | Measurement |
|---|---|
| Padding around | `p-4` |
| Card radius | `rounded-2xl` |
| Option height | `min-h-[52px] py-4 px-5` |
| Cancel button height | `min-h-[52px] py-4` |
| Gap between card and cancel | `space-y-2` = 8px |
| z-index | 60 |

### Toast

| Element | Measurement |
|---|---|
| Position | `top-20` = 80px from top, horizontally centered |
| Padding | `px-4 py-3` |
| Radius | `rounded-2xl` |
| z-index | 100 |

---

## RESPONSIVE BEHAVIOR PER VIEWPORT

### 320px
NOT SPECIFIED IN FIGMA. Expected: single column layout, all mobile patterns apply. Day pills may require horizontal scroll. Card text may wrap.

### 375px
Mobile layout. All `lg:hidden` patterns apply.
- Top bar: 56px + safe-area-top
- Quick action bar: 56px + safe-area-bottom
- Content padding: 16px (p-4)
- Nav drawer: 80vw = 300px

### 390px (iPhone 14 Pro)
Same as 375px. Minor layout differences in padding if `sm:` prefix applies (640px breakpoint not reached).

### 430px (iPhone 14 Plus)
Same as 375px mobile layout. `sm:` breakpoint not reached (640px).

### 768px
NOT SPECIFIED IN FIGMA. Still uses mobile layout (below `lg:` = 1024px).
- `sm:` classes apply: `sm:p-8` (32px padding), `sm:grid-cols-2` (stats), `sm:items-center` (modal centered vs bottom).
- Navigation still mobile (hamburger + drawer + quick action bar).

### 1024px (breakpoint crossover)
Desktop layout activates (`lg:` classes).
- Sidebar appears (224px)
- Mobile top bar hidden
- Mobile drawer hidden
- Quick action bar hidden
- Employee bottom nav hidden; desktop top nav appears
- Content padding `sm:p-8` = 32px

### 1280px
Desktop layout same as 1024px. More horizontal space for tables.

### 1440px
Desktop layout same. Schedule and Tasks grids show all 7 days comfortably.

---

## CONTENT WIDTHS BY SCREEN

| Screen | Max-width |
|---|---|
| Dashboard | `max-w-2xl` = 672px |
| Employees | No max-width (full content area) |
| Schedule | No max-width (full grid) |
| Tasks & Goals | No max-width (full table) |
| Settings: Org/Profile | `max-w-lg` = 512px |
| Settings: Teams/Work Areas/Templates | `max-w-xl` = 576px |
| Settings: Billing | `max-w-2xl` = 672px |
| Employee Today | `max-w-2xl` = 672px, centered |
| Employee Schedule | `max-w-2xl` = 672px, centered |
| Employee History | `max-w-2xl` = 672px, centered |
| Employee Profile | `max-w-2xl` = 672px, centered |
| Auth | Left: 400px fixed; Right: flex-1; Form: `max-w-sm` = 384px |
| Onboarding | `max-w-sm` = 384px, centered |
