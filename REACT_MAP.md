# FIGMA → REACT IMPLEMENTATION MAP
# Workday — Component Classification

Source: `src/App.tsx`. All components are in a single file.
Classification: REUSE | ADAPT | REBUILD REQUIRED

---

## SCREEN → REACT MAPPING

### Manager / Shell
```
Figma: Manager / Shell
React: ManagerApp (container)

Components:
  MobileTopBar          → REUSE
  MobileNavDrawer       → REUSE
  ManagerSidebar        → REUSE
  NavItems              → REUSE
  ManagerQuickActionBar → REUSE
```

**Props:** navigate, tab, setTab, drawerOpen, hamburgerRef, quickActionCallbacks
**State:** tab (ManagerTab), drawerOpen (bool), hamburgerRef (useRef)
**Responsive:** lg: breakpoint toggles sidebar ↔ drawer+topbar

---

### Manager / Dashboard
```
Figma: Manager / Dashboard
React: ManagerDashboard

Components:
  StatCard (inline)     → ADAPT (extract to named component)
  AlertRow (inline)     → ADAPT
  RecentRow (inline)    → ADAPT
  Avatar                → REUSE
  Badge                 → REUSE
  ProgressBar           → REUSE
```

**Props:** setTab, localAssignments, scheduleData, empStatuses, quickActions
**State:** none (derives from props)
**Tailwind:** `max-w-2xl`, `grid-cols-1 sm:grid-cols-2`, `pb-[88px] lg:pb-8`

---

### Manager / Employees
```
Figma: Manager / Employees
React: ManagerEmployees

Components:
  EmployeeCard (mobile list item, inline)   → ADAPT (extract)
  EmployeeRow (desktop table row, inline)   → ADAPT (extract)
  EmployeeDetail (Sheet content, inline)    → ADAPT (extract)
  BulkActionBar (inline)                   → ADAPT (extract)
  Modal (Invite + Edit)                    → REUSE
  Sheet (Detail)                           → REUSE
  ConfirmDialog                            → REUSE
  Avatar                                   → REUSE
  StatusBadge                              → REUSE
  Btn                                      → REUSE
  Field                                    → REUSE
  Sel                                      → REUSE
```

**Props:** teamsList, empStatuses, setEmpStatuses, scheduleData, localAssignments
**State:** search, filter, teamFilter, selected[], confirm, showInvite, showEdit, showDetail, empOverrides
**Responsive:** `hidden lg:block` table / `lg:hidden` card list

---

### Manager / Schedule
```
Figma: Manager / Schedule
React: ManagerSchedule

Components:
  DesktopSchedule (inline sub-component)       → ADAPT (extract)
  MobileSchedule (inline sub-component)        → ADAPT (extract)
  ShiftEditorFields (inline sub-component)     → ADAPT (extract)
  WeekNav                                      → REUSE
  DayPills                                     → REUSE
  Sheet (multiple)                             → REUSE
  Modal (shift editor desktop)                 → REUSE
  ConfirmDialog (copy overwrite)               → REUSE
  ActionSheet                                  → NOT USED HERE
  Avatar                                       → REUSE
  Btn                                          → REUSE
  Sel                                          → REUSE
  Field                                        → REUSE
```

**Props:** shiftTemplatesList, workAreasList, teamsList, scheduleData, setScheduleData, quickActions
**State:** weekOffset, dayIndex, search, teamFilter, selectedEmps[], editCell, editShift, showBulkSheet, bulkTemplate, bulkArea, showCopyWeekConfirm, showCopyDay, copyDayFrom, copyDayTo, showDayMenu, showMobileFilters, pendingTeamFilter, selectionMode, showAddShiftForm, addShift*, confirmOverwrite
**Responsive:** `lg:hidden` for MobileSchedule / `hidden lg:flex` for DesktopSchedule

---

### Manager / Tasks & Goals
```
Figma: Manager / Tasks & Goals
React: ManagerTasks

Components:
  MobileTasks (inline sub-component)            → ADAPT (extract)
  DesktopTasks (inline sub-component)           → ADAPT (extract)
  WeekNav                                       → REUSE
  DayPills                                      → REUSE
  Sheet (Create, BulkAssign, ApplyTemplate, Review, EditProgress) → REUSE
  Avatar                                        → REUSE
  Badge                                         → REUSE
  ProgressBar                                   → REUSE
  Btn                                           → REUSE
  Sel                                           → REUSE
  Field                                         → REUSE
```

**Props:** taskTemplatesList, shiftTemplatesList, teamsList, localAssignments, setLocalAssignments, quickActions
**State:** weekOffset, dayIndex, viewMode, teamFilter, showCreate, showBulkAssign, showApplyTemplate, showApplyTemplateReview, showEditProgress, newTask*, bulkTeam, bulkTaskId, editValue, applyTemplateId, applyTeam
**Responsive:** `lg:hidden` for MobileTasks / `hidden lg:flex` for DesktopTasks

---

### Manager / Settings
```
Figma: Manager / Settings
React: ManagerSettings

Sub-components (all REUSE as-is):
  SettingsOrganization
  SettingsTeams
  SettingsWorkAreas
  SettingsShiftTemplates
  SettingsTaskTemplates
  SettingsProfile
  SettingsBilling

Within each:
  Sheet                 → REUSE
  ConfirmDialog         → REUSE
  Field                 → REUSE
  Sel                   → REUSE
  Btn                   → REUSE
  Badge                 → REUSE
  Avatar                → REUSE
```

**State (ManagerSettings):** section, mobileShowSection
**Responsive:** `hidden lg:flex` two-column / `lg:hidden` stacked with back navigation

---

### Employee / Today
```
Figma: Employee / Today
React: EmployeeToday

Components:
  ShiftCard (dark, inline)               → ADAPT (extract)
  TaskCard (inline)                      → ADAPT (extract)
  ProgressEditor (full-screen, inline)   → ADAPT (extract to ProgressEditor component)
  Toast                                  → REUSE
  Avatar                                 → REUSE
  Badge                                  → REUSE
  Ic.Check, Ic.ArrowLeft               → REUSE
```

**Props:** me, mySchedule, myAssignments
**State:** localAssignments, progressEditor, editorValue, toast
**Responsive:** same layout mobile/desktop (single column, max-w-2xl centered)

---

### Employee / Schedule
```
Figma: Employee / Schedule
React: EmployeeSchedule

Components:
  WeekNav               → REUSE
  DayPills              → REUSE
```

**Props:** me, mySchedule
**State:** weekOffset, selectedDay
**Responsive:** same layout

---

### Employee / History
```
Figma: Employee / History
React: EmployeeHistory

Components:
  Accordion (inline)    → ADAPT (extract HistoryWeek component)
  Ic.ChevRight         → REUSE
```

**Props:** me
**State:** expanded (number | null)

---

### Employee / Profile
```
Figma: Employee / Profile
React: EmployeeProfile

Components:
  Avatar                → REUSE
  Field                 → REUSE
  Sel                   → REUSE
  Btn                   → REUSE
  Badge (org badge)     → neutral variant
```

**Props:** me, navigate
**State:** firstName, lastName, email, lang, saved, showDelete

---

## COMPONENT CLASSIFICATION

### REUSE AS-IS

These components match the design system and need no changes:

| Component | Notes |
|---|---|
| `Btn` | All 5 variants, 3 sizes |
| `Badge` | All 9 variants |
| `StatusBadge` | Composes Badge |
| `Avatar` | 4 sizes, 6 color palette |
| `Field` | Label + input + helper |
| `Sel` | Label + select |
| `ProgressBar` | sm + md sizes |
| `Toast` | Fixed position, auto-dismiss |
| `Modal` | Center/bottom overlay |
| `Sheet` | Bottom sheet, 85dvh |
| `ActionSheet` | iOS-style option list |
| `ConfirmDialog` | Destructive confirm |
| `WeekNav` | Prev/Next/Today |
| `DayPills` | 7 pills, active/today states |
| `Logo` | Blue rounded square + lines icon |
| `NavItems` | Sidebar nav groups |
| `ManagerSidebar` | Desktop sidebar |
| `MobileTopBar` | Mobile sticky header |
| `MobileNavDrawer` | Slide-in drawer |
| `ManagerQuickActionBar` | Contextual action bar |

---

### ADAPT (extract from inline or minor rework)

| Component | Current State | Required Change |
|---|---|---|
| `StatCard` | Inline in ManagerDashboard | Extract to named component |
| `AlertRow` | Inline in ManagerDashboard | Extract |
| `RecentRow` | Inline in ManagerDashboard | Extract |
| `EmployeeCard` (mobile) | Inline in ManagerEmployees | Extract |
| `EmployeeRow` (desktop) | Inline in ManagerEmployees | Extract |
| `EmployeeDetail` | Inline Sheet content | Extract |
| `BulkActionBar` | Inline fixed div | Extract |
| `MobileSchedule` | Inline sub-component | Extract |
| `DesktopSchedule` | Inline sub-component | Extract |
| `ShiftEditorFields` | Inline | Extract |
| `MobileTasks` | Inline sub-component | Extract |
| `DesktopTasks` | Inline sub-component | Extract |
| `TaskCard` (employee) | Inline in EmployeeToday | Extract |
| `ShiftCard` (employee) | Inline in EmployeeToday | Extract |
| `ProgressEditor` | Full-screen overlay inline | Extract to standalone component |
| `HistoryWeek` | Inline accordion | Extract |

---

### REBUILD REQUIRED

These components differ materially from optimal implementation or have known issues:

| Component | Issue | Rebuild Target |
|---|---|---|
| `DesktopSchedule` (grid) | Single-file inline; scroll behavior with sticky columns needs careful z-index | Extracted component with `overflow-auto` container; `position: sticky` on checkbox and employee cols at separate z-index layers |
| `DesktopTasks` (week table) | Same sticky column scroll issue | Same as above |
| `ManagerEmployees` (desktop table) | Selections + hover actions on same row; visible column widths not explicitly set | Extract with explicit `w-{x}` column widths |
| `SettingsBilling` (plan cards) | Grid goes to `sm:grid-cols-3` at 640px rather than adapting to manager shell width | Should use container-based grid, not viewport grid |

---

## PROPS REFERENCE

### Shared component props

```typescript
Btn: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  onClick?: () => void
  className?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
}

Badge: {
  children: React.ReactNode
  variant?: 'active' | 'pending' | 'inactive' | 'completed' | 'neutral' | 'trial' | 'danger' | 'info' | 'warning'
  className?: string
}

Avatar: {
  firstName: string
  lastName: string
  size?: 'xs' | 'sm' | 'md' | 'lg'  // 28 | 36 | 40 | 64px
}

Field: {
  label?: string
  type?: string
  placeholder?: string
  value: string
  onChange?: (v: string) => void
  required?: boolean
  helper?: string
  disabled?: boolean
  className?: string
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode']
}

Sel: {
  label?: string
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
  required?: boolean
  className?: string
}

ProgressBar: {
  current: number
  total: number
  size?: 'sm' | 'md'  // h-1 | h-1.5
}

Modal: {
  title: string
  children: React.ReactNode
  onClose: () => void
  width?: string  // default 'max-w-md'
}

Sheet: {
  title: string
  children: React.ReactNode
  onClose: () => void
}

ActionSheet: {
  title?: string
  options: { label: string; onClick: () => void; destructive?: boolean }[]
  onClose: () => void
}

ConfirmDialog: {
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

WeekNav: {
  offset: number
  setOffset: (n: number) => void
  label: string
}

DayPills: {
  days: Day[]
  selectedIndex: number
  onSelect: (i: number) => void
}

Toast: {
  message: string
  onDone: () => void
}

Logo: {
  size?: number  // default 7, multiplied by 4 for px
}
```

---

## DATA TYPES

```typescript
type Screen = 'auth' | 'manager-onboard' | 'manager-setup' | 'employee-onboard' | 'manager' | 'employee'
type ManagerTab = 'dashboard' | 'employees' | 'schedule' | 'tasks' | 'settings'
type EmployeeTab = 'today' | 'schedule' | 'history' | 'profile'
type SettingsSection = 'organization' | 'teams' | 'work-areas' | 'shift-templates' | 'task-templates' | 'profile' | 'billing'
type TaskType = 'task' | 'goal'

Employee: {
  id: string
  firstName: string
  lastName: string
  email: string
  status: 'active' | 'pending' | 'inactive'
  teamId: string
}

Shift: {
  start: string   // "06:00"
  end: string     // "14:00"
  location: string
  note?: string
}

TaskAssignment: {
  taskId: string
  employeeId: string
  status: 'pending' | 'completed'
  date: string    // "2026-08-18"
  current?: number  // for goals
}

Task: {
  id: string
  name: string
  type: TaskType
  target?: number
  unit?: string
}

Team: {
  id: string
  name: string
  color: string  // 'blue' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan'
}

WorkArea: {
  id: string
  name: string
  active: boolean
}

ShiftTemplate: {
  id: string
  name: string
  start: string
  end: string
  active: boolean
}

TaskTemplate: {
  id: string
  name: string
  items: TaskTemplateItem[]
}

TaskTemplateItem: {
  id: string
  name: string
  type: TaskType
  target?: number
  unit?: string
}

QuickActionCallbacks: {
  onAddTask?: () => void
  onAddShift?: () => void
  onTemplate?: () => void
}
```

---

## TAILWIND IMPLEMENTATION GUIDANCE

### Color tokens (no CSS variables — raw Tailwind)
- Primary: `blue-600` (#2563EB)
- Primary hover: `blue-700`
- Success: `green-500`, `emerald-500`
- Warning: `amber-500`, amber-50/100/200/700/800
- Danger: `red-600`, red-50/500
- Gray scale: gray-50, gray-100, gray-200, gray-300, gray-400, gray-500, gray-700, gray-800, gray-900
- Dark surface (shift card, auth sidebar): `#090e1a`
- Border default: `border-gray-100`
- Border focus: `border-transparent` with `ring-2 ring-blue-500`

### Typography scale (DM Sans)
- `text-[10px]` — tiny labels, nav group headers
- `text-xs` = 12px — secondary info, badges, helper text
- `text-[11px]` — bottom nav labels, sidebar user info
- `text-sm` = 14px — body text, buttons, most labels
- `text-base` = 16px — dialog titles
- `text-lg` = 18px — day numbers in pills
- `text-xl` = 20px — section headings
- `text-2xl` = 24px — page headings
- `text-3xl` = 30px — auth tagline
- `text-4xl` = 36px — shift times, progress editor input

### Mono typography (JetBrains Mono)
- `font-mono` applied to: shift times, org codes, progress counts, tracking widths
- Used at: `text-xs`, `text-sm`, `text-xl`, `text-2xl`, `text-4xl`

### Border radius scale
- `rounded-lg` = 8px — small chips, tiny buttons
- `rounded-xl` = 12px — inputs, nav items, most buttons
- `rounded-2xl` = 16px — cards, modals, dialogs
- `rounded-3xl` = 24px — sheet top corners (`rounded-t-3xl`)
- `rounded-full` = pill — badges, avatar, color dots, −/+ buttons

### Shadow scale
- `shadow-sm` — active plan card, active segmented tab
- `shadow-xl` — action sheet options card, cancel button
- `shadow-2xl` — modals, sheets, floating drawers, bulk action bar
