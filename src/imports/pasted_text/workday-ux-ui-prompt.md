Poniżej masz prompt przygotowany tak, żeby **Figma Make nie próbowała budować całego produktu**, tylko najpierw zaprojektowała spójny, realistyczny UX/UI dla Workday. Jest celowo bardzo konkretny w zakresie, ale nie narzuca implementacji.

# Workday — UX/UI Design Prompt

Design a production-quality UX/UI prototype for a SaaS product called **Workday**.

Workday is a simple B2B workforce management platform for companies employing frontline/operational workers such as warehouse staff, cleaning teams, production workers, hospitality staff, logistics teams, etc.

The product helps managers:

- manage employees,
- create and manage work schedules,
- assign tasks,
- assign measurable goals,
- monitor task/goal progress.

Employees use Workday to:

- see when they are scheduled to work,
- see what they need to do today,
- update task/goal progress,
- review their history,
- manage their personal profile.

The product must feel **extremely simple, calm, clear and premium**, inspired by the usability principles of Apple products — NOT by copying Apple's visual identity.

The key principle is:

> **Every screen should answer one question.**

Do not design a generic SaaS dashboard full of cards, charts and unnecessary information.

---

# 1. Core UX principles

Design the product around these principles:

1. **Clarity over feature density**
2. **Simple over clever**
3. **One primary action per screen**
4. **Strong visual hierarchy**
5. **Large readable typography**
6. **Generous whitespace**
7. **Minimal visual noise**
8. **Fast interaction**
9. **Mobile-first thinking for employees**
10. **Desktop-first thinking for managers**
11. **Accessibility from the beginning**
12. **Never require the user to understand the system before using it**

The interface should feel:

- modern,
- premium,
- trustworthy,
- calm,
- professional,
- lightweight,
- operational.

Avoid:

- excessive gradients,
- excessive rounded cards,
- decorative illustrations,
- excessive colors,
- tiny text,
- dense dashboards,
- unnecessary icons,
- visual clutter,
- "AI SaaS dashboard" aesthetics.

---

# 2. Accessibility

Design toward **WCAG 2.1 AA**.

Pay particular attention to:

- sufficient color contrast,
- text readability,
- large touch targets,
- keyboard accessibility on web,
- visible focus states,
- screen-reader-friendly labels,
- semantic hierarchy,
- scalable typography,
- accessible form controls,
- clear error messages,
- status information that is NOT communicated only through color.

Never use color as the only indication of:

- completed,
- pending,
- failed,
- active,
- inactive.

Use text, icons or other visual indicators as well.

---

# 3. Responsive product

Design a single coherent design system supporting:

### Employee

- Mobile app
- Mobile web
- Desktop web

### Manager

- Desktop web
- Mobile web
- Mobile app

The manager's primary experience is desktop web.

The employee's primary experience is mobile.

Do not create four unrelated products.

Use the same design language, components and interaction patterns across all platforms.

---

# 4. Roles

There are two roles in the MVP.

## Owner / Manager

The person who creates and manages the organization.

Can:

- manage employees,
- approve employees,
- edit employees,
- deactivate employees,
- reactivate employees,
- remove employees,
- create schedules,
- create shifts,
- create tasks,
- create measurable goals,
- assign tasks/goals,
- update progress,
- manage billing.

The Owner is also the billing owner.

## Employee

Can:

- create an account,
- join an organization,
- view their schedule,
- view today's tasks,
- update task/goal progress,
- view history,
- edit their profile.

---

# 5. Internationalization

The application must support:

- Polish
- English
- Spanish

Design the UI so that text expansion is possible.

Do NOT hardcode assumptions based on English-only text length.

Every interface label should conceptually support an i18n key.

Examples:

- `today.title`
- `schedule.title`
- `tasks.title`
- `profile.title`
- `employees.title`
- `billing.title`

The user's language is independent from the organization's language.

Example:

Manager can use English while an employee uses Spanish.

---

# 6. Authentication and onboarding

Create UX for:

### Sign up

Fields:

- first name
- last name
- email
- password
- confirm password

Required consent:

- Terms of Service
- Privacy Policy

Language selector.

Primary CTA:

**Create account**

---

# 7. Organization creation

After registration, a Manager creates an organization.

Fields:

- Organization name
- Country
- Default language

