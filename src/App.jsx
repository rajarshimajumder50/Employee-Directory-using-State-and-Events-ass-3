import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsHeader from './components/StatsHeader';
import FilterBar from './components/FilterBar';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import ToastNotification from './components/ToastNotification';
import { INITIAL_MOCK_EMPLOYEES, DEPARTMENTS } from './data/mockEmployees';

const STORAGE_KEY = 'agricorp_farm_employee_directory';

export default function App() {
  // Top-level State: Employees with localStorage synchronization
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read from localStorage, using initial mock data.', err);
    }
    return INITIAL_MOCK_EMPLOYEES;
  });

  // Save to localStorage whenever employees changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (err) {
      console.error('Could not save to localStorage:', err);
    }
  }, [employees]);

  // Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // null = Add, object = Edit
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Compute department counts dynamically
  const departmentCounts = useMemo(() => {
    const counts = {};
    DEPARTMENTS.forEach((dept) => {
      counts[dept] = 0;
    });
    employees.forEach((emp) => {
      if (counts[emp.department] !== undefined) {
        counts[emp.department] += 1;
      }
    });
    return counts;
  }, [employees]);

  // Real-time filtered and sorted employee list
  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    // Filter by department
    if (selectedDepartment !== 'All') {
      result = result.filter((emp) => emp.department === selectedDepartment);
    }

    // Filter by search query (Name, Employee ID, or Phone Number)
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.id.toLowerCase().includes(query) ||
          emp.phone.toLowerCase().includes(query)
      );
    }

    // Sort results
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'id-asc':
          return a.id.localeCompare(b.id, undefined, { numeric: true });
        case 'dept-asc':
          return a.department.localeCompare(b.department) || a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [employees, selectedDepartment, searchQuery, sortBy]);

  // Synthetic Event Handlers: Form Actions
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? formData : emp))
      );
      showToast(`Profile updated for ${formData.name} (${formData.id})`);
    } else {
      // Create new employee
      setEmployees((prev) => [formData, ...prev]);
      showToast(`Added ${formData.name} (${formData.id}) to directory`);
    }
  };

  // Synthetic Event Handlers: Delete Actions
  const handlePromptDelete = (employee) => {
    setDeletingEmployee(employee);
  };

  const handleConfirmDelete = (id) => {
    const target = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    showToast(`Removed ${target ? target.name : 'employee'} from roster`, 'info');
  };

  // Reset to initial mock dataset
  const handleResetData = () => {
    setEmployees(INITIAL_MOCK_EMPLOYEES);
    setSelectedDepartment('All');
    setSearchQuery('');
    showToast('Directory reset to default demo dataset', 'info');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        onResetData={handleResetData}
        totalCount={employees.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Subheader Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Farm Personnel Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Assignment 3: Managing employee directory with React state, events, and persistent storage
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Local Storage Active</span>
          </div>
        </div>

        {/* 1. Dynamic Employee Count Metrics */}
        <StatsHeader
          totalEmployees={employees.length}
          departmentCounts={departmentCounts}
          filteredCount={filteredEmployees.length}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          searchQuery={searchQuery}
        />

        {/* 2 & 3. Department Filter & Real-Time Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          sortBy={sortBy}
          onChangeSortBy={setSortBy}
          departmentCounts={departmentCounts}
          totalEmployees={employees.length}
          filteredCount={filteredEmployees.length}
        />

        {/* Employee Cards / Table List */}
        <EmployeeList
          employees={filteredEmployees}
          viewMode={viewMode}
          onEdit={handleOpenEditModal}
          onDelete={handlePromptDelete}
          onView={(emp) => setViewingEmployee(emp)}
          searchQuery={searchQuery}
          selectedDepartment={selectedDepartment}
          onResetFilters={handleClearFilters}
          onOpenAddModal={handleOpenAddModal}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-medium text-slate-700">
            Assignment 3: Employee Directory using State and Events
          </p>
          <p className="mt-1 text-slate-400">
            Built with React.js, Tailwind CSS & LocalStorage persistence • All 7 farm schema fields supported
          </p>
        </div>
      </footer>

      {/* 4 & 5. Add / Edit Modal */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEmployee}
        existingEmployees={employees}
      />

      {/* 6. Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingEmployee)}
        onClose={() => setDeletingEmployee(null)}
        onConfirm={handleConfirmDelete}
        employee={deletingEmployee}
      />

      {/* View Full Details Modal */}
      <EmployeeDetailModal
        isOpen={Boolean(viewingEmployee)}
        onClose={() => setViewingEmployee(null)}
        employee={viewingEmployee}
        onEdit={(emp) => {
          setViewingEmployee(null);
          handleOpenEditModal(emp);
        }}
      />

      {/* Toast Feedback */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
