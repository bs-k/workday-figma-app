Jasne. To będzie **ostatni duży prompt do Figma Make przed zamrożeniem UX**. Skupia się na domknięciu logicznych ścieżek, a nie na dalszym dokładaniu funkcji.

```text
# Workday — UX/UI Logic & Management Flows Refinement v0.4

Refine the EXISTING Workday prototype.

Do NOT rebuild the application from scratch.

Do NOT introduce new product concepts outside this specification.

The purpose of this refinement is to close the remaining logical UX gaps and make every important manager workflow complete and internally consistent.

After this refinement, the Workday MVP should have a coherent model:

ORGANIZATION
→ TEAMS
→ WORK AREAS
→ EMPLOYEES
→ SCHEDULE
→ TASKS & GOALS
→ PROGRESS

Templates support repeatable work:

SHIFT TEMPLATES
TASK TEMPLATES

The product should remain extremely simple.

The manager should be able to manage up to 40 employees and plan several weeks / an entire month without manually recreating repetitive work.

---

# 1. IMPORTANT: DO NOT REDESIGN EVERYTHING

Keep the current visual direction where it is already good.

Do not replace the entire UI.

Focus this iteration on:

- missing management flows,
- missing CRUD operations,
- logical relationships,
- future planning,
- bulk operations,
- template creation,
- Teams,
- Work Areas,
- responsive/mobile flows,
- consistency between screens.

The goal is to make the existing prototype logically complete.

---

# 2. REMOVE DEPARTMENT FROM MVP

Do NOT use Department as a separate organizational concept.

The MVP has only two organizational concepts:

## Team

Answers:

> Who works together?

Examples:

- Team A
- Logistics Team
- Warehouse Team B

## Work Area

Answers:

> Where is the work performed?

Examples:

- Warehouse 1
- Warehouse 2
- Production Hall
- Loading Dock

Do not introduce:

- departments,
- divisions,
- organizational hierarchies,
- locations as a third similar concept.

Keep the model simple:

Employee → Team

Shift → Work Area

---

# 3. ORGANIZATION SETTINGS

Expand Settings to provide a clear organization management area.

Use a structure similar to:

Settings

## Organization
- Organization
- Teams
- Work areas

## Templates
- Shift templates
- Task templates

## Account
- Profile

## Billing
- Subscription

Do not expose every configuration option in the main navigation.

These settings should be accessible from the Manager settings area.

---

# 4. TEAM MANAGEMENT

Create a complete Team management flow.

Manager must be able to:

- view teams,
- create a team,
- rename a team,
- assign employees,
- remove employees from a team,
- delete a team.

Example:

Teams

```text
Warehouse Team A       10 employees
Warehouse Team B       10 employees
Logistics Team          7 employees
Production Team        13 employees

[ + Create team ]
```

---

# 5. CREATE TEAM

Create a complete flow:

```text
Create team

Team name
[ Logistics Team ]

Employees
[ Select employees ]

[ Cancel ] [ Create team ]
```

After creation, the team must immediately appear in:

- Employees,
- Schedule filters,
- Tasks & Goals bulk assignment.

---

# 6. EDIT TEAM

Manager opens:

```text
Logistics Team

7 employees

[ Add employees ]

Anna
John
Maria
...

[ Rename team ]
[ Delete team ]
```

Deleting a team must NOT delete employees.

Employees become:

> No team assigned

Historical schedules and tasks must remain unchanged.

Require confirmation before deleting a team.

---

# 7. EMPLOYEE → TEAM

Manager editing an employee must allow assigning a team.

Example:

```text
Edit employee

First name
Anna

Last name
Smith

Email
anna@example.com

Team
[ Logistics Team ▼ ]

Status
Active

