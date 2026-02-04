import { Email, Customer, Supplier, InventoryItem, Suggestion } from './types';

export const supplierEmail: Email = {
  id: 'email-001',
  from: 'orders@soundwavepro.com',
  subject: 'URGENT: Delivery Delay - Order #SW-2847',
  body: `Dear Events Team,

We regret to inform you that due to a severe snowstorm impacting the East Coast, there will be a 1-week delay in delivering the portable speaker systems for Order #SW-2847.

Affected Equipment: ProSound PX-500 Portable Speaker Systems
Original Delivery Date: February 10, 2026
Revised Delivery Date: February 17, 2026

The snowstorm has caused significant disruptions to our distribution network, and our warehouse facility in New Jersey has been temporarily closed due to unsafe road conditions.

We understand this may impact your upcoming event schedule and are committed to working with you to find alternative solutions.

Please contact us immediately if you need to discuss expedited shipping options or alternative arrangements.

Best regards,
SoundWave Pro Audio`,
  date: '2026-02-04T09:30:00Z',
  importance: 'high',
  read: false,
};

export const inboxEmails: Email[] = [
  supplierEmail,
  {
    id: 'email-002',
    from: 'sarah.chen@contoso.com',
    subject: 'RE: Q1 Sales Meeting - Agenda Items',
    body: `Hi Team,

Thanks for the agenda. I'd like to add a discussion point about the new CRM integration timeline.

See you tomorrow!
Sarah`,
    date: '2026-02-04T08:15:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-003',
    from: 'notifications@dynamics.com',
    subject: 'Daily Inventory Report - February 4, 2026',
    body: `Your daily inventory summary is ready.

Low stock items: 3
Out of stock items: 1
Orders pending: 12

View full report in Dynamics 365.`,
    date: '2026-02-04T07:00:00Z',
    importance: 'low',
    read: true,
  },
  {
    id: 'email-004',
    from: 'john.martinez@fabrikam.com',
    subject: 'Order Confirmation - ORD-8834',
    body: `Dear Partner,

Thank you for your order ORD-8834. We confirm receipt and will process it according to the agreed timeline.

Expected delivery: February 25, 2026

Best regards,
John Martinez
Fabrikam Industries`,
    date: '2026-02-03T16:45:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-005',
    from: 'hr@company.com',
    subject: 'Reminder: Annual Training Compliance Due Feb 15',
    body: `Hello,

This is a friendly reminder that your annual compliance training is due by February 15, 2026.

Please complete the modules in the learning portal.

Thank you,
HR Team`,
    date: '2026-02-03T14:30:00Z',
    importance: 'low',
    read: true,
  },
  {
    id: 'email-006',
    from: 'lisa.wong@northwindtraders.com',
    subject: 'Partnership Opportunity - Q2 2026',
    body: `Hi,

I hope this email finds you well. I wanted to reach out about a potential partnership opportunity for Q2.

Would you be available for a call next week?

Best,
Lisa Wong
Northwind Traders`,
    date: '2026-02-03T11:20:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-007',
    from: 'noreply@office365.com',
    subject: 'Your weekly digest - 7 updates',
    body: `Here's what happened in your organization this week:

• 3 new documents in SharePoint
• 2 team meetings scheduled
• 5 tasks assigned to you

View details in Microsoft 365.`,
    date: '2026-02-03T09:00:00Z',
    importance: 'low',
    read: true,
  },
];

export const affectedCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'TechCon 2026 Summit',
    orderNumber: 'EVT-2201',
    product: 'ProSound PX-500 Speakers',
    quantity: 50,
    dueDate: '2026-02-15',
    revenue: '$125,000',
    priority: 'high',
  },
  {
    id: 'CUST-002',
    name: 'City Music Festival',
    orderNumber: 'EVT-2215',
    product: 'ProSound PX-500 Speakers',
    quantity: 30,
    dueDate: '2026-02-18',
    revenue: '$62,500',
    priority: 'medium',
  },
  {
    id: 'CUST-003',
    name: 'Corporate Awards Gala',
    orderNumber: 'EVT-2228',
    product: 'ProSound PX-500 Speakers',
    quantity: 20,
    dueDate: '2026-02-22',
    revenue: '$37,500',
    priority: 'low',
  },
];

