# SCREEN IMPLEMENTATION SPECIFICATION
# Workday — All Screens

Source of truth: `src/App.tsx` implementation.
Reference date: TODAY = '2026-08-18' (Tuesday).
Mobile breakpoint: `lg:` = 1024px (below = mobile, at/above = desktop).

---

## MANAGER SHELL

### Route
`/app/manager` → state: `screen = 'manager'`, `tab = ManagerTab`

### Figma frame
`Manager / Shell`

### Desktop layout
- Root: `h-dvh flex flex-col bg-white overflow-hidden` (100dvh, no scroll on root)
- Top-level: `flex flex-1 overflow-hidden`
  - Sidebar: `w-56` (224px), `flex-shrink-0 border-r border-gray-100 flex-col bg-white`
  - Main: `flex-1 overflow-y-auto min-w-0`
- Sidebar header: `px-5 h-14` (56px), `border-b border-gray-100`; logo + "Workday" text
- Trial banner in sidebar: `mx-3 mt-3 px-3 py-2.5 bg-blue-50 rounded-xl border border-blue-100`
  - Copy: "14-day free trial" · "10 days remaining"
- Sidebar nav groups: "WORK", "MANAGE"
  - Nav item: `px-3 py-2.5 rounded-xl min-h-[44px]`, active = `bg-blue-50 text-blue-700`
- Sidebar footer: `px-3 pb-4 border-t border-gray-100 pt-3`; avatar + name + "Sign out"

### Mobile layout
- MobileTopBar: `lg:hidden fixed sticky top-0 z-30 bg-white border-b border-gray-100 safe-area-top`; height `calc(56px + env(safe-area-inset-top))`
  - Left: hamburger button (`Ic.Menu`, 20px), `min-w-[44px] min-h-[44px]`
  - Center: logo + "Workday"
  - Right: avatar (`xs`, 28px×28px), taps → Settings tab
- MobileNavDrawer: `fixed inset-0 z-50 lg:hidden`, `w-4/5 max-w-xs`, `height: 100dvh`
  - Backdrop: `bg-black/30 backdrop-blur-sm`
  - Drawer: `bg-white flex flex-col shadow-2xl`
  - Header: logo + close `Ic.X` button; trial banner; nav groups
- ManagerQuickActionBar: `lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex safe-area-bottom`, `minHeight: 56px`
  - Not shown on `employees` or `settings` tabs
  - Two columns, `flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium min-h-[56px]`
  - Col 1 (primary): `text-blue-600` — "Add task" (tasks/dashboard) or "Add shift" (schedule)
  - Col 2 (secondary): `text-gray-400` — "Template"

### Component tree
```
ManagerApp
├── MobileTopBar (lg:hidden, sticky top-0)
├── MobileNavDrawer (lg:hidden, fixed, z-50)
├── div.flex-1.flex
│   ├── ManagerSidebar (hidden lg:flex, w-56)
│   │   ├── Logo + "Workday" wordmark
│   │   ├── Trial banner
│   │   └── NavItems
│   │       ├── nav groups (WORK, MANAGE)
│   │       └── Footer (avatar, sign out)
│   └── main.flex-1.overflow-y-auto
│       └── [active tab content]
├── ManagerQuickActionBar (lg:hidden, fixed bottom)
└── [Sheets/Modals for template creation]
```

### States
- Sidebar nav item: default (`text-gray-600`), active (`bg-blue-50 text-blue-700`), hover (`bg-gray-50`)
- Drawer: open (rendered), closed (null)
- QuickActionBar: shown (dashboard/tasks/schedule), hidden (employees/settings)
- Trial banner: always visible (10 days remaining)

### Interactions
```
Click hamburger → opens MobileNavDrawer; focus moves to close button inside drawer
Click nav item (drawer) → sets tab; closes drawer; focus returns to hamburger button
Escape key (drawer open) → closes drawer
Click backdrop → closes drawer
Click avatar (top bar) → sets tab to 'settings'
Click "Add task" (QuickBar) → triggers onAddTask callback → opens Create task sheet
Click "Add shift" (QuickBar) → triggers onAddShift callback → opens Add shift sheet
Click "Template" (QuickBar) → opens ActionSheet with "Task template" / "Shift template"
Click "Task template" → opens New task template Sheet
Click "Shift template" → opens New shift template Sheet
Click "Sign out" → navigate to 'auth'
```