After creation, show:

## Organization Code

Example:

**WD-7K4P2**

Explain:

> Share this code with your employees so they can request access to your organization.

Do not imply that entering the code automatically grants access.

---

# 8. Employee joining flow

Employee selects:

**Join an organization**

Enters:

**Organization Code**

Example:

`WD-7K4P2`

Show:

> ABC Logistics

Then:

**Request access**

After submitting:

> Request sent

Explain:

> A manager needs to approve your request before you can access the organization.

Create a clear pending state.

---

# 9. Employee navigation

Employee mobile navigation:

1. **Today**
2. **Schedule**
3. **History**
4. **Profile**

Keep navigation extremely simple.

The employee should immediately understand what each section means.

---

# 10. Employee — Today

This is the most important screen in the entire product.

The screen must answer:

> **What do I need to do today?**

Example:

# Today

Monday, August 17

### Your shift

**06:00–14:00**

Warehouse A

---

### Your tasks

#### Pack orders

**83 / 120**

Progress bar

69%

Primary action:

**Update progress**

---

#### Inventory Zone B

Status:

**Not completed**

Action:

**Mark as done**

---

#### Prepare workstation

Status:

**Completed**

Use subtle visual confirmation.

Do not overwhelm the employee with analytics.

The screen should be immediately understandable when opened during work.

---

# 11. Employee — quantitative goal interaction

For a measurable goal:

Example:

**Pack orders**

83 / 120

Provide an extremely simple interaction to update progress.

Possible interaction:

`−  83  +`

or:

**Update progress**

opens:

Current progress:

83

New progress:

[ 90 ]

CTA:

**Save**

Do not make employees navigate through complicated forms.

---

# 12. Employee — Schedule

Show the current week.

Example:

Monday
06:00–14:00

Tuesday
06:00–14:00

Wednesday
OFF

Thursday
14:00–22:00

Friday
14:00–22:00

Selecting a day shows:

- shift time,
- workplace/location if configured,
- supervisor if configured.

Do NOT include:

- clock-in,
- clock-out,
- GPS,
- actual worked hours,
- payroll,
- overtime.

Workday only shows the planned schedule in MVP.

---

# 13. Employee — History

Create a simple history view.

Show:

- completed tasks,
- incomplete tasks,
- goal progress,
- selected date/range.

Keep it simple.

Avoid complex analytics.

---

# 14. Employee — Profile

Create a complete editable profile screen.

Show:

- profile picture/avatar,
- first name,
- last name,
- email,
- language,
- organization.

Actions:

- Edit personal information
- Change password
- Change language
- Log out
- Delete account

Email changes should clearly indicate that confirmation may be required.

---

# 15. Manager navigation

Desktop navigation:

- Dashboard
- Employees
- Schedule
- Tasks & Goals
- Settings
- Billing

Mobile manager navigation can be simplified appropriately while preserving access to all functionality.

---

# 16. Manager — Dashboard

The dashboard should answer:

> **How is my team doing today?**

Show:

- total employees,
- employees working today,
- employees off today,
- task completion,
- goal progress.

Example:

**40 employees**

36 working today

4 off

---

### Today's progress

Tasks:

**184 / 240**

Goals:

**76%**

Keep analytics limited.

Do not create a complicated BI dashboard.

---

# 17. Manager — Employees

Create a clean employee management interface.

Desktop should support approximately 40 employees without becoming difficult to use.

Show:

- name,
- status,
- today's shift,
- optionally today's task progress.

Statuses:

- Active
- Pending
- Inactive

Actions:

- Invite employee
- Approve employee
- Edit employee
- Deactivate employee
- Reactivate employee
- Remove employee

Deactivation must be clearly different from deletion.

---

# 18. Manager — employee invitation

Create:

**Invite employee**

Fields:

- employee email
- optional first/last name

Also show the organization's join code.

Allow the manager to copy the code.

Make both flows possible:

1. Manager invites employee.
2. Employee joins using organization code.

---

# 19. Manager — Schedule

This is one of the most important manager interfaces.

Do NOT use a traditional form-first scheduling experience.

Create an **Excel-inspired operational grid**, but make it cleaner and easier than Excel.

Example:

| Employee | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Anna | 06–14 | 06–14 | OFF | 06–14 | 06–14 |
| John | 14–22 | 14–22 | 14–22 | OFF | 14–22 |
| Maria | 06–14 | OFF | 06–14 | 06–14 | 06–14 |
| Peter | 08–16 | 08–16 | 08–16 | 08–16 | OFF |

The actual UI should NOT necessarily look like a spreadsheet.

It should feel like a modern scheduling tool.

Requirements:

- easy to scan,
- easy to edit,
- easy to assign shifts,
- suitable for 40 employees,
- sticky employee column,
- clear days,
- clear shift blocks,
- strong keyboard support on desktop.

---

# 20. Schedule interactions

Design interactions for:

### Create shift

Click an empty cell.

Show a compact editor:

- start time
- end time
- location
- optional notes

CTA:

**Save**

### Copy shift

Allow copying a shift from one day to another.

### Copy previous week

Primary productivity action:

**Copy previous week**

This should copy the schedule and allow the manager to adjust exceptions.

### Shift templates

Create templates:

- Morning Shift
- Afternoon Shift
- Night Shift

Manager can apply a template to multiple employees.

Do not build automatic schedule optimization.

---

# 21. Manager — Tasks & Goals

Create a management view optimized for large teams.

It should be possible to see:

- employee,
- assigned task,
- task type,
- progress,
- status.

Example:

| Employee | Task / Goal | Progress |
|---|---|---|
| Anna | Pack orders | 83 / 120 |
| Anna | Clean Zone A | Completed |
| John | Pack orders | 91 / 120 |
| Maria | Inventory | Pending |

---

# 22. Create task

Support two types:

### Task

Binary completion:

- Pending
- Completed

Example:

**Clean Zone A**

### Goal

Quantitative progress:

- target
- current value
- unit

Example:

**Pack orders**
Target: 120
Unit: orders

---

# 23. Bulk task assignment

This is critical.

Manager must be able to select many employees at once.

Example:

☑ Anna  
☑ John  
☑ Maria  
☑ Peter  
☐ David

Then:

Task:

**Pack orders**

Type:

**Goal**

Target:

**120**

Unit:

**orders**

CTA:

**Assign**

The interaction should feel significantly faster than creating 40 individual tasks.

---

# 24. Task templates

Support reusable task templates.

Example:

## Morning warehouse setup

- Check equipment
- Prepare packing stations
- Check loading area

Manager can select:

**Apply template**

and assign it to selected employees.

Do NOT implement automatic recurring schedules in this prototype.

---

# 25. Manager progress editing

Manager can view employee progress.

Example:

Anna

Pack orders

83 / 120

Manager can select:

**Edit progress**

and change:

83 → 78

Optionally provide a reason.

The interface should make it clear that the manager is modifying the recorded progress.

---

# 26. Billing

Create a clean Billing section.

Plans:

### 10 employees

$10/month  
$100/year

### 20 employees

$20/month  
$200/year

### 40 employees

$30/month  
$300/year

Pricing is based on employees.

The manager/owner is NOT counted toward the employee limit.

Maximum organization users:

- 11
- 21
- 41

respectively.

Show:

- current plan,
- employee usage,
- billing interval,
- next payment,
- trial status.

CTA:

**Manage subscription**

This opens Stripe Customer Portal.

Also provide:

**Change plan**

---

# 27. Trial UX

Trial duration:

**14 days**

During trial show a subtle but clear indicator:

> **14-day free trial · 10 days remaining**

Do not make the application feel like an advertisement.

When trial is ending, show appropriate billing messaging.

---

# 28. Settings

Manager settings should include:

### Organization

- organization name
- country
- default language
- organization code

### Profile

- personal information
- language
- password

### Billing

- current plan
- subscription
- Stripe Customer Portal

---

# 29. Design system

Create a reusable design system.

Define:

### Typography

Use a highly legible modern sans-serif.

Prioritize:

- readability,
- hierarchy,
- clear numbers,
- large headings,
- readable body text.

### Spacing

Use a consistent spacing system.

### Buttons

Create:

- primary,
- secondary,
- tertiary,
- destructive.

### Inputs

Create:

- text,
- password,
- select,
- date,
- time,
- numeric,
- search.

### Statuses

Create accessible representations for:

- active,
- pending,
- completed,
- incomplete,
- inactive,
- trial,
- paid,
- past due.

