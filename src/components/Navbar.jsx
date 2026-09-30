import React from 'react';
import { Sprout, UserPlus, RotateCcw, Database } from 'lucide-react';

export default function Navbar({ onOpenAddModal, onResetData, totalCount }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 ring-2 ring-emerald-500/20">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  AgriCorp <span className="text-emerald-600 font-extrabold">Hub</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Assignment 3
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Farm Employee Directory & Operations Management
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Reset Mock Data Button */}
            <button
              type="button"
              onClick={onResetData}
              title="Reset directory back to initial mock dataset"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-400"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Reset Mock Data</span>
              <span className="md:hidden">Reset</span>
            </button>

            {/* Add Employee Button */}
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-[0.98] rounded-lg shadow-sm shadow-emerald-700/25 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
