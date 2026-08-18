# SCHEDULE IMPLEMENTATION SPECIFICATION
# Workday — Manager & Employee Schedule

Source of truth: `src/App.tsx` — `ManagerSchedule` + `EmployeeSchedule` components.

---

## MANAGER SCHEDULE — DESKTOP

### Shell
- Full-height flex container: `h-full flex flex-col`
- Hidden on mobile: `hidden lg:flex flex-col flex-1 overflow-hidden`

### Toolbar
**Container:** `px-8 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between flex-shrink-0`

**Left group:** `flex items-center gap-3`
- h1: `text-xl font-semibold text-gray-900` — "Schedule"
- WeekNav: prev/next/Today buttons + week label

**Right group:** `flex items-center gap-2 flex-wrap`
- Search input: `pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm w-40`; `Ic.Search size={14}` at left-3
- Team select: `px-3 py-2 border border-gray-200 rounded-xl text-sm appearance-none`; options: "All teams" + teams
- "Copy prev week" button: `Btn variant="outline" size="sm"` with `Ic.Copy size={13}`

### Calendar Grid
**Container:** `flex-1 overflow-auto`

**Table structure:** `min-w-full border-collapse text-sm`

**Header row:** `sticky top-0 z-20 bg-white border-b border-gray-100`
- Checkbox cell: `sticky left-0 z-30 bg-white w-8 px-3 py-3 border-r border-gray-100`
  - Input: `w-4 h-4 rounded border-gray-300 text-blue-600`; selects/deselects all visible employees
- Employee label cell: `sticky left-8 z-30 bg-white w-48 text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-r border-gray-100`
  - Content: "Employee"
- Day cells (×7): `text-center px-1 py-3 min-w-[108px]`; today = `bg-blue-50`
  - Content: day abbreviation `text-xs font-semibold` (today = `text-blue-700`, other = `text-gray-500`) + date `text-[11px]` (today = `text-blue-500`, other = `text-gray-400`) + `Ic.Dots` button
  - Dots button: `p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-500 min-w-[28px] min-h-[28px]`; title="Day actions"

**Employee rows:**
- Row: `hover:bg-gray-50/50 group`; selected = `bg-blue-50/30`
- Checkbox cell: `sticky left-0 z-10 bg-white px-3 py-2 border-r border-gray-50`
- Employee cell: `sticky left-8 z-10 bg-white px-4 py-2 border-r border-gray-50`
  - Content: Avatar `xs` + name `text-sm font-medium text-gray-900` + team `text-[11px] text-gray-400`
- Day cells: `px-1 py-2 text-center`; today = `bg-blue-50/30`
  - Shift button (assigned): `w-full px-1 py-2 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-700 font-medium`; shows "06:00–14:00"
  - Shift button (empty): `border border-dashed border-gray-200 text-gray-300 hover:bg-gray-100 hover:text-gray-500`; shows "+"

**Row dividers:** `divide-y divide-gray-50`

**Empty state:** `<td colSpan={9}> px-4 py-12 text-center text-gray-400 text-sm` — "No employees match."

### Exact Measurements — Desktop Grid

| Element | Measurement |
|---|---|
| Toolbar padding | `px-8 py-4` = 32px × 16px |
| Checkbox column width | 32px (`w-8`) |
| Employee column width | 192px (`w-48`), sticky at `left-8` |
| Day column min-width | 108px (`min-w-[108px]`) |
| Day column padding | `px-1 py-3` = 4px × 12px |
| Shift cell padding | `px-1 py-2` |
| Shift cell radius | `rounded-lg` = 8px |
| Dots button size | `min-w-[28px] min-h-[28px]` |
| Header z-index | 20 (thead `sticky top-0`) |
| Checkbox col z-index | 30 (header), 10 (body) |
| Employee col z-index | 30 (header), 10 (body) |
| Row divide | `divide-y divide-gray-50` |

### Desktop Bulk Selection
**Float bar:** `fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-3`

**Content:** "{N} selected" `text-sm font-medium text-gray-300` · separator `w-px h-5 bg-gray-700` · "Apply shift" `text-sm font-medium hover:text-blue-300` · "Clear" `text-sm font-medium text-gray-400 hover:text-white`

