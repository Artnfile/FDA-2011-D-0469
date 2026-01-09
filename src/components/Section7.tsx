// src/components/Section7.tsx
import React, { useState } from 'react';
import { CriticalTask } from '../types';

interface Section7Props {
  criticalTasks: CriticalTask[];
  setCriticalTasks: (tasks: CriticalTask[]) => void;
}

export const Section7: React.FC<Section7Props> = ({ criticalTasks, setCriticalTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<CriticalTask, 'id'>>({
    name: '',
    description: '',
    rationale: '',
    acceptanceCriteria: ''
  });

  const addTask = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      rationale: '',
      acceptanceCriteria: ''
    });
  };

  const editTask = (task: CriticalTask) => {
    setShowForm(true);
    setEditingId(task.id);
    setFormData({
      name: task.name,
      description: task.description,
      rationale: task.rationale,
      acceptanceCriteria: task.acceptanceCriteria
    });
  };

  const saveTask = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in at least Name and Description');
      return;
    }

    if (editingId) {
      setCriticalTasks(
        criticalTasks.map(t => (t.id === editingId ? { ...formData, id: editingId } : t))
      );
    } else {
      setCriticalTasks([...criticalTasks, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const deleteTask = (id: number) => {
    setCriticalTasks(criticalTasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 7: Critical Tasks</h2>
      <p className="text-gray-600 mb-6">
        Identify and document all critical tasks - those where use error could result in harm.
      </p>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Critical Tasks List</h3>
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Critical Task
        </button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 mb-4 bg-blue-50">
          <h4 className="font-semibold mb-3">{editingId ? 'Edit' : 'Add'} Critical Task</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Task Name</label>
              <input
                type="text"
                placeholder="e.g., Set infusion rate"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Task Description</label>
              <textarea
                placeholder="Detailed description of the task and how it is performed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Rationale for Criticality
              </label>
              <textarea
                placeholder="Explain why this task is critical. What harm could result from use error?"
                value={formData.rationale}
                onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
                className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Acceptance Criteria</label>
              <textarea
                placeholder="Define success criteria for validation testing. What must participants do correctly?"
                value={formData.acceptanceCriteria}
                onChange={(e) => setFormData({ ...formData, acceptanceCriteria: e.target.value })}
                className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={saveTask}
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
        {criticalTasks.map((task, idx) => (
          <div key={task.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2">
                  CRITICAL
                </span>
                <span className="font-semibold text-lg">
                  {idx + 1}. {task.name}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editTask(task)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Description:</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>

              {task.rationale && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Rationale:</p>
                  <p className="text-sm text-gray-600">{task.rationale}</p>
                </div>
              )}

              {task.acceptanceCriteria && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Acceptance Criteria:</p>
                  <p className="text-sm text-gray-600">{task.acceptanceCriteria}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {criticalTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No critical tasks defined yet. Click "Add Critical Task" to begin.
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-gray-700">
          <strong>FDA Guidance:</strong> Critical tasks are those where use error could result in
          serious harm to the patient or user. All critical tasks must be included in validation
          testing. Document the link between each task and potential harm in the rationale.
        </p>
      </div>
    </div>
  );
};