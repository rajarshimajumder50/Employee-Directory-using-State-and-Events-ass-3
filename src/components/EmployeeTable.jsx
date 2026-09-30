import React from 'react';
import { Pencil, Trash2, Eye, Phone, MapPin, Home, Wheat, Milk, Droplets, Egg, Truck } from 'lucide-react';
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

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onView
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Staff Member
              </th>
              <th scope="col" className="px-4 py-3.5">
                EMP ID
              </th>
              <th scope="col" className="px-4 py-3.5">
                Department
              </th>
              <th scope="col" className="px-4 py-3.5">
                Gender
              </th>
              <th scope="col" className="px-4 py-3.5">
                Phone Number
              </th>
              <th scope="col" className="px-4 py-3.5">
                Local Address
              </th>
              <th scope="col" className="px-4 py-3.5">
                Permanent Address
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => {
              const deptConfig = DEPARTMENT_CONFIG[emp.department] || {
                badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
              };
              const DeptIcon = ICON_MAP[emp.department] || Wheat;
              const initials = emp.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join('')
                .toUpperCase();

              return (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Name + Initials */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {emp.name}
                        </div>
                        {emp.role && (
                          <div className="text-xs text-slate-400">
                            {emp.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Employee ID */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {emp.id}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${deptConfig.badge}`}>
                      <DeptIcon className="w-3 h-3" />
                      <span>{emp.department}</span>
                    </span>
                  </td>

                  {/* Gender */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${GENDER_BADGE_STYLE[emp.gender] || 'bg-slate-100 text-slate-700'}`}>
                      {emp.gender}
                    </span>
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <a
                      href={`tel:${emp.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{emp.phone}</span>
                    </a>
                  </td>

                  {/* Local Address */}
                  <td className="px-4 py-4 max-w-[200px]">
                    <div className="flex items-start gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="truncate" title={emp.localAddress}>
                        {emp.localAddress}
                      </span>
                    </div>
                  </td>

                  {/* Permanent Address */}
                  <td className="px-4 py-4 max-w-[200px]">
                    <div className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Home className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="truncate" title={emp.permanentAddress}>
                        {emp.permanentAddress}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onView(emp)}
                        title="View Full Details"
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        title="Edit Employee"
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(emp)}
                        title="Delete Employee"
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