**Shown when:** `selectedEmps.length > 0`

### Desktop Interactions

```
Click checkbox (header) → selects/deselects all visible employees
Click checkbox (row) → toggles employee selection
Click shift cell (assigned) → opens Edit shift Modal
Click shift cell (empty) → opens Add shift Modal
Click Dots icon (day header) → opens Copy day Sheet
Click "Copy prev week" → opens ConfirmDialog "Copy previous week?"
Click "Apply shift" (bulk bar) → opens Apply shift Sheet (bulk)
Click "Clear" (bulk bar) → clears selection
Click employee name area → NOT SPECIFIED IN FIGMA
```

---

## MANAGER SCHEDULE — MOBILE

### Shell
- Rendered in: `lg:hidden flex-1 flex flex-col overflow-hidden`
- Full inner structure: `flex flex-col h-full`

### Header Block
**Container:** `px-4 py-4 border-b border-gray-100 space-y-3`

**Row 1 — Title + Menu:**
- h1: `text-xl font-semibold text-gray-900` — "Schedule"
- Dots menu button: `p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 min-w-[44px] min-h-[44px]`; `Ic.Dots size={18}`
- Dots menu dropdown: `absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 min-w-[180px] py-1.5`
  - Options: "Copy previous week", "Copy day", "Clear day" (red)
  - Each: `w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 min-h-[44px]`

**Row 2 — WeekNav:** `offset, setOffset, label`; prev/next buttons + centered week label + optional Today button.

**Row 3 — DayPills:** 7 pills (MON–SUN), horizontal scroll if needed. Active = selected day. Today = blue-50/blue-200.

**Row 4 — Search + Filters:**
- Container: `flex gap-2`
- Search: `relative flex-1`; `pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm min-h-[44px]`; `Ic.Search size={14}`
- Filters button: `flex items-center gap-1.5 px-4 py-2.5 border rounded-xl text-sm font-medium min-h-[44px]`
  - Default: `border-gray-200 text-gray-700 hover:bg-gray-50` — "Filters"
  - Active filter: `border-blue-300 bg-blue-50 text-blue-700` — "Filters ·"

### Employee List Area
**Container:** `flex-1 overflow-y-auto pb-[88px]`

**Sticky day header:** `px-4 py-3 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10`
- Day label: `text-xs font-bold text-gray-500 uppercase tracking-widest` — "{fullLabel} · {short}"
- Normal state: "Select" button `text-xs font-medium text-gray-500 border border-gray-200 rounded-xl px-2 min-h-[36px]`
- Selection mode: "Deselect all"/"Select all" + "Cancel" buttons

**Employee rows:** `divide-y divide-gray-50`
- Row: `flex items-center px-4 py-3.5 gap-3 min-h-[72px]`; selected = `bg-blue-50/40`; default = `hover:bg-gray-50/50`
- Checkbox (selection mode only): `w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer flex-shrink-0`
- Avatar: `sm` size (36px)
- Info: name `text-sm font-semibold text-gray-900` + team `text-xs text-gray-400`
- Shift button (right):
  - Assigned: `flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium min-h-[44px] min-w-[80px] bg-blue-600 text-white hover:bg-blue-700`; shows "HH:MM–HH:MM"
  - Empty: `border border-dashed border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500`; shows "+ Add"

**Empty state:** `px-4 py-12 text-center text-gray-400 text-sm` — "No employees match."

### Mobile Exact Measurements

| Element | Measurement |
|---|---|
| Header padding | `px-4 py-4` = 16px × 16px |
| Header inner gap | `space-y-3` = 12px |
| Search input height | `min-h-[44px]` |
| Filters button height | `min-h-[44px]` |
| Day pill size | `min-w-[56px] min-h-[60px]` |
| Day pill radius | `rounded-xl` = 12px |
| Day pill padding | `px-3 py-2.5` |
| Day label (abbr) | `text-[10px]` = 10px |
| Day number | `text-lg` = 18px, `font-bold` |
| Employee row height | `min-h-[72px]` |
| Employee row padding | `px-4 py-3.5` = 16px × 14px |
| Shift button min-width | `min-w-[80px]` |
| Shift button height | `min-h-[44px]` |
| Sticky day header z-index | 10 |
| Content bottom padding | `pb-[88px]` = 88px |
| Dots dropdown min-width | `min-w-[180px]` |
| Dots dropdown radius | `rounded-2xl` |