### Exact copy
- Sidebar wordmark: "Workday"
- Nav groups: "WORK", "MANAGE"
- Nav items: "Dashboard", "Employees", "Schedule", "Tasks & Goals", "Settings"
- Trial banner: "14-day free trial", "10 days remaining"
- Sidebar footer: "Alex Manager", "ABC Logistics", "Sign out"
- QuickBar: "Add task", "Add shift", "Template"
- ActionSheet title: "Create template"; options: "Task template", "Shift template"

---

## MANAGER DASHBOARD

### Route
`/app/manager` + `tab = 'dashboard'`

### Figma frame
`Manager / Dashboard`

### Desktop layout
- Container: `p-4 sm:p-8 pb-[88px] lg:pb-8 max-w-2xl`
- Header: date label + greeting (mt-5 lg:mt-0)
  - Date: `text-xs font-semibold text-gray-400 uppercase tracking-widest`
  - Greeting: `text-2xl font-semibold text-gray-900`
- Stat row: `flex items-baseline gap-3 mb-6`
  - Working count: `text-4xl font-semibold text-gray-900`
  - "people working today": `text-gray-400 text-sm`
  - Separator: `text-gray-200`
  - Off count: `text-lg font-medium text-gray-400`
- Cards grid: `grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6`
  - Card: `border border-gray-100 rounded-2xl p-5`
  - Label: `text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3`
  - Big number: `text-2xl font-semibold font-mono text-gray-900`
  - Progress bar: `h-1.5 bg-gray-100 rounded-full`; fill `bg-blue-600` (tasks) or `bg-emerald-500` (goals)
- "Needs attention" section: `mb-6`
  - Each alert: `flex items-center justify-between border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3`
  - Alert icon: `Ic.Alert size={15}`
  - "View →" link: `text-xs font-semibold text-blue-600`
- "Recent progress" section: `border border-gray-100 rounded-2xl divide-y divide-gray-50`
  - Row: `flex items-center justify-between px-4 py-3.5 min-h-[56px]`
  - Avatar `xs`, name `text-sm font-medium`, task name `text-xs text-gray-400`
  - Status: Badge "Done" (completed), mono `current/target` (goal), Badge "Pending"

### Mobile layout
- Same structure, `pb-[88px]` accounts for QuickActionBar
- Cards stack vertically (single column below sm)
- `mt-5` added before greeting on mobile (below sticky top bar)

### Component tree
```
ManagerDashboard
├── header div (date + greeting)
├── stat row (N people working · N off)
├── grid (Tasks today card + Goal progress card)
├── "Needs attention" section (conditional, 0–3 alerts)
└── "Recent progress" list
    └── row: Avatar + name/task + status badge
```

### States
- No attention items: section hidden
- No progress: "No progress updates yet today."
- Empty assignments: all zeros shown

### Interactions
```
Click "View →" (attention item) → sets tab to linked screen
```

### Exact copy
- Date: "Tuesday, August 18"
- Greeting: "Good morning, Alex"
- Stat: "{N} people working today · {N} off"
- Card labels: "TASKS TODAY", "GOAL PROGRESS"
- Task card: "{N} / {total} done"
- Goal card: "{N}% average"
- Section headers: "NEEDS ATTENTION", "RECENT PROGRESS"
- Alert examples: "{N} employee(s) waiting for approval", "{N} employees have incomplete tasks today"
- Empty: "No progress updates yet today."

---

## MANAGER EMPLOYEES

### Route
`/app/manager` + `tab = 'employees'`

### Figma frame
`Manager / Employees`

### Desktop layout
- Container: `p-4 sm:p-8`
- Page header: `flex items-start justify-between mb-5 mt-5 lg:mt-0`
  - h1: `text-2xl font-semibold text-gray-900`
  - Subtitle: `text-sm text-gray-400` — "{N} active · {N} pending"
  - "Invite" button: `Btn variant="primary" size="sm"` with `Ic.Plus size={13}`
