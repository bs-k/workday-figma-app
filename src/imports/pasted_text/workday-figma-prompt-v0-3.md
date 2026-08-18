Tak. Ostatni prompt obejmował większość ustaleń, ale **brakowało kilku rzeczy, które ustaliliśmy później**. Najlepiej nie doklejać kolejnych fragmentów, tylko dać Figma Make **jedną skonsolidowaną wersję v0.3**, żeby nie było sprzecznych instrukcji.

Najważniejsze doprecyzowania:
- **Owner = Manager** — jedna rola administracyjna w MVP.
- brak osobnego Admina.
- pełny **Profile** z edycją danych.
- manager może **zapraszać, akceptować, edytować, dezaktywować, reaktywować i usuwać** pracowników.
- **web desktop + web mobile dla obu ról** oraz aplikacja mobilna.
- **brak rejestracji czasu pracy** — grafik pokazuje wyłącznie planowane godziny.
- 14-dniowy trial.
- Stripe monthly + yearly + Customer Portal.
- pricing i limity dokładnie zgodne z naszymi ustaleniami.
- planowanie zadań i grafiku **w przyszłość**, minimum kilka tygodni / miesiąc.
- limit dotyczy wyłącznie pracowników: **1 manager + N pracowników**.
- PL/EN/ES.
- WCAG 2.1 AA.
- 40 pracowników jako rzeczywisty scenariusz testowy.
- zachowujemy **Excel-like operational workflow**, ale nie wygląd Excela.

Poniżej gotowy, skonsolidowany prompt.

---

# Workday — Figma Make UX/UI Refinement v0.3

Refine the **existing Workday prototype**. Do not rebuild the product from scratch.

The goal is to turn the existing prototype into a highly polished, production-quality UX/UI concept for Workday.

Workday is a simple B2B workforce management SaaS for companies with frontline/operational employees.

The product helps a manager:

**PLAN → ASSIGN → MONITOR**

The employee uses it to:

**SEE → DO → UPDATE**

The most important product principle is:

> **The employee should always know what they need to do today. The manager should be able to organize a team of up to 40 employees faster than with a spreadsheet.**

---

# 1. Product positioning

Workday is **not** an HRIS.

Do not introduce:

- time tracking,
- clock-in / clock-out,
- actual worked hours,
- GPS,
- payroll,
- overtime,
- vacation management,
- sick leave,
- HR documents,
- employee chat,
- AI scheduling,
- automatic schedule optimization,
- gamification,
- leaderboards.

In MVP, a shift represents **planned working time only**.

Example:

> 06:00–14:00

means the employee is scheduled to work during that period.

It does NOT mean that Workday records whether they actually worked those hours.

---

# 2. Roles

There are exactly two user roles in MVP.

## Owner / Manager

The person who creates and manages the organization.

There is **no separate Admin role in MVP**.

Owner/Manager can:

- create organization,
- manage employees,
- invite employees,
- approve employee requests,
- edit employee information,
- deactivate employees,
- reactivate employees,
- remove employees,
- create teams,
- create schedules,
- create shifts,
- create shift templates,
- plan future schedules,
- copy previous weeks,
- create tasks,
- create quantitative goals,
- create task templates,
- bulk-assign tasks,
- monitor progress,
- edit recorded progress,
- manage subscription and billing.

Owner/Manager is also the billing owner.

## Employee

Employee can:

- create an account,
- join an organization,
- view planned schedule,
- view today's tasks,
- update task progress,
- view history,
- edit personal profile,
- change language,
- change password.

Employees cannot edit their schedule.

---

# 3. Organization model

Manager creates an organization.

Fields:

- organization name,
- country,
- default language.

After creation, generate a unique organization code.

Example:

**WD-7K4P2**

The code allows employees to find the organization and request access.

Entering the code must NOT automatically grant access.

Flow:

**Employee enters code → organization found → employee requests access → manager approves → employee becomes active.**

