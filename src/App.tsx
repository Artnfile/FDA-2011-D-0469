import { useState, useEffect } from 'react'
import { Save, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react'

const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (e) {
    console.error('Storage error:', e)
    return false
  }
}

const loadFromStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (e) {
    console.error('Load error:', e)
    return null
  }
}

interface Section {
  id: number
  title: string
  completed: boolean
  fields: { [key: string]: string }
}

function App() {
  const [currentSection, setCurrentSection] = useState(1)
  const [projectName, setProjectName] = useState('')
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [sections, setSections] = useState<Section[]>([
    { id: 1, title: 'Conclusion', completed: false, fields: {} },
    { id: 2, title: 'Users, Uses & Environments', completed: false, fields: {} },
    { id: 3, title: 'Device User Interface', completed: false, fields: {} },
    { id: 4, title: 'Known Use Problems', completed: false, fields: {} },
    { id: 5, title: 'Risk Analysis', completed: false, fields: {} },
    { id: 6, title: 'Preliminary Analyses', completed: false, fields: {} },
    { id: 7, title: 'Critical Tasks', completed: false, fields: {} },
    { id: 8, title: 'Validation Testing', completed: false, fields: {} },
    { id: 9, title: 'Documentation', completed: false, fields: {} },
    { id: 10, title: 'Export & Review', completed: false, fields: {} },
  ])

  useEffect(() => {
    const saved = loadFromStorage('usability-report')
    if (saved) {
      setProjectName(saved.projectName || '')
      setSections(saved.sections || sections)
      setLastSaved(saved.lastSaved || null)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSave()
    }, 30000)
    return () => clearTimeout(timer)
  }, [sections, projectName])

  const handleSave = () => {
    const data = {
      projectName,
      sections,
      lastSaved: new Date().toISOString(),
    }
    if (saveToStorage('usability-report', data)) {
      setLastSaved(data.lastSaved)
    }
  }

  const updateField = (field: string, value: string) => {
    setSections(prev => prev.map(s =>
      s.id === currentSection
        ? { ...s, fields: { ...s.fields, [field]: value } }
        : s
    ))
  }

  const getField = (field: string) => {
    const section = sections.find(s => s.id === currentSection)
    return section?.fields[field] || ''
  }

  const toggleComplete = () => {
    setSections(prev => prev.map(s =>
      s.id === currentSection
        ? { ...s, completed: !s.completed }
        : s
    ))
  }

  const exportToJSON = () => {
    const data = {
      projectName,
      sections,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName || 'usability-report'}.json`
    a.click()
  }

  const exportToMarkdown = () => {
    let md = `# ${projectName || 'Usability Report'}\n\n`
    md += `**Generated:** ${new Date().toLocaleString()}\n\n---\n\n`
    sections.forEach(section => {
      md += `## ${section.title}\n\n`
      md += `**Status:** ${section.completed ? '✅ Complete' : '⏳ In Progress'}\n\n`
      Object.entries(section.fields).forEach(([key, value]) => {
        md += `### ${key}\n\n${value}\n\n`
      })
      md += `---\n\n`
    })
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName || 'usability-report'}.md`
    a.click()
  }

  const completedCount = sections.filter(s => s.completed).length
  const progress = (completedCount / sections.length) * 100
  const currentSectionData = sections.find(s => s.id === currentSection)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FDA Usability Report</h1>
                <p className="text-sm text-gray-500">Human Factors Validation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {lastSaved && (
                <span className="text-sm text-gray-500">
                  Saved: {new Date(lastSaved).toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{completedCount}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      currentSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm">{section.id}. {section.title}</span>
                    {section.completed && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <button
                  onClick={exportToJSON}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={exportToMarkdown}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Markdown</span>
                </button>
              </div>
            </div>
          </aside>

          <main className="col-span-9">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Section {currentSection}: {currentSectionData?.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete all required fields for this section
                  </p>
                </div>
                <button
                  onClick={toggleComplete}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentSectionData?.completed
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {currentSectionData?.completed ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Mark Complete</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                {currentSection === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Safety and Effectiveness Statement
                      </label>
                      <textarea
                        value={getField('safetyStatement')}
                        onChange={(e) => updateField('safetyStatement', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                        placeholder="The device has been found to be safe and effective for the intended users, uses and use environments..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        HFE/UE Process Summary
                      </label>
                      <textarea
                        value={getField('processSummary')}
                        onChange={(e) => updateField('processSummary', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                        placeholder="Brief summary of HFE/UE processes conducted..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Residual Risk Discussion
                      </label>
                      <textarea
                        value={getField('residualRisk')}
                        onChange={(e) => updateField('residualRisk', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                        placeholder="Discussion of any remaining use-related risks..."
                      />
                    </div>
                  </>
                )}

                {currentSection === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intended User Populations
                      </label>
                      <textarea
                        value={getField('userPopulations')}
                        onChange={(e) => updateField('userPopulations', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                        placeholder="Describe the intended user populations..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Use Environments
                      </label>
                      <textarea
                        value={getField('useEnvironments')}
                        onChange={(e) => updateField('useEnvironments', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                        placeholder="Describe where the device will be used..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Training
                      </label>
                      <textarea
                        value={getField('training')}
                        onChange={(e) => updateField('training', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                        placeholder="Describe expected training for users..."
                      />
                    </div>
                  </>
                )}

                {currentSection > 2 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Section {currentSection}: {currentSectionData?.title}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      This is a simplified MVP. Full form fields for this section will be added in the next version.
                    </p>
                    <textarea
                      value={getField('notes')}
                      onChange={(e) => updateField('notes', e.target.value)}
                      className="w-full max-w-2xl mx-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
                      placeholder="Enter notes for this section..."
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
                  disabled={currentSection === 1}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCurrentSection(Math.min(10, currentSection + 1))}
                  disabled={currentSection === 10}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App