- Toolbar: `flex flex-col sm:flex-row flex-wrap gap-3 mb-5`
  - Search: `relative flex-1`, icon `Ic.Search` at left-3, `pl-9` input, `min-h-[44px]`
  - Status tabs: `flex bg-gray-100 rounded-xl p-1 text-sm`; options: All / Active / Pending
  - Team select: native `<select>`, `px-3 py-2 border border-gray-200 rounded-xl text-sm min-h-[44px]`
- Desktop table: `hidden lg:block border border-gray-100 rounded-2xl overflow-x-auto`
  - Header: `bg-gray-50 border-b border-gray-100`; columns: [checkbox] Employee | Status | Team | Today's shift | Progress | [actions]
  - Header cell: `text-xs font-semibold text-gray-400 uppercase tracking-wide`
  - Row: `hover:bg-gray-50 group`, selected row: `bg-blue-50/40`
  - Employee cell: Avatar `sm` + name `font-medium` + email `text-xs text-gray-400`
  - Shift cell: `font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-lg`; or "Off" in gray-300
  - Progress cell: `font-mono text-xs text-gray-600`; or "—" in gray-300
  - Actions: `opacity-0 group-hover:opacity-100 transition-opacity`; Approve/Deactivate/Reactivate + Edit + Remove
- Bulk action bar: `fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-3`
  - "{N} selected" · Approve · Clear

### Mobile layout
- Mobile list: `lg:hidden space-y-2`
  - Each row: `flex items-center gap-4 p-4 border border-gray-100 rounded-2xl min-h-[76px]`
  - Avatar `md` + name/badge/team/shift + `Ic.ChevRight`
  - Taps → Employee Detail Sheet

### Component tree
```
ManagerEmployees
├── PageHeader (h1 + subtitle + Invite button)
├── Toolbar (search + status tabs + team select)
├── MobileList (lg:hidden)
│   └── EmployeeCard × N → opens Detail Sheet
├── DesktopTable (hidden lg:block)
│   ├── thead (7 columns)
│   └── tbody
│       └── EmployeeRow × N (checkbox, avatar, status, team, shift, progress, actions)
├── BulkActionBar (fixed, when selection > 0)
├── Employee Detail Sheet (mobile taps)
├── Employee Edit Modal (desktop/mobile)
├── Invite Modal
└── ConfirmDialog (deactivate / remove)
```

### States
- active: approve/deactivate/edit/remove actions
- pending: "Approve" primary action
- inactive: "Reactivate" action
- selected: `bg-blue-50/40` row
- empty: "No employees match."

### Interactions
```
Click "Invite" → opens Invite Modal
Click employee row (mobile) → opens Employee Detail Sheet
Click checkbox → toggles selection
Click all-checkbox → selects/deselects all filtered
Click "Approve" (row hover) → sets status to active
Click "Deactivate" → opens ConfirmDialog
Click edit icon → opens Edit Modal (desktop) or within Detail Sheet (mobile)
Click "Remove" → opens ConfirmDialog (danger)
Click "Approve" (bulk bar) → approves all selected
Click "Clear" (bulk bar) → clears selection
Send invitation → Send button closes modal
```

### Exact copy
- h1: "Employees"
- Subtitle: "{N} active · {N} pending"
- Invite button: "Invite"
- Filter tabs: "all", "active", "pending"
- Team select: "All teams"
- Table headers: "Employee", "Status", "Team", "Today's shift", "Progress"
- Status actions: "Approve", "Deactivate", "Reactivate", "Remove"
- Bulk bar: "{N} selected", "Approve", "Clear"
- Invite modal title: "Invite employee"
- Invite form: Email label, Name (optional) label, "Send invitation", "Or share org code", "WD-7K4P2", "Copy"
- Edit modal title: "Edit employee"
- Edit form: First name, Last name, Email, Team, "Cancel", "Save changes"
- Detail sheet: "Edit employee", "Approve"/"Deactivate"/"Reactivate", "Remove employee"
- Deactivate confirm: "Deactivate {name}?", "{name} will lose access. Their schedule and task history will be preserved.", "Deactivate"
- Remove confirm: "Remove {name}?", "This will permanently remove... This cannot be undone.", "Remove"
- Empty: "No employees match."

