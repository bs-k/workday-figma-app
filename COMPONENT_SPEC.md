# COMPONENT SPECIFICATION
# Workday — All Components

Source of truth: `src/App.tsx` implementation.
Fonts: DM Sans (UI), JetBrains Mono (numeric/mono labels).
Mobile breakpoint: `lg:` = 1024px.

---

## 1. LAYOUT

### ManagerShell
SHARED COMPONENT

**Where:** Every Manager screen.

**Desktop:** `h-dvh flex flex-col bg-white overflow-hidden`; child `flex flex-1 overflow-hidden`; sidebar 224px + main flex-1.

**Mobile:** Stack — MobileTopBar (sticky, 56px) → main (flex-1 overflow-y-auto) → QuickActionBar (fixed 56px).

**Props:** tab, setTab, navigate, children (main content).

---

### ManagerSidebar
SHARED COMPONENT

**Where:** All manager screens at ≥1024px.

**Dimensions:** `w-56` = 224px wide, full height.

**Desktop only:** `hidden lg:flex flex-col`; `border-r border-gray-100`; `bg-white`.

**Header:** `px-5 h-14` (56px); `border-b border-gray-100`; Logo (28px) + "Workday" `text-sm font-semibold`.

**Trial banner:** `mx-3 mt-3 px-3 py-2.5 bg-blue-50 rounded-xl border border-blue-100`; `text-xs font-semibold text-blue-700`.

**Nav area:** `flex-1 px-3 py-4 space-y-4`.

**Footer:** `px-3 pb-4 border-t border-gray-100 pt-3`; avatar + name + sign-out.

**States:** nav item active = `bg-blue-50 text-blue-700`; default = `text-gray-600`; hover = `bg-gray-50`.

**Interactions:** Click nav item → sets tab.

---

### MobileTopBar
SHARED COMPONENT

**Where:** Manager app at <1024px, sticky top.

**Dimensions:** `height: calc(56px + env(safe-area-inset-top))`; `px-4`.

**Layout:** `flex items-center justify-between`; hamburger left, logo center, avatar right.

**Background:** `bg-white border-b border-gray-100`; `z-30`.

**Hamburger:** `Ic.Menu` 20px, `min-w-[44px] min-h-[44px]`, `p-2.5 rounded-xl hover:bg-gray-100`.

**Avatar:** `xs` size (28px), taps → Settings tab.

**States:** Always visible on mobile. Logo always shown.

---

### MobileNavDrawer
SHARED COMPONENT

**Where:** Manager app mobile, opens from hamburger.

**Dimensions:** `w-4/5 max-w-xs`; `height: 100dvh`; slides from left.

**Backdrop:** `bg-black/30 backdrop-blur-sm`.

**Drawer bg:** `bg-white flex flex-col shadow-2xl`.

**Header:** `px-5 border-b border-gray-100 safe-area-top min-height: 56px`; Logo + close button.

**Behavior:** Body scroll locked; Escape → close; backdrop click → close; focus moves to close button on open; focus returns to hamburger button on close.

**z-index:** `z-50`.

---

### EmployeeShell
SHARED COMPONENT

**Where:** All Employee screens.

**Root:** `bg-white flex flex-col` with `height: 100dvh`.

**Desktop nav:** `hidden lg:flex items-center justify-between px-8 h-14 border-b border-gray-100 bg-white flex-shrink-0`; logo left, tab buttons center, avatar right.

**Mobile bottom nav:** `lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-20 safe-area-bottom min-height: 56px`.

**Content:** `flex-1 overflow-y-auto`; `paddingBottom: calc(64px + env(safe-area-inset-bottom))`.

**Content inner:** `max-w-2xl mx-auto`.

---

## 2. NAVIGATION

### NavItems (Manager sidebar nav)
SHARED COMPONENT

**Groups:** WORK (Dashboard, Employees, Schedule, Tasks & Goals) / MANAGE (Settings).

**Group label:** `text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1`.

**Item:** `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium min-h-[44px]`.

**Active:** `bg-blue-50 text-blue-700`.