[ Save ]
```

The Team selector should show:

- existing teams,
- No team.

Do not allow creating a new team from this field.

Team creation belongs in Settings → Teams.

---

# 8. WORK AREA MANAGEMENT

Create a complete Work Areas management flow.

Manager must be able to:

- view work areas,
- create area,
- rename area,
- deactivate area,
- reactivate area.

Example:

Work areas

```text
Warehouse 1
Warehouse 2
Production Hall
Loading Dock

[ + Add work area ]
```

---

# 9. CREATE WORK AREA

Flow:

```text
Create work area

Name
[ Warehouse 1 ]

[ Cancel ] [ Create ]
```

After creation, the area must immediately become available when creating/editing shifts.

---

# 10. WORK AREA DEACTIVATION

Do NOT delete historical references when an area is deactivated.

If:

Warehouse 1

is deactivated:

- existing historical shifts remain associated with Warehouse 1,
- future shifts cannot select the inactive area,
- manager can reactivate it.

Show inactive areas clearly.

---

# 11. SHIFT → WORK AREA

A shift must use a Work Area selected from the organization's configured areas.

Do NOT use free text for the primary location field.

Example:

```text
Edit shift

Start
06:00

End
14:00

Work area
[ Warehouse 1 ▼ ]

Shift template
[ Morning Shift ▼ ]

Note
[ Optional ]

[ Save ]
```

This creates the logical relationship:

Shift → Work Area.

---

# 12. SHIFT TEMPLATES

Create complete Shift Template management.

Manager must be able to:

- view templates,
- create template,
- edit template,
- deactivate template,
- reactivate template.

Example:

Shift templates

```text
Morning Shift
06:00–14:00

Afternoon Shift
14:00–22:00

Night Shift
22:00–06:00

[ + Create shift template ]
```

---

# 13. CREATE SHIFT TEMPLATE

Flow:

```text
Create shift template

Name
[ Morning Shift ]

Start
[ 06:00 ]

End
[ 14:00 ]

[ Cancel ] [ Save ]
```

Do NOT include Work Area in the Shift Template.

A template describes time.

Work Area is selected when applying the shift.

This allows:

Morning Shift → Warehouse 1

or:

Morning Shift → Warehouse 2.

---

# 14. TASK TEMPLATES

This is a CORE MVP management feature.

Manager must be able to create and manage Task Templates.

Create:

Settings → Task templates

Example:

```text
Task templates

Morning warehouse setup
3 tasks

Daily closing
4 tasks

Inventory check
2 tasks

[ + Create template ]
```

---

# 15. CREATE TASK TEMPLATE

Task templates may contain multiple tasks.

Example:

```text
Create task template

Template name
[ Morning warehouse setup ]

Tasks

1. Check equipment
2. Prepare packing stations
3. Check loading area

[ + Add task ]

[ Cancel ] [ Save template ]
```

Each task should have:

- name,
- task type.

Task types:

- Task,
- Goal.

For Goals optionally define:

- default target,
- default unit.

Example:

```text
Pack orders
Goal
Default target: 120
Unit: orders
```

---

# 16. EDIT TASK TEMPLATE

Manager can open an existing template and:

- rename it,
- add task,
- remove task,
- edit task,
- change task type,
- edit default target,
- edit unit.

Example:

```text
Morning warehouse setup

1. Check equipment
2. Prepare packing stations
3. Check loading area

[ + Add task ]

[ Save changes ]
```

---

# 17. APPLY TASK TEMPLATE

Task templates must be usable from Tasks & Goals.

Flow:

```text
Tasks & Goals

[ Apply template ]

Template
[ Morning warehouse setup ]

Date
[ August 24 ]

Team
[ Warehouse Team A ]

Work area
[ Warehouse 1 ]   ← optional

[ Apply template ]
```

The manager should then be able to review the resulting task assignments before confirming.

Do not immediately create dozens of assignments without confirmation.

---

# 18. TASK TEMPLATE + MULTIPLE EMPLOYEES

A template can be assigned to:

- individual employees,
- multiple selected employees,
- a Team.

Example:

```text
Assign template

Morning warehouse setup

