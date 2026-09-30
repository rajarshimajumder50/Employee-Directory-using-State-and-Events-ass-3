import React from 'react';
import { SearchX, UserPlus, RotateCcw } from 'lucide-react';
import EmployeeCard from './EmployeeCard';
import EmployeeTable from './EmployeeTable';

export default function EmployeeList({
  employees,
  viewMode,
  onEdit,
  onDelete,
  onView,
  searchQuery,
  selectedDepartment,
  onResetFilters,
  onOpenAddModal
}) {
  // Empty State handling
  if (employees.length === 0) {
    const hasFilters = searchQuery.trim().length > 0 || selectedDepartment !== 'All';

    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center my-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          {hasFilters ? 'No matching farm personnel found' : 'No employees in directory'}
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          {hasFilters
            ? `We couldn't find any employees matching "${searchQuery}" in ${selectedDepartment === 'All' ? 'any department' : selectedDepartment}. Try refining your search query or clear filters.`
            : 'Get started by creating your first employee profile or restore initial mock data.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {hasFilters ? (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear Search & Filters</span>
            </button>
          ) : null}

          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>
    );
  }

  // If viewMode is table and on larger screen, render table; else grid
  if (viewMode === 'table') {
    return (
      <div>
        <div className="hidden sm:block">
          <EmployeeTable
            employees={employees}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </div>
        {/* Fallback to responsive card grid on very small screens where tables are too wide */}
        <div className="block sm:hidden grid grid-cols-1 gap-4">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      </div>
    );
  }

  // Grid Mode:
  // Mobile <= 768px: 1 column
  // Tablet 769px - 1024px: 2 columns (md:grid-cols-2)
  // Desktop >= 1025px: 3 or 4 columns (lg:grid-cols-3 xl:grid-cols-4)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {employees.map((emp) => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
