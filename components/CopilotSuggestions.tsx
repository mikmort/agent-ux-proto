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
  iconType?: 'component' | 'image';
  iconSrc?: string;
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

interface CustomerData {
  id: string;
  orderNumber: string;
  name: string;
  eventName: string;
  eventDate: string;
  urgency: 'critical' | 'high' | 'medium';
  currentOrder: {
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;
  };
  purchaseHistory: {
    totalRevenue: number;
    ordersLastYear: number;
    averageOrderValue: number;
    customerSince: string;
    tier: 'Platinum' | 'Gold' | 'Silver';
  };
}

interface UpgradeOption {
  id: string;
  model: string;
  name: string;
  unitPrice: number;
  availability: string;
  features: string[];
}

const affectedCustomers: CustomerData[] = [
  {
    id: 'cust-001',
    orderNumber: 'EVT-2201',
    name: 'TechCon 2026 Summit',
    eventName: 'TechCon 2026 Summit',
    eventDate: 'Feb 15, 2026',
    urgency: 'critical',
    currentOrder: {
      item: 'ProSound PX-500 Portable Speaker',
      quantity: 50,
      unitPrice: 2500,
      total: 125000,
    },
    purchaseHistory: {
      totalRevenue: 845000,
      ordersLastYear: 4,
      averageOrderValue: 211250,
      customerSince: '2019',
      tier: 'Platinum',
    },
  },
  {
    id: 'cust-002',
    orderNumber: 'EVT-2202',
    name: 'City Music Festival',
    eventName: 'City Music Festival',
    eventDate: 'Feb 22, 2026',
    urgency: 'high',
    currentOrder: {
      item: 'ProSound PX-500 Portable Speaker',
      quantity: 25,
      unitPrice: 2500,
      total: 62500,
    },
    purchaseHistory: {
      totalRevenue: 320000,
      ordersLastYear: 2,
      averageOrderValue: 160000,
      customerSince: '2021',
      tier: 'Gold',
    },
  },
  {
    id: 'cust-003',
    orderNumber: 'EVT-2203',
    name: 'Corporate Awards Gala',
    eventName: 'Corporate Awards Gala',
    eventDate: 'Mar 5, 2026',
    urgency: 'medium',
    currentOrder: {
      item: 'ProSound PX-500 Portable Speaker',
      quantity: 25,
      unitPrice: 2500,
      total: 62500,
    },
    purchaseHistory: {
      totalRevenue: 125000,
      ordersLastYear: 1,
      averageOrderValue: 125000,
      customerSince: '2024',
      tier: 'Silver',
    },
  },
];

const upgradeOptions: UpgradeOption[] = [
  {
    id: 'PX-800',
    model: 'PX-800',
    name: 'ProSound PX-800 Premium',
    unitPrice: 3000,
    availability: 'In Stock - 65 units',
    features: ['Enhanced audio clarity', 'Extended warranty', 'Immediate availability', 'Advanced DSP'],
  },
  {
    id: 'PX-900',
    model: 'PX-900',
    name: 'ProSound PX-900 Elite',
    unitPrice: 3500,
    availability: 'In Stock - 30 units',
    features: ['Premium audio quality', '5-year warranty', 'Immediate availability', 'AI noise cancellation'],
  },
];