**Default:** `text-gray-600`.

**Hover:** `bg-gray-50 text-gray-900`.

**Icon:** 18×18px SVG, inline with label.

---

### EmployeeBottomNav
SHARED COMPONENT

**Where:** Employee app at <1024px, fixed bottom.

**Dimensions:** `minHeight: 56px`; `safe-area-bottom`; `border-t border-gray-100`.

**Tabs:** Today (`Ic.Task`) / Schedule (`Ic.Cal`) / History (`Ic.History`) / Profile (`Ic.User`).

**Layout:** `flex`; each tab = `flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px]`.

**Label:** `text-[11px] font-medium`.

**Active:** `text-blue-600`.

**Default:** `text-gray-400`.

**Hover:** `text-gray-600`.

**Desktop tab (inline nav):** `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium min-h-[40px]`; active = `bg-blue-50 text-blue-700`.

---

### WeekNav
SHARED COMPONENT

**Where:** Manager Schedule, Manager Tasks, Employee Schedule.

**Layout:** `flex items-center gap-1`.

**Prev/Next buttons:** `p-2 rounded-xl hover:bg-gray-100 text-gray-500 min-w-[44px] min-h-[44px] flex items-center justify-center`; `Ic.ChevLeft/ChevRight`.

**Label:** `text-sm font-semibold text-gray-800 min-w-[160px] sm:min-w-[200px] text-center`.

**Today button:** Only shown when `offset !== 0`; `text-xs font-medium text-blue-600 border border-blue-200 rounded-xl px-3 min-h-[36px]`.

---

### DayPills
SHARED COMPONENT

**Where:** Manager Schedule (mobile), Manager Tasks (mobile Day mode), Employee Schedule.

**Container:** `flex gap-2 overflow-x-auto pb-1 px-1 -mx-1`; no scrollbar.

**Each pill:** `flex-shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border min-w-[56px] min-h-[60px]`.

**Day label (top):** `text-[10px] font-bold uppercase tracking-wide` (e.g. "MON").

**Date number (bottom):** `text-lg font-bold leading-tight`.

**Active pill:** `border-blue-500 bg-blue-600 text-white`.

**Today pill (not active):** `border-blue-200 bg-blue-50 text-blue-700`.

**Default pill:** `border-gray-100 text-gray-600 hover:border-gray-200`.

---

### SettingsNav (Settings sidebar on desktop)
SCREEN-SPECIFIC COMPONENT

**Where:** Manager Settings at ≥1024px.

**Dimensions:** `w-48` = 192px; `border-r border-gray-100 py-6 px-3`.

**Groups:** Organization / Templates / Account / Billing.

**Item:** `w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium min-h-[44px]`.

**Active:** `bg-blue-50 text-blue-700`.

---

## 3. BUTTONS

### Btn (Primary button)
SHARED COMPONENT

**Variants:**
- `primary`: `bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800`
- `secondary`: `bg-gray-100 text-gray-800 hover:bg-gray-200`
- `outline`: `border border-gray-200 text-gray-700 hover:bg-gray-50`
- `ghost`: `text-gray-600 hover:bg-gray-100 hover:text-gray-900`
- `danger`: `bg-red-600 text-white hover:bg-red-700`

**Sizes:**
- `sm`: `px-3 py-2 text-xs min-h-[36px]`
- `md`: `px-4 py-2.5 text-sm min-h-[44px]`
- `lg`: `px-5 py-3.5 text-sm min-h-[52px]`

**Base classes:** `inline-flex items-center justify-center gap-1.5 font-medium rounded-xl cursor-pointer select-none border border-transparent whitespace-nowrap transition-colors`.

**Focus:** `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1`.

**Disabled:** `opacity-40 pointer-events-none`.

---

### Icon-only action buttons
SHARED COMPONENT

**Pattern:** `p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center`.

**Used for:** Edit (`Ic.Edit`), Delete (`Ic.Trash`), Close (`Ic.X`), Copy (`Ic.Copy`).

---

