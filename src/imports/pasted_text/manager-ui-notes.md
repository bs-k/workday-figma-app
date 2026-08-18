
1. Sidebar managera na mobile — obecne rozwiązanie jest strukturalnie błędne
Problem nie polega na tym, że sidebar „nie jest wystarczająco responsywny”.
Obecnie ManagerApp ma:
h-screen flex
├── ManagerSidebar  w-56 flex-shrink-0
└── main flex-1
a ManagerSidebar zawsze renderuje aside w-56.
Nie ma:
	•	breakpointu ukrywającego sidebar,
	•	hamburgera,
	•	drawer,
	•	mobile navigation,
	•	sposobu otwierania/zamykania menu.
Dlatego na mobile aplikacja nadal próbuje traktować sidebar jak stałą kolumnę desktopową.
Moja rekomendacja
Nie róbmy bottom navigation dla managera.
Manager ma za dużo sekcji i hierarchy:
Dashboard
Employees
Schedule
Tasks & Goals
Settings
Najlepsze będzie:
Desktop
Stały sidebar:
┌──────────────┬────────────────────────────┐
│ Workday      │                            │
│              │                            │
│ Dashboard    │                            │
│ Employees    │                            │
│ Schedule     │                            │
│ Tasks        │                            │
│ Settings     │                            │
│              │                            │
│ Alex Manager │                            │
└──────────────┴────────────────────────────┘
Mobile
Top bar:
┌─────────────────────────────┐
│ ☰   Workday        Profile │
└─────────────────────────────┘
Kliknięcie ☰:
┌─────────────────────┐
│ Workday          ×  │
│                     │
│ Dashboard           │
│ Employees           │
│ Schedule            │
│ Tasks & Goals       │
│ Settings            │
│                     │
│                     │
│ Alex Manager        │
│ Sign out            │
└─────────────────────┘
Czyli desktop sidebar → mobile off-canvas drawer.
To jest spójne, proste i nie zabiera miejsca z głównej aplikacji.
Ważne zachowanie
Po kliknięciu:
Schedule
drawer powinien:
	1	zmienić tab,
	2	zamknąć się,
	3	pokazać Schedule.
Dodatkowo:
	•	klik poza drawerem → zamknij,
	•	Escape → zamknij,
	•	focus trap,
	•	aria-label,
	•	widoczny focus,
	•	drawer nie może blokować scrollowania pod spodem.

2. Settings ma drugi sidebar i ten sam problem
To jest rzecz, której wcześniej nie dopilnowaliśmy.
ManagerSettings ma:
Settings sidebar
├── Organization
├── Teams
├── Work areas
├── Shift templates
├── Task templates
├── Profile
└── Subscription
Na desktopie OK.
Na mobile mamy potencjalnie:
Manager mobile
  ↓
Settings
  ↓
48px/192px settings sidebar
  ↓
content
Czyli drugi sidebar robi dokładnie ten sam problem.
Na mobile Settings powinno być:
Settings

Organization
Teams
Work areas
Shift templates
Task templates
Profile
Subscription
jako lista / menu, a po wyborze:
← Settings

Teams
...
Czyli na mobile Settings sidebar zamienia się w ekran wyboru sekcji.
Nie próbujemy upychać dwóch sidebarów.

3. Jest jeszcze ważniejszy problem: Settings → Teams/Areas/Templates jest już obecne
To akurat dobra wiadomość.
W Prompt3 mamy już:
	•	Teams,
	•	Work areas,
	•	Shift templates,
	•	Task templates.
Czyli ostatni prompt zrobił sporą część pracy.
Natomiast musimy dopilnować jednej zasady:
każdy obiekt, który można stworzyć, musi potem być możliwy do użycia w głównych workflow.
Czyli:
Team
Settings → Teams → Create
↓
Employees → assign team
↓
Schedule → filter/bulk by team
↓
Tasks → bulk assign by team
Work Area
Settings → Work areas → Create
↓
Schedule → shift → Work area
Shift Template
Settings → Shift templates → Create
↓
Schedule → Apply template
Task Template
Settings → Task templates → Create
↓
Tasks → Apply template
To jest nasz logic chain.