---

# 4. Employee onboarding

Support two ways to join:

## Organization code

Employee enters:

**WD-7K4P2**

Sees:

**ABC Logistics**

Then:

**Request access**

Show:

> Your request has been sent. A manager needs to approve it before you can access the organization.

## Email invitation

Manager can send an invitation by email.

Manager should also be able to display/copy the organization code.

Example:

```text
Invite employees

[ Invite by email ]

or

Share organization code

WD-7K4P2
[ Copy ]
```

This is important because frontline workers may not have company email addresses.

---

# 5. Authentication

Registration uses:

- first name,
- last name,
- email,
- password,
- confirm password.

Required consent:

- Terms of Service,
- Privacy Policy.

Do not add Google/Apple/social login in MVP.

---

# 6. User profile

Both Manager and Employee must have a complete profile.

Profile should allow editing:

- first name,
- last name,
- email,
- language,
- password.

Also show:

- organization,
- account status where relevant.

Actions:

- Edit profile,
- Change password,
- Change language,
- Log out,
- Delete account.

Email changes should clearly communicate that confirmation may be required.

Account deletion is destructive and requires confirmation.

---

# 7. Employee lifecycle

Manager must be able to manage employee state.

Statuses:

- Pending
- Active
- Inactive

Manager actions:

- Invite
- Approve
- Edit
- Deactivate
- Reactivate
- Remove

Important distinction:

> **Deactivate ≠ Remove**

Deactivating an employee:

- removes access,
- preserves historical schedules,
- preserves historical tasks,
- preserves historical progress.

Removing an employee is a separate destructive operation.

---

# 8. Pricing

Workday has three plans.

## Monthly

**Workday 10**

10 employees  
$10 / month

**Workday 20**

20 employees  
$20 / month

**Workday 40**

40 employees  
$30 / month

## Yearly

**Workday 10**

10 employees  
$100 / year

**Workday 20**

20 employees  
$200 / year

**Workday 40**

40 employees  
$300 / year

Annual pricing effectively gives two months free.

There are no additional usage fees in MVP.

---

# 9. User limits

The employee limit applies **only to employees**.

The Owner/Manager is NOT counted.

Therefore:

| Plan | Manager | Employees | Maximum users |
|---|---:|---:|---:|
| $10 | 1 | 10 | 11 |
| $20 | 1 | 20 | 21 |
| $30 | 1 | 40 | 41 |

When the employee limit is reached, show a clear upgrade message.

Example:

> You've reached your 10 employee limit.

> Upgrade to the 20 employee plan to add more employees.

Do not count the Manager toward the employee limit.

---

# 10. Trial and billing

Workday has a **14-day free trial**.

Trial should provide full product functionality.

Billing is handled through **Stripe**.

UX should support:

- monthly subscription,
- yearly subscription,
- trial status,
- current plan,
- employee usage,
- next billing date,
- subscription status.

Provide:

**Manage subscription**

which opens **Stripe Customer Portal**.

Also provide:

**Change plan**

Billing should be available from Settings → Billing.

Do not make billing dominate the core product UX.

---

# 11. Employee navigation

Employee primary navigation:

**Today · Schedule · History · Profile**

Do not add more top-level sections in MVP.

Today is the primary destination.

---

# 12. Employee — Today

This is the most important screen in the entire product.

It must immediately answer:

> **What do I need to do today?**

Example:

# Today

Monday, August 17

### Your shift

**06:00–14:00**

Warehouse A

---

### Your work

#### Pack orders

**83 / 120**

69%

**Update progress**

---

#### Clean Zone A

**Not completed**

**Mark as done**

---

#### Prepare workstation

**Completed**

Keep this screen extremely simple.

Do NOT fill it with:

- analytics,
- KPI cards,
- unnecessary metadata,
- charts,
- decorative elements.

The employee should understand the screen without training.

---

# 13. Employee — Tasks vs Goals

