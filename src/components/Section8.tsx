// src/components/Section8.tsx
import { useState } from 'react';
import { Participant, TaskPerformance } from '../types';

interface Section8Props {
    testEnvironment: string;
    setTestEnvironment: (value: string) => void;
    participants: Participant[];
    setParticipants: (participants: Participant[]) => void;
    taskPerformance: TaskPerformance[];
    setTaskPerformance: (performance: TaskPerformance[]) => void;
    criticalTasks: { id: number; name: string }[];
}

export const Section8: React.FC<Section8Props> = ({
    testEnvironment,
    setTestEnvironment,
    participants,
    setParticipants,
    taskPerformance,
    setTaskPerformance,
    criticalTasks
}) => {
    const [showParticipantForm, setShowParticipantForm] = useState(false);
    const [participantFormData, setParticipantFormData] = useState<Participant>({
        id: '',
        userGroup: '',
        demographics: ''
    });

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskFormData, setTaskFormData] = useState({
        task: '',
        attempts: 0,
        successes: 0
    });

    const addParticipant = () => {
        if (!participantFormData.id || !participantFormData.userGroup) {
            alert('Please fill in Participant ID and User Group');
            return;
        }
        setParticipants([...participants, participantFormData]);
        setParticipantFormData({ id: '', userGroup: '', demographics: '' });
        setShowParticipantForm(false);
    };

    const deleteParticipant = (id: string) => {
        setParticipants(participants.filter(p => p.id !== id));
    };

    const addTaskPerformance = () => {
        if (!taskFormData.task) {
            alert('Please select a task');
            return;
        }
        const existing = taskPerformance.find(tp => tp.task === taskFormData.task);
        if (existing) {
            setTaskPerformance(
                taskPerformance.map(tp =>
                    tp.task === taskFormData.task
                        ? {
                            ...tp,
                            attempts: tp.attempts + taskFormData.attempts,
                            successes: tp.successes + taskFormData.successes
                        }
                        : tp
                )
            );
        } else {
            setTaskPerformance([
                ...taskPerformance,
                { ...taskFormData, id: Date.now() }
            ]);
        }
        setTaskFormData({ task: '', attempts: 0, successes: 0 });
        setShowTaskForm(false);
    };

    const calculateSuccessRate = (tp: TaskPerformance) => {
        if (tp.attempts === 0) return '0';
        return ((tp.successes / tp.attempts) * 100).toFixed(1);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Section 8: Validation Testing</h2>
            <p className="text-gray-600 mb-6">
                Document validation testing protocol, participants, and results.
            </p>

            {/* Test Environment */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Test Environment</h3>
                <textarea
                    value={testEnvironment}
                    onChange={(e) => setTestEnvironment(e.target.value)}
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the simulated use environment for validation testing. Include: location setup, equipment provided, environmental conditions, time constraints, and any other relevant context that matches real-world use."
                />
            </div>

            {/* Participants */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-xl font-semibold">Participants</h3>
                        <p className="text-sm text-gray-600">Minimum 15 per distinct user group</p>
                    </div>
                    <button
                        onClick={() => setShowParticipantForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add Participant
                    </button>
                </div>

                {showParticipantForm && (
                    <div className="border rounded-lg p-4 mb-4 bg-blue-50">
                        <h4 className="font-semibold mb-3">Add Participant</h4>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Participant ID (e.g., P001)"
                                value={participantFormData.id}
                                onChange={(e) =>
                                    setParticipantFormData({ ...participantFormData, id: e.target.value })
                                }
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="User Group"
                                value={participantFormData.userGroup}
                                onChange={(e) =>
                                    setParticipantFormData({ ...participantFormData, userGroup: e.target.value })
                                }
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Demographics (age, experience, etc.)"
                                value={participantFormData.demographics}
                                onChange={(e) =>
                                    setParticipantFormData({ ...participantFormData, demographics: e.target.value })
                                }
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={addParticipant}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setShowParticipantForm(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {participants.map(p => (
                        <div key={p.id} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold">{p.id}</span>
                                <button
                                    onClick={() => deleteParticipant(p.id)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-sm text-gray-700">
                                <strong>Group:</strong> {p.userGroup}
                            </p>
                            {p.demographics && (
                                <p className="text-sm text-gray-600 mt-1">{p.demographics}</p>
                            )}
                        </div>
                    ))}
                </div>

                {participants.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">
                            <strong>Total Participants:</strong> {participants.length}
                        </p>
                    </div>
                )}
            </div>

            {/* Task Performance */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Task Performance</h3>
                    <button
                        onClick={() => setShowTaskForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add Task Result
                    </button>
                </div>

                {showTaskForm && (
                    <div className="border rounded-lg p-4 mb-4 bg-blue-50">
                        <h4 className="font-semibold mb-3">Add Task Performance</h4>
                        <div className="space-y-3">
                            <select
                                value={taskFormData.task}
                                onChange={(e) => setTaskFormData({ ...taskFormData, task: e.target.value })}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Critical Task</option>
                                {criticalTasks.map(task => (
                                    <option key={task.id} value={task.name}>
                                        {task.name}
                                    </option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Total Attempts</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={taskFormData.attempts}
                                        onChange={(e) =>
                                            setTaskFormData({ ...taskFormData, attempts: parseInt(e.target.value) || 0 })
                                        }
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Successful</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={taskFormData.successes}
                                        onChange={(e) =>
                                            setTaskFormData({
                                                ...taskFormData,
                                                successes: parseInt(e.target.value) || 0
                                            })
                                        }
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={addTaskPerformance}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Add
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
                    {taskPerformance.map(tp => {
                        const successRate = calculateSuccessRate(tp);
                        const isAcceptable = parseFloat(successRate) >= 90;

                        return (
                            <div
                                key={tp.id}
                                className={`border rounded-lg p-4 ${isAcceptable ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-semibold mb-2">{tp.task}</h4>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Attempts</p>
                                                <p className="text-lg font-semibold">{tp.attempts}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Successes</p>
                                                <p className="text-lg font-semibold text-green-600">{tp.successes}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Success Rate</p>
                                                <p
                                                    className={`text-lg font-semibold ${isAcceptable ? 'text-green-600' : 'text-yellow-600'
                                                        }`}
                                                >
                                                    {successRate}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setTaskPerformance(taskPerformance.filter(t => t.id !== tp.id))}
                                        className="text-red-600 hover:text-red-800 text-sm ml-4"
                                    >
                                        Delete
                                    </button>
                                </div>
                                {!isAcceptable && (
                                    <div className="mt-2 text-sm text-yellow-700">
                                        ⚠️ Success rate below 90% threshold - may require investigation
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {taskPerformance.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No task performance data yet. Add results from your validation testing.
                    </div>
                )}
            </div>
        </div>
    );
};