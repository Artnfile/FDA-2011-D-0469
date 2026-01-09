// src/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  completedSections: number[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const sections = [
  { id: 1, name: 'Conclusion'},
  { id: 2, name: 'Users, Uses & Environments' },
  { id: 3, name: 'Device UI Description' },
  { id: 4, name: 'Known Use Problems' },
  { id: 5, name: 'Risk Analysis' },
  { id: 6, name: 'Preliminary Analyses' },
  { id: 7, name: 'Critical Tasks'},
  { id: 8, name: 'Validation Testing' },
  { id: 9, name: 'Documentation' },
  { id: 10, name: 'Export Report' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  setCurrentSection,
  completedSections,
  sidebarOpen,
  setSidebarOpen
}) => {
  const handleSectionClick = (sectionId: number) => {
    setCurrentSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0 bottom-0
          w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          z-50
          overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button (mobile only) */}
        <div className="lg:hidden p-4 border-b flex justify-between items-center">
          <span className="font-semibold">Navigation</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Report Sections
            </h3>
          </div>

          {sections.map(section => {
            const isActive = currentSection === section.id;
            const isCompleted = completedSections.includes(section.id);

            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`
                  w-full text-left p-3 rounded-lg mb-2 transition-all
                  flex items-center justify-between
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <span className="text-lg mr-2 flex-shrink-0">{section.icon}</span>
                  <span className="text-sm font-medium truncate">{section.name}</span>
                </div>
                {isCompleted && !isActive && (
                  <span className="text-green-600 ml-2 flex-shrink-0">✓</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t mt-auto">
          <div className="text-xs text-gray-500">
            <p className="font-semibold mb-1">FDA Guidance</p>
            <p>FDA-2011-D-0469</p>
            <p className="mt-2">IEC 62366-1 | ISO 14971</p>
          </div>
        </div>
      </aside>
    </>
  );
};