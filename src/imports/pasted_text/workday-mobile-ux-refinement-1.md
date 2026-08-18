
# Workday — Final Mobile UX Refinement v0.7
## Mobile Shell, Quick Actions & Employee Progress

Refine the EXISTING Workday prototype.

Do NOT rebuild the application.

Do NOT add unrelated product features.

This iteration focuses on solving the remaining mobile UX problems at an architectural level.

The most important principles:

1. Mobile is a first-class interface, not a scaled desktop.
2. Navigation and actions must be visually separated.
3. Critical actions must always remain reachable.
4. Full-screen mobile interactions must respect dynamic viewport height and safe areas.
5. No content may be hidden behind fixed navigation.
6. Numeric goal progress must be effortless to update.

---

# 1. MOBILE SHELL — MANAGER

Create one consistent Manager mobile shell.

At widths below 1024px:

Top:

56px mobile header.

Content:

minimum 20–24px top spacing below the header.

Bottom:

contextual Quick Actions bar on operational screens.

The shell must account for:

- iOS safe area,
- Android navigation area,
- dynamic browser chrome.

Use CSS based on:

env(safe-area-inset-top)
env(safe-area-inset-bottom)

and use 100dvh for fullscreen mobile surfaces.

Do NOT rely on 100vh for critical mobile dialogs/drawers.

---

# 2. MANAGER MOBILE TOP HEADER

Keep:

```text
☰   Workday   Avatar
Header:
	•	56px base height,
	•	safe-area aware,
	•	sticky/fixed,
	•	z-index above page content,
	•	minimum 44px touch targets.
Do not put page-specific actions in this header.
The Avatar opens Manager Profile/Settings.
The hamburger opens the Manager navigation drawer.

3. MANAGER MOBILE NAVIGATION
Keep the existing navigation drawer.
Drawer contains:
WORK
Dashboard Employees Schedule Tasks & Goals
MANAGE
Settings
Account area:
Alex Manager ABC Logistics
Sign out
Requirements:
	•	full-height,
	•	use 100dvh,
	•	safe-area aware,
	•	backdrop,
	•	Escape,
	•	focus management,
	•	focus return,
	•	body scroll lock,
	•	accessible labels.
Do not add bottom navigation for Manager.

4. MANAGER MOBILE QUICK ACTION BAR
Add a FIXED contextual bottom action bar on mobile.
This is NOT navigation.
It is a quick action area.
Use:
┌─────────────────────────────────┐
│   + Add task       + Template   │
└─────────────────────────────────┘
The bar should:
	•	be fixed to viewport bottom,
	•	use safe-area bottom padding,
	•	have minimum 64px visual height,
	•	have large touch targets,
	•	remain above page content,
	•	have a subtle top border,
	•	use a white background,
	•	have no excessive shadow.
Content must receive enough bottom padding so the bar never covers the last content item.

5. QUICK ACTION BAR — CONTEXTUAL BEHAVIOR
Do NOT show exactly the same actions on every Manager screen.
Dashboard
Show:
	•	Add task
	•	Template
Tasks & Goals
Show:
	•	Add task
	•	Template
Schedule
Show:
	•	Add shift
	•	Template
Template opens:
Task template Shift template
Employees
Do NOT show the quick action bar.
The primary employee action is Invite and should remain in the page header.
Settings
Do NOT show the quick action bar.
Settings already contains configuration actions.

6. QUICK ACTION — ADD TASK
On mobile:
	•	Add task
opens the existing Create Task / Goal flow.
Use a full-screen mobile form or bottom sheet depending on complexity.
Do not use a desktop-width centered modal.
The form must remain usable at 360px width.

7. QUICK ACTION — TEMPLATE
When Manager taps:
	•	Template
open a small action sheet:
New template

Task template
Shift template

Cancel
Selecting:
Task template
opens Create Task Template.
Selecting:
Shift template
opens Create Shift Template.
Do not create a generic ambiguous "Create template" form.

8. MANAGER MOBILE CONTENT SPACING
Create a consistent mobile page rhythm.
For mobile screens:
	•	top header: 56px,
	•	page content top spacing: 20–24px,
	•	horizontal page padding: 16px,
	•	bottom content padding: at least 88px on screens with Quick Action Bar.
Do not rely on individual screens accidentally producing enough spacing.
The mobile shell should establish this consistently.

9. MANAGER DASHBOARD
Keep the current single-column mobile dashboard.
Ensure:
	•	title starts at least 20px below header,
	•	no KPI grid on mobile,
	•	no content hidden behind Quick Action Bar.
Priority:
	1	people working today,
	2	task progress,
	3	goal progress,
	4	needs attention.
Quick actions remain at bottom.

10. MANAGER SCHEDULE
Mobile Schedule must remain day-first.
Structure:
Schedule

August 24–30

‹     week     ›

MON 24
TUE 25
WED 26
THU 27
FRI 28
SAT 29
SUN 30

Monday · August 24

All teams ▼

Anna Kowalska
06:00–14:00
Warehouse A

John Smith
14:00–22:00
Warehouse B

Maria Nowak
OFF
Do not use the desktop employee × 7-day grid as the primary mobile UI.
Quick action:
	•	Add shift

11. MANAGER TASKS & GOALS
Mobile structure:
Tasks & Goals

August 24–30

[ Week ] [ Day ]

MON 24
TUE 25
WED 26
...

All teams ▼

Monday · August 24

Anna Kowalska
Pack orders
83 / 120

John Smith
Clean Zone A
Done
Do not put Create Task and Template buttons inside the top toolbar.
Those actions belong in the fixed Quick Action Bar.
This creates a calmer header.

12. EMPLOYEE MOBILE — CRITICAL GOAL PROGRESS FIX
The current quantitative goal progress editor does not reliably fit inside the mobile viewport.
Replace the current bottom-sheet implementation with a mobile-first full-screen progress editor.
Use:
100dvh
not:
100vh.
Example:
┌────────────────────────────┐
│ ← Update progress          │
│                            │
│ Pack orders                │
│ Target: 120 orders         │
│                            │
│ Current progress           │
│                            │
│         83                 │
│        orders              │
│                            │
│ ─────────────────────────  │
│                            │
│ [ − ]                [ + ] │
│                            │
│ 83 / 120                   │
│ ███████████░░░░            │
│                            │
│                            │
│                            │
│ [ Save progress ]          │
└────────────────────────────┘

13. PROGRESS EDITOR — LAYOUT RULES
The progress editor must have:
Header:
	•	back/close,
	•	title.
Scrollable content:
	•	task name,
	•	target,
	•	current progress,
	•	numeric input,
	•	+/- controls,
	•	progress bar.
Sticky bottom action area:
	•	Save progress.
The Save button must remain reachable even when the software keyboard is open.
Do not position Save using fixed pixel coordinates.
Use flex column layout:
full-height container
header
scrollable content
sticky footer
The footer must respect:
env(safe-area-inset-bottom).

14. NUMERIC INPUT
Use:
input type="number"
with:
inputmode="numeric"
and:
	•	min = 0,
	•	max = target,
	•	step = 1.
The user should be able to directly type:
83
rather than being forced to press + repeatedly.
Keep +/- as secondary controls.

15. PROGRESS DISPLAY
Employee Today should show quantitative progress as:
Pack orders

83 / 120
orders

████████████░░░░░

[ Update progress ]
The numeric value must be visually prominent.
Do not rely on the progress bar alone.

16. PROGRESS SAVE
Primary CTA must say:
Save progress
not simply:
Save.
After saving:
	•	close editor,
	•	update the task immediately,
	•	update the progress bar,
	•	show a small confirmation toast:
✓ Progress updated
Do not reload the page.

17. PROGRESS VALIDATION
Do not allow:
negative values.
Do not allow:
value > target.
If the entered value equals target:
automatically mark the Goal as completed.
If value is below target:
keep it pending.
Example:
83 / 120 → pending
120 / 120 → completed.

18. EMPLOYEE MOBILE BOTTOM NAVIGATION
Keep:
Today Schedule History Profile
This is navigation, unlike Manager Quick Actions.
Ensure:
	•	fixed bottom navigation,
	•	safe-area bottom support,
	•	minimum 56px visual height,
	•	44px+ touch targets,
	•	enough main content bottom padding.
Do not allow the bottom navigation to cover content.

19. EMPLOYEE TODAY
Maintain:
Today Your shift Your work
Simplify the task cards.
For quantitative goals:
Pack orders

83 / 120 orders

progress bar

Update progress
For binary tasks:
Clean Zone A

Not completed

Mark as done
The employee should never need to understand the internal Task vs Goal model.

20. EMPLOYEE SCHEDULE
Keep day-first mobile design.
Use:
week navigation + day selector + single shift detail.
Do not use desktop grid.
Ensure all content is visible above the bottom navigation or can be scrolled safely beyond it.

21. EMPLOYEE HISTORY
Keep the expandable weekly design.
Ensure:
	•	one-column,
	•	no horizontal overflow,
	•	comfortable touch targets,
	•	enough bottom padding,
	•	progress values readable.

22. EMPLOYEE PROFILE
Single-column form below 640px.
Use:
First name Last name Email Language Save changes
Do not use two-column fields on narrow screens.

23. MOBILE SETTINGS
Keep:
Settings → category list → section detail.
No permanent Settings sidebar on mobile.
Ensure:
	•	20–24px top spacing,
	•	16px horizontal padding,
	•	safe-area support,
	•	no content behind fixed navigation.
Quick Action Bar is NOT shown in Settings.

24. MOBILE FORMS
At widths below 640px:
Use:
	•	full-width fields,
	•	single-column layout,
	•	minimum 44px controls,
	•	16px horizontal page padding.
For complex forms:
use full-screen sheets/pages.
For simple confirmations:
use centered dialogs.
Do not use desktop-sized modals on mobile.

25. SAFE AREA CSS
Implement actual safe-area utility classes.
Do not merely reference a class that has no CSS implementation.
Provide equivalents of:
.safe-area-top
.safe-area-bottom
.safe-area-x
using:
env(safe-area-inset-top) env(safe-area-inset-bottom) env(safe-area-inset-left) env(safe-area-inset-right)
Use these in:
	•	Manager top bar,
	•	Manager Quick Action Bar,
	•	Employee bottom navigation,
	•	full-screen mobile sheets,
	•	navigation drawer.

26. DYNAMIC VIEWPORT
For mobile full-screen UI use:
100dvh
where appropriate.
Avoid relying on:
100vh
for:
	•	drawer,
	•	full-screen forms,
	•	progress editor,
	•	mobile settings pages.
The interface must remain usable when the browser address bar or keyboard changes the viewport height.

27. KEYBOARD-AWARE PROGRESS EDITOR
When numeric input receives focus:
	•	keyboard may open,
	•	input must scroll into view,
	•	Save progress must remain accessible,
	•	content must remain scrollable,
	•	footer must not be hidden behind keyboard.
Test at:
360 × 800 375 × 812 390 × 844

28. MOBILE OVERFLOW AUDIT
Test:
360px 375px 390px 430px
for:
	•	Dashboard
	•	Employees
	•	Employee detail
	•	Schedule
	•	Shift editor
	•	Tasks & Goals
	•	Task editor
	•	Task template editor
	•	Manager Settings
	•	Teams
	•	Work Areas
	•	Shift Templates
	•	Task Templates
	•	Profile
	•	Billing
	•	Employee Today
	•	Employee Schedule
	•	Employee History
	•	Employee Profile
	•	Employee progress editor.
There must be:
NO accidental horizontal page scrolling.
NO clipped CTA.
NO clipped modal.
NO inaccessible Save button.
NO content hidden behind fixed bars.

29. TOUCH TARGET AUDIT
All important controls:
minimum 44 × 44px.
Especially:
	•	plus/minus,
	•	close,
	•	back,
	•	navigation,
	•	day selectors,
	•	week navigation,
	•	task actions,
	•	employee rows,
	•	bottom action bar.

30. FULL PRODUCT UX AUDIT
Do not only fix mobile CSS.
After the changes verify:
Manager:
Dashboard → Employees → Schedule → Tasks & Goals → Settings
Employee:
Today → Schedule → History → Profile
Verify:
Team creation → employee assignment → schedule usage → bulk task assignment.
Work Area creation → shift usage.
Shift Template creation → schedule usage.
Task Template creation → task assignment.
Progress update → Manager sees updated state.

31. DESKTOP MUST NOT REGRESS
Desktop layouts should remain optimized for:
	•	dense schedule,
	•	40 employees,
	•	tables,
	•	bulk operations,
	•	sidebar,
	•	multi-column views.
Do not replace desktop components with mobile components.
Use responsive composition rather than simple scaling.

32. FINAL MOBILE UX PRINCIPLE
Manager:
NAVIGATION → hamburger drawer
ACTIONS → contextual bottom Quick Action Bar
Employee:
NAVIGATION → bottom navigation
ACTIONS → inside the current task/screen.
Therefore:
Manager:
☰ Navigation
and:
+ Add task | + Template
are intentionally different UI systems.
Do not combine them.

33. FINAL ACCEPTANCE TEST
At 390px:
Manager
Open Dashboard → see clean content below 56px header → Quick Actions visible at bottom
Schedule → select next week → select Monday → edit employee shift → save
Tasks → select day → apply template → assign to team → confirm
Employee
Open Today → see task
Tap Update progress → full-screen editor opens → enter 83 → keyboard opens → Save progress remains reachable → save → see 83 / 120 immediately
No horizontal scrolling.
No clipped content.
No hidden CTA.
No overlapping navigation.
If any test fails, redesign the affected mobile composition instead of adding overflow hacks.
The goal is not to make the desktop interface fit mobile.
The goal is to make mobile feel deliberately designed for the job.
Do not add functionality outside this scope.