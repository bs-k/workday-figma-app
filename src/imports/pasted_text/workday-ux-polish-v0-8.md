Jasne. Poniżej **jeden skonsolidowany prompt v0.8** — nie dodaje nowych funkcji, tylko wdraża cały ostatni audyt ekran po ekranie i domyka UX.

```text
# Workday — Final UX Polish v0.8
## Screen-by-Screen UX Refinement

Refine the EXISTING Workday prototype.

DO NOT rebuild the application from scratch.

DO NOT add new product features.

DO NOT introduce:
- time tracking,
- payroll,
- HR,
- leave management,
- chat,
- notifications,
- AI,
- gamification,
- departments,
- additional roles.

This iteration is about:

- reducing friction,
- improving hierarchy,
- fixing mobile UX,
- simplifying interactions,
- making primary actions obvious,
- ensuring consistency between screens,
- improving accessibility.

The product should feel calm, premium, extremely clear and operational.

The design principle is:

DESKTOP
→ information density
→ bulk operations
→ tables and grids

MOBILE
→ progressive disclosure
→ one task at a time
→ large touch targets
→ contextual actions

Do not simply scale desktop layouts down to mobile.

---

# 1. GLOBAL MOBILE SHELL

Create one consistent mobile layout system.

For Manager:

```text
┌──────────────────────────────┐
│ ☰   Workday           Avatar │
├──────────────────────────────┤
│                              │
│ 20–24px top spacing          │
│                              │
│ CONTENT                      │
│                              │
│                              │
├──────────────────────────────┤
│ Contextual Quick Actions     │
└──────────────────────────────┘
```

For Employee:

```text
┌──────────────────────────────┐
│                              │
│ CONTENT                      │
│                              │
│                              │
├──────────────────────────────┤
│ Today Schedule History Me    │
└──────────────────────────────┘
```

Use:

- 16px horizontal content padding,
- 20–24px top content spacing,
- safe-area support,
- 100dvh for fullscreen mobile surfaces,
- adequate bottom padding for fixed navigation/action bars.

Do not use 100vh for critical fullscreen mobile components.

---

# 2. MANAGER MOBILE TOP BAR

Keep:

☰ Workday Avatar

Requirements:

- approximately 56px base height,
- safe-area aware,
- sticky/fixed,
- minimum 44×44px touch targets,
- no page-specific actions inside the top bar.

Hamburger opens the Manager navigation drawer.

Avatar opens Manager Profile.

---

# 3. MANAGER MOBILE NAVIGATION DRAWER

Keep the current drawer concept.

Structure:

WORK

Dashboard
Employees
Schedule
Tasks & Goals

MANAGE

Settings

────────────

Alex Manager
ABC Logistics

Sign out

Requirements:

- full height,
- 100dvh,
- safe-area aware,
- backdrop,
- Escape closes,
- clicking backdrop closes,
- focus moves into drawer,
- focus returns to trigger,
- background becomes inert,
- body scroll is locked,
- screen-reader accessible.

Do not create Manager bottom navigation.

---

# 4. MANAGER MOBILE QUICK ACTION BAR

Create a fixed contextual bottom action bar.

This is NOT navigation.

It contains the most relevant actions for the current screen.

## Dashboard

```text
+ Add task       + Template
```

## Tasks & Goals

```text
+ Add task       + Template
```

## Schedule

```text
+ Add shift      + Template
```

Template opens:

```text
New template

Task template
Shift template

Cancel
```

## Employees

No Quick Action Bar.

Use Invite as the primary page action.

## Settings

No Quick Action Bar.

The bar must:

- be fixed,
- respect safe-area bottom,
- have at least 64px visual height,
- use large touch targets,
- have a subtle top border,
- have enough content bottom padding,
- never cover the last content item.

---

# 5. AUTH / LOGIN

Keep authentication simple.

Mobile:

- single column,
- no marketing panel,
- comfortable horizontal padding,
- large primary CTA,
- no unnecessary decorative elements.

Registration:

First name
Last name
Email
Password
Confirm password
Terms
Privacy

Below 640px:

First name and Last name must be stacked vertically.

Do not add social login.

---

# 6. MANAGER — CREATE ORGANIZATION

Keep the flow extremely simple:

Organization name
Country
Default language

After creation:

show organization code prominently.

Example:

```text
Your organization code