### ManagerQuickActionBar
SCREEN-SPECIFIC COMPONENT (but shared across dashboard/tasks/schedule)

**Where:** Manager app mobile, fixed bottom; not shown on employees/settings tabs.

**Dimensions:** `minHeight: 56px`; `border-t border-gray-100 bg-white`; `safe-area-bottom`; `z-30`.

**Layout:** `flex`; 2 equal-width columns.

**Primary column:** `flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-blue-600 hover:bg-gray-50 min-h-[56px]`; `Ic.Plus size={18}`.

**Secondary column:** `... text-gray-400 hover:bg-gray-50 hover:text-gray-600`; `Ic.Copy size={18}`.

---

## 4. INPUTS

### Field (text input)
SHARED COMPONENT

**Wrapper:** `div` with optional label.

**Label:** `block text-sm font-medium text-gray-700 mb-1.5`; required asterisk `text-red-500 ml-0.5`.

**Input:** `w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-h-[44px]`.

**Disabled:** `opacity-60 cursor-default`.

**Helper text:** `mt-1 text-xs text-gray-400`.

**Variants (not separate components, just type prop):** text, email, password, number, time, search.

---

### Numeric input (Progress Editor)
SCREEN-SPECIFIC COMPONENT (Employee Today → progress editor)

**Input:** `w-full text-center text-4xl font-mono font-bold border-2 border-gray-200 rounded-2xl py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] bg-gray-50`; type=number, inputMode=numeric.

**−/+ buttons:** `w-14 h-14 rounded-full border-2 border-gray-200 text-2xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 min-w-[56px] min-h-[56px]`.

**Unit label:** `text-sm text-gray-400 font-medium` between buttons.

**Row:** `flex items-center justify-center gap-8`.

---

### Org code input (Employee Onboarding)
SCREEN-SPECIFIC COMPONENT

**Input:** `w-full px-4 py-4 border border-gray-200 rounded-2xl font-mono text-2xl text-center text-gray-900 placeholder-gray-300 tracking-[0.2em] focus:ring-2 focus:ring-blue-500`; maxLength=8.

---

## 5. SELECTS

### Sel (custom-wrapped select)
SHARED COMPONENT

**Wrapper:** `div` with optional label.

**Label:** `block text-sm font-medium text-gray-700 mb-1.5`.

**Select:** `w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-h-[44px]`.

**Note:** No custom dropdown arrow indicator in current implementation.

---

### Inline native selects (toolbar use)
SHARED COMPONENT

**Pattern (compact):** `px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 appearance-none`.

**Used in:** Schedule desktop toolbar (team filter), Tasks desktop toolbar (team filter).

---

## 6. TABS (toggle groups)

### Segmented control (Role toggle, Day/Week, billing period)
SHARED COMPONENT

**Container:** `flex bg-gray-100 rounded-xl p-1`.

**Tab:** `flex-1 py-2 text-sm font-medium rounded-lg transition-all min-h-[36px–40px]`.

**Active:** `bg-white text-gray-900 shadow-sm`.

**Default:** `text-gray-500`.

**Hover (default):** `hover:text-gray-700`.

---

### Status filter tabs (Employees)
SCREEN-SPECIFIC COMPONENT

**Container:** `flex bg-gray-100 rounded-xl p-1 text-sm`.

**Tab:** `px-3 py-1.5 rounded-lg font-medium capitalize transition-all min-h-[36px]`.

**Options:** all / active / pending.

---

### Day tab strip (desktop Tasks Day view)
SCREEN-SPECIFIC COMPONENT

**Container:** `flex bg-gray-100 rounded-xl p-1 text-xs`.

**Tab:** `px-3 py-1.5 rounded-lg font-medium transition-all min-h-[36px]`; day abbreviation label.

---

### Task/Goal type toggle
SCREEN-SPECIFIC COMPONENT

**Container:** `flex bg-gray-100 rounded-xl p-1` OR `flex border border-gray-200 rounded-xl overflow-hidden bg-white text-xs`.