---

## MANAGER SCHEDULE

### Route
`/app/manager` + `tab = 'schedule'`

### Figma frame
`Manager / Schedule`

→ See SCHEDULE IMPLEMENTATION SPECIFICATION (doc 5) for full detail.

### Desktop layout summary
- Full-height: `h-full flex flex-col`
- Toolbar: `px-8 py-4 border-b border-gray-100`, h1 + WeekNav + Search + Team select + "Copy prev week" btn
- Grid: `flex-1 overflow-auto`, sticky header with checkbox + "Employee" col (192px) + 7 day cols (108px min each)
- Bulk float bar: `fixed bottom-6 left-1/2` when selection > 0

### Mobile layout summary
- Header: `px-4 py-4 border-b border-gray-100`
  - Row 1: h1 "Schedule" + `Ic.Dots` menu
  - Row 2: WeekNav
  - Row 3: DayPills (7 day pills)
  - Row 4: Search + Filters button
- List: scrollable employee cards for selected day
- Selection mode: checkbox per employee + action bar above QuickActionBar

---

## MANAGER TASKS & GOALS

### Route
`/app/manager` + `tab = 'tasks'`

### Figma frame
`Manager / Tasks & Goals`

### Desktop layout
- Full-height: `h-full flex flex-col`
- Toolbar: `px-8 py-4 border-b border-gray-100 flex-shrink-0`
  - Row 1: h1 + "Apply template" + "Assign to team" + "New task" buttons
  - Row 2: WeekNav + day pills (when Day mode) + Team select + Day/Week toggle
- Content: `flex-1 overflow-auto`
  - Day view: `<table>` with Employee | Task/Goal | Progress | [edit] columns
  - Week view: `<table>` with sticky Employee col + 7 day columns, each cell showing `done/total` badge

### Mobile layout
- Header: `px-4 py-4 border-b border-gray-100 space-y-3`
  - Row 1: h1 "Tasks & Goals" + Day/Week toggle
  - Row 2: WeekNav
  - Row 3: DayPills (only in Day mode)
  - Row 4: Team select (full-width `<select>`)
- Content: `flex-1 overflow-y-auto pb-[88px]`
  - Day view: grouped by employee, each assignment as tappable row
  - Week view: vertical day sections (sticky day header, no horizontal scroll)

### Component tree
```
ManagerTasks
├── MobileTasks (lg:hidden)
│   ├── Header (h1 + Day/Week toggle + WeekNav + DayPills + team select)
│   └── Content
│       ├── Day view: EmployeeSection × N → AssignmentRow × N (tappable)
│       └── Week view: DaySection × 7 → EmployeeAssignmentRow × N
├── DesktopTasks (hidden lg:flex)
│   ├── Toolbar (h1 + actions + WeekNav + filters)
│   └── Content
│       ├── Day table (Employee | Task | Progress | Edit)
│       └── Week table (Employee | Mon–Sun columns)
├── Create Task Sheet
├── Assign to Team Sheet
├── Apply Template Sheet → Review Sheet
└── Edit Progress Sheet (manager)
```

### States
- No assignments: "No tasks assigned" (gray-300 text)
- Completed assignment: Badge "Done" (green)
- Goal in progress: mono `current/target`
- Pending task: Badge "Pending" (amber)
- Week view cell: green badge (all done), gray badge (partial)

### Interactions
```
Click "New task" → opens Create task Sheet
Click "Assign to team" → opens Assign to team Sheet
Click "Apply template" → opens Apply template Sheet
Click "Review →" (apply template) → opens Review assignments Sheet
Click "Confirm" (review) → applies template
Click assignment row → opens Edit progress Sheet (manager/employee)
Click "Edit" (table row hover) → opens Edit progress Sheet
Click "Save" → saves progress, closes sheet
Day/Week toggle → switches view mode
```

