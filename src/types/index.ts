// src/types/index.ts
// TypeScript type definitions for FDA Usability Report App

export interface UserGroup {
  id: number;
  name: string;
  characteristics: string;
  knowledge: string;
  training: string;
  physical: string;
  sensory: string;
  cognitive: string;
}

export interface UseEnvironment {
  id: number;
  name: string;
  description: string;
  lighting: string;
  noise: string;
  space: string;
  other: string;
}

export interface UIComponent {
  id: number;
  category: 'physical' | 'display' | 'feedback' | 'labeling';
  type: string;
  description: string;
  location: string;
  function: string;
}

export interface KnownProblem {
  id: number;
  source: string;
  date: string;
  deviceType: string;
  problem: string;
  outcome: string;
  rootCause: string;
}

export interface Hazard {
  id: number;
  name: string;
  description: string;
  hazardousSituation: string;
  harm: string;
  probability: number;
  severity: number;
  controls: string;
}

export interface TaskAnalysis {
  id: number;
  task: string;
  breakdown: string;
  physical: string;
  cognitive: string;
  perceptual: string;
  decisions: string;
}

export interface HeuristicFinding {
  id: number;
  heuristic: string;
  finding: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  recommendation: string;
}

export interface ExpertReview {
  id: number;
  expertName: string;
  qualification: string;
  finding: string;
  recommendation: string;
}

export interface FormativeEvaluation {
  id: number;
  iteration: string;
  participants: string;
  method: string;
  findings: string;
  modifications: string;
}

export interface CriticalTask {
  id: number;
  name: string;
  description: string;
  rationale: string;
  acceptanceCriteria: string;
}

export interface Participant {
  id: string;
  userGroup: string;
  demographics: string;
}

export interface TaskPerformance {
  id: number;
  task: string;
  attempts: number;
  successes: number;
}

export interface DocumentChecklist {
  ifu: boolean;
  userManual: boolean;
  quickStart: boolean;
  packageInsert: boolean;
  trainingMaterials: boolean;
  riskAnalysis: boolean;
  taskAnalysis: boolean;
  formativeEval: boolean;
  validationProtocol: boolean;
  dataForms: boolean;
  participantDemo: boolean;
  testResults: boolean;
}

export interface AppState {
  projectName: string;
  deviceName: string;
  // Section 1
  safetyStatement: string;
  processSummary: string;
  residualRisk: string;
  // Section 2
  userGroups: UserGroup[];
  useEnvironments: UseEnvironment[];
  trainingData: string;
  // Section 3
  uiComponents: UIComponent[];
  operationalWorkflow: string;
  labelingDocs: string;
  // Section 4
  knownProblems: KnownProblem[];
  designResponse: string;
  // Section 5
  hazards: Hazard[];
  // Section 6
  taskAnalyses: TaskAnalysis[];
  heuristicFindings: HeuristicFinding[];
  expertReviews: ExpertReview[];
  formativeEvals: FormativeEvaluation[];
  designMods: string;
  // Section 7
  criticalTasks: CriticalTask[];
  // Section 8
  testEnvironment: string;
  participants: Participant[];
  taskPerformance: TaskPerformance[];
  // Section 9
  docChecklist: DocumentChecklist;
  docNotes: string;
  // Meta
  completedSections: number[];
  lastSaved?: string;
}