**Tab:** `flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-all` OR `px-3 py-2 font-medium capitalize min-h-[36px]`.

**Active (inline border variant):** `bg-blue-600 text-white`.

---

## 7. CARDS

### StatCard (Dashboard)
SCREEN-SPECIFIC COMPONENT

**Dimensions:** NOT SPECIFIED IN FIGMA — fills grid column.

**Container:** `border border-gray-100 rounded-2xl p-5`.

**Label:** `text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3`.

**Big number:** `text-2xl font-semibold font-mono text-gray-900`.

**Sub-label:** `text-sm text-gray-400`.

**Bar:** `h-1.5 bg-gray-100 rounded-full overflow-hidden`; fill blue-600 (tasks) or emerald-500 (goals).

---

### AlertCard (Dashboard "Needs attention")
SCREEN-SPECIFIC COMPONENT

**Container:** `flex items-center justify-between border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3`.

**Icon:** `Ic.Alert size={15}`.

**Message:** `text-sm text-gray-800`.

**Action:** `text-xs font-semibold text-blue-600 hover:text-blue-800 ml-4 flex-shrink-0 min-h-[44px]`.

---

### ShiftCard (Employee Today)
SCREEN-SPECIFIC COMPONENT

**Working:** `bg-[#090e1a] text-white rounded-2xl p-5 mb-6`.

**Label:** `text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2`.

**Time:** `text-4xl font-bold tracking-tight mb-1`.

**Location:** `text-sm text-gray-400`.

**Day off:** `bg-gray-50 rounded-2xl p-5 mb-6 text-center`.

---

### TaskCard (Employee Today — each task)
SCREEN-SPECIFIC COMPONENT

**Container:** `border rounded-2xl p-4 transition-all`.

**Pending:** `border-gray-100`.

**Completed:** `border-green-100 bg-green-50/30`.

**Task name:** `font-semibold text-gray-900 text-sm`; completed = `line-through text-gray-400`.

**Done icon:** `w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0`; `Ic.Check size={11}`.

**Goal progress row:** `font-mono text-2xl font-bold text-gray-900` + `/ {target} {unit}` `text-sm text-gray-400`.

**Bar:** `h-2 bg-gray-100 rounded-full overflow-hidden`; fill `bg-blue-500`.

**Action button:** `w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold min-h-[52px]`.

---

### OrgCodeCard
SCREEN-SPECIFIC COMPONENT (Manager Onboarding + Settings Org)

**Container:** `bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3` or `p-6`.

**Code:** `font-mono font-bold text-xl tracking-widest text-gray-900`.

**Copy button:** `text-sm font-medium text-blue-600 flex items-center gap-1.5 min-h-[44px]`.

---

### EmployeeMobileCard (Manager Employees list)
SCREEN-SPECIFIC COMPONENT

**Container:** `w-full text-left flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 min-h-[76px]`.

**Avatar:** `md` size (40px).

**Info:** name `font-semibold text-gray-900 text-sm` + StatusBadge + team `text-xs text-gray-400` + shift (mono, optional).

**Chevron:** `Ic.ChevRight size={16}`.

---

### TeamCard (Settings Teams list)
SCREEN-SPECIFIC COMPONENT

**Container:** `flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 min-h-[68px]`.

**Color dot:** `w-3 h-3 rounded-full` in team color.

**Name:** `font-medium text-gray-900`.

**Count:** `text-xs text-gray-400`.

---

### WorkAreaRow (Settings Work Areas list)
SCREEN-SPECIFIC COMPONENT

**Container:** `flex items-center gap-4 px-4 py-3.5 border border-gray-100 rounded-2xl min-h-[64px]`.

**Status dot:** `w-2.5 h-2.5 rounded-full`; active = `bg-green-500`, inactive = `bg-gray-300`.

**Name:** `text-sm font-medium`; inactive = `text-gray-400`.

**Toggle button:** `text-xs font-medium px-3 py-2 rounded-xl border min-h-[40px]`.

---

### ShiftTemplateRow (Settings Shift Templates)
SCREEN-SPECIFIC COMPONENT