There are two fundamentally different types of work.

## Task

Binary completion.

Example:

**Clean Zone A**

State:

**Not completed**

Action:

**Mark as done**

## Goal

Quantitative progress.

Example:

**Pack orders**

83 / 120 orders

Action:

**Update progress**

Make the visual difference immediately understandable.

---

# 14. Employee — Schedule

Employee can view:

- previous weeks,
- current week,
- future weeks.

Provide:

**Previous week ←**

**Current week**

**→ Next week**

and:

**Today**

to return to the current week.

Employee cannot modify the schedule.

Show:

- date,
- planned shift,
- location where applicable,
- optional supervisor.

Do NOT show actual worked time.

---

# 15. Employee — History

Keep history simple.

Show weekly completion:

```text
MON   7 / 8 tasks
TUE   8 / 8 tasks
WED   6 / 7 tasks
THU   8 / 8 tasks
FRI   7 / 7 tasks
```

Clicking a day reveals details.

Do not introduce advanced employee analytics.

---

# 16. Manager navigation

Desktop Manager navigation:

- Dashboard
- Employees
- Schedule
- Tasks & Goals
- Settings
- Billing

Mobile Manager navigation may be adapted to screen size, but all essential functionality must remain accessible.

---

# 17. Manager Dashboard

Do NOT create a generic SaaS KPI dashboard.

The dashboard should answer:

> **What needs my attention today?**

Example:

# Good morning

Monday, August 17

**36 people working today · 4 off**

### Today's progress

Tasks:

**184 / 240**

Goals:

**76%**

### Needs attention

Examples:

- 3 employees have incomplete tasks
- 2 shifts are unassigned
- 1 employee has no assigned work today

Each item should have a direct action:

**View**

The dashboard should be operational, not decorative.

---

# 18. Schedule — core manager workflow

Schedule is one of the most important parts of Workday.

The manager must be able to plan:

- today,
- this week,
- next week,
- multiple future weeks,
- an entire upcoming month.

The manager must be able to navigate backward and forward through time.

The schedule must NOT be limited to the current week.

---

# 19. Week navigation

At the top:

```text
← Previous week

August 17–23, 2026

Next week →
```

Also provide:

**Today**

The manager can continuously navigate:

- previous weeks,
- current week,
- future weeks.

For example:

August 17–23  
August 24–30  
August 31–September 6  
September 7–13  
September 14–20  
etc.

The manager can also navigate backward indefinitely within the available data range.

---

# 20. Date/week picker

Provide a compact date/week picker.

Manager can:

- move one week backward,
- move one week forward,
- select a specific date,
- jump directly to a week,
- return to Today.

The weekly operational grid remains the primary scheduling interface.

Do not create a complicated separate monthly scheduling product.

---

# 21. Monthly planning

Monthly planning is an important use case.

The manager should be able to plan the next month by working through weekly views.

Typical workflow:

**Open future week → Copy previous week → Adjust exceptions → Next week → Copy previous week → Adjust → Repeat**

The product should make this workflow extremely fast.

The manager should NOT have to manually recreate the same shifts every week.

---

# 22. Schedule grid

Create an Excel-inspired operational grid, but do NOT make it visually resemble Excel.

Example:

```text
                 MON       TUE       WED       THU       FRI

Anna             06–14     06–14     OFF       06–14     06–14
John             14–22     14–22     14–22     OFF       14–22
Maria            06–14     OFF       06–14     06–14     06–14
Peter            08–16     08–16     08–16     08–16     OFF
...
```

Requirements:

- approximately 40 employees,
- sticky employee column,
- clear day headers,
- readable shift cells,
- clear OFF state,
- search,
- filtering,
- team filtering,
- bulk selection,
- keyboard navigation.

The schedule should be information-dense but calm and readable.

---

# 23. Schedule editing

Clicking a shift cell opens a compact contextual editor/popover.

Example:

```text
Anna · Tuesday

06:00 — 14:00

Morning Shift

Warehouse A

[Save]
```

Allow editing:

- start time,
- end time,
- shift template,
- location,
- optional note.

Do not force the manager through a large modal for every shift.

---

# 24. Bulk schedule operations

This is a core MVP feature.

Manager can select multiple employees:

```text
☑ Anna
☑ John
☑ Maria
☑ Peter
☐ David
```

Then:

**Apply shift**

Example:

**Morning Shift · 06:00–14:00**

One operation should assign the shift to all selected employees.

Support:

- Select all,
- Select visible,
- Select by team,
- Select by department if used,
- filter by current shift.

---

# 25. Copy operations

Support:

### Copy previous week

Example:

Manager is viewing:

**August 24–30**

Previous week:

**August 17–23**

Action:

**Copy previous week**

Copy:

August 17–23 → August 24–30

This must work for every future week.

If the destination is empty, make the operation extremely fast.

If the destination already contains shifts, show a confirmation.

Example:

> This week already contains scheduled shifts. Copying the previous week may replace existing shifts.

Actions:

**Cancel**

**Replace**

Never silently overwrite existing schedule data.

---

# 26. Copy day

Support:

**Copy Monday → Tuesday**

and equivalent operations.

Make this easy to discover from a day action menu.

---

# 27. Copy shift

Allow copying an individual shift from one employee/day cell to another.

Provide an alternative to drag-and-drop.

Do not make drag-and-drop the only method.

---

# 28. Shift templates

Create reusable shift templates.

Examples:

**Morning Shift**  
06:00–14:00

**Afternoon Shift**  
14:00–22:00

**Night Shift**  
22:00–06:00

Manager can apply a template to:

- one employee,
- multiple employees,
- a team.

Do not build AI or automatic scheduling.

---

# 29. Teams

Introduce a lightweight Team concept.

Examples:

- Warehouse Team A
- Warehouse Team B
- Cleaning Team
- Production Team 1

Manager can:

- create team,
- rename team,
- assign employees,
- filter schedule by team,
- bulk assign shifts to a team,
- bulk assign tasks to a team.

Do not create a complicated organizational hierarchy.

---

# 30. Tasks and Goals are date-based

Tasks and goals must belong to a specific planned date.

Example:

**Pack orders**

Target:

120 orders

Date:

August 24

Assigned to:

Anna, John, Maria

The same task/template can be reused on another date, but each assignment is date-specific.

This is essential because the manager needs to plan work for future dates.

---

# 31. Manager — Tasks & Goals

Create a management view optimized for teams of up to 40 employees.

Show:

- employee,
- task/goal,
- date,
- progress,
- status.

Example:

```text
Anna     Pack orders      Aug 24     83 / 120
Anna     Clean Zone A     Aug 24     Completed
John     Pack orders      Aug 24     91 / 120
Maria    Inventory        Aug 24     Pending
```

Allow navigation through future dates and weeks.

---

# 32. Future task planning

Manager must be able to plan work for:

- today,
- tomorrow,
- any future date,
- future weeks,
- next month.

Provide clear date navigation:

**← Previous day**

**Today**

**Next day →**

The manager should not be restricted to today's tasks.

---

# 33. Bulk task assignment

Core MVP workflow:

1. Select multiple employees.
2. Select date.
3. Select/create task.
4. Choose task type.
5. Define goal target if applicable.
6. Assign.

Example:

```text
Selected: 18 employees

Date:
August 24

Task:
Pack orders

Type:
Goal

Target:
120

Unit:
orders

[Assign]
```

This should be significantly faster than assigning tasks one employee at a time.

---

# 34. Task templates

Support reusable task templates.

Example:

### Morning warehouse setup

- Check equipment
- Prepare packing stations
- Check loading area

Manager can:

**Apply template**

Then choose:

- date,
- employees,
- team.

Do NOT implement automatic recurring tasks in MVP.

