// src/components/Section5.tsx
import React, { useState } from 'react';
import { Hazard } from '../types';

interface Section5Props {
  hazards: Hazard[];
  setHazards: (hazards: Hazard[]) => void;
}

const getRiskLevel = (p: number, s: number) => {
  const score = p * s;
  if (score <= 4) return { level: 'Low', color: 'bg-green-100 text-green-800' };
  if (score <= 8) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
  return { level: 'High', color: 'bg-red-100 text-red-800' };
};

export const Section5: React.FC<Section5Props> = ({ hazards, setHazards }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Hazard, 'id'>>({
    name: '',
    description: '',
    hazardousSituation: '',
    harm: '',
    probability: 1,
    severity: 1,
    controls: ''
  });

  const addHazard = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      hazardousSituation: '',
      harm: '',
      probability: 1,
      severity: 1,
      controls: ''
    });
  };

  const editHazard = (hazard: Hazard) => {
    setShowForm(true);
    setEditingId(hazard.id);
    setFormData({
      name: hazard.name,
      description: hazard.description,
      hazardousSituation: hazard.hazardousSituation,
      harm: hazard.harm,
      probability: hazard.probability,
      severity: hazard.severity,
      controls: hazard.controls
    });
  };

  const saveHazard = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in Name and Description');
      return;
    }

    if (editingId) {
      setHazards(hazards.map(h => (h.id === editingId ? { ...formData, id: editingId } : h)));
    } else {
      setHazards([...hazards, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const deleteHazard = (id: number) => {
    setHazards(hazards.filter(h => h.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 5: Analysis of Hazards and Risks</h2>
      <p className="text-gray-600 mb-6">
        Identify use-related hazards, assess risks, and document controls per ISO 14971.
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Hazards & Risk Controls</h3>
          <button
            onClick={addHazard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Hazard
          </button>
        </div>

        {showForm && (
          <div className="border rounded-lg p-4 mb-4 bg-blue-50">
            <h4 className="font-semibold mb-3">{editingId ? 'Edit' : 'Add'} Hazard</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Hazard Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Hazard Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Hazardous Situation"
                value={formData.hazardousSituation}
                onChange={(e) => setFormData({ ...formData, hazardousSituation: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Potential Harm"
                value={formData.harm}
                onChange={(e) => setFormData({ ...formData, harm: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <label className="block text-sm mb-1">Probability (1-5)</label>
                <select
                  value={formData.probability}
                  onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 - Rare</option>
                  <option value="2">2 - Unlikely</option>
                  <option value="3">3 - Possible</option>
                  <option value="4">4 - Likely</option>
                  <option value="5">5 - Very Likely</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Severity (1-5)</label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 - Negligible</option>
                  <option value="2">2 - Minor</option>
                  <option value="3">3 - Moderate</option>
                  <option value="4">4 - Serious</option>
                  <option value="5">5 - Critical</option>
                </select>
              </div>
              <textarea
                placeholder="Risk Controls & Mitigation"
                value={formData.controls}
                onChange={(e) => setFormData({ ...formData, controls: e.target.value })}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={saveHazard}
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
          {hazards.map(hazard => {
            const risk = getRiskLevel(hazard.probability, hazard.severity);
            const riskScore = hazard.probability * hazard.severity;
            return (
              <div key={hazard.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-lg">{hazard.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${risk.color}`}>
                        {risk.level} Risk (P{hazard.probability}×S{hazard.severity}={riskScore})
                      </span>
                    </div>
                    <p className="text-sm mb-2">{hazard.description}</p>
                    {hazard.hazardousSituation && (
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Situation:</strong> {hazard.hazardousSituation}
                      </p>
                    )}
                    {hazard.harm && (
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Harm:</strong> {hazard.harm}
                      </p>
                    )}
                    {hazard.controls && (
                      <p className="text-sm text-blue-900">
                        <strong>Controls:</strong> {hazard.controls}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => editHazard(hazard)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHazard(hazard.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};