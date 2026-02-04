import {
  affectedCustomers,
  alternateSuppliers,
  inventoryData,
  premiumProductCustomers,
  revenueImpactData,
  supplierComparisonData,
} from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock MCP service to simulate Dynamics 365, SharePoint, and Teams integrations
export const mockMCP = {
  // Query Dynamics 365 for affected event bookings
  async queryAffectedOrders(partNumber: string): Promise<typeof affectedCustomers> {
    await delay(1500);
    console.log(`[MCP] Querying Dynamics 365 for events affected by ${partNumber} equipment delay`);
    return affectedCustomers;
  },

  // Query for alternate audio equipment suppliers
  async queryAlternateSuppliers(partNumber: string): Promise<typeof alternateSuppliers> {
    await delay(1800);
    console.log(`[MCP] Searching audio equipment supplier network for ${partNumber} alternatives`);
    return alternateSuppliers;
  },

  // Get inventory status
  async getInventoryStatus(sku?: string): Promise<typeof inventoryData> {
    await delay(1200);
    console.log(`[MCP] Fetching inventory data from Dynamics 365`);
    if (sku) {
      return inventoryData.filter((item) => item.sku === sku);
    }
    return inventoryData;
  },

  // Get premium speaker upgrade options
  async getPremiumUpgradeOptions(): Promise<typeof premiumProductCustomers> {
    await delay(1600);
    console.log(`[MCP] Analyzing premium speaker upgrade eligibility for events`);
    return premiumProductCustomers;
  },

  // Calculate revenue impact
  async calculateRevenueImpact(customerIds: string[]): Promise<typeof revenueImpactData> {
    await delay(1400);
    console.log(`[MCP] Calculating revenue impact for ${customerIds.length} events`);
    return revenueImpactData;
  },

  // Get supplier comparison data
  async getSupplierComparison(partNumber: string): Promise<typeof supplierComparisonData> {
    await delay(1300);
    console.log(`[MCP] Comparing supplier options for ${partNumber}`);
    return supplierComparisonData;
  },

  // Generate draft email
  async generateDraftEmail(customerId: string, context: any): Promise<string> {
    await delay(2000);
    console.log(`[MCP] Generating personalized email for ${customerId}`);

    const customer = affectedCustomers.find((c) => c.id === customerId);
    if (!customer) return 'Error: Event not found';

    return `Subject: Important Update - ${customer.name} Audio Equipment

Dear ${customer.name} Event Coordinator,

I wanted to reach out personally regarding your audio equipment booking for ${customer.quantity} ProSound PX-500 speakers (Booking #${customer.orderNumber}).

Due to an East Coast snowstorm affecting our supplier's distribution network, we're offering you an exclusive upgrade to our ProSound PX-800 Premium speaker systems at a reduced additional cost. These premium speakers offer:

✓ Immediate availability - your event will not be delayed
✓ Superior sound quality with extended coverage range
✓ Professional-grade features and controls
✓ Extended warranty and priority technical support

We understand how critical audio quality is for your event, and we want to ensure everything runs flawlessly. I'm available to discuss this upgrade or explore other solutions that work best for your event needs.

Please let me know your preference, and I'll expedite all necessary arrangements.

Best regards,
Your Event Production Manager`;
  },

  // Simulate approval workflow
  async submitApproval(action: string, data: any): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    console.log(`[MCP] Submitting approval for action: ${action}`);
    return {
      success: true,
      message: `Approval submitted successfully. ${action} has been queued for processing.`,
    };
  },

  // Check team availability (mock Teams integration)
  async checkTeamAvailability(teamMember: string): Promise<{ available: boolean; status: string }> {
    await delay(800);
    console.log(`[MCP] Checking Teams availability for ${teamMember}`);
    return {
      available: true,
      status: 'Available - In a meeting until 3:00 PM',
    };
  },
};

export type MockMCP = typeof mockMCP;