### Exact copy
- h1: "Tasks & Goals"
- Buttons: "Apply template", "Assign to team", "New task"
- Toggle: "Day", "Week"
- Team select: "All teams"
- Create sheet title: "Create task or goal"
- Create fields: "Task name", type toggle "task" / "goal", "Target", "Unit", "Assign to"
- Assign sheet title: "Assign task to team"
- Apply template sheet title: "Apply task template"
- Template preview label: "Tasks in template"
- Review sheet title: "Review assignments"
- Review fields: Template, Employees, Tasks each, Total assignments, Date
- Review buttons: "← Back", "Confirm"
- Edit progress (task): "pending" / "completed" toggle buttons
- Edit progress (goal): number input + −/+ buttons
- Save: "Save"
- Day sticky label: "{fullLabel} · {short}"
- No tasks: "No tasks assigned"

---

## MANAGER SETTINGS

### Route
`/app/manager` + `tab = 'settings'`

### Figma frame
`Manager / Settings`

### Desktop layout
- Two-column: `hidden lg:flex h-full`
  - Left nav: `w-48` (192px), `border-r border-gray-100 py-6 px-3 overflow-y-auto`
    - Nav groups: Organization, Templates, Account, Billing
    - Nav item: `px-3 py-2.5 rounded-xl text-sm font-medium min-h-[44px]`; active = `bg-blue-50 text-blue-700`
  - Right content: `flex-1 overflow-y-auto p-8`
    - Content max-width: `max-w-lg` (org/profile) or `max-w-xl` (teams/work-areas/templates) or `max-w-2xl` (billing)

### Mobile layout
- `lg:hidden h-full overflow-y-auto`
- List view: `p-4 mt-5`; h1 "Settings"; nav groups as card list
  - Group card: `border border-gray-100 rounded-2xl divide-y divide-gray-50`
  - Item: `flex items-center justify-between px-4 py-4 min-h-[52px]`; taps → section detail
- Section detail: back button "← Settings" + section label in top bar; content below

### Settings Sections

#### Organization
- h2: "Organization"; subtitle: "Basic settings for your organization."
- Fields: Organization name, Country (select), Default language (select)
- "Save changes" button (turns "✓ Saved" for 2s)
- Org code box: `bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3`; mono "WD-7K4P2" + "Copy" link

#### Teams
- h2: "Teams"; "Group employees into teams."
- Team list: `border border-gray-100 rounded-2xl`, each `min-h-[68px]`
  - Color dot (w-3 h-3 rounded-full), name, member count, Edit + Delete icons
- Create team Sheet: name field + color picker (6 swatches)
- Edit team Sheet: name + members checklist (max-h-52 scroll)

#### Work Areas
- h2: "Work areas"; "Locations where shifts take place."
- Area list: status dot, name, Active/Inactive badge, Deactivate/Reactivate button
- Create area Sheet: name field only

#### Shift Templates
- h2: "Shift templates"; "Reusable shift patterns."
- Template list: status dot, name, time range (mono), Edit + Activate/Deactivate
- Create/Edit Sheet: name + start time + end time inputs

#### Task Templates
- h2: "Task templates"; "Reusable sets of tasks."
- Template list card: name + "{N} tasks" + Edit + Delete buttons
  - Items shown as pills: `bg-gray-50 border border-gray-100 rounded-full px-2 py-1`
  - Pill: type dot (blue=goal, emerald=task) + item name
- Create/Edit Sheet: template name + item list (name input + Task/Goal toggle + target/unit if goal)

#### Profile
- h2: "Profile"; "Manage your personal account settings."
- Avatar card (lg, name, email, Owner badge)
- Fields: First name, Last name, Email, Language
- "Save changes" button
- "Change password" section: "Send reset email" button
- "Danger zone": "Delete account" danger button

#### Billing (Subscription)
- h2: "Subscription"; "Manage your plan and billing."
- Current plan card: `border border-blue-100 bg-blue-50/40 rounded-2xl p-5 mb-6`
  - "Current plan" label, plan name, employee count/price, trial badge, progress bar
- Monthly/Yearly toggle: `flex bg-gray-100 rounded-xl p-1`; yearly → "Save up to 17%" badge
- Plan cards: `grid grid-cols-3 gap-3`; each `p-5 rounded-2xl border-2`
  - Plans: Workday 10 ($10/mo, up to 10 employees), Workday 20 ($20/mo, up to 20), Workday 40 ($30/mo, up to 40) [current]
  - "Current" badge, price, "Up to N employees", "Current plan" / "Switch" button
