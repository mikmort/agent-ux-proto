'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';
import { Avatar, Text } from '@fluentui/react-components';
import { Bot24Regular, Person24Regular } from '@fluentui/react-icons';
import DataTable from './dynamic/DataTable';
import ChartView from './dynamic/ChartView';
import ActionButtons from './dynamic/ActionButtons';
import InputForm from './dynamic/InputForm';

interface ChatMessageProps {
  message: ChatMessageType;
  onActionClick?: (actionId: string) => void;
  onFormSubmit?: (formId: string, data: Record<string, any>) => void;
}

export default function ChatMessage({ message, onActionClick, onFormSubmit }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${
        isSystem ? 'justify-center' : ''
      }`}
    >
      {!isSystem && (
        <Avatar
          icon={isUser ? <Person24Regular /> : <Bot24Regular />}
          color={isUser ? 'colorful' : 'brand'}
          size={36}
        />
      )}

      <div
        className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'} ${
          isSystem ? 'items-center' : ''
        }`}
      >
        <div
          className={`rounded-lg p-3 ${
            isUser
              ? 'bg-blue-600 text-white'
              : isSystem
              ? 'bg-gray-100 text-gray-600 text-sm italic'
              : 'bg-gray-100 text-gray-900'
          } ${message.streaming ? 'animate-pulse' : ''}`}
        >
          <Text className="whitespace-pre-wrap break-words">{message.content}</Text>
        </div>

        {message.dynamicContent && (
          <div className="mt-3 w-full min-w-[500px]">
            {message.dynamicContent.type === 'table' && <DataTable data={message.dynamicContent.data} />}
            {message.dynamicContent.type === 'chart' && <ChartView data={message.dynamicContent.data} />}
            {message.dynamicContent.type === 'actions' && (
              <ActionButtons data={message.dynamicContent.data} onActionClick={onActionClick} />
            )}
            {message.dynamicContent.type === 'form' && (
              <InputForm data={message.dynamicContent.data} onSubmit={onFormSubmit} />
            )}
          </div>
        )}

        <Text size={200} className="text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </Text>
      </div>
    </div>
  );
}