export const alternateSuppliers: Supplier[] = [
  {
    id: 'SUP-101',
    name: 'AudioPro Express',
    leadTime: '3 days',
    pricePerUnit: '$2,750',
    reliability: '98%',
    certified: true,
  },
  {
    id: 'SUP-102',
    name: 'West Coast Sound Systems',
    leadTime: '4 days',
    pricePerUnit: '$2,600',
    reliability: '95%',
    certified: true,
  },
  {
    id: 'SUP-103',
    name: 'QuickShip Audio Rentals',
    leadTime: '5 days',
    pricePerUnit: '$2,450',
    reliability: '92%',
    certified: false,
  },
];

export const inventoryData: InventoryItem[] = [
  {
    id: 'INV-001',
    sku: 'PX-500',
    name: 'ProSound PX-500 Speakers',
    currentStock: 15,
    reorderPoint: 50,
    status: 'low',
  },
  {
    id: 'INV-002',
    sku: 'PX-800',
    name: 'ProSound PX-800 Premium Speakers',
    currentStock: 65,
    reorderPoint: 30,
    status: 'in-stock',
  },
  {
    id: 'INV-003',
    sku: 'PX-500-RENTAL',
    name: 'ProSound PX-500 (Rental Stock)',
    currentStock: 0,
    reorderPoint: 100,
    status: 'out-of-stock',
  },
];

export const premiumProductCustomers = [
  {
    id: 'CUST-001',
    name: 'TechCon 2026 Summit',
    currentProduct: 'ProSound PX-500 Speakers',
    upgradeProduct: 'ProSound PX-800 Premium Speakers',
    additionalCost: '$18,000',
    savings: 'Immediate availability, superior sound quality',
    eligible: true,
  },
  {
    id: 'CUST-002',
    name: 'City Music Festival',
    currentProduct: 'ProSound PX-500 Speakers',
    upgradeProduct: 'ProSound PX-800 Premium Speakers',
    additionalCost: '$11,000',
    savings: 'Immediate availability, superior sound quality',
    eligible: true,
  },
];

export const initialSuggestions: Suggestion[] = [
  {
    id: 'sug-001',
    title: 'Find alternate suppliers',
    description: 'Search for audio equipment suppliers with faster delivery for PX-500 speakers',
    confidence: 0.92,
    icon: 'Search',
  },
  {
    id: 'sug-002',
    title: 'Identify affected events',
    description: 'Analyze event bookings impacted by the 1-week speaker delay',
    confidence: 0.95,
    icon: 'TaskList',
  },
  {
    id: 'sug-003',
    title: 'Premium speaker upgrade',
    description: 'Offer clients upgrade to PX-800 Premium speakers with immediate availability',
    confidence: 0.87,
    icon: 'ArrowUpload',
  },
  {
    id: 'sug-004',
    title: 'Client notifications',
    description: 'Draft personalized delay notices for affected event clients',
    confidence: 0.90,
    icon: 'Mail',
  },
];

export const revenueImpactData = [
  { customer: 'TechCon Summit', revenue: 125000, status: 'At Risk' },
  { customer: 'Music Festival', revenue: 62500, status: 'At Risk' },
  { customer: 'Awards Gala', revenue: 37500, status: 'Low Risk' },
];

export const supplierComparisonData = [
  { supplier: 'AudioPro Express', leadTime: 3, price: 2750, reliability: 98 },
  { supplier: 'West Coast Sound', leadTime: 4, price: 2600, reliability: 95 },
  { supplier: 'QuickShip Audio', leadTime: 5, price: 2450, reliability: 92 },
  { supplier: 'SoundWave Pro', leadTime: 7, price: 2400, reliability: 85 },
];
