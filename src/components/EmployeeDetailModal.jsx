import React, { useEffect } from 'react';
import { X, Phone, MapPin, Home, User, Hash, Briefcase, Pencil, Calendar, Check, Copy } from 'lucide-react';
import { DEPARTMENT_CONFIG } from '../data/mockEmployees';

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee,
  onEdit
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  const deptConfig = DEPARTMENT_CONFIG[employee.department] || {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    border: 'border-emerald-200',
    bgLight: 'bg-emerald-50'
  };

  const initials = employee.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-emerald-200">
              {initials}
            </div>
            <div>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-200 border border-emerald-700/50 inline-block mb-1">
                {employee.id}
              </span>
              <h2 className="text-xl font-bold tracking-tight leading-tight">
                {employee.name}
              </h2>
              <p className="text-xs text-emerald-200 mt-0.5">
                {employee.role || `${employee.department} Specialist`}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${deptConfig.badge}`}>
              <Briefcase className="w-3.5 h-3.5" />
              <span>Department: {employee.department}</span>
            </span>

            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Gender: {employee.gender}
            </span>
          </div>

          {/* Details list */}
          <div className="space-y-3.5 text-sm">
            {/* Phone */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase text-slate-400">Phone Contact</p>
                <a
                  href={`tel:${employee.phone}`}
                  className="text-sm font-semibold text-emerald-700 hover:underline mt-0.5 block"
                >
                  {employee.phone}
                </a>
              </div>
            </div>

            {/* Local Address */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase text-slate-400">Local Living Quarters</p>
                <p className="text-sm text-slate-800 mt-0.5 leading-snug">
                  {employee.localAddress}
                </p>
              </div>
            </div>

            {/* Permanent Address */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 mt-0.5">
                <Home className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase text-slate-400">Permanent Residence Address</p>
                <p className="text-sm text-slate-800 mt-0.5 leading-snug">
                  {employee.permanentAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Information</span>
          </button>
        </div>
      </div>
    </div>
  );
}
