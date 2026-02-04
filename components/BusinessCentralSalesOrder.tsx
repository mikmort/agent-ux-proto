'use client';

import { Card, Button, Text, Badge } from '@fluentui/react-components';
import {
  ArrowSync24Regular,
  Print24Regular,
  Mail24Regular,
  MoreHorizontal24Regular,
  CheckmarkCircle24Regular,
  Sparkle24Regular,
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
}

export default function BusinessCentralSalesOrder({ onAskCopilot }: SalesOrderProps) {
  const orderLines: SalesOrderLine[] = [
    {
      lineNo: 10000,
      type: 'Item',
      no: 'PX-500',
      description: 'ProSound PX-500 Portable Speaker System',
      quantity: 50,
      unitOfMeasure: 'EA',
      unitPrice: 2500.0,
      lineDiscount: 0,
      lineAmount: 125000.0,
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
      {/* Business Central Header Bar */}
      <div className="bg-[#0078d4] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Text className="text-white font-semibold text-lg">Dynamics 365 Business Central</Text>
          <Text className="text-white opacity-80">|</Text>
          <Text className="text-white opacity-90">Sales Orders</Text>
        </div>
        <div className="flex items-center gap-2">
          <Text className="text-white text-sm">Premier Events Production</Text>
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
          <Button appearance="primary" icon={<Sparkle24Regular />} onClick={onAskCopilot} size="small">
            Ask Copilot
          </Button>
          <div className="flex-1" />
          <Button appearance="subtle" icon={<MoreHorizontal24Regular />} size="small">
            More
          </Button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6">
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
                    <div className="text-sm bg-white border border-gray-300 px-2 py-1 rounded">
                      DELIVERY
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
                {orderLines.map((line, index) => (
                  <tr
                    key={line.lineNo}
                    className={`border-b border-gray-200 hover:bg-blue-50 ${
                      line.no === 'PX-500' ? 'bg-yellow-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-3 py-2 text-xs font-mono text-gray-600">{line.lineNo}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">{line.type}</td>
                    <td className="px-3 py-2 text-xs font-mono text-blue-700">{line.no}</td>
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
                ))}
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
                  <Text className="text-lg font-mono font-bold text-[#0078d4]">
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
    </div>
  );
}