### Tables / grids

Create responsive data grid components.

### Progress

Create:

- progress bars,
- percentage,
- numeric progress.

Never rely on color alone.

---

# 30. Responsive behavior

Do not simply shrink desktop screens onto mobile.

For mobile:

- prioritize one action,
- collapse secondary information,
- use bottom sheets where appropriate,
- use clear vertical layouts,
- keep touch targets large,
- avoid dense tables.

For desktop:

- use space efficiently,
- support keyboard interaction,
- support dense but readable manager workflows.

The Schedule grid is allowed to be information-dense on desktop but should transform into a mobile-friendly list/calendar representation.

---

# 31. Empty states

Design realistic empty states.

Examples:

### No tasks

> No tasks for today.

CTA for manager:

**Create task**

Employee:

> You're all caught up.

### No schedule

> No shifts scheduled.

### No employees

> Add your first employee.

CTA:

**Invite employee**

### Pending organization request

> Your request is waiting for approval.

---

# 32. Error states

Design clear, human-readable errors.

Never use technical messages such as:

> Error 500

Prefer:

> Something went wrong. Please try again.

For network issues:

> You're offline. Your changes will be saved when the connection is restored.

Only show offline behavior if actually supported by the implementation; do not imply functionality that does not exist.

---

# 33. Confirmation states

Important destructive actions require confirmation:

- deactivate employee,
- remove employee,
- delete account,
- cancel subscription.

Use concise confirmation dialogs.

Example:

> Deactivate Anna?

> Anna will no longer be able to access the organization. Her previous schedules and task history will be preserved.

Actions:

**Cancel**

**Deactivate**

---

# 34. Visual direction

Use a restrained visual language.

Prefer:

- white / neutral backgrounds,
- subtle borders,
- restrained shadows,
- one primary accent,
- strong typography,
- large whitespace,
- consistent radius,
- simple icons.

Do NOT overuse:

- gradients,
- glassmorphism,
- colorful cards,
- huge illustrations,
- excessive rounded containers.

The design should feel like a **professional tool people trust with their daily work**.

---

# 35. Prototype requirements

Create an interactive prototype covering these complete flows:

### Flow A — Manager onboarding

Sign up
→ create organization
→ choose plan
→ start trial
→ dashboard

### Flow B — Employee joining

Sign up
→ enter organization code
→ request access
→ pending
→ approved
→ Today

### Flow C — Manager creates schedule

Dashboard
→ Schedule
→ select week
→ assign shifts
→ copy previous week
→ save

### Flow D — Manager assigns work

Tasks & Goals
→ create task
→ select multiple employees
→ assign
→ view progress

### Flow E — Employee completes work

Today
→ open task
→ mark complete / update goal
→ progress updated

### Flow F — Manager monitors

Dashboard
→ today's progress
→ employee
→ task/goal
→ edit progress

### Flow G — Billing

Settings
→ Billing
→ choose monthly/yearly
→ Stripe checkout placeholder
→ subscription state

---

# 36. Prototype data

Use realistic demo data.

Create an organization with approximately **40 employees**.

Use realistic names from multiple linguistic backgrounds to demonstrate the international nature of the product.

Create:

- multiple shifts,
- multiple tasks,
- quantitative goals,
- completed and incomplete tasks,
- employees with different statuses.

The 40-person dataset is important because the manager UX must be tested at realistic scale.

---

# 37. What NOT to design

Do not add:

- payroll,
- attendance tracking,
- clock-in/out,
- GPS,
- vacation management,
- sick leave,
- HR documents,
- employee chat,
- AI assistant,
- automatic schedule optimization,
- advanced analytics,
- gamification,
- leaderboard,
- marketplace,
- ERP integrations,
- accounting,
- biometric features.

These are outside MVP.

---

# 38. Final product principle

The entire product should feel like:

> **Plan the work.  
> Show the work.  
> Do the work.  
> See the progress.**

Manager:

**Schedule → Tasks → Progress**

Employee:

**Today → Tasks → Schedule → History**

The product must be so simple that a frontline employee can install it and understand the Today screen **without training**.

The manager should be able to organize a team of 40 people significantly faster than using a conventional spreadsheet.

Prioritize **clarity, speed and simplicity over feature count**.

Create the complete responsive prototype and reusable design system based on this specification.