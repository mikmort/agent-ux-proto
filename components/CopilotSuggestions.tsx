'use client';

import { useState, useEffect, useRef } from 'react';
import { Suggestion } from '@/lib/types';
import { Button, Card, Spinner, Text } from '@fluentui/react-components';
import {
  Search24Regular,
  List24Regular,
  ArrowUp24Regular,
  Mail24Regular,
  Sparkle24Filled,
  Checkmark24Filled,
  DocumentSearch24Regular,
  Box24Regular,
  Building24Regular,
  ShoppingBag24Regular,
  Money24Regular,
  Library24Regular,
  Lightbulb24Regular,
  Add24Regular,
  Apps24Regular,
  Person24Regular,
  ChatSparkle24Filled,
  ChatSparkle24Regular,
  BookSearch24Regular,
  Notebook24Regular,
  MoreHorizontal24Regular,
  Mic24Regular,
  Wrench24Regular,
  DataPie24Regular,
  Send24Filled,
} from '@fluentui/react-icons';

interface CopilotSuggestionsProps {
  suggestions: Suggestion[];
  onStartChat: () => void;
}

const iconMap: Record<string, any> = {
  Search: Search24Regular,
  TaskList: List24Regular,
  ArrowUpload: ArrowUp24Regular,
  Mail: Mail24Regular,
};

interface AnalysisStep {
  id: string;
  label: string;
  detail: string;
  icon: any;
  status: 'pending' | 'running' | 'complete';
  result?: string;
}

interface TaskItem {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'complete';
  details?: {
    oldItem: string;
    newItem: string;
    oldPrice: string;
    newPrice: string;
    notes: string;
  };
}