- Billing info: Stripe portal button, Next payment row

---

## EMPLOYEE TODAY

### Route
`/app/employee` + `tab = 'today'`

### Figma frame
`Employee / Today`

### Desktop layout
- Content: `max-w-2xl mx-auto`, padding `p-4 sm:p-6`
- Date + h1: "Tuesday, August 18" + "Today"
- Shift card (if working): `bg-[#090e1a] text-white rounded-2xl p-5 mb-6`
  - Label: `text-xs font-semibold text-gray-500 uppercase tracking-widest`
  - Time: `text-4xl font-bold tracking-tight`
  - Location: `text-sm text-gray-400`
- Shift absent: `bg-gray-50 rounded-2xl p-5 mb-6 text-center` — "No shift scheduled today"
- "Your work" section label: `text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4`
- Task cards: `space-y-3`
  - Card: `border rounded-2xl p-4`, done = `border-green-100 bg-green-50/30`
  - Task name: `font-semibold text-gray-900 text-sm`; done = `line-through text-gray-400`
  - Goal progress: count `font-mono text-2xl font-bold` + `/ target unit`, progress bar `h-2`
  - Action button: `w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold min-h-[52px]`
    - Goal: "Update progress" → opens full-screen progress editor
    - Task: "Mark as done" → marks completed inline

### Mobile layout
- Same as desktop (single column, no side nav)
- Bottom nav takes `pb: calc(64px + env(safe-area-inset-bottom))` on main

### Progress Editor (full-screen overlay)
- `fixed inset-0 z-50 bg-white flex flex-col` — `height: 100dvh`
- Header: `px-4 py-4 border-b border-gray-100 flex-shrink-0 safe-area-top`
  - Back arrow `Ic.ArrowLeft size={20}` + h2 "Update progress"
- Body: `flex-1 overflow-y-auto px-4 py-6 space-y-6`
  - Task name: `text-xl font-bold text-gray-900`
  - Target line: `text-sm text-gray-400` — "Target: {N} {unit}"
  - Section label: "CURRENT PROGRESS"
  - Input: `w-full text-center text-4xl font-mono font-bold border-2 border-gray-200 rounded-2xl py-5 min-h-[80px] bg-gray-50`; type=number, inputMode=numeric
  - −/+ row: `flex items-center justify-center gap-8`; each button `w-14 h-14 rounded-full border-2 border-gray-200 text-2xl min-w-[56px] min-h-[56px]`; unit label between them
  - Progress bar: `h-2 bg-gray-100`; fill `bg-blue-500`; `{current} / {target}` + `{pct}%`
  - Target reached: "✓ Target reached — will be marked complete" (green, `text-xs`)
- Footer: `flex-shrink-0 px-4 py-4 border-t border-gray-100 bg-white safe-area-bottom`
  - "Save progress": `w-full bg-blue-600 text-white text-base font-semibold py-4 rounded-2xl min-h-[60px]`

### States
- Working: dark shift card
- Day off: gray placeholder card
- Task pending: "Mark as done" / "Update progress" button
- Task completed: green border, line-through name, green check circle, no action button
- Goal at target: "✓ Target reached" message in progress editor

### Interactions
```
Click "Update progress" (goal) → opens full-screen progress editor
Click "Mark as done" (task) → marks completed; toast "✓ Task marked as done"
Input number (editor) → updates live; bar updates
Click − → decrement by 1 (min 0)
Click + → increment by 1 (max target)
Click "Save progress" → saves, closes editor; toast "✓ Progress updated"
Click ← (editor header) → closes without saving
```

### Exact copy
- Date: "Tuesday, August 18"
- h1: "Today"
- Shift label: "YOUR SHIFT"
- No shift: "No shift scheduled today"
- Work section: "YOUR WORK"
- Goal action: "Update progress"
- Task action: "Mark as done"
- Editor h2: "Update progress"
- Target line: "Target: {N} {unit}"
- Progress label: "CURRENT PROGRESS"
- Target reached: "✓ Target reached — will be marked complete"
- Save: "Save progress"
- Toast: "✓ Progress updated", "✓ Task marked as done"
- Empty: "You are all caught up."

