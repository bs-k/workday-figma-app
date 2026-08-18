export type EmployeeStatus = 'active' | 'pending' | 'inactive'
export type TaskType = 'task' | 'goal'
export type TaskStatus = 'pending' | 'completed'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  status: EmployeeStatus
  teamId: string
}

export interface Team {
  id: string
  name: string
  color: string
}

export interface WorkArea {
  id: string
  name: string
  active: boolean
}

export interface ShiftTemplate {
  id: string
  name: string
  start: string
  end: string
  active: boolean
}

export interface TaskTemplateItem {
  id: string
  name: string
  type: TaskType
  target?: number
  unit?: string
}

export interface TaskTemplate {
  id: string
  name: string
  items: TaskTemplateItem[]
}

export interface Shift {
  start: string
  end: string
  location: string
  note?: string
}

export type WeekSchedule = Record<string, Shift | null>

export interface EmployeeSchedule {
  employeeId: string
  shifts: Record<string, Shift | null>
}

export interface Task {
  id: string
  name: string
  type: TaskType
  target?: number
  unit?: string
}

export interface TaskAssignment {
  taskId: string
  employeeId: string
  status: TaskStatus
  current?: number
  date: string
}

export const initialWorkAreas: WorkArea[] = [
  { id: 'wa1', name: 'Warehouse A', active: true },
  { id: 'wa2', name: 'Warehouse B', active: true },
  { id: 'wa3', name: 'Production Hall', active: true },
  { id: 'wa4', name: 'Loading Dock', active: true },
  { id: 'wa5', name: 'Sorting Zone', active: true },
]

export const initialShiftTemplates: ShiftTemplate[] = [
  { id: 'morning', name: 'Morning Shift', start: '06:00', end: '14:00', active: true },
  { id: 'afternoon', name: 'Afternoon Shift', start: '14:00', end: '22:00', active: true },
  { id: 'day', name: 'Day Shift', start: '08:00', end: '16:00', active: true },
  { id: 'night', name: 'Night Shift', start: '22:00', end: '06:00', active: true },
]

// Legacy compat
export const shiftTemplates = initialShiftTemplates

export const initialTaskTemplates: TaskTemplate[] = [
  {
    id: 'tt1',
    name: 'Morning warehouse setup',
    items: [
      { id: 'tti1', name: 'Check equipment', type: 'task' },
      { id: 'tti2', name: 'Prepare packing stations', type: 'task' },
      { id: 'tti3', name: 'Check loading area', type: 'task' },
    ],
  },
  {
    id: 'tt2',
    name: 'End of day cleanup',
    items: [
      { id: 'tti4', name: 'Clean workstations', type: 'task' },
      { id: 'tti5', name: 'Return equipment', type: 'task' },
      { id: 'tti6', name: 'Complete handover notes', type: 'task' },
    ],
  },
  {
    id: 'tt3',
    name: 'Production daily targets',
    items: [
      { id: 'tti7', name: 'Pack orders', type: 'goal', target: 120, unit: 'orders' },
      { id: 'tti8', name: 'Quality check items', type: 'goal', target: 80, unit: 'items' },
    ],
  },
]

// Legacy compat
export const taskTemplates = initialTaskTemplates

export const teams: Team[] = [
  { id: 'team-a', name: 'Warehouse Team A', color: 'blue' },
  { id: 'team-b', name: 'Warehouse Team B', color: 'violet' },
  { id: 'team-prod', name: 'Production Team', color: 'emerald' },
  { id: 'team-log', name: 'Logistics Team', color: 'amber' },
]

export const BASE_MONDAY = new Date(2026, 7, 17) // Aug 17 2026

export function getWeekDays(weekOffset = 0) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const full = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return days.map((label, i) => {
    const d = new Date(BASE_MONDAY)
    d.setDate(d.getDate() + weekOffset * 7 + i)
    const dateStr = d.toISOString().split('T')[0]
    const month = d.toLocaleDateString('en-US', { month: 'short' })
    const day = d.getDate()
    return { label, fullLabel: full[i], date: dateStr, short: `${month} ${day}` }
  })
}

