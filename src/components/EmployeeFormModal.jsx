import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, User, Hash, Briefcase, Users, Phone, MapPin, Home } from 'lucide-react';
import { DEPARTMENTS, GENDERS } from '../data/mockEmployees';

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  existingEmployees = []
}) {
  const isEditMode = Boolean(initialData);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    department: DEPARTMENTS[0],
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: '',
    role: ''
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset or populate form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          id: initialData.id || '',
          department: initialData.department || DEPARTMENTS[0],
          gender: initialData.gender || 'Male',
          phone: initialData.phone || '',
          localAddress: initialData.localAddress || '',
          permanentAddress: initialData.permanentAddress || '',
          role: initialData.role || ''
        });
        setSameAddress(initialData.localAddress === initialData.permanentAddress);
      } else {
        // Auto-suggest next EMP ID
        const existingIds = existingEmployees
          .map((e) => {
            const match = e.id.match(/EMP-(\d+)/i);
            return match ? parseInt(match[1], 10) : 0;
          })
          .filter((n) => !isNaN(n));
        const nextNum = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 101;
        const suggestedId = `EMP-${nextNum}`;

        setFormData({
          name: '',
          id: suggestedId,
          department: DEPARTMENTS[0],
          gender: 'Male',
          phone: '',
          localAddress: '',
          permanentAddress: '',
          role: ''
        });
        setSameAddress(false);
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, initialData, existingEmployees]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Synthetic Event: handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // If same address checkbox is active and localAddress changed, mirror to permanentAddress
      if (sameAddress && name === 'localAddress') {
        updated.permanentAddress = value;
      }
      return updated;
    });

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Synthetic Event: handleBlur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Single field validation
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'name':
        if (!value || !value.trim()) {
          error = 'Full Name is required';
        } else if (value.trim().length < 3) {
          error = 'Full Name must be at least 3 characters';
        }
        break;

      case 'id':
        if (!value || !value.trim()) {
          error = 'Employee ID is required';
        } else {
          const formattedId = value.trim().toUpperCase();
          const duplicate = existingEmployees.find(
            (emp) => emp.id.toUpperCase() === formattedId && (!isEditMode || emp.id !== initialData.id)
          );
          if (duplicate) {
            error = `ID "${formattedId}" is already assigned to ${duplicate.name}`;
          }
        }
        break;

      case 'department':
        if (!value) {
          error = 'Please select a department';
        }
        break;

      case 'gender':
        if (!value) {
          error = 'Please select gender';
        }
        break;

      case 'phone':
        if (!value || !value.trim()) {
          error = 'Phone Number is required';
        } else {
          // Check for at least 7 digits
          const digits = value.replace(/\D/g, '');
          if (digits.length < 7) {
            error = 'Please enter a valid phone number (at least 7 digits)';
          }
        }
        break;

      case 'localAddress':
        if (!value || !value.trim()) {
          error = 'Local living address is required';
        } else if (value.trim().length < 5) {
          error = 'Please provide a complete local address';
        }
        break;

      case 'permanentAddress':
        if (!value || !value.trim()) {
          error = 'Permanent address is required';
        } else if (value.trim().length < 5) {
          error = 'Please provide a complete permanent address';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  // Validate entire form before submit
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Full Name must be at least 3 characters';
    }

    if (!formData.id.trim()) {
      newErrors.id = 'Employee ID is required';
    } else {
      const formattedId = formData.id.trim().toUpperCase();
      const duplicate = existingEmployees.find(
        (emp) => emp.id.toUpperCase() === formattedId && (!isEditMode || emp.id !== initialData.id)
      );
      if (duplicate) {
        newErrors.id = `ID "${formattedId}" is already assigned to ${duplicate.name}`;
      }
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    const digits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (digits.length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits)';
    }

    if (!formData.localAddress.trim()) {
      newErrors.localAddress = 'Local living address is required';
    } else if (formData.localAddress.trim().length < 5) {
      newErrors.localAddress = 'Please provide a complete local address';
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent address is required';
    } else if (formData.permanentAddress.trim().length < 5) {
      newErrors.permanentAddress = 'Please provide a complete permanent address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Synthetic Event: onSubmit with e.preventDefault()
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all touched
    setTouched({
      name: true,
      id: true,
      department: true,
      gender: true,
      phone: true,
      localAddress: true,
      permanentAddress: true
    });

    if (!validateForm()) {
      return;
    }

    const cleanedData = {
      ...formData,
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      localAddress: formData.localAddress.trim(),
      permanentAddress: formData.permanentAddress.trim(),
      role: formData.role.trim() || undefined
    };

    onSubmit(cleanedData);
    onClose();
  };

  const handleSameAddressToggle = (e) => {
    const isChecked = e.target.checked;
    setSameAddress(isChecked);
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.localAddress
      }));
      setErrors((prev) => ({ ...prev, permanentAddress: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 px-6 py-4 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              {isEditMode ? 'Edit Employee Details' : 'Add New Farm Employee'}
            </h2>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              {isEditMode
                ? `Updating profile and assignments for ${formData.name || 'employee'}`
                : 'Enter farm employee details according to operation schema'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4 max-h-[calc(85vh-120px)] overflow-y-auto">
          {/* Row 1: Name and Employee ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Elena Rostova"
                  className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                    errors.name && touched.name
                      ? 'border-rose-400 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* 2. Employee ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Employee ID <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. EMP-101"
                  className={`w-full pl-9 pr-3 py-2 bg-slate-50 border font-mono rounded-xl text-sm uppercase text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                    errors.id && touched.id
                      ? 'border-rose-400 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {errors.id && touched.id && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.id}</span>
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Department and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 3. Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Gender <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {GENDERS.map((g) => (
                  <label
                    key={g}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      formData.gender === g
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Phone Number & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 5. Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+1 (555) 012-3456"
                  className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                    errors.phone && touched.phone
                      ? 'border-rose-400 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {errors.phone && touched.phone && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Role / Job Title (Optional operational context) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role / Assignment Title
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Lead Combine Harvester"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 6. Local Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Local Address (Living Quarters / Farm Dorm) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-2.5 left-3 pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                name="localAddress"
                rows={2}
                value={formData.localAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Staff Bunkhouse 3, Sector A, AgriValley Farm, Greenfield"
                className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                  errors.localAddress && touched.localAddress
                    ? 'border-rose-400 focus:ring-rose-500'
                    : 'border-slate-200 focus:ring-emerald-500'
                }`}
              />
            </div>
            {errors.localAddress && touched.localAddress && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.localAddress}</span>
              </p>
            )}
          </div>

          {/* 7. Permanent Address */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Permanent Address <span className="text-rose-500">*</span>
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAddress}
                  onChange={handleSameAddressToggle}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Same as Local Address</span>
              </label>
            </div>
            <div className="relative">
              <div className="absolute top-2.5 left-3 pointer-events-none text-slate-400">
                <Home className="w-4 h-4" />
              </div>
              <textarea
                name="permanentAddress"
                rows={2}
                value={formData.permanentAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={sameAddress}
                placeholder="e.g. 422 Sunflower Ave, Boise, ID 83702"
                className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                  sameAddress ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''
                } ${
                  errors.permanentAddress && touched.permanentAddress
                    ? 'border-rose-400 focus:ring-rose-500'
                    : 'border-slate-200 focus:ring-emerald-500'
                }`}
              />
            </div>
            {errors.permanentAddress && touched.permanentAddress && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.permanentAddress}</span>
              </p>
            )}
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-xl shadow-md shadow-emerald-700/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditMode ? 'Update Employee' : 'Save Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
