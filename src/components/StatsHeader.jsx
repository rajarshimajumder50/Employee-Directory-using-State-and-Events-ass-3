import React from 'react';
import { Users, Filter, Wheat, Milk, Droplets, Egg, Truck } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockEmployees';

const ICON_MAP = {
  Harvesting: Wheat,
  Dairy: Milk,
  Irrigation: Droplets,
  Poultry: Egg,
  Logistics: Truck
};

const COLOR_MAP = {
  Harvesting: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    accent: 'bg-amber-500'
  },
  Dairy: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-200',
    text: 'text-blue-800',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    accent: 'bg-blue-500'
  },
  Irrigation: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-200',
    text: 'text-cyan-800',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    accent: 'bg-cyan-500'
  },
  Poultry: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accent: 'bg-emerald-500'
  },
  Logistics: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-200',
    text: 'text-purple-800',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    accent: 'bg-purple-500'
  }
};

export default function StatsHeader({
  totalEmployees,
  departmentCounts,
  filteredCount,
  selectedDepartment,
  onSelectDepartment,
  searchQuery
}) {
  const isFiltered = selectedDepartment !== 'All' || searchQuery.trim().length > 0;

  return (
    <div className="mb-6 space-y-4">
      {/* Top Banner Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Total Employees Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-4 sm:p-5 text-white shadow-md shadow-emerald-950/10 border border-emerald-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase text-emerald-300">
                Total Staff Roster
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                {totalEmployees}
              </h2>
              <p className="text-xs text-emerald-200/80 mt-1">
                Active farm personnel in record
              </p>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-xl backdrop-blur-xs border border-emerald-400/20">
              <Users className="w-8 h-8 text-emerald-300" />
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Search & Filtered Results Count Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
                Matching Search Results
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  {filteredCount}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  of {totalEmployees} total
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 truncate">
                {isFiltered
                  ? `Filtered by: ${selectedDepartment !== 'All' ? selectedDepartment : 'All Departments'}${searchQuery ? ` & "${searchQuery}"` : ''}`
                  : 'Showing complete staff directory'}
              </p>
            </div>
            <div className={`p-3 rounded-xl border ${isFiltered ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              <Filter className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Quick Department Distribution Summary */}
        <div className="sm:col-span-2 lg:col-span-1 rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
              Farm Departments
            </p>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {DEPARTMENTS.length} Sectors
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {DEPARTMENTS.map((dept) => {
              const count = departmentCounts[dept] || 0;
              const isSelected = selectedDepartment === dept;
              const Icon = ICON_MAP[dept] || Users;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => onSelectDepartment(isSelected ? 'All' : dept)}
                  title={`Filter by ${dept} (${count} employees)`}
                  className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs scale-102 ring-2 ring-emerald-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold leading-tight">{count}</span>
                  <span className="text-[10px] truncate max-w-full font-medium opacity-80 mt-0.5">
                    {dept.slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
