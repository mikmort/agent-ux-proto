'use client';

import { useState } from 'react';
import { Email } from '@/lib/types';
import { Button, Text, Input, Divider } from '@fluentui/react-components';
import {
  Mail24Filled,
  Mail24Regular,
  Calendar24Regular,
  People24Regular,
  List24Regular,
  ChevronRight16Regular,
  ChevronDown16Regular,
  Sparkle24Regular,
  ChatSparkle24Filled,
  Send24Regular,
  Delete24Regular,
  Archive24Regular,
  Flag24Regular,
  Folder24Regular,
  MailInbox24Filled,
  Search20Regular,
  ArrowReply24Regular,
  ArrowReplyAll24Regular,
  Share24Regular,
  MoreHorizontal24Regular,
  Pin24Regular,
  Print24Regular,
  ArrowUndo24Regular,
  ArrowRedo24Regular,
  ChevronDown20Regular,
  Tag24Regular,
  MailRead24Regular,
} from '@fluentui/react-icons';
import { inboxEmails, urgentEmails, urgentEmailIds } from '@/lib/mockData';

interface EmailViewerProps {
  email: Email;
  onAskCopilot: () => void;
}

export default function EmailViewer({ email, onAskCopilot }: EmailViewerProps) {
  // Default to the Q1 Sales Meeting email (non-urgent) so users discover urgent emails via the alert
  const [selectedEmailId, setSelectedEmailId] = useState('email-002');
  const [foldersExpanded, setFoldersExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUrgentPanel, setShowUrgentPanel] = useState(false);

  const selectedEmail = inboxEmails.find((e) => e.id === selectedEmailId) || email;
  const isUrgentEmail = urgentEmailIds.includes(selectedEmail.id);

  const filteredEmails = inboxEmails.filter(
    (e) =>
      searchQuery === '' ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = filteredEmails.filter((e) => !e.read).length;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Title Bar with Search */}
      <div className="bg-[#0078D4] px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Mail24Filled className="text-white" />
          <Text size={300} weight="semibold" className="text-white">
            Outlook
          </Text>
        </div>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            contentBefore={<Search20Regular />}
            size="small"
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button appearance="subtle" size="small" className="text-white hover:bg-[#106EBE]">
            <ArrowUndo24Regular />
          </Button>
          <Button appearance="subtle" size="small" className="text-white hover:bg-[#106EBE]">
            <ArrowRedo24Regular />
          </Button>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="border-b border-gray-300 bg-white">
        <div className="flex items-center gap-6 px-4 py-1">
          <Text size={300} weight="semibold" className="text-blue-600 border-b-2 border-blue-600 pb-1">
            Home
          </Text>
          <Text size={300} className="text-gray-600 pb-1 cursor-pointer hover:text-blue-600">
            View
          </Text>
          <Text size={300} className="text-gray-600 pb-1 cursor-pointer hover:text-blue-600">
            Help
          </Text>
        </div>
      </div>

      {/* Ribbon Commands */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between gap-2 px-4 py-2">
          {/* Left side commands */}
          <div className="flex items-center gap-1">
            <Button appearance="primary" icon={<Send24Regular />} size="small">
              New Email
            </Button>
            <Divider vertical className="mx-2 h-6" />
            <Button appearance="subtle" icon={<Delete24Regular />} size="small">
              Delete
            </Button>
            <Button appearance="subtle" icon={<Archive24Regular />} size="small">
              Archive
            </Button>
            <Button appearance="subtle" size="small">
              Junk
              <ChevronDown20Regular />
            </Button>
            <Divider vertical className="mx-2 h-6" />
            <Button appearance="subtle" icon={<ArrowReply24Regular />} size="small">
              Reply
            </Button>
            <Button appearance="subtle" icon={<ArrowReplyAll24Regular />} size="small">
              Reply All
            </Button>
            <Button appearance="subtle" icon={<Share24Regular />} size="small">
              Forward
            </Button>
          </div>

          {/* Right side commands */}
          <div className="flex items-center gap-1">
            <Button appearance="subtle" icon={<MailRead24Regular />} size="small">
              Read/Unread
            </Button>
            <Button appearance="subtle" icon={<Flag24Regular />} size="small">
              Flag
            </Button>
            <Button appearance="subtle" icon={<Tag24Regular />} size="small">
              Categorize
            </Button>
            <Button appearance="subtle" icon={<Pin24Regular />} size="small">
              Pin
            </Button>
            <Divider vertical className="mx-2 h-6" />
            <Button appearance="subtle" icon={<Print24Regular />} size="small">
              Print
            </Button>
            <Button appearance="subtle" icon={<MoreHorizontal24Regular />} size="small" />
          </div>
        </div>
      </div>


      <div className="flex flex-1 overflow-hidden">
        {/* Module Switcher - Far Left */}
        <div className="w-14 bg-[#0078D4] flex flex-col items-center py-4 gap-4">
          <button className="p-2 rounded hover:bg-[#106EBE] transition-colors" aria-label="Mail">
            <Mail24Filled className="text-white" />
          </button>
          <button className="p-2 rounded hover:bg-[#106EBE] transition-colors opacity-60" aria-label="Calendar">
            <Calendar24Regular className="text-white" />
          </button>
          <button className="p-2 rounded hover:bg-[#106EBE] transition-colors opacity-60" aria-label="People">
            <People24Regular className="text-white" />
          </button>
          <button className="p-2 rounded hover:bg-[#106EBE] transition-colors opacity-60" aria-label="Tasks">
            <List24Regular className="text-white" />
          </button>
        </div>

        {/* Folder Tree - Left */}
        <div className="w-56 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="p-3">
            <div className="mb-4">
              <Text weight="semibold" size={400}>
                Favorites
              </Text>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-blue-50 text-blue-600 cursor-pointer">
                <MailInbox24Filled className="text-blue-600" />
                <Text size={300} weight="semibold">
                  Inbox
                </Text>
                <Text size={200} className="ml-auto">
                  {unreadCount}
                </Text>
              </div>
            </div>

            <div className="mb-2">
              <button
                onClick={() => setFoldersExpanded(!foldersExpanded)}
                className="flex items-center gap-1 w-full px-2 py-1 hover:bg-gray-100 rounded"
              >
                {foldersExpanded ? (
                  <ChevronDown16Regular />
                ) : (
                  <ChevronRight16Regular />
                )}
                <Text size={300} weight="semibold">
                  Folders
                </Text>
              </button>
            </div>

            {foldersExpanded && (
              <div className="space-y-1 pl-4">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  <Mail24Regular className="text-gray-600" />
                  <Text size={300}>Inbox</Text>
                  <Text size={200} className="ml-auto text-gray-500">
                    {inboxEmails.length}
                  </Text>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  <Folder24Regular className="text-gray-600" />
                  <Text size={300}>Drafts</Text>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  <Folder24Regular className="text-gray-600" />
                  <Text size={300}>Sent Items</Text>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  <Folder24Regular className="text-gray-600" />
                  <Text size={300}>Deleted Items</Text>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  <Folder24Regular className="text-gray-600" />
                  <Text size={300}>Archive</Text>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  <Folder24Regular className="text-gray-600" />
                  <Text size={300}>Junk Email</Text>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email List - Middle */}
        <div className="w-96 border-r border-gray-200 overflow-y-auto">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
            <Text weight="semibold" size={400}>
              Inbox
            </Text>
            <Text size={200} className="text-gray-500">
              {unreadCount} unread
            </Text>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredEmails.map((emailItem) => (
              <div
                key={emailItem.id}
                onClick={() => setSelectedEmailId(emailItem.id)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedEmailId === emailItem.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                } ${!emailItem.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      !emailItem.read ? 'bg-blue-600' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Text
                        size={300}
                        weight={!emailItem.read ? 'semibold' : 'regular'}
                        className="truncate flex-1"
                      >
                        {emailItem.from}
                      </Text>
                      {emailItem.importance === 'high' && (
                        <span className="text-red-600 text-xs font-bold">!</span>
                      )}
                    </div>
                    <Text
                      size={300}
                      weight={!emailItem.read ? 'semibold' : 'regular'}
                      className="truncate block mb-1"
                    >
                      {emailItem.subject}
                    </Text>
                    <Text size={200} className="text-gray-500 truncate block">
                      {emailItem.body.split('\n')[0]}
                    </Text>
                    <Text size={200} className="text-gray-400 mt-1">
                      {new Date(emailItem.date).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEmails.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Text size={300} className="text-gray-500">
                No emails found matching &quot;{searchQuery}&quot;
              </Text>
            </div>
          )}
        </div>

        {/* Reading Pane - Right */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-none px-3 py-2">
            {/* Email Header */}
            <div className="mb-4">
              {/* Subject Line */}
              <div className="mb-3">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {selectedEmail.subject}
                </h1>
                {selectedEmail.importance === 'high' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    HIGH IMPORTANCE
                  </span>
                )}
              </div>

              {/* Sender Info */}
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg flex-shrink-0">
                  {selectedEmail.from.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <Text weight="semibold" size={400} className="text-gray-900">
                      {selectedEmail.from}
                    </Text>
                    <Text size={300} className="text-gray-500 flex-shrink-0 ml-4">
                      {new Date(selectedEmail.date).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </Text>
                  </div>
                  <Text size={300} className="text-gray-600">
                    To: Me
                  </Text>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="prose prose-sm max-w-none">
              <div className="text-[15px] leading-7 text-gray-900 whitespace-pre-wrap">
                {selectedEmail.body}
              </div>
            </div>

            {/* Copilot Help Button - Shows for urgent emails */}
            {isUrgentEmail && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Sparkle24Regular className="text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <Text weight="semibold" size={300} className="block text-gray-900 mb-2">
                      Need help with this?
                    </Text>
                    <Text size={200} className="text-gray-600">
                      Copilot can analyze this message and suggest actions
                    </Text>
                  </div>
                  <Button
                    appearance="primary"
                    size="medium"
                    icon={<ChatSparkle24Filled />}
                    onClick={onAskCopilot}
                  >
                    Ask Copilot
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Urgent Emails Floating Button - Bottom Left */}
        <div className="fixed bottom-6 left-20 z-50">
          <Button
            appearance="primary"
            size="large"
            icon={
              <img
                src="/copilot-icon.webp"
                alt="Copilot"
                className="h-5 w-auto"
              />
            }
            onClick={() => setShowUrgentPanel(true)}
            className="shadow-lg animate-pulse hover:animate-none"
          >
            {urgentEmails.length} emails need attention
          </Button>
        </div>

        {/* Urgent Emails Panel */}
        {showUrgentPanel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowUrgentPanel(false)}>
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/copilot-icon.webp"
                    alt="Copilot"
                    className="h-7 w-auto"
                  />
                  <Text size={500} weight="semibold">
                    Emails Requiring Immediate Attention
                  </Text>
                </div>
                <Button appearance="subtle" onClick={() => setShowUrgentPanel(false)}>
                  ✕
                </Button>
              </div>

              <Text size={300} className="text-gray-600 mb-4">
                Copilot has identified {urgentEmails.length} emails that need your immediate response based on deadlines and urgency.
              </Text>

              <div className="space-y-3">
                {urgentEmails.map((urgentEmail) => (
                  <div
                    key={urgentEmail.id}
                    onClick={() => {
                      setSelectedEmailId(urgentEmail.id);
                      setShowUrgentPanel(false);
                      // If it's the supplier email, trigger suggestions
                      if (urgentEmail.id === 'email-001') {
                        setTimeout(() => onAskCopilot(), 500);
                      }
                    }}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {/* Priority indicator with colored border */}
                      <div className={`flex-shrink-0 w-1 h-full rounded-full ${
                        urgentEmail.importance === 'high'
                          ? 'bg-red-600'
                          : urgentEmail.importance === 'medium'
                          ? 'bg-orange-500'
                          : 'bg-blue-500'
                      }`} />
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-semibold flex-shrink-0 text-gray-700">
                        {urgentEmail.from.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Text size={400} weight="semibold" className="truncate flex-1">
                            {urgentEmail.subject}
                          </Text>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                            urgentEmail.importance === 'high'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : urgentEmail.importance === 'medium'
                              ? 'bg-orange-50 text-orange-700 border border-orange-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {urgentEmail.importance === 'high' ? 'High Priority' : urgentEmail.importance === 'medium' ? 'Medium' : 'Low'}
                          </span>
                        </div>
                        <Text size={300} className="text-gray-600 truncate block mb-2">
                          <span className="font-medium">From:</span> {urgentEmail.from}
                        </Text>
                        <Text size={200} className="text-gray-500 line-clamp-2 block">
                          {urgentEmail.body.split('\n')[0]}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
