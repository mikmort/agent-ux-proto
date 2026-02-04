'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BusinessCentralSalesOrder from '@/components/BusinessCentralSalesOrder';
import EmailViewer from '@/components/EmailViewer';
import CopilotSuggestions from '@/components/CopilotSuggestions';
import CopilotChat from '@/components/CopilotChat';
import { supplierEmail, initialSuggestions } from '@/lib/mockData';
import { DemoState } from '@/lib/types';

function HomeContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get('stage') as DemoState['stage'] | null;

  const [demoState, setDemoState] = useState<DemoState>({
    stage: stageParam || 'email',
    conversationStep: 0,
  });

  const handleAskCopilotFromSalesOrder = () => {
    setDemoState({ stage: 'suggestions', conversationStep: 0 });
  };

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
      {demoState.stage === 'salesOrder' && (
        <BusinessCentralSalesOrder onAskCopilot={handleAskCopilotFromSalesOrder} />
      )}

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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomeContent />
    </Suspense>
  );
}
