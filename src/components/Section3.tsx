// src/components/Section3.tsx
import React, { useState } from 'react';
import { UIComponent } from '../types';

interface Section3Props {
  uiComponents: UIComponent[];
  setUiComponents: (components: UIComponent[]) => void;
  operationalWorkflow: string;
  setOperationalWorkflow: (value: string) => void;
  labelingDocs: string;
  setLabelingDocs: (value: string) => void;
}

const categories = [
  { value: 'physical' as const, label: 'Physical Controls' },
  { value: 'display' as const, label: 'Display Elements' },
  { value: 'feedback' as const, label: 'Feedback Mechanisms' },
  { value: 'labeling' as const, label: 'Labeling' }
];

export const Section3: React.FC<Section3Props> = ({
  uiComponents,
  setUiComponents,
  operationalWorkflow,
  setOperationalWorkflow,
  labelingDocs,
  setLabelingDocs
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<UIComponent, 'id'>>({
    category: 'physical',
    type: '',
    description: '',
    location: '',
    function: ''
  });

  const addComponent = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      category: 'physical',
      type: '',
      description: '',
      location: '',
      function: ''
    });
  };

  const editComponent = (comp: UIComponent) => {
    setShowForm(true);
    setEditingId(comp.id);
    setFormData({
      category: comp.category,
      type: comp.type,
      description: comp.description,
      location: comp.location,
      function: comp.function
    });
  };

  const saveComponent = () => {
    if (!formData.type || !formData.description) {
      alert('Please fill in at least Type and Description');
      return;
    }

    if (editingId) {
      setUiComponents(
        uiComponents.map(c => (c.id === editingId ? { ...formData, id: editingId } : c))
      );
    } else {
      setUiComponents([...uiComponents, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const deleteComponent = (id: number) => {
    setUiComponents(uiComponents.filter(c => c.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 3: Device User Interface Description</h2>
      <p className="text-gray-600 mb-6">
        Document all user interface components and operational workflow.
      </p>

      {/* UI Components */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">UI Components</h3>
          <button
            onClick={addComponent}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add UI Component
          </button>
        </div>

        {showForm && (
          <div className="border rounded-lg p-4 mb-4 bg-blue-50">
            <h4 className="font-semibold mb-3">{editingId ? 'Edit' : 'Add'} UI Component</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as UIComponent['category']
                  })
                }
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Type (e.g., Power Button, LED Indicator)"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description (appearance, size, color, etc.)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location on device"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Function & user interaction"
                value={formData.function}
                onChange={(e) => setFormData({ ...formData, function: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={saveComponent}
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

        <div className="space-y-3">
          {uiComponents.map(comp => (
            <div key={comp.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                    {categories.find(c => c.value === comp.category)?.label}
                  </span>
                  <span className="font-semibold">{comp.type}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editComponent(comp)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComponent(comp.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Description:</strong> {comp.description}
              </p>
              {comp.location && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {comp.location}
                </p>
              )}
              {comp.function && (
                <p className="text-sm text-gray-600">
                  <strong>Function:</strong> {comp.function}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Operational Workflow */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Operational Workflow</h3>
        <textarea
          value={operationalWorkflow}
          onChange={(e) => setOperationalWorkflow(e.target.value)}
          className="w-full p-3 border rounded-lg h-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the step-by-step workflow for typical device operation. Include: startup procedure, normal use sequence, alarm/alert handling, shutdown procedure. Example:&#10;1. Power on device by pressing power button&#10;2. Select patient profile from main menu&#10;3. Attach sensors to patient&#10;4. Verify readings on display&#10;5. Begin monitoring..."
        />
      </div>

      {/* Labeling & Documentation */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Labeling & Documentation</h3>
        <textarea
          value={labelingDocs}
          onChange={(e) => setLabelingDocs(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="List all labeling and documentation provided with the device: Instructions for Use (IFU), User Manual, Quick Start Guide, Training Materials, On-device labels, Warning labels, Symbol legend. Note version numbers and languages available."
        />
      </div>
    </div>
  );
};