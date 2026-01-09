// src/App.tsx
import { useState, useEffect } from 'react';
import { AppState } from './types';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import { Sidebar } from './components/Sidebar';
import { Section1 } from './components/Section1';
import { Section2 } from './components/Section2';
import { Section3 } from './components/Section3';
import { Section4 } from './components/Section4';
import { Section5 } from './components/Section5';
import { Section6 } from './components/Section6';
import { Section7 } from './components/Section7';
import { Section8 } from './components/Section8';
import { Section9 } from './components/Section9';
import { Section10 } from './components/Section10';

function App() {
  // Project info
  const [projectName, setProjectName] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [currentSection, setCurrentSection] = useState(1);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Section 1: Conclusion
  const [safetyStatement, setSafetyStatement] = useState('');
  const [processSummary, setProcessSummary] = useState('');
  const [residualRisk, setResidualRisk] = useState('');

  // Section 2: Users, Uses & Environments
  const [userGroups, setUserGroups] = useState<AppState['userGroups']>([]);
  const [useEnvironments, setUseEnvironments] = useState<AppState['useEnvironments']>([]);
  const [trainingData, setTrainingData] = useState('');

  // Section 3: Device UI Description
  const [uiComponents, setUiComponents] = useState<AppState['uiComponents']>([]);
  const [operationalWorkflow, setOperationalWorkflow] = useState('');
  const [labelingDocs, setLabelingDocs] = useState('');

  // Section 4: Known Use Problems
  const [knownProblems, setKnownProblems] = useState<AppState['knownProblems']>([]);
  const [designResponse, setDesignResponse] = useState('');

  // Section 5: Risk Analysis
  const [hazards, setHazards] = useState<AppState['hazards']>([]);

  // Section 6: Preliminary Analyses
  const [taskAnalyses, setTaskAnalyses] = useState<AppState['taskAnalyses']>([]);
  const [heuristicFindings, setHeuristicFindings] = useState<AppState['heuristicFindings']>([]);
  const [expertReviews, setExpertReviews] = useState<AppState['expertReviews']>([]);
  const [formativeEvals, setFormativeEvals] = useState<AppState['formativeEvals']>([]);
  const [designMods, setDesignMods] = useState('');

  // Section 7: Critical Tasks
  const [criticalTasks, setCriticalTasks] = useState<AppState['criticalTasks']>([]);

  // Section 8: Validation Testing
  const [testEnvironment, setTestEnvironment] = useState('');
  const [participants, setParticipants] = useState<AppState['participants']>([]);
  const [taskPerformance, setTaskPerformance] = useState<AppState['taskPerformance']>([]);

  // Section 9: Documentation
  const [docChecklist, setDocChecklist] = useState<AppState['docChecklist']>({
    ifu: false,
    userManual: false,
    quickStart: false,
    packageInsert: false,
    trainingMaterials: false,
    riskAnalysis: false,
    taskAnalysis: false,
    formativeEval: false,
    validationProtocol: false,
    dataForms: false,
    participantDemo: false,
    testResults: false
  });
  const [docNotes, setDocNotes] = useState('');

  // Load data on mount
  useEffect(() => {
    const loadedData = loadFromLocalStorage();
    if (loadedData) {
      setProjectName(loadedData.projectName || '');
      setDeviceName(loadedData.deviceName || '');
      setSafetyStatement(loadedData.safetyStatement || '');
      setProcessSummary(loadedData.processSummary || '');
      setResidualRisk(loadedData.residualRisk || '');
      setUserGroups(loadedData.userGroups || []);
      setUseEnvironments(loadedData.useEnvironments || []);
      setTrainingData(loadedData.trainingData || '');
      setUiComponents(loadedData.uiComponents || []);
      setOperationalWorkflow(loadedData.operationalWorkflow || '');
      setLabelingDocs(loadedData.labelingDocs || '');
      setKnownProblems(loadedData.knownProblems || []);
      setDesignResponse(loadedData.designResponse || '');
      setHazards(loadedData.hazards || []);
      setTaskAnalyses(loadedData.taskAnalyses || []);
      setHeuristicFindings(loadedData.heuristicFindings || []);
      setExpertReviews(loadedData.expertReviews || []);
      setFormativeEvals(loadedData.formativeEvals || []);
      setDesignMods(loadedData.designMods || '');
      setCriticalTasks(loadedData.criticalTasks || []);
      setTestEnvironment(loadedData.testEnvironment || '');
      setParticipants(loadedData.participants || []);
      setTaskPerformance(loadedData.taskPerformance || []);
      setDocChecklist(
        loadedData.docChecklist || {
          ifu: false,
          userManual: false,
          quickStart: false,
          packageInsert: false,
          trainingMaterials: false,
          riskAnalysis: false,
          taskAnalysis: false,
          formativeEval: false,
          validationProtocol: false,
          dataForms: false,
          participantDemo: false,
          testResults: false
        }
      );
      setDocNotes(loadedData.docNotes || '');
      setCompletedSections(loadedData.completedSections || []);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleSave();
    }, 30000);

    return () => clearInterval(timer);
  });

  const handleSave = () => {
    const appState: AppState = {
      projectName,
      deviceName,
      safetyStatement,
      processSummary,
      residualRisk,
      userGroups,
      useEnvironments,
      trainingData,
      uiComponents,
      operationalWorkflow,
      labelingDocs,
      knownProblems,
      designResponse,
      hazards,
      taskAnalyses,
      heuristicFindings,
      expertReviews,
      formativeEvals,
      designMods,
      criticalTasks,
      testEnvironment,
      participants,
      taskPerformance,
      docChecklist,
      docNotes,
      completedSections
    };

    saveToLocalStorage(appState);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <Section1
            safetyStatement={safetyStatement}
            setSafetyStatement={setSafetyStatement}
            processSummary={processSummary}
            setProcessSummary={setProcessSummary}
            residualRisk={residualRisk}
            setResidualRisk={setResidualRisk}
          />
        );
      case 2:
        return (
          <Section2
            userGroups={userGroups}
            setUserGroups={setUserGroups}
            useEnvironments={useEnvironments}
            setUseEnvironments={setUseEnvironments}
            trainingData={trainingData}
            setTrainingData={setTrainingData}
          />
        );
      case 3:
        return (
          <Section3
            uiComponents={uiComponents}
            setUiComponents={setUiComponents}
            operationalWorkflow={operationalWorkflow}
            setOperationalWorkflow={setOperationalWorkflow}
            labelingDocs={labelingDocs}
            setLabelingDocs={setLabelingDocs}
          />
        );
      case 4:
        return (
          <Section4
            knownProblems={knownProblems}
            setKnownProblems={setKnownProblems}
            designResponse={designResponse}
            setDesignResponse={setDesignResponse}
          />
        );
      case 5:
        return <Section5 hazards={hazards} setHazards={setHazards} />;
      case 6:
        return (
          <Section6
            taskAnalyses={taskAnalyses}
            setTaskAnalyses={setTaskAnalyses}
            heuristicFindings={heuristicFindings}
            setHeuristicFindings={setHeuristicFindings}
            expertReviews={expertReviews}
            setExpertReviews={setExpertReviews}
            formativeEvals={formativeEvals}
            setFormativeEvals={setFormativeEvals}
            designMods={designMods}
            setDesignMods={setDesignMods}
          />
        );
      case 7:
        return <Section7 criticalTasks={criticalTasks} setCriticalTasks={setCriticalTasks} />;
      case 8:
        return (
          <Section8
            testEnvironment={testEnvironment}
            setTestEnvironment={setTestEnvironment}
            participants={participants}
            setParticipants={setParticipants}
            taskPerformance={taskPerformance}
            setTaskPerformance={setTaskPerformance}
            criticalTasks={criticalTasks}
          />
        );
      case 9:
        return (
          <Section9
            docChecklist={docChecklist}
            setDocChecklist={setDocChecklist}
            docNotes={docNotes}
            setDocNotes={setDocNotes}
          />
        );
      case 10:
        return (
          <Section10
            appState={{
              projectName,
              deviceName,
              safetyStatement,
              processSummary,
              residualRisk,
              userGroups,
              useEnvironments,
              trainingData,
              uiComponents,
              operationalWorkflow,
              labelingDocs,
              knownProblems,
              designResponse,
              hazards,
              taskAnalyses,
              heuristicFindings,
              expertReviews,
              formativeEvals,
              designMods,
              criticalTasks,
              testEnvironment,
              participants,
              taskPerformance,
              docChecklist,
              docNotes,
              completedSections
            }}
          />
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg no-print sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">FDA HF and Usability Generator</h1>
              <p className="text-xs lg:text-sm text-blue-100">
                IEC 62366-1 / FDA-2011-D-0469 Compliant
              </p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-1 rounded-lg text-gray-800 mb-1 w-48 text-sm focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="px-3 py-1 rounded-lg text-gray-800 w-48 text-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          completedSections={completedSections}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {renderSection()}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              💾 Save Now
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;