export default function CopilotSuggestions({ suggestions, onStartChat }: CopilotSuggestionsProps) {
  const [loading, setLoading] = useState(true);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [totalSteps] = useState(9);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showUpgradeConfig, setShowUpgradeConfig] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [selectedUpgradeOption, setSelectedUpgradeOption] = useState<string>('PX-800');
  const [showWordDocument, setShowWordDocument] = useState(false);
  const [showOutlookEmail, setShowOutlookEmail] = useState(false);
  const [emailData, setEmailData] = useState<{ to: string; subject: string; body: string } | null>(null);
  const hasRun = useRef(false);
  const skipAnimations = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const configRef = useRef<HTMLDivElement>(null);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('copilotSuggestionsState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);

        // Only restore if analysis was complete (loading: false and showSuggestions: true)
        // This prevents hanging on incomplete states
        if (!parsed.loading && parsed.showSuggestions) {
          // Map step IDs to their icon components
          const iconMap: Record<string, any> = {
            email: Mail24Regular,
            po: DocumentSearch24Regular,
            sales: ShoppingBag24Regular,
            inventory: Box24Regular,
            suppliers: Building24Regular,
            alternates: Search24Regular,
            impact: Money24Regular,
          };

          // Reconstruct analysis steps with icon components
          const stepsWithIcons = parsed.analysisSteps.map((step: any) => ({
            ...step,
            icon: iconMap[step.id] || Search24Regular,
          }));

          setLoading(false);
          setAnalysisSteps(stepsWithIcons);
          setShowSuggestions(true);
          setSelectedAction(parsed.selectedAction);
          setTasks(parsed.tasks);
          setExpandedTask(parsed.expandedTask);
          setShowUpgradeConfig(parsed.showUpgradeConfig);
          setSelectedCustomers(new Set(parsed.selectedCustomers));
          setSelectedUpgradeOption(parsed.selectedUpgradeOption);
          hasRun.current = true; // Prevent analysis from running again
        }
        // If analysis was incomplete, let it run normally from the start
      } catch (e) {
        // If parsing fails, continue with normal flow
      }
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (hasRun.current) {
      // Exclude icon components from saved state (they can't be serialized)
      const stepsWithoutIcons = analysisSteps.map(({ icon, ...rest }) => rest);
      const state = {
        loading,
        analysisSteps: stepsWithoutIcons,
        showSuggestions,
        selectedAction,
        tasks,
        expandedTask,
        showUpgradeConfig,
        selectedCustomers: Array.from(selectedCustomers),
        selectedUpgradeOption,
      };
      sessionStorage.setItem('copilotSuggestionsState', JSON.stringify(state));
    }
  }, [loading, analysisSteps, showSuggestions, selectedAction, tasks, expandedTask, showUpgradeConfig, selectedCustomers, selectedUpgradeOption]);

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
          iconType: 'image' as const,
          iconSrc: '/outlook-icon.png',
          result: 'Order #SW-2847 • ProSound PX-500 • 1-week delay due to snowstorm',
        },
        {
          id: 'po',
          label: 'Finding purchase order details',
          detail: 'Querying Dynamics 365 for order #SW-2847',
          icon: DocumentSearch24Regular,
          iconType: 'image' as const,
          iconSrc: '/dynamics-business-central.svg',
          result: 'PO-2847 • 100 units ordered • Supplier: SoundWave Pro Audio',
        },
        {
          id: 'sales',
          label: 'Searching for affected sales orders',
          detail: 'Checking events requiring ProSound PX-500 speakers',
          icon: ShoppingBag24Regular,
          iconType: 'image' as const,
          iconSrc: '/dynamics-business-central.svg',
          result: 'Found 3 events requiring PX-500 speakers (TechCon, Music Festival, Awards Gala)',
        },
        {
          id: 'teams',
          label: 'Searching Teams chats with customers',
          detail: 'Reviewing conversation history for delivery preferences and past issues',
          icon: ChatSparkle24Regular,
          iconType: 'image' as const,
          iconSrc: '/teams-icon.png',
          result: 'TechCon team emphasized event date is non-negotiable • Previous successful upgrades with 2 customers',
        },
        {
          id: 'inventory',
          label: 'Checking inventory across warehouses',
          detail: 'Scanning stock levels in all locations',
          icon: Box24Regular,
          iconType: 'image' as const,
          iconSrc: '/dynamics-business-central.svg',
          result: '15 units in stock • Insufficient for all events',
        },
        {
          id: 'sharepoint',
          label: 'Finding policy documents on SharePoint',
          detail: 'Searching for supplier delay procedures and customer communication guidelines',
          icon: Library24Regular,
          iconType: 'image' as const,
          iconSrc: '/sharepoint-icon.png',
          result: 'Policy SD-204: Offer premium upgrades for Platinum customers • Notify within 24 hours of delay',
        },
        {
          id: 'suppliers',
          label: 'Finding alternate suppliers',
          detail: 'Searching supplier network for faster delivery options',
          icon: Building24Regular,
          iconType: 'component' as const,
          result: '3 certified suppliers found with 3-5 day delivery',
        },
        {
          id: 'alternates',
          label: 'Checking for substitute products',
          detail: 'Looking for compatible speaker systems in stock',
          icon: Search24Regular,
          iconType: 'image' as const,
          iconSrc: '/dynamics-business-central.svg',
          result: 'PX-800 Premium available • 65 units in stock • Compatible upgrade',
        },
        {
          id: 'impact',
          label: 'Calculating revenue impact',
          detail: 'Analyzing financial risk across affected events',
          icon: Money24Regular,
          iconType: 'component' as const,
          result: '$225,000 revenue at risk across 3 events',
        },
      ];

      for (let i = 0; i < allSteps.length; i++) {
        // If skip flag is set, immediately complete all remaining steps
        if (skipAnimations.current) {
          const remainingSteps = allSteps.slice(i).map(s => ({ ...s, status: 'complete' as const }));
          setAnalysisSteps(prev => [...prev, ...remainingSteps]);
          setLoading(false);
          setShowSuggestions(true);
          return;
        }

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
    if (showUpgradeConfig && configRef.current) {
      // Scroll to top of configuration UI
      configRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [analysisSteps, showSuggestions, showUpgradeConfig, tasks]);

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(customerId)) {
        newSet.delete(customerId);
      } else {
        newSet.add(customerId);
      }
      return newSet;
    });
  };

  const selectAllCustomers = () => {
    setSelectedCustomers(new Set(affectedCustomers.map((c) => c.id)));
  };

  const handleSuggestionClick = async (suggestionId: string) => {
    if (suggestionId === 'sug-003') {
      // Show configuration UI for premium speaker upgrade
      setSelectedAction('premium-upgrade-config');
      setShowUpgradeConfig(true);
      // Start with no customers selected
      setSelectedCustomers(new Set());
    }
  };

  const confirmUpgrade = async () => {
    // Hide config and show execution
    setShowUpgradeConfig(false);
    setSelectedAction('premium-upgrade');

    const selectedOption = upgradeOptions.find((opt) => opt.id === selectedUpgradeOption)!;
    const selectedCustomersList = affectedCustomers.filter((customer) =>
      selectedCustomers.has(customer.id)
    );

    // Create tasks: order updates, mitigation report, and email notifications
    const orderTasks: TaskItem[] = selectedCustomersList.map((customer) => ({
      id: `task-${customer.id}`,
      title: `Updating Sales Order ${customer.orderNumber} (${customer.name})`,
      status: 'pending' as const,
      details: {
        oldItem: `${customer.currentOrder.item} (${customer.currentOrder.quantity} units)`,
        newItem: `${selectedOption.name} (${customer.currentOrder.quantity} units)`,
        oldPrice: `$${customer.currentOrder.total.toLocaleString()}`,
        newPrice: `$${(customer.currentOrder.quantity * selectedOption.unitPrice).toLocaleString()}`,
        notes: `Per Supply Chain Policy SC-145, order modifications exceeding $20,000 require automated documentation. Upgrading equipment to ensure delivery commitments are met per Customer SLA requirements. Premium features include: ${selectedOption.features.join(', ')}.`,
      },
    }));

    const mitigationReportTask: TaskItem = {
      id: 'task-mitigation-report',
      title: 'Creating mitigation report in Word',
      status: 'pending' as const,
      details: {
        oldItem: '',
        newItem: '',
        oldPrice: '',
        newPrice: '',
        notes: `Per Supplier Disruption Policy SD-240, all premium upgrades initiated due to supplier delays require formal mitigation documentation for executive review. Report includes: affected customers, financial impact analysis, alternative solutions considered, and risk assessment. Automatically generated in Microsoft Word for management approval workflow.`,
      },
    };

    const emailTask: TaskItem = {
      id: 'task-email-notifications',
      title: `Drafting email updates for ${selectedCustomersList.length} customer${selectedCustomersList.length > 1 ? 's' : ''}`,
      status: 'pending' as const,
      details: {
        oldItem: '',
        newItem: '',
        oldPrice: '',
        newPrice: '',
        notes: `Per Customer Communication Standard CC-102, all order modifications must be communicated within 4 hours of change. Drafting personalized notifications for: ${selectedCustomersList.map((c) => c.name).join(', ')}. Each email includes updated order details, equipment specifications, revised pricing, and guaranteed delivery timeline. Emails are prepared for your review before sending to maintain customer satisfaction and contractual compliance.`,
      },
    };

    const allTasks = [...orderTasks, mitigationReportTask, emailTask];
    setTasks(allTasks);

    // Simulate task execution
    for (let i = 0; i < allTasks.length; i++) {
      setTasks((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'running' as const } : t))
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTasks((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'complete' as const } : t))
      );
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
            <button
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 rounded-md transition-colors"
              onClick={() => {
                if (loading) {
                  skipAnimations.current = true;
                }
              }}
            >
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
                              {step.iconType === 'image' && step.iconSrc ? (
                                <img src={step.iconSrc} alt="" className="w-5 h-5" />
                              ) : (
                                <step.icon className="text-gray-400 w-5 h-5" />
                              )}
                              <span className={`text-sm ${step.status === 'running' ? 'font-semibold text-blue-400' : 'text-white'}`}>
                                {step.label}
                              </span>
                            </div>
                            {step.status === 'running' && (
                              <p className="text-sm text-gray-500 italic ml-7">
                                {step.detail}
                              </p>
                            )}
                            {step.status === 'complete' && step.result && (() => {
                              // Determine color based on result content
                              const result = step.result.toLowerCase();
                              let bgColor = 'bg-gray-800/20';
                              let borderColor = 'border-gray-700/30';
                              let textColor = 'text-gray-400';

                              // Critical/negative situations (red)
                              if (result.includes('insufficient') || result.includes('at risk') || result.includes('delay')) {
                                bgColor = 'bg-red-900/20';
                                borderColor = 'border-red-700/30';
                                textColor = 'text-red-400';
                              }
                              // Warning situations (yellow/orange)
                              else if (result.includes('3-5 day') || result.includes('certified suppliers')) {
                                bgColor = 'bg-yellow-900/20';
                                borderColor = 'border-yellow-700/30';
                                textColor = 'text-yellow-400';
                              }
                              // Positive situations (green)
                              else if (result.includes('available') || result.includes('in stock') || result.includes('compatible')) {
                                bgColor = 'bg-green-900/20';
                                borderColor = 'border-green-700/30';
                                textColor = 'text-green-400';
                              }

                              return (
                                <div className={`mt-1 ml-7 ${bgColor} border ${borderColor} rounded px-3 py-2`}>
                                  <p className={`text-sm ${textColor}`}>
                                    ✓ {step.result}
                                  </p>
                                </div>
                              );
                            })()}
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

            {/* Configuration UI for upgrade selection */}
            {showUpgradeConfig && (
              <div ref={configRef} className="mb-8">
                <div className="flex items-start gap-3">
                  <img
                    src="/copilot-icon.webp"
                    alt="Copilot"
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Copilot</p>
                    <h2 className="text-lg font-semibold mb-1 text-white">
                      Configure Premium Speaker Upgrade
                    </h2>
                    <p className="text-xs text-gray-400 mb-4">
                      Select customers and upgrade options. Customer data helps prioritize based on purchase history.
                    </p>

                    {/* Upgrade Options */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-white mb-2">Select Upgrade Model</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {upgradeOptions.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => setSelectedUpgradeOption(option.id)}
                            className={`bg-[#323232] border rounded-lg p-3 cursor-pointer transition-all ${
                              selectedUpgradeOption === option.id
                                ? 'border-blue-500 ring-2 ring-blue-500/20'
                                : 'border-[#404040] hover:border-[#4a4a4a]'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h4 className="text-sm font-semibold text-white">{option.name}</h4>
                                <p className="text-xs text-gray-500">{option.model}</p>
                              </div>
                              {selectedUpgradeOption === option.id && (
                                <Checkmark24Filled className="text-blue-500 w-4 h-4" />
                              )}
                            </div>
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-base font-bold text-white">
                                ${option.unitPrice.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500">per unit</span>
                            </div>
                            <p className="text-xs text-green-400 mb-1">✓ {option.availability}</p>
                            <div className="space-y-0.5">
                              {option.features.map((feature, idx) => (
                                <p key={idx} className="text-xs text-gray-400">• {feature}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer Selection */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-white">Select Customers</h3>
                        <button
                          onClick={selectAllCustomers}
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          Select All
                        </button>
                      </div>
                      <div className="space-y-2">
                        {affectedCustomers.map((customer) => {
                          const isSelected = selectedCustomers.has(customer.id);
                          const urgencyColor =
                            customer.urgency === 'critical'
                              ? 'text-red-400 bg-red-900/20'
                              : customer.urgency === 'high'
                              ? 'text-orange-400 bg-orange-900/20'
                              : 'text-yellow-400 bg-yellow-900/20';
                          const tierColor =
                            customer.purchaseHistory.tier === 'Platinum'
                              ? 'text-purple-400 bg-purple-900/20'
                              : customer.purchaseHistory.tier === 'Gold'
                              ? 'text-yellow-400 bg-yellow-900/20'
                              : 'text-gray-400 bg-gray-800/20';

                          return (
                            <div
                              key={customer.id}
                              onClick={() => toggleCustomerSelection(customer.id)}
                              className={`bg-[#323232] border rounded-lg p-3 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                                  : 'border-[#404040] hover:border-[#4a4a4a]'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {/* Checkbox */}
                                <div className="flex-shrink-0 mt-0.5">
                                  {isSelected ? (
                                    <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                                      <Checkmark24Filled className="text-white w-3 h-3" />
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 border-2 border-gray-500 rounded" />
                                  )}
                                </div>

                                {/* Customer Info */}
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-1.5">
                                    <div>
                                      <h4 className="text-sm font-semibold text-white mb-0.5">
                                        {customer.name}
                                      </h4>
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-gray-500">
                                          {customer.orderNumber}
                                        </span>
                                        <span className="text-xs text-gray-600">•</span>
                                        <span className="text-xs text-gray-400">
                                          {customer.eventDate}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`text-xs px-1.5 py-0.5 rounded ${urgencyColor}`}
                                        >
                                          {customer.urgency.toUpperCase()}
                                        </span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded ${tierColor}`}>
                                          {customer.purchaseHistory.tier}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Current Order */}
                                  <div className="bg-[#2a2a2a] rounded p-2 mb-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-white">
                                        {customer.currentOrder.item}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {customer.currentOrder.quantity} units
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                      ${customer.currentOrder.total.toLocaleString()}
                                    </p>
                                  </div>

                                  {/* Purchase History */}
                                  <div className="grid grid-cols-4 gap-2">
                                    <div>
                                      <p className="text-xs text-gray-500">Revenue</p>
                                      <p className="text-xs font-semibold text-green-400">
                                        ${(customer.purchaseHistory.totalRevenue / 1000).toFixed(0)}K
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Orders</p>
                                      <p className="text-xs font-semibold text-white">
                                        {customer.purchaseHistory.ordersLastYear}/yr
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Avg Order</p>
                                      <p className="text-xs font-semibold text-white">
                                        ${(customer.purchaseHistory.averageOrderValue / 1000).toFixed(0)}K
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Since</p>
                                      <p className="text-xs font-semibold text-white">
                                        {customer.purchaseHistory.customerSince}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={confirmUpgrade}
                        disabled={selectedCustomers.size === 0}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
                      >
                        Confirm Upgrade ({selectedCustomers.size}{' '}
                        {selectedCustomers.size === 1 ? 'customer' : 'customers'})
                      </button>
                      <button
                        onClick={() => {
                          setShowUpgradeConfig(false);
                          setSelectedAction(null);
                        }}
                        className="px-4 py-2 bg-[#323232] hover:bg-[#3a3a3a] text-white text-sm font-medium rounded-md transition-colors"
                      >
                        Cancel
                      </button>
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
                              {/* App Icon */}
                              <div className="flex-shrink-0">
                                {task.id.startsWith('task-cust-') && (
                                  <img src="/dynamics-business-central.svg" alt="Business Central" className="w-5 h-5" />
                                )}
                                {task.id === 'task-mitigation-report' && (
                                  <img src="/Word_512.png" alt="Word" className="w-5 h-5" />
                                )}
                                {task.id === 'task-email-notifications' && (
                                  <img src="/outlook-icon.png" alt="Outlook" className="w-5 h-5" />
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
                                {/* Sales Order tasks: Show old/new item comparison */}
                                {task.details.oldItem && task.details.newItem && (
                                  <>
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
                                  </>
                                )}

                                {/* Notes section for all tasks */}
                                {task.details.notes && (
                                  <div className={task.details.oldItem ? "pt-2 border-t border-[#404040]" : ""}>
                                    <p className="text-xs text-gray-400">{task.details.notes}</p>
                                  </div>
                                )}

                                {/* Action buttons based on task type */}
                                <div className="pt-3">
                                  {task.id.startsWith('task-cust-') && (
                                    <button
                                      onClick={() => {
                                        window.location.href = '/sales-order?highlight=PX-800';
                                      }}
                                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-2"
                                    >
                                      <DocumentSearch24Regular className="w-4 h-4" />
                                      <span>View in Dynamics 365</span>
                                    </button>
                                  )}
                                  {task.id === 'task-mitigation-report' && (
                                    <button
                                      onClick={() => setShowWordDocument(true)}
                                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-2"
                                    >
                                      <Notebook24Regular className="w-4 h-4" />
                                      <span>Open in Word</span>
                                    </button>
                                  )}
                                  {task.id === 'task-email-notifications' && (
                                    <button
                                      onClick={() => {
                                        // Get the first affected customer for the draft email
                                        const customer = affectedCustomers[0];
                                        const upgradeOption = upgradeOptions.find((opt) => opt.id === selectedUpgradeOption) || upgradeOptions[0];

                                        const to = customer.name === 'TechCon 2026 Summit'
                                          ? 'sarah.mitchell@techcon2026.com'
                                          : customer.name === 'City Music Festival'
                                          ? 'events@citymusicfestival.com'
                                          : 'contact@corporateawards.com';

                                        const subject = `Important Update: Equipment Upgrade for ${customer.eventName}`;
                                        const body = `Dear ${customer.name} Team,

I hope this message finds you well. I wanted to reach out regarding your upcoming event scheduled for ${customer.eventDate}.

While monitoring our supply chain for your order (Sales Order #${customer.orderNumber}), we identified a potential delay with the originally specified ProSound PX-500 speaker systems due to weather-related shipping disruptions on the East Coast.

To ensure your event runs flawlessly and without any risk of delay, we've proactively upgraded your order to the ${upgradeOption.name}. Here's what this means for your event:

✓ Enhanced audio clarity and power output for superior sound quality
✓ Better coverage for all attendees across all sessions
✓ Guaranteed delivery for your event setup date - zero risk of delay
✓ Premium features including ${upgradeOption.features.slice(0, 2).join(' and ')}

The cost adjustment is $${upgradeOption.unitPrice - customer.currentOrder.unitPrice} per unit (total additional: $${(upgradeOption.unitPrice - customer.currentOrder.unitPrice) * customer.currentOrder.quantity}), which we believe represents excellent value given the enhanced capabilities and the elimination of any delivery risk for your important event.

The upgraded equipment will arrive on schedule, and our technical team will ensure seamless setup and testing prior to your event start.

Please review the updated sales order. If you have any questions or would like to discuss this further, I'm available at your convenience.

We're committed to making ${customer.eventName} an outstanding success.

Best regards,
James Davis
Premier Events Production
Sales: (555) 0123-4567`;

                                        setEmailData({ to, subject, body });
                                        setShowOutlookEmail(true);
                                      }}
                                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-2"
                                    >
                                      <Mail24Regular className="w-4 h-4" />
                                      <span>Open in Outlook</span>
                                    </button>
                                  )}
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

      {/* Word Document Viewer */}
      {showWordDocument && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full h-full max-w-7xl max-h-[90vh] flex flex-col rounded-lg shadow-2xl overflow-hidden">
            {/* Word Header */}
            <div className="bg-[#2b579a] text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Notebook24Regular className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  Mitigation_Report_EVT-2201.docx - Microsoft Word
                </span>
              </div>
              <button
                onClick={() => setShowWordDocument(false)}
                className="text-white hover:bg-blue-700 px-3 py-1 rounded transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Word Ribbon */}
            <div className="bg-[#f3f2f1] border-b border-gray-300 px-4 py-2">
              <div className="flex items-center gap-4 text-xs text-gray-700">
                <button className="hover:bg-gray-200 px-2 py-1 rounded">File</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded font-semibold">Home</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Insert</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Design</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Layout</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">References</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Review</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto bg-[#e9e9e9] p-8">
              <div className="bg-white max-w-4xl mx-auto p-12 shadow-lg text-gray-900" style={{ fontFamily: 'Calibri, sans-serif' }}>
                <div className="bg-[#f3f2f1] p-4 border-l-4 border-[#0078d4] mb-4">
                  <h1 className="text-2xl font-bold text-[#0078d4] mb-2">
                    Supplier Delay Mitigation Report
                  </h1>
                  <p className="text-sm text-gray-900 mb-1">
                    <strong>Sales Order:</strong> EVT-2201 | <strong>Customer:</strong> TechCon 2026 Summit
                  </p>
                  <p className="text-sm text-gray-900 mb-1">
                    <strong>Generated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-900">
                    <strong>Status:</strong> <span className="text-green-700 font-bold">RESOLVED</span>
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 mt-6">Executive Summary</h2>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    This report documents the supplier delay incident for Sales Order EVT-2201 and the mitigation
                    actions taken by Microsoft Copilot to ensure timely delivery for the TechCon 2026 Summit event.
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 mt-6">Incident Details</h2>
                  <h3 className="text-base font-bold text-gray-700 mb-2">Original Issue</h3>
                  <div className="text-sm text-gray-900 leading-relaxed space-y-1">
                    <p><strong>Supplier:</strong> SoundWave Pro Audio</p>
                    <p><strong>Order Number:</strong> SW-2847</p>
                    <p><strong>Issue:</strong> Severe East Coast snowstorm causing delivery delays</p>
                    <p><strong>Affected Items:</strong> ProSound PX-500 Portable Speaker Systems (50 units)</p>
                    <p><strong>Original Delivery Date:</strong> February 10, 2026</p>
                    <p><strong>Revised Delivery Date:</strong> February 17, 2026</p>
                    <p><strong>Event Date:</strong> February 15, 2026</p>
                    <p><strong>Impact:</strong> <span className="text-red-700 font-bold">HIGH - Equipment would arrive 2 days after event</span></p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 mt-6">Mitigation Actions</h2>
                  <h3 className="text-base font-bold text-gray-700 mb-2">Automated Analysis</h3>
                  <p className="text-sm text-gray-900 leading-relaxed mb-2">
                    Microsoft Copilot analyzed the supplier delay email and automatically identified the following:
                  </p>
                  <ul className="text-sm text-gray-900 list-disc list-inside space-y-1 ml-2">
                    <li>Critical delivery timeline conflict with event date</li>
                    <li>Customer priority level: High (2,500 attendees expected)</li>
                    <li>Alternative inventory availability in warehouse systems</li>
                    <li>Premium upgrade option with immediate availability</li>
                  </ul>

                  <h3 className="text-base font-bold text-gray-700 mb-2 mt-4">Solution Implemented</h3>
                  <p className="text-sm text-gray-900 leading-relaxed mb-3">
                    <strong>Action:</strong> Upgraded speaker system to premium model with immediate availability
                  </p>
                  <table className="w-full border-collapse text-sm mb-4">
                    <thead>
                      <tr className="bg-[#0078d4] text-white">
                        <th className="border border-gray-300 px-3 py-2 text-left">Aspect</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Original</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-900">
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Product Model</td>
                        <td className="border border-gray-300 px-3 py-2">ProSound PX-500 Portable</td>
                        <td className="border border-gray-300 px-3 py-2">ProSound PX-800 Premium</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">Quantity</td>
                        <td className="border border-gray-300 px-3 py-2">50 units</td>
                        <td className="border border-gray-300 px-3 py-2">50 units</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Unit Price</td>
                        <td className="border border-gray-300 px-3 py-2">$2,500.00</td>
                        <td className="border border-gray-300 px-3 py-2">$3,000.00</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">Line Total</td>
                        <td className="border border-gray-300 px-3 py-2">$125,000.00</td>
                        <td className="border border-gray-300 px-3 py-2">$150,000.00</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Availability</td>
                        <td className="border border-gray-300 px-3 py-2">February 17, 2026</td>
                        <td className="border border-gray-300 px-3 py-2">Immediate (In Stock)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">Delivery Status</td>
                        <td className="border border-gray-300 px-3 py-2"><span className="text-red-700 font-bold">At Risk</span></td>
                        <td className="border border-gray-300 px-3 py-2"><span className="text-green-700 font-bold">Confirmed for Feb 14</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 mt-6">Recommendations</h2>
                  <ol className="text-sm text-gray-900 list-decimal list-inside space-y-2 ml-2">
                    <li>Approve the upgraded sales order (EVT-2201) with PX-800 Premium speakers</li>
                    <li>Contact customer to explain the proactive upgrade and value proposition</li>
                    <li>Confirm delivery schedule with warehouse (Feb 14 setup date)</li>
                    <li>Review supplier relationship with SoundWave Pro Audio</li>
                    <li>Consider diversifying speaker equipment suppliers for future events</li>
                  </ol>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-600">
                  <p><strong>Report Generated by:</strong> Microsoft Copilot for Dynamics 365 Business Central</p>
                  <p><strong>Company:</strong> Premier Events Production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Outlook Email Viewer */}
      {showOutlookEmail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full h-full max-w-6xl max-h-[90vh] flex flex-col rounded-lg shadow-2xl overflow-hidden">
            {/* Outlook Header */}
            <div className="bg-[#0078d4] text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail24Regular className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  Sent Items - Outlook
                </span>
              </div>
              <button
                onClick={() => setShowOutlookEmail(false)}
                className="text-white hover:bg-blue-600 px-3 py-1 rounded transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Outlook Ribbon */}
            <div className="bg-[#f3f2f1] border-b border-gray-300 px-4 py-2">
              <div className="flex items-center gap-4 text-xs text-gray-700">
                <button className="hover:bg-gray-200 px-2 py-1 rounded">File</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded font-semibold">Home</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Send / Receive</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Folder</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
              </div>
            </div>

            {/* Email List and Preview */}
            <div className="flex-1 flex overflow-hidden">
              {/* Email List */}
              <div className="w-80 border-r border-gray-300 bg-[#faf9f8] overflow-y-auto">
                <div className="p-3 border-b border-gray-300 bg-white">
                  <h3 className="text-sm font-semibold text-gray-800">Sent Items</h3>
                  <p className="text-xs text-gray-600">3 items</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-[#0078d4] p-3 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">Sarah Mitchell</span>
                    <span className="text-xs text-gray-600">Just now</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium mb-1">
                    Important Update: Equipment Upgrade for TechCon 2026 Summit
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Dear Sarah, I hope this message finds you well. I wanted to reach out regarding your upcoming...
                  </p>
                </div>

                <div className="p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">Alex Thompson</span>
                    <span className="text-xs text-gray-600">Just now</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium mb-1">
                    Important Update: Equipment Upgrade for City Music Festival
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Dear Alex, I hope this message finds you well. I wanted to reach out regarding your upcoming...
                  </p>
                </div>

                <div className="p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">Jennifer Collins</span>
                    <span className="text-xs text-gray-600">Just now</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium mb-1">
                    Important Update: Equipment Upgrade for Corporate Awards Gala
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Dear Jennifer, I hope this message finds you well. I wanted to reach out regarding your upcoming...
                  </p>
                </div>
              </div>

              {/* Email Preview Pane */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="p-6">
                  <div className="border-b border-gray-300 pb-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Important Update: Equipment Upgrade for TechCon 2026 Summit
                    </h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="text-gray-600 w-20">From:</span>
                        <span className="text-gray-900">James Davis &lt;james.davis@premierevents.com&gt;</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-600 w-20">To:</span>
                        <span className="text-gray-900">Sarah Mitchell &lt;sarah.mitchell@techcon2026.com&gt;</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-600 w-20">Sent:</span>
                        <span className="text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <p className="mb-4">Dear Sarah,</p>

                    <p className="mb-4">
                      I hope this message finds you well. I wanted to reach out regarding your upcoming TechCon 2026
                      Summit event scheduled for February 15th.
                    </p>

                    <p className="mb-4">
                      While monitoring our supply chain for your order (Sales Order #EVT-2201), we identified a
                      potential delay with the originally specified ProSound PX-500 speaker systems due to
                      weather-related shipping disruptions on the East Coast.
                    </p>

                    <p className="mb-4">
                      To ensure your event runs flawlessly and without any risk of delay, we've proactively upgraded
                      your order to the <strong>ProSound PX-800 Premium Speaker System</strong>. Here's what this
                      means for your event:
                    </p>

                    <ul className="mb-4 space-y-1">
                      <li>✓ Enhanced audio clarity and power output for superior sound quality</li>
                      <li>✓ Better coverage for your 2,500 attendees across all sessions</li>
                      <li>✓ Guaranteed delivery for your February 14 setup date - zero risk of delay</li>
                      <li>✓ Premium features including advanced wireless connectivity and DSP processing</li>
                    </ul>

                    <p className="mb-4">
                      The cost adjustment is $500 per unit (total additional: $25,000), which we believe represents
                      excellent value given the enhanced capabilities and the elimination of any delivery risk for
                      your high-profile event.
                    </p>

                    <p className="mb-4">
                      The upgraded equipment will arrive on schedule, and our technical team will ensure seamless
                      setup and testing prior to your event start.
                    </p>

                    <p className="mb-4">
                      Please review the updated sales order attached to this email. If you have any questions or
                      would like to discuss this further, I'm available at your convenience.
                    </p>

                    <p className="mb-4">
                      We're committed to making TechCon 2026 Summit an outstanding success.
                    </p>

                    <p className="mb-2">Best regards,</p>
                    <p className="mb-1"><strong>James Davis</strong></p>
                    <p className="text-sm text-gray-600 mb-0">Premier Events Production</p>
                    <p className="text-sm text-gray-600">Sales: (555) 0123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fake Outlook Compose Window */}
      {showOutlookEmail && emailData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full h-full max-w-5xl max-h-[90vh] flex flex-col rounded-lg shadow-2xl overflow-hidden">
            {/* Outlook Header */}
            <div className="bg-[#0078D4] text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail24Regular className="w-5 h-5" />
                <span className="font-semibold text-sm">New Message - Outlook</span>
              </div>
              <button
                onClick={() => setShowOutlookEmail(false)}
                className="text-white hover:bg-blue-700 px-3 py-1 rounded transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Outlook Ribbon */}
            <div className="bg-[#f3f2f1] border-b border-gray-300 px-4 py-2">
              <div className="flex items-center gap-4 text-xs text-gray-700">
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Format text</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Insert</button>
                <button className="hover:bg-gray-200 px-2 py-1 rounded">Options</button>
                <div className="flex-1"></div>
                <button className="bg-[#0078D4] text-white px-4 py-1.5 rounded hover:bg-blue-700 font-semibold">
                  Send
                </button>
              </div>
            </div>

            {/* Email Form */}
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="p-4">
                {/* To Field */}
                <div className="flex items-center border-b border-gray-200 py-2">
                  <span className="text-sm text-gray-700 w-16 font-semibold">To:</span>
                  <input
                    type="text"
                    value={emailData.to}
                    readOnly
                    className="flex-1 text-sm px-2 py-1 bg-gray-50 rounded text-gray-900"
                  />
                </div>

                {/* Subject Field */}
                <div className="flex items-center border-b border-gray-200 py-2">
                  <span className="text-sm text-gray-700 w-16 font-semibold">Subject:</span>
                  <input
                    type="text"
                    value={emailData.subject}
                    readOnly
                    className="flex-1 text-sm px-2 py-1 bg-gray-50 rounded text-gray-900"
                  />
                </div>

                {/* Email Body */}
                <div className="mt-4">
                  <textarea
                    value={emailData.body}
                    readOnly
                    className="w-full h-96 text-sm p-3 border border-gray-200 rounded resize-none font-sans text-gray-900"
                    style={{ fontFamily: 'Calibri, sans-serif' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