WD-7K4P2

[ Copy code ]
```

The code must be easy to read and copy.

Do not force the manager through unnecessary configuration before reaching the product.

---

# 7. MANAGER — ONBOARDING

Use a lightweight setup checklist:

```text
Set up your workspace

1. Add employees
2. Create teams
3. Add work areas
4. Build your first schedule
5. Assign your first work
```

Teams and Work Areas are optional.

Every optional step has:

[ Skip for now ]

Do not block product usage.

---

# 8. MANAGER — DASHBOARD

The Dashboard should feel operational, not like a generic SaaS analytics dashboard.

Priority:

1. People working today
2. Today's task progress
3. Goal progress
4. Needs attention

Desktop can use a denser layout.

Mobile must be single-column.

Example:

```text
Tuesday, August 18

Good morning, Alex

36
people working today
4 off

TASKS TODAY

184 / 240 done

GOAL PROGRESS

76%

NEEDS ATTENTION

3 employees have incomplete tasks
View →

2 employees need approval
View →
```

Avoid excessive cards.

Recent Progress should be secondary.

Quick Actions:

+ Add task
+ Template

---

# 9. MANAGER — EMPLOYEES

## Desktop

Keep a dense table.

## Mobile

Use a list.

Example:

```text
Employees

36 active · 2 pending

[ Search ]

[ All teams ▼ ]

Anna Kowalska
Logistics Team
Active
06:00–14:00

John Smith
Warehouse Team A
Active
14:00–22:00
```

Do not place multiple filter controls into several horizontal rows.

Use:

Search

+

Filters

as a compact interaction.

Invite is the primary action.

Bulk actions appear only after selection.

---

# 10. MANAGER — EMPLOYEE DETAIL

The screen should answer:

WHO?
TEAM?
TODAY'S SHIFT?
TODAY'S WORK?

Example:

```text
← Employees

Anna Kowalska

Active

Email
anna@example.com

Team
Logistics Team

Today's shift
06:00–14:00
Warehouse 1

Today's progress
3 / 4 tasks

[ Edit employee ]

[ Deactivate ]
```

Destructive actions belong at the bottom.

Do not turn this into another dashboard.

---

# 11. MANAGER — SCHEDULE

## Desktop

Keep the existing operational grid.

It should support:

- 40 employees,
- 7 days,
- sticky employee column,
- search,
- team filtering,
- bulk selection,
- shift templates,
- Copy previous week,
- Copy day.

## Mobile

DO NOT use the desktop employee × 7-day grid.

Use:

```text
Schedule

August 24–30

‹      week picker      ›

MON 24
TUE 25
WED 26
THU 27
FRI 28
SAT 29
SUN 30

Monday · August 24

[ All teams ▼ ]

Anna Kowalska
06:00–14:00
Warehouse 1

John Smith
14:00–22:00
Warehouse 1

Maria Nowak
OFF
```

Mobile is:

WEEK → DAY → EMPLOYEE → SHIFT

Do not attempt to show the entire month simultaneously.

---

# 12. MOBILE SCHEDULE — ADD SHIFT

Primary CTA:

+ Add shift

Open full-screen mobile form:

```text
Add shift

Employee
[ Anna Kowalska ▼ ]

Date
Monday, August 24

Shift template
[ Morning Shift ▼ ]

Work area
[ Warehouse 1 ▼ ]

Start
06:00

End
14:00

[ Add shift ]
```

Use large controls.

---

# 13. MOBILE SCHEDULE — EDIT SHIFT

Tap shift:

```text
Edit shift

Anna Kowalska

Monday, August 24

Start
06:00

End
14:00

Shift template
Morning Shift

Work area
Warehouse 1

Note
Optional

[ Save changes ]

