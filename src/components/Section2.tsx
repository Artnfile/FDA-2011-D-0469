// src/components/Section2.tsx
import React from 'react';
import { UserGroup, UseEnvironment } from '../types';

interface Section2Props {
  userGroups: UserGroup[];
  setUserGroups: (groups: UserGroup[]) => void;
  useEnvironments: UseEnvironment[];
  setUseEnvironments: (envs: UseEnvironment[]) => void;
  trainingData: string;
  setTrainingData: (value: string) => void;
}

export const Section2: React.FC<Section2Props> = ({
  userGroups,
  setUserGroups,
  useEnvironments,
  setUseEnvironments,
  trainingData,
  setTrainingData
}) => {
  const addUserGroup = () => {
    setUserGroups([...userGroups, {
      id: Date.now(),
      name: '',
      characteristics: '',
      knowledge: '',
      training: '',
      physical: '',
      sensory: '',
      cognitive: ''
    }]);
  };

  const updateUserGroup = (id: number, field: keyof UserGroup, value: string) => {
    setUserGroups(userGroups.map(g =>
      g.id === id ? { ...g, [field]: value } : g
    ));
  };

  const deleteUserGroup = (id: number) => {
    setUserGroups(userGroups.filter(g => g.id !== id));
  };

  const addEnvironment = () => {
    setUseEnvironments([...useEnvironments, {
      id: Date.now(),
      name: '',
      description: '',
      lighting: '',
      noise: '',
      space: '',
      other: ''
    }]);
  };

  const updateEnvironment = (id: number, field: keyof UseEnvironment, value: string) => {
    setUseEnvironments(useEnvironments.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const deleteEnvironment = (id: number) => {
    setUseEnvironments(useEnvironments.filter(e => e.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Section 2: Device Users, Uses, and Use Environments</h2>

      {/* User Groups */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">User Groups</h3>
          <button
            onClick={addUserGroup}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add User Group
          </button>
        </div>

        {userGroups.map((group, idx) => (
          <div key={group.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">User Group {idx + 1}</h4>
              <button
                onClick={() => deleteUserGroup(group.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Group Name (e.g., Primary Care Physicians)"
                value={group.name}
                onChange={(e) => updateUserGroup(group.id, 'name', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="General Characteristics"
                value={group.characteristics}
                onChange={(e) => updateUserGroup(group.id, 'characteristics', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Knowledge & Experience"
                value={group.knowledge}
                onChange={(e) => updateUserGroup(group.id, 'knowledge', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Training Requirements"
                value={group.training}
                onChange={(e) => updateUserGroup(group.id, 'training', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Physical Capabilities"
                value={group.physical}
                onChange={(e) => updateUserGroup(group.id, 'physical', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Sensory Capabilities"
                value={group.sensory}
                onChange={(e) => updateUserGroup(group.id, 'sensory', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Cognitive Capabilities"
                value={group.cognitive}
                onChange={(e) => updateUserGroup(group.id, 'cognitive', e.target.value)}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Use Environments */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Use Environments</h3>
          <button
            onClick={addEnvironment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Environment
          </button>
        </div>

        {useEnvironments.map((env, idx) => (
          <div key={env.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Environment {idx + 1}</h4>
              <button
                onClick={() => deleteEnvironment(env.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Environment Name (e.g., Hospital Operating Room)"
                value={env.name}
                onChange={(e) => updateEnvironment(env.id, 'name', e.target.value)}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description & Context"
                value={env.description}
                onChange={(e) => updateEnvironment(env.id, 'description', e.target.value)}
                className="p-2 border rounded-lg lg:col-span-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Lighting Conditions"
                value={env.lighting}
                onChange={(e) => updateEnvironment(env.id, 'lighting', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Noise Level"
                value={env.noise}
                onChange={(e) => updateEnvironment(env.id, 'noise', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Space Constraints"
                value={env.space}
                onChange={(e) => updateEnvironment(env.id, 'space', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Other Factors (temperature, humidity, etc.)"
                value={env.other}
                onChange={(e) => updateEnvironment(env.id, 'other', e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Training */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Training & Support</h3>
        <textarea
          value={trainingData}
          onChange={(e) => setTrainingData(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the training provided to users. Include: training duration, format (hands-on, video, manual), key topics covered, competency verification methods, and any ongoing support or refresher training plans."
        />
      </div>
    </div>
  );
};