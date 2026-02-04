'use client';

import { useState } from 'react';
import { Email } from '@/lib/types';
import { Button, Text } from '@fluentui/react-components';
import {
  Mail24Filled,
  Mail24Regular,
  Calendar24Regular,
  People24Regular,
  List24Regular,
  ChevronRight16Regular,
  ChevronDown16Regular,
  Sparkle24Regular,
  Send24Regular,
  Delete24Regular,
  Archive24Regular,
  Flag24Regular,
  Folder24Regular,
  InboxArrowDown24Regular,
  MailInbox24Filled,
} from '@fluentui/react-icons';
import { inboxEmails } from '@/lib/mockData';

interface EmailViewerProps {
  email: Email;
  onAskCopilot: () => void;
}

export default function EmailViewer({ email, onAskCopilot }: EmailViewerProps) {
  const [selectedEmailId, setSelectedEmailId] = useState(email.id);
  const [foldersExpanded, setFoldersExpanded] = useState(true);

  const selectedEmail = inboxEmails.find((e) => e.id === selectedEmailId) || email;
  const isSupplierEmail = selectedEmail.id === 'email-001';

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Ribbon */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1 px-4 py-2">
          <Button appearance="subtle" icon={<Send24Regular />} size="small">
            New Email
          </Button>
          <Button appearance="subtle" icon={<Delete24Regular />} size="small">
            Delete
          </Button>
          <Button appearance="subtle" icon={<Archive24Regular />} size="small">
            Archive
          </Button>
          <Button appearance="subtle" icon={<Flag24Regular />} size="small">
            Flag
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Text size={300} className="text-gray-600">
              Outlook
            </Text>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Module Switcher - Far Left */}
        <div className="w-14 bg-blue-700 flex flex-col items-center py-4 gap-4">
          <button className="p-2 rounded hover:bg-blue-600 transition-colors">
            <Mail24Filled className="text-white" />
          </button>
          <button className="p-2 rounded hover:bg-blue-600 transition-colors opacity-60">
            <Calendar24Regular className="text-white" />
          </button>
          <button className="p-2 rounded hover:bg-blue-600 transition-colors opacity-60">
            <People24Regular className="text-white" />
          </button>
          <button className="p-2 rounded hover:bg-blue-600 transition-colors opacity-60">
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
                  1
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
                  <InboxArrowDown24Regular className="text-gray-600" />
                  <Text size={300}>Inbox</Text>
                  <Text size={200} className="ml-auto text-gray-500">
                    7
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
              </div>
            )}
          </div>
        </div>

        {/* Email List - Middle */}
        <div className="w-96 border-r border-gray-200 overflow-y-auto">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
            <Text weight="semibold" size={400}>
              Inbox
            </Text>
          </div>

          <div className="divide-y divide-gray-200">
            {inboxEmails.map((emailItem) => (
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
                        <span className="text-red-600 text-xs">!</span>
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
        </div>

        {/* Reading Pane - Right */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-6">
            <div className="space-y-4">
              {/* Email Header */}
              <div className="border-b pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Text weight="semibold" size={600} className="block mb-2">
                      {selectedEmail.subject}
                    </Text>
                    {selectedEmail.importance === 'high' && (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                        HIGH IMPORTANCE
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {selectedEmail.from.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <Text weight="semibold" size={300} className="block">
                      {selectedEmail.from}
                    </Text>
                    <Text size={200} className="text-gray-500">
                      To: Me
                    </Text>
                  </div>
                  <Text size={200} className="text-gray-500">
                    {new Date(selectedEmail.date).toLocaleString()}
                  </Text>
                </div>
              </div>

              {/* Email Body */}
              <div className="py-4">
                <Text className="whitespace-pre-wrap leading-relaxed">
                  {selectedEmail.body}
                </Text>
              </div>

              {/* Copilot Button - Only for supplier email */}
              {isSupplierEmail && (
                <div className="pt-4 border-t flex justify-center">
                  <Button
                    appearance="primary"
                    size="large"
                    icon={<Sparkle24Regular />}
                    onClick={onAskCopilot}
                    className="animate-pulse hover:animate-none"
                  >
                    Ask Copilot for Help
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
