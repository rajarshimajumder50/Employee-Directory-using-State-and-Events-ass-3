import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, LayoutGrid, Table, ArrowUpDown, Wheat, Milk, Droplets, Egg, Truck, Users } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockEmployees';

const ICON_MAP = {
  Harvesting: Wheat,
  Dairy: Milk,
  Irrigation: Droplets,
  Poultry: Egg,
  Logistics: Truck
};

export default function FilterBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  selectedDepartment,
  onSelectDepartment,
  viewMode,
  onChangeViewMode,
  sortBy,
  onChangeSortBy,
  departmentCounts,
  totalEmployees,
  filteredCount
}) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedDepartment !== 'All';

  const handleResetFilters = () => {
    onClearSearch();
    onSelectDepartment('All');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 sm:p-5 mb-6">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Real-time Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by full name, EMP ID, or phone number..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
            aria-label="Search employees"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              title="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Secondary controls row on mobile, inline on desktop */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
          {/* Mobile Collapsible Filters Button */}
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className={`md:hidden inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              hasActiveFilters || isMobileFiltersOpen
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value)}
              className="py-2 pl-2 pr-7 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              aria-label="Sort employees"
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
              <option value="id-asc">Sort: Employee ID</option>
              <option value="dept-asc">Sort: Department</option>
            </select>
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="hidden sm:inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => onChangeViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Department Filter Pills (Always visible on desktop, collapsible on mobile) */}
      <div
        className={`${
          isMobileFiltersOpen ? 'block' : 'hidden'
        } md:block mt-3 pt-3 border-t border-slate-100 transition-all`}
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Department:
          </span>

          {/* "All Departments" Pill */}
          <button
            type="button"
            onClick={() => onSelectDepartment('All')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedDepartment === 'All'
                ? 'bg-slate-900 text-white shadow-xs scale-102'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Departments</span>
            <span
              className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full ${
                selectedDepartment === 'All' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {totalEmployees}
            </span>
          </button>

          {/* Individual Department Pills */}
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDepartment === dept;
            const count = departmentCounts[dept] || 0;
            const Icon = ICON_MAP[dept] || Users;

            return (
              <button
                key={dept}
                type="button"
                onClick={() => onSelectDepartment(dept)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs scale-102 ring-1 ring-emerald-600'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{dept}</span>
                <span
                  className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Reset Filters button if any filters active */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
