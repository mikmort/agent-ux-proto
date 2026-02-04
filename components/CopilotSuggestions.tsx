'use client';

import { useState, useEffect } from 'react';
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

export default function CopilotSuggestions({ suggestions, onStartChat }: CopilotSuggestionsProps) {
  const [loading, setLoading] = useState(true);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [totalSteps] = useState(7);

  useEffect(() => {
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

        // Simulate processing time (between 600-1200ms per step)
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));

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
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    };

    runAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkle24Filled className="text-blue-600 animate-pulse" />
            <h1 className="text-2xl font-semibold">Copilot Analysis</h1>
          </div>
          <Text className="text-gray-600">
            Analyzing email and checking for impacts across your business systems...
          </Text>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="space-y-4">
            {analysisSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start gap-4 animate-fadeIn"
                style={{ animationDelay: '0ms' }}
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {step.status === 'running' && (
                    <Spinner size="small" />
                  )}
                  {step.status === 'complete' && (
                    <Checkmark24Filled className="text-green-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="text-gray-600" />
                    <Text
                      weight={step.status === 'running' ? 'semibold' : 'regular'}
                      className={step.status === 'running' ? 'text-blue-600' : ''}
                    >
                      {step.label}
                    </Text>
                  </div>

                  {step.status === 'running' && (
                    <Text size={300} className="text-gray-500 italic">
                      {step.detail}
                    </Text>
                  )}

                  {step.status === 'complete' && step.result && (
                    <div className="mt-1 bg-green-50 border border-green-200 rounded px-3 py-2">
                      <Text size={300} className="text-green-800">
                        ✓ {step.result}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <Text size={300} className="text-gray-600">
              Analysis progress
            </Text>
            <Text size={300} className="text-gray-600">
              {analysisSteps.filter(s => s.status === 'complete').length} of {totalSteps} complete
            </Text>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{
                width: `${(analysisSteps.filter(s => s.status === 'complete').length / totalSteps) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkle24Filled className="text-blue-600" />
          <h1 className="text-2xl font-semibold">Copilot Suggestions</h1>
        </div>
        <Text className="text-gray-600">
          I've analyzed the supplier delay email. Here are some recommended actions:
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {suggestions.map((suggestion) => {
          const IconComponent = iconMap[suggestion.icon] || Search24Regular;
          return (
            <Card key={suggestion.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <IconComponent className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <Text weight="semibold" size={400} className="block mb-1">
                    {suggestion.title}
                  </Text>
                  <Text size={300} className="block text-gray-600 mb-2">
                    {suggestion.description}
                  </Text>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                    <Text size={200} className="text-gray-500">
                      {Math.round(suggestion.confidence * 100)}%
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button appearance="primary" size="large" onClick={onStartChat}>
          Start Chat with Copilot
        </Button>
      </div>
    </div>
  );
}