Date
August 24

Employees
18 selected

or

Team
Warehouse Team A

[ Continue ]
```

Do not force the manager to manually select every employee when a Team is available.

---

# 19. TASK TEMPLATES AND AREAS

Work Area should NOT be permanently embedded into the Task Template.

A task template describes:

> What needs to be done.

Work Area describes:

> Where it needs to be done.

Therefore:

Task Template → Tasks

Assignment → Date + Employee/Team + optional Work Area

This allows the same template to be reused in:

Warehouse 1

or

Warehouse 2.

---

# 20. TASK CREATION

The existing Create Task / Goal flow must become genuinely interactive.

Do not create buttons that only close the modal.

When the manager creates a task:

```text
Create task

Task name
[ Clean Zone A ]

Type
[ Task ]

Date
[ August 24 ]

Employees
[ Select ]

Team
[ Optional ]

Work area
[ Optional ]

[ Cancel ] [ Create ]
```

For Goal:

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
...

[ Create ]
```

The prototype must visibly update after creation.

---

# 21. TASKS & GOALS — WEEK VIEW

The current product must support both:

**Day view**

and

**Week view**

Add:

```text
[ Week ] [ Day ]
```

Week navigation:

```text
← Previous week

August 24–30

Next week →
```

Provide:

**Today**

and a compact week picker.

---

# 22. TASK WEEK VIEW

The week view should make future planning possible.

Example:

```text
                 MON          TUE          WED          THU          FRI

Anna             Pack 120     Pack 120     Clean        Pack 120     Pack 120

John             Pack 100     Pack 100     Pack 100      OFF          Pack 100

Maria            Clean        Clean        OFF           Clean        Clean
```

The manager can click a cell to inspect or edit assignments.

The view must work for up to 40 employees.

---

# 23. WEEK PICKER

Both Schedule and Tasks & Goals should have a compact week/date picker.

Manager can:

- previous week,
- next week,
- select specific date,
- jump to specific week,
- return to Today.

This is important for monthly planning.

---

# 24. COPY DAY

Add a proper Copy Day workflow to Schedule.

Example:

Monday

[•••]

Actions:

- Copy day
- Clear day

After selecting Copy day:

```text
Copy Monday

To:
[ Tuesday ▼ ]

[ Cancel ] [ Copy ]
```

If the destination already contains shifts, require confirmation.

---

# 25. COPY PREVIOUS WEEK

Keep the existing Copy Previous Week functionality.

It must work for:

- current week,
- future week,
- any navigable week.

Example:

Viewing:

August 24–30

Action:

Copy previous week

Source:

August 17–23

Destination:

August 24–30

Do not silently overwrite existing shifts.

---

# 26. BULK OPERATIONS — CHANGE THE UX MODEL

Do NOT make bulk mode a separate isolated mode.

Use:

**Select → contextual actions appear**

Example:

```text
☑ Anna
☑ John
☑ Maria

3 selected

[ Apply shift ]
[ Assign task ]
[ Assign team ]
[ Clear ]
```

Selection should be available directly in:

- Schedule,
- Employees,
- Tasks & Goals.

---

# 27. BULK SCHEDULE

Selected employees:

```text
Anna
John
Maria
Peter
```

Action:

**Apply shift**

Choose:

Shift template:

Morning Shift

Time:

06:00–14:00

Work area:

Warehouse 1

Date:

August 24

[ Apply ]
```

This should update all selected employees.

---

# 28. BULK TASK

Selected employees:

18 employees

Action:

**Assign task**

Choose:

- task/template,
- date,
- optional Work Area,
- target if Goal.

Example:

```text
Task
Pack orders

Date
August 24

Target
120

Area
Warehouse 1

[ Assign ]
```

---

# 29. BULK BY TEAM

Team should be a first-class bulk operation.

Example:

```text
Team
Warehouse Team A

10 employees