Remove shift
```

Complex form = full-screen mobile surface.

Do not use desktop-sized centered modals.

---

# 14. MOBILE SCHEDULE — BULK ACTIONS

Do not reproduce desktop checkbox selection across a grid.

Use the current day's employee list.

Example:

```text
☑ Anna
☑ John
☑ Maria

3 selected

[ Apply shift ]
[ Clear shift ]
```

Team filter can be used before selection.

Provide:

Select all visible employees.

---

# 15. COPY OPERATIONS

Schedule overflow menu:

```text
•••

Copy previous week
Copy day
Clear day
```

Copy previous week:

source week → destination week → confirmation if destination is not empty.

Copy day:

source day → destination day → confirmation if destination is not empty.

Never silently overwrite existing schedule data.

---

# 16. MANAGER — TASKS & GOALS

The screen should be calmer.

Do not place too many controls in the header.

Use:

```text
Tasks & Goals

August 24–30

[ Week ] [ Day ]

MON 24
TUE 25
WED 26
THU 27
FRI 28

All teams ▼

Monday · August 24

Anna Kowalska
Pack orders
83 / 120

John Smith
Clean Zone A
Done
```

Mobile:

WEEK → DAY → TEAM → ASSIGNMENT

Do not use the desktop multi-column table on mobile.

Quick Actions:

+ Add task
+ Template

---

# 17. TASK CREATION

Task flow:

```text
Create task

Task name
[ Clean Zone A ]

Type
[ Task ]

Date
August 24

Employees
[ Select ]

Team
[ Optional ]

Work area
[ Optional ]

[ Create task ]
```

Goal:

```text
Create goal

Name
Pack orders

Target
120

Unit
orders

Date
August 24

Employees / Team

Work area

[ Create goal ]
```

Goal should clearly communicate the quantitative nature.

---

# 18. TASK TEMPLATE APPLICATION

Core flow:

TEMPLATE
→ DATE
→ EMPLOYEES / TEAM
→ WORK AREA
→ REVIEW
→ CONFIRM

Example:

```text
Apply template

Morning warehouse setup

Date
August 24

Team
Warehouse Team A

Work area
Warehouse 1

18 employees

[ Review assignments ]
```

Review screen:

```text
18 employees
3 tasks each
54 assignments

August 24
Warehouse 1

[ Confirm ]
```

Do not create many assignments immediately without confirmation.

---

# 19. TASK TEMPLATE MANAGEMENT

Task Templates are a core MVP feature.

List:

```text
Task templates

Morning warehouse setup
3 tasks

Daily closing
4 tasks

Inventory check
2 tasks

[ + New template ]
```

Template detail:

```text
Morning warehouse setup

1. Check equipment
2. Prepare packing stations
3. Check loading area

[ + Add task ]

[ Edit ]
```

Manager can:

- rename,
- add task,
- edit task,
- remove task,
- change Task/Goal type,
- edit default target,
- edit unit.

Do not add Work Area to the template itself.

---

# 20. TEAMS

Teams answer:

> Who works together?

List:

Team name
Employee count

Team detail:

- employees,
- add employees,
- rename,
- delete.

Deleting a Team does not delete employees.

Employees become:

No team assigned.

---

# 21. WORK AREAS

Work Areas answer:

> Where does the work happen?

Keep them simple:

Warehouse 1
Active

Warehouse 2
Active

Loading Dock
Inactive

Manager can:

- create,
- rename,
- deactivate,
- reactivate.

Historical shifts remain associated with deactivated areas.

Do not permanently assign an Area to an employee.

---

# 22. SHIFT TEMPLATES

Shift Template = TIME ONLY.

Example:

Morning Shift
06:00–14:00

Afternoon Shift
14:00–22:00

Night Shift
22:00–06:00

Manager can:

- create,
- edit,
- deactivate,
- reactivate.

Do NOT attach Work Area to a Shift Template.

Work Area is selected when the shift is assigned.

---

# 23. SETTINGS

Desktop:

Settings sidebar + content.

Mobile:

Settings index → section detail.

Structure:

Organization
- Organization
- Teams
- Work areas

Templates
- Shift templates
- Task templates

Account
- Profile

Billing
- Subscription

No permanent Settings sidebar on mobile.

---

# 24. PROFILE

Single-column below 640px.

Fields:

First name
Last name
Email
Language

Actions:

Save changes
Change password
Sign out

Delete account at bottom.

Destructive actions visually separated.

---

# 25. BILLING

Desktop can use current layout.

Mobile:

stack plans vertically.

Use:

```text
Subscription