### Mobile Selection Mode
**Trigger:** "Select" button in sticky day header

**Activated state:**
- Checkboxes appear at start of each employee row
- Sticky header shows: selected count + "Select all"/"Deselect all" + "Cancel"
- Bulk action bar appears above QuickActionBar: `fixed bottom-[64px] left-0 right-0 z-25 bg-white border-t border-gray-100 px-4 py-3 flex gap-2`
  - "{N} selected · Apply shift" primary button + "Cancel" outline button

**Auto-exit:** After `applyBulkShift()` executes → `setSelectionMode(false)` + `setSelectedEmps([])`

### Mobile Filters Sheet
**Trigger:** "Filters" button in header → `setShowMobileFilters(true)`

**Sheet title:** "Filters"

**Content:**
```
Team
[All teams ▾]

[Reset]    [Apply filters]
```

- Team: `Sel` component
- Buttons: Reset (outline, full-width) + Apply filters (primary, full-width)
- Reset action: clears `pendingTeamFilter` AND `teamFilter`, closes sheet
- Apply action: copies `pendingTeamFilter` → `teamFilter`, closes sheet

### Mobile Interactions

```
Click day pill → sets dayIndex → updates employee list for that day
Click Dots (header) → opens day menu dropdown
  Click "Copy previous week" → opens ConfirmDialog (then overwrite check)
  Click "Copy day" → opens Copy day Sheet
  Click "Clear day" → clears all shifts for selected day
Click "Filters" → opens Filters Sheet
Click shift button (assigned) → opens Edit shift Sheet
Click shift button (empty, + Add) → opens Edit shift Sheet (add mode)
Click "Select" → enters selection mode
Click employee checkbox → toggles selection
Click "Apply shift" (bulk bar) → opens Apply shift Sheet (bulk)
Click "Cancel" (bulk bar) → exits selection mode
```

---

## SHIFT EDITOR (shared, mobile = Sheet / desktop = Modal)

### Fields (ShiftEditorFields)
```
Start  |  End
[06:00]   [14:00]    ← time inputs, flex gap-3

Work area
[select ▾]

TEMPLATES
[Morning 06:00–14:00]  [Evening 14:00–22:00]  ← grid 2 cols

Note (optional)
[placeholder: e.g. Supervisor shift]
```

**Start/End inputs:** `type="time"`, `font-mono`, `border border-gray-200 rounded-xl text-sm min-h-[44px]`

**Work area:** `Sel` with `option value=""` "No area" + active areas

**Templates grid:** `grid grid-cols-2 gap-2`; each: `px-3 py-2.5 border border-gray-200 rounded-xl text-xs text-left hover:border-blue-300 hover:bg-blue-50 min-h-[44px]`
- Template name: `font-medium text-gray-800`
- Template time: `text-gray-400 font-mono`

**Note field:** `Field` component, optional

**Action buttons (mobile Sheet):**
- Row: `flex gap-3 mt-4`
- Remove (if editing existing): `Btn variant="ghost" className="text-red-500 hover:bg-red-50"` — "Remove"
- Spacer: `flex-1`
- Cancel: `Btn variant="outline"` — "Cancel"
- Save: `Btn variant="primary"` — "Save"

**Action buttons (desktop Modal):**
- Remove: `Btn variant="ghost" ... "Remove shift"`
- Cancel: `Btn variant="outline"` — "Cancel"
- Save: `Btn variant="primary"` — "Save shift"

**Sheet title:**
- Add mode: "Add shift"
- Edit mode: "Edit shift"

---

## ADD SHIFT FORM (mobile Quick Action Bar)

**Trigger:** "Add shift" in ManagerQuickActionBar on Schedule tab

**Sheet title:** "Add shift"