**Container:** `flex items-center gap-4 px-4 py-3.5 border border-gray-100 rounded-2xl min-h-[64px]`.

**Status dot, name:** same as WorkAreaRow.

**Time range:** `text-xs font-mono text-gray-400`.

---

### TaskTemplateCard (Settings Task Templates)
SCREEN-SPECIFIC COMPONENT

**Container:** `p-4 border border-gray-100 rounded-2xl hover:border-gray-200`.

**Name:** `font-medium text-gray-900`.

**Count:** `text-xs text-gray-400` — "{N} tasks".

**Items row:** `flex flex-wrap gap-1.5`; pills `inline-flex items-center gap-1 text-xs bg-gray-50 border border-gray-100 rounded-full px-2 py-1`.

**Pill:** type dot + name.

---

### BillingPlanCard (Settings Billing)
SCREEN-SPECIFIC COMPONENT

**Container:** `p-5 rounded-2xl border-2`; current = `border-blue-500 bg-white shadow-sm`; other = `border-gray-100 hover:border-gray-200`.

**Current badge:** `Badge variant="info"` above name.

**Price:** `text-2xl font-bold text-gray-900` + `/mo text-sm font-normal text-gray-400`.

**Capacity:** `text-xs text-gray-500 mb-3`.

---

### HistoryWeekCard (Employee History)
SCREEN-SPECIFIC COMPONENT

**Container:** `border border-gray-100 rounded-2xl overflow-hidden`.

**Header button:** `w-full flex items-center justify-between p-4 min-h-[64px]`.

**Week label:** `font-semibold text-sm text-gray-900`.

**Summary:** `text-xs text-gray-400`.

**Mini bar:** `w-16 h-1.5 bg-gray-100 rounded-full`; green/blue/amber fill.

**Expanded rows:** `border-t border-gray-100 px-4 py-2`.

**Day row:** `flex items-center justify-between py-3 border-b border-gray-50 min-h-[48px]`.

---

## 8. TABLES

### EmployeeTable (Manager Employees, desktop)
SCREEN-SPECIFIC COMPONENT

**Container:** `border border-gray-100 rounded-2xl overflow-x-auto`.

**Header:** `bg-gray-50 border-b border-gray-100`; `text-xs font-semibold text-gray-400 uppercase tracking-wide`; `px-4 py-3`.

**Columns:** checkbox(32px) | Employee(~220px) | Status | Team | Today's shift | Progress | Actions(208px).

**Row:** `hover:bg-gray-50 group`; `divide-y divide-gray-50`.

**Shift cell chip:** `font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-lg`.

---

### ScheduleGrid (Manager Schedule, desktop)
SCREEN-SPECIFIC COMPONENT

**Container:** `min-w-full border-collapse text-sm`.

**Sticky header:** `sticky top-0 z-20 bg-white border-b border-gray-100`.

**Employee col (sticky left):** `sticky left-8 z-30 bg-white w-48 text-left px-4 py-3 border-r border-gray-100`.

**Checkbox col (sticky):** `sticky left-0 z-30 bg-white w-8 px-3 py-3 border-r border-gray-100`.

**Day cols:** `text-center px-1 py-3 min-w-[108px]`; today = `bg-blue-50`.

**Day header content:** day abbreviation `text-xs font-semibold` + date `text-[11px]` + `Ic.Dots` copy button.

**Shift cell button (filled):** `w-full px-1 py-2 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-700 font-medium`.

**Shift cell button (empty):** `border border-dashed border-gray-200 text-gray-300 hover:bg-gray-100 hover:text-gray-500`.

**Row height:** NOT SPECIFIED IN FIGMA — natural from `py-2` cell padding.

---

### TasksTable — Day view (Manager Tasks, desktop)
SCREEN-SPECIFIC COMPONENT

**Columns:** Employee | Task/Goal | Progress | [Edit].

**Employee cell:** Avatar `sm` + name `font-medium` + team `text-xs`.

**Task cell:** type dot + name `font-medium` + type Badge.

