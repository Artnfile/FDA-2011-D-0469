// src/components/Section9.tsx
import React from 'react';
import { DocumentChecklist } from '../types';

interface Section9Props {
  docChecklist: DocumentChecklist;
  setDocChecklist: (checklist: DocumentChecklist) => void;
  docNotes: string;
  setDocNotes: (value: string) => void;
}

const documents = [
  { key: 'ifu' as keyof DocumentChecklist, label: 'Instructions for Use (IFU)' },
  { key: 'userManual' as keyof DocumentChecklist, label: 'User Manual' },
  { key: 'quickStart' as keyof DocumentChecklist, label: 'Quick Start Guide' },
  { key: 'packageInsert' as keyof DocumentChecklist, label: 'Package Insert' },
  { key: 'trainingMaterials' as keyof DocumentChecklist, label: 'Training Materials' },
  { key: 'riskAnalysis' as keyof DocumentChecklist, label: 'Risk Analysis Documentation' },
  { key: 'taskAnalysis' as keyof DocumentChecklist, label: 'Task Analysis Documentation' },
  { key: 'formativeEval' as keyof DocumentChecklist, label: 'Formative Evaluation Report' },
  {
    key: 'validationProtocol' as keyof DocumentChecklist,
    label: 'Validation Test Protocol'
  },
  { key: 'dataForms' as keyof DocumentChecklist, label: 'Data Collection Forms' },
  {
    key: 'participantDemo' as keyof DocumentChecklist,
    label: 'Participant Demographics Summary'
  },
  { key: 'testResults' as keyof DocumentChecklist, label: 'Validation Test Results' }
];

export const Section9: React.FC<Section9Props> = ({
  docChecklist,
  setDocChecklist,
  docNotes,
  setDocNotes
}) => {
  const toggleDocument = (key: keyof DocumentChecklist) => {
    setDocChecklist({
      ...docChecklist,
      [key]: !docChecklist[key]
    });
  };

  const completedCount = Object.values(docChecklist).filter(Boolean).length;
  const totalCount = documents.length;
  const completionPercentage = ((completedCount / totalCount) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 9: Documentation</h2>
      <p className="text-gray-600 mb-6">
        Track all supporting documentation required for FDA submission.
      </p>

      {/* Progress */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Documentation Progress</span>
          <span className="text-sm text-gray-600">
            {completedCount} of {totalCount} documents ({completionPercentage}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
        <div className="space-y-2">
          {documents.map(doc => (
            <label
              key={doc.key}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <input
                type="checkbox"
                checked={docChecklist[doc.key]}
                onChange={() => toggleDocument(doc.key)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-3 flex-1">{doc.label}</span>
              {docChecklist[doc.key] && (
                <span className="text-green-600 text-sm font-medium">✓ Complete</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Documentation Notes</h3>
        <textarea
          value={docNotes}
          onChange={(e) => setDocNotes(e.target.value)}
          className="w-full p-3 border rounded-lg h-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Document version numbers, locations, responsible parties, and any other relevant notes about the documentation. Example:&#10;&#10;IFU - Version 2.1, Doc Control #IFU-2024-001&#10;User Manual - Version 2.0, Located in SharePoint&#10;Validation Protocol - Version 1.0, Approved by QA on 12/15/2024&#10;Test Results - Final report pending medical writer review"
        />
      </div>

      {/* FDA Guidance */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-gray-700">
          <strong>FDA Guidance:</strong> All documents should be version-controlled and readily
          available for FDA review. Ensure all references in this report match the actual document
          versions. Include document control numbers where applicable.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => {
            const allChecked = Object.values(docChecklist).every(Boolean);
            const newChecklist = { ...docChecklist };
            documents.forEach(doc => {
              newChecklist[doc.key] = !allChecked;
            });
            setDocChecklist(newChecklist);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm"
        >
          {Object.values(docChecklist).every(Boolean) ? 'Uncheck All' : 'Check All'}
        </button>
        <button
          onClick={() => {
            const missing = documents.filter(doc => !docChecklist[doc.key]);
            if (missing.length === 0) {
              alert('All documents are complete!');
            } else {
              alert(
                `Missing documents:\n\n${missing.map(doc => '• ' + doc.label).join('\n')}`
              );
            }
          }}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
        >
          Show Missing Documents
        </button>
      </div>
    </div>
  );
};