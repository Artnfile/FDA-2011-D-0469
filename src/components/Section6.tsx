// src/components/Section6.tsx
import React, { useState } from 'react';
import {
  TaskAnalysis,
  HeuristicFinding,
  ExpertReview,
  FormativeEvaluation
} from '../types';

interface Section6Props {
  taskAnalyses: TaskAnalysis[];
  setTaskAnalyses: (analyses: TaskAnalysis[]) => void;
  heuristicFindings: HeuristicFinding[];
  setHeuristicFindings: (findings: HeuristicFinding[]) => void;
  expertReviews: ExpertReview[];
  setExpertReviews: (reviews: ExpertReview[]) => void;
  formativeEvals: FormativeEvaluation[];
  setFormativeEvals: (evals: FormativeEvaluation[]) => void;
  designMods: string;
  setDesignMods: (value: string) => void;
}

export const Section6: React.FC<Section6Props> = ({
  taskAnalyses,
  setTaskAnalyses,
  heuristicFindings,
  setHeuristicFindings,
  expertReviews,
  setExpertReviews,
  formativeEvals,
  setFormativeEvals,
  designMods,
  setDesignMods
}) => {
  const [activeTab, setActiveTab] = useState<'task' | 'heuristic' | 'expert' | 'formative' | 'summary'>('task');

  // Task Analysis State
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [taskFormData, setTaskFormData] = useState<Omit<TaskAnalysis, 'id'>>({
    task: '',
    breakdown: '',
    physical: '',
    cognitive: '',
    perceptual: '',
    decisions: ''
  });

  const addTaskAnalysis = () => {
    setShowTaskForm(true);
    setEditingTaskId(null);
    setTaskFormData({
      task: '',
      breakdown: '',
      physical: '',
      cognitive: '',
      perceptual: '',
      decisions: ''
    });
  };

  const saveTaskAnalysis = () => {
    if (!taskFormData.task) {
      alert('Please provide task name');
      return;
    }
    if (editingTaskId) {
      setTaskAnalyses(
        taskAnalyses.map(t => (t.id === editingTaskId ? { ...taskFormData, id: editingTaskId } : t))
      );
    } else {
      setTaskAnalyses([...taskAnalyses, { ...taskFormData, id: Date.now() }]);
    }
    setShowTaskForm(false);
  };

  // Heuristic Findings State
  const [showHeuristicForm, setShowHeuristicForm] = useState(false);
  const [editingHeuristicId, setEditingHeuristicId] = useState<number | null>(null);
  const [heuristicFormData, setHeuristicFormData] = useState<Omit<HeuristicFinding, 'id'>>({
    heuristic: '',
    finding: '',
    severity: 'minor',
    recommendation: ''
  });

  const addHeuristicFinding = () => {
    setShowHeuristicForm(true);
    setEditingHeuristicId(null);
    setHeuristicFormData({
      heuristic: '',
      finding: '',
      severity: 'minor',
      recommendation: ''
    });
  };

  const saveHeuristicFinding = () => {
    if (!heuristicFormData.heuristic || !heuristicFormData.finding) {
      alert('Please provide heuristic and finding');
      return;
    }
    if (editingHeuristicId) {
      setHeuristicFindings(
        heuristicFindings.map(h =>
          h.id === editingHeuristicId ? { ...heuristicFormData, id: editingHeuristicId } : h
        )
      );
    } else {
      setHeuristicFindings([...heuristicFindings, { ...heuristicFormData, id: Date.now() }]);
    }
    setShowHeuristicForm(false);
  };

  // Expert Reviews State
  const [showExpertForm, setShowExpertForm] = useState(false);
  const [editingExpertId, setEditingExpertId] = useState<number | null>(null);
  const [expertFormData, setExpertFormData] = useState<Omit<ExpertReview, 'id'>>({
    expertName: '',
    qualification: '',
    finding: '',
    recommendation: ''
  });

  const addExpertReview = () => {
    setShowExpertForm(true);
    setEditingExpertId(null);
    setExpertFormData({
      expertName: '',
      qualification: '',
      finding: '',
      recommendation: ''
    });
  };

  const saveExpertReview = () => {
    if (!expertFormData.expertName || !expertFormData.finding) {
      alert('Please provide expert name and finding');
      return;
    }
    if (editingExpertId) {
      setExpertReviews(
        expertReviews.map(e =>
          e.id === editingExpertId ? { ...expertFormData, id: editingExpertId } : e
        )
      );
    } else {
      setExpertReviews([...expertReviews, { ...expertFormData, id: Date.now() }]);
    }
    setShowExpertForm(false);
  };

  // Formative Evaluations State
  const [showFormativeForm, setShowFormativeForm] = useState(false);
  const [editingFormativeId, setEditingFormativeId] = useState<number | null>(null);
  const [formativeFormData, setFormativeFormData] = useState<Omit<FormativeEvaluation, 'id'>>({
    iteration: '',
    participants: '',
    method: '',
    findings: '',
    modifications: ''
  });

  const addFormativeEval = () => {
    setShowFormativeForm(true);
    setEditingFormativeId(null);
    setFormativeFormData({
      iteration: '',
      participants: '',
      method: '',
      findings: '',
      modifications: ''
    });
  };

  const saveFormativeEval = () => {
    if (!formativeFormData.iteration || !formativeFormData.findings) {
      alert('Please provide iteration and findings');
      return;
    }
    if (editingFormativeId) {
      setFormativeEvals(
        formativeEvals.map(f =>
          f.id === editingFormativeId ? { ...formativeFormData, id: editingFormativeId } : f
        )
      );
    } else {
      setFormativeEvals([...formativeEvals, { ...formativeFormData, id: Date.now() }]);
    }
    setShowFormativeForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 6: Preliminary Analyses and Evaluations</h2>
      <p className="text-gray-600 mb-6">Document formative research and iterative design improvements.</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {[
          { id: 'task' as const, label: 'Task Analysis' },
          { id: 'heuristic' as const, label: 'Heuristic Eval' },
          { id: 'expert' as const, label: 'Expert Reviews' },
          { id: 'formative' as const, label: 'Formative Evals' },
          { id: 'summary' as const, label: 'Summary' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task Analysis Tab */}
      {activeTab === 'task' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Task Analyses</h3>
            <button
              onClick={addTaskAnalysis}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Task Analysis
            </button>
          </div>

          {showTaskForm && (
            <div className="border rounded-lg p-4 mb-4 bg-blue-50">
              <h4 className="font-semibold mb-3">
                {editingTaskId ? 'Edit' : 'Add'} Task Analysis
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={taskFormData.task}
                  onChange={(e) => setTaskFormData({ ...taskFormData, task: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Task Breakdown (step-by-step)"
                  value={taskFormData.breakdown}
                  onChange={(e) =>
                    setTaskFormData({ ...taskFormData, breakdown: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Physical Requirements"
                  value={taskFormData.physical}
                  onChange={(e) => setTaskFormData({ ...taskFormData, physical: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Cognitive Load"
                  value={taskFormData.cognitive}
                  onChange={(e) =>
                    setTaskFormData({ ...taskFormData, cognitive: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Perceptual Requirements"
                  value={taskFormData.perceptual}
                  onChange={(e) =>
                    setTaskFormData({ ...taskFormData, perceptual: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Key Decisions"
                  value={taskFormData.decisions}
                  onChange={(e) =>
                    setTaskFormData({ ...taskFormData, decisions: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={saveTaskAnalysis}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {taskAnalyses.map((ta, idx) => (
              <div key={ta.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">
                    {idx + 1}. {ta.task}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTaskId(ta.id);
                        setTaskFormData(ta);
                        setShowTaskForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setTaskAnalyses(taskAnalyses.filter(t => t.id !== ta.id))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {ta.breakdown && (
                  <p className="text-sm mb-1">
                    <strong>Breakdown:</strong> {ta.breakdown}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Heuristic Findings Tab */}
      {activeTab === 'heuristic' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Heuristic Evaluations</h3>
            <button
              onClick={addHeuristicFinding}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Finding
            </button>
          </div>

          {showHeuristicForm && (
            <div className="border rounded-lg p-4 mb-4 bg-blue-50">
              <h4 className="font-semibold mb-3">
                {editingHeuristicId ? 'Edit' : 'Add'} Heuristic Finding
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Heuristic (e.g., Visibility of system status)"
                  value={heuristicFormData.heuristic}
                  onChange={(e) =>
                    setHeuristicFormData({ ...heuristicFormData, heuristic: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Finding Description"
                  value={heuristicFormData.finding}
                  onChange={(e) =>
                    setHeuristicFormData({ ...heuristicFormData, finding: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={heuristicFormData.severity}
                  onChange={(e) =>
                    setHeuristicFormData({
                      ...heuristicFormData,
                      severity: e.target.value as HeuristicFinding['severity']
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="minor">Minor</option>
                  <option value="moderate">Moderate</option>
                  <option value="major">Major</option>
                  <option value="critical">Critical</option>
                </select>
                <textarea
                  placeholder="Recommendation"
                  value={heuristicFormData.recommendation}
                  onChange={(e) =>
                    setHeuristicFormData({ ...heuristicFormData, recommendation: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={saveHeuristicFinding}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowHeuristicForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {heuristicFindings.map((hf, idx) => (
              <div key={hf.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold">{idx + 1}. {hf.heuristic}</span>
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {hf.severity}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingHeuristicId(hf.id);
                        setHeuristicFormData(hf);
                        setShowHeuristicForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setHeuristicFindings(heuristicFindings.filter(h => h.id !== hf.id))
                      }
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm mb-1">
                  <strong>Finding:</strong> {hf.finding}
                </p>
                {hf.recommendation && (
                  <p className="text-sm text-gray-700">
                    <strong>Recommendation:</strong> {hf.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expert Reviews Tab */}
      {activeTab === 'expert' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Expert Reviews</h3>
            <button
              onClick={addExpertReview}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Review
            </button>
          </div>

          {showExpertForm && (
            <div className="border rounded-lg p-4 mb-4 bg-blue-50">
              <h4 className="font-semibold mb-3">
                {editingExpertId ? 'Edit' : 'Add'} Expert Review
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Expert Name"
                  value={expertFormData.expertName}
                  onChange={(e) =>
                    setExpertFormData({ ...expertFormData, expertName: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Qualification (e.g., MD, PhD, 15 years experience)"
                  value={expertFormData.qualification}
                  onChange={(e) =>
                    setExpertFormData({ ...expertFormData, qualification: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Finding"
                  value={expertFormData.finding}
                  onChange={(e) =>
                    setExpertFormData({ ...expertFormData, finding: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Recommendation"
                  value={expertFormData.recommendation}
                  onChange={(e) =>
                    setExpertFormData({ ...expertFormData, recommendation: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={saveExpertReview}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowExpertForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {expertReviews.map((er, idx) => (
              <div key={er.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold">{idx + 1}. {er.expertName}</span>
                    <p className="text-xs text-gray-600">{er.qualification}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingExpertId(er.id);
                        setExpertFormData(er);
                        setShowExpertForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setExpertReviews(expertReviews.filter(e => e.id !== er.id))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm mb-1">
                  <strong>Finding:</strong> {er.finding}
                </p>
                {er.recommendation && (
                  <p className="text-sm text-gray-700">
                    <strong>Recommendation:</strong> {er.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formative Evaluations Tab */}
      {activeTab === 'formative' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Formative Evaluations</h3>
            <button
              onClick={addFormativeEval}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Evaluation
            </button>
          </div>

          {showFormativeForm && (
            <div className="border rounded-lg p-4 mb-4 bg-blue-50">
              <h4 className="font-semibold mb-3">
                {editingFormativeId ? 'Edit' : 'Add'} Formative Evaluation
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Iteration (e.g., Prototype V2)"
                  value={formativeFormData.iteration}
                  onChange={(e) =>
                    setFormativeFormData({ ...formativeFormData, iteration: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Number of Participants"
                  value={formativeFormData.participants}
                  onChange={(e) =>
                    setFormativeFormData({ ...formativeFormData, participants: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Method (e.g., Think-aloud protocol)"
                  value={formativeFormData.method}
                  onChange={(e) =>
                    setFormativeFormData({ ...formativeFormData, method: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Key Findings"
                  value={formativeFormData.findings}
                  onChange={(e) =>
                    setFormativeFormData({ ...formativeFormData, findings: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Design Modifications Made"
                  value={formativeFormData.modifications}
                  onChange={(e) =>
                    setFormativeFormData({ ...formativeFormData, modifications: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={saveFormativeEval}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowFormativeForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {formativeEvals.map((fe, idx) => (
              <div key={fe.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold">
                      {idx + 1}. {fe.iteration}
                    </span>
                    <p className="text-xs text-gray-600">
                      {fe.participants} participants | {fe.method}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingFormativeId(fe.id);
                        setFormativeFormData(fe);
                        setShowFormativeForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setFormativeEvals(formativeEvals.filter(f => f.id !== fe.id))
                      }
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm mb-1">
                  <strong>Findings:</strong> {fe.findings}
                </p>
                {fe.modifications && (
                  <p className="text-sm text-gray-700">
                    <strong>Modifications:</strong> {fe.modifications}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Design Modifications Summary</h3>
          <textarea
            value={designMods}
            onChange={(e) => setDesignMods(e.target.value)}
            className="w-full p-3 border rounded-lg h-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Summarize all design modifications made based on preliminary analyses. Connect findings from task analyses, heuristic evaluations, expert reviews, and formative evaluations to specific design changes. Example: 'Based on Task Analysis #2 and Heuristic Finding #3, we modified the button layout to improve reachability and reduce cognitive load...'"
          />
        </div>
      )}
    </div>
  );
};