**Progress cell:** ProgressBar `max-w-[140px]` or Badge.

**Edit cell:** `opacity-0 group-hover:opacity-100 text-xs font-medium text-blue-600`.

---

### TasksTable — Week view (Manager Tasks, desktop)
SCREEN-SPECIFIC COMPONENT

**Sticky employee col:** `sticky left-0 bg-white w-48 border-r border-gray-100`.

**Day cols:** `min-w-[100px] text-center`; today = `bg-blue-50/30`.

**Cell badge (assignments):** `mx-auto rounded-xl px-2 py-1.5 text-xs`; done = `bg-green-50 border-green-100 text-green-700`; partial = `bg-gray-50 border-gray-100 text-gray-500`.

---

## 9. LISTS

### AssignmentList (Manager Tasks mobile — Day view)
SCREEN-SPECIFIC COMPONENT

**Employee section header:** `flex items-center gap-3 px-4 py-3 bg-gray-50/50`.

**Assignment row:** `w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left min-h-[56px]`.

**Type dot:** `w-2 h-2 rounded-full`; goal = `bg-blue-400`, task = `bg-emerald-400`.

**Task name:** `text-sm text-gray-900`.

---

### WeeklyTaskList (Manager Tasks mobile — Week view)
SCREEN-SPECIFIC COMPONENT

**Day section:** `divide-y divide-gray-100`.

**Day header:** `px-4 py-2.5 sticky top-0 z-10`; today = `bg-blue-50 border-b border-blue-100`; other = `bg-gray-50 border-b border-gray-100`.

**Day header text:** `text-xs font-bold uppercase tracking-widest`; today = `text-blue-700`; other = `text-gray-500`.

**Employee sub-header:** `flex items-center gap-2.5 px-4 pt-3 pb-1`.

**Assignment row:** `w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 min-h-[48px]`.

---

### ScheduleEmployeeList (Manager Schedule, mobile)
SCREEN-SPECIFIC COMPONENT

**Container:** `divide-y divide-gray-50`.

**Row:** `flex items-center px-4 py-3.5 gap-3 min-h-[72px]`; selected = `bg-blue-50/40`.

**Employee info:** Avatar `sm` + name `text-sm font-semibold` + team `text-xs text-gray-400`.

**Shift button (assigned):** `flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium min-h-[44px] min-w-[80px] bg-blue-600 text-white hover:bg-blue-700`.

**Shift button (empty):** `border border-dashed border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500`.

---

### RecentProgressList (Manager Dashboard)
SCREEN-SPECIFIC COMPONENT

**Container:** `border border-gray-100 rounded-2xl divide-y divide-gray-50`.

**Row:** `flex items-center justify-between px-4 py-3.5 min-h-[56px]`.

---

## 10. AVATARS

### Avatar
SHARED COMPONENT

**Sizes:**
- `xs`: `w-7 h-7 text-[10px]` (28px)
- `sm`: `w-9 h-9 text-xs` (36px)
- `md`: `w-10 h-10 text-sm` (40px)
- `lg`: `w-16 h-16 text-xl` (64px)

**Base:** `rounded-full flex items-center justify-center font-semibold flex-shrink-0`.

**Content:** First initial + last initial (e.g. "AK").

**Color palette** (deterministic by name charCode): blue-100/text-blue-700 | violet-100/text-violet-700 | emerald-100/text-emerald-700 | amber-100/text-amber-700 | rose-100/text-rose-700 | cyan-100/text-cyan-700.

**No image support** in current implementation.

---

## 11. BADGES

### Badge
SHARED COMPONENT

**Base:** `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium`.

**Variants:**
- `active`: `bg-green-50 text-green-800 border border-green-200`
- `pending`: `bg-amber-50 text-amber-800 border border-amber-200`
- `inactive`: `bg-gray-100 text-gray-500 border border-gray-200`
- `completed`: `bg-green-50 text-green-800 border border-green-200`
- `neutral`: `bg-gray-100 text-gray-700 border border-gray-200`
- `trial`: `bg-blue-50 text-blue-700 border border-blue-200`
- `danger`: `bg-red-50 text-red-700 border border-red-200`
- `info`: `bg-blue-50 text-blue-700 border border-blue-200`
- `warning`: `bg-amber-50 text-amber-700 border border-amber-200`