4. Task Template — teraz wygląda już dobrze koncepcyjnie
Mamy możliwość tworzenia template'u z wieloma taskami.
To jest dokładnie to, czego chcieliśmy.
Ale bardzo ważne jest, żeby Figma Make nie zrobiła z template'u tylko:
„saved task name”.
Template musi być:
Morning warehouse setup

1. Check equipment
2. Prepare packing stations
3. Check loading area
czyli pakietem pracy.

5. Work Area — dobra decyzja architektoniczna
Po przejrzeniu całości podtrzymuję:
Area nie powinno być właściwością Employee.
Pracownik może:
Monday
Warehouse 1

Tuesday
Warehouse 2
Dlatego:
Employee → Team

Shift → Work Area
jest właściwym modelem.

6. Team — również właściwie
Team powinien być:
grupą ludzi, których często operacyjnie traktujemy razem.
Nie:
miejscem.
Nie:
działem HR.
Dlatego:
Team A
10 employees

Logistics Team
7 employees
jest OK.

7. Jeden problem, który nadal widzę: daty demonstracyjne
W data.ts:
BASE_MONDAY = August 17, 2026
TODAY = 2026-08-17
Tymczasem aktualna data to 18 sierpnia 2026.
To nie jest duży problem w prototypie, ale przy kolejnej wersji należy powiedzieć Figma Make:
Use August 18, 2026 as the demo "Today" date.
Inaczej będziemy później mieli niepotrzebny bałagan w testach.

8. Nadal istnieje problem z dynamicznym Tailwindem
To już jest kwestia techniczna, ale warto ją odnotować przed przekazaniem projektu Qwenowi.
Mamy np.:
w-${size}
h-${size}
w Logo.
To nie jest dobry wzorzec dla Tailwind CSS.
Powinno być jawne mapowanie rozmiarów.
Nie ma sensu poprawiać tego teraz w Figma Make.
To będzie element późniejszego code review Qwena.

9. Najważniejszy brak funkcjonalny, który nadal bym sprawdził
Po zamknięciu UX chcę, żeby wszystkie główne akcje naprawdę zmieniały stan prototypu:
Create Team
→ Team appears

Create Area
→ Area appears

Create Shift Template
→ Template appears

Create Task Template
→ Template appears

Create Task
→ Task appears

Assign Task
→ Assignment appears

Update Progress
→ Manager sees new progress

Copy Week
→ destination week changes
Nie chcemy już więcej ekranów, które wyglądają jak funkcja, ale są tylko modalem demonstracyjnym.

10. Nie dodawałbym już nowych funkcji
Po tym review powiedziałbym:
UX scope = zamykamy.
Nie dodajemy:
	•	RCP,
	•	leave,
	•	notifications,
	•	chat,
	•	gamification,
	•	AI,
	•	payroll,
	•	departments,
	•	automatycznego planowania.
Mamy już wystarczająco dużo.

Prompt v0.5 — ostatni refinement
Poniżej daję Ci jeden prompt, który obejmuje zarówno naprawę mobile sidebar, jak i ostatni audyt logiczny.
# Workday — Final UX Refinement v0.5
## Mobile Navigation + Full Workflow Consistency

Refine the EXISTING Workday prototype.

Do NOT rebuild the product.

Do NOT introduce new product features outside this specification.

This is the FINAL UX refinement before the product UX is considered ready for implementation.

The main purpose of this iteration is:

1. Fix Manager mobile navigation.
2. Fix Settings mobile navigation.
3. Verify all logical product workflows.
4. Ensure every configurable object can actually be used in the core workflows.
5. Fix prototype inconsistencies.
6. Keep the current visual direction.

Do not redesign screens that already work well.

---

# 1. MANAGER MOBILE NAVIGATION — CRITICAL

The current Manager sidebar is a desktop-only layout and does not work correctly on mobile.

Fix this structurally.

## Desktop

Keep the existing persistent left sidebar.

It contains:

- Dashboard
- Employees
- Schedule
- Tasks & Goals
- Settings

The sidebar remains visible on desktop.

## Mobile

DO NOT display the desktop sidebar as a permanent 224px/14rem column.

Instead, transform the Manager navigation into:

### Mobile top bar

