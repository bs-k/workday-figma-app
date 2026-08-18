MASTER PROMPT — WORKDAY FIGMA → PRODUCTION IMPLEMENTATION SPEC

We are building Workday from this Figma prototype.

The existing implementation is functionally advanced, but the current UI does NOT reproduce the Figma prototype closely enough.

I need you to create a complete implementation specification that allows a separate AI coding agent to rebuild the application UI faithfully without having access to the Figma file.

You are NOT being asked to redesign anything.

Figma is the visual and interaction source of truth.

The existing "Workday — Design Guidelines" document already defines the global design system. Do NOT unnecessarily repeat those global rules. Instead, extract the missing implementation-level information from the actual Figma screens.

==================================================
OUTPUT
==================================================

Create the following five sections/documents.

# 1. SCREEN IMPLEMENTATION SPECIFICATION

Document every major screen in the prototype.

MANAGER:
- Manager shell
- Employees
- Teams
- Work Areas
- Schedule
- Tasks
- Task Templates
- Settings, if present

EMPLOYEE:
- Today
- Schedule
- History
- Profile

For EVERY screen document:

## Route

Example:

/app/manager/employees

## Figma frame

Give the exact Figma frame/component name.

## Desktop layout

Document actual structure and measurements:

- sidebar width
- header height
- content width
- max-width
- horizontal padding
- vertical spacing
- section spacing
- columns
- rows
- alignment
- sticky elements
- fixed elements
- scroll containers

Use exact pixel measurements wherever available.

Never use vague descriptions such as:

"large spacing"
"compact"
"wide sidebar"

Instead write:

"sidebar: 224px"
"content padding: 32px"
"section gap: 24px"

## Mobile layout

Document the ACTUAL mobile design.

Do not simply describe desktop collapsing into mobile.

Document:

- mobile header
- mobile navigation
- page padding
- cards
- lists
- selectors
- sheets
- drawers
- fixed elements
- scroll behavior
- safe areas

## Component tree

Provide an implementation-level tree.

Example:

Page
├── ManagerShell
│   ├── Sidebar
│   └── Main
│       ├── PageHeader
│       ├── Toolbar
│       │   ├── Search
│       │   └── Filters
│       └── Content
│           └── EmployeeList
│               └── EmployeeRow

Use the actual Figma structure.

## States

Document every state visible in Figma:

- default
- active
- selected
- hover
- disabled
- loading
- empty
- error
- pending
- completed
- archived
- editing

If a state is not represented in Figma:

NOT SPECIFIED IN FIGMA

Do not invent it.

## Interactions

Document interactions as:

CLICK → RESULT

Example:

Click "Add task"
→ opens Create Task dialog

Click employee
→ opens employee detail

Click Apply
→ opens Apply Template sheet

Document all interactions represented in Figma.

## Exact copy

Extract visible copy exactly.

Do not paraphrase.

Include:

- headings
- labels
- buttons
- placeholders
- tabs
- badges
- empty states
- helper text
- confirmation text
- navigation labels

==================================================
# 2. COMPONENT SPECIFICATION
==================================================

Extract EVERY reusable component from the prototype.

Group them into:

1. Layout
2. Navigation
3. Buttons
4. Inputs
5. Selects
6. Tabs
7. Cards
8. Tables
9. Lists
10. Avatars
11. Badges
12. Progress
13. Dialogs
14. Drawers
15. Bottom sheets
16. Action sheets
17. Toasts
18. Calendar/Schedule
19. Tasks
20. Goals
21. Employees
22. Templates

For every component document:

- exact name
- where it appears
- desktop variant
- mobile variant
- dimensions
- padding
- gaps
- typography
- colors
- border
- radius
- shadow
- icon
- icon dimensions
- alignment
- states
- interaction
- responsive behavior

Also explicitly identify:

SHARED COMPONENT

or

SCREEN-SPECIFIC COMPONENT

Do not create hypothetical components.

Only document components that actually exist in the prototype.

==================================================
# 3. LAYOUT & MEASUREMENTS
==================================================

Create a dedicated measurement reference.

For every major screen provide:

- viewport assumptions
- sidebar width
- header height
- content max-width
- page padding
- top offsets
- section spacing
- card width/height
- row height
- column widths
- modal width/height
- drawer width
- bottom sheet dimensions
- fixed navigation height
- scroll areas

Where useful provide ASCII diagrams.

Example:

1440px desktop

┌───────────────┬────────────────────────────────────┐
│               │                                    │
│   SIDEBAR     │             MAIN                   │
│    224px      │                                    │
│               │                                    │
└───────────────┴────────────────────────────────────┘

Also document responsive behavior for:

320px
375px
390px
430px
768px
1024px
1280px
1440px

If a specific viewport is not represented in Figma, explicitly say:

NOT SPECIFIED IN FIGMA

Do not guess values.

==================================================
# 4. FIGMA → REACT IMPLEMENTATION MAP
==================================================

For every screen map:

FIGMA FRAME
↓
REACT PAGE
↓
COMPONENT TREE
↓
RESPONSIVE VARIANT

Example:

Figma:
Manager / Employees

React:
ManagerEmployeesPage

Components:
ManagerShell
PageHeader
EmployeeToolbar
EmployeeTabs
EmployeeList
EmployeeRow
Avatar
StatusBadge
TeamSelect
EmployeeActions

For every important component provide:

- suggested React component name
- props
- children
- state
- responsive behavior
- Tailwind implementation guidance

Then classify existing implementation components as:

REUSE
ADAPT
REBUILD REQUIRED

Important:

Do NOT preserve the current implementation merely because it already exists.

Figma takes precedence.

If the current implementation differs materially from Figma, mark:

REBUILD REQUIRED

==================================================
# 5. SCHEDULE IMPLEMENTATION SPECIFICATION
==================================================

Schedule is the most complex Workday screen.

Analyze separately:

- Manager Schedule desktop
- Manager Schedule mobile
- Employee Schedule desktop
- Employee Schedule mobile

Document:

- shell
- toolbar
- date navigation
- week selector
- filters
- employee selector
- calendar grid
- employee rows
- day columns
- shift cards
- shift card anatomy
- work area
- shift template
- notes
- selected states
- editing states
- bulk selection
- bulk action bar
- dialogs
- mobile day selector
- mobile employee cards
- mobile shift cards

For the grid provide exact measurements:

- employee column width
- day column width
- header height
- row height
- shift card dimensions
- gaps
- borders
- sticky behavior

For every Schedule interaction use:

CLICK → RESULT

Do not invent interactions.

==================================================
IMPORTANT RULES
==================================================

1. Figma is the source of truth.

2. Do NOT redesign anything.

3. Do NOT propose UX improvements.

4. Do NOT "modernize" the design.

5. Do NOT replace the visual language with generic SaaS patterns.

6. Do NOT infer missing behavior.

7. Do NOT invent dimensions.

8. If something cannot be determined from Figma, write:

NOT SPECIFIED IN FIGMA

9. Preserve exact terminology used by the prototype.

10. Preserve exact visible copy.

11. Distinguish desktop and mobile explicitly.

12. Do not collapse different screens into one generic description.

13. Pay particular attention to:
   - page hierarchy
   - whitespace
   - typography hierarchy
   - alignment
   - component dimensions
   - navigation
   - cards
   - dialogs
   - sheets
   - mobile layouts
   - fixed navigation
   - Schedule grid

14. The output must be implementation-oriented, not a design critique.

15. The final document should be detailed enough that an AI coding agent can reproduce the UI without seeing the Figma file.

==================================================
FINAL SECTION
==================================================

End the document with:

# UI REBUILD PRIORITY

Rank the screens/components by how important they are for visual fidelity.

Use:

P0 — must match Figma exactly
P1 — important
P2 — secondary

Then provide:

# CURRENT IMPLEMENTATION GAP

For each major screen:

- likely visual mismatch
- what needs to be rebuilt
- what can be reused
- what is unknown

Do NOT make assumptions about the current codebase unless the relevant implementation is visible in the Figma/code context.

The purpose of this document is to eliminate ambiguity for the next AI coding agent.