---

### StatusBadge
SHARED COMPONENT

**Composes:** `Badge` with a colored dot inside.

**active:** green dot + "Active" text.

**pending:** amber dot + "Pending" text.

**inactive:** gray dot + "Inactive" text.

**Dot:** `w-1.5 h-1.5 rounded-full`.

---

## 12. PROGRESS

### ProgressBar
SHARED COMPONENT

**Wrapper:** `div`.

**Label row:** `flex justify-between items-baseline mb-1.5`; left = `font-mono text-sm font-medium text-gray-900` (current / total); right = `font-mono text-xs text-gray-400` (pct%).

**Bar track:** `h-1.5 bg-gray-100 rounded-full overflow-hidden` (md) or `h-1` (sm); `role="progressbar"`.

**Bar fill:** `h-full bg-blue-600 rounded-full`; width = pct%.

**Sizes:** `sm` = h-1, `md` = h-1.5.

---

### InlineProgressBar (Employee Today task card)
SCREEN-SPECIFIC COMPONENT

**Track:** `h-2 bg-gray-100 rounded-full overflow-hidden`.

**Fill:** `h-full bg-blue-500 rounded-full transition-all`.

---

### MiniBar (History accordion, Schedule employee rows)
SCREEN-SPECIFIC COMPONENT

**Track:** `h-1 bg-gray-100 rounded-full overflow-hidden` (day rows) or `h-1.5` (week accordion).

**Fill colors:** green-500 (complete), blue-500 (partial), amber-500 (low).

---

## 13. DIALOGS (Modal)

### Modal
SHARED COMPONENT

**Overlay:** `fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4`.

**Backdrop:** `absolute inset-0 bg-black/20 backdrop-blur-sm`.

**Card:** `relative bg-white rounded-2xl shadow-2xl w-full {width} max-h-[90vh] overflow-y-auto`.

**Default width:** `max-w-md`.

**Header:** `flex items-center justify-between p-5 border-b border-gray-100`.

**Title:** `text-base font-semibold text-gray-900`.

**Close:** `Ic.X` button, `min-w-[44px] min-h-[44px]`.

**Body:** `p-5`.

**Behavior:** Escape → close; backdrop click → close.

**On mobile:** snaps to bottom (`items-end`) vs center on desktop (`sm:items-center`).

---

### ConfirmDialog
SHARED COMPONENT

**Overlay:** `fixed inset-0 z-50 flex items-center justify-center p-4`.

**Card:** `relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6`.

**Title:** `text-base font-semibold text-gray-900 mb-2`.

**Description:** `text-sm text-gray-500 mb-6 leading-relaxed`.

**Buttons:** `flex gap-3 justify-end`; Cancel (outline) + Confirm (primary or danger).

---

## 14. DRAWERS

### MobileNavDrawer
— See NAVIGATION section above —

---

## 15. BOTTOM SHEETS

### Sheet
SHARED COMPONENT

**Overlay:** `fixed inset-0 z-50 flex flex-col justify-end`.

**Backdrop:** `absolute inset-0 bg-black/20 backdrop-blur-sm`.

**Panel:** `relative bg-white rounded-t-3xl shadow-2xl w-full max-h-[85dvh] flex flex-col`.

**Header:** `flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0`.

**Title:** `text-base font-semibold text-gray-900`.

**Close:** `Ic.X size={18}`, `min-w-[44px] min-h-[44px]`.

**Body:** `overflow-y-auto flex-1 p-5 safe-area-bottom`.

**Behavior:** Body scroll locked; Escape → close; backdrop click → close.

---

## 16. ACTION SHEETS

### ActionSheet
SHARED COMPONENT (iOS-style option list)

**Overlay:** `fixed inset-0 z-[60] flex flex-col justify-end p-4`.