[ Apply shift ]
[ Assign task ]
```

The manager should not have to manually select all 10 employees.

---

# 30. EMPLOYEE MANAGEMENT

Ensure all employee lifecycle flows are complete.

Manager can:

- invite,
- approve,
- edit,
- deactivate,
- reactivate,
- remove.

Employee editing must include Team.

Employee status must be visible.

---

# 31. EMPLOYEE INVITATION

Support:

Email invitation

OR

Organization code.

Organization code flow:

Employee enters code → sees organization → requests access → manager approves.

Do not automatically approve.

---

# 32. ONBOARDING

Improve onboarding to optionally include organization setup.

After creating organization:

```text
Set up your workspace

1. Add employees
2. Create teams
3. Add work areas
4. Create your first schedule
5. Assign today's work
```

Steps 2 and 3 should be optional.

The manager must be able to skip them.

Example:

[ Skip for now ]

Do not force configuration before the manager can start using Workday.

---

# 33. SETTINGS STRUCTURE

Use:

```text
Settings

Organization
├── Organization
├── Teams
└── Work areas

Templates
├── Shift templates
└── Task templates

Account
└── Profile

Billing
└── Subscription
```

This should be the canonical location for these management functions.

---

# 34. MOBILE MANAGER

Ensure all newly introduced settings and flows remain accessible on mobile.

Manager mobile should support:

- Teams,
- Work areas,
- Shift templates,
- Task templates,
- employee editing,
- schedule editing,
- task assignment.

Use appropriate mobile patterns:

- bottom sheets,
- full-screen forms,
- contextual menus.

Do not simply compress desktop tables.

---

# 35. EMPLOYEE TODAY

Keep the existing simplified Employee Today UX.

It should answer:

> What do I need to do today?

Do not add management functionality.

Do not expose Teams/Areas management to employees.

---

# 36. EMPLOYEE SCHEDULE

Employee can:

- navigate previous week,
- navigate current week,
- navigate future week,
- jump to week/date,
- return to Today.

Employee cannot modify schedule.

---

# 37. PROFILE

Both roles have:

- first name,
- last name,
- email,
- language,
- password,
- organization information where appropriate.

Support:

- edit,
- change password,
- change language,
- logout,
- delete account.

---

# 38. BILLING

Maintain existing pricing:

Monthly:

$10 / 10 employees
$20 / 20 employees
$30 / 40 employees

Yearly:

$100 / 10 employees
$200 / 20 employees
$300 / 40 employees

The Manager is NOT counted.

Maximum organization users:

11 / 21 / 41.

Trial:

14 days.

Do not display "No credit card required" because this has not yet been decided.

Stripe Customer Portal remains the subscription management destination.

---

# 39. IMPORTANT: FIX PROTOTYPE DATA CONSISTENCY

Ensure demo data respects the pricing limits.

Never show:

36 of 20 employees.

For example:

Workday 20:

16 / 20 employees

or:

Workday 40:

36 / 40 employees.

All screens must use consistent organization data.

---

# 40. IMPORTANT: NO HARDCODED MANAGEMENT OBJECTS

The following must not exist only as hardcoded demo data:

- Teams,
- Work areas,
- Shift templates,
- Task templates.

The prototype must demonstrate:

Create → Save → appears in list → can be edited → can be used elsewhere.

This is essential.

---

# 41. LOGICAL RELATIONSHIPS

The final UX should clearly represent:

Organization
→ Employees
→ Teams

Organization
→ Work Areas

Organization
→ Shift Templates

Organization
→ Task Templates

Schedule
→ Employee
→ Shift
→ Work Area
→ Date

Tasks
→ Employee / Team
→ Date
→ optional Work Area

This should be reflected consistently throughout the UI.

---

# 42. Do NOT create unnecessary relationships

Do NOT make:

- Employee permanently assigned to Work Area,
- Task Template permanently assigned to Work Area,
- Shift Template permanently assigned to Work Area,
- Team nested under Work Area.

Keep these concepts independent.

---

# 43. Complete UX flow audit

After making the changes, verify that the prototype supports every flow below:

## Organization

Create organization
→ organization code
→ organization settings

## Teams

Settings
→ Teams
→ Create Team
→ Edit Team
→ Assign employees
→ Remove employees
→ Delete Team

## Work Areas

Settings
→ Work areas
→ Create
→ Edit
→ Deactivate
→ Reactivate

## Shift Templates

Settings
→ Shift templates
→ Create
→ Edit
→ Deactivate
→ Reactivate

## Task Templates

Settings
→ Task templates
→ Create
→ Add multiple tasks
→ Edit
→ Remove task
→ Save
→ Apply template

## Employees

Employees
→ Invite
→ Approve
→ Edit
→ Assign Team
→ Deactivate
→ Reactivate
→ Remove

## Schedule

Schedule
→ Previous week
→ Next week
→ Today
→ Week picker
→ Edit shift
→ Select employees
→ Bulk shift
→ Apply Team
→ Copy day
→ Copy previous week
→ Future planning

## Tasks

Tasks & Goals
→ Day view
→ Week view
→ Future date
→ Future week
→ Create Task
→ Create Goal
→ Bulk assignment
→ Apply template
→ Edit progress

## Employee

Today
→ Shift
→ Task
→ Goal
→ Update progress

Schedule
→ Previous week
→ Next week
→ Future week

History
→ Day details

Profile
→ Edit

## Billing

Settings
→ Billing
→ Current plan
→ Monthly / Yearly
→ Trial
→ Manage subscription

---

# 44. Final product model

After this refinement, Workday should have a very clear conceptual model:

## WHO

Teams
Employees

## WHERE

Work Areas

## WHEN

Schedule
Dates
Weeks

## WHAT

Tasks
Goals

## REPEAT

Shift Templates
Task Templates

## RESULT

Progress

This is the foundation of the MVP.

---

# 45. Final UX principle

The product must remain simple.

Do not add features because they are common in workforce-management software.

Every feature must reduce the manager's operational workload.

The ideal manager workflow is:

SET UP ONCE

→ Teams
→ Work Areas
→ Shift Templates
→ Task Templates

THEN REUSE

→ Copy week
→ Copy day
→ Apply shift template
→ Apply task template
→ Bulk assign by Team

The ideal employee workflow is:

OPEN

→ SEE TODAY

→ DO WORK

→ UPDATE PROGRESS

The manager should be able to prepare a month of work through:

COPY → ADJUST → COPY → ADJUST

rather than manually recreating the same work every week.

---

# 46. Final acceptance criteria

Do not consider this refinement complete unless:

1. Manager can create a Team.
2. Manager can assign employees to a Team.
3. Manager can create a Work Area.
4. Manager can select a Work Area when creating/editing a shift.
5. Manager can create a Shift Template.
6. Manager can use the Shift Template in Schedule.
7. Manager can create a Task Template.
8. Task Template can contain multiple tasks.
9. Manager can edit Task Template.
10. Manager can apply Task Template to a Team or selected employees.
11. Manager can plan Tasks in future weeks.
12. Tasks & Goals supports Week and Day views.
13. Schedule supports previous/next week and week picker.
14. Copy previous week works for future weeks.
15. Copy day works.
16. Bulk actions work through selection + contextual actions.
17. Team can be used for bulk scheduling and task assignment.
18. Employee can be assigned to a Team.
19. Employee can edit their profile.
20. Manager can manage employee lifecycle.
21. Manager can access all management configuration through Settings.
22. Mobile manager has usable versions of these workflows.
23. Demo data is consistent with pricing limits.
24. No Department concept remains in the MVP.
25. No hardcoded Team/Area/Template is presented as if it were dynamically manageable.
26. All primary actions visibly update the prototype state.

Do not add anything beyond this scope.

This is the final UX logic refinement before moving to product architecture and implementation.
```