**Content:**
```
Employee
[select employee ▾]

[📅 Monday · Aug 18]         ← blue-50 bg, cal icon, selected day

TEMPLATES
[Morning  06:00–14:00]  [Evening 14:00–22:00]  ← active when times match

Start    |    End
[06:00]       [14:00]

Work area
[select ▾]

Note (optional)
[placeholder: e.g. Supervisor shift]

[Cancel]  [Add shift]
```

- Employee: `Sel` over `activeEmps`
- Date display: `flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3`; `Ic.Cal` + `text-sm font-medium text-blue-800`
- Templates: `grid grid-cols-2 gap-2 mb-4`; active selection = `border-blue-500 bg-blue-50`
- Time inputs: side-by-side `flex gap-3`
- Work area: `Sel`
- Note: `Field` optional
- Buttons: `flex gap-3 pt-1`; Cancel (outline, flex-1) + "Add shift" (primary, flex-1, disabled if no employee)

---

## APPLY BULK SHIFT (Sheet)

**Title:** "Apply shift to {N} employees"

**Content:**
```
Shift template
[select ▾]

Work area
[select ▾]

Applies to: Monday, Aug 18     ← text-xs text-gray-400

[Cancel]  [Apply shift]
```

---

## COPY OPERATIONS

### Copy Previous Week
**Trigger:** "Copy prev week" button (desktop toolbar) or "Copy previous week" (mobile dots menu)

**Flow:**
1. Opens ConfirmDialog: "Copy previous week?" / "This will overwrite any existing shifts this week." / [Cancel] [Copy week]
2. If current week has any shifts: shows overwrite ConfirmDialog (danger): "Overwrite existing shifts?" / "This week already has shifts. Copying the previous week will overwrite them." / [Cancel] [Overwrite]
3. Executes: copies each employee's shifts from prev week day-by-day to current week

### Copy Day
**Trigger:** Dots button on day header cell (desktop) or "Copy day" in mobile menu

**Sheet title:** "Copy day"

**Content:**
```
Copy all shifts from Monday to another day.

Copy to
[Select a day… ▾]

[Cancel]  [Copy]   ← Copy disabled until day selected
```

**Overwrite check:** If target day has existing shifts → ConfirmDialog (danger): "Overwrite {day}?" / "{day} already has shifts. Copying will overwrite them." / [Cancel] [Overwrite]

### Clear Day (mobile only)
**Trigger:** "Clear day" in mobile dots menu
**Action:** Sets all active employee shifts on selected day to null; no confirmation.

---

## EMPLOYEE SCHEDULE

### Shell
`EmployeeSchedule` — same layout for desktop and mobile.
**Container:** `p-4 sm:p-6`, `max-w-2xl mx-auto`

### Header
- h1: `text-2xl font-bold text-gray-900 mb-4` — "Schedule"

### Week Navigation
- WeekNav component: `mb-4`
- DayPills: `mb-5`; 7 pills, today highlighted, selected highlighted blue-600

### Shift Display
**Working day — dark card:**
```
bg-[#090e1a] text-white rounded-2xl p-6

MONDAY         ← text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3
06:00–14:00    ← text-4xl font-bold tracking-tight mb-2
Zone A         ← text-gray-400
Supervisor shift  ← text-sm text-gray-500 mt-3 border-t border-gray-800 pt-3 (optional note)
```

**Day off card:**
```
bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center

Day off         ← font-semibold text-gray-700 mb-1
No shift on Monday.  ← text-sm text-gray-400
```

### Employee Schedule Measurements

| Element | Measurement |
|---|---|
| Page padding | `p-4` (16px) / `sm:p-6` (24px) |
| H1 margin | `mb-4` = 16px |
| WeekNav margin | `mb-4` = 16px |
| DayPills margin | `mb-5` = 20px |
| Shift card padding | `p-6` = 24px |
| Shift time | `text-4xl font-bold tracking-tight` |
| Note border | `border-t border-gray-800 pt-3 mt-3` |
| Day off padding | `p-6 text-center` |

### Employee Schedule Interactions

```
Click prev/next week → shifts week offset; resets selectedDay to 0
Click day pill → sets selectedDay; shows shift/off card for that day
Click "Today" → returns to offset=0
```

---

## SCHEDULE GRID INTERACTION SUMMARY

### CLICK → RESULT (all variants)

