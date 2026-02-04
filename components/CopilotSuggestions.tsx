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

export default function CopilotSuggestions({ suggestions, onStartChat }: CopilotSuggestionsProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI thinking time
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center h-96">
        <Spinner size="large" label="Analyzing email and checking for impacts..." />
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
                  <Text weight="semibold" size={400} className="mb-1">
                    {suggestion.title}
                  </Text>
                  <Text size={300} className="text-gray-600 mb-2">
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
