# Workday — Final UX Fixes v0.9
## CLOSE UX AFTER THIS ITERATION

Refine the EXISTING Workday prototype.

IMPORTANT:
This is the FINAL UX iteration.

Do NOT redesign the application.
Do NOT add new features.
Do NOT change the product model.
Do NOT change the visual language.

Only implement the specific fixes below.

After completing them, consider the UX specification FINAL.

---

# 1. CRITICAL — TASKS & GOALS MOBILE WEEK VIEW

The current mobile Week view still behaves like a desktop table with horizontal scrolling.

FIX THIS.

At mobile widths below 768px, do NOT render the desktop employee × 7-day table.

Instead use a vertical weekly overview.

Example:

MONDAY · AUG 24

Anna Kowalska
Pack orders
83 / 120

John Smith
Clean Zone A
✓ Done

TUESDAY · AUG 25

Anna Kowalska
Pack orders
120 / 120
✓ Done

John Smith
Inventory check
2 / 3

WEDNESDAY · AUG 26

...

The user can vertically scroll through the week.

Requirements:

- no horizontal page scrolling,
- no desktop table on mobile,
- each day is a clear section,
- assignments are displayed as compact list items,
- tapping an assignment opens the existing task detail/edit interaction,
- Team filter remains available,
- Week / Day switch remains available.

Desktop Week view remains the existing dense table/grid.

DO NOT change desktop Schedule or Tasks layouts.

---

# 2. CRITICAL — EMPLOYEE QUANTITATIVE PROGRESS EDITOR

The current progress editor is technically functional but visually too tall.

Remove the duplicated large numeric value.

DO NOT show:

large "83"

AND

another input containing "83"

at the same time.

Use:

Update progress

Pack orders

Target
120 orders

Current progress

[ 83 ]

[ − ]              [ + ]

83 / 120
██████████░░

[ Save progress ]

The input is the primary interaction.

The +/- controls are secondary.

Requirements:

- use 100dvh,
- keyboard aware,
- scrollable content,
- sticky footer,
- Save progress always reachable,
- safe-area bottom support,
- inputmode="numeric",
- min=0,
- max=target,
- step=1.

When keyboard opens, the input must scroll into view and Save must remain accessible.

Do not use a fixed-position Save button that can be hidden behind the keyboard.

---

# 3. MANAGER MOBILE — SCHEDULE HEADER SIMPLIFICATION

Reduce the number of controls visible before the employee list.

Mobile Schedule should be:

Schedule

August 24–30

‹ previous / next ›

MON 24
TUE 25
WED 26
THU 27
FRI 28
SAT 29
SUN 30

[ Search employees ]

[ Filters ]

Monday · August 24

Employee list...

Do NOT permanently show multiple filters and bulk-selection controls in the header.

---

# 4. MOBILE FILTERS

Replace permanently visible filter controls with:

[ Filters ]

When opened:

Filters

Team
[ All teams ]

Work area
[ All areas ]

[ Apply filters ]

[ Reset ]

Use the same interaction pattern on:

- Schedule,
- Tasks & Goals,
- Employees where applicable.

Do not create different filter UX patterns for different screens.

---

# 5. MOBILE BULK SELECTION

Bulk selection should NOT dominate the normal Schedule UI.

Normal state:

Employee list.

Provide:

[ Select ]

When activated:

☐ Anna
☐ John
☐ Maria

3 selected

[ Apply shift ]
[ Clear shift ]

After action is completed, automatically exit selection mode.

Keep bulk operations powerful but secondary to normal daily management.

---

# 6. MANAGER MOBILE SPACING

Establish one consistent spacing rule.

For all Manager mobile pages:

- 56px mobile top bar,
- 20–24px spacing below top bar,
- 16px horizontal page padding,
- enough bottom padding for Quick Action Bar.

Do not individually compensate different pages with arbitrary spacing.

Dashboard, Employees, Schedule, Tasks & Goals and Settings should visually start at approximately the same vertical position.

---

# 7. MOBILE QUICK ACTION BAR

KEEP the current contextual Quick Action Bar.

Do NOT redesign it.

Dashboard:

+ Add task | + Template

Tasks & Goals:

+ Add task | + Template

Schedule:

+ Add shift | + Template

Employees:

no Quick Action Bar

Settings:

no Quick Action Bar

It is an ACTION BAR, not navigation.

Do not add Manager bottom navigation.

---

# 8. MANAGER DRAWER ACCESSIBILITY

Fix the existing mobile navigation drawer focus behavior.

The hamburger button must have a real ref/reference.

When drawer opens:

- focus moves into drawer.

When drawer closes:

- focus returns to the hamburger button.

Also retain:

- Escape closes drawer,
- backdrop closes drawer,
- body scroll lock,
- accessible labels,
- background inert while drawer is open.

Do not change the visual drawer design.

---

# 9. TASK TEMPLATES — SUPPORT GOALS

Task Templates must support both:

Task

and

Goal.

When adding/editing an item inside a Task Template:

Type:

[ Task ] [ Goal ]

If Goal is selected, show:

Target
[ 120 ]

Unit
[ orders ]

Example:

Morning warehouse setup

1. Check equipment — Task
2. Pack orders — Goal · 120 orders
3. Clean loading area — Task

Existing templates should continue working.

Do not change the overall Task Template UX.

---

# 10. EMPLOYEE MOBILE BOTTOM NAVIGATION

Keep:

Today
Schedule
History
Profile

Do not redesign it.

Ensure:

- safe-area bottom,
- minimum 44px touch targets,
- sufficient page bottom padding,
- no content hidden behind navigation.

Only fix spacing if necessary.

---

# 11. EMPLOYEE DESKTOP

Do not change the existing Employee desktop design.

Ensure mobile-only bottom navigation spacing does not unnecessarily add large bottom padding on desktop.

Desktop should use the available width normally.

---

# 12. FINAL MOBILE OVERFLOW CHECK

Before finishing, verify these screens at:

360px
375px
390px
430px

Manager:

- Dashboard
- Employees
- Employee detail
- Schedule Day
- Schedule Week
- Shift editor
- Tasks Day
- Tasks Week
- Task editor
- Apply Task Template
- Settings
- Teams
- Work Areas
- Shift Templates
- Task Templates
- Profile
- Billing

Employee:

- Today
- Quantitative progress editor
- Schedule
- History
- Profile

Acceptance criteria:

NO accidental horizontal page scrolling.

NO desktop tables on mobile Tasks Week.

NO clipped buttons.

NO inaccessible Save progress button.

NO modal overflow.

NO content hidden behind fixed navigation/action bars.

NO duplicated numeric progress display.

---

# 13. DO NOT CHANGE

Do NOT modify:

- pricing,
- billing model,
- trial,
- Stripe,
- organization model,
- Team model,
- Work Area model,
- Employee model,
- Task model,
- Goal model,
- Shift model,
- template model,
- navigation structure,
- desktop Schedule,
- desktop Tasks,
- visual identity.

Do NOT add new functionality.

---

# 14. FINAL ACCEPTANCE

The UX is considered FINAL after this iteration.

The final product model remains:

Manager:
PLAN → ASSIGN → MONITOR

Employee:
SEE → DO → UPDATE

Desktop:
SEE MORE → ACT IN BULK

Mobile:
CHOOSE → ACT → RETURN

Make only the changes specified above.

After completing them, do not propose additional UX changes.