**Desktop Schedule:**
```
Click header checkbox                    → selects/deselects all active employees
Click row checkbox                       → toggles employee selection
Click shift cell (filled, blue)          → opens "Edit shift" Modal
Click shift cell (empty, dashed border)  → opens "Add shift" Modal
Click day header Dots button             → opens Copy day Sheet for that day
Click "Copy prev week" button            → opens Copy week ConfirmDialog
Click "Apply shift" (float bar)          → opens bulk Apply shift Sheet
Click "Clear" (float bar)               → clears selection
```

**Mobile Schedule:**
```
Click day pill                           → changes selected day
Click Dots (⋯) icon (header)            → opens dropdown menu
  "Copy previous week"                   → ConfirmDialog then copy
  "Copy day"                             → Copy day Sheet
  "Clear day"                            → clears selected day shifts
Click "Filters"                          → opens Filters Sheet
  [Apply filters]                        → applies team filter
  [Reset]                                → clears filter
Click shift button (filled, blue)        → opens "Edit shift" Sheet
Click "+ Add" (shift button empty)       → opens "Edit shift" Sheet (add mode)
Click "Select"                           → enters selection mode
Click employee checkbox (selection mode) → toggles employee
Click "Select all"                       → selects all visible
Click "Deselect all"                     → deselects all
Click "Apply shift" (bulk bar)           → opens Apply shift Sheet
Click "Cancel" (bulk bar)               → exits selection mode
Click QuickActionBar "Add shift"         → opens Add shift Sheet (with employee picker)
Click QuickActionBar "Template"          → opens ActionSheet for template type
```

**Employee Schedule:**
```
Click prev week button                   → weekOffset - 1; selectedDay = 0
Click next week button                   → weekOffset + 1; selectedDay = 0
Click "Today"                            → weekOffset = 0
Click day pill                           → sets selectedDay index
```

---

## SHIFT CARD ANATOMY

### Manager Desktop Grid Cell
```
┌────────────────────────────────────┐
│  bg-blue-600 rounded-lg text-xs    │  ← assigned shift
│  06:00–14:00  (font-medium)        │
└────────────────────────────────────┘

┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│  border-dashed text-gray-300       │  ← empty slot
│  +                                 │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

### Manager Mobile List Button
```
┌──────────────────────┐
│ bg-blue-600 rounded-xl text-xs font-medium  │  assigned
│ 06:00–14:00                                 │  min-w-80px min-h-44px
└──────────────────────┘

┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│  border-dashed text-gray-400               │  empty
│  + Add                                     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

### Employee Today Shift Card
```
┌────────────────────────────────────────────┐
│  bg-[#090e1a] text-white rounded-2xl p-5  │
│                                            │
│  YOUR SHIFT        ← text-xs uppercase    │
│  06:00–14:00       ← text-4xl font-bold   │
│  Zone A            ← text-sm text-gray-400│
└────────────────────────────────────────────┘
```

### Employee Schedule Shift Card
```
┌────────────────────────────────────────────┐
│  bg-[#090e1a] text-white rounded-2xl p-6  │
│                                            │
│  MONDAY             ← day label            │
│  06:00–14:00        ← text-4xl font-bold  │
│  Zone A             ← text-gray-400       │
│  ─────────────────────────────────────    │  optional note separator
│  Supervisor shift   ← text-sm text-gray-500│
└────────────────────────────────────────────┘
```

---

# UI REBUILD PRIORITY

## P0 — Must match implementation exactly

