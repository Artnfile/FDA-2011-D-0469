// src/components/Section10.tsx
import React from 'react';
import { AppState } from '../types';
import { exportToJSON } from '../utils/storage';

interface Section10Props {
  appState: AppState;
}

export const Section10: React.FC<Section10Props> = ({ appState }) => {
  const handleJSONExport = () => {
    exportToJSON(appState, appState.projectName || 'fda-report');
  };

  const handleWordExport = () => {
    alert('Word export functionality will be implemented with docx library');
    // Will implement with exportWord utility
  };

  const handlePDFExport = () => {
    alert('PDF export functionality will be implemented with jsPDF library');
    // Will implement with exportPDF utility
  };

  // Calculate completion status
  const getSectionStatus = () => {
    const sections = [
      {
        id: 1,
        name: 'Conclusion',
        complete:
          !!appState.safetyStatement || !!appState.processSummary || !!appState.residualRisk
      },
      {
        id: 2,
        name: 'Users, Uses & Environments',
        complete:
          appState.userGroups.length > 0 ||
          appState.useEnvironments.length > 0 ||
          !!appState.trainingData
      },
      {
        id: 3,
        name: 'Device UI Description',
        complete:
          appState.uiComponents.length > 0 ||
          !!appState.operationalWorkflow ||
          !!appState.labelingDocs
      },
      {
        id: 4,
        name: 'Known Use Problems',
        complete: appState.knownProblems.length > 0 || !!appState.designResponse
      },
      {
        id: 5,
        name: 'Risk Analysis',
        complete: appState.hazards.length > 0
      },
      {
        id: 6,
        name: 'Preliminary Analyses',
        complete:
          appState.taskAnalyses.length > 0 ||
          appState.heuristicFindings.length > 0 ||
          appState.expertReviews.length > 0 ||
          appState.formativeEvals.length > 0 ||
          !!appState.designMods
      },
      {
        id: 7,
        name: 'Critical Tasks',
        complete: appState.criticalTasks.length > 0
      },
      {
        id: 8,
        name: 'Validation Testing',
        complete:
          !!appState.testEnvironment ||
          appState.participants.length > 0 ||
          appState.taskPerformance.length > 0
      },
      {
        id: 9,
        name: 'Documentation',
        complete: Object.values(appState.docChecklist).some(v => v) || !!appState.docNotes
      }
    ];

    const completedCount = sections.filter(s => s.complete).length;
    return { sections, completedCount, totalCount: sections.length };
  };

  const status = getSectionStatus();
  const completionPercentage = ((status.completedCount / status.totalCount) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 10: Export Report</h2>
      <p className="text-gray-600 mb-6">Review completion status and export your FDA report.</p>

      {/* Completion Status */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Report Completion Status</h3>

        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Overall Progress</span>
            <span className="text-sm text-gray-600">
              {status.completedCount} of {status.totalCount} sections ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          {status.sections.map(section => (
            <div
              key={section.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                section.complete
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="font-medium">
                Section {section.id}: {section.name}
              </span>
              {section.complete ? (
                <span className="text-green-600 font-semibold">✓ Complete</span>
              ) : (
                <span className="text-gray-400">Incomplete</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Export Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* JSON Export */}
          <div className="border rounded-lg p-4 hover:shadow-md transition">
           <div className="flex items-center mb-3">
              <div className="ml-3">
                <h4 className="font-semibold">JSON</h4>
                <p className="text-xs text-gray-600">Data Backup</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Export all data as JSON for backup or transfer. Can be re-imported later.
            </p>
            <button
              onClick={handleJSONExport}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Export JSON
            </button>
          </div>

          {/* Word Export */}
          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <div className="ml-3">
                <h4 className="font-semibold">Word</h4>
                <p className="text-xs text-gray-600">FDA Submission</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate Word document ready for submission review.
            </p>
            <button
              onClick={handleWordExport}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Export Word
            </button>
          </div>

          {/* PDF Export */}
          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <div className="ml-3">
                <h4 className="font-semibold">PDF</h4>
                <p className="text-xs text-gray-600">Quick Review</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate PDF summary for quick review and sharing with team.
            </p>
            <button
              onClick={handlePDFExport}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Project Info Summary */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Project Information</h3>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Project Name</p>
              <p className="font-semibold">
                {appState.projectName || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Device Name</p>
              <p className="font-semibold">
                {appState.deviceName || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Saved</p>
              <p className="font-semibold">
                {appState.lastSaved
                  ? new Date(appState.lastSaved).toLocaleString()
                  : 'Never'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Version</p>
              <p className="font-semibold">Phase 3A</p>
            </div>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {status.completedCount < status.totalCount && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-gray-700">
            <strong>⚠️ Report Incomplete:</strong> {status.totalCount - status.completedCount}{' '}
            section(s) have no data. FDA submissions typically require all sections to be
            completed. Review incomplete sections before final export.
          </p>
        </div>
      )}

      {/* FDA Compliance Note */}
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="text-sm text-gray-700">
          <strong>FDA Compliance:</strong> This tool assists in organizing your FDA Human Factors
          report per guidance FDA-2011-D-0469. You are responsible for ensuring all content meets
          FDA requirements and your specific regulatory obligations. Consult with regulatory
          affairs professionals before submission.
        </p>
      </div>
    </div>
  );
};