**Backdrop:** `absolute inset-0 bg-black/20 backdrop-blur-sm`.

**Options card:** `bg-white rounded-2xl overflow-hidden shadow-xl`.

**Title (optional):** `text-xs font-semibold text-gray-400 text-center pt-4 px-5 pb-2`.

**Option:** `w-full text-sm font-medium py-4 px-5 border-t border-gray-100 first:border-0 hover:bg-gray-50 text-left min-h-[52px]`.

**Destructive option:** `text-red-600`.

**Cancel button:** `w-full bg-white rounded-2xl text-sm font-semibold text-gray-700 py-4 hover:bg-gray-50 min-h-[52px] shadow-xl`.

---

## 17. TOASTS

### Toast
SHARED COMPONENT

**Position:** `fixed top-20 left-1/2 -translate-x-1/2 z-[100]`.

**Container:** `flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-xl`.

**Animation:** `animate-in fade-in slide-in-from-top-2 duration-200`.

**Icon:** `Ic.Check size={14}`.

**Auto-dismiss:** 2200ms.

---

## 18. CALENDAR / SCHEDULE

→ See SCHEDULE IMPLEMENTATION SPECIFICATION (doc 5).

---

## 19. TASKS

### TaskAssignmentRow (Manager Tasks desktop, Day view)
SCREEN-SPECIFIC — see Tables section.

### TaskCard (Employee Today)
SCREEN-SPECIFIC — see Cards section.

### TaskTemplateItemForm (within Sheet)
SCREEN-SPECIFIC COMPONENT

**Item container:** `p-3 bg-gray-50 rounded-2xl space-y-2`.

**Name input:** `flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white min-h-[44px]`.

**Type toggle:** segmented border variant (see Tabs section).

**Goal fields:** Target `w-20` + Unit `w-20` (or flex-1) inline; `text-xs`.

---

## 20. GOALS

### GoalProgressDisplay (Employee Today task card)
SCREEN-SPECIFIC COMPONENT

**Count:** `font-mono text-2xl font-bold text-gray-900`.

**Fraction:** `text-sm text-gray-400` "/ {target} {unit}".

**Bar:** `h-2 bg-gray-100 rounded-full`; fill `bg-blue-500`.

---

### GoalProgressEditor (Employee progress editor — full screen)
SCREEN-SPECIFIC COMPONENT
— See Inputs section (Numeric input) —

---

## 21. EMPLOYEES

### EmployeeRow (desktop table)
SCREEN-SPECIFIC — see Tables section.

### EmployeeCard (mobile list)
SCREEN-SPECIFIC — see Cards section.

### EmployeeDetail (Sheet on mobile)
SCREEN-SPECIFIC COMPONENT

**Within Sheet:** Avatar `lg` + StatusBadge + email; info rows (Team, Today's shift, Today's progress); action buttons.

**Info row:** `flex justify-between py-3 border-b border-gray-100`; label `text-sm text-gray-500`, value `text-sm font-medium text-gray-900`.

---

## 22. TEMPLATES

### ShiftTemplateCard
SCREEN-SPECIFIC — see WorkAreaRow (same pattern).

### TaskTemplateCard
SCREEN-SPECIFIC — see Cards section.

### ShiftTemplateSelector (within shift editor)
SCREEN-SPECIFIC COMPONENT

**Container:** `grid grid-cols-2 gap-2`.

**Button:** `px-3 py-2.5 border border-gray-200 rounded-xl text-xs text-left hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[44px]`.

**Name:** `font-medium text-gray-800`.

**Time:** `text-gray-400 font-mono`.

**Active (matching times):** `border-blue-500 bg-blue-50` (in Add Shift form only).

---

## LOGO

### Logo
SHARED COMPONENT

**Size prop → px:** `size * 4`; default size=7 → 28px.

**Container:** `w-{size} h-{size} bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0`.

**Icon:** White lines SVG (list/lines motif), ~55% of container size.

**Used sizes:** 6 (24px, mobile topbar), 7 (28px, most uses), 8 (32px, auth left panel).
