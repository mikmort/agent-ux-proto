'use client';

import { useState } from 'react';
import EmailViewer from '@/components/EmailViewer';
import CopilotSuggestions from '@/components/CopilotSuggestions';
import CopilotChat from '@/components/CopilotChat';
import { supplierEmail, initialSuggestions } from '@/lib/mockData';
import { DemoState } from '@/lib/types';

export default function Home() {
  const [demoState, setDemoState] = useState<DemoState>({
    stage: 'email',
    conversationStep: 0,
  });

  const handleAskCopilot = () => {
    setDemoState({ stage: 'suggestions', conversationStep: 0 });
  };

  const handleStartChat = () => {
    setDemoState({ stage: 'chat', conversationStep: 0 });
  };

  const handleReset = () => {
    setDemoState({ stage: 'email', conversationStep: 0 });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {demoState.stage === 'email' && (
        <EmailViewer email={supplierEmail} onAskCopilot={handleAskCopilot} />
      )}

      {demoState.stage === 'suggestions' && (
        <CopilotSuggestions suggestions={initialSuggestions} onStartChat={handleStartChat} />
      )}

      {demoState.stage === 'chat' && <CopilotChat onReset={handleReset} />}
    </main>
  );
}
