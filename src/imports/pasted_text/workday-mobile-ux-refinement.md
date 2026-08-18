
# Workday — Mobile UX Architecture & Full Product Refinement v0.6

This is a UX architecture refinement of the EXISTING Workday prototype.

Do NOT rebuild the product from scratch.

Do NOT add new product functionality.

The purpose of this iteration is different from previous iterations:

The current product contains responsive/mobile implementations, but several screens still behave like desktop interfaces that have been compressed into a smaller viewport.

Fix this.

The mobile experience must be designed as a FIRST-CLASS product experience.

IMPORTANT:

Do NOT simply reduce desktop layouts.

Use different information architecture and interaction patterns where necessary.

The core principle is:

DESKTOP
→ information density

MOBILE
→ progressive disclosure

The product should feel intentional at:

- 360px
- 375px
- 390px
- 430px
- 768px
- 1024px
- desktop widths

---

# 1. RESPONSIVE DESIGN PRINCIPLE

Use these principles throughout the entire application.

## Desktop

Optimize for:

- information density,
- tables,
- grids,
- bulk operations,
- side navigation,
- multi-column layouts.

## Mobile

Optimize for:

- one-handed use,
- scanning,
- large touch targets,
- short interaction paths,
- progressive disclosure,
- single-column layouts,
- contextual actions,
- bottom sheets,
- full-screen forms.

Never assume that a desktop table should simply become horizontally scrollable on mobile.

Horizontal scrolling is acceptable for genuinely tabular data, but it must NOT be the primary interaction model for Schedule or Tasks on mobile.

---

# 2. MANAGER MOBILE NAVIGATION

Keep the desktop sidebar on desktop.

On mobile:

DO NOT show a permanent sidebar.

Use:

Top bar:

```text
┌─────────────────────────────┐
│ ☰  Workday          Avatar  │
└─────────────────────────────┘
Hamburger opens an off-canvas navigation drawer.
Drawer:
Workday

WORK

Dashboard
Employees
Schedule
Tasks & Goals

MANAGE

Settings

────────────────

Alex Manager
ABC Logistics

Sign out
Requirements:
	•	full-height drawer,
	•	approximately 80% viewport width, max 320px,
	•	never wider than the viewport minus 24px,
	•	backdrop,
	•	close button,
	•	click backdrop closes,
	•	Escape closes,
	•	body scroll lock,
	•	focus management,
	•	keyboard accessibility,
	•	screen-reader labels.
When a navigation item is selected:
	1	change page,
	2	close drawer,
	3	restore focus appropriately.
Do NOT create a second bottom navigation for Manager.

3. MANAGER MOBILE TOP BAR
Top bar should:
	•	remain fixed/sticky,
	•	have minimum 44px touch targets,
	•	use safe-area top padding where required,
	•	show Workday branding,
	•	show hamburger,
	•	show manager avatar.
The avatar should lead to Manager Settings/Profile, not immediately sign the user out.
Do not make the avatar an unexpected logout action.

4. MANAGER DASHBOARD — MOBILE
Desktop dashboard can retain its current KPI layout.
Mobile MUST use a single-column layout.
Do not use two KPI cards side-by-side below 768px.
Example:
Tuesday, August 18

Good morning, Alex

36
people working today
4 off

Tasks today

184 / 240 done
──────────────

Goal progress

76%
──────────────

Needs attention

3 employees have incomplete tasks
View →

2 employees need approval
View →
The dashboard should prioritize:
	1	people working today,
	2	today's progress,
	3	needs attention.
Recent progress can be shown below.
Avoid decorative cards.

5. MANAGER MOBILE — EMPLOYEES
Desktop may use a table.
Mobile MUST use a list.
Example:
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

Maria Nowak
No team
Pending
Tapping an employee opens a detail/edit screen or bottom sheet.
Actions:
	•	Edit
	•	Assign team
	•	Deactivate
	•	Reactivate
	•	Remove
Do not attempt to squeeze the desktop table into mobile.

6. MANAGER MOBILE — EMPLOYEE DETAIL
Use a dedicated mobile detail screen.
Example:
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
Destructive actions should be separated visually.

7. MANAGER MOBILE — SCHEDULE
THIS IS THE MOST IMPORTANT MOBILE CHANGE.
The current desktop Schedule grid must NOT be the primary mobile interface.
Desktop:
Employee × Weekday grid.
Mobile:
Date-first operational view.
Use:
Schedule

August 24–30

‹        Week picker        ›
Then a horizontally scrollable day selector:
MON 24
TUE 25
WED 26
THU 27
FRI 28
SAT 29
SUN 30
Below:
MONDAY · AUG 24

[ Search employees ]

[ All teams ▼ ]

Anna Kowalska
06:00–14:00
Warehouse 1

John Smith
14:00–22:00
Warehouse 1

Maria Nowak
OFF

Peter Brown
06:00–14:00
Warehouse 2
Each employee row can be tapped.

8. MOBILE SCHEDULE — SHIFT EDITING
Tapping a shift opens a bottom sheet or full-screen editor.
Example:
Edit shift

Anna Kowalska

Date
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

[ Remove shift ]
Use large touch-friendly controls.
Do not use tiny table cells as editing targets.

9. MOBILE SCHEDULE — ADD SHIFT
Use:
+ Add shift
Then:
Employee
[ Anna Kowalska ▼ ]

Date
Monday, August 24

Shift
[ Morning Shift ▼ ]

Work area
[ Warehouse 1 ▼ ]

[ Add shift ]

10. MOBILE SCHEDULE — BULK ACTIONS
Do NOT attempt to reproduce desktop checkbox selection across a 40-row × 7-column table.
Instead:
Manager selects employees from the current day list.
Example:
Monday · Aug 24

☑ Anna
☑ John
☑ Maria

3 selected

[ Apply shift ]
[ Clear shift ]
Then:
Apply shift

Morning Shift
06:00–14:00

Work area
Warehouse 1

[ Apply ]

11. MOBILE SCHEDULE — TEAM BULK ACTION
Provide:
Filter:
[ Warehouse Team A ▼ ]
Then allow:
Select all visible employees
and:
Apply shift
This is the mobile equivalent of desktop bulk operations.

12. MOBILE SCHEDULE — COPY PREVIOUS WEEK
Keep the existing Copy Previous Week function.
On mobile make it a prominent action in a compact overflow menu:
•••

Copy previous week
Copy day
Clear day
Do not permanently consume valuable horizontal space with a large button.

13. MOBILE SCHEDULE — COPY DAY
Same:
•••
Copy day
Then:
Copy Monday

To:
[ Tuesday ▼ ]

[ Copy ]
Use bottom sheet/full-screen dialog.

14. MOBILE SCHEDULE — WEEK PLANNING
The manager still needs to plan an entire month.
Mobile workflow:
Week selector → select week → select day → manage employees → Copy previous week → adjust exceptions → next week.
Do NOT attempt to display the entire month as a dense grid on mobile.
The mobile experience should optimize for editing, not overview.

15. DESKTOP SCHEDULE
Keep the existing desktop operational grid.
Desktop should continue to support:
	•	40 employees,
	•	sticky employee column,
	•	7-day grid,
	•	search,
	•	team filter,
	•	bulk selection,
	•	copy week,
	•	copy day,
	•	shift templates.
Do not replace the desktop experience with the mobile design.

16. MANAGER MOBILE — TASKS & GOALS
Apply the same principle.
Desktop can use the current table/grid.
Mobile MUST NOT use the desktop multi-column table as the primary interface.
Use:
Tasks & Goals

August 24–30

[ Week ] [ Day ]

‹        week navigation        ›
Then day selector:
MON 24
TUE 25
WED 26
THU 27
FRI 28
Day view:
Monday · August 24

Anna Kowalska
Pack orders
83 / 120

John Smith
Pack orders
91 / 120

Maria Nowak
Clean Zone A
Completed

17. MOBILE TASK DETAIL
Tapping an assignment opens:
Pack orders

Anna Kowalska

83 / 120

Assigned:
Monday, August 24

Work area:
Warehouse 1

[ Edit progress ]
Manager can edit progress.

18. MOBILE TASK CREATION
Use a full-screen form or bottom sheet.
Example:
Create task

Task name
[ Clean Zone A ]

Type
Task / Goal

Date
August 24

Employees
[ Select ]

Team
[ Optional ]

Work area
[ Optional ]

[ Create task ]
For Goal:
Target Unit
must be clearly visible.

19. MOBILE APPLY TASK TEMPLATE
Use:
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
Then review:
18 employees
3 tasks each

[ Confirm ]
Do not immediately create many assignments without a review step.

20. MOBILE SETTINGS
Settings must use a two-level navigation model.
Level 1:
← Manager

Settings

Organization
Organization
Teams
Work areas

Templates
Shift templates
Task templates

Account
Profile

Billing
Subscription
Level 2:
← Settings

Teams
Never display a permanent settings sidebar on mobile.

21. MOBILE TEAM MANAGEMENT
Use list-based management.
Example:
Teams

Warehouse Team A
10 employees

Warehouse Team B
10 employees

Logistics Team
7 employees

[ + New team ]
Tap a team:
← Teams

Logistics Team

7 employees

Anna
John
Maria

[ Add employees ]

[ Rename ]

[ Delete ]

22. MOBILE WORK AREA MANAGEMENT
Same pattern.
Work areas

Warehouse 1
Active

Warehouse 2
Active

Loading Dock
Inactive

[ + New area ]
Tap area to edit/deactivate.

23. MOBILE SHIFT TEMPLATES
Use:
Shift templates

Morning Shift
06:00–14:00

Afternoon Shift
14:00–22:00

Night Shift
22:00–06:00

[ + New template ]
Creation/editing uses a full-screen form or bottom sheet.

24. MOBILE TASK TEMPLATES
Use:
Task templates

Morning warehouse setup
3 tasks

Daily closing
4 tasks

[ + New template ]
Opening a template:
Morning warehouse setup

1. Check equipment
2. Prepare packing stations
3. Check loading area

[ Add task ]

[ Edit ]
Creation/editing must remain easy on a 360px screen.
Do not use wide desktop modal layouts.

25. MOBILE PROFILE
All profile forms must use a single column.
Do NOT use:
First name | Last name
below 640px.
Use:
First name
[ Anna ]

Last name
[ Kowalska ]

Email
[ anna@example.com ]

Language
[ English ▼ ]

[ Save changes ]

26. MOBILE BILLING
Billing should be vertically stacked.
Do NOT use three pricing columns on mobile.
Use:
Subscription

Current plan
Workday 40

36 / 40 employees

Billing
[ Monthly ] [ Yearly ]

Workday 10
$10 / month

Workday 20
$20 / month

Workday 40
$30 / month

[ Manage subscription ]
Plans can be stacked cards or a compact selector.

27. EMPLOYEE MOBILE — KEEP MOBILE-FIRST
Employee mobile navigation remains:
Today Schedule History Profile
Use bottom navigation.
Add appropriate iOS safe-area support.
The bottom navigation must not cover page content.
Use sufficient bottom padding.
Touch targets should be at least 44×44px.

28. EMPLOYEE TODAY
Keep the current conceptual structure.
But simplify visual hierarchy.
Prefer:
Today

Tuesday, August 18

YOUR SHIFT

06:00–14:00
Warehouse 1

YOUR WORK

Pack orders
83 / 120
[ Update progress ]

Clean Zone A
Not completed
[ Mark as done ]

Prepare workstation
✓ Completed
Do not overuse cards.
Do not make the Task/Goal technical type the primary information.
The employee cares about:
WHAT HOW MUCH WHERE DONE / NOT DONE

29. EMPLOYEE SCHEDULE
Mobile should remain day-oriented.
Week selector:
‹ August 24–30 ›
Day selector:
MON TUE WED THU FRI SAT SUN
Selected day:
Monday · August 24

06:00–14:00

Warehouse 1
No dense table.

30. EMPLOYEE HISTORY
Keep the current expandable weekly structure.
But ensure:
	•	one-column layout,
	•	comfortable touch targets,
	•	sufficient spacing,
	•	readable progress indicators,
	•	no horizontal overflow.

31. EMPLOYEE DESKTOP WEB
IMPORTANT:
The Employee application MUST NOT remain permanently constrained to approximately 384px width.
The current mobile max-width shell should only apply to mobile.
Create a responsive Employee desktop layout.
Desktop can use:
	•	centered content column,
	•	max-width around 900–1100px,
	•	top navigation or compact sidebar,
	•	more whitespace,
	•	wider task/progress presentation.
Do not turn Employee into a Manager dashboard.
The Employee desktop experience should remain simple.

32. EMPLOYEE DESKTOP NAVIGATION
Desktop Employee can use:
Workday

Today
Schedule
History
Profile

                    Anna Kowalska
Use a simple horizontal/top navigation or compact sidebar.
Do NOT reuse the Manager navigation.
Employee navigation should remain minimal.

33. AUTH MOBILE
Authentication must be genuinely mobile-first.
At widths below 640px:
	•	single-column forms,
	•	no two-column first/last name fields,
	•	comfortable horizontal padding,
	•	large primary CTA,
	•	no unnecessary decorative content,
	•	content should fit without awkward scrolling.
Desktop can retain the split marketing panel.
Mobile should remove the marketing panel completely.

34. ONBOARDING MOBILE
Manager and Employee onboarding must use:
	•	single-column forms,
	•	full-width CTA,
	•	comfortable spacing,
	•	clear progress,
	•	no desktop-like centered panels with excessive empty space.
Organization setup:
Create your organization

Organization name

Country

Default language

[ Create organization ]
The resulting organization code should be easy to read and copy.

35. MODALS ON MOBILE
Do NOT use desktop-width centered modals for complex mobile forms.
Rules:
Simple confirmation
Centered dialog.
Short form
Bottom sheet.
Complex form
Full-screen modal/page.
Examples of full-screen mobile forms:
	•	Edit employee,
	•	Create task template,
	•	Edit task template,
	•	Create schedule,
	•	Create shift template.

36. TOUCH TARGETS
All interactive controls should have approximately:
44 × 44px minimum touch target
even if the visual icon itself is smaller.
Do not use tiny icon-only buttons without adequate hit areas.
This applies especially to:
	•	calendar menus,
	•	copy day,
	•	edit,
	•	delete,
	•	navigation,
	•	checkboxes,
	•	close buttons.

37. MOBILE TYPOGRAPHY
At 360px width:
	•	no critical text should wrap unexpectedly,
	•	no headings should collide with controls,
	•	buttons should not truncate,
	•	labels should remain readable.
Avoid overly large typography.
Employee Today can use large numbers for shift time, but manager mobile should remain compact.

38. MOBILE OVERFLOW AUDIT
At:
360px 375px 390px 430px
verify:
	•	no body horizontal scrolling,
	•	no clipped buttons,
	•	no clipped dialogs,
	•	no table forcing page-wide overflow,
	•	no fixed navigation covering content,
	•	no drawer extending beyond viewport,
	•	no content hidden behind top/bottom navigation.
Horizontal scrolling may exist only inside intentionally scrollable components.
It must never be accidental.

39. RESPONSIVE BREAKPOINT STRATEGY
Use:
< 640px
Phone layout.
640–767px
Large phone / small tablet layout.
768–1023px
Tablet / compact layout.
≥ 1024px
Desktop layout.
Do not depend on one breakpoint to simply hide/show the desktop sidebar.
Components should adapt their composition.

40. ACCESSIBILITY
Target WCAG 2.1 AA.
Verify:
	•	44px touch targets,
	•	keyboard navigation,
	•	focus states,
	•	focus order,
	•	screen-reader labels,
	•	semantic navigation,
	•	accessible dialogs,
	•	accessible drawers,
	•	accessible bottom sheets,
	•	accessible tables,
	•	sufficient contrast,
	•	status not communicated by color alone.
Drawer:
	•	focus moves into drawer,
	•	Escape closes,
	•	focus returns to hamburger,
	•	background is inert.
Dialogs:
	•	focus moves into dialog,
	•	Escape closes where appropriate,
	•	focus returns to trigger.

41. FULL PRODUCT CONSISTENCY AUDIT
After redesigning mobile, inspect the entire product.
Verify:
Manager
Authentication → Organization → Onboarding → Dashboard → Employees → Teams → Work areas → Schedule → Shift templates → Tasks & Goals → Task templates → Progress → Profile → Billing
Employee
Authentication → Join organization → Approval → Today → Schedule → History → Profile
Every object must have a logical lifecycle:
CREATE → VIEW → EDIT → USE → DEACTIVATE/REMOVE where appropriate

42. CORE RELATIONSHIPS
Keep:
Employee → Team
Shift → Work Area
Shift → Employee
Task Assignment → Employee
Task Assignment → Date
Task Assignment → optional Work Area
Task Template → Tasks/Goals
Shift Template → Time
Do NOT introduce:
Employee → permanent Work Area
Task Template → permanent Work Area
Shift Template → permanent Work Area
Team → Work Area hierarchy
Department.

43. DEMO DATA
Use:
August 18, 2026
as Today.
Keep all screens consistent.
Pricing:
$10 / 10 employees $20 / 20 employees $30 / 40 employees
Annual:
$100 / 10 $200 / 20 $300 / 40
Manager is not counted.
Do not show impossible employee counts.
Do not display "No credit card required".
Trial:
14 days.

44. VISUAL LANGUAGE
Keep the existing restrained visual language.
Do not introduce:
	•	gradients,
	•	excessive shadows,
	•	glassmorphism,
	•	decorative illustrations,
	•	excessive cards,
	•	generic SaaS KPI dashboards.
The mobile UI should feel:
	•	calm,
	•	clear,
	•	premium,
	•	practical,
	•	fast.
Use typography and spacing to create hierarchy.

45. FINAL MOBILE DESIGN TEST
Before considering the refinement complete, mentally test these scenarios at 390px:
Scenario 1
Manager opens app.
Can they:
Open menu → Schedule → choose next week → choose Monday → find Anna → edit shift → choose Warehouse 1 → save?
Scenario 2
Manager:
Tasks → next week → Monday → Apply task template → Team A → Warehouse 1 → review → confirm?
Scenario 3
Manager:
Employees → search Anna → edit → change Team → save?
Scenario 4
Employee:
Today → sees shift → sees tasks → updates goal → sees updated progress?
Scenario 5
Employee:
Schedule → next week → Tuesday → sees shift?
If any of these flows require:
	•	horizontal desktop tables,
	•	tiny controls,
	•	hidden content,
	•	accidental scrolling,
	•	desktop sidebar,
	•	awkward modal overflow,
redesign the mobile interaction.

46. FINAL RULE
Do NOT make mobile a smaller desktop.
Make mobile a simpler way of doing the same job.
Desktop:
SEE MORE → ACT IN BULK
Mobile:
CHOOSE → ACT → RETURN
Desktop Schedule:
Employee × Week
Mobile Schedule:
Day → Employee → Shift
Desktop Tasks:
Employee × Tasks × Progress
Mobile Tasks:
Day → Employee → Task
Desktop Settings:
Sidebar + content
Mobile Settings:
List → Detail
This principle should guide every responsive decision in the prototype.
After completing this refinement, treat the UX as approaching final MVP quality.
Do not add new product features outside this scope.