export default function CopilotSuggestions({ suggestions, onStartChat }: CopilotSuggestionsProps) {
  const [loading, setLoading] = useState(true);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [totalSteps] = useState(7);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const hasRun = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasRun.current) return;
    hasRun.current = true;

    const runAnalysis = async () => {
      const allSteps = [
        {
          id: 'email',
          label: 'Analyzing email content',
          detail: 'Extracting key information from supplier notification',
          icon: Mail24Regular,
          result: 'Order #SW-2847 • ProSound PX-500 • 1-week delay due to snowstorm',
        },
        {
          id: 'po',
          label: 'Finding purchase order details',
          detail: 'Querying Dynamics 365 for order #SW-2847',
          icon: DocumentSearch24Regular,
          result: 'PO-2847 • 100 units ordered • Supplier: SoundWave Pro Audio',
        },
        {
          id: 'sales',
          label: 'Searching for affected sales orders',
          detail: 'Checking events requiring ProSound PX-500 speakers',
          icon: ShoppingBag24Regular,
          result: 'Found 3 events requiring PX-500 speakers (TechCon, Music Festival, Awards Gala)',
        },
        {
          id: 'inventory',
          label: 'Checking inventory across warehouses',
          detail: 'Scanning stock levels in all locations',
          icon: Box24Regular,
          result: '15 units in stock • Insufficient for all events',
        },
        {
          id: 'suppliers',
          label: 'Finding alternate suppliers',
          detail: 'Searching supplier network for faster delivery options',
          icon: Building24Regular,
          result: '3 certified suppliers found with 3-5 day delivery',
        },
        {
          id: 'alternates',
          label: 'Checking for substitute products',
          detail: 'Looking for compatible speaker systems in stock',
          icon: Search24Regular,
          result: 'PX-800 Premium available • 65 units in stock • Compatible upgrade',
        },
        {
          id: 'impact',
          label: 'Calculating revenue impact',
          detail: 'Analyzing financial risk across affected events',
          icon: Money24Regular,
          result: '$225,000 revenue at risk across 3 events',
        },
      ];

      for (let i = 0; i < allSteps.length; i++) {
        const step = allSteps[i];

        // Add the new step with 'running' status
        setAnalysisSteps(prev => [...prev, { ...step, status: 'running' as const }]);

        // Simulate processing time (between 1200-2400ms per step)
        await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1200));

        // Mark the last added step (most recent) as complete
        setAnalysisSteps(prev =>
          prev.map((s, idx) =>
            idx === prev.length - 1
              ? { ...s, status: 'complete' as const, result: step.result }
              : s
          )
        );
      }

      // Wait a moment before showing suggestions
      await new Promise(resolve => setTimeout(resolve, 1600));
      setLoading(false);
      setShowSuggestions(true);
    };

    runAnalysis();
  }, []);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [analysisSteps, showSuggestions, tasks]);

  const handleSuggestionClick = async (suggestionId: string) => {
    if (suggestionId === 'sug-003') {
      // Premium speaker upgrade
      setSelectedAction('premium-upgrade');

      // Simulate updating sales orders
      const orderTasks: TaskItem[] = [
        {
          id: 'task-1',
          title: 'Updating Sales Order EVT-2201 (TechCon 2026 Summit)',
          status: 'pending',
          details: {
            oldItem: 'ProSound PX-500 Portable Speaker (50 units)',
            newItem: 'ProSound PX-800 Premium Speaker (50 units)',
            oldPrice: '$125,000',
            newPrice: '$150,000',
            notes: 'Premium upgrade includes immediate availability and extended warranty',
          },
        },
        {
          id: 'task-2',
          title: 'Updating Sales Order EVT-2202 (City Music Festival)',
          status: 'pending',
          details: {
            oldItem: 'ProSound PX-500 Portable Speaker (25 units)',
            newItem: 'ProSound PX-800 Premium Speaker (25 units)',
            oldPrice: '$62,500',
            newPrice: '$75,000',
            notes: 'Premium upgrade with 3-year warranty extension',
          },
        },
      ];

      setTasks(orderTasks);

      // Simulate task execution
      for (let i = 0; i < orderTasks.length; i++) {
        setTasks((prev) =>
          prev.map((t, idx) => (idx === i ? { ...t, status: 'running' as const } : t))
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setTasks((prev) =>
          prev.map((t, idx) => (idx === i ? { ...t, status: 'complete' as const } : t))
        );
      }
    }
  };

  return (
    <div className="h-screen flex bg-[#212121] text-white">
      {/* Left Sidebar */}
      <div className="w-56 bg-[#212121] border-r border-[#3d3d3d] flex flex-col">
        {/* Copilot Logo */}
        <div className="px-3 py-4">
          <img
            src="/copilot-icon.webp"
            alt="Copilot"
            className="h-9 w-auto"
          />
        </div>

        {/* New Chat Button */}
        <div className="px-3 mb-3">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#2d2d2d] rounded-md transition-colors">
            <ChatSparkle24Regular className="text-gray-400" />
            <span>New chat</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="px-3 space-y-0.5 mb-4">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
            <Search24Regular />
            <span>Search</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
            <Library24Regular />
            <span>Library</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
            <Lightbulb24Regular />
            <span>Create</span>
          </button>
        </div>

        {/* Agents Section */}
        <div className="px-3 mb-4">
          <div className="text-xs text-gray-500 px-3 mb-1.5 font-medium">Agents</div>
          <div className="space-y-0.5">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
              <BookSearch24Regular />
              <span>Researcher</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
              <ChatSparkle24Regular />
              <span>Analyst</span>
            </button>
          </div>
        </div>

        {/* Notebooks Section */}
        <div className="px-3 mb-4">
          <div className="text-xs text-gray-500 px-3 mb-1.5 font-medium">Notebooks</div>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
            <Notebook24Regular />
            <span>All notebooks</span>
          </button>
        </div>

        {/* Chats Section */}
        <div className="px-3 mb-4 flex-1 overflow-y-auto">
          <div className="text-xs text-gray-500 px-3 mb-1.5 font-medium flex items-center justify-between">
            <span>Chats</span>
            <Search24Regular className="w-3 h-3" />
          </div>
          <div className="space-y-0.5">
            <button className="w-full flex items-start gap-2 px-3 py-2 text-sm text-gray-300 bg-[#2d2d2d] rounded-md">
              <span className="line-clamp-2 text-left">Supplier delay - Order #SW-2847 analysis</span>
            </button>
            <button className="w-full flex items-start gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
              <span className="line-clamp-2 text-left">Q1 Sales forecast review</span>
            </button>
            <button className="w-full flex items-start gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
              <span className="line-clamp-2 text-left">Budget approval workflow</span>
            </button>
            <button className="w-full flex items-start gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
              <span className="line-clamp-2 text-left">Inventory management system</span>
            </button>
            <button className="w-full flex items-start gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
              <span className="line-clamp-2 text-left">Customer feedback analysis</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-3 pb-4 space-y-0.5">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
            <Apps24Regular />
            <span>Apps</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-300 rounded-md transition-colors">
            <Person24Regular />
            <span>Mike Morton</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#292929]">
        {/* Top Bar */}
        <div className="h-12 border-b border-[#3d3d3d] flex items-center justify-center relative px-6">
          <div className="flex items-center h-full">
            <button className="px-4 h-full text-sm text-white border-b-2 border-white transition-colors">
              Work
            </button>
            <button className="px-4 h-full text-sm text-gray-400 hover:text-gray-300 border-b-2 border-transparent hover:border-gray-600 transition-colors">
              Web
            </button>
          </div>
          <div className="absolute right-6 flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 rounded-md transition-colors">
              Auto
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-300 rounded-md transition-colors">
              <Add24Regular />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-300 rounded-md transition-colors">
              <MoreHorizontal24Regular />
            </button>
          </div>
        </div>

        {/* Content Area - Chat Style */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Analysis Message from Copilot */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <img
                  src="/copilot-icon.webp"
                  alt="Copilot"
                  className="h-8 w-auto flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">Copilot</p>
                  <h2 className="text-xl font-semibold mb-2 text-white">
                    {loading ? 'Analyzing delivery delay' : 'Analysis Complete'}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Checking impacts across your business systems
                  </p>

                  <div className="bg-[#323232] rounded-lg border border-[#404040] p-6">
                    <div className="space-y-4">
                      {analysisSteps.map((step) => (
                        <div key={step.id} className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {step.status === 'running' && <Spinner size="small" />}
                            {step.status === 'complete' && (
                              <Checkmark24Filled className="text-green-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <step.icon className="text-gray-400 w-5 h-5" />
                              <span className={`text-sm ${step.status === 'running' ? 'font-semibold text-blue-400' : 'text-white'}`}>
                                {step.label}
                              </span>
                            </div>
                            {step.status === 'running' && (
                              <p className="text-sm text-gray-500 italic ml-7">
                                {step.detail}
                              </p>
                            )}
                            {step.status === 'complete' && step.result && (
                              <div className="mt-1 ml-7 bg-green-900/20 border border-green-700/30 rounded px-3 py-2">
                                <p className="text-sm text-green-400">
                                  ✓ {step.result}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {loading && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Analysis progress</span>
                        <span className="text-sm text-gray-400">
                          {analysisSteps.filter((s) => s.status === 'complete').length} of{' '}
                          {totalSteps} complete
                        </span>
                      </div>
                      <div className="h-2 bg-[#404040] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-500 ease-out"
                          style={{
                            width: `${
                              (analysisSteps.filter((s) => s.status === 'complete').length /
                                totalSteps) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Suggestions appear after analysis */}
            {showSuggestions && (
              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <img
                    src="/copilot-icon.webp"
                    alt="Copilot"
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">Copilot</p>
                    <h2 className="text-xl font-semibold mb-2 text-white">
                      I can help you with this supplier delay
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Here are some recommended actions:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suggestions.map((suggestion) => {
                        const IconComponent = iconMap[suggestion.icon] || Search24Regular;
                        const confidencePercent = Math.round(suggestion.confidence * 100);

                        // Color-code based on confidence level
                        let barColor = 'bg-red-500';
                        let barBgColor = 'bg-red-900/20';
                        let textColor = 'text-red-400';
                        let label = 'Low Match';

                        if (confidencePercent >= 80) {
                          barColor = 'bg-green-500';
                          barBgColor = 'bg-green-900/20';
                          textColor = 'text-green-400';
                          label = 'Strong Match';
                        } else if (confidencePercent >= 60) {
                          barColor = 'bg-yellow-500';
                          barBgColor = 'bg-yellow-900/20';
                          textColor = 'text-yellow-400';
                          label = 'Good Match';
                        } else if (confidencePercent >= 40) {
                          barColor = 'bg-orange-500';
                          barBgColor = 'bg-orange-900/20';
                          textColor = 'text-orange-400';
                          label = 'Moderate Match';
                        }

                        return (
                          <div
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion.id)}
                            className="bg-[#323232] border border-[#404040] rounded-lg p-5 hover:bg-[#3a3a3a] hover:border-[#4a4a4a] transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2.5 bg-blue-500/10 rounded-lg flex-shrink-0">
                                <IconComponent className="text-blue-400 w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold mb-2 text-white">
                                  {suggestion.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                                  {suggestion.description}
                                </p>

                                {/* Recommendation strength label - only for strong matches */}
                                {confidencePercent >= 80 && (
                                  <div className="mb-2">
                                    <span className="text-xs text-gray-500">
                                      Recommendation based on company policy & past actions
                                    </span>
                                  </div>
                                )}

                                {/* Color-coded confidence bar */}
                                <div className="flex items-center gap-2">
                                  <div className={`flex-1 ${barBgColor} rounded-full h-2 overflow-hidden`}>
                                    <div
                                      className={`${barColor} h-2 rounded-full transition-all duration-500`}
                                      style={{ width: `${confidencePercent}%` }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-1.5 min-w-[5rem]">
                                    <span className={`text-xs font-medium ${textColor}`}>
                                      {confidencePercent}%
                                    </span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className={`text-xs ${textColor}`}>
                                      {label}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tasks execution after selecting premium upgrade */}
            {selectedAction === 'premium-upgrade' && tasks.length > 0 && (
              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <img
                    src="/copilot-icon.webp"
                    alt="Copilot"
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">Copilot</p>
                    <h2 className="text-xl font-semibold mb-2 text-white">
                      Updating sales orders with premium speakers
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                      Modifying affected customer orders to include PX-800 Premium speakers
                    </p>

                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-[#323232] border border-[#404040] rounded-lg overflow-hidden"
                        >
                          <div
                            className="p-4 cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                            onClick={() =>
                              setExpandedTask(expandedTask === task.id ? null : task.id)
                            }
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {task.status === 'pending' && (
                                  <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                                )}
                                {task.status === 'running' && <Spinner size="small" />}
                                {task.status === 'complete' && (
                                  <Checkmark24Filled className="text-green-500 w-5 h-5" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-white font-medium">{task.title}</p>
                              </div>
                              {task.status === 'complete' && (
                                <button className="text-blue-400 text-xs hover:text-blue-300">
                                  {expandedTask === task.id ? 'Hide details' : 'Show details'}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Expandable details */}
                          {expandedTask === task.id && task.details && (
                            <div className="border-t border-[#404040] p-4 bg-[#2a2a2a]">
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Previous item</p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-red-400 line-through">
                                      {task.details.oldItem}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {task.details.oldPrice}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Updated to</p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-green-400 font-medium">
                                      {task.details.newItem}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {task.details.newPrice}
                                    </span>
                                  </div>
                                </div>
                                <div className="pt-2 border-t border-[#404040]">
                                  <p className="text-xs text-gray-400">{task.details.notes}</p>
                                </div>

                                {/* View in Dynamics button within task */}
                                <div className="pt-3">
                                  <button
                                    onClick={() => {
                                      // Navigate to the specific sales order
                                      window.location.href = '/sales-order?highlight=PX-800';
                                    }}
                                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-2"
                                  >
                                    <DocumentSearch24Regular className="w-4 h-4" />
                                    <span>View in Dynamics 365</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* M365 Chat Input - Fixed at bottom */}
        <div className="border-t border-[#3d3d3d] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#323232] border border-[#404040] rounded-lg p-3">
              <div className="flex items-start gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-[#3a3a3a] rounded-md transition-colors">
                  <Add24Regular className="w-5 h-5" />
                </button>
                <div className="flex-1 min-h-[2rem] max-h-32 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Message Copilot"
                    className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onStartChat();
                      }
                    }}
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-[#3a3a3a] rounded-md transition-colors">
                  <Mic24Regular className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#404040]">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 hover:bg-[#3a3a3a] rounded-md transition-colors">
                    <Wrench24Regular className="w-4 h-4" />
                    <span>Tools</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 hover:bg-[#3a3a3a] rounded-md transition-colors">
                    <DataPie24Regular className="w-4 h-4" />
                    <span>Sources</span>
                  </button>
                </div>
                <button
                  onClick={onStartChat}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  <Send24Filled className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