---

# 35. Manager progress editing

Manager can edit recorded employee progress.

Example:

Anna

Pack orders

83 / 120

**Edit progress**

Change:

83 → 78

Optionally add a reason.

The UI must make it clear that the manager is modifying recorded progress.

---

# 36. Employee management

Employee list should show:

- name,
- team,
- status,
- today's shift,
- today's progress.

Actions:

- Invite,
- Approve,
- Edit,
- Deactivate,
- Reactivate,
- Remove.

Support search and filtering.

Design for 40 employees.

---

# 37. Onboarding — first value

Do not send the manager into an empty dashboard.

After organization creation:

# Set up your first workday

**1. Add your team**

→ Add employees

**2. Create your schedule**

→ Build schedule

**3. Assign today's work**

→ Add tasks

**4. You're ready**

The setup should be lightweight.

Do not require unnecessary configuration before the manager can use the product.

---

# 38. Mobile Manager

Do NOT simply shrink desktop.

Create a dedicated responsive mobile experience.

For Schedule, mobile can use:

```text
Monday

Anna       06–14
John       14–22
Maria      06–14

[Add shift]
```

Support:

- Day view,
- Week view,
- previous/next navigation,
- Today,
- editing,
- essential bulk operations.

Use bottom sheets/popovers where appropriate.

---

# 39. Mobile Employee

Employee mobile is the most important mobile experience.

Optimize for:

- one-handed use,
- fast scanning,
- large touch targets,
- readable typography,
- minimal navigation,
- obvious actions.

Avoid dense tables on mobile.

---

# 40. Desktop Manager

Desktop is the primary productivity environment.

Optimize for:

- 40 employees,
- weekly planning,
- monthly forward planning,
- bulk selection,
- templates,
- copy operations,
- search,
- filters,
- keyboard navigation.

The manager should be able to organize several future weeks quickly.

---

# 41. Responsive web

Both roles must have full web experiences:

### Employee

- desktop web,
- mobile web.

### Manager

- desktop web,
- mobile web.

Mobile web must not simply be a scaled-down desktop UI.

---

# 42. Mobile application

The mobile application should use a cross-platform design direction suitable for:

- Android,
- iOS.

Do not design platform-specific experiences that would require separate product logic.

---

# 43. Visual design

The visual goal is:

> **calm, premium, extremely clear and functional.**

Inspired by the usability principles of Apple, Linear and Things.

Do NOT copy their visual identity.

Avoid generic SaaS aesthetics:

- excessive cards,
- excessive rounded containers,
- excessive badges,
- gradients,
- glassmorphism,
- decorative illustrations,
- excessive shadows,
- colorful KPI dashboards.

Prefer:

- strong typography,
- whitespace,
- subtle borders,
- restrained colors,
- clear hierarchy,
- clear numbers,
- minimal containers,
- subtle interaction states.

The UI should feel trustworthy and professional.

---

# 44. Employee visual priority

Employee UI should prioritize:

1. Today
2. Shift
3. Tasks
4. Progress
5. Navigation

Do not overload employees with manager-style analytics.

---

# 45. Manager visual priority

Manager UI should prioritize:

1. Schedule
2. Tasks & Goals
3. Team
4. Today's exceptions
5. Employee management

The manager can see more information than the employee, but information must remain structured.

---

# 46. Accessibility

Design toward **WCAG 2.1 AA** from the beginning.

Verify:

- color contrast,
- keyboard navigation,
- visible focus states,
- focus order,
- screen-reader labels,
- semantic headings,
- accessible tables,
- accessible schedule grid,
- accessible forms,
- scalable typography,
- adequate touch targets.

Never communicate status using color alone.

Do not rely exclusively on drag-and-drop.

Every drag-and-drop operation must have a non-drag alternative.

---

# 47. Scale scenarios

Test the UX with:

### 0 employees

Clear onboarding.

### 5 employees

No unnecessary empty space or complexity.

