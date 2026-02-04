'use client';

import { ActionData } from '@/lib/types';
import { Button } from '@fluentui/react-components';

interface ActionButtonsProps {
  data: ActionData;
  onActionClick?: (actionId: string) => void;
}

export default function ActionButtons({ data, onActionClick }: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {data.actions.map((action) => (
        <Button
          key={action.id}
          appearance={action.variant === 'primary' ? 'primary' : action.variant === 'secondary' ? 'secondary' : 'outline'}
          disabled={action.disabled}
          onClick={() => onActionClick?.(action.id)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
