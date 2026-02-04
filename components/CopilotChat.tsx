'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, TableData, ChartData } from '@/lib/types';
import { Button, Input, Spinner } from '@fluentui/react-components';
import { Send24Regular, ArrowReset24Regular, Sparkle24Filled } from '@fluentui/react-icons';
import ChatMessage from './ChatMessage';
import { mockMCP } from '@/lib/mockMCP';
import {
  affectedCustomers,
  revenueImpactData,
  alternateSuppliers,
  supplierComparisonData,
  premiumProductCustomers,
} from '@/lib/mockData';

interface CopilotChatProps {
  onReset: () => void;
}

export default function CopilotChat({ onReset }: CopilotChatProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial analysis on mount
  useEffect(() => {
    const runInitialAnalysis = async () => {
      await addMessage({
        role: 'system',
        content: 'Copilot is analyzing the situation...',
      });

      // Simulate AI thinking
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const affectedData = await mockMCP.queryAffectedOrders('XYZ-789');

      await addStreamingMessage(
        'assistant',
        "I've analyzed the supplier delay email for Order #PS-2847. The 3-week delay affects part XYZ-789, which is critical for your Industrial Widget A100 product line.\n\nHere are the customers with orders that will be impacted:"
      );

      // Add table of affected customers
      await addMessage({
        role: 'assistant',
        content: '',
        dynamicContent: {
          type: 'table',
          data: {
            columns: [
              { key: 'name', label: 'Customer', width: 200 },
              { key: 'orderNumber', label: 'Order #', width: 120 },
              { key: 'quantity', label: 'Quantity', width: 100 },
              { key: 'dueDate', label: 'Due Date', width: 120 },
              { key: 'revenue', label: 'Revenue', width: 120 },
              { key: 'priority', label: 'Priority', width: 100 },
            ],
            rows: affectedData,
            highlightRows: ['CUST-001', 'CUST-002'],
          } as TableData,
        },
      });

      // Add revenue impact chart
      await addMessage({
        role: 'assistant',
        content: '',
        dynamicContent: {
          type: 'chart',
          data: {
            type: 'bar',
            title: 'Revenue at Risk by Customer',
            data: revenueImpactData,
            xAxisKey: 'customer',
            yAxisKey: 'revenue',
          } as ChartData,
        },
      });

      await addStreamingMessage(
        'assistant',
        'Total revenue at risk: $225,000 across 3 customer orders.\n\nWhat would you like to do? I can help you:'
      );

      // Add action buttons
      await addMessage({
        role: 'assistant',
        content: '',
        dynamicContent: {
          type: 'actions',
          data: {
            actions: [
              { id: 'find-suppliers', label: 'Find Alternate Suppliers', variant: 'primary' },
              { id: 'upgrade-premium', label: 'Explore Premium Upgrade', variant: 'secondary' },
              { id: 'notify-customers', label: 'Draft Customer Notifications', variant: 'outline' },
            ],
          },
        },
      });

      setConversationStep(1);
    };

    runInitialAnalysis();
  }, []);

  const addMessage = async (
    message: Omit<ChatMessageType, 'id' | 'timestamp'>
  ): Promise<void> => {
    const newMessage: ChatMessageType = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  const addStreamingMessage = async (role: 'user' | 'assistant', content: string): Promise<void> => {
    const messageId = `msg-${Date.now()}-${Math.random()}`;
    const baseMessage: ChatMessageType = {
      id: messageId,
      role,
      content: '',
      timestamp: new Date(),
      streaming: true,
    };

    setMessages((prev) => [...prev, baseMessage]);

    // Stream character by character
    for (let i = 0; i < content.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: content.slice(0, i + 1) } : msg
        )
      );
    }

    // Mark as complete
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, streaming: false } : msg))
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleActionClick = async (actionId: string) => {
    if (conversationStep === 1) {
      if (actionId === 'find-suppliers') {
        await addMessage({ role: 'user', content: 'Find alternate suppliers for part XYZ-789' });

        setIsTyping(true);
        const suppliers = await mockMCP.queryAlternateSuppliers('XYZ-789');
        setIsTyping(false);

        await addStreamingMessage(
          'assistant',
          "I've searched our supplier database and found 3 certified alternate suppliers who can provide part XYZ-789 with faster lead times:"
        );

        await addMessage({
          role: 'assistant',
          content: '',
          dynamicContent: {
            type: 'table',
            data: {
              columns: [
                { key: 'name', label: 'Supplier', width: 200 },
                { key: 'leadTime', label: 'Lead Time', width: 120 },
                { key: 'pricePerUnit', label: 'Price/Unit', width: 120 },
                { key: 'reliability', label: 'Reliability', width: 120 },
                { key: 'certified', label: 'Certified', width: 100 },
              ],
              rows: suppliers.map((s) => ({
                ...s,
                certified: s.certified ? '✓ Yes' : '✗ No',
              })),
            } as TableData,
          },
        });

        await addMessage({
          role: 'assistant',
          content: '',
          dynamicContent: {
            type: 'chart',
            data: {
              type: 'bar',
              title: 'Supplier Lead Time Comparison (days)',
              data: supplierComparisonData,
              xAxisKey: 'supplier',
              yAxisKey: 'leadTime',
            } as ChartData,
          },
        });

        await addStreamingMessage(
          'assistant',
          'Premium Parts Co. offers the fastest delivery (5 days) with 98% reliability. Would you like to proceed with them, or explore other options?'
        );

        await addMessage({
          role: 'assistant',
          content: '',
          dynamicContent: {
            type: 'actions',
            data: {
              actions: [
                { id: 'select-premium-parts', label: 'Select Premium Parts Co.', variant: 'primary' },
                { id: 'upgrade-premium', label: 'Explore Premium Upgrade Instead', variant: 'secondary' },
              ],
            },
          },
        });

        setConversationStep(2);
      } else if (actionId === 'upgrade-premium') {
        await handleUpgradeFlow();
      }
    } else if (conversationStep === 2) {
      if (actionId === 'upgrade-premium' || actionId === 'select-premium-parts') {
        await handleUpgradeFlow();
      }
    } else if (conversationStep === 3) {
      if (actionId.startsWith('approve-')) {
        const customerId = actionId.replace('approve-', '');
        await handleApproval(customerId);
      }
    }
  };

  const handleUpgradeFlow = async () => {
    await addMessage({ role: 'user', content: 'What about upgrading customers to the premium product?' });

    setIsTyping(true);
    const upgradeOptions = await mockMCP.getPremiumUpgradeOptions();
    setIsTyping(false);

    await addStreamingMessage(
      'assistant',
      "Great idea! I've analyzed which customers would benefit from upgrading to the Industrial Widget A200 Premium. This product is in stock and exceeds A100 specifications:"
    );

    await addMessage({
      role: 'assistant',
      content: '',
      dynamicContent: {
        type: 'table',
        data: {
          columns: [
            { key: 'name', label: 'Customer', width: 200 },
            { key: 'currentProduct', label: 'Current Product', width: 180 },
            { key: 'upgradeProduct', label: 'Upgrade To', width: 180 },
            { key: 'additionalCost', label: 'Additional Cost', width: 140 },
            { key: 'eligible', label: 'Eligible', width: 100 },
          ],
          rows: upgradeOptions.map((u) => ({
            ...u,
            eligible: u.eligible ? '✓ Yes' : '✗ No',
          })),
        } as TableData,
      },
    });

    await addStreamingMessage(
      'assistant',
      'Both customers are eligible for the upgrade. The A200 Premium offers:\n\n• Immediate availability (no delay)\n• Enhanced performance specifications\n• Extended 3-year warranty\n• Priority support\n\nWould you like to approve this upgrade for any customers?'
    );

    await addMessage({
      role: 'assistant',
      content: '',
      dynamicContent: {
        type: 'actions',
        data: {
          actions: [
            { id: 'approve-CUST-001', label: 'Approve for Contoso Manufacturing', variant: 'primary' },
            { id: 'approve-CUST-002', label: 'Approve for Fabrikam Industries', variant: 'primary' },
          ],
        },
      },
    });

    setConversationStep(3);
  };

  const handleApproval = async (customerId: string) => {
    const customer = affectedCustomers.find((c) => c.id === customerId);
    await addMessage({
      role: 'user',
      content: `Approve premium upgrade for ${customer?.name}`,
    });

    setIsTyping(true);
    const email = await mockMCP.generateDraftEmail(customerId, { upgrade: true });
    setIsTyping(false);

    await addStreamingMessage(
      'assistant',
      `Perfect! I've drafted a personalized email for ${customer?.name}. Here's what I've prepared:`
    );

    await addMessage({
      role: 'assistant',
      content: email,
    });

    await addStreamingMessage(
      'assistant',
      'The email is ready to send. Would you like me to send it now, or would you like to make any changes first?'
    );

    await addMessage({
      role: 'assistant',
      content: '',
      dynamicContent: {
        type: 'actions',
        data: {
          actions: [
            { id: 'send-email', label: 'Send Email', variant: 'primary' },
            { id: 'edit-email', label: 'Edit First', variant: 'secondary' },
          ],
        },
      },
    });

    setConversationStep(4);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    await addMessage({ role: 'user', content: inputValue });
    setInputValue('');

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTyping(false);

    await addStreamingMessage(
      'assistant',
      "I understand your question. In this demo, I'm following a scripted conversation flow. Please use the action buttons to explore the different scenarios I can help with!"
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkle24Filled className="text-blue-600" />
          <h1 className="text-xl font-semibold">Copilot Chat</h1>
        </div>
        <Button appearance="subtle" icon={<ArrowReset24Regular />} onClick={onReset}>
          Reset Demo
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onActionClick={handleActionClick}
            />
          ))}
          {isTyping && (
            <div className="flex gap-3 mb-4">
              <Spinner size="small" label="Copilot is thinking..." />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            className="flex-1"
            placeholder="Ask a question or use the action buttons above..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            appearance="primary"
            icon={<Send24Regular />}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