export function getWeekLabel(weekOffset = 0) {
  const days = getWeekDays(weekOffset)
  const first = days[0]
  const last = days[6]
  const firstD = new Date(first.date)
  const lastD = new Date(last.date)
  const firstMonth = firstD.toLocaleDateString('en-US', { month: 'long' })
  const lastMonth = lastD.toLocaleDateString('en-US', { month: 'long' })
  if (firstMonth === lastMonth) {
    return `${firstMonth} ${firstD.getDate()}–${lastD.getDate()}, ${firstD.getFullYear()}`
  }
  return `${firstMonth} ${firstD.getDate()} – ${lastMonth} ${lastD.getDate()}, ${firstD.getFullYear()}`
}

export const TODAY = '2026-08-18'

export const employees: Employee[] = [
  { id: 'e01', firstName: 'Anna', lastName: 'Kowalska', email: 'anna.kowalska@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e02', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e03', firstName: 'Maria', lastName: 'Garcia', email: 'maria.garcia@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e04', firstName: 'Piotr', lastName: 'Nowak', email: 'piotr.nowak@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e05', firstName: 'David', lastName: 'Chen', email: 'david.chen@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e06', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e07', firstName: 'Ahmed', lastName: 'Hassan', email: 'ahmed.hassan@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e08', firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki.tanaka@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e09', firstName: 'Elena', lastName: 'Petrova', email: 'elena.petrova@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e10', firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos.r@example.com', status: 'active', teamId: 'team-a' },
  { id: 'e11', firstName: 'Fatima', lastName: 'Al-Rashid', email: 'fatima.r@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e12', firstName: 'Thomas', lastName: 'Müller', email: 'thomas.muller@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e13', firstName: 'Amara', lastName: 'Diallo', email: 'amara.diallo@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e14', firstName: 'Lucía', lastName: 'Fernández', email: 'lucia.f@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e15', firstName: 'Min-jun', lastName: 'Kim', email: 'minjun.kim@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e16', firstName: 'Oliver', lastName: 'Wright', email: 'oliver.wright@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e17', firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e18', firstName: 'Matteo', lastName: 'Rossi', email: 'matteo.rossi@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e19', firstName: 'Aisha', lastName: 'Okonkwo', email: 'aisha.o@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e20', firstName: 'Henrik', lastName: 'Larsson', email: 'henrik.l@example.com', status: 'active', teamId: 'team-b' },
  { id: 'e21', firstName: 'Sofía', lastName: 'Hernández', email: 'sofia.h@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e22', firstName: 'Raj', lastName: 'Kumar', email: 'raj.kumar@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e23', firstName: 'Nadia', lastName: 'Khalil', email: 'nadia.k@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e24', firstName: 'James', lastName: "O'Brien", email: 'james.obrien@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e25', firstName: 'Anastasia', lastName: 'Volkova', email: 'anastasia.v@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e26', firstName: 'Diego', lastName: 'Morales', email: 'diego.m@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e27', firstName: 'Hannah', lastName: 'Fischer', email: 'hannah.f@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e28', firstName: 'Kwame', lastName: 'Mensah', email: 'kwame.m@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e29', firstName: 'Isabella', lastName: 'Costa', email: 'isabella.c@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e30', firstName: 'Dmitri', lastName: 'Sokolov', email: 'dmitri.s@example.com', status: 'active', teamId: 'team-prod' },
  { id: 'e31', firstName: 'Layla', lastName: 'Ahmed', email: 'layla.a@example.com', status: 'active', teamId: 'team-log' },
  { id: 'e32', firstName: 'Marcus', lastName: 'Williams', email: 'marcus.w@example.com', status: 'active', teamId: 'team-log' },
  { id: 'e33', firstName: 'Yuna', lastName: 'Park', email: 'yuna.park@example.com', status: 'active', teamId: 'team-log' },
  { id: 'e34', firstName: 'André', lastName: 'Dubois', email: 'andre.d@example.com', status: 'active', teamId: 'team-log' },
  { id: 'e35', firstName: 'Miriam', lastName: 'Goldstein', email: 'miriam.g@example.com', status: 'pending', teamId: 'team-log' },
  { id: 'e36', firstName: 'Tomasz', lastName: 'Wiśniewski', email: 'tomasz.w@example.com', status: 'pending', teamId: 'team-log' },
  { id: 'e37', firstName: 'Camille', lastName: 'Laurent', email: 'camille.l@example.com', status: 'pending', teamId: 'team-log' },
  { id: 'e38', firstName: 'Bongani', lastName: 'Dlamini', email: 'bongani.d@example.com', status: 'active', teamId: 'team-log' },
  { id: 'e39', firstName: 'Mei', lastName: 'Lin', email: 'mei.lin@example.com', status: 'active', teamId: 'team-log' },
  { id: 'e40', firstName: 'Rafael', lastName: 'Santos', email: 'rafael.s@example.com', status: 'inactive', teamId: 'team-log' },
]

const M: Shift = { start: '06:00', end: '14:00', location: 'Warehouse A' }
const A: Shift = { start: '14:00', end: '22:00', location: 'Warehouse B' }
const D: Shift = { start: '08:00', end: '16:00', location: 'Production Hall' }

const BASE_PATTERNS: (Shift | null)[][] = [
  [M, M, null, M, M, M, null],
  [A, A, A, null, A, null, null],
  [M, null, M, M, M, M, null],
  [D, D, D, D, null, null, null],
  [A, A, null, A, A, A, null],
  [M, M, M, null, M, null, null],
  [D, null, D, D, D, null, null],
  [M, M, M, M, null, null, null],
  [A, A, A, null, A, null, null],
  [M, null, M, M, M, M, null],
  [D, D, null, D, D, D, null],
  [M, M, M, M, null, M, null],
  [A, null, A, A, A, null, null],
  [D, D, D, null, D, null, null],
  [M, M, null, M, M, null, null],
  [A, A, A, A, null, null, null],
  [M, null, M, M, M, M, null],
  [D, D, null, D, D, null, null],
  [M, M, M, null, M, null, null],
  [A, A, A, A, A, null, null],
  [M, null, M, M, null, M, null],
  [D, D, D, null, D, D, null],
  [A, A, null, A, A, null, null],
  [M, M, M, M, null, null, null],
  [D, null, D, D, D, null, null],
  [A, A, A, null, A, A, null],
  [M, M, null, M, M, M, null],
  [D, D, D, D, null, null, null],
  [A, null, A, A, A, null, null],
  [M, M, M, null, M, null, null],
  [D, D, null, D, D, D, null],
  [A, A, A, A, null, null, null],
  [M, null, M, M, M, null, null],
  [D, D, D, null, D, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [A, A, null, A, A, null, null],
  [M, M, M, M, null, null, null],
  [null, null, null, null, null, null, null],
]

function buildShiftsForWeek(pattern: (Shift | null)[], weekOffset: number): Record<string, Shift | null> {
  const days = getWeekDays(weekOffset)
  const result: Record<string, Shift | null> = {}
  days.forEach((day, i) => { result[day.date] = pattern[i] ?? null })
  return result
}

export function buildInitialSchedule(): Record<string, Record<string, Shift | null>> {
  const data: Record<string, Record<string, Shift | null>> = {}
  const DATES = getWeekDays(0).map(d => d.date)
  employees.forEach((emp, i) => {
    const pattern = BASE_PATTERNS[i] ?? DATES.map(() => null)
    data[emp.id] = buildShiftsForWeek(pattern, 0)
  })
  return data
}

const DATES_0 = getWeekDays(0).map(d => d.date)

export const schedules = employees.map((emp, i) => {
  const pattern = BASE_PATTERNS[i] ?? DATES_0.map(() => null)
  const shifts: Record<string, Shift | null> = {}
  DATES_0.forEach((date, j) => { shifts[date] = pattern[j] ?? null })
  return { employeeId: emp.id, shifts }
})

export const tasks: Task[] = [
  { id: 't1', name: 'Pack orders', type: 'goal', target: 120, unit: 'orders' },
  { id: 't2', name: 'Clean Zone A', type: 'task' },
  { id: 't3', name: 'Inventory Zone B', type: 'task' },
  { id: 't4', name: 'Prepare workstations', type: 'task' },
  { id: 't5', name: 'Load truck #4', type: 'goal', target: 40, unit: 'pallets' },
  { id: 't6', name: 'Quality inspection', type: 'task' },
  { id: 't7', name: 'Sort returns', type: 'goal', target: 80, unit: 'items' },
]

export const taskAssignments: TaskAssignment[] = [
  { taskId: 't1', employeeId: 'e01', status: 'pending', current: 83, date: TODAY },
  { taskId: 't1', employeeId: 'e06', status: 'pending', current: 91, date: TODAY },
  { taskId: 't1', employeeId: 'e08', status: 'pending', current: 67, date: TODAY },
  { taskId: 't1', employeeId: 'e11', status: 'pending', current: 112, date: TODAY },
  { taskId: 't1', employeeId: 'e15', status: 'pending', current: 78, date: TODAY },
  { taskId: 't1', employeeId: 'e19', status: 'pending', current: 95, date: TODAY },
  { taskId: 't1', employeeId: 'e24', status: 'pending', current: 44, date: TODAY },
  { taskId: 't1', employeeId: 'e27', status: 'pending', current: 108, date: TODAY },
  { taskId: 't1', employeeId: 'e33', status: 'pending', current: 120, date: TODAY },
  { taskId: 't1', employeeId: 'e39', status: 'pending', current: 55, date: TODAY },
  { taskId: 't2', employeeId: 'e03', status: 'completed', date: TODAY },
  { taskId: 't2', employeeId: 'e13', status: 'completed', date: TODAY },
  { taskId: 't2', employeeId: 'e21', status: 'pending', date: TODAY },
  { taskId: 't2', employeeId: 'e25', status: 'pending', date: TODAY },
  { taskId: 't3', employeeId: 'e01', status: 'pending', date: TODAY },
  { taskId: 't3', employeeId: 'e10', status: 'pending', date: TODAY },
  { taskId: 't3', employeeId: 'e17', status: 'completed', date: TODAY },
  { taskId: 't4', employeeId: 'e04', status: 'completed', date: TODAY },
  { taskId: 't4', employeeId: 'e09', status: 'completed', date: TODAY },
  { taskId: 't4', employeeId: 'e12', status: 'completed', date: TODAY },
  { taskId: 't4', employeeId: 'e18', status: 'completed', date: TODAY },
  { taskId: 't4', employeeId: 'e22', status: 'pending', date: TODAY },
  { taskId: 't5', employeeId: 'e02', status: 'pending', current: 28, date: TODAY },
  { taskId: 't5', employeeId: 'e05', status: 'pending', current: 35, date: TODAY },
  { taskId: 't5', employeeId: 'e07', status: 'pending', current: 40, date: TODAY },
  { taskId: 't5', employeeId: 'e14', status: 'pending', current: 22, date: TODAY },
  { taskId: 't5', employeeId: 'e20', status: 'pending', current: 40, date: TODAY },
  { taskId: 't5', employeeId: 'e26', status: 'pending', current: 31, date: TODAY },
  { taskId: 't5', employeeId: 'e32', status: 'pending', current: 40, date: TODAY },
  { taskId: 't5', employeeId: 'e38', status: 'pending', current: 18, date: TODAY },
  { taskId: 't6', employeeId: 'e16', status: 'pending', date: TODAY },
  { taskId: 't6', employeeId: 'e23', status: 'completed', date: TODAY },
  { taskId: 't6', employeeId: 'e29', status: 'pending', date: TODAY },
  { taskId: 't7', employeeId: 'e30', status: 'pending', current: 52, date: TODAY },
  { taskId: 't7', employeeId: 'e34', status: 'pending', current: 61, date: TODAY },
  { taskId: 't7', employeeId: 'e39', status: 'pending', current: 48, date: TODAY },
]
