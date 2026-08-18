# Plan: Unify Manager Quick Action Bar style with Employee bottom nav

## Context

The Manager mobile Quick Action Bar (shown on Dashboard, Tasks, Schedule) and the Employee mobile bottom navigation bar share the same visual slot — fixed bottom of the screen, `border-t border-gray-100 bg-white` background — but are styled differently:

| | Manager Quick Action Bar | Employee bottom nav |
|---|---|---|
| Button layout | Horizontal row of two filled pill buttons | Vertical icon → label columns |
| Button backgrounds | Blue filled / Gray filled | None (transparent) |
| Text size | `text-sm font-semibold` | `text-[11px] font-medium` |
| Icon position | Inline left of label | Above label |
| Bar height | `min-h-[64px]` | `min-h-[56px]` |

The user wants the Manager Quick Action Bar to visually match the Employee bottom nav: icon stacked above label, no filled pill backgrounds, same compact text style.

## Change

**File:** `src/App.tsx` — `ManagerQuickActionBar` component (lines ~297–319)

Replace the current two-pill layout with the Employee nav's `flex-col` icon-above-label style:

```tsx
function ManagerQuickActionBar({ tab, callbacks }: ...) {
  if (tab === 'employees' || tab === 'settings') return null
  const isSchedule = tab === 'schedule'

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex safe-area-bottom" style={{ minHeight: '56px' }}>
      <button
        onClick={isSchedule ? callbacks.onAddShift : callbacks.onAddTask}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-blue-600 hover:bg-gray-50 min-h-[56px]">
        <Ic.Plus size={18}/>{isSchedule ? 'Add shift' : 'Add task'}
      </button>
      <button
        onClick={callbacks.onTemplate}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-600 min-h-[56px]">
        <Ic.Copy size={18}/>Template
      </button>
    </div>
  )
}
```

Key decisions:
- Primary action (Add task / Add shift) → `text-blue-600` to signal it's the main CTA
- Template → `text-gray-400` (secondary, same as inactive Employee nav tabs)
- `Ic.Copy` used as Template icon (it's a natural fit for "template/duplicate")
- `gap-2 px-4 py-3` inner wrapper removed; the outer `div` itself becomes the flex row (same pattern as Employee nav)
- `min-h-[64px]` → `min-h-[56px]` to match Employee nav
- No `gap-2` between buttons (they fill the bar equally like nav tabs)
- `hover:bg-gray-50` subtle hover state (same as nav hover pattern)

No other files need changes.

## Verification

1. Open Manager app on mobile (< 1024px)
2. Navigate to Dashboard, Tasks, Schedule — Quick Action Bar should look identical in structure to the Employee bottom nav: icon on top, small label below, no pill backgrounds
3. Check Employees and Settings — bar should not appear
4. Tap "Add task" / "Add shift" — existing flow should still trigger
5. Tap "Template" — action sheet should still open
6. Open Employee app — bottom nav should be visually indistinguishable in style from the Manager bar