Current plan
Workday 40

36 / 40 employees

[ Monthly ] [ Yearly ]

Workday 10
$10 / month

Workday 20
$20 / month

Workday 40
$30 / month

[ Manage subscription ]
```

Annual:

$100 / $200 / $300.

Manager is NOT counted.

Maximum users:

11 / 21 / 41.

Trial:

14 days.

Do NOT show:

"No credit card required".

---

# 26. EMPLOYEE — TODAY

This is the most important employee screen.

It should answer:

> What do I need to do today?

Structure:

```text
Today

Tuesday, August 18

YOUR SHIFT

06:00–14:00
Warehouse 1

YOUR WORK

Pack orders

83 / 120 orders

progress bar

[ Update progress ]

Clean Zone A

Not completed

[ Mark as done ]

Prepare workstation

✓ Completed
```

Do not expose technical concepts like:

Task vs Goal

as prominent labels.

The employee cares about:

WHAT
HOW MUCH
WHERE
STATUS.

---

# 27. EMPLOYEE — QUANTITATIVE PROGRESS EDITOR

This is CRITICAL.

The current progress editor must be redesigned as a mobile-first full-screen interaction.

Do NOT use a bottom sheet that can be pushed outside the viewport by the keyboard.

Use:

100dvh

Layout:

```text
┌────────────────────────────┐
│ ← Update progress          │
│                            │
│ Pack orders                │
│ Target: 120 orders         │
│                            │
│ Current progress           │
│                            │
│          83                │
│         orders             │
│                            │
│ [ − ]                [ + ] │
│                            │
│ 83 / 120                   │
│ ███████████░░░░            │
│                            │
│                            │
│ [ Save progress ]          │
└────────────────────────────┘
```

Use flex column:

Header
→ scrollable content
→ sticky footer.

The Save button must remain reachable when the keyboard is open.

Use:

input type="number"
inputmode="numeric"
min=0
max=target
step=1

The user should be able to directly type the current value.

+/- are secondary controls.

---

# 28. PROGRESS LOGIC

If:

current < target

→ Pending.

If:

current = target

→ Completed.

Never allow:

current < 0

or:

current > target.

After saving:

- close editor,
- immediately update the Today screen,
- update progress bar,
- show:

✓ Progress updated

Do not reload the entire page.

---

# 29. EMPLOYEE — SCHEDULE

Mobile:

week selector
→ day selector
→ shift.

Example:

```text
‹ August 24–30 ›

MON
TUE
WED
THU
FRI

Monday · August 24

06:00–14:00

Warehouse 1
```

No dense grid.

Employee cannot edit schedule.

---

# 30. EMPLOYEE — HISTORY

Keep it simple.

Weekly expandable sections.

Example:

```text
Aug 17–23