---

## EMPLOYEE SCHEDULE

### Route
`/app/employee` + `tab = 'schedule'`

### Figma frame
`Employee / Schedule`

### Desktop/Mobile layout (same, single column)
- Container: `p-4 sm:p-6`, max-w-2xl centered
- h1: "Schedule" — `text-2xl font-bold text-gray-900 mb-4`
- WeekNav: `mb-4`
- DayPills: `mb-5`; 7 pills, each `min-w-[56px] min-h-[60px]`
- Shift card (working): `bg-[#090e1a] text-white rounded-2xl p-6`
  - Day label: `text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3`
  - Time: `text-4xl font-bold tracking-tight mb-2`
  - Location: `text-gray-400`
  - Note (if present): `text-sm text-gray-500 mt-3 border-t border-gray-800 pt-3`
- Day off card: `bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center`
  - "Day off" `font-semibold text-gray-700`, "{day} off" `text-sm text-gray-400`

### Component tree
```
EmployeeSchedule
├── h1 "Schedule"
├── WeekNav
├── DayPills (7 days)
└── ShiftCard or DayOffCard
```

### States
- Working: dark card with time + location + optional note
- Day off: gray "Day off" card

### Interactions
```
Click WeekNav prev/next → shifts week; resets to day 0
Click day pill → selects day; shows shift for that day
Click "Today" (WeekNav, when offset != 0) → returns to current week
```

### Exact copy
- h1: "Schedule"
- Day off: "Day off", "No shift on {day}."

---

## EMPLOYEE HISTORY

### Route
`/app/employee` + `tab = 'history'`

### Figma frame
`Employee / History`

### Desktop/Mobile layout
- Container: `p-4 sm:p-6`
- h1: "History" — `text-2xl font-bold text-gray-900 mb-5`
- Accordion list: `space-y-2`
  - Week row: `border border-gray-100 rounded-2xl overflow-hidden`
  - Header button: `w-full flex items-center justify-between p-4 min-h-[64px]`
    - Left: week label (`font-semibold text-sm`), task count (`text-xs text-gray-400`)
    - Right: mini progress bar `w-16 h-1.5` + `Ic.ChevRight`
  - Expanded: `border-t border-gray-100 px-4 py-2`
    - Day row: `flex items-center justify-between py-3 border-b border-gray-50 min-h-[48px]`
      - Day abbr: `text-sm font-medium text-gray-700 w-10`
      - Date: `text-xs text-gray-400`
      - Progress: bar `w-20 h-1` + mono `completed/total`
      - No tasks: "—" in gray-300

### States
- Expanded: shows day-by-day breakdown
- Collapsed: shows week label + summary
- All done: green bar, green text
- Partial: blue bar, gray text
- No tasks: "—"

### Interactions
```
Click week row → toggles expanded/collapsed (only one expanded at a time)
```

### Exact copy
- h1: "History"
- Week labels: "{weekRange}" (e.g. "Aug 18 – Aug 24")
- Summary: "{N} / {total} tasks done"
- Day labels: "MON", "TUE", "WED", "THU", "FRI"

---

## EMPLOYEE PROFILE

### Route
`/app/employee` + `tab = 'profile'`

### Figma frame
`Employee / Profile`

### Desktop/Mobile layout
- Container: `p-4 sm:p-6`
- h1: "Profile" — `text-2xl font-bold text-gray-900 mb-5`
- Avatar section: `flex flex-col items-center mb-6`; Avatar `lg` + name + org badge
- Fields: `space-y-4 mb-5` — First name, Last name, Email (with helper), Language
- "Save changes" button
- "Change password" section: `border-t border-gray-100 pt-5 mt-5`
- "Sign out" section: `border-t border-gray-100 pt-5 mt-5`

### States
- Saved: button shows "✓ Saved" for 2s

### Interactions
```
Click "Save changes" → shows "✓ Saved" briefly
Click "Sign out" → navigate to 'auth'
Click "Delete account" → NOT SPECIFIED IN FIGMA (employee version)
```

### Exact copy
- h1: "Profile"
- Org badge: "ABC Logistics"
- Fields: "First name", "Last name", "Email", "Language"
- Email helper: "Email changes require verification."
- "Save changes" / "✓ Saved"
- "Sign out"

