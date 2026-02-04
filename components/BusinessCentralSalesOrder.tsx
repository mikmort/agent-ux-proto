'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Text, Badge, Tooltip, Spinner } from '@fluentui/react-components';
import {
  ArrowSync24Regular,
  Print24Regular,
  Mail24Regular,
  MoreHorizontal24Regular,
  CheckmarkCircle24Regular,
  Sparkle24Regular,
  Info16Regular,
  Dismiss24Regular,
  Send24Filled,
  ChatSparkle24Filled,
  Checkmark24Filled,
} from '@fluentui/react-icons';

interface SalesOrderLine {
  lineNo: number;
  type: string;
  no: string;
  description: string;
  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  lineDiscount: number;
  lineAmount: number;
}

interface SalesOrderProps {
  onAskCopilot: () => void;
  highlightedItem?: string | null;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isReportTask?: boolean;
  reportPreview?: string;
  isEmailTask?: boolean;
  emailPreview?: string;
}

interface OrderMetadata {
  shipmentMethod: string;
  shipmentMethodCode: string;
  eventType: string;
  loadInDateTime: string;
  technicalDirector: string;
}

export default function BusinessCentralSalesOrder({ onAskCopilot, highlightedItem }: SalesOrderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderMetadata, setOrderMetadata] = useState<OrderMetadata>({
    shipmentMethod: 'DELIVERY',
    shipmentMethodCode: 'DELIVERY',
    eventType: 'Technology Conference',
    loadInDateTime: 'Feb 14, 2026 - 6:00 AM',
    technicalDirector: 'Marcus Rivera - (415) 555-0199',
  });
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // If highlighting PX-800, show upgraded item
  const isPremiumUpgrade = highlightedItem === 'PX-800';

  // Initialize chat with history if coming from Copilot
  useEffect(() => {
    if (isPremiumUpgrade && chatMessages.length === 0) {
      setChatMessages([
        {
          id: 'msg-1',
          role: 'assistant',
          content: "I've successfully updated Sales Order EVT-2201 with ProSound PX-800 Premium speakers to address the supplier delay.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isPremiumUpgrade]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleViewReport = async () => {
    // Generate mitigation report content
    const reportContent = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="utf-8">
  <title>Supplier Delay Mitigation Report</title>
  <style>
    body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; margin: 1in; }
    h1 { font-size: 18pt; font-weight: bold; color: #0078d4; margin-bottom: 12pt; border-bottom: 2px solid #0078d4; padding-bottom: 6pt; }
    h2 { font-size: 14pt; font-weight: bold; color: #333; margin-top: 18pt; margin-bottom: 6pt; }
    h3 { font-size: 12pt; font-weight: bold; color: #555; margin-top: 12pt; margin-bottom: 6pt; }
    p { margin: 6pt 0; }
    .header { background-color: #f3f2f1; padding: 12pt; border-left: 4px solid #0078d4; margin-bottom: 12pt; }
    .section { margin-bottom: 18pt; }
    table { width: 100%; border-collapse: collapse; margin: 12pt 0; }
    th { background-color: #0078d4; color: white; padding: 8pt; text-align: left; font-weight: bold; }
    td { border: 1px solid #d1d1d1; padding: 8pt; }
    .status-high { color: #d13438; font-weight: bold; }
    .status-resolved { color: #107c10; font-weight: bold; }
    .footer { margin-top: 24pt; padding-top: 12pt; border-top: 1px solid #d1d1d1; font-size: 10pt; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Supplier Delay Mitigation Report</h1>
    <p><strong>Sales Order:</strong> EVT-2201 | <strong>Customer:</strong> TechCon 2026 Summit</p>
    <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
    <p><strong>Status:</strong> <span class="status-resolved">RESOLVED</span></p>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <p>This report documents the supplier delay incident for Sales Order EVT-2201 and the mitigation actions taken by Microsoft Copilot to ensure timely delivery for the TechCon 2026 Summit event.</p>
  </div>

  <div class="section">
    <h2>Incident Details</h2>
    <h3>Original Issue</h3>
    <p><strong>Supplier:</strong> SoundWave Pro Audio</p>
    <p><strong>Order Number:</strong> SW-2847</p>
    <p><strong>Issue:</strong> Severe East Coast snowstorm causing delivery delays</p>
    <p><strong>Affected Items:</strong> ProSound PX-500 Portable Speaker Systems (50 units)</p>
    <p><strong>Original Delivery Date:</strong> February 10, 2026</p>
    <p><strong>Revised Delivery Date:</strong> February 17, 2026</p>
    <p><strong>Event Date:</strong> February 15, 2026</p>
    <p><strong>Impact:</strong> <span class="status-high">HIGH - Equipment would arrive 2 days after event</span></p>
  </div>

  <div class="section">
    <h2>Mitigation Actions</h2>
    <h3>Automated Analysis</h3>
    <p>Microsoft Copilot analyzed the supplier delay email and automatically identified the following:</p>
    <ul>
      <li>Critical delivery timeline conflict with event date</li>
      <li>Customer priority level: High (2,500 attendees expected)</li>
      <li>Alternative inventory availability in warehouse systems</li>
      <li>Premium upgrade option with immediate availability</li>
    </ul>

    <h3>Solution Implemented</h3>
    <p><strong>Action:</strong> Upgraded speaker system to premium model with immediate availability</p>
    <table>
      <tr>
        <th>Aspect</th>
        <th>Original</th>
        <th>Updated</th>
      </tr>
      <tr>
        <td>Product Model</td>
        <td>ProSound PX-500 Portable</td>
        <td>ProSound PX-800 Premium</td>
      </tr>
      <tr>
        <td>Quantity</td>
        <td>50 units</td>
        <td>50 units</td>
      </tr>
      <tr>
        <td>Unit Price</td>
        <td>$2,500.00</td>
        <td>$3,000.00</td>
      </tr>
      <tr>
        <td>Line Total</td>
        <td>$125,000.00</td>
        <td>$150,000.00</td>
      </tr>
      <tr>
        <td>Availability</td>
        <td>February 17, 2026</td>
        <td>Immediate (In Stock)</td>
      </tr>
      <tr>
        <td>Delivery Status</td>
        <td><span class="status-high">At Risk</span></td>
        <td><span class="status-resolved">Confirmed for Feb 14</span></td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>Financial Impact</h2>
    <p><strong>Additional Cost:</strong> $25,000.00 ($500.00 per unit × 50 units)</p>
    <p><strong>Customer Value:</strong> Premium audio quality, enhanced event experience, zero downtime risk</p>
    <p><strong>Recommendation:</strong> Present upgrade as value-add given the critical nature of the event and risk mitigation</p>
  </div>

  <div class="section">
    <h2>Timeline</h2>
    <table>
      <tr>
        <th>Date/Time</th>
        <th>Event</th>
      </tr>
      <tr>
        <td>Feb 4, 2026 9:30 AM</td>
        <td>Supplier delay notification received</td>
      </tr>
      <tr>
        <td>Feb 4, 2026 9:31 AM</td>
        <td>Copilot analyzed email and identified risk</td>
      </tr>
      <tr>
        <td>Feb 4, 2026 9:32 AM</td>
        <td>Alternative inventory located in warehouse</td>
      </tr>
      <tr>
        <td>Feb 4, 2026 9:33 AM</td>
        <td>Sales Order EVT-2201 updated with PX-800 Premium speakers</td>
      </tr>
      <tr>
        <td>Feb 4, 2026 9:35 AM</td>
        <td>Mitigation report generated</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>Customer Communication</h2>
    <h3>Recommended Message</h3>
    <p>Dear Sarah Mitchell,</p>
    <p>We wanted to reach out regarding your upcoming TechCon 2026 Summit event. While monitoring our supply chain, we identified a potential delay with the originally specified ProSound PX-500 speaker systems.</p>
    <p>To ensure your event runs flawlessly, we've proactively upgraded your order to the ProSound PX-800 Premium Speaker System at a modest cost adjustment of $500 per unit. These premium speakers offer:</p>
    <ul>
      <li>Enhanced audio clarity and power output</li>
      <li>Better coverage for your 2,500 attendees</li>
      <li>Guaranteed delivery for your February 14 setup date</li>
      <li>Zero risk of delay</li>
    </ul>
    <p>The upgraded equipment will arrive on schedule and our technical team will ensure seamless setup for your event.</p>
  </div>

  <div class="section">
    <h2>Recommendations</h2>
    <ol>
      <li>Approve the upgraded sales order (EVT-2201) with PX-800 Premium speakers</li>
      <li>Contact customer to explain the proactive upgrade and value proposition</li>
      <li>Confirm delivery schedule with warehouse (Feb 14 setup date)</li>
      <li>Review supplier relationship with SoundWave Pro Audio</li>
      <li>Consider diversifying speaker equipment suppliers for future events</li>
    </ol>
  </div>

  <div class="footer">
    <p><strong>Report Generated by:</strong> Microsoft Copilot for Dynamics 365 Business Central</p>
    <p><strong>Company:</strong> Premier Events Production</p>
    <p><strong>System:</strong> Dynamics 365 Business Central</p>
  </div>
</body>
</html>`;

    // Create and download the report
    const blob = new Blob([reportContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mitigation_Report_EVT-2201_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDraftEmail = () => {
    const to = 'sarah.mitchell@techcon2026.com';
    const subject = 'Important Update: Equipment Upgrade for TechCon 2026 Summit';
    const body = `Dear Sarah,

I hope this message finds you well. I wanted to reach out regarding your upcoming TechCon 2026 Summit event scheduled for February 15th.

While monitoring our supply chain for your order (Sales Order #EVT-2201), we identified a potential delay with the originally specified ProSound PX-500 speaker systems due to weather-related shipping disruptions on the East Coast.

To ensure your event runs flawlessly and without any risk of delay, we've proactively upgraded your order to the ProSound PX-800 Premium Speaker System. Here's what this means for your event:

✓ Enhanced audio clarity and power output for superior sound quality
✓ Better coverage for your 2,500 attendees across all sessions
✓ Guaranteed delivery for your February 14 setup date - zero risk of delay
✓ Premium features including advanced wireless connectivity and DSP processing

The cost adjustment is $500 per unit (total additional: $25,000), which we believe represents excellent value given the enhanced capabilities and the elimination of any delivery risk for your high-profile event.

The upgraded equipment will arrive on schedule, and our technical team will ensure seamless setup and testing prior to your event start.

Please review the updated sales order attached to this email. If you have any questions or would like to discuss this further, I'm available at your convenience.

We're committed to making TechCon 2026 Summit an outstanding success.

Best regards,
James Davis
Premier Events Production
Sales: (555) 0123-4567`;

    // Create mailto link
    const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open in default email client (Outlook if configured)
    window.location.href = mailtoLink;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Parse command for shipment method change
    const lowerInput = inputValue.toLowerCase();
    if (lowerInput.includes('shipment') && lowerInput.includes('courier')) {
      // Add processing message
      const processingMsg: ChatMessage = {
        id: `msg-${Date.now()}-processing`,
        role: 'assistant',
        content: 'Updating shipment method to COURIER...',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, processingMsg]);

      // Simulate update
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the order
      setOrderMetadata(prev => ({
        ...prev,
        shipmentMethod: 'COURIER',
        shipmentMethodCode: 'COURIER',
      }));

      // Highlight the field
      setHighlightedField('shipmentMethod');
      setTimeout(() => setHighlightedField(null), 3000);

      // Add success message
      const successMsg: ChatMessage = {
        id: `msg-${Date.now()}-success`,
        role: 'assistant',
        content: '✓ Successfully updated Shipment Method Code from DELIVERY to COURIER. The order has been updated and is ready for courier pickup.',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev.slice(0, -1), successMsg]);

      // Add mitigation report task
      await new Promise((resolve) => setTimeout(resolve, 500));
      const reportTaskMsg: ChatMessage = {
        id: `msg-${Date.now()}-report`,
        role: 'assistant',
        content: '📄 Mitigation report created',
        timestamp: new Date(),
        isReportTask: true,
        reportPreview: 'This report documents the supplier delay incident and mitigation actions taken to ensure timely delivery for the TechCon 2026 Summit event.',
      };
      setChatMessages((prev) => [...prev, reportTaskMsg]);

      // Add customer email draft task
      await new Promise((resolve) => setTimeout(resolve, 500));
      const emailTaskMsg: ChatMessage = {
        id: `msg-${Date.now()}-email`,
        role: 'assistant',
        content: '📧 Customer notification email drafted',
        timestamp: new Date(),
        isEmailTask: true,
        emailPreview: 'Draft email to Sarah Mitchell explaining the proactive equipment upgrade and delivery guarantee.',
      };
      setChatMessages((prev) => [...prev, emailTaskMsg]);
    } else if (lowerInput.includes('load') && lowerInput.includes('time')) {
      // Add processing message
      const processingMsg: ChatMessage = {
        id: `msg-${Date.now()}-processing`,
        role: 'assistant',
        content: 'Analyzing equipment requirements and updating load-in time...',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, processingMsg]);

      // Simulate update
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Update the load-in time to earlier (Premium speakers need more setup)
      setOrderMetadata(prev => ({
        ...prev,
        loadInDateTime: 'Feb 14, 2026 - 5:00 AM',
      }));

      // Highlight the field
      setHighlightedField('loadInDateTime');
      setTimeout(() => setHighlightedField(null), 3000);

      // Add success message
      const successMsg: ChatMessage = {
        id: `msg-${Date.now()}-success`,
        role: 'assistant',
        content: '✓ Updated Load-In Date/Time to Feb 14, 2026 - 5:00 AM. The ProSound PX-800 Premium speakers require additional setup time due to their advanced features and larger power requirements. Moving load-in one hour earlier ensures adequate time for calibration and sound testing before the event.',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev.slice(0, -1), successMsg]);
    } else {
      // Generic response for other queries
      const responseMsg: ChatMessage = {
        id: `msg-${Date.now()}-response`,
        role: 'assistant',
        content: 'I can help you update this sales order. Try commands like "Change shipment method to COURIER" or "Update the load-in time".',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, responseMsg]);
    }

    setIsProcessing(false);
  };

  const orderLines: SalesOrderLine[] = [
    {
      lineNo: 10000,
      type: 'Item',
      no: isPremiumUpgrade ? 'PX-800' : 'PX-500',
      description: isPremiumUpgrade
        ? 'ProSound PX-800 Premium Speaker System'
        : 'ProSound PX-500 Portable Speaker System',
      quantity: 50,
      unitOfMeasure: 'EA',
      unitPrice: isPremiumUpgrade ? 3000.0 : 2500.0,
      lineDiscount: 0,
      lineAmount: isPremiumUpgrade ? 150000.0 : 125000.0,
    },
    {
      lineNo: 20000,
      type: 'Item',
      no: 'PROJ-4K-01',
      description: 'Professional 4K Laser Projector - 8000 Lumens',
      quantity: 3,
      unitOfMeasure: 'EA',
      unitPrice: 4500.0,
      lineDiscount: 5,
      lineAmount: 12825.0,
    },
    {
      lineNo: 30000,
      type: 'Item',
      no: 'SCRN-120',
      description: '120" Motorized Projection Screen',
      quantity: 3,
      unitOfMeasure: 'EA',
      unitPrice: 1200.0,
      lineDiscount: 0,
      lineAmount: 3600.0,
    },
    {
      lineNo: 40000,
      type: 'Item',
      no: 'MIC-WRLSS-12',
      description: 'Wireless Lavalier Microphone System (12-pack)',
      quantity: 2,
      unitOfMeasure: 'EA',
      unitPrice: 3200.0,
      lineDiscount: 0,
      lineAmount: 6400.0,
    },
    {
      lineNo: 50000,
      type: 'Item',
      no: 'MIC-HANDHELD',
      description: 'Professional Handheld Wireless Microphone',
      quantity: 8,
      unitOfMeasure: 'EA',
      unitPrice: 450.0,
      lineDiscount: 10,
      lineAmount: 3240.0,
    },
    {
      lineNo: 60000,
      type: 'Item',
      no: 'MIXER-32CH',
      description: 'Digital Audio Mixer - 32 Channel',
      quantity: 1,
      unitOfMeasure: 'EA',
      unitPrice: 5800.0,
      lineDiscount: 0,
      lineAmount: 5800.0,
    },
    {
      lineNo: 70000,
      type: 'Item',
      no: 'LIGHTING-PKG',
      description: 'Stage Lighting Package - Premium',
      quantity: 1,
      unitOfMeasure: 'EA',
      unitPrice: 8500.0,
      lineDiscount: 0,
      lineAmount: 8500.0,
    },
    {
      lineNo: 80000,
      type: 'Service',
      no: 'SETUP-FULL',
      description: 'Full Event Setup and Technical Support (3 days)',
      quantity: 1,
      unitOfMeasure: 'EA',
      unitPrice: 9500.0,
      lineDiscount: 0,
      lineAmount: 9500.0,
    },
  ];

  const subtotal = orderLines.reduce((sum, line) => sum + line.lineAmount, 0);
  const tax = subtotal * 0.0875; // 8.75% sales tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#f3f2f1]">
      {/* Business Central Header Bar - Signature Teal */}
      <div className="bg-[#00bcf2] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Text className="text-white font-semibold text-lg">Dynamics 365 Business Central</Text>
          <Text className="text-white opacity-80">|</Text>
          <Text className="text-white opacity-90">Sales Orders</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text className="text-white text-sm">Premier Events Production</Text>
          <button
            onClick={() => window.location.href = '/?stage=suggestions'}
            className="text-white hover:bg-[#0096c7] p-1 rounded transition-colors"
            aria-label="Close and return to Copilot"
          >
            <Dismiss24Regular />
          </button>
        </div>
      </div>

      {/* Action Ribbon */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="flex items-center gap-2">
          <Button appearance="subtle" icon={<ArrowSync24Regular />} size="small">
            Refresh
          </Button>
          <Button appearance="subtle" icon={<Print24Regular />} size="small">
            Print
          </Button>
          <Button appearance="subtle" icon={<Mail24Regular />} size="small">
            Send
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <Button
            appearance="primary"
            icon={<img src="/copilot-icon.webp" alt="" className="h-5 w-auto" />}
            onClick={() => setIsChatOpen(true)}
            size="small"
          >
            Copilot
          </Button>
          <div className="flex-1" />
          <Button appearance="subtle" icon={<MoreHorizontal24Regular />} size="small">
            More
          </Button>
        </div>
      </div>

      {/* Copilot Chat Pane */}
      {isChatOpen && (
        <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-300">
          {/* Chat Header */}
          <div className="bg-[#0078d4] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/copilot-icon.webp" alt="Copilot" className="h-5 w-auto" />
              <Text weight="semibold" className="text-white">Copilot</Text>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-blue-600 p-1 rounded transition-colors"
            >
              <Dismiss24Regular />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className="flex gap-3">
                {message.role === 'assistant' && (
                  <img
                    src="/copilot-icon.webp"
                    alt="Copilot"
                    className="h-6 w-auto flex-shrink-0 mt-1"
                  />
                )}
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  {message.role === 'assistant' && (
                    <Text size={200} className="text-gray-500 block mb-1">Copilot</Text>
                  )}
                  {message.isReportTask ? (
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedReportId(expandedReportId === message.id ? null : message.id)}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-200 transition-colors flex items-center justify-between"
                      >
                        <span>{message.content}</span>
                        <span className="text-gray-500 text-xs">
                          {expandedReportId === message.id ? '▼' : '▶'}
                        </span>
                      </button>
                      {expandedReportId === message.id && (
                        <div className="px-3 py-3 border-t border-gray-200 space-y-3">
                          <p className="text-xs text-gray-700">
                            {message.reportPreview}
                          </p>
                          <Button
                            appearance="primary"
                            size="small"
                            onClick={handleViewReport}
                          >
                            View Report in Word
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : message.isEmailTask ? (
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedEmailId(expandedEmailId === message.id ? null : message.id)}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-200 transition-colors flex items-center justify-between"
                      >
                        <span>{message.content}</span>
                        <span className="text-gray-500 text-xs">
                          {expandedEmailId === message.id ? '▼' : '▶'}
                        </span>
                      </button>
                      {expandedEmailId === message.id && (
                        <div className="px-3 py-3 border-t border-gray-200 space-y-3">
                          <p className="text-xs text-gray-700">
                            {message.emailPreview}
                          </p>
                          <div className="text-xs text-gray-600 space-y-1">
                            <p><strong>To:</strong> Sarah Mitchell (sarah.mitchell@techcon2026.com)</p>
                            <p><strong>Subject:</strong> Important Update: Equipment Upgrade for TechCon 2026 Summit</p>
                          </div>
                          <Button
                            appearance="primary"
                            size="small"
                            onClick={handleDraftEmail}
                          >
                            Open Draft in Outlook
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`inline-block px-3 py-2 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-[#0078d4] text-white ml-auto'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-3">
                <img
                  src="/copilot-icon.webp"
                  alt="Copilot"
                  className="h-6 w-auto flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <Spinner size="small" label="Processing..." />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Copilot to help with this order..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                disabled={isProcessing}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className="px-3 py-2 bg-[#0078d4] text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send24Filled className="w-5 h-5" />
              </button>
            </div>
            <Text size={200} className="text-gray-500 mt-2 block">
              Try: "Change shipment method to COURIER" or "Update the load-in time"
            </Text>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto p-6 flex gap-4">
        {/* Main Content Area */}
        <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Sales Order EVT-2201</h1>
            <div className="flex items-center gap-2">
              <Badge appearance="filled" color="success" icon={<CheckmarkCircle24Regular />}>
                Open
              </Badge>
              <Text className="text-sm text-gray-600">Created: Feb 1, 2026</Text>
            </div>
          </div>
        </div>

        {/* Copilot modification notice */}
        {isPremiumUpgrade && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkle24Regular className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Copilot updated this order
                </h3>
                <p className="text-sm text-blue-800">
                  ProSound PX-500 speakers upgraded to PX-800 Premium to address supplier delay.
                  Modified items are highlighted below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* General FastTab */}
        <Card className="mb-4 shadow-sm">
          <div className="bg-[#f3f2f1] border-b border-gray-300 px-4 py-2">
            <Text weight="semibold" className="text-sm">
              General
            </Text>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Sell-to Customer No.</label>
                  <div className="flex-1">
                    <div className="font-mono text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      CUST-001
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Sell-to Customer Name</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded font-semibold">
                      TechCon 2026 Summit
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Sell-to Address</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      1500 Convention Center Drive
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Sell-to City</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      San Francisco, CA 94102
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Contact Name</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      Sarah Mitchell
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Order Date</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      02/01/2026
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Requested Delivery Date</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded font-semibold text-orange-700">
                      02/15/2026
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Shipment Method Code</label>
                  <div className="flex-1">
                    <div
                      className={`text-sm px-2 py-1 rounded border transition-all ${
                        highlightedField === 'shipmentMethod'
                          ? 'bg-blue-50 border-blue-500 border-2 shadow-sm'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {orderMetadata.shipmentMethodCode}
                        {highlightedField === 'shipmentMethod' && (
                          <Tooltip
                            content="Copilot just updated this field"
                            relationship="label"
                          >
                            <Checkmark24Filled className="text-green-600 w-4 h-4" />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Location Code</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      WAREHOUSE-01
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Salesperson Code</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      JD - James Davis
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Event Type</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      {orderMetadata.eventType}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Load-In Date/Time</label>
                  <div className="flex-1">
                    <div
                      className={`text-sm px-2 py-1 rounded border transition-all ${
                        highlightedField === 'loadInDateTime'
                          ? 'bg-blue-50 border-blue-500 border-2 shadow-sm'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {orderMetadata.loadInDateTime}
                        {highlightedField === 'loadInDateTime' && (
                          <Tooltip
                            content="Copilot just updated this field"
                            relationship="label"
                          >
                            <Checkmark24Filled className="text-green-600 w-4 h-4" />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <label className="w-40 text-sm text-gray-700 pt-1">Technical Director</label>
                  <div className="flex-1">
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      {orderMetadata.technicalDirector}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Lines FastTab */}
        <Card className="mb-4 shadow-sm">
          <div className="bg-[#f3f2f1] border-b border-gray-300 px-4 py-2">
            <Text weight="semibold" className="text-sm">
              Lines
            </Text>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#faf9f8] border-b border-gray-300">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 w-20">Line No.</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 w-24">Type</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 w-32">No.</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 flex-1">Description</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 w-24">Quantity</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 w-20">Unit</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 w-28">Unit Price</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 w-24">Discount %</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 w-32">Line Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderLines.map((line, index) => {
                  const isHighlighted = isPremiumUpgrade && line.no === 'PX-800';
                  const isOriginalSpeaker = !isPremiumUpgrade && line.no === 'PX-500';

                  return (
                    <tr
                      key={line.lineNo}
                      className={`border-b border-gray-200 hover:bg-blue-50 ${
                        isHighlighted
                          ? 'bg-blue-50 border-l-4 border-l-blue-600'
                          : isOriginalSpeaker
                          ? 'bg-yellow-50'
                          : 'bg-white'
                      }`}
                    >
                      <td className="px-3 py-2 text-xs font-mono text-gray-600">{line.lineNo}</td>
                      <td className="px-3 py-2 text-xs text-gray-700">{line.type}</td>
                      <td className="px-3 py-2 text-xs font-mono text-blue-700">
                        <div className="flex items-center gap-2">
                          {line.no}
                          {isHighlighted && (
                            <Tooltip
                              content="AI upgraded this line item from ProSound PX-500 to PX-800 Premium speakers to address the supplier delivery delay. This ensures immediate availability for your event on Feb 15, 2026."
                              relationship="label"
                            >
                              <Info16Regular className="text-blue-600 cursor-help" />
                            </Tooltip>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900">{line.description}</td>
                      <td className="px-3 py-2 text-xs text-right font-mono text-gray-900">
                        {line.quantity.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-700">{line.unitOfMeasure}</td>
                      <td className="px-3 py-2 text-xs text-right font-mono text-gray-900">
                        ${line.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 text-xs text-right font-mono text-gray-900">
                        {line.lineDiscount > 0 ? `${line.lineDiscount}%` : '-'}
                      </td>
                      <td className="px-3 py-2 text-xs text-right font-mono font-semibold text-gray-900">
                        ${line.lineAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Invoice Details FastTab */}
        <Card className="mb-4 shadow-sm">
          <div className="bg-[#f3f2f1] border-b border-gray-300 px-4 py-2">
            <Text weight="semibold" className="text-sm">
              Invoice Details
            </Text>
          </div>
          <div className="p-4">
            <div className="flex justify-end">
              <div className="w-96 space-y-3">
                <div className="flex justify-between items-center">
                  <Text className="text-sm text-gray-700">Subtotal:</Text>
                  <Text className="text-sm font-mono font-semibold">
                    ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-sm text-gray-700">Invoice Discount:</Text>
                  <Text className="text-sm font-mono">$0.00</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-sm text-gray-700">Sales Tax (8.75%):</Text>
                  <Text className="text-sm font-mono">
                    ${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Text>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                  <Text className="text-base font-semibold text-gray-900">Total Amount:</Text>
                  <Text className="text-lg font-mono font-bold text-[#00bcf2]">
                    ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Status Bar */}
        <div className="bg-[#faf9f8] border border-gray-300 px-4 py-2 rounded flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>Status: Open</span>
            <span>•</span>
            <span>8 Lines</span>
            <span>•</span>
            <span>Last Modified: Feb 4, 2026 at 9:30 AM</span>
          </div>
          <span>Modified by: System User</span>
        </div>
        </div>

        {/* Factbox Panel */}
        <div className="w-80 flex-shrink-0 space-y-4">
          {/* Customer Statistics */}
          <Card className="shadow-sm">
            <div className="bg-[#00bcf2] text-white px-4 py-2 rounded-t-lg">
              <Text weight="semibold" className="text-sm text-white">Customer Statistics</Text>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Balance (LCY)</Text>
                <Text className="text-sm font-semibold text-right">$0.00</Text>
              </div>
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Outstanding Orders</Text>
                <Text className="text-sm font-semibold text-right">$190,165.69</Text>
              </div>
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Shipped Not Invoiced</Text>
                <Text className="text-sm font-semibold text-right">$0.00</Text>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-start">
                <Text className="text-xs text-gray-600">Total (LCY)</Text>
                <Text className="text-sm font-bold text-[#00bcf2]">$190,165.69</Text>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-start">
                <Text className="text-xs text-gray-600">Credit Limit (LCY)</Text>
                <Text className="text-sm font-semibold text-right">$500,000.00</Text>
              </div>
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Available Credit</Text>
                <Text className="text-sm font-semibold text-green-700">$309,834.31</Text>
              </div>
            </div>
          </Card>

          {/* Sales Order Statistics */}
          <Card className="shadow-sm">
            <div className="bg-[#00bcf2] text-white px-4 py-2">
              <Text weight="semibold" className="text-sm text-white">Sales Order Statistics</Text>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Amount</Text>
                <Text className="text-sm font-semibold text-right">$174,865.00</Text>
              </div>
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Invoice Discount</Text>
                <Text className="text-sm font-semibold text-right">$0.00</Text>
              </div>
              <div className="flex justify-between items-start">
                <Text className="text-xs text-gray-600">Total Excl. VAT</Text>
                <Text className="text-sm font-semibold text-right">$174,865.00</Text>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-start">
                <Text className="text-xs text-gray-600">Total Incl. VAT</Text>
                <Text className="text-sm font-bold text-[#00bcf2]">$190,165.69</Text>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-start mb-2">
                  <Text className="text-xs text-gray-600">No. of Lines</Text>
                  <Text className="text-sm font-semibold text-right">8</Text>
                </div>
                <div className="flex justify-between items-start">
                  <Text className="text-xs text-gray-600">No. of Items</Text>
                  <Text className="text-sm font-semibold text-right">71</Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Event Details */}
          <Card className="shadow-sm">
            <div className="bg-[#00bcf2] text-white px-4 py-2">
              <Text weight="semibold" className="text-sm text-white">Event Details</Text>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <Text className="text-xs text-gray-600 mb-1">Event Name</Text>
                <Text className="text-sm font-semibold">TechCon 2026 Summit</Text>
              </div>
              <div>
                <Text className="text-xs text-gray-600 mb-1">Event Date</Text>
                <Text className="text-sm font-semibold text-orange-700">Feb 15, 2026</Text>
              </div>
              <div>
                <Text className="text-xs text-gray-600 mb-1">Venue</Text>
                <Text className="text-sm">Convention Center Drive</Text>
              </div>
              <div>
                <Text className="text-xs text-gray-600 mb-1">Attendees</Text>
                <Text className="text-sm font-semibold">2,500 expected</Text>
              </div>
              <div>
                <Text className="text-xs text-gray-600 mb-1">Setup Date</Text>
                <Text className="text-sm">Feb 14, 2026</Text>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="shadow-sm">
            <div className="bg-[#00bcf2] text-white px-4 py-2">
              <Text weight="semibold" className="text-sm text-white">Notes</Text>
            </div>
            <div className="p-4">
              <Text className="text-xs text-gray-700 leading-relaxed">
                High-profile technology conference. Customer requested premium audio quality.
                Multiple breakout sessions require distributed speaker systems.
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
