import { useState, useRef, useEffect } from 'react'
import {
  employees, tasks, taskAssignments, schedules, teams as defaultTeams,
  initialWorkAreas, initialShiftTemplates, initialTaskTemplates,
  getWeekDays, getWeekLabel, buildInitialSchedule, TODAY,
  type Employee, type TaskAssignment, type TaskType, type Shift,
  type WorkArea, type ShiftTemplate, type TaskTemplate, type TaskTemplateItem,
  type Team,
} from './data'

// ─── Types ────────────────────────────────────────────────────────────────────────

type Screen = 'auth' | 'manager-onboard' | 'manager-setup' | 'employee-onboard' | 'manager' | 'employee'
type ManagerTab = 'dashboard' | 'employees' | 'schedule' | 'tasks' | 'settings'
type EmployeeTab = 'today' | 'schedule' | 'history' | 'profile'
type SettingsSection = 'organization' | 'teams' | 'work-areas' | 'shift-templates' | 'task-templates' | 'profile' | 'billing'

// ─── Icons ────────────────────────────────────────────────────────────────────────

const Ic = {
  Grid: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  People: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Cal: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  Task: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  History: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Check: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  X: ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Plus: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  ChevLeft: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  ChevRight: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
  Copy: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  Edit: ({ size = 15 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Search: ({ size = 15 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Alert: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Mail: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
  Dots: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>,
  Trash: ({ size = 15 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  LayoutList: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="M13 7h8M13 12h8M3 17h18M3 21h18"/></svg>,
  LayoutGrid: ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  ArrowLeft: ({ size = 18 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
}

function Logo({ size = 7 }: { size?: number }) {
  const px = size * 4
  return (
    <div className={`w-${size} h-${size} bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
      <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="white">
        <rect x="3" y="5" width="18" height="2" rx="1"/>
        <rect x="3" y="11" width="13" height="2" rx="1"/>
        <rect x="3" y="17" width="9" height="2" rx="1"/>
      </svg>
    </div>
  )
}

// ─── Design System ────────────────────────────────────────────────────────────────

function Btn({ children, variant = 'primary', onClick, className = '', disabled = false, size = 'md', type = 'button' }: {
  children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  onClick?: () => void; className?: string; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; type?: 'button' | 'submit'
}) {
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium rounded-xl cursor-pointer select-none border border-transparent whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1'
  const sizes = { sm: 'px-3 py-2 text-xs min-h-[36px]', md: 'px-4 py-2.5 text-sm min-h-[44px]', lg: 'px-5 py-3.5 text-sm min-h-[52px]' }
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border-gray-200 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return (
    <button type={type} className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

function Badge({ children, variant = 'neutral', className = '' }: {
  children: React.ReactNode
  variant?: 'active' | 'pending' | 'inactive' | 'completed' | 'neutral' | 'trial' | 'danger' | 'info' | 'warning'
  className?: string
}) {
  const variants = {
    active: 'bg-green-50 text-green-800 border border-green-200',
    pending: 'bg-amber-50 text-amber-800 border border-amber-200',
    inactive: 'bg-gray-100 text-gray-500 border border-gray-200',
    completed: 'bg-green-50 text-green-800 border border-green-200',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
    trial: 'bg-blue-50 text-blue-700 border border-blue-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  }
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>
}

function StatusBadge({ status }: { status: 'active' | 'pending' | 'inactive' }) {
  const cfg = { active: { label: 'Active', dot: 'bg-green-500', v: 'active' as const }, pending: { label: 'Pending', dot: 'bg-amber-500', v: 'pending' as const }, inactive: { label: 'Inactive', dot: 'bg-gray-400', v: 'inactive' as const } }
  const { label, dot, v } = cfg[status]
  return <Badge variant={v}><span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true"/>{label}</Badge>
}

function Avatar({ firstName, lastName, size = 'md' }: { firstName: string; lastName: string; size?: 'xs' | 'sm' | 'md' | 'lg' }) {
  const palette = ['bg-blue-100 text-blue-700', 'bg-violet-100 text-violet-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700', 'bg-rose-100 text-rose-700', 'bg-cyan-100 text-cyan-700']
  const color = palette[(firstName.charCodeAt(0) + lastName.charCodeAt(0)) % palette.length]
  const sizes = { xs: 'w-7 h-7 text-[10px]', sm: 'w-9 h-9 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-16 h-16 text-xl' }
  return <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}>{firstName[0]}{lastName[0]}</div>
}

function Field({ label, type = 'text', placeholder, value, onChange, required, helper, disabled, className = '', inputMode }: {
  label?: string; type?: string; placeholder?: string; value: string; onChange?: (v: string) => void
  required?: boolean; helper?: string; disabled?: boolean; className?: string; inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      <input type={type} inputMode={inputMode} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} disabled={disabled}
        className={`w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-h-[44px] ${disabled ? 'opacity-60 cursor-default' : ''}`} />
      {helper && <p className="mt-1 text-xs text-gray-400">{helper}</p>}
    </div>
  )
}

function Sel({ label, value, onChange, children, required, className = '' }: {
  label?: string; value: string; onChange: (v: string) => void; children: React.ReactNode; required?: boolean; className?: string
}) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-h-[44px]">
        {children}
      </select>
    </div>
  )
}

function ProgressBar({ current, total, size = 'md' }: { current: number; total: number; size?: 'sm' | 'md' }) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="font-mono text-sm font-medium text-gray-900">{current} / {total}</span>
        <span className="font-mono text-xs text-gray-400">{pct}%</span>
      </div>
      <div className={`${size === 'sm' ? 'h-1' : 'h-1.5'} bg-gray-100 rounded-full overflow-hidden`} role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }}/>
      </div>
    </div>
  )
}

// Toast notification
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
      <Ic.Check size={14}/>{message}
    </div>
  )
}

// Generic dialog modal (desktop-first; centered)
function Modal({ title, children, onClose, width = 'max-w-md' }: { title: string; children: React.ReactNode; onClose: () => void; width?: string }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}/>
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${width} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close"><Ic.X/></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

// Bottom sheet — slides up from bottom, uses 100dvh safe
function Sheet({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', h)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', h) }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-t-3xl shadow-2xl w-full max-h-[85dvh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close"><Ic.X size={18}/></button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 safe-area-bottom">{children}</div>
      </div>
    </div>
  )
}

// Action sheet — simple option list (iOS-style)
function ActionSheet({ title, options, onClose }: { title?: string; options: { label: string; onClick: () => void; destructive?: boolean }[]; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', h)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', h) }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative space-y-2">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {title && <p className="text-xs font-semibold text-gray-400 text-center pt-4 px-5 pb-2">{title}</p>}
          {options.map((opt, i) => (
            <button key={i} onClick={() => { opt.onClick(); onClose() }}
              className={`w-full text-sm font-medium py-4 px-5 border-t border-gray-100 first:border-0 hover:bg-gray-50 text-left min-h-[52px] ${opt.destructive ? 'text-red-600' : 'text-gray-900'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full bg-white rounded-2xl text-sm font-semibold text-gray-700 py-4 hover:bg-gray-50 min-h-[52px] shadow-xl">
          Cancel
        </button>
      </div>
    </div>
  )
}

function ConfirmDialog({ title, description, confirmLabel, onConfirm, onCancel, danger = false }: {
  title: string; description: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void; danger?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCancel}/>
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
        <div className="flex gap-3 justify-end">
          <Btn variant="outline" onClick={onCancel}>Cancel</Btn>
          <Btn variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Btn>
        </div>
      </div>
    </div>
  )
}

function WeekNav({ offset, setOffset, label }: { offset: number; setOffset: (n: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setOffset(offset - 1)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Previous week"><Ic.ChevLeft/></button>
      <span className="text-sm font-semibold text-gray-800 min-w-[160px] sm:min-w-[200px] text-center">{label}</span>
      <button onClick={() => setOffset(offset + 1)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Next week"><Ic.ChevRight/></button>
      {offset !== 0 && <button onClick={() => setOffset(0)} className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-xl px-3 min-h-[36px]">Today</button>}
    </div>
  )
}

function DayPills({ days, selectedIndex, onSelect }: { days: ReturnType<typeof getWeekDays>; selectedIndex: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 px-1 -mx-1" style={{ scrollbarWidth: 'none' }}>
      {days.map((day, i) => {
        const isToday = day.date === TODAY
        const active = selectedIndex === i
        return (
          <button key={day.date} onClick={() => onSelect(i)}
            className={`flex-shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border min-w-[56px] min-h-[60px] transition-all ${active ? 'border-blue-500 bg-blue-600 text-white' : isToday ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-600 hover:border-gray-200'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wide">{day.label}</span>
            <span className={`text-lg font-bold leading-tight ${active ? 'text-white' : ''}`}>{day.short.split(' ')[1]}</span>
          </button>
        )
      })}
    </div>
  )
}

// ─── Manager Quick Action Bar ────────────────────────────────────────────────────

type QuickActionCallbacks = {
  onAddTask?: () => void
  onAddShift?: () => void
  onTemplate?: () => void
}

function ManagerQuickActionBar({ tab, callbacks }: { tab: ManagerTab; callbacks: QuickActionCallbacks }) {
  // Not shown on Employees or Settings
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

// ─── Auth ─────────────────────────────────────────────────────────────────────────

function AuthScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [role, setRole] = useState<'manager' | 'employee'>('manager')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [lang, setLang] = useState('en')
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = () => {
    if (mode === 'login') navigate(role === 'manager' ? 'manager' : 'employee')
    else navigate(role === 'manager' ? 'manager-onboard' : 'employee-onboard')
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex flex-col justify-between w-[400px] flex-shrink-0 bg-[#090e1a] text-white p-10">
        <div>
          <div className="flex items-center gap-2.5 mb-16"><Logo size={8}/><span className="text-base font-semibold tracking-tight">Workday</span></div>
          <p className="text-3xl font-semibold leading-tight mb-10">Plan the work.<br/>Show the work.<br/>Do the work.<br/>See the progress.</p>
          <div className="space-y-3">
            {['Manage 40 employees faster than a spreadsheet', 'Schedules, tasks & goals in one place', 'Simple enough for every frontline worker'].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center flex-shrink-0"><Ic.Check size={10}/></div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600">14-day free trial</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden"><Logo size={7}/><span className="font-semibold tracking-tight">Workday</span></div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="text-sm text-gray-400 mb-6">{mode === 'login' ? 'Sign in to continue.' : 'Start your 14-day free trial.'}</p>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
            {(['manager', 'employee'] as const).map(r => (
              <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
                {r === 'manager' ? 'Manager' : 'Employee'}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {mode === 'signup' && (
              <>
                <Field label="First name" value={firstName} onChange={setFirstName} placeholder="Anna" required/>
                <Field label="Last name" value={lastName} onChange={setLastName} placeholder="Kowalska" required/>
              </>
            )}
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" required/>
            <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required/>
            {mode === 'signup' && (
              <>
                <Field label="Confirm password" type="password" value={confirmPwd} onChange={setConfirmPwd} placeholder="••••••••" required/>
                <Sel label="Language" value={lang} onChange={setLang}>
                  <option value="en">English</option><option value="pl">Polski</option><option value="es">Español</option>
                </Sel>
                <label className="flex items-start gap-3 cursor-pointer py-1">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600"/>
                  <span className="text-sm text-gray-600 leading-snug">I agree to the <a href="#" className="text-blue-600 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 font-medium">Privacy Policy</a></span>
                </label>
              </>
            )}
            <Btn variant="primary" size="lg" onClick={handleSubmit} className="w-full" disabled={mode === 'signup' && !agreed}>
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </Btn>
          </div>

          <div className="mt-5 text-center">
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-sm text-gray-400 hover:text-gray-900">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <span className="text-blue-600 font-medium">{mode === 'login' ? 'Sign up free' : 'Sign in'}</span>
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Jump to demo</p>
            <div className="flex gap-2">
              <button onClick={() => navigate('manager')} className="flex-1 text-xs text-center bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-3 rounded-xl border border-gray-200 min-h-[44px]">Manager →</button>
              <button onClick={() => navigate('employee')} className="flex-1 text-xs text-center bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-3 rounded-xl border border-gray-200 min-h-[44px]">Employee →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Onboarding ───────────────────────────────────────────────────────────────────

function ManagerOnboard({ navigate }: { navigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'form' | 'code'>('form')
  const [orgName, setOrgName] = useState('')
  const [country, setCountry] = useState('PL')
  const [lang, setLang] = useState('en')
  const [copied, setCopied] = useState(false)
  const ORG_CODE = 'WD-7K4P2'

  if (step === 'code') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><Ic.Check size={28}/></div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{orgName || 'Your org'} is ready</h1>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">Share this code with your employees so they can request access.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Organization code</p>
            <p className="text-4xl font-mono font-bold text-gray-900 tracking-[0.15em] mb-4">{ORG_CODE}</p>
            <button onClick={() => { navigator.clipboard?.writeText(ORG_CODE); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="flex items-center gap-2 mx-auto text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-xl px-4 min-h-[44px]">
              <Ic.Copy size={13}/>{copied ? '✓ Copied' : 'Copy code'}
            </button>
          </div>
          <Btn variant="primary" size="lg" onClick={() => navigate('manager-setup')} className="w-full">Set up your organization →</Btn>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8"><Logo size={7}/><span className="font-semibold tracking-tight">Workday</span></div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create your organization</h1>
        <p className="text-sm text-gray-400 mb-6">Set up your workspace to start managing your team.</p>
        <div className="space-y-4">
          <Field label="Organization name" value={orgName} onChange={setOrgName} placeholder="ABC Logistics" required/>
          <Sel label="Country" value={country} onChange={setCountry} required>
            <option value="PL">Poland</option><option value="DE">Germany</option><option value="ES">Spain</option><option value="FR">France</option><option value="GB">United Kingdom</option><option value="US">United States</option>
          </Sel>
          <Sel label="Default language" value={lang} onChange={setLang}>
            <option value="en">English</option><option value="pl">Polski</option><option value="es">Español</option>
          </Sel>
          <Btn variant="primary" size="lg" onClick={() => setStep('code')} className="w-full" disabled={!orgName}>Create organization</Btn>
        </div>
      </div>
    </div>
  )
}

function ManagerSetup({ navigate }: { navigate: (s: Screen) => void }) {
  const steps = [
    { label: 'Create organization', sub: 'Done — your org code is WD-7K4P2', required: true, done: true },
    { label: 'Add employees', sub: 'Invite employees or share your org code', required: true, done: false },
    { label: 'Create teams', sub: 'Group employees into teams', required: false, done: false },
    { label: 'Add work areas', sub: 'Define locations where shifts take place', required: false, done: false },
    { label: 'Build your first schedule', sub: 'Plan the week ahead for your team', required: true, done: false },
    { label: 'Assign first work', sub: 'Give your team tasks and goals', required: true, done: false },
  ]
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8"><Logo size={7}/><span className="font-semibold tracking-tight">Workday</span></div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Set up your workday</h1>
        <p className="text-sm text-gray-400 mb-6">Complete these steps to get your team running.</p>
        <div className="space-y-2.5 mb-6">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${step.done ? 'border-green-100 bg-green-50/50' : 'border-gray-100'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${step.done ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step.done ? <Ic.Check size={14}/> : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-semibold ${step.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{step.label}</p>
                  {!step.required && !step.done && <span className="text-[10px] font-medium text-gray-400 border border-gray-200 rounded-full px-1.5 py-0.5">Optional</span>}
                </div>
                <p className="text-xs text-gray-400">{step.sub}</p>
              </div>
              {!step.done && (
                <div className="flex flex-col gap-1 items-end flex-shrink-0">
                  <Btn variant="primary" size="sm" onClick={() => navigate('manager')}>Start</Btn>
                  {!step.required && <button onClick={() => {}} className="text-[10px] text-gray-400 hover:text-gray-600">Skip</button>}
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => navigate('manager')} className="w-full text-sm text-gray-400 hover:text-gray-700 text-center min-h-[44px]">Skip setup and go to dashboard →</button>
      </div>
    </div>
  )
}

function EmployeeOnboard({ navigate }: { navigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'enter' | 'confirm' | 'pending'>('enter')
  const [code, setCode] = useState('')

  if (step === 'pending') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l3 3"/></svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Request sent</h1>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">Your request to join <strong className="text-gray-800">ABC Logistics</strong> has been sent. A manager needs to approve it.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-left">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-0.5">Status</p>
            <p className="text-sm text-amber-800 font-medium">Waiting for manager approval</p>
          </div>
          <Btn variant="primary" size="lg" onClick={() => navigate('employee')} className="w-full">Continue to app</Btn>
        </div>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Join organization</h1>
          <p className="text-sm text-gray-400 mb-6">Code: <span className="font-mono font-semibold text-gray-800">{code}</span></p>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"><span className="text-sm font-bold text-blue-700">AL</span></div>
              <div><p className="font-semibold text-gray-900 text-sm">ABC Logistics</p><p className="text-xs text-gray-400">Logistics · Warsaw, Poland</p></div>
            </div>
          </div>
          <div className="flex gap-3">
            <Btn variant="outline" onClick={() => setStep('enter')} className="flex-1">Back</Btn>
            <Btn variant="primary" onClick={() => setStep('pending')} className="flex-1">Request access</Btn>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8"><Logo size={7}/><span className="font-semibold tracking-tight">Workday</span></div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Join an organization</h1>
        <p className="text-sm text-gray-400 mb-6">Enter the code your manager shared with you.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Organization code <span className="text-red-500">*</span></label>
            <input type="text" placeholder="WD-7K4P2" value={code} onChange={e => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-4 border border-gray-200 rounded-2xl font-mono text-2xl text-center text-gray-900 placeholder-gray-300 tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength={8}/>
          </div>
          <Btn variant="primary" size="lg" onClick={() => setStep('confirm')} className="w-full" disabled={code.length < 4}>Find organization</Btn>
        </div>
      </div>
    </div>
  )
}

// ─── Manager Navigation ───────────────────────────────────────────────────────────

function NavItems({ tab, setTab, navigate, onItemClick }: { tab: ManagerTab; setTab: (t: ManagerTab) => void; navigate: (s: Screen) => void; onItemClick?: () => void }) {
  const navGroups = [
    { label: 'Work', items: [
      { id: 'dashboard' as const, label: 'Dashboard', icon: <Ic.Grid/> },
      { id: 'employees' as const, label: 'Employees', icon: <Ic.People/> },
      { id: 'schedule' as const, label: 'Schedule', icon: <Ic.Cal/> },
      { id: 'tasks' as const, label: 'Tasks & Goals', icon: <Ic.Task/> },
    ]},
    { label: 'Manage', items: [
      { id: 'settings' as const, label: 'Settings', icon: <Ic.Settings/> },
    ]},
  ]
  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-4" aria-label="Main navigation">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">{group.label}</p>
            {group.items.map(item => (
              <button key={item.id} onClick={() => { setTab(item.id); onItemClick?.() }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[44px] ${tab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                aria-current={tab === item.id ? 'page' : undefined}>
                {item.icon}{item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar firstName="Alex" lastName="Manager" size="sm"/>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-900 truncate">Alex Manager</p>
            <p className="text-[11px] text-gray-400 truncate">ABC Logistics</p>
          </div>
        </div>
        <button onClick={() => navigate('auth')} className="w-full flex items-center gap-2 px-2 py-2 text-xs text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-50 mt-1 min-h-[44px]">
          <Ic.Logout/>Sign out
        </button>
      </div>
    </>
  )
}

function ManagerSidebar({ tab, setTab, navigate }: { tab: ManagerTab; setTab: (t: ManagerTab) => void; navigate: (s: Screen) => void }) {
  return (
    <aside className="hidden lg:flex w-56 flex-shrink-0 border-r border-gray-100 flex-col bg-white">
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-gray-100">
        <Logo size={7}/><span className="font-semibold tracking-tight text-sm text-gray-900">Workday</span>
      </div>
      <div className="mx-3 mt-3 px-3 py-2.5 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-xs font-semibold text-blue-700">14-day free trial</p>
        <p className="text-[11px] text-blue-500 mt-0.5">10 days remaining</p>
      </div>
      <NavItems tab={tab} setTab={setTab} navigate={navigate}/>
    </aside>
  )
}

function MobileTopBar({ setTab, navigate, onOpenDrawer, hamburgerRef }: { tab: ManagerTab; setTab: (t: ManagerTab) => void; navigate: (s: Screen) => void; onOpenDrawer: () => void; hamburgerRef: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <div className="lg:hidden flex items-center justify-between px-4 border-b border-gray-100 bg-white flex-shrink-0 sticky top-0 z-30 safe-area-top" style={{ height: 'calc(56px + env(safe-area-inset-top))' }}>
      <button ref={hamburgerRef} onClick={onOpenDrawer} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Open navigation menu" aria-haspopup="dialog">
        <Ic.Menu/>
      </button>
      <div className="flex items-center gap-2"><Logo size={6}/><span className="font-semibold tracking-tight text-sm text-gray-900">Workday</span></div>
      <button onClick={() => setTab('settings')} className="min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Settings / Profile">
        <Avatar firstName="Alex" lastName="Manager" size="xs"/>
      </button>
    </div>
  )
}

function MobileNavDrawer({ tab, setTab, navigate, open, onClose, triggerRef }: { tab: ManagerTab; setTab: (t: ManagerTab) => void; navigate: (s: Screen) => void; open: boolean; onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null> }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      triggerRef?.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [open, triggerRef])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true"/>
      {/* Use 100dvh for the drawer height */}
      <div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white flex flex-col shadow-2xl" style={{ height: '100dvh' }}>
        <div className="flex items-center justify-between px-5 border-b border-gray-100 safe-area-top" style={{ minHeight: '56px' }}>
          <div className="flex items-center gap-2"><Logo size={7}/><span className="font-semibold tracking-tight text-sm text-gray-900">Workday</span></div>
          <button ref={closeRef} onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close navigation menu">
            <Ic.X size={18}/>
          </button>
        </div>
        <div className="mx-3 mt-3 px-3 py-2.5 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs font-semibold text-blue-700">14-day free trial · 10 days remaining</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavItems tab={tab} setTab={setTab} navigate={navigate} onItemClick={onClose}/>
        </div>
      </div>
    </div>
  )
}

// ─── Manager Dashboard ────────────────────────────────────────────────────────────

function ManagerDashboard({ setTab, localAssignments, scheduleData, empStatuses, quickActions }: {
  setTab: (t: ManagerTab) => void
  localAssignments: typeof taskAssignments
  scheduleData: Record<string, Record<string, Shift | null>>
  empStatuses: Record<string, Employee['status']>
  quickActions: QuickActionCallbacks
}) {
  const getStatus = (e: Employee) => empStatuses[e.id] ?? e.status
  const active = employees.filter(e => getStatus(e) === 'active')
  const pending = employees.filter(e => getStatus(e) === 'pending')
  const todayWorking = active.filter(e => scheduleData[e.id]?.[TODAY] != null)
  const offToday = active.length - todayWorking.length
  const allTodayAsgn = localAssignments.filter(a => a.date === TODAY)
  const completedCount = allTodayAsgn.filter(a => a.status === 'completed').length
  const goalRows = allTodayAsgn.filter(a => { const t = tasks.find(x => x.id === a.taskId); return t?.type === 'goal' && t.target && a.current !== undefined })
  const goalPct = goalRows.length ? Math.round(goalRows.reduce((sum, a) => { const t = tasks.find(x => x.id === a.taskId)!; return sum + Math.min(100, ((a.current ?? 0) / t.target!) * 100) }, 0) / goalRows.length) : 0
  const incompleteToday = active.filter(e => allTodayAsgn.some(a => a.employeeId === e.id && a.status === 'pending')).length
  const noTaskToday = todayWorking.filter(e => !allTodayAsgn.some(a => a.employeeId === e.id)).length

  const attention = [
    pending.length > 0 && { msg: `${pending.length} employee${pending.length > 1 ? 's' : ''} waiting for approval`, action: () => setTab('employees') },
    incompleteToday > 0 && { msg: `${incompleteToday} employees have incomplete tasks today`, action: () => setTab('tasks') },
    noTaskToday > 0 && { msg: `${noTaskToday} working employees have no tasks assigned`, action: () => setTab('tasks') },
  ].filter(Boolean) as { msg: string; action: () => void }[]

  const recentUpdates = allTodayAsgn.slice(0, 5).map(a => ({ emp: employees.find(e => e.id === a.employeeId), task: tasks.find(t => t.id === a.taskId), a })).filter(r => r.emp && r.task)

  return (
    // pb-[88px] on mobile accounts for the Quick Action Bar
    <div className="p-4 sm:p-8 pb-[88px] lg:pb-8 max-w-2xl">
      <div className="mb-6 mt-5 lg:mt-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Tuesday, August 18</p>
        <h1 className="text-2xl font-semibold text-gray-900">Good morning, Alex</h1>
      </div>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-4xl font-semibold text-gray-900">{todayWorking.length}</span>
        <span className="text-gray-400 text-sm">people working today</span>
        <span className="text-gray-200">·</span>
        <span className="text-lg font-medium text-gray-400">{offToday} off</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="border border-gray-100 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Tasks today</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-semibold font-mono text-gray-900">{completedCount}</span>
            <span className="text-sm text-gray-400">/ {allTodayAsgn.length} done</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${allTodayAsgn.length ? Math.round((completedCount / allTodayAsgn.length) * 100) : 0}%` }}/>
          </div>
        </div>
        <div className="border border-gray-100 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Goal progress</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-semibold font-mono text-gray-900">{goalPct}%</span>
            <span className="text-sm text-gray-400">average</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${goalPct}%` }}/>
          </div>
        </div>
      </div>

      {attention.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Needs attention</h2>
          <div className="space-y-2">
            {attention.map((item, i) => (
              <div key={i} className="flex items-center justify-between border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-3 min-w-0"><Ic.Alert size={15}/><span className="text-sm text-gray-800 truncate">{item.msg}</span></div>
                <button onClick={item.action} className="text-xs font-semibold text-blue-600 hover:text-blue-800 ml-4 flex-shrink-0 min-h-[44px] flex items-center">View →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Recent progress</h2>
        <div className="border border-gray-100 rounded-2xl divide-y divide-gray-50">
          {recentUpdates.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 min-h-[56px]">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar firstName={r.emp!.firstName} lastName={r.emp!.lastName} size="xs"/>
                <div className="min-w-0"><p className="text-sm font-medium text-gray-900 truncate">{r.emp!.firstName} {r.emp!.lastName}</p><p className="text-xs text-gray-400 truncate">{r.task!.name}</p></div>
              </div>
              <div className="flex-shrink-0 ml-4">
                {r.a.status === 'completed' ? <Badge variant="completed"><Ic.Check size={10}/>Done</Badge>
                  : r.task!.type === 'goal' && r.a.current !== undefined ? <span className="font-mono text-xs text-gray-600">{r.a.current} / {r.task!.target}</span>
                  : <Badge variant="pending">Pending</Badge>}
              </div>
            </div>
          ))}
          {recentUpdates.length === 0 && <div className="px-4 py-8 text-center text-sm text-gray-400">No progress updates yet today.</div>}
        </div>
      </div>
    </div>
  )
}

// ─── Manager Employees ────────────────────────────────────────────────────────────

function ManagerEmployees({ teamsList, empStatuses, setEmpStatuses, scheduleData, localAssignments }: {
  teamsList: Team[]; empStatuses: Record<string, Employee['status']>
  setEmpStatuses: (u: (p: Record<string, Employee['status']>) => Record<string, Employee['status']>) => void
  scheduleData: Record<string, Record<string, Shift | null>>; localAssignments: typeof taskAssignments
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')
  const [teamFilter, setTeamFilter] = useState('all')
  const [selected, setSelected] = useState<string[]>([])
  const [confirm, setConfirm] = useState<{ type: 'deactivate' | 'remove'; employee: Employee } | null>(null)
  const [showInvite, setShowInvite] = useState(false)
  const [showEdit, setShowEdit] = useState<Employee | null>(null)
  const [showDetail, setShowDetail] = useState<Employee | null>(null)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [codeCopied, setCodeCopied] = useState(false)
  const [editFirst, setEditFirst] = useState('')
  const [editLast, setEditLast] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editTeam, setEditTeam] = useState('')
  const [empOverrides, setEmpOverrides] = useState<Record<string, Partial<Employee>>>({})

  const getStatus = (e: Employee) => empStatuses[e.id] ?? e.status
  const getEmp = (e: Employee): Employee => ({ ...e, ...empOverrides[e.id] })

  const filtered = employees.filter(e => {
    const st = getStatus(e); const eff = getEmp(e)
    if (filter !== 'all' && st !== filter) return false
    if (teamFilter !== 'all' && eff.teamId !== teamFilter) return false
    if (search && !`${eff.firstName} ${eff.lastName} ${eff.email}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const allSelected = filtered.length > 0 && filtered.every(e => selected.includes(e.id))
  const toggleSelect = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const openEdit = (e: Employee) => {
    const eff = getEmp(e)
    setShowEdit(e); setEditFirst(eff.firstName); setEditLast(eff.lastName); setEditEmail(eff.email); setEditTeam(eff.teamId)
  }

  const saveEdit = () => {
    if (!showEdit) return
    setEmpOverrides(p => ({ ...p, [showEdit.id]: { firstName: editFirst, lastName: editLast, email: editEmail, teamId: editTeam } }))
    setShowEdit(null)
  }

  const getTodayShift = (id: string) => scheduleData[id]?.[TODAY] ?? null
  const getTodayProgress = (id: string) => {
    const a = localAssignments.filter(x => x.employeeId === id && x.date === TODAY)
    return a.length > 0 ? `${a.filter(x => x.status === 'completed').length} / ${a.length}` : null
  }

  const EditForm = () => (
    <div className="space-y-4">
      <Field label="First name" value={editFirst} onChange={setEditFirst} required/>
      <Field label="Last name" value={editLast} onChange={setEditLast} required/>
      <Field label="Email" type="email" value={editEmail} onChange={setEditEmail} required/>
      <Sel label="Team" value={editTeam} onChange={setEditTeam}>
        <option value="">No team</option>
        {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </Sel>
      <div className="flex gap-3 pt-1">
        <Btn variant="outline" onClick={() => { setShowEdit(null); setShowDetail(null) }} className="flex-1">Cancel</Btn>
        <Btn variant="primary" onClick={saveEdit} className="flex-1">Save changes</Btn>
      </div>
    </div>
  )

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-start justify-between mb-5 mt-5 lg:mt-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Employees</h1>
          <p className="text-sm text-gray-400">{employees.filter(e => getStatus(e) === 'active').length} active · {employees.filter(e => getStatus(e) === 'pending').length} pending</p>
        </div>
        <Btn variant="primary" size="sm" onClick={() => setShowInvite(true)}><Ic.Plus size={13}/>Invite</Btn>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Ic.Search/></span>
          <input type="search" placeholder="Search employees…" value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-3.5 py-3 border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"/>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex bg-gray-100 rounded-xl p-1 text-sm">
            {(['all', 'active', 'pending'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all min-h-[36px] ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
            ))}
          </div>
          <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-h-[44px]">
            <option value="all">All teams</option>
            {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>

      {/* Mobile list */}
      <div className="lg:hidden space-y-2">
        {filtered.map(emp => {
          const eff = getEmp(emp); const st = getStatus(emp); const shift = getTodayShift(emp.id); const team = teamsList.find(t => t.id === eff.teamId)
          return (
            <button key={emp.id} onClick={() => setShowDetail(emp)} className="w-full text-left flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors min-h-[76px]">
              <Avatar firstName={eff.firstName} lastName={eff.lastName} size="md"/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">{eff.firstName} {eff.lastName}</p>
                  <StatusBadge status={st}/>
                </div>
                <p className="text-xs text-gray-400">{team?.name ?? 'No team'}</p>
                {shift && <p className="text-xs font-mono text-gray-500 mt-0.5">{shift.start}–{shift.end}</p>}
              </div>
              <Ic.ChevRight size={16}/>
            </button>
          )
        })}
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No employees match.</div>}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block border border-gray-100 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 w-8">
                <input type="checkbox" checked={allSelected} onChange={() => setSelected(allSelected ? [] : filtered.map(e => e.id))} className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"/>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Team</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Today's shift</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Progress</th>
              <th className="px-4 py-3 w-52"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(emp => {
              const eff = getEmp(emp); const st = getStatus(emp); const shift = getTodayShift(emp.id); const progress = getTodayProgress(emp.id); const team = teamsList.find(t => t.id === eff.teamId); const isSel = selected.includes(emp.id)
              return (
                <tr key={emp.id} className={`hover:bg-gray-50 group ${isSel ? 'bg-blue-50/40' : ''}`}>
                  <td className="px-4 py-3"><input type="checkbox" checked={isSel} onChange={() => toggleSelect(emp.id)} className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"/></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar firstName={eff.firstName} lastName={eff.lastName} size="sm"/>
                      <div><p className="font-medium text-gray-900">{eff.firstName} {eff.lastName}</p><p className="text-xs text-gray-400">{eff.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={st}/></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{team?.name ?? '—'}</td>
                  <td className="px-4 py-3">{shift ? <span className="font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">{shift.start}–{shift.end}</span> : <span className="text-xs text-gray-300">Off</span>}</td>
                  <td className="px-4 py-3">{progress ? <span className="font-mono text-xs text-gray-600">{progress}</span> : <span className="text-xs text-gray-300">—</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      {st === 'pending' && <Btn variant="primary" size="sm" onClick={() => setEmpStatuses(p => ({ ...p, [emp.id]: 'active' }))}>Approve</Btn>}
                      {st === 'active' && <Btn variant="outline" size="sm" onClick={() => setConfirm({ type: 'deactivate', employee: emp })} className="text-amber-700 border-amber-200 hover:bg-amber-50">Deactivate</Btn>}
                      {st === 'inactive' && <Btn variant="outline" size="sm" onClick={() => setEmpStatuses(p => ({ ...p, [emp.id]: 'active' }))}>Reactivate</Btn>}
                      <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 min-w-[36px] min-h-[36px] flex items-center justify-center" onClick={() => openEdit(emp)}><Ic.Edit size={14}/></button>
                      <Btn variant="ghost" size="sm" onClick={() => setConfirm({ type: 'remove', employee: emp })} className="text-red-500 hover:text-red-700 hover:bg-red-50">Remove</Btn>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">No employees match.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-3">
          <span className="text-sm font-medium text-gray-300">{selected.length} selected</span>
          <div className="w-px h-5 bg-gray-700"/>
          <button onClick={() => { selected.forEach(id => setEmpStatuses(p => ({ ...p, [id]: 'active' }))); setSelected([]) }} className="text-sm font-medium hover:text-blue-300">Approve</button>
          <button onClick={() => setSelected([])} className="text-sm font-medium text-gray-400 hover:text-white">Clear</button>
        </div>
      )}

      {showDetail && (() => {
        const eff = getEmp(showDetail); const st = getStatus(showDetail); const shift = getTodayShift(showDetail.id); const progress = getTodayProgress(showDetail.id); const team = teamsList.find(t => t.id === eff.teamId)
        return (
          <Sheet title={`${eff.firstName} ${eff.lastName}`} onClose={() => setShowDetail(null)}>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar firstName={eff.firstName} lastName={eff.lastName} size="lg"/>
                <div><StatusBadge status={st}/><p className="text-sm text-gray-400 mt-1">{eff.email}</p></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-sm text-gray-500">Team</span><span className="text-sm font-medium text-gray-900">{team?.name ?? 'No team'}</span></div>
                <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-sm text-gray-500">Today's shift</span><span className="text-sm font-mono font-medium text-gray-900">{shift ? `${shift.start}–${shift.end}` : 'Off'}</span></div>
                <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-sm text-gray-500">Today's progress</span><span className="text-sm font-mono font-medium text-gray-900">{progress ?? '—'}</span></div>
              </div>
              <div className="space-y-2 pt-2">
                <Btn variant="primary" className="w-full" onClick={() => { openEdit(showDetail); setShowDetail(null) }}>Edit employee</Btn>
                {st === 'pending' && <Btn variant="outline" className="w-full" onClick={() => { setEmpStatuses(p => ({ ...p, [showDetail.id]: 'active' })); setShowDetail(null) }}>Approve</Btn>}
                {st === 'active' && <Btn variant="outline" className="w-full text-amber-700 border-amber-200" onClick={() => { setConfirm({ type: 'deactivate', employee: showDetail }); setShowDetail(null) }}>Deactivate</Btn>}
                {st === 'inactive' && <Btn variant="outline" className="w-full" onClick={() => { setEmpStatuses(p => ({ ...p, [showDetail.id]: 'active' })); setShowDetail(null) }}>Reactivate</Btn>}
                <Btn variant="ghost" className="w-full text-red-500" onClick={() => { setConfirm({ type: 'remove', employee: showDetail }); setShowDetail(null) }}>Remove employee</Btn>
              </div>
            </div>
          </Sheet>
        )
      })()}

      {confirm && (
        <ConfirmDialog
          title={confirm.type === 'deactivate' ? `Deactivate ${confirm.employee.firstName}?` : `Remove ${confirm.employee.firstName}?`}
          description={confirm.type === 'deactivate' ? `${confirm.employee.firstName} ${confirm.employee.lastName} will lose access. Their schedule and task history will be preserved.` : `This will permanently remove ${confirm.employee.firstName} ${confirm.employee.lastName}. This cannot be undone.`}
          confirmLabel={confirm.type === 'deactivate' ? 'Deactivate' : 'Remove'}
          danger={confirm.type === 'remove'}
          onConfirm={() => { if (confirm.type === 'deactivate') setEmpStatuses(p => ({ ...p, [confirm.employee.id]: 'inactive' })); setConfirm(null) }}
          onCancel={() => setConfirm(null)}
        />
      )}

      {showInvite && (
        <Modal title="Invite employee" onClose={() => setShowInvite(false)}>
          <div className="space-y-4">
            <Field label="Email" type="email" value={inviteEmail} onChange={setInviteEmail} placeholder="employee@company.com"/>
            <Field label="Name (optional)" value={inviteName} onChange={setInviteName} placeholder="Anna Kowalska"/>
            <Btn variant="primary" className="w-full" onClick={() => setShowInvite(false)}><Ic.Mail size={14}/>Send invitation</Btn>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Or share org code</p>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                <span className="font-mono font-bold text-xl tracking-widest text-gray-900 flex-1">WD-7K4P2</span>
                <button onClick={() => { navigator.clipboard?.writeText('WD-7K4P2'); setCodeCopied(true); setTimeout(() => setCodeCopied(false), 2000) }} className="text-sm font-medium text-blue-600 flex items-center gap-1.5 min-h-[44px]">
                  <Ic.Copy size={13}/>{codeCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showEdit && (
        <Modal title="Edit employee" onClose={() => setShowEdit(null)}>
          <EditForm/>
        </Modal>
      )}
    </div>
  )
}

// ─── Manager Schedule ─────────────────────────────────────────────────────────────

function ManagerSchedule({ shiftTemplatesList, workAreasList, teamsList, scheduleData, setScheduleData, quickActions }: {
  shiftTemplatesList: ShiftTemplate[]; workAreasList: WorkArea[]; teamsList: Team[]
  scheduleData: Record<string, Record<string, Shift | null>>
  setScheduleData: (u: (p: Record<string, Record<string, Shift | null>>) => Record<string, Record<string, Shift | null>>) => void
  quickActions: QuickActionCallbacks
}) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [dayIndex, setDayIndex] = useState(1)
  const [search, setSearch] = useState('')
  const [teamFilter, setTeamFilter] = useState('all')
  const [selectedEmps, setSelectedEmps] = useState<string[]>([])
  const [editCell, setEditCell] = useState<{ empId: string; date: string } | null>(null)
  const [editShift, setEditShift] = useState<Shift>({ start: '06:00', end: '14:00', location: '' })
  const [showBulkSheet, setShowBulkSheet] = useState(false)
  const [bulkTemplate, setBulkTemplate] = useState(shiftTemplatesList[0]?.id ?? '')
  const [bulkArea, setBulkArea] = useState(workAreasList.find(w => w.active)?.name ?? '')
  const [showCopyWeekConfirm, setShowCopyWeekConfirm] = useState(false)
  const [showCopyDay, setShowCopyDay] = useState(false)
  const [copyDayFrom, setCopyDayFrom] = useState('')
  const [copyDayTo, setCopyDayTo] = useState('')
  const [showDayMenu, setShowDayMenu] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [pendingTeamFilter, setPendingTeamFilter] = useState('all')
  const [selectionMode, setSelectionMode] = useState(false)
  const [showAddShiftForm, setShowAddShiftForm] = useState(false)
  const [addShiftEmpId, setAddShiftEmpId] = useState('')
  const [addShiftStart, setAddShiftStart] = useState('06:00')
  const [addShiftEnd, setAddShiftEnd] = useState('14:00')
  const [addShiftArea, setAddShiftArea] = useState('')
  const [addShiftNote, setAddShiftNote] = useState('')
  const [confirmOverwrite, setConfirmOverwrite] = useState<{ type: 'week' | 'day'; label: string } | null>(null)
  const dayMenuRef = useRef<HTMLDivElement>(null)

  const weekDays = getWeekDays(weekOffset)
  const weekLabel = getWeekLabel(weekOffset)

  const activeEmps = employees.filter(e => {
    if (e.status !== 'active') return false
    if (teamFilter !== 'all' && e.teamId !== teamFilter) return false
    if (search && !`${e.firstName} ${e.lastName}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const getShift = (empId: string, date: string): Shift | null => scheduleData[empId]?.[date] ?? null
  const selectedDay = weekDays[dayIndex]

  const openEditShift = (empId: string, date: string) => {
    const s = getShift(empId, date)
    setEditShift(s ? { ...s } : { start: '06:00', end: '14:00', location: workAreasList.find(w => w.active)?.name ?? '' })
    setEditCell({ empId, date })
  }

  const saveShift = () => {
    if (!editCell) return
    setScheduleData(prev => ({ ...prev, [editCell.empId]: { ...(prev[editCell.empId] || {}), [editCell.date]: { ...editShift } } }))
    setEditCell(null)
  }

  const clearShift = () => {
    if (!editCell) return
    setScheduleData(prev => ({ ...prev, [editCell.empId]: { ...(prev[editCell.empId] || {}), [editCell.date]: null } }))
    setEditCell(null)
  }

  const copyPreviousWeek = () => {
    if (hasAnyShiftOnWeek()) { setConfirmOverwrite({ type: 'week', label: weekLabel }); setShowCopyWeekConfirm(false); return }
    doCopyPreviousWeek()
    setShowCopyWeekConfirm(false)
  }

  const executeCopyDay = () => {
    if (!copyDayFrom || !copyDayTo) return
    if (hasAnyShiftOnDay(copyDayTo)) {
      setConfirmOverwrite({ type: 'day', label: weekDays.find(d => d.date === copyDayTo)?.fullLabel ?? copyDayTo })
      return
    }
    setScheduleData(prev => {
      const next = { ...prev }
      employees.filter(e => e.status === 'active').forEach(emp => {
        next[emp.id] = { ...(next[emp.id] || {}), [copyDayTo]: next[emp.id]?.[copyDayFrom] ?? null }
      })
      return next
    })
    setShowCopyDay(false)
  }

  const confirmExecuteCopyDay = () => {
    setScheduleData(prev => {
      const next = { ...prev }
      employees.filter(e => e.status === 'active').forEach(emp => {
        next[emp.id] = { ...(next[emp.id] || {}), [copyDayTo]: next[emp.id]?.[copyDayFrom] ?? null }
      })
      return next
    })
    setConfirmOverwrite(null); setShowCopyDay(false)
  }

  const applyBulkShift = () => {
    const tpl = shiftTemplatesList.find(t => t.id === bulkTemplate)
    if (!tpl) return
    selectedEmps.forEach(empId => {
      setScheduleData(prev => ({ ...prev, [empId]: { ...(prev[empId] || {}), [selectedDay.date]: { start: tpl.start, end: tpl.end, location: bulkArea } } }))
    })
    setShowBulkSheet(false); setSelectedEmps([]); setSelectionMode(false)
  }

  const toggleSelectEmp = (id: string) => setSelectedEmps(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const allSelected = activeEmps.length > 0 && activeEmps.every(e => selectedEmps.includes(e.id))

  const openAddShiftForm = () => {
    setAddShiftEmpId(activeEmps[0]?.id ?? '')
    const tpl = shiftTemplatesList.find(t => t.active)
    setAddShiftStart(tpl?.start ?? '06:00')
    setAddShiftEnd(tpl?.end ?? '14:00')
    setAddShiftArea(workAreasList.find(w => w.active)?.name ?? '')
    setAddShiftNote('')
    setShowAddShiftForm(true)
  }

  const saveAddShift = () => {
    if (!addShiftEmpId) return
    setScheduleData(prev => ({ ...prev, [addShiftEmpId]: { ...(prev[addShiftEmpId] || {}), [selectedDay.date]: { start: addShiftStart, end: addShiftEnd, location: addShiftArea, note: addShiftNote || undefined } } }))
    setShowAddShiftForm(false)
  }

  const hasAnyShiftOnDay = (date: string) => employees.some(e => scheduleData[e.id]?.[date] != null)
  const hasAnyShiftOnWeek = () => weekDays.some(d => hasAnyShiftOnDay(d.date))

  const doCopyPreviousWeek = () => {
    const prevDays = getWeekDays(weekOffset - 1)
    setScheduleData(prev => {
      const next = { ...prev }
      employees.filter(e => e.status === 'active').forEach(emp => {
        const empSched = { ...(next[emp.id] || {}) }
        prevDays.forEach((prevDay, i) => { empSched[weekDays[i].date] = empSched[prevDay.date] ?? null })
        next[emp.id] = empSched
      })
      return next
    })
    setConfirmOverwrite(null)
  }

  // Wire quickActions
  useEffect(() => {
    quickActions.onAddShift = openAddShiftForm
  })

  const ShiftEditorFields = () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Start</label>
          <input type="time" value={editShift.start} onChange={e => setEditShift(p => ({ ...p, start: e.target.value }))}
            className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">End</label>
          <input type="time" value={editShift.end} onChange={e => setEditShift(p => ({ ...p, end: e.target.value }))}
            className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/>
        </div>
      </div>
      <Sel label="Work area" value={editShift.location} onChange={v => setEditShift(p => ({ ...p, location: v }))}>
        <option value="">No area</option>
        {workAreasList.filter(w => w.active).map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
      </Sel>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Templates</p>
        <div className="grid grid-cols-2 gap-2">
          {shiftTemplatesList.filter(t => t.active).map(t => (
            <button key={t.id} onClick={() => setEditShift(p => ({ ...p, start: t.start, end: t.end }))}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-xs text-left hover:border-blue-300 hover:bg-blue-50 transition-colors min-h-[44px]">
              <p className="font-medium text-gray-800">{t.name}</p>
              <p className="text-gray-400 font-mono">{t.start}–{t.end}</p>
            </button>
          ))}
        </div>
      </div>
      <Field label="Note (optional)" value={editShift.note ?? ''} onChange={v => setEditShift(p => ({ ...p, note: v }))} placeholder="e.g. Supervisor shift"/>
    </div>
  )

  const MobileSchedule = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Schedule</h1>
          <div className="relative" ref={dayMenuRef}>
            <button onClick={() => setShowDayMenu(!showDayMenu)} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Schedule actions">
              <Ic.Dots size={18}/>
            </button>
            {showDayMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 min-w-[180px] py-1.5">
                <button onClick={() => { setShowCopyWeekConfirm(true); setShowDayMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 min-h-[44px]"><Ic.Copy size={14}/>Copy previous week</button>
                <button onClick={() => { setCopyDayFrom(selectedDay.date); setCopyDayTo(''); setShowCopyDay(true); setShowDayMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 min-h-[44px]"><Ic.Copy size={14}/>Copy day</button>
                <button onClick={() => { setScheduleData(prev => { const next = { ...prev }; employees.filter(e => e.status === 'active').forEach(emp => { next[emp.id] = { ...(next[emp.id] || {}), [selectedDay.date]: null } }); return next }); setShowDayMenu(false) }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 min-h-[44px]"><Ic.X size={14}/>Clear day</button>
              </div>
            )}
          </div>
        </div>
        <WeekNav offset={weekOffset} setOffset={o => { setWeekOffset(o); setDayIndex(0) }} label={weekLabel}/>
        <DayPills days={weekDays} selectedIndex={dayIndex} onSelect={setDayIndex}/>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Ic.Search size={14}/></span>
            <input type="search" placeholder="Search employees…" value={search} onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"/>
          </div>
          <button onClick={() => { setPendingTeamFilter(teamFilter); setShowMobileFilters(true) }}
            className={`flex items-center gap-1.5 px-4 py-2.5 border rounded-xl text-sm font-medium min-h-[44px] transition-colors ${teamFilter !== 'all' ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            Filters{teamFilter !== 'all' && ' ·'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[88px]">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{selectedDay.fullLabel} · {selectedDay.short}</p>
          {selectionMode ? (
            <div className="flex items-center gap-2">
              {selectedEmps.length > 0 && <span className="text-xs text-gray-500">{selectedEmps.length} sel.</span>}
              <button onClick={() => setSelectedEmps(allSelected ? [] : activeEmps.map(e => e.id))} className="text-xs font-medium text-blue-600 hover:text-blue-800 min-h-[36px] px-2">
                {allSelected ? 'Deselect all' : 'Select all'}
              </button>
              <button onClick={() => { setSelectionMode(false); setSelectedEmps([]) }} className="text-xs text-gray-400 hover:text-gray-600 min-h-[36px] px-1">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setSelectionMode(true)} className="text-xs font-medium text-gray-500 hover:text-gray-800 min-h-[36px] px-2 border border-gray-200 rounded-xl">Select</button>
          )}
        </div>
        <div className="divide-y divide-gray-50">
          {activeEmps.map(emp => {
            const shift = getShift(emp.id, selectedDay.date)
            const isSel = selectedEmps.includes(emp.id)
            const team = teamsList.find(t => t.id === emp.teamId)
            return (
              <div key={emp.id} className={`flex items-center px-4 py-3.5 gap-3 min-h-[72px] ${isSel ? 'bg-blue-50/40' : 'hover:bg-gray-50/50'}`}>
                {selectionMode && <input type="checkbox" checked={isSel} onChange={() => toggleSelectEmp(emp.id)} className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer flex-shrink-0"/>}
                <Avatar firstName={emp.firstName} lastName={emp.lastName} size="sm"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{emp.firstName} {emp.lastName}</p>
                  <p className="text-xs text-gray-400">{team?.name ?? 'No team'}</p>
                </div>
                <button onClick={() => selectionMode ? toggleSelectEmp(emp.id) : openEditShift(emp.id, selectedDay.date)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium min-h-[44px] min-w-[80px] transition-all ${shift ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-dashed border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500'}`}>
                  {shift ? `${shift.start}–${shift.end}` : '+ Add'}
                </button>
              </div>
            )
          })}
          {activeEmps.length === 0 && <div className="px-4 py-12 text-center text-gray-400 text-sm">No employees match.</div>}
        </div>
      </div>
    </div>
  )

  const DesktopSchedule = () => (
    <div className="flex flex-col h-full">
      <div className="px-8 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Schedule</h1>
          <WeekNav offset={weekOffset} setOffset={setWeekOffset} label={weekLabel}/>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Ic.Search size={14}/></span>
            <input type="search" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option value="all">All teams</option>
            {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <Btn variant="outline" size="sm" onClick={() => setShowCopyWeekConfirm(true)}><Ic.Copy size={13}/>Copy prev week</Btn>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-20 bg-white">
            <tr className="border-b border-gray-100">
              <th className="sticky left-0 z-30 bg-white w-8 px-3 py-3 border-r border-gray-100">
                <input type="checkbox" checked={allSelected} onChange={() => setSelectedEmps(allSelected ? [] : activeEmps.map(e => e.id))} className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"/>
              </th>
              <th className="sticky left-8 z-30 bg-white w-48 text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-r border-gray-100">Employee</th>
              {weekDays.map(day => {
                const isToday = day.date === TODAY
                return (
                  <th key={day.date} className={`text-center px-1 py-3 min-w-[108px] ${isToday ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-center justify-center gap-1">
                      <div>
                        <div className={`text-xs font-semibold ${isToday ? 'text-blue-700' : 'text-gray-500'}`}>{day.label}</div>
                        <div className={`text-[11px] ${isToday ? 'text-blue-500' : 'text-gray-400'}`}>{day.short}</div>
                      </div>
                      <button onClick={() => { setCopyDayFrom(day.date); setCopyDayTo(''); setShowCopyDay(true) }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-500 min-w-[28px] min-h-[28px] flex items-center justify-center" title="Day actions">
                        <Ic.Dots size={12}/>
                      </button>
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activeEmps.map(emp => {
              const isSel = selectedEmps.includes(emp.id)
              return (
                <tr key={emp.id} className={`hover:bg-gray-50/50 group ${isSel ? 'bg-blue-50/30' : ''}`}>
                  <td className="sticky left-0 z-10 bg-white px-3 py-2 border-r border-gray-50">
                    <input type="checkbox" checked={isSel} onChange={() => toggleSelectEmp(emp.id)} className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"/>
                  </td>
                  <td className={`sticky left-8 z-10 bg-white px-4 py-2 border-r border-gray-50 ${isSel ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex items-center gap-2.5">
                      <Avatar firstName={emp.firstName} lastName={emp.lastName} size="xs"/>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{emp.firstName} {emp.lastName}</p>
                        <p className="text-[11px] text-gray-400 truncate">{teamsList.find(t => t.id === emp.teamId)?.name ?? '—'}</p>
                      </div>
                    </div>
                  </td>
                  {weekDays.map(day => {
                    const shift = getShift(emp.id, day.date); const isToday = day.date === TODAY
                    return (
                      <td key={day.date} className={`px-1 py-2 text-center ${isToday ? 'bg-blue-50/30' : ''}`}>
                        <button onClick={() => openEditShift(emp.id, day.date)}
                          className={`w-full px-1 py-2 rounded-lg text-xs transition-all ${shift ? 'bg-blue-600 text-white hover:bg-blue-700 font-medium' : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500 border border-dashed border-gray-200'}`}>
                          {shift ? `${shift.start}–${shift.end}` : '+'}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {activeEmps.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400 text-sm">No employees match.</td></tr>}
          </tbody>
        </table>
      </div>
      {selectedEmps.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-3">
          <span className="text-sm font-medium text-gray-300">{selectedEmps.length} selected</span>
          <div className="w-px h-5 bg-gray-700"/>
          <button onClick={() => setShowBulkSheet(true)} className="text-sm font-medium hover:text-blue-300">Apply shift</button>
          <button onClick={() => setSelectedEmps([])} className="text-sm font-medium text-gray-400 hover:text-white">Clear</button>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden"><MobileSchedule/></div>
      <div className="hidden lg:flex flex-col flex-1 overflow-hidden"><DesktopSchedule/></div>

      {selectionMode && selectedEmps.length > 0 && (
        <div className="lg:hidden fixed bottom-[64px] left-0 right-0 z-25 bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
          <Btn variant="primary" onClick={() => setShowBulkSheet(true)} className="flex-1">{selectedEmps.length} selected · Apply shift</Btn>
          <Btn variant="outline" onClick={() => { setSelectionMode(false); setSelectedEmps([]) }}>Cancel</Btn>
        </div>
      )}

      {showMobileFilters && (
        <Sheet title="Filters" onClose={() => setShowMobileFilters(false)}>
          <div className="space-y-4">
            <Sel label="Team" value={pendingTeamFilter} onChange={setPendingTeamFilter}>
              <option value="all">All teams</option>
              {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Sel>
            <div className="flex gap-3 pt-1">
              <Btn variant="outline" onClick={() => { setPendingTeamFilter('all'); setTeamFilter('all'); setShowMobileFilters(false) }} className="flex-1">Reset</Btn>
              <Btn variant="primary" onClick={() => { setTeamFilter(pendingTeamFilter); setShowMobileFilters(false) }} className="flex-1">Apply filters</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {editCell && (
        <>
          <div className="lg:hidden">
            <Sheet title={getShift(editCell.empId, editCell.date) ? 'Edit shift' : 'Add shift'} onClose={() => setEditCell(null)}>
              <ShiftEditorFields/>
              <div className="flex gap-3 mt-4">
                {getShift(editCell.empId, editCell.date) && <Btn variant="ghost" onClick={clearShift} className="text-red-500 hover:bg-red-50">Remove</Btn>}
                <div className="flex-1"/>
                <Btn variant="outline" onClick={() => setEditCell(null)}>Cancel</Btn>
                <Btn variant="primary" onClick={saveShift}>Save</Btn>
              </div>
            </Sheet>
          </div>
          <div className="hidden lg:block">
            <Modal title={getShift(editCell.empId, editCell.date) ? 'Edit shift' : 'Add shift'} onClose={() => setEditCell(null)}>
              <ShiftEditorFields/>
              <div className="flex gap-3 mt-4">
                {getShift(editCell.empId, editCell.date) && <Btn variant="ghost" onClick={clearShift} className="text-red-500 hover:bg-red-50">Remove shift</Btn>}
                <div className="flex-1"/>
                <Btn variant="outline" onClick={() => setEditCell(null)}>Cancel</Btn>
                <Btn variant="primary" onClick={saveShift}>Save shift</Btn>
              </div>
            </Modal>
          </div>
        </>
      )}

      {showBulkSheet && (
        <Sheet title={`Apply shift to ${selectedEmps.length} employees`} onClose={() => setShowBulkSheet(false)}>
          <div className="space-y-4">
            <Sel label="Shift template" value={bulkTemplate} onChange={setBulkTemplate}>
              {shiftTemplatesList.filter(t => t.active).map(t => <option key={t.id} value={t.id}>{t.name} · {t.start}–{t.end}</option>)}
            </Sel>
            <Sel label="Work area" value={bulkArea} onChange={setBulkArea}>
              <option value="">No area</option>
              {workAreasList.filter(w => w.active).map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
            </Sel>
            <p className="text-xs text-gray-400">Applies to: <strong className="text-gray-700">{selectedDay.fullLabel}, {selectedDay.short}</strong></p>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowBulkSheet(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={applyBulkShift} className="flex-1">Apply shift</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showCopyDay && (
        <Sheet title="Copy day" onClose={() => setShowCopyDay(false)}>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Copy all shifts from <strong className="text-gray-800">{weekDays.find(d => d.date === copyDayFrom)?.fullLabel}</strong> to another day.</p>
            <Sel label="Copy to" value={copyDayTo} onChange={setCopyDayTo}>
              <option value="">Select a day…</option>
              {weekDays.filter(d => d.date !== copyDayFrom).map(d => <option key={d.date} value={d.date}>{d.fullLabel} ({d.short})</option>)}
            </Sel>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowCopyDay(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={executeCopyDay} disabled={!copyDayTo} className="flex-1">Copy</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showCopyWeekConfirm && (
        <ConfirmDialog title="Copy previous week?" description="This will overwrite any existing shifts this week." confirmLabel="Copy week" onConfirm={copyPreviousWeek} onCancel={() => setShowCopyWeekConfirm(false)}/>
      )}

      {confirmOverwrite && (
        <ConfirmDialog
          title={`Overwrite ${confirmOverwrite.type === 'week' ? 'existing shifts' : confirmOverwrite.label}?`}
          description={confirmOverwrite.type === 'week' ? `This week already has shifts. Copying the previous week will overwrite them.` : `${confirmOverwrite.label} already has shifts. Copying will overwrite them.`}
          confirmLabel="Overwrite"
          danger
          onConfirm={() => { if (confirmOverwrite.type === 'week') doCopyPreviousWeek(); else confirmExecuteCopyDay() }}
          onCancel={() => setConfirmOverwrite(null)}
        />
      )}

      {showAddShiftForm && (
        <Sheet title="Add shift" onClose={() => setShowAddShiftForm(false)}>
          <div className="space-y-4">
            <Sel label="Employee" value={addShiftEmpId} onChange={setAddShiftEmpId}>
              {activeEmps.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </Sel>
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <Ic.Cal/>
              <span className="text-sm font-medium text-blue-800">{selectedDay.fullLabel} · {selectedDay.short}</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Templates</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {shiftTemplatesList.filter(t => t.active).map(t => (
                  <button key={t.id} onClick={() => { setAddShiftStart(t.start); setAddShiftEnd(t.end) }}
                    className={`px-3 py-2.5 border rounded-xl text-xs text-left transition-colors min-h-[48px] ${addShiftStart === t.start && addShiftEnd === t.end ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-gray-400 font-mono">{t.start}–{t.end}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start</label>
                <input type="time" value={addShiftStart} onChange={e => setAddShiftStart(e.target.value)} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End</label>
                <input type="time" value={addShiftEnd} onChange={e => setAddShiftEnd(e.target.value)} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/>
              </div>
            </div>
            <Sel label="Work area" value={addShiftArea} onChange={setAddShiftArea}>
              <option value="">No area</option>
              {workAreasList.filter(w => w.active).map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
            </Sel>
            <Field label="Note (optional)" value={addShiftNote} onChange={setAddShiftNote} placeholder="e.g. Supervisor shift"/>
            <div className="flex gap-3 pt-1">
              <Btn variant="outline" onClick={() => setShowAddShiftForm(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={saveAddShift} disabled={!addShiftEmpId} className="flex-1">Add shift</Btn>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  )
}

// ─── Manager Tasks ────────────────────────────────────────────────────────────────

function ManagerTasks({ taskTemplatesList, shiftTemplatesList, teamsList, localAssignments, setLocalAssignments, quickActions }: {
  taskTemplatesList: TaskTemplate[]; shiftTemplatesList: ShiftTemplate[]; teamsList: Team[]
  localAssignments: typeof taskAssignments
  setLocalAssignments: (u: (p: typeof taskAssignments) => typeof taskAssignments) => void
  quickActions: QuickActionCallbacks
}) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [dayIndex, setDayIndex] = useState(1)
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')
  const [teamFilter, setTeamFilter] = useState('all')
  const [showCreate, setShowCreate] = useState(false)
  const [showBulkAssign, setShowBulkAssign] = useState(false)
  const [showApplyTemplate, setShowApplyTemplate] = useState(false)
  const [showApplyTemplateReview, setShowApplyTemplateReview] = useState(false)
  const [showEditProgress, setShowEditProgress] = useState<{ empId: string; taskId: string } | null>(null)
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskType, setNewTaskType] = useState<TaskType>('task')
  const [newTaskTarget, setNewTaskTarget] = useState('')
  const [newTaskUnit, setNewTaskUnit] = useState('')
  const [bulkTeam, setBulkTeam] = useState('all')
  const [bulkTaskId, setBulkTaskId] = useState(tasks[0]?.id ?? '')
  const [editValue, setEditValue] = useState('')
  const [applyTemplateId, setApplyTemplateId] = useState(taskTemplatesList[0]?.id ?? '')
  const [applyTeam, setApplyTeam] = useState('all')

  const weekDays = getWeekDays(weekOffset)
  const weekLabel = getWeekLabel(weekOffset)
  const selectedDay = weekDays[dayIndex]

  const activeEmps = employees.filter(e => {
    if (e.status !== 'active') return false
    if (teamFilter !== 'all' && e.teamId !== teamFilter) return false
    return true
  })

  const getAssignments = (empId: string, date: string) => localAssignments.filter(a => a.employeeId === empId && a.date === date)

  const createTask = () => {
    const id = `task-${Date.now()}`
    tasks.push({ id, name: newTaskName, type: newTaskType, target: newTaskTarget ? Number(newTaskTarget) : undefined, unit: newTaskUnit || undefined })
    setLocalAssignments(prev => {
      const empIds = bulkTeam === 'all' ? activeEmps.map(e => e.id) : activeEmps.filter(e => e.teamId === bulkTeam).map(e => e.id)
      return [...prev, ...empIds.map(empId => ({ taskId: id, employeeId: empId, status: 'pending' as const, date: selectedDay.date, current: newTaskType === 'goal' ? 0 : undefined }))]
    })
    setNewTaskName(''); setNewTaskType('task'); setNewTaskTarget(''); setNewTaskUnit('')
    setShowCreate(false)
  }

  const bulkAssign = () => {
    const empIds = bulkTeam === 'all' ? activeEmps.map(e => e.id) : activeEmps.filter(e => e.teamId === bulkTeam).map(e => e.id)
    setLocalAssignments(prev => {
      const next = [...prev]
      empIds.forEach(empId => { if (!next.some(a => a.taskId === bulkTaskId && a.employeeId === empId && a.date === selectedDay.date)) next.push({ taskId: bulkTaskId, employeeId: empId, status: 'pending', date: selectedDay.date }) })
      return next
    })
    setShowBulkAssign(false)
  }

  const reviewApplyTemplate = () => setShowApplyTemplateReview(true)

  const applyTemplate = () => {
    const tpl = taskTemplatesList.find(t => t.id === applyTemplateId)
    if (!tpl) return
    const empIds = applyTeam === 'all' ? activeEmps.map(e => e.id) : activeEmps.filter(e => e.teamId === applyTeam).map(e => e.id)
    setLocalAssignments(prev => {
      const next = [...prev]
      tpl.items.forEach(item => {
        const taskId = `tpl-${item.id}-${Date.now()}-${Math.random()}`
        tasks.push({ id: taskId, name: item.name, type: item.type, target: item.target, unit: item.unit })
        empIds.forEach(empId => next.push({ taskId, employeeId: empId, status: 'pending', date: selectedDay.date, current: item.type === 'goal' ? 0 : undefined }))
      })
      return next
    })
    setShowApplyTemplateReview(false)
    setShowApplyTemplate(false)
  }

  const saveProgress = () => {
    if (!showEditProgress) return
    setLocalAssignments(prev => prev.map(a => {
      if (a.taskId !== showEditProgress.taskId || a.employeeId !== showEditProgress.empId || a.date !== selectedDay.date) return a
      const task = tasks.find(t => t.id === a.taskId)
      if (task?.type === 'goal') return { ...a, current: Number(editValue) }
      return { ...a, status: editValue === 'completed' ? 'completed' : 'pending' }
    }))
    setShowEditProgress(null)
  }

  // Wire quick actions
  useEffect(() => {
    quickActions.onAddTask = () => setShowCreate(true)
  })

  const MobileTasks = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Tasks & Goals</h1>
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            <button onClick={() => setViewMode('day')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[36px] ${viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Day</button>
            <button onClick={() => setViewMode('week')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[36px] ${viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Week</button>
          </div>
        </div>
        <WeekNav offset={weekOffset} setOffset={o => { setWeekOffset(o); setDayIndex(0) }} label={weekLabel}/>
        {viewMode === 'day' && <DayPills days={weekDays} selectedIndex={dayIndex} onSelect={setDayIndex}/>}
        <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-h-[44px]">
          <option value="all">All teams</option>
          {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="flex-1 overflow-y-auto pb-[88px]">
        {viewMode === 'day' ? (
          <div>
            <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 sticky top-0 bg-white z-10">{selectedDay.fullLabel} · {selectedDay.short}</p>
            {activeEmps.map(emp => {
              const asgns = getAssignments(emp.id, selectedDay.date)
              const team = teamsList.find(t => t.id === emp.teamId)
              return (
                <div key={emp.id} className="border-b border-gray-50">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/50">
                    <Avatar firstName={emp.firstName} lastName={emp.lastName} size="xs"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{emp.firstName} {emp.lastName}</p>
                      <p className="text-xs text-gray-400">{team?.name ?? 'No team'}</p>
                    </div>
                  </div>
                  {asgns.length === 0 ? (
                    <p className="px-4 py-3 text-xs text-gray-300">No tasks assigned</p>
                  ) : asgns.map(a => {
                    const task = tasks.find(t => t.id === a.taskId)
                    if (!task) return null
                    return (
                      <button key={a.taskId} onClick={() => { setShowEditProgress({ empId: emp.id, taskId: a.taskId }); setEditValue(task.type === 'goal' ? String(a.current ?? 0) : a.status) }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left min-h-[56px]">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.type === 'goal' ? 'bg-blue-400' : 'bg-emerald-400'}`}/>
                          <span className="text-sm text-gray-900 truncate">{task.name}</span>
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          {a.status === 'completed' ? <Badge variant="completed"><Ic.Check size={10}/>Done</Badge>
                            : task.type === 'goal' && task.target ? <span className="font-mono text-xs text-gray-600">{a.current ?? 0}/{task.target}</span>
                            : <Badge variant="pending">Pending</Badge>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        ) : (
          // Mobile week view: vertical day-by-day, no horizontal scroll
          <div className="divide-y divide-gray-100">
            {weekDays.map(day => {
              const isToday = day.date === TODAY
              const dayAssignments: { emp: Employee; asgns: typeof taskAssignments }[] = activeEmps
                .map(emp => ({ emp, asgns: getAssignments(emp.id, day.date) }))
                .filter(r => r.asgns.length > 0)
              return (
                <div key={day.date}>
                  <div className={`px-4 py-2.5 sticky top-0 z-10 ${isToday ? 'bg-blue-50 border-b border-blue-100' : 'bg-gray-50 border-b border-gray-100'}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isToday ? 'text-blue-700' : 'text-gray-500'}`}>{day.fullLabel} · {day.short}</p>
                  </div>
                  {dayAssignments.length === 0 ? (
                    <p className="px-4 py-3 text-xs text-gray-300">No tasks assigned</p>
                  ) : dayAssignments.map(({ emp, asgns }) => (
                    <div key={emp.id} className="border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-2.5 px-4 pt-3 pb-1">
                        <Avatar firstName={emp.firstName} lastName={emp.lastName} size="xs"/>
                        <p className="text-xs font-semibold text-gray-700">{emp.firstName} {emp.lastName}</p>
                      </div>
                      {asgns.map(a => {
                        const task = tasks.find(t => t.id === a.taskId); if (!task) return null
                        return (
                          <button key={a.taskId} onClick={() => { setShowEditProgress({ empId: emp.id, taskId: a.taskId }); setEditValue(task.type === 'goal' ? String(a.current ?? 0) : a.status) }}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 text-left min-h-[48px]">
                            <span className="text-sm text-gray-800 truncate flex-1">{task.name}</span>
                            <div className="ml-3 flex-shrink-0">
                              {a.status === 'completed' ? <Badge variant="completed"><Ic.Check size={10}/>Done</Badge>
                                : task.type === 'goal' && task.target ? <span className="font-mono text-xs text-gray-600">{a.current ?? 0}/{task.target}</span>
                                : <Badge variant="pending">Pending</Badge>}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  const DesktopTasks = () => (
    <div className="flex flex-col h-full">
      <div className="px-8 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-gray-900">Tasks & Goals</h1>
          <div className="flex items-center gap-2">
            <Btn variant="outline" size="sm" onClick={() => setShowApplyTemplate(true)}>Apply template</Btn>
            <Btn variant="outline" size="sm" onClick={() => setShowBulkAssign(true)}>Assign to team</Btn>
            <Btn variant="primary" size="sm" onClick={() => setShowCreate(true)}><Ic.Plus size={13}/>New task</Btn>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <WeekNav offset={weekOffset} setOffset={o => { setWeekOffset(o); setDayIndex(0) }} label={weekLabel}/>
            {viewMode === 'day' && (
              <div className="flex bg-gray-100 rounded-xl p-1 text-xs">
                {weekDays.map((day, i) => (
                  <button key={day.date} onClick={() => setDayIndex(i)} className={`px-3 py-1.5 rounded-lg font-medium transition-all min-h-[36px] ${dayIndex === i ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{day.label}</button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="all">All teams</option>
              {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button onClick={() => setViewMode('day')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[36px] flex items-center gap-1 ${viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}><Ic.LayoutList size={14}/>Day</button>
              <button onClick={() => setViewMode('week')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[36px] flex items-center gap-1 ${viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}><Ic.LayoutGrid size={14}/>Week</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {viewMode === 'day' ? (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Task / Goal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Progress</th>
                <th className="px-4 py-3 w-28"/>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activeEmps.map(emp => {
                const asgns = getAssignments(emp.id, selectedDay.date)
                if (asgns.length === 0) return (
                  <tr key={emp.id} className="hover:bg-gray-50 group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar firstName={emp.firstName} lastName={emp.lastName} size="sm"/>
                        <div><p className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</p><p className="text-xs text-gray-400">{teamsList.find(t => t.id === emp.teamId)?.name ?? '—'}</p></div>
                      </div>
                    </td>
                    <td colSpan={3} className="px-4 py-3 text-xs text-gray-300">No tasks assigned</td>
                  </tr>
                )
                return asgns.map((a, ai) => {
                  const task = tasks.find(t => t.id === a.taskId); if (!task) return null
                  return (
                    <tr key={`${emp.id}-${a.taskId}-${ai}`} className="hover:bg-gray-50 group">
                      {ai === 0 && <td className="px-4 py-3" rowSpan={asgns.length}>
                        <div className="flex items-center gap-3">
                          <Avatar firstName={emp.firstName} lastName={emp.lastName} size="sm"/>
                          <div><p className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</p><p className="text-xs text-gray-400">{teamsList.find(t => t.id === emp.teamId)?.name ?? '—'}</p></div>
                        </div>
                      </td>}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.type === 'goal' ? 'bg-blue-400' : 'bg-emerald-400'}`}/>
                          <span className="font-medium text-gray-900">{task.name}</span>
                          <Badge variant={task.type === 'goal' ? 'info' : 'neutral'}>{task.type}</Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {a.status === 'completed' ? <Badge variant="completed"><Ic.Check size={10}/>Done</Badge>
                          : task.type === 'goal' && task.target ? <div className="max-w-[140px]"><ProgressBar current={a.current ?? 0} total={task.target} size="sm"/></div>
                          : <Badge variant="pending">Pending</Badge>}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => { setShowEditProgress({ empId: emp.id, taskId: a.taskId }); setEditValue(task.type === 'goal' ? String(a.current ?? 0) : a.status) }}
                          className="opacity-0 group-hover:opacity-100 text-xs font-medium text-blue-600 hover:text-blue-800 transition-opacity">Edit</button>
                      </td>
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <tr>
                <th className="sticky left-0 bg-white w-48 text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-r border-gray-100">Employee</th>
                {weekDays.map(day => (
                  <th key={day.date} className={`text-center px-2 py-3 min-w-[100px] ${day.date === TODAY ? 'bg-blue-50' : ''}`}>
                    <div className={`text-xs font-semibold ${day.date === TODAY ? 'text-blue-700' : 'text-gray-500'}`}>{day.label}</div>
                    <div className={`text-[11px] ${day.date === TODAY ? 'text-blue-500' : 'text-gray-400'}`}>{day.short}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activeEmps.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50/50">
                  <td className="sticky left-0 bg-white px-4 py-2 border-r border-gray-50">
                    <div className="flex items-center gap-2.5">
                      <Avatar firstName={emp.firstName} lastName={emp.lastName} size="xs"/>
                      <div><p className="text-sm font-medium text-gray-900">{emp.firstName} {emp.lastName}</p><p className="text-[11px] text-gray-400">{teamsList.find(t => t.id === emp.teamId)?.name ?? '—'}</p></div>
                    </div>
                  </td>
                  {weekDays.map(day => {
                    const dayAsgns = getAssignments(emp.id, day.date); const done = dayAsgns.filter(a => a.status === 'completed').length
                    return (
                      <td key={day.date} className={`px-2 py-2 text-center ${day.date === TODAY ? 'bg-blue-50/30' : ''}`}>
                        {dayAsgns.length > 0 ? (
                          <div className={`mx-auto rounded-xl px-2 py-1.5 text-xs ${done === dayAsgns.length ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-gray-50 border border-gray-100 text-gray-500'}`}>
                            <div className="font-medium">{done}/{dayAsgns.length}</div>
                          </div>
                        ) : <span className="text-xs text-gray-200">—</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden"><MobileTasks/></div>
      <div className="hidden lg:flex flex-col flex-1 overflow-hidden"><DesktopTasks/></div>

      {showCreate && (
        <Sheet title="Create task or goal" onClose={() => setShowCreate(false)}>
          <div className="space-y-4">
            <Field label="Task name" value={newTaskName} onChange={setNewTaskName} placeholder="e.g. Pack orders" required/>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {(['task', 'goal'] as TaskType[]).map(t => (
                <button key={t} onClick={() => setNewTaskType(t)} className={`flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-all ${newTaskType === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{t}</button>
              ))}
            </div>
            {newTaskType === 'goal' && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Target" type="number" value={newTaskTarget} onChange={setNewTaskTarget} placeholder="120"/>
                <Field label="Unit" value={newTaskUnit} onChange={setNewTaskUnit} placeholder="orders"/>
              </div>
            )}
            <Sel label="Assign to" value={bulkTeam} onChange={setBulkTeam}>
              <option value="all">All active employees</option>
              {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Sel>
            <p className="text-xs text-gray-400">Date: <strong className="text-gray-700">{selectedDay.fullLabel}, {selectedDay.short}</strong></p>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={createTask} disabled={!newTaskName} className="flex-1">Create task</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showBulkAssign && (
        <Sheet title="Assign task to team" onClose={() => setShowBulkAssign(false)}>
          <div className="space-y-4">
            <Sel label="Task" value={bulkTaskId} onChange={setBulkTaskId}>
              {tasks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Sel>
            <Sel label="Assign to" value={bulkTeam} onChange={setBulkTeam}>
              <option value="all">All active employees</option>
              {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Sel>
            <p className="text-xs text-gray-400">Date: <strong className="text-gray-700">{selectedDay.fullLabel}, {selectedDay.short}</strong></p>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowBulkAssign(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={bulkAssign} className="flex-1">Assign</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showApplyTemplate && !showApplyTemplateReview && (
        <Sheet title="Apply task template" onClose={() => setShowApplyTemplate(false)}>
          <div className="space-y-4">
            <Sel label="Template" value={applyTemplateId} onChange={setApplyTemplateId}>
              {taskTemplatesList.map(t => <option key={t.id} value={t.id}>{t.name} ({t.items.length} tasks)</option>)}
            </Sel>
            {applyTemplateId && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tasks in template</p>
                {taskTemplatesList.find(t => t.id === applyTemplateId)?.items.map(item => (
                  <div key={item.id} className="flex items-center gap-2 py-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.type === 'goal' ? 'bg-blue-400' : 'bg-emerald-400'}`}/>
                    <span className="text-sm text-gray-700">{item.name}</span>
                    {item.target && <span className="text-xs text-gray-400 ml-auto">{item.target} {item.unit}</span>}
                  </div>
                ))}
              </div>
            )}
            <Sel label="Assign to" value={applyTeam} onChange={setApplyTeam}>
              <option value="all">All active employees</option>
              {teamsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Sel>
            <p className="text-xs text-gray-400">Date: <strong className="text-gray-700">{selectedDay.fullLabel}, {selectedDay.short}</strong></p>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowApplyTemplate(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={reviewApplyTemplate} className="flex-1">Review →</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showApplyTemplateReview && (() => {
        const tpl = taskTemplatesList.find(t => t.id === applyTemplateId)
        const empIds = applyTeam === 'all' ? activeEmps.map(e => e.id) : activeEmps.filter(e => e.teamId === applyTeam).map(e => e.id)
        const totalAssignments = (tpl?.items.length ?? 0) * empIds.length
        const teamLabel = applyTeam === 'all' ? 'All active employees' : teamsList.find(t => t.id === applyTeam)?.name ?? 'Team'
        return (
          <Sheet title="Review assignments" onClose={() => { setShowApplyTemplateReview(false); setShowApplyTemplate(false) }}>
            <div className="space-y-5">
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Template</span><span className="font-semibold text-gray-900">{tpl?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Employees</span><span className="font-semibold text-gray-900">{empIds.length} ({teamLabel})</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Tasks each</span><span className="font-semibold text-gray-900">{tpl?.items.length}</span></div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-3"><span className="text-gray-500">Total assignments</span><span className="font-bold text-blue-700 text-base">{totalAssignments}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-semibold text-gray-900">{selectedDay.fullLabel}, {selectedDay.short}</span></div>
              </div>
              <div className="flex gap-3">
                <Btn variant="outline" onClick={() => setShowApplyTemplateReview(false)} className="flex-1">← Back</Btn>
                <Btn variant="primary" onClick={applyTemplate} className="flex-1">Confirm</Btn>
              </div>
            </div>
          </Sheet>
        )
      })()}

      {showEditProgress && (() => {
        const a = localAssignments.find(x => x.taskId === showEditProgress.taskId && x.employeeId === showEditProgress.empId && x.date === selectedDay.date)
        const task = tasks.find(t => t.id === showEditProgress.taskId)
        const emp = employees.find(e => e.id === showEditProgress.empId)
        if (!a || !task || !emp) return null
        return (
          <Sheet title="Edit progress" onClose={() => setShowEditProgress(null)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <Avatar firstName={emp.firstName} lastName={emp.lastName} size="sm"/>
                <div><p className="font-medium text-gray-900 text-sm">{emp.firstName} {emp.lastName}</p><p className="text-xs text-gray-400">{task.name}</p></div>
              </div>
              {task.type === 'goal' ? (
                <div>
                  <Field label={`Progress (target: ${task.target} ${task.unit})`} type="number" value={editValue} onChange={setEditValue} placeholder={String(task.target)} inputMode="numeric"/>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <button onClick={() => setEditValue(String(Math.max(0, Number(editValue) - 1)))} className="w-12 h-12 rounded-full border border-gray-200 text-xl flex items-center justify-center hover:bg-gray-50">−</button>
                    <span className="font-mono text-2xl font-bold text-gray-900 min-w-[60px] text-center">{editValue}</span>
                    <button onClick={() => setEditValue(String(Math.min(task.target ?? Infinity, Number(editValue) + 1)))} className="w-12 h-12 rounded-full border border-gray-200 text-xl flex items-center justify-center hover:bg-gray-50">+</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  {(['pending', 'completed'] as const).map(s => (
                    <button key={s} onClick={() => setEditValue(s)} className={`flex-1 py-3 rounded-xl border text-sm font-medium capitalize transition-all min-h-[52px] ${editValue === s ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{s}</button>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                <Btn variant="outline" onClick={() => setShowEditProgress(null)} className="flex-1">Cancel</Btn>
                <Btn variant="primary" onClick={saveProgress} className="flex-1">Save</Btn>
              </div>
            </div>
          </Sheet>
        )
      })()}
    </div>
  )
}

// ─── Manager Settings ─────────────────────────────────────────────────────────────

function ManagerSettings({ teamsList, setTeamsList, workAreasList, setWorkAreasList, shiftTemplatesList, setShiftTemplatesList, taskTemplatesList, setTaskTemplatesList, setTab }: {
  teamsList: Team[]; setTeamsList: (u: (p: Team[]) => Team[]) => void
  workAreasList: WorkArea[]; setWorkAreasList: (u: (p: WorkArea[]) => WorkArea[]) => void
  shiftTemplatesList: ShiftTemplate[]; setShiftTemplatesList: (u: (p: ShiftTemplate[]) => ShiftTemplate[]) => void
  taskTemplatesList: TaskTemplate[]; setTaskTemplatesList: (u: (p: TaskTemplate[]) => TaskTemplate[]) => void
  setTab: (t: ManagerTab) => void
}) {
  const [section, setSection] = useState<SettingsSection>('organization')
  const [mobileShowSection, setMobileShowSection] = useState(false)

  const navGroups = [
    { label: 'Organization', items: [{ id: 'organization' as SettingsSection, label: 'Organization' }, { id: 'teams' as SettingsSection, label: 'Teams' }, { id: 'work-areas' as SettingsSection, label: 'Work areas' }] },
    { label: 'Templates', items: [{ id: 'shift-templates' as SettingsSection, label: 'Shift templates' }, { id: 'task-templates' as SettingsSection, label: 'Task templates' }] },
    { label: 'Account', items: [{ id: 'profile' as SettingsSection, label: 'Profile' }] },
    { label: 'Billing', items: [{ id: 'billing' as SettingsSection, label: 'Subscription' }] },
  ]

  const sectionLabel = navGroups.flatMap(g => g.items).find(i => i.id === section)?.label ?? 'Settings'

  const SectionContent = () => (
    <>
      {section === 'organization' && <SettingsOrganization/>}
      {section === 'teams' && <SettingsTeams teamsList={teamsList} setTeamsList={setTeamsList}/>}
      {section === 'work-areas' && <SettingsWorkAreas workAreasList={workAreasList} setWorkAreasList={setWorkAreasList}/>}
      {section === 'shift-templates' && <SettingsShiftTemplates shiftTemplatesList={shiftTemplatesList} setShiftTemplatesList={setShiftTemplatesList}/>}
      {section === 'task-templates' && <SettingsTaskTemplates taskTemplatesList={taskTemplatesList} setTaskTemplatesList={setTaskTemplatesList}/>}
      {section === 'profile' && <SettingsProfile/>}
      {section === 'billing' && <SettingsBilling/>}
    </>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex h-full">
        <div className="w-48 flex-shrink-0 border-r border-gray-100 py-6 px-3 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label} className="mb-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1.5">{group.label}</p>
              {group.items.map(item => (
                <button key={item.id} onClick={() => setSection(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[44px] ${section === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-8"><SectionContent/></div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden h-full overflow-y-auto">
        {!mobileShowSection ? (
          <div className="p-4 mt-5">
            <h1 className="text-2xl font-semibold text-gray-900 mb-5">Settings</h1>
            {navGroups.map(group => (
              <div key={group.label} className="mb-5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{group.label}</p>
                <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50">
                  {group.items.map(item => (
                    <button key={item.id} onClick={() => { setSection(item.id); setMobileShowSection(true) }}
                      className="w-full flex items-center justify-between px-4 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors text-left min-h-[52px]">
                      {item.label}<Ic.ChevRight size={16}/>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10 min-h-[52px]">
              <button onClick={() => setMobileShowSection(false)} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 min-h-[44px] px-1 rounded-xl">
                <Ic.ChevLeft size={16}/>Settings
              </button>
              <span className="text-sm font-semibold text-gray-900 ml-1">{sectionLabel}</span>
            </div>
            <div className="p-4"><SectionContent/></div>
          </div>
        )}
      </div>
    </>
  )
}

// ─── Settings Sections ────────────────────────────────────────────────────────────

function SettingsOrganization() {
  const [orgName, setOrgName] = useState('ABC Logistics')
  const [country, setCountry] = useState('PL')
  const [lang, setLang] = useState('en')
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Organization</h2>
      <p className="text-sm text-gray-400 mb-6">Basic settings for your organization.</p>
      <div className="space-y-4 mb-6">
        <Field label="Organization name" value={orgName} onChange={setOrgName} required/>
        <Sel label="Country" value={country} onChange={setCountry}>
          <option value="PL">Poland</option><option value="DE">Germany</option><option value="ES">Spain</option><option value="FR">France</option><option value="GB">United Kingdom</option><option value="US">United States</option>
        </Sel>
        <Sel label="Default language" value={lang} onChange={setLang}>
          <option value="en">English</option><option value="pl">Polski</option><option value="es">Español</option>
        </Sel>
        <Btn variant="primary" onClick={save}>{saved ? '✓ Saved' : 'Save changes'}</Btn>
      </div>
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Organization code</h3>
        <p className="text-xs text-gray-400 mb-3">Share this code with employees so they can request access.</p>
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
          <span className="font-mono font-bold text-xl tracking-widest text-gray-900 flex-1">WD-7K4P2</span>
          <button onClick={() => { navigator.clipboard?.writeText('WD-7K4P2'); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="text-sm font-medium text-blue-600 flex items-center gap-1.5 min-h-[44px]">
            <Ic.Copy size={13}/>{copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingsTeams({ teamsList, setTeamsList }: { teamsList: Team[]; setTeamsList: (u: (p: Team[]) => Team[]) => void }) {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<Team | null>(null)
  const [showDelete, setShowDelete] = useState<Team | null>(null)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState('blue')
  const [editName, setEditName] = useState('')
  const [editMembers, setEditMembers] = useState<string[]>([])

  const colors = ['blue', 'violet', 'emerald', 'amber', 'rose', 'cyan']
  const colorClasses: Record<string, string> = { blue: 'bg-blue-500', violet: 'bg-violet-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500', cyan: 'bg-cyan-500' }
  const memberCount = (teamId: string) => employees.filter(e => e.teamId === teamId).length

  const createTeam = () => {
    setTeamsList(p => [...p, { id: `team-${Date.now()}`, name: newName, color: newColor }])
    setShowCreate(false); setNewName('')
  }

  const saveEdit = () => {
    if (!showEdit) return
    setTeamsList(p => p.map(t => t.id === showEdit.id ? { ...t, name: editName } : t))
    setShowEdit(null)
  }

  const deleteTeam = () => {
    if (!showDelete) return
    setTeamsList(p => p.filter(t => t.id !== showDelete.id))
    setShowDelete(null)
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-xl font-semibold text-gray-900 mb-0.5">Teams</h2><p className="text-sm text-gray-400">Group employees into teams.</p></div>
        <Btn variant="primary" size="sm" onClick={() => { setNewName(''); setNewColor('blue'); setShowCreate(true) }}><Ic.Plus size={13}/>New team</Btn>
      </div>
      <div className="space-y-2">
        {teamsList.map(team => (
          <div key={team.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors min-h-[68px]">
            <div className={`w-3 h-3 rounded-full ${colorClasses[team.color] ?? 'bg-gray-400'} flex-shrink-0`}/>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{team.name}</p>
              <p className="text-xs text-gray-400">{memberCount(team.id)} member{memberCount(team.id) !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => { setShowEdit(team); setEditName(team.name); setEditMembers(employees.filter(e => e.teamId === team.id).map(e => e.id)) }} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.Edit size={14}/></button>
              <button onClick={() => setShowDelete(team)} className="p-2.5 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.Trash size={14}/></button>
            </div>
          </div>
        ))}
        {teamsList.length === 0 && <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl">No teams yet.</div>}
      </div>

      {showCreate && (
        <Sheet title="Create team" onClose={() => setShowCreate(false)}>
          <div className="space-y-4">
            <Field label="Team name" value={newName} onChange={setNewName} placeholder="e.g. Night crew" required/>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex gap-3">
                {colors.map(c => <button key={c} onClick={() => setNewColor(c)} className={`w-9 h-9 rounded-full ${colorClasses[c]} transition-all ${newColor === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'}`}/>)}
              </div>
            </div>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={createTeam} disabled={!newName} className="flex-1">Create</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showEdit && (
        <Sheet title="Edit team" onClose={() => setShowEdit(null)}>
          <div className="space-y-4">
            <Field label="Team name" value={editName} onChange={setEditName} required/>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Members ({editMembers.length})</p>
              <div className="max-h-52 overflow-y-auto space-y-1 border border-gray-100 rounded-2xl p-3">
                {employees.filter(e => e.status !== 'inactive').map(emp => (
                  <label key={emp.id} className="flex items-center gap-3 cursor-pointer py-2 min-h-[44px]">
                    <input type="checkbox" checked={editMembers.includes(emp.id)} onChange={e => setEditMembers(p => e.target.checked ? [...p, emp.id] : p.filter(x => x !== emp.id))} className="w-4 h-4 rounded border-gray-300 text-blue-600"/>
                    <Avatar firstName={emp.firstName} lastName={emp.lastName} size="xs"/>
                    <span className="text-sm text-gray-700">{emp.firstName} {emp.lastName}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Btn variant="ghost" onClick={() => setShowDelete(showEdit)} className="text-red-500 hover:bg-red-50">Delete</Btn>
              <div className="flex-1"/>
              <Btn variant="outline" onClick={() => setShowEdit(null)}>Cancel</Btn>
              <Btn variant="primary" onClick={saveEdit}>Save</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showDelete && <ConfirmDialog title={`Delete ${showDelete.name}?`} description="Employees will remain without a team assignment." confirmLabel="Delete team" danger onConfirm={deleteTeam} onCancel={() => setShowDelete(null)}/>}
    </div>
  )
}

function SettingsWorkAreas({ workAreasList, setWorkAreasList }: { workAreasList: WorkArea[]; setWorkAreasList: (u: (p: WorkArea[]) => WorkArea[]) => void }) {
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const create = () => { setWorkAreasList(p => [...p, { id: `wa-${Date.now()}`, name: newName, active: true }]); setNewName(''); setShowCreate(false) }
  const toggle = (id: string) => setWorkAreasList(p => p.map(w => w.id === id ? { ...w, active: !w.active } : w))
  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-xl font-semibold text-gray-900 mb-0.5">Work areas</h2><p className="text-sm text-gray-400">Locations where shifts take place.</p></div>
        <Btn variant="primary" size="sm" onClick={() => { setNewName(''); setShowCreate(true) }}><Ic.Plus size={13}/>New area</Btn>
      </div>
      <div className="space-y-2">
        {workAreasList.map(area => (
          <div key={area.id} className="flex items-center gap-4 px-4 py-3.5 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors min-h-[64px]">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${area.active ? 'bg-green-500' : 'bg-gray-300'}`}/>
            <p className={`flex-1 text-sm font-medium ${area.active ? 'text-gray-900' : 'text-gray-400'}`}>{area.name}</p>
            <Badge variant={area.active ? 'active' : 'inactive'}>{area.active ? 'Active' : 'Inactive'}</Badge>
            <button onClick={() => toggle(area.id)} className={`text-xs font-medium px-3 py-2 rounded-xl border transition-colors min-h-[40px] ${area.active ? 'text-amber-700 border-amber-200 hover:bg-amber-50' : 'text-blue-600 border-blue-200 hover:bg-blue-50'}`}>
              {area.active ? 'Deactivate' : 'Reactivate'}
            </button>
          </div>
        ))}
        {workAreasList.length === 0 && <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl">No work areas yet.</div>}
      </div>
      {showCreate && (
        <Sheet title="Add work area" onClose={() => setShowCreate(false)}>
          <div className="space-y-4">
            <Field label="Work area name" value={newName} onChange={setNewName} placeholder="e.g. Packing Zone C" required/>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={create} disabled={!newName} className="flex-1">Add area</Btn>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  )
}

function SettingsShiftTemplates({ shiftTemplatesList, setShiftTemplatesList }: { shiftTemplatesList: ShiftTemplate[]; setShiftTemplatesList: (u: (p: ShiftTemplate[]) => ShiftTemplate[]) => void }) {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<ShiftTemplate | null>(null)
  const [name, setName] = useState('')
  const [start, setStart] = useState('06:00')
  const [end, setEnd] = useState('14:00')
  const create = () => { setShiftTemplatesList(p => [...p, { id: `st-${Date.now()}`, name, start, end, active: true }]); setShowCreate(false) }
  const save = () => { if (!showEdit) return; setShiftTemplatesList(p => p.map(t => t.id === showEdit.id ? { ...t, name, start, end } : t)); setShowEdit(null) }
  const toggle = (id: string) => setShiftTemplatesList(p => p.map(t => t.id === id ? { ...t, active: !t.active } : t))
  const openEdit = (t: ShiftTemplate) => { setShowEdit(t); setName(t.name); setStart(t.start); setEnd(t.end) }
  const FormFields = ({ onSave, onCancel, label }: { onSave: () => void; onCancel: () => void; label: string }) => (
    <div className="space-y-4">
      <Field label="Template name" value={name} onChange={setName} placeholder="e.g. Early morning" required/>
      <div className="flex gap-3">
        <div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-1.5">Start time</label><input type="time" value={start} onChange={e => setStart(e.target.value)} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/></div>
        <div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-1.5">End time</label><input type="time" value={end} onChange={e => setEnd(e.target.value)} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/></div>
      </div>
      <div className="flex gap-3"><Btn variant="outline" onClick={onCancel} className="flex-1">Cancel</Btn><Btn variant="primary" onClick={onSave} disabled={!name} className="flex-1">{label}</Btn></div>
    </div>
  )
  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-xl font-semibold text-gray-900 mb-0.5">Shift templates</h2><p className="text-sm text-gray-400">Reusable shift patterns.</p></div>
        <Btn variant="primary" size="sm" onClick={() => { setName(''); setStart('06:00'); setEnd('14:00'); setShowCreate(true) }}><Ic.Plus size={13}/>New template</Btn>
      </div>
      <div className="space-y-2">
        {shiftTemplatesList.map(t => (
          <div key={t.id} className="flex items-center gap-4 px-4 py-3.5 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors min-h-[64px]">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${t.active ? 'bg-green-500' : 'bg-gray-300'}`}/>
            <div className="flex-1 min-w-0"><p className={`text-sm font-medium ${t.active ? 'text-gray-900' : 'text-gray-400'}`}>{t.name}</p><p className="text-xs font-mono text-gray-400">{t.start}–{t.end}</p></div>
            <div className="flex items-center gap-1">
              <button onClick={() => openEdit(t)} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.Edit size={13}/></button>
              <button onClick={() => toggle(t.id)} className={`text-xs font-medium px-3 py-2 rounded-xl border transition-colors min-h-[40px] ${t.active ? 'text-amber-700 border-amber-200 hover:bg-amber-50' : 'text-blue-600 border-blue-200 hover:bg-blue-50'}`}>{t.active ? 'Deactivate' : 'Activate'}</button>
            </div>
          </div>
        ))}
      </div>
      {showCreate && <Sheet title="New shift template" onClose={() => setShowCreate(false)}><FormFields onSave={create} onCancel={() => setShowCreate(false)} label="Create template"/></Sheet>}
      {showEdit && <Sheet title="Edit shift template" onClose={() => setShowEdit(null)}><FormFields onSave={save} onCancel={() => setShowEdit(null)} label="Save changes"/></Sheet>}
    </div>
  )
}

function SettingsTaskTemplates({ taskTemplatesList, setTaskTemplatesList }: { taskTemplatesList: TaskTemplate[]; setTaskTemplatesList: (u: (p: TaskTemplate[]) => TaskTemplate[]) => void }) {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<TaskTemplate | null>(null)
  const [showDelete, setShowDelete] = useState<TaskTemplate | null>(null)
  const [tplName, setTplName] = useState('')
  const [tplItems, setTplItems] = useState<TaskTemplateItem[]>([])

  const openCreate = () => { setTplName(''); setTplItems([{ id: `item-${Date.now()}`, name: '', type: 'task' }]); setShowCreate(true) }
  const openEdit = (t: TaskTemplate) => { setTplName(t.name); setTplItems(t.items.map(i => ({ ...i }))); setShowEdit(t) }
  const addItem = () => setTplItems(p => [...p, { id: `item-${Date.now()}`, name: '', type: 'task' }])
  const removeItem = (id: string) => setTplItems(p => p.filter(i => i.id !== id))
  const updateItem = (id: string, patch: Partial<TaskTemplateItem>) => setTplItems(p => p.map(i => i.id === id ? { ...i, ...patch } : i))
  const create = () => { setTaskTemplatesList(p => [...p, { id: `tt-${Date.now()}`, name: tplName, items: tplItems.filter(i => i.name) }]); setShowCreate(false) }
  const save = () => { if (!showEdit) return; setTaskTemplatesList(p => p.map(t => t.id === showEdit.id ? { ...t, name: tplName, items: tplItems.filter(i => i.name) } : t)); setShowEdit(null) }
  const deleteTemplate = () => { if (!showDelete) return; setTaskTemplatesList(p => p.filter(t => t.id !== showDelete.id)); setShowDelete(null) }

  const TemplateForm = ({ onSave, onClose, label }: { onSave: () => void; onClose: () => void; label: string }) => (
    <div className="space-y-4">
      <Field label="Template name" value={tplName} onChange={setTplName} placeholder="e.g. Warehouse morning" required/>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Tasks ({tplItems.length})</label>
          <button onClick={addItem} className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 min-h-[36px] px-2"><Ic.Plus size={12}/>Add task</button>
        </div>
        <div className="space-y-2">
          {tplItems.map((item, i) => (
            <div key={item.id} className="p-3 bg-gray-50 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <input type="text" value={item.name} onChange={e => updateItem(item.id, { name: e.target.value })} placeholder={`Task ${i + 1}`}
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"/>
                <button onClick={() => removeItem(item.id)} className="p-2.5 text-gray-300 hover:text-red-400 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.X size={14}/></button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white text-xs">
                  {(['task', 'goal'] as TaskType[]).map(t => (
                    <button key={t} onClick={() => updateItem(item.id, { type: t })} className={`px-3 py-2 font-medium capitalize min-h-[36px] transition-all ${item.type === t ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
                  ))}
                </div>
                {item.type === 'goal' && <>
                  <input type="number" value={item.target ?? ''} onChange={e => updateItem(item.id, { target: Number(e.target.value) })} placeholder="Target" className="w-20 px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[36px]"/>
                  <input type="text" value={item.unit ?? ''} onChange={e => updateItem(item.id, { unit: e.target.value })} placeholder="Unit" className="w-20 px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[36px]"/>
                </>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Btn variant="outline" onClick={onClose} className="flex-1">Cancel</Btn>
        <Btn variant="primary" onClick={onSave} disabled={!tplName || tplItems.every(i => !i.name)} className="flex-1">{label}</Btn>
      </div>
    </div>
  )

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-xl font-semibold text-gray-900 mb-0.5">Task templates</h2><p className="text-sm text-gray-400">Reusable sets of tasks.</p></div>
        <Btn variant="primary" size="sm" onClick={openCreate}><Ic.Plus size={13}/>New template</Btn>
      </div>
      <div className="space-y-2">
        {taskTemplatesList.map(t => (
          <div key={t.id} className="p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div><p className="font-medium text-gray-900">{t.name}</p><p className="text-xs text-gray-400">{t.items.length} task{t.items.length !== 1 ? 's' : ''}</p></div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(t)} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.Edit size={13}/></button>
                <button onClick={() => setShowDelete(t)} className="p-2.5 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.Trash size={13}/></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.items.map(item => (
                <span key={item.id} className="inline-flex items-center gap-1 text-xs bg-gray-50 border border-gray-100 rounded-full px-2 py-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'goal' ? 'bg-blue-400' : 'bg-emerald-400'}`}/>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        {taskTemplatesList.length === 0 && <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-2xl">No task templates yet.</div>}
      </div>
      {showCreate && <Sheet title="New task template" onClose={() => setShowCreate(false)}><TemplateForm onSave={create} onClose={() => setShowCreate(false)} label="Create template"/></Sheet>}
      {showEdit && <Sheet title="Edit task template" onClose={() => setShowEdit(null)}><TemplateForm onSave={save} onClose={() => setShowEdit(null)} label="Save changes"/></Sheet>}
      {showDelete && <ConfirmDialog title={`Delete "${showDelete.name}"?`} description="Previously applied tasks are not affected." confirmLabel="Delete" danger onConfirm={deleteTemplate} onCancel={() => setShowDelete(null)}/>}
    </div>
  )
}

function SettingsProfile() {
  const [firstName, setFirstName] = useState('Alex')
  const [lastName, setLastName] = useState('Manager')
  const [email, setEmail] = useState('alex@abclogistics.com')
  const [lang, setLang] = useState('en')
  const [saved, setSaved] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Profile</h2>
      <p className="text-sm text-gray-400 mb-5">Manage your personal account settings.</p>
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
        <Avatar firstName={firstName} lastName={lastName} size="lg"/>
        <div><p className="font-semibold text-gray-900">{firstName} {lastName}</p><p className="text-sm text-gray-400">{email}</p><Badge variant="info" className="mt-1.5">Owner</Badge></div>
      </div>
      <div className="space-y-4 mb-6">
        <Field label="First name" value={firstName} onChange={setFirstName} required/>
        <Field label="Last name" value={lastName} onChange={setLastName} required/>
        <Field label="Email" type="email" value={email} onChange={setEmail} required/>
        <Sel label="Language" value={lang} onChange={setLang}>
          <option value="en">English</option><option value="pl">Polski</option><option value="es">Español</option>
        </Sel>
        <Btn variant="primary" onClick={save}>{saved ? '✓ Saved' : 'Save changes'}</Btn>
      </div>
      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Change password</h3>
        <p className="text-xs text-gray-400 mb-3">You will receive a password reset link by email.</p>
        <Btn variant="outline" size="sm">Send reset email</Btn>
      </div>
      <div className="border-t border-gray-100 pt-5 mt-5">
        <h3 className="text-sm font-semibold text-red-600 mb-1">Danger zone</h3>
        <p className="text-xs text-gray-400 mb-3">Permanently delete your account and all associated data.</p>
        <Btn variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>Delete account</Btn>
      </div>
      {showDeleteConfirm && <ConfirmDialog title="Delete account?" description="This will permanently delete your account and organization. This cannot be undone." confirmLabel="Delete my account" danger onConfirm={() => setShowDeleteConfirm(false)} onCancel={() => setShowDeleteConfirm(false)}/>}
    </div>
  )
}

function SettingsBilling() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const plans = [
    { name: 'Workday 10', employees: 11, monthly: 10, yearly: 100, id: 'plan10' },
    { name: 'Workday 20', employees: 21, monthly: 20, yearly: 200, id: 'plan20' },
    { name: 'Workday 40', employees: 41, monthly: 30, yearly: 300, id: 'plan40', current: true },
  ]
  const currentPlan = plans.find(p => p.current)!
  const employeeCount = 36

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Subscription</h2>
      <p className="text-sm text-gray-400 mb-6">Manage your plan and billing.</p>

      <div className="border border-blue-100 bg-blue-50/40 rounded-2xl p-5 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Current plan</p>
            <p className="text-xl font-bold text-gray-900">{currentPlan.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-mono font-semibold text-gray-900">{employeeCount} / {currentPlan.employees}</span> employees · ${billing === 'monthly' ? currentPlan.monthly : Math.round(currentPlan.yearly / 12)}/mo
            </p>
          </div>
          <Badge variant="trial">14-day trial · 10 days left</Badge>
        </div>
        <div className="mt-4">
          <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${(employeeCount / currentPlan.employees) * 100}%` }}/></div>
          <p className="text-xs text-gray-400 mt-1">{employeeCount} of {currentPlan.employees} seats used</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {(['monthly', 'yearly'] as const).map(b => <button key={b} onClick={() => setBilling(b)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all min-h-[40px] ${billing === b ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{b}</button>)}
        </div>
        {billing === 'yearly' && <Badge variant="active">Save up to 17%</Badge>}
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 mb-6">
        {plans.map(plan => (
          <div key={plan.id} className={`p-5 rounded-2xl border-2 transition-all ${plan.current ? 'border-blue-500 bg-white shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
            {plan.current && <Badge variant="info" className="mb-2">Current</Badge>}
            <p className="font-bold text-gray-900 mb-1">{plan.name}</p>
            <div className="flex items-baseline gap-0.5 mb-0.5">
              <span className="text-2xl font-bold text-gray-900">${billing === 'monthly' ? plan.monthly : Math.round(plan.yearly / 12)}</span>
              <span className="text-sm font-normal text-gray-400">/mo</span>
            </div>
            {billing === 'yearly' && <p className="text-xs text-gray-400 mb-2">${plan.yearly}/year</p>}
            <p className="text-xs text-gray-500 mb-3">Up to {plan.employees - 1} employees</p>
            <Btn variant={plan.current ? 'secondary' : 'outline'} size="sm" className="w-full" disabled={plan.current}>{plan.current ? 'Current plan' : 'Switch'}</Btn>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div><p className="text-sm font-semibold text-gray-800">Billing portal</p><p className="text-xs text-gray-400">Manage payment, invoices, cancel subscription.</p></div>
          <Btn variant="outline" size="sm">Open Stripe portal →</Btn>
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-semibold text-gray-800">Next payment</p><p className="text-xs text-gray-400">After trial ends on September 1, 2026</p></div>
          <p className="text-sm font-semibold text-gray-900">${billing === 'monthly' ? currentPlan.monthly : Math.round(currentPlan.yearly / 12)}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Manager App Container ────────────────────────────────────────────────────────

function ManagerApp({ navigate }: { navigate: (s: Screen) => void }) {
  const [tab, setTab] = useState<ManagerTab>('dashboard')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const [teamsList, setTeamsList] = useState<Team[]>(defaultTeams)
  const [workAreasList, setWorkAreasList] = useState<WorkArea[]>(initialWorkAreas)
  const [shiftTemplatesList, setShiftTemplatesList] = useState<ShiftTemplate[]>(initialShiftTemplates)
  const [taskTemplatesList, setTaskTemplatesList] = useState<TaskTemplate[]>(initialTaskTemplates)
  const [scheduleData, setScheduleData] = useState(() => buildInitialSchedule())
  const [localAssignments, setLocalAssignments] = useState<typeof taskAssignments>(taskAssignments)
  const [empStatuses, setEmpStatuses] = useState<Record<string, Employee['status']>>({})

  // Template action sheet — disambiguates task vs shift template
  const [showTemplateSheet, setShowTemplateSheet] = useState(false)
  const [showCreateTaskTemplate, setShowCreateTaskTemplate] = useState(false)
  const [showCreateShiftTemplate, setShowCreateShiftTemplate] = useState(false)
  const [newStName, setNewStName] = useState('')
  const [newStStart, setNewStStart] = useState('06:00')
  const [newStEnd, setNewStEnd] = useState('14:00')
  const [newTtName, setNewTtName] = useState('')
  const [newTtItems, setNewTtItems] = useState<TaskTemplateItem[]>([{ id: `item-0`, name: '', type: 'task', target: undefined, unit: undefined }])

  // Quick action callbacks — these are mutated by child screens via useEffect
  const quickActionCallbacks = useRef<QuickActionCallbacks>({})

  const handleTemplate = () => setShowTemplateSheet(true)
  const handleAddTask = () => quickActionCallbacks.current.onAddTask?.()
  const handleAddShift = () => quickActionCallbacks.current.onAddShift?.()

  // Wire global quick action into callbacks ref
  const quickActions: QuickActionCallbacks = {
    get onAddTask() { return quickActionCallbacks.current.onAddTask },
    set onAddTask(v) { quickActionCallbacks.current.onAddTask = v },
    get onAddShift() { return quickActionCallbacks.current.onAddShift },
    set onAddShift(v) { quickActionCallbacks.current.onAddShift = v },
    onTemplate: handleTemplate,
  }

  return (
    <div className="h-dvh flex flex-col bg-white overflow-hidden">
      <MobileTopBar tab={tab} setTab={setTab} navigate={navigate} onOpenDrawer={() => setDrawerOpen(true)} hamburgerRef={hamburgerRef}/>
      <MobileNavDrawer tab={tab} setTab={setTab} navigate={navigate} open={drawerOpen} onClose={() => setDrawerOpen(false)} triggerRef={hamburgerRef}/>
      <div className="flex flex-1 overflow-hidden">
        <ManagerSidebar tab={tab} setTab={setTab} navigate={navigate}/>
        <main className="flex-1 overflow-y-auto min-w-0">
          {tab === 'dashboard' && <ManagerDashboard setTab={setTab} localAssignments={localAssignments} scheduleData={scheduleData} empStatuses={empStatuses} quickActions={quickActions}/>}
          {tab === 'employees' && <ManagerEmployees teamsList={teamsList} empStatuses={empStatuses} setEmpStatuses={setEmpStatuses} scheduleData={scheduleData} localAssignments={localAssignments}/>}
          {tab === 'schedule' && <ManagerSchedule shiftTemplatesList={shiftTemplatesList} workAreasList={workAreasList} teamsList={teamsList} scheduleData={scheduleData} setScheduleData={setScheduleData} quickActions={quickActions}/>}
          {tab === 'tasks' && <ManagerTasks taskTemplatesList={taskTemplatesList} shiftTemplatesList={shiftTemplatesList} teamsList={teamsList} localAssignments={localAssignments} setLocalAssignments={setLocalAssignments} quickActions={quickActions}/>}
          {tab === 'settings' && <ManagerSettings teamsList={teamsList} setTeamsList={setTeamsList} workAreasList={workAreasList} setWorkAreasList={setWorkAreasList} shiftTemplatesList={shiftTemplatesList} setShiftTemplatesList={setShiftTemplatesList} taskTemplatesList={taskTemplatesList} setTaskTemplatesList={setTaskTemplatesList} setTab={setTab}/>}
        </main>
      </div>

      {/* Quick Action Bar — mobile only, contextual */}
      <ManagerQuickActionBar tab={tab} callbacks={{ onAddTask: handleAddTask, onAddShift: handleAddShift, onTemplate: handleTemplate }}/>

      {/* Template action sheet */}
      {showTemplateSheet && (
        <ActionSheet
          title="Create template"
          options={[
            { label: 'Task template', onClick: () => { setNewTtName(''); setNewTtItems([{ id: `item-${Date.now()}`, name: '', type: 'task' }]); setShowCreateTaskTemplate(true) } },
            { label: 'Shift template', onClick: () => { setNewStName(''); setNewStStart('06:00'); setNewStEnd('14:00'); setShowCreateShiftTemplate(true) } },
          ]}
          onClose={() => setShowTemplateSheet(false)}
        />
      )}

      {showCreateShiftTemplate && (
        <Sheet title="New shift template" onClose={() => setShowCreateShiftTemplate(false)}>
          <div className="space-y-4">
            <Field label="Template name" value={newStName} onChange={setNewStName} placeholder="e.g. Early morning" required/>
            <div className="flex gap-3">
              <div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-1.5">Start</label><input type="time" value={newStStart} onChange={e => setNewStStart(e.target.value)} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/></div>
              <div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-1.5">End</label><input type="time" value={newStEnd} onChange={e => setNewStEnd(e.target.value)} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono min-h-[44px]"/></div>
            </div>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowCreateShiftTemplate(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={() => { setShiftTemplatesList(p => [...p, { id: `st-${Date.now()}`, name: newStName, start: newStStart, end: newStEnd, active: true }]); setShowCreateShiftTemplate(false) }} disabled={!newStName} className="flex-1">Create template</Btn>
            </div>
          </div>
        </Sheet>
      )}

      {showCreateTaskTemplate && (
        <Sheet title="New task template" onClose={() => setShowCreateTaskTemplate(false)}>
          <div className="space-y-4">
            <Field label="Template name" value={newTtName} onChange={setNewTtName} placeholder="e.g. Warehouse morning" required/>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Tasks</label>
                <button onClick={() => setNewTtItems(p => [...p, { id: `item-${Date.now()}`, name: '', type: 'task', target: undefined, unit: undefined }])} className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 min-h-[36px] px-2"><Ic.Plus size={12}/>Add</button>
              </div>
              <div className="space-y-3">
                {newTtItems.map((item, i) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="text" value={item.name} onChange={e => setNewTtItems(p => p.map(x => x.id === item.id ? { ...x, name: e.target.value } : x))} placeholder={`Task ${i + 1}`}
                        className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"/>
                      <button onClick={() => setNewTtItems(p => p.filter(x => x.id !== item.id))} className="p-2.5 text-gray-300 hover:text-red-400 min-w-[44px] min-h-[44px] flex items-center justify-center"><Ic.X size={14}/></button>
                    </div>
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white text-xs w-fit">
                      {(['task', 'goal'] as TaskType[]).map(t => (
                        <button key={t} onClick={() => setNewTtItems(p => p.map(x => x.id === item.id ? { ...x, type: t, target: undefined, unit: undefined } : x))}
                          className={`px-3 py-2 font-medium capitalize min-h-[36px] transition-all ${item.type === t ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
                      ))}
                    </div>
                    {item.type === 'goal' && (
                      <div className="flex gap-2">
                        <input type="number" value={item.target ?? ''} onChange={e => setNewTtItems(p => p.map(x => x.id === item.id ? { ...x, target: Number(e.target.value) || undefined } : x))} placeholder="Target" className="w-20 px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[36px]"/>
                        <input type="text" value={item.unit ?? ''} onChange={e => setNewTtItems(p => p.map(x => x.id === item.id ? { ...x, unit: e.target.value || undefined } : x))} placeholder="Unit" className="flex-1 px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[36px]"/>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => setShowCreateTaskTemplate(false)} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={() => { setTaskTemplatesList(p => [...p, { id: `tt-${Date.now()}`, name: newTtName, items: newTtItems.filter(i => i.name) }]); setShowCreateTaskTemplate(false) }} disabled={!newTtName} className="flex-1">Create template</Btn>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  )
}

// ─── Employee App ─────────────────────────────────────────────────────────────────

function EmployeeApp({ navigate }: { navigate: (s: Screen) => void }) {
  const [tab, setTab] = useState<EmployeeTab>('today')
  const me = employees[0]
  const mySchedule = schedules.find(s => s.employeeId === me.id)
  const myAssignments = taskAssignments.filter(a => a.employeeId === me.id && a.date === TODAY)

  const tabs: { id: EmployeeTab; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Ic.Task/> },
    { id: 'schedule', label: 'Schedule', icon: <Ic.Cal/> },
    { id: 'history', label: 'History', icon: <Ic.History/> },
    { id: 'profile', label: 'Profile', icon: <Ic.User/> },
  ]

  return (
    <div className="bg-white flex flex-col" style={{ height: '100dvh' }}>
      {/* Desktop top nav */}
      <nav className="hidden lg:flex items-center justify-between px-8 h-14 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-2"><Logo size={7}/><span className="font-semibold tracking-tight text-sm text-gray-900">Workday</span></div>
        <div className="flex items-center gap-1">
          {tabs.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors min-h-[40px] ${tab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              aria-current={tab === item.id ? 'page' : undefined}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>
        <button onClick={() => setTab('profile')} className="min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Profile">
          <Avatar firstName={me.firstName} lastName={me.lastName} size="xs"/>
        </button>
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}>
        <div className="max-w-2xl mx-auto">
          {tab === 'today' && <EmployeeToday me={me} mySchedule={mySchedule} myAssignments={myAssignments}/>}
          {tab === 'schedule' && <EmployeeSchedule me={me} mySchedule={mySchedule}/>}
          {tab === 'history' && <EmployeeHistory me={me}/>}
          {tab === 'profile' && <EmployeeProfile me={me} navigate={navigate}/>}
        </div>
      </main>

      {/* Mobile bottom nav — fixed with safe-area */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-20 safe-area-bottom" aria-label="Employee navigation" style={{ minHeight: '56px' }}>
        {tabs.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium transition-colors min-h-[56px] ${tab === item.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            aria-current={tab === item.id ? 'page' : undefined}>
            {item.icon}{item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

// ─── Employee Today ───────────────────────────────────────────────────────────────

function EmployeeToday({ me, mySchedule, myAssignments }: { me: Employee; mySchedule: typeof schedules[0] | undefined; myAssignments: typeof taskAssignments }) {
  const [localAssignments, setLocalAssignments] = useState(myAssignments)
  const [progressEditor, setProgressEditor] = useState<{ taskId: string; task: typeof tasks[0]; current: number; status: string } | null>(null)
  const [editorValue, setEditorValue] = useState(0)
  const [toast, setToast] = useState('')
  const todayShift = mySchedule?.shifts[TODAY]

  const openProgress = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    const a = localAssignments.find(x => x.taskId === taskId)
    if (!task || !a) return
    setProgressEditor({ taskId, task, current: a.current ?? 0, status: a.status })
    setEditorValue(a.current ?? 0)
  }

  const saveProgress = () => {
    if (!progressEditor) return
    const { task, taskId } = progressEditor
    const clampedValue = Math.max(0, Math.min(task.target ?? Infinity, editorValue))
    const isComplete = task.type === 'goal' && task.target ? clampedValue >= task.target : true

    setLocalAssignments(prev => prev.map(a => {
      if (a.taskId !== taskId) return a
      if (task.type === 'goal') return { ...a, current: clampedValue, status: isComplete ? 'completed' : 'pending' }
      return { ...a, status: 'completed' }
    }))
    setProgressEditor(null)
    setToast('✓ Progress updated')
  }

  const markDone = (taskId: string) => {
    setLocalAssignments(prev => prev.map(a => a.taskId === taskId ? { ...a, status: 'completed' } : a))
    setToast('✓ Task marked as done')
  }

  return (
    <>
      {toast && <Toast message={toast} onDone={() => setToast('')}/>}
      <div className="p-4 sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Tuesday, August 18</p>
          <h1 className="text-2xl font-bold text-gray-900">Today</h1>
        </div>

        {todayShift ? (
          <div className="bg-[#090e1a] text-white rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Your shift</p>
            <p className="text-4xl font-bold tracking-tight mb-1">{todayShift.start}–{todayShift.end}</p>
            <p className="text-sm text-gray-400">{todayShift.location}</p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-center"><p className="text-sm text-gray-400">No shift scheduled today</p></div>
        )}

        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Your work</h2>

        {localAssignments.length === 0 ? (
          <div className="text-center py-8"><p className="text-sm text-gray-400">You are all caught up.</p></div>
        ) : (
          <div className="space-y-3">
            {localAssignments.map(a => {
              const task = tasks.find(t => t.id === a.taskId); if (!task) return null
              const isDone = a.status === 'completed'
              const isGoal = task.type === 'goal' && task.target
              return (
                <div key={a.taskId} className={`border rounded-2xl p-4 transition-all ${isDone ? 'border-green-100 bg-green-50/30' : 'border-gray-100'}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className={`font-semibold text-gray-900 text-sm ${isDone ? 'line-through text-gray-400' : ''}`}>{task.name}</p>
                    {isDone && <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Ic.Check size={11}/></div>}
                  </div>
                  {isGoal && !isDone && (
                    <>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="font-mono text-2xl font-bold text-gray-900">{a.current ?? 0}</span>
                        <span className="text-sm text-gray-400">/ {task.target} {task.unit}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, ((a.current ?? 0) / task.target!) * 100)}%` }}/>
                      </div>
                    </>
                  )}
                  {isDone && isGoal && (
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-mono text-lg font-bold text-green-600">{task.target}</span>
                      <span className="text-sm text-green-500">/ {task.target} {task.unit}</span>
                    </div>
                  )}
                  {!isDone && (
                    <button
                      onClick={() => isGoal ? openProgress(a.taskId) : markDone(a.taskId)}
                      className="w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all min-h-[52px]">
                      {isGoal ? 'Update progress' : 'Mark as done'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Full-screen progress editor — 100dvh, flex-col, keyboard-aware */}
      {progressEditor && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col" style={{ height: '100dvh' }} role="dialog" aria-modal="true" aria-label="Update progress">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 flex-shrink-0 safe-area-top">
            <button onClick={() => setProgressEditor(null)} className="p-2 rounded-xl hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600" aria-label="Back">
              <Ic.ArrowLeft size={20}/>
            </button>
            <h2 className="text-base font-semibold text-gray-900">Update progress</h2>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            <div>
              <p className="text-xl font-bold text-gray-900 mb-1">{progressEditor.task.name}</p>
              <p className="text-sm text-gray-400">Target: {progressEditor.task.target} {progressEditor.task.unit}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Current progress</p>

              {/* Single input — primary interaction */}
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={progressEditor.task.target}
                step={1}
                value={editorValue}
                onChange={e => {
                  const v = Math.max(0, Math.min(progressEditor.task.target ?? Infinity, Number(e.target.value)))
                  setEditorValue(isNaN(v) ? 0 : v)
                }}
                className="w-full text-center text-4xl font-mono font-bold border-2 border-gray-200 rounded-2xl py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] bg-gray-50 mb-4"/>

              {/* +/- secondary controls */}
              <div className="flex items-center justify-center gap-8 mb-6">
                <button onClick={() => setEditorValue(v => Math.max(0, v - 1))} className="w-14 h-14 rounded-full border-2 border-gray-200 text-2xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 min-w-[56px] min-h-[56px]" aria-label="Decrease">−</button>
                <span className="text-sm text-gray-400 font-medium">{progressEditor.task.unit}</span>
                <button onClick={() => setEditorValue(v => Math.min(progressEditor.task.target ?? Infinity, v + 1))} className="w-14 h-14 rounded-full border-2 border-gray-200 text-2xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 min-w-[56px] min-h-[56px]" aria-label="Increase">+</button>
              </div>

              {/* Progress bar */}
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-mono text-sm font-semibold text-gray-900">{editorValue} / {progressEditor.task.target}</span>
                <span className="font-mono text-xs text-gray-400">{progressEditor.task.target ? Math.round((editorValue / progressEditor.task.target) * 100) : 0}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progressEditor.task.target ? Math.min(100, (editorValue / progressEditor.task.target) * 100) : 0}%` }}/>
              </div>
              {progressEditor.task.target && editorValue >= progressEditor.task.target && (
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1"><Ic.Check size={12}/>Target reached — will be marked complete</p>
              )}
            </div>
          </div>

          {/* Sticky footer — stays above keyboard */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-100 bg-white safe-area-bottom">
            <button onClick={saveProgress} className="w-full bg-blue-600 text-white text-base font-semibold py-4 rounded-2xl hover:bg-blue-700 active:bg-blue-800 transition-colors min-h-[60px]">
              Save progress
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function EmployeeSchedule({ me, mySchedule }: { me: Employee; mySchedule: typeof schedules[0] | undefined }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(1)
  const weekDays = getWeekDays(weekOffset)
  const weekLabel = getWeekLabel(weekOffset)
  const day = weekDays[selectedDay]
  const shift = mySchedule?.shifts[day.date]

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Schedule</h1>
      <div className="mb-4"><WeekNav offset={weekOffset} setOffset={o => { setWeekOffset(o); setSelectedDay(0) }} label={weekLabel}/></div>
      <div className="mb-5"><DayPills days={weekDays} selectedIndex={selectedDay} onSelect={setSelectedDay}/></div>

      {shift ? (
        <div className="bg-[#090e1a] text-white rounded-2xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{day.fullLabel}</p>
          <p className="text-4xl font-bold tracking-tight mb-2">{shift.start}–{shift.end}</p>
          <p className="text-gray-400">{shift.location}</p>
          {shift.note && <p className="text-sm text-gray-500 mt-3 border-t border-gray-800 pt-3">{shift.note}</p>}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
          <p className="font-semibold text-gray-700 mb-1">Day off</p>
          <p className="text-sm text-gray-400">No shift on {day.fullLabel}.</p>
        </div>
      )}
    </div>
  )
}

function EmployeeHistory({ me }: { me: Employee }) {
  const [expanded, setExpanded] = useState<number | null>(0)
  const weeks = [0, -1, -2, -3].map(offset => {
    const days = getWeekDays(offset); const label = getWeekLabel(offset)
    const dayData = days.slice(0, 5).map(day => {
      const asgns = taskAssignments.filter(a => a.employeeId === me.id && a.date === day.date)
      return { day, completed: asgns.filter(a => a.status === 'completed').length, total: asgns.length }
    })
    const totalDone = dayData.reduce((s, d) => s + d.completed, 0); const totalAll = dayData.reduce((s, d) => s + d.total, 0)
    return { offset, label, dayData, totalDone, totalAll }
  })

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">History</h1>
      <div className="space-y-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="border border-gray-100 rounded-2xl overflow-hidden">
            <button onClick={() => setExpanded(expanded === wi ? null : wi)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors min-h-[64px]">
              <div className="text-left">
                <p className="font-semibold text-sm text-gray-900">{week.label}</p>
                <p className="text-xs text-gray-400">{week.totalDone} / {week.totalAll} tasks done</p>
              </div>
              <div className="flex items-center gap-3">
                {week.totalAll > 0 && (
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${week.totalDone === week.totalAll ? 'bg-green-500' : week.totalDone > week.totalAll / 2 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${week.totalAll ? (week.totalDone / week.totalAll) * 100 : 0}%` }}/>
                  </div>
                )}
                <Ic.ChevRight size={14}/>
              </div>
            </button>
            {expanded === wi && (
              <div className="border-t border-gray-100 px-4 py-2">
                {week.dayData.map(({ day, completed, total }) => (
                  <div key={day.date} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 min-h-[48px]">
                    <span className="text-sm font-medium text-gray-700 w-10">{day.label}</span>
                    <span className="text-xs text-gray-400 flex-1 ml-2">{day.short}</span>
                    {total > 0 ? (
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${completed === total ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${(completed / total) * 100}%` }}/>
                        </div>
                        <span className={`font-mono text-xs min-w-[36px] text-right ${completed === total ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>{completed} / {total}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EmployeeProfile({ me, navigate }: { me: Employee; navigate: (s: Screen) => void }) {
  const [firstName, setFirstName] = useState(me.firstName)
  const [lastName, setLastName] = useState(me.lastName)
  const [email, setEmail] = useState(me.email)
  const [lang, setLang] = useState('en')
  const [saved, setSaved] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <Avatar firstName={firstName} lastName={lastName} size="lg"/>
        <p className="mt-3 font-semibold text-gray-900">{firstName} {lastName}</p>
        <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">ABC Logistics</span>
      </div>
      <div className="space-y-4 mb-5">
        <Field label="First name" value={firstName} onChange={setFirstName}/>
        <Field label="Last name" value={lastName} onChange={setLastName}/>
        <Field label="Email" type="email" value={email} onChange={setEmail} helper="Email changes require verification."/>
        <Sel label="Language" value={lang} onChange={setLang}>
          <option value="en">English</option><option value="pl">Polski</option><option value="es">Español</option>
        </Sel>
        <Btn variant="primary" className="w-full" onClick={save}>{saved ? '✓ Saved' : 'Save changes'}</Btn>
      </div>
      <div className="space-y-1 border-t border-gray-100 pt-5">
        <button className="w-full py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left px-3 min-h-[52px]">Change password →</button>
        <button onClick={() => navigate('auth')} className="w-full py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left px-3 min-h-[52px]">Sign out →</button>
        <button onClick={() => setShowDelete(true)} className="w-full py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left px-3 min-h-[52px]">Delete account →</button>
      </div>
      {showDelete && <ConfirmDialog title="Delete account?" description="This will permanently delete your account. Your schedule and task history will be removed." confirmLabel="Delete account" danger onConfirm={() => { setShowDelete(false); navigate('auth') }} onCancel={() => setShowDelete(false)}/>}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('auth')
  return (
    <>
      {screen === 'auth' && <AuthScreen navigate={setScreen}/>}
      {screen === 'manager-onboard' && <ManagerOnboard navigate={setScreen}/>}
      {screen === 'manager-setup' && <ManagerSetup navigate={setScreen}/>}
      {screen === 'employee-onboard' && <EmployeeOnboard navigate={setScreen}/>}
      {screen === 'manager' && <ManagerApp navigate={setScreen}/>}
      {screen === 'employee' && <EmployeeApp navigate={setScreen}/>}
    </>
  )
}
