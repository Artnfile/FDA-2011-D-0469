// src/components/Section4.tsx
import React, { useState } from 'react';
import { KnownProblem } from '../types';

interface Section4Props {
  knownProblems: KnownProblem[];
  setKnownProblems: (problems: KnownProblem[]) => void;
  designResponse: string;
  setDesignResponse: (value: string) => void;
}

export const Section4: React.FC<Section4Props> = ({
  knownProblems,
  setKnownProblems,
  designResponse,
  setDesignResponse
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<KnownProblem, 'id'>>({
    source: '',
    date: '',
    deviceType: '',
    problem: '',
    outcome: '',
    rootCause: ''
  });

  const addProblem = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      source: '',
      date: '',
      deviceType: '',
      problem: '',
      outcome: '',
      rootCause: ''
    });
  };

  const editProblem = (prob: KnownProblem) => {
    setShowForm(true);
    setEditingId(prob.id);
    setFormData({
      source: prob.source,
      date: prob.date,
      deviceType: prob.deviceType,
      problem: prob.problem,
      outcome: prob.outcome,
      rootCause: prob.rootCause
    });
  };

  const saveProblem = () => {
    if (!formData.source || !formData.problem) {
      alert('Please fill in at least Source and Problem');
      return;
    }

    if (editingId) {
      setKnownProblems(
        knownProblems.map(p => (p.id === editingId ? { ...formData, id: editingId } : p))
      );
    } else {
      setKnownProblems([...knownProblems, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const deleteProblem = (id: number) => {
    setKnownProblems(knownProblems.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 4: Known Use Problems</h2>
      <p className="text-gray-600 mb-6">
        Document known use-related problems from similar devices and how they informed your design.
      </p>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Known Problems from Similar Devices</h3>
          <button
            onClick={addProblem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Problem
          </button>
        </div>

        {showForm && (
          <div className="border rounded-lg p-4 mb-4 bg-blue-50">
            <h4 className="font-semibold mb-3">{editingId ? 'Edit' : 'Add'} Known Problem</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Source (MAUDE, recall, literature, etc.)"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Device Type/Model"
                value={formData.deviceType}
                onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Problem Description"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                className="p-2 border rounded-lg lg:col-span-2 h-24 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Outcome/Consequences"
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Root Cause (if known)"
                value={formData.rootCause}
                onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={saveProblem}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {knownProblems.map((prob, idx) => (
            <div key={prob.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold">Problem {idx + 1}</span>
                  <span className="ml-3 text-sm text-gray-600">{prob.source}</span>
                  {prob.date && <span className="ml-3 text-sm text-gray-600">{prob.date}</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProblem(prob)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProblem(prob.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {prob.deviceType && (
                <p className="text-sm mb-2">
                  <strong>Device:</strong> {prob.deviceType}
                </p>
              )}
              <p className="text-sm mb-2">
                <strong>Problem:</strong> {prob.problem}
              </p>
              {prob.outcome && (
                <p className="text-sm mb-2">
                  <strong>Outcome:</strong> {prob.outcome}
                </p>
              )}
              {prob.rootCause && (
                <p className="text-sm text-gray-700">
                  <strong>Root Cause:</strong> {prob.rootCause}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Design Response to Known Problems</h3>
        <textarea
          value={designResponse}
          onChange={(e) => setDesignResponse(e.target.value)}
          className="w-full p-3 border rounded-lg h-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe how the known problems informed your device design. Explain specific design features, controls, or safeguards implemented to prevent similar issues. Link each design decision to the problems identified above. Example: 'To address confusion between start/stop buttons seen in similar devices, our design uses distinct shapes (triangle for start, square for stop) and color coding (green/red) with tactile differentiation.'"
        />
      </div>
    </div>
  );
};