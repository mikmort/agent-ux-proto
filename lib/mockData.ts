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
  {
    id: 'email-008',
    from: 'michael.brown@adventureworks.com',
    subject: 'Budget Approval Request - Marketing Campaign Q1',
    body: `Hi,

I'm requesting approval for the Q1 marketing campaign budget of $45,000.

Key allocations:
- Digital advertising: $20,000
- Content creation: $15,000
- Events and sponsorships: $10,000

Please review the attached proposal and let me know if you have any questions.

Best regards,
Michael Brown
Marketing Director`,
    date: '2026-02-02T15:30:00Z',
    importance: 'high',
    read: true,
  },
  {
    id: 'email-009',
    from: 'emily.johnson@tailspintoys.com',
    subject: 'Thank you for the demo!',
    body: `Hello,

Thank you for the excellent product demonstration yesterday. Our team was very impressed with the features and capabilities.

We'd like to schedule a follow-up meeting to discuss implementation details and pricing.

Are you available next Tuesday or Wednesday?

Best,
Emily Johnson
Tailspin Toys`,
    date: '2026-02-02T13:20:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-010',
    from: 'finance@company.com',
    subject: 'Expense Report Submitted - Awaiting Approval',
    body: `Your expense report for January 2026 has been submitted and is pending approval.

Total amount: $1,247.85

You can track the status in the Finance Portal.

Thank you,
Finance Team`,
    date: '2026-02-02T10:45:00Z',
    importance: 'low',
    read: true,
  },
  {
    id: 'email-011',
    from: 'david.kim@wideworldimporters.com',
    subject: 'RE: Contract Renewal Discussion',
    body: `Hi,

Following up on our contract renewal discussion from last week. We're ready to move forward with the 3-year renewal option.

Can you send over the updated contract documents?

Thanks,
David Kim
Wide World Importers`,
    date: '2026-02-01T16:00:00Z',
    importance: 'high',
    read: true,
  },
  {
    id: 'email-012',
    from: 'noreply@teams.microsoft.com',
    subject: 'You have been added to "Project Phoenix" team',
    body: `You've been added to the Project Phoenix team in Microsoft Teams.

Team owner: Sarah Chen
Members: 12

Visit the team to see shared files, conversations, and more.`,
    date: '2026-02-01T14:15:00Z',
    importance: 'low',
    read: true,
  },
  {
    id: 'email-013',
    from: 'rachel.green@proseware.com',
    subject: 'Product Demo Scheduled - February 10th',
    body: `Hello,

This is to confirm our product demonstration scheduled for:

Date: February 10, 2026
Time: 2:00 PM - 3:30 PM (EST)
Location: Virtual (Teams link to follow)

Looking forward to showing you our latest features!

Best regards,
Rachel Green
Proseware Inc.`,
    date: '2026-02-01T11:30:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-014',
    from: 'it-helpdesk@company.com',
    subject: 'System Maintenance - This Sunday',
    body: `Dear Team,

We will be performing scheduled system maintenance this Sunday, February 8th from 2:00 AM to 6:00 AM EST.

The following systems will be unavailable:
- Email (Outlook Web Access)
- Dynamics 365
- SharePoint Online

Please plan accordingly. We apologize for any inconvenience.

IT Helpdesk`,
    date: '2026-01-31T17:00:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-015',
    from: 'jennifer.lopez@lucernepublishing.com',
    subject: 'Invoice #INV-2026-0234',
    body: `Dear Accounting,

Please find attached invoice #INV-2026-0234 for services rendered in January 2026.

Amount due: $12,500.00
Due date: February 28, 2026

Payment can be made via wire transfer or check.

Thank you,
Jennifer Lopez
Lucerne Publishing`,
    date: '2026-01-31T14:20:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-016',
    from: 'newsletter@techinsights.com',
    subject: 'Tech Insights Weekly - AI Trends & Cloud Computing',
    body: `This week in technology:

📱 AI Integration in Enterprise Software
☁️ Cloud Cost Optimization Strategies
🔒 Cybersecurity Best Practices 2026
🚀 Emerging Technologies to Watch

Read the full newsletter →`,
    date: '2026-01-31T09:00:00Z',
    importance: 'low',
    read: true,
  },
  {
    id: 'email-017',
    from: 'alex.morgan@blueyonderairlines.com',
    subject: 'Travel Itinerary - Chicago Trip',
    body: `Your travel arrangements have been confirmed:

Flight: Blue Yonder Airlines #BY-1523
Date: February 15, 2026
Departure: 7:45 AM (JFK) → Arrival: 9:30 AM (ORD)

Hotel: Chicago Marriott Downtown
Check-in: February 15 | Check-out: February 17

Have a great trip!`,
    date: '2026-01-30T16:30:00Z',
    importance: 'medium',
    read: true,
  },
  {
    id: 'email-018',
    from: 'robert.williams@wingtiptoys.com',
    subject: 'Quarterly Business Review - Action Items',
    body: `Team,

Thank you for a productive QBR session yesterday. Here are the key action items:

1. Complete competitive analysis by Feb 10
2. Update pricing strategy document
3. Schedule customer advisory board meeting
4. Review product roadmap priorities

Please update the tracker as you complete these items.

Robert Williams
VP of Sales`,
    date: '2026-01-30T13:45:00Z',
    importance: 'high',
    read: true,
  },
  {
    id: 'email-019',
    from: 'amanda.clark@fourthcoffee.com',
    subject: 'Catering for Office Event - February 20',
    body: `Hi,

Thank you for choosing Fourth Coffee for your office event catering!

Order Summary:
- Gourmet coffee service for 50 people
- Pastry assortment
- Lunch buffet setup

Delivery time: February 20, 11:00 AM

Looking forward to serving you!

Amanda Clark
Fourth Coffee Catering`,
    date: '2026-01-30T10:15:00Z',
    importance: 'low',
    read: true,
  },
  {
    id: 'email-020',
    from: 'security@company.com',
    subject: 'Security Alert: Password Expiration',
    body: `Your password will expire in 7 days.

Please change your password before February 11, 2026 to avoid account lockout.

To change your password, visit the IT Portal.

Security Team`,
    date: '2026-01-29T16:00:00Z',
    importance: 'medium',
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