| Screen / Component | Priority reason |
|---|---|
| ManagerQuickActionBar | Core mobile action entry point; exact icon+label column style |
| Sheet (bottom sheet) | Used everywhere; max-h-[85dvh], rounded-t-3xl, safe-area-bottom |
| Employee progress editor | 100dvh, sticky footer, keyboard-aware, exact input+button layout |
| MobileNavDrawer | Focus management, accessibility, 100dvh |
| DayPills | Critical schedule navigation on mobile; exact pill sizes |
| ScheduleGrid (desktop) | Sticky columns, overflow-auto, z-index layering |
| ShiftEditorFields | Templates grid, time inputs, correct button placement |
| ManagerSchedule mobile employee rows | min-h-72px, shift button sizing |
| Employee shift card (dark) | bg-[#090e1a] exact; text-4xl time |

## P1 — Important

| Screen / Component | Priority reason |
|---|---|
| Manager Dashboard | StatCards, alert rows, recent progress list |
| Employee Today (TaskCards) | Goal progress bar, action buttons, completed state |
| ManagerEmployees desktop table | Sticky actions on hover, checkbox selection |
| WeekNav | Shared across 4+ screens |
| Settings sections | Form layouts, org code display, billing plan grid |
| Mobile Schedule Filters Sheet | Team filter with Apply/Reset |
| Mobile Schedule selection mode | Bulk action bar positioning above QuickActionBar |
| Manager Tasks mobile (week view) | Vertical day sections, no horizontal scroll |
| Manager Tasks mobile (day view) | Employee grouping, assignment tappability |

## P2 — Secondary

| Screen / Component | Priority reason |
|---|---|
| Auth screen | Left panel dark design, feature bullets |
| Manager onboarding | Org code display, checklist steps |
| Employee onboarding | Code input styling |
| Employee History | Accordion week expansion |
| Employee Profile | Avatar center layout |
| Settings Teams color picker | 6 color swatches |
| Task Template Item form | Type toggle + goal fields |

---

# CURRENT IMPLEMENTATION GAP

## Manager Dashboard
- **Status:** MATCHES SPEC CLOSELY
- What works: StatCards, AlertRows, RecentProgress list, responsive grid
- What needs checking: `mt-5 lg:mt-0` spacing below mobile top bar
- Unknown: Figma exact card visual vs current border-gray-100 implementation

## Manager Employees
- **Status:** MATCHES SPEC CLOSELY
- What works: mobile card list + desktop table + sheets + confirmation dialogs
- Gap: desktop table column widths not explicitly fixed (flex-based), may cause misalignment
- Unknown: Figma exact column widths

## Manager Schedule Desktop
- **Status:** MOSTLY MATCHES**
- What works: grid, sticky columns, day headers, shift cells, copy operations, bulk selection
- Known issue: z-index layering on sticky left columns may cause visual artifacts on scroll
- Rebuild needed: extract inline components; test sticky column behavior across browsers

## Manager Schedule Mobile
- **Status:** MATCHES SPEC**
- What works: DayPills, employee list, shift buttons, Filters sheet, selection mode, Add shift form
- What works: Dots menu with copy/clear operations
- Gap: `z-25` class on bulk action bar may not exist in Tailwind v4 without safelist

## Manager Tasks Desktop
- **Status:** MATCHES SPEC**
- What works: Day view table, Week view grid, apply template with review step

## Manager Tasks Mobile
- **Status:** MATCHES SPEC AFTER v0.9 FIX**
- What works: vertical week view (no horizontal scroll), day view employee sections
- Previous issue (fixed): horizontal table was rendering on mobile — now uses div-based vertical layout

## Employee Progress Editor
- **Status:** MATCHES SPEC AFTER v0.9 FIX**
- What works: 100dvh, sticky footer, single number input, −/+ buttons, progress bar
- Previous issue (fixed): duplicate large number display removed

## Employee History
- **Status:** MATCHES SPEC**
- What works: accordion, week summaries, day-by-day breakdown with bars

## Auth Screen
- **Status:** MATCHES SPEC**
- Gap: dark left panel only on ≥1024px; mobile shows just form

## Settings
- **Status:** MATCHES SPEC**
- Gap: billing plan grid uses `sm:grid-cols-3` (640px breakpoint) instead of container-aware breakpoint; may look odd at 640–1024px within shell

## General
- **What can be reused:** All shared components (Btn, Badge, Avatar, Field, Sel, Sheet, Modal, ConfirmDialog, ActionSheet, Toast, WeekNav, DayPills, ProgressBar, Logo)
- **What needs extracting:** Inline sub-components (MobileSchedule, DesktopSchedule, MobileTasks, DesktopTasks, TaskCard, ShiftCard, ProgressEditor, HistoryWeek)
- **What is unknown:** Exact Figma pixel measurements for schedule grid row heights; exact Figma column width for employee column; whether Figma shows shift cards with additional shadow or hover state beyond current implementation