```text
┌──────────────────────────────────┐
│ ☰   Workday              Avatar │
└──────────────────────────────────┘
The top bar must remain visible at the top of the manager application on mobile.
It should be compact and consume minimal vertical space.
The main page content must use the full available mobile width.

2. MOBILE NAVIGATION DRAWER
When the manager taps the hamburger button:
Open a left-side off-canvas navigation drawer.
Example:
┌──────────────────────┐
│ Workday           ×  │
│                      │
│ Dashboard            │
│ Employees            │
│ Schedule             │
│ Tasks & Goals        │
│ Settings             │
│                      │
│                      │
│ Alex Manager         │
│ ABC Logistics        │
│                      │
│ Sign out             │
└──────────────────────┘
Requirements:
	•	drawer slides in from the left,
	•	drawer overlays the current page,
	•	add a translucent backdrop,
	•	clicking backdrop closes drawer,
	•	close button closes drawer,
	•	Escape closes drawer,
	•	selecting a navigation item changes the active tab and closes drawer,
	•	prevent background scrolling while drawer is open,
	•	maintain visible focus,
	•	keyboard accessible,
	•	screen-reader accessible.
Use appropriate ARIA semantics:
	•	navigation,
	•	dialog/drawer,
	•	button labels,
	•	current page.
Do not create a second bottom navigation for Manager.
The mobile manager should use ONE primary navigation mechanism:
top bar + navigation drawer.

3. MANAGER MOBILE HEADER
The mobile top bar should show:
Left:
hamburger button
Center/left:
Workday logo/name
Right:
manager avatar/profile shortcut
Do not show the entire desktop sidebar.
Do not show large page headers inside the top bar.
The current page content should still contain its own page title.

4. MOBILE MANAGER CONTENT
All Manager screens must use the full mobile viewport width.
Verify:
	•	Dashboard
	•	Employees
	•	Schedule
	•	Tasks & Goals
	•	Settings
No screen should retain a permanent desktop sidebar.
No content should be hidden behind the navigation.
No horizontal page overflow should be caused by the desktop sidebar.

5. SETTINGS MOBILE NAVIGATION — CRITICAL
Settings currently contains a second navigation sidebar:
Organization
	•	Organization
	•	Teams
	•	Work areas
Templates
	•	Shift templates
	•	Task templates
Account
	•	Profile
Billing
	•	Subscription
This is appropriate on desktop.
On mobile, DO NOT display this as a second permanent sidebar.
Instead use a mobile Settings index screen.
Example:
← Back

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
When the user selects a section:
← Settings

Teams

...
The user should be able to return to the Settings index.
Use the same approach for all Settings sections.

6. MOBILE SETTINGS BEHAVIOR
On mobile:
Manager navigation drawer → Settings → Settings index → selected Settings section
Do not create nested permanent sidebars.
The navigation hierarchy should remain understandable.

7. RESPONSIVE MANAGER SCHEDULE
The Schedule must remain usable on mobile.
Do not simply shrink the desktop spreadsheet.
Desktop:
employee × days grid.
Mobile:
use a mobile-oriented representation.
Example:
Monday, August 24

Anna
06:00–14:00
Warehouse 1

John
14:00–22:00
Warehouse 1

Maria
OFF

[ + Add shift ]
Provide:
	•	Day view
	•	Week view where practical
	•	previous week
	•	next week
	•	Today
	•	week picker
The manager must be able to edit shifts on mobile.
Use bottom sheets or full-screen mobile forms for shift editing.

8. MOBILE MANAGER TASKS
Tasks & Goals must also work on mobile.
Provide:
	•	Day / Week switch,
	•	previous/next navigation,
	•	future date navigation,
	•	task creation,
	•	goal creation,
	•	template application,
	•	employee/team selection,
	•	progress editing.
Do not require the desktop grid to fit horizontally into the mobile viewport.

9. MOBILE MANAGER EMPLOYEES
Employee management must work on mobile.
Use a list instead of a dense desktop table.
Example:
Anna Kowalska
Logistics Team
Active
06:00–14:00

John Smith
Warehouse Team A
Active
14:00–22:00
Selecting an employee opens their details.
Actions:
	•	Edit
	•	Assign team
	•	Deactivate
	•	Reactivate
	•	Remove
Invite employee must remain easily accessible.

10. FULL PRODUCT LOGICAL MODEL
The final prototype must consistently represent:
Organization
contains:
	•	Employees
	•	Teams
	•	Work Areas
	•	Shift Templates
	•	Task Templates
Employee
has:
	•	Profile
	•	Team
	•	Status
Shift
has:
	•	Employee
	•	Date
	•	Start
	•	End
	•	Work Area
	•	optional Shift Template
	•	optional note
Task Template
contains:
	•	multiple Tasks / Goals
Task Assignment
has:
	•	Employee or Team
	•	Date
	•	Task / Goal
	•	optional Work Area
	•	progress/status

11. TEAM WORKFLOW
Verify this complete workflow:
Settings → Teams → Create Team → Team appears in list → Open Team → Add employees → Save
Then verify the Team is immediately usable in:
	•	Employees filtering,
	•	Schedule filtering,
	•	Schedule bulk assignment,
	•	Tasks & Goals filtering,
	•	Task bulk assignment,
	•	Task Template application.
A Team must not be merely a label.
It must be a real operational grouping.

12. WORK AREA WORKFLOW
Verify:
Settings → Work areas → Create Work Area → Work Area appears in list
Then:
Schedule → Create/Edit Shift → Work Area selector → Select Warehouse 1 → Save
The selected Work Area must be visible in the shift.
Work Areas must be usable for future shifts.
Deactivating a Work Area must preserve historical references but prevent new future assignments.

13. SHIFT TEMPLATE WORKFLOW
Verify:
Settings → Shift templates → Create template → Save → Template appears
Then:
Schedule → select employee(s) → Apply shift template → choose Work Area → Apply
Important:
A Shift Template defines TIME.
A Shift Template must NOT permanently define a Work Area.
Example:
Morning Shift 06:00–14:00
can be used with:
Warehouse 1
or:
Warehouse 2.

14. TASK TEMPLATE WORKFLOW
Verify:
Settings → Task templates → Create template
Template can contain multiple items.
Example:
Morning warehouse setup
	1	Check equipment
	2	Prepare packing stations
	3	Check loading area
Save.
Then:
Tasks & Goals → Apply template → choose date → choose employees or Team → optional Work Area → review → confirm
The resulting assignments must appear in Tasks & Goals.

15. TASK TEMPLATE EDITING
Manager must be able to:
	•	rename template,
	•	add item,
	•	edit item,
	•	remove item,
	•	change Task/Goal type,
	•	edit default goal target,
	•	edit unit,
	•	save.
Do not make templates immutable.

16. TASK CREATION
Verify that Create Task and Create Goal actually modify prototype state.
Do not create fake interactions where a button only closes a modal.
After creation:
Task/Goal must immediately appear in the appropriate Day/Week view.

17. BULK ACTION MODEL
Use one consistent interaction model throughout Manager UI:
SELECT → ACTIONS APPEAR
Do not create separate "bulk mode" concepts where unnecessary.
When users select employees:
3 selected

[ Apply shift ]
[ Assign task ]
[ Assign team ]
[ Clear ]
Use this pattern consistently.

18. BULK SCHEDULE
Verify:
Select employees → Apply shift → choose Shift Template → choose Work Area → choose Date → Apply
The selected employees should receive the shift.

19. BULK TASK
Verify:
Select employees → Assign task → choose Task/Goal → choose date → optional Work Area → assign
The assignments must become visible immediately.

20. BULK BY TEAM
Verify:
Select Team → Apply shift
and:
Select Team → Assign task/template
The manager should not need to manually select every employee in a Team.

21. SCHEDULE NAVIGATION
Verify:
Previous week Next week Today Week picker
The manager must be able to plan future weeks.
Example:
August 17–23 → August 24–30 → August 31–September 6 → September 7–13 → etc.

22. COPY PREVIOUS WEEK
Verify:
Future week → Copy previous week → source week identified → destination week identified → confirmation if destination contains shifts → copy → visible result.
Do not silently overwrite existing schedules.

23. COPY DAY
Verify:
Day menu → Copy day → choose destination day → confirm → shifts copied.
If destination contains shifts, show confirmation.

24. TASK WEEK VIEW
Tasks & Goals must support:
[ Week ] [ Day ]
Week view must show future assignments.
Example:
             MON        TUE        WED        THU        FRI

Anna         Pack 120   Pack 120   Clean      Pack 120   Pack 120

John         Pack 100   Pack 100   Pack 100   OFF        Pack 100
This is necessary for practical monthly planning.

25. MONTHLY PLANNING
The product does NOT need a separate complicated monthly planner.
Monthly planning should be achieved through:
weekly navigation + Copy previous week + Copy day + Shift Templates + Task Templates + Teams + bulk assignment.
The manager workflow should feel like:
COPY → ADJUST → COPY → ADJUST

26. ONBOARDING
Ensure onboarding correctly represents:
	1	Create organization
	2	Add employees
	3	Create teams — optional
	4	Add work areas — optional
	5	Build first schedule
	6	Assign first work
Optional setup steps must have:
Skip for now
Do not force the manager to configure Teams or Work Areas before using the product.

27. EMPLOYEE EXPERIENCE
Do not complicate Employee UX while adding Manager functionality.
Employee navigation remains:
Today Schedule History Profile
Employee sees:
	•	planned shift,
	•	Work Area,
	•	tasks,
	•	goals,
	•	progress.
Employee cannot edit:
	•	schedule,
	•	Team,
	•	Work Area,
	•	organization settings.

28. PROFILE
Both Manager and Employee must have:
	•	first name,
	•	last name,
	•	email,
	•	language,
	•	password.
Manager additionally sees organization information.

29. REMOVE DEPARTMENT
There must be no Department concept in the MVP.
Do not show:
	•	Department filter,
	•	Department field,
	•	Department settings.
Use:
Team = who works together.
Work Area = where the work happens.

30. DEMO DATA CONSISTENCY
Use one consistent demo date.
Use:
August 18, 2026
as the prototype Today date.
Update all:
	•	Dashboard,
	•	Employee Today,
	•	Schedule,
	•	Tasks,
	•	History,
	•	trial/billing references
to remain internally consistent.
Do not mix August 17 and August 18.

31. BILLING CONSISTENCY
Plans:
$10 / 10 employees $20 / 20 employees $30 / 40 employees
Annual:
$100 / 10 $200 / 20 $300 / 40
Manager is NOT counted.
Maximum users:
11 / 21 / 41.
Never show impossible usage such as:
36 / 20 employees.
Do not display:
"No credit card required"
because this has not been decided.
Trial:
14 days.

32. RESPONSIVE AUDIT
After implementing the changes, inspect every Manager screen at approximately:
	•	1440px desktop,
	•	1024px tablet,
	•	768px tablet/mobile transition,
	•	390px mobile,
	•	360px mobile.
There must be:
	•	no permanent desktop sidebar on mobile,
	•	no horizontal page overflow,
	•	no clipped content,
	•	no inaccessible controls,
	•	no overlapping dialogs,
	•	no content hidden behind fixed navigation.

33. ACCESSIBILITY
Mobile drawer must support:
	•	keyboard,
	•	Escape,
	•	focus management,
	•	screen reader label,
	•	visible focus.
Settings mobile navigation must also be keyboard and screen-reader accessible.
All important actions need accessible names.
Do not rely on icons alone.

34. FINAL LOGICAL FLOW AUDIT
Before considering this prototype complete, verify these end-to-end paths:
Manager
Sign up → Organization → Teams → Work Areas → Shift Templates → Task Templates → Employees → Schedule → Tasks → Progress → Dashboard → Billing
Employee
Sign up → Organization code → Request access → Approval → Today → Schedule → Tasks → Progress → History → Profile
Repeatable operations
Team → bulk schedule
Team → bulk tasks
Shift Template → schedule
Task Template → tasks
Work Area → shift
Copy Day → schedule
Copy Previous Week → future schedule
Week View → monthly planning

35. FINAL DESIGN PRINCIPLE
Do not add more features.
This iteration is about:
CONSISTENCY + RESPONSIVENESS + COMPLETENESS
The product should feel like one coherent system.
The manager should think:
Who? Where? When? What?
And Workday should answer:
Who = Team / Employee
Where = Work Area
When = Schedule / Date
What = Task / Goal
Repeatability comes from:
Shift Templates + Task Templates
The final manager workflow is:
SET UP ONCE → Teams → Work Areas → Shift Templates → Task Templates
THEN OPERATE → Schedule → Copy → Adjust → Assign → Monitor
The final employee workflow is:
OPEN → SEE TODAY → DO WORK → UPDATE PROGRESS
Do not introduce functionality outside this scope.
After completing this refinement, treat the UX as ready for implementation.