Mon    7 / 8
Tue    8 / 8
Wed    6 / 7
Thu    8 / 8
Fri    7 / 7
```

Avoid turning History into an analytics dashboard.

---

# 31. EMPLOYEE — PROFILE

Single-column mobile layout.

First name
Last name
Email
Language

Save changes

Change password

Sign out

Delete account

Use safe bottom padding so content is never hidden behind bottom navigation.

---

# 32. EMPLOYEE DESKTOP

Do NOT constrain the entire Employee application to approximately 384px on desktop.

Mobile shell should only apply below the mobile breakpoint.

Desktop Employee should use a centered content area around 900–1100px.

Keep Employee UI simple.

Possible desktop navigation:

Today
Schedule
History
Profile

Do NOT turn Employee into Manager UI.

---

# 33. EMPLOYEE MOBILE NAVIGATION

Keep:

Today
Schedule
History
Profile

Use fixed bottom navigation.

Requirements:

- safe-area bottom,
- minimum 44px touch targets,
- sufficient main content bottom padding,
- no overlap.

---

# 34. MOBILE FORMS

Below 640px:

- single column,
- 16px horizontal padding,
- full-width inputs,
- 44px+ controls.

Use:

Centered dialog
→ simple confirmation.

Bottom sheet
→ short action selection.

Full-screen surface
→ complex forms.

Do not use desktop-sized modals on mobile.

---

# 35. SAFE AREA

Implement actual CSS safe-area utilities.

Use:

env(safe-area-inset-top)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
env(safe-area-inset-right)

Apply to:

- Manager top bar,
- Manager Quick Action Bar,
- Manager drawer,
- Employee bottom navigation,
- Employee progress editor,
- full-screen mobile forms.

Do not reference undefined safe-area classes.

---

# 36. DYNAMIC VIEWPORT

For mobile fullscreen surfaces use:

100dvh

not:

100vh.

Especially:

- progress editor,
- drawer,
- full-screen forms,
- mobile Settings,
- mobile employee details.

---

# 37. MOBILE BREAKPOINTS

Use:

< 640px
Phone

640–767px
Large phone / small tablet

768–1023px
Tablet

≥ 1024px
Desktop

Do not only hide/show desktop sidebars.

Change the composition where necessary.

---

# 38. MOBILE OVERFLOW AUDIT

Test at:

360px
375px
390px
430px

Every mobile screen must have:

- no accidental horizontal scrolling,
- no clipped CTA,
- no clipped modal,
- no controls outside viewport,
- no content behind fixed navigation,
- no content behind Quick Action Bar.

Horizontal scrolling is allowed only inside intentionally scrollable components.

---

# 39. ACCESSIBILITY

Target WCAG 2.1 AA.

Verify:

- minimum 44×44px touch targets,
- keyboard navigation,
- focus states,
- focus order,
- screen-reader labels,
- accessible drawer,
- accessible dialogs,
- accessible bottom sheets,
- semantic navigation,
- sufficient contrast,
- status not communicated by color alone.

---

# 40. DEMO DATA CONSISTENCY

Use:

August 18, 2026

as Today.

Keep all dates consistent.

Pricing:

$10 / 10 employees
$20 / 20 employees
$30 / 40 employees

Annual:

$100 / 10
$200 / 20
$300 / 40

Never show impossible usage such as:

36 / 20.

---

# 41. VISUAL LANGUAGE

Keep the current restrained visual direction.

Prefer:

- typography,
- whitespace,
- subtle borders,
- restrained color,
- clear hierarchy.

Avoid:

- gradients,
- glassmorphism,
- excessive shadows,
- excessive cards,
- decorative illustrations,
- generic SaaS dashboards.

The product should feel:

calm
premium
clear
practical.

---

# 42. FINAL SCREEN-BY-SCREEN ACCEPTANCE TEST

Test the following at 390px:

Manager:

Login
→ Create organization
→ Onboarding
→ Dashboard
→ Employees
→ Employee detail
→ Schedule
→ Shift editor
→ Tasks & Goals
→ Task editor
→ Apply Task Template
→ Teams
→ Work Areas
→ Shift Templates
→ Task Templates
→ Profile
→ Billing.

Employee:

Login
→ Join organization
→ Today
→ Quantitative progress editor
→ Schedule
→ History
→ Profile.

For every screen verify:

- correct hierarchy,
- clear primary CTA,
- no accidental overflow,
- no hidden content,
- no desktop layout squeezed into mobile,
- touch targets are adequate.

---

# 43. FINAL PRODUCT PRINCIPLE

Do not add more functionality.

Make the existing functionality easier to use.

Manager:

PLAN
→ ASSIGN
→ MONITOR

Employee:

SEE
→ DO
→ UPDATE

Desktop:

SEE MORE
→ ACT IN BULK

Mobile:

CHOOSE
→ ACT
→ RETURN

The final mobile experience should feel deliberately designed for the phone, not like a desktop application compressed into a smaller viewport.

After this refinement, treat the UX as final MVP quality.
```