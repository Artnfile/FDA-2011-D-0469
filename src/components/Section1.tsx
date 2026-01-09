// src/components/Section1.tsx
import React from 'react';

interface Section1Props {
  safetyStatement: string;
  setSafetyStatement: (value: string) => void;
  processSummary: string;
  setProcessSummary: (value: string) => void;
  residualRisk: string;
  setResidualRisk: (value: string) => void;
}

export const Section1: React.FC<Section1Props> = ({
  safetyStatement,
  setSafetyStatement,
  processSummary,
  setProcessSummary,
  residualRisk,
  setResidualRisk
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 1: Conclusion</h2>
      <p className="text-gray-600 mb-6">
        Summarize the human factors validation results and overall safety conclusion.
      </p>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Safety Statement</label>
        <textarea
          value={safetyStatement}
          onChange={(e) => setSafetyStatement(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="State whether the device can be used safely and effectively by the intended users. Example: 'Based on the validation testing with 18 participants representing the intended user population, the [Device Name] can be used safely and effectively for its intended use. All critical tasks were completed successfully with no use errors that could result in harm.'"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Process Summary</label>
        <textarea
          value={processSummary}
          onChange={(e) => setProcessSummary(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Briefly describe the human factors engineering process followed. Include: formative evaluations conducted, design iterations made, validation testing approach, and standards followed (IEC 62366-1, ISO 14971)."
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Residual Risk Statement</label>
        <textarea
          value={residualRisk}
          onChange={(e) => setResidualRisk(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe any residual use-related risks that remain after validation. Include risk acceptability rationale and any post-market monitoring plans. If no significant residual risks: 'All identified use-related risks have been mitigated to acceptable levels through design controls and validation testing.'"
        />
      </div>
    </div>
  );
};