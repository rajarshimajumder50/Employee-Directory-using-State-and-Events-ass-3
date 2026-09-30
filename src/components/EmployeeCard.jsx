import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Home,
  Pencil,
  Trash2,
  Wheat,
  Milk,
  Droplets,
  Egg,
  Truck,
  Eye,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import { DEPARTMENT_CONFIG } from '../data/mockEmployees';

const ICON_MAP = {
  Harvesting: Wheat,
  Dairy: Milk,
  Irrigation: Droplets,
  Poultry: Egg,
  Logistics: Truck
};

const GENDER_BADGE_STYLE = {
  Male: 'bg-blue-50 text-blue-700 border-blue-200',
  Female: 'bg-pink-50 text-pink-700 border-pink-200',
  Other: 'bg-purple-50 text-purple-700 border-purple-200'
};

export default function EmployeeCard({
  employee,
  onEdit,
  onDelete,
  onView
}) {
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const deptConfig = DEPARTMENT_CONFIG[employee.department] || {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    border: 'border-emerald-200',
    bgLight: 'bg-emerald-50'
  };

  const DeptIcon = ICON_MAP[employee.department] || Wheat;

  // Extract initials
  const initials = employee.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleCopyPhone = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(employee.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Accent Strip */}
      <div className={`h-1.5 w-full ${
        employee.department === 'Harvesting' ? 'bg-amber-500' :
        employee.department === 'Dairy' ? 'bg-blue-500' :
        employee.department === 'Irrigation' ? 'bg-cyan-500' :
        employee.department === 'Poultry' ? 'bg-emerald-500' :
        'bg-purple-500'
      }`} />

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 flex-1">
        {/* Header: Avatar, Name, ID & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* Avatar Initials with Department theme */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-slate-800 border ${deptConfig.border} ${deptConfig.bgLight} shadow-2xs shrink-0`}>
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-base leading-tight truncate group-hover:text-emerald-700 transition-colors">
                {employee.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {employee.id}
                </span>
                {employee.role && (
                  <span className="text-[11px] text-slate-500 truncate hidden xs:inline max-w-[120px]">
                    {employee.role}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* View Details Eye Icon Button */}
          <button
            type="button"
            onClick={() => onView(employee)}
            title="Quick view full details"
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Department and Gender Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${deptConfig.badge}`}>
            <DeptIcon className="w-3 h-3" />
            <span>{employee.department}</span>
          </span>

          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${GENDER_BADGE_STYLE[employee.gender] || 'bg-slate-100 text-slate-700'}`}>
            {employee.gender}
          </span>
        </div>

        {/* Contact & Addresses Info */}
        <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
          {/* Phone Number */}
          <div className="flex items-center justify-between group/phone">
            <a
              href={`tel:${employee.phone}`}
              className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-emerald-600 transition-colors truncate"
              title="Call phone number"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{employee.phone}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              title="Copy phone number"
              className="p-1 text-slate-400 hover:text-slate-700 opacity-60 group-hover/phone:opacity-100 transition-opacity"
            >
              {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* Local Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block leading-tight">
                Local Address
              </span>
              <p className={`text-slate-700 leading-snug mt-0.5 ${showFullAddress ? '' : 'line-clamp-1'}`}>
                {employee.localAddress}
              </p>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="flex items-start gap-2">
            <Home className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block leading-tight">
                Permanent Address
              </span>
              <p className={`text-slate-700 leading-snug mt-0.5 ${showFullAddress ? '' : 'line-clamp-1'}`}>
                {employee.permanentAddress}
              </p>
            </div>
          </div>

          {/* Expand/Collapse Address Button for mobile & tight views */}
          <div className="pt-1 text-right">
            <button
              type="button"
              onClick={() => setShowFullAddress(!showFullAddress)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 font-medium"
            >
              <span>{showFullAddress ? 'Show less' : 'View full addresses'}</span>
              {showFullAddress ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Card Action Footer: Edit and Delete */}
      <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(employee)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50/60 active:bg-emerald-100 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs"
        >
          <Pencil className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(employee)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 active:bg-rose-700 rounded-lg border border-rose-200 hover:border-rose-600 transition-colors shadow-2xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
