'use client';

import { Suspense } from 'react';
import BusinessCentralSalesOrder from '@/components/BusinessCentralSalesOrder';
import { useRouter, useSearchParams } from 'next/navigation';

function SalesOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightItem = searchParams.get('highlight');

  const handleAskCopilot = () => {
    // Navigate back to main demo flow at suggestions stage
    router.push('/?stage=suggestions');
  };

  return <BusinessCentralSalesOrder onAskCopilot={handleAskCopilot} highlightedItem={highlightItem} />;
}

export default function SalesOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SalesOrderContent />
    </Suspense>
  );
}