---

## AUTHENTICATION

### Route
`/auth`

### Figma frame
`Auth / Login` + `Auth / Sign up`

### Desktop layout
- Root: `min-h-screen bg-white flex`
- Left panel: `hidden lg:flex flex-col justify-between w-[400px] flex-shrink-0 bg-[#090e1a] text-white p-10`
  - Top: Logo + "Workday" wordmark + tagline + 3 feature bullets
  - Bottom: "14-day free trial"
- Right panel: `flex-1 flex items-center justify-center p-5 sm:p-8 overflow-y-auto`
  - Card: `w-full max-w-sm`

### Mobile layout
- Left panel hidden, mobile logo shown in card area
- Same form, full width, centered

### States
- Login mode: email + password
- Signup mode: first/last name + email + password + confirm + language + checkbox
- Manager / Employee role toggle

### Interactions
```
Click Manager/Employee toggle → switches role
Click "Sign in" → navigate to manager/employee app directly
Click "Create account" → navigate to onboarding
Click "Sign up free" / "Sign in" → switches login/signup mode
Click "Manager →" (demo) → navigate to 'manager'
Click "Employee →" (demo) → navigate to 'employee'
```

### Exact copy
- Left panel tagline: "Plan the work.\nShow the work.\nDo the work.\nSee the progress."
- Bullets: "Manage 40 employees faster than a spreadsheet", "Schedules, tasks & goals in one place", "Simple enough for every frontline worker"
- Left footer: "14-day free trial"
- Login h1: "Welcome back"; subtitle: "Sign in to continue."
- Signup h1: "Create your account"; subtitle: "Start your 14-day free trial."
- Role toggle: "Manager", "Employee"
- Fields: "First name", "Last name", "Email", "Password", "Confirm password", "Language"
- Terms: "I agree to the Terms of Service and Privacy Policy"
- Login button: "Sign in"
- Signup button: "Create account"
- Switch links: "Don't have an account? Sign up free", "Already have an account? Sign in"
- Demo section: "Jump to demo", "Manager →", "Employee →"

---

## MANAGER ONBOARDING

### Route
`/manager-onboard` then `/manager-setup`

### Figma frame
`Onboarding / Create org` + `Onboarding / Setup checklist`

### Screens
1. Create organization form: org name + country + language → "Create organization"
2. Org code reveal: large mono code "WD-7K4P2", "Copy code", "Set up your organization →"
3. Setup checklist: 6 steps with done/pending states, "Start"/"Skip" per step, "Skip setup" link

### Exact copy
- Form h1: "Create your organization", subtitle: "Set up your workspace to start managing your team."
- Code reveal h1: "{orgName} is ready"
- Code reveal subtitle: "Share this code with your employees so they can request access."
- Org code label: "ORGANIZATION CODE"
- Copy button: "Copy code" / "✓ Copied"
- CTA: "Set up your organization →"
- Checklist h1: "Set up your workday", subtitle: "Complete these steps to get your team running."
- Steps: "Create organization" (done), "Add employees", "Create teams" (optional), "Add work areas" (optional), "Build your first schedule", "Assign first work"
- Skip: "Skip setup and go to dashboard →"

---

## EMPLOYEE ONBOARDING

### Route
`/employee-onboard`

### Figma frame
`Onboarding / Join org`

### Screens
1. Enter code: large mono centered input "WD-7K4P2" → "Find organization"
2. Confirm org: org card (ABC Logistics) → "Request access" / "Back"
3. Pending state: amber icon + "Request sent" + status box + "Continue to app"

### Exact copy
- h1: "Join an organization"
- Subtitle: "Enter the code your manager shared with you."
- Input label: "Organization code *"
- Button: "Find organization" (disabled until 4+ chars)
- Confirm h1: "Join organization"
- Org card: "ABC Logistics", "Logistics · Warsaw, Poland"
- Pending h1: "Request sent"
- Pending subtitle: "Your request to join ABC Logistics has been sent. A manager needs to approve it."
- Status label: "STATUS", status value: "Waiting for manager approval"
- CTA: "Continue to app"