### 20 employees

Efficient management.

### 40 employees

The interface must remain usable.

For 40 employees provide:

- search,
- filters,
- teams,
- bulk selection,
- sticky headers,
- sticky employee column,
- appropriate virtualization/pagination if needed.

---

# 48. Empty states

Create intentional empty states.

Manager:

> Add your first employee.

> Build your first schedule.

> Assign today's work.

Employee:

> You're all caught up.

> No shifts scheduled yet.

Every empty state should explain what to do next when appropriate.

---

# 49. Error states

Use human language.

Bad:

> Error 500

Good:

> Something went wrong. Please try again.

Destructive actions must explain consequences.

Example:

> Deactivate Anna?

> Anna will lose access to the organization. Her previous schedules and task history will be preserved.

Actions:

**Cancel**

**Deactivate**

---

# 50. Internationalization

Support:

- Polish,
- English,
- Spanish.

Every UI string must be designed with localization in mind.

Test layouts against different text lengths.

The user's language is independent from the organization's default language.

Example:

Manager:

**English**

Employee:

**Spanish**

---

# 51. Design system

Create a reusable design system covering:

- typography,
- spacing,
- buttons,
- inputs,
- forms,
- navigation,
- tables,
- schedule grid,
- shift cells,
- task components,
- goal components,
- progress indicators,
- status indicators,
- dialogs,
- popovers,
- bottom sheets,
- empty states,
- error states.

The same design system must work across:

- desktop web,
- mobile web,
- mobile application.

---

# 52. Prototype flows

The refined prototype must demonstrate:

### Flow A — Manager onboarding

Sign up  
→ consent  
→ create organization  
→ start 14-day trial  
→ add employees  
→ create first schedule  
→ assign first tasks  
→ dashboard.

### Flow B — Employee joining

Sign up  
→ consent  
→ enter organization code  
→ request access  
→ pending  
→ manager approves  
→ Today.

### Flow C — Monthly schedule planning

Schedule  
→ navigate to future week  
→ Copy previous week  
→ modify exceptions  
→ navigate to next week  
→ repeat.

### Flow D — Bulk schedule

Schedule  
→ select team/employees  
→ apply shift template  
→ save.

### Flow E — Future task planning

Tasks & Goals  
→ navigate to future date  
→ select employees  
→ create goal  
→ assign.

### Flow F — Employee work

Today  
→ view shift  
→ view task  
→ mark complete / update goal  
→ progress updated.

### Flow G — Manager monitoring

Dashboard  
→ today's progress  
→ employee  
→ task/goal  
→ edit progress.

### Flow H — Employee profile

Profile  
→ edit data  
→ change language  
→ save.

### Flow I — Employee management

Employees  
→ invite  
→ approve  
→ edit  
→ deactivate  
→ reactivate / remove.

### Flow J — Billing

Settings  
→ Billing  
→ monthly/yearly plan  
→ trial state  
→ manage subscription.

---

# 53. Final product principle

The entire product must feel like:

## Manager

**PLAN → ASSIGN → MONITOR**

## Employee

**SEE → DO → UPDATE**

The manager should be able to plan **a full month of work** without manually rebuilding the same schedule every week.

The primary productivity pattern should be:

> **COPY → ADJUST → COPY → ADJUST**

rather than:

> **CREATE HUNDREDS OF SHIFTS MANUALLY**

The employee should be able to open Workday and understand their working day immediately.

The product should be:

> **simple enough for a frontline employee and powerful enough for a manager managing 40 people.**

Do not introduce functionality outside this scope.

Prioritize:

1. Future week navigation
2. Monthly forward planning
3. Copy previous week
4. Operational schedule grid
5. Bulk schedule operations
6. Future task planning
7. Bulk task assignment
8. Employee Today
9. Employee management
10. Onboarding
11. Profile
12. Responsive web
13. Mobile UX
14. Accessibility
15. Billing UX