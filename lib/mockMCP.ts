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
  // Query Dynamics 365 for affected customer orders
  async queryAffectedOrders(partNumber: string): Promise<typeof affectedCustomers> {
    await delay(1500);
    console.log(`[MCP] Querying Dynamics 365 for orders affected by ${partNumber}`);
    return affectedCustomers;
  },

  // Query for alternate suppliers
  async queryAlternateSuppliers(partNumber: string): Promise<typeof alternateSuppliers> {
    await delay(1800);
    console.log(`[MCP] Searching supplier database for ${partNumber} alternatives`);
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

  // Get premium product upgrade options
  async getPremiumUpgradeOptions(): Promise<typeof premiumProductCustomers> {
    await delay(1600);
    console.log(`[MCP] Analyzing premium product upgrade eligibility`);
    return premiumProductCustomers;
  },

  // Calculate revenue impact
  async calculateRevenueImpact(customerIds: string[]): Promise<typeof revenueImpactData> {
    await delay(1400);
    console.log(`[MCP] Calculating revenue impact for ${customerIds.length} customers`);
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
    if (!customer) return 'Error: Customer not found';

    return `Subject: Important Update on Your Order ${customer.orderNumber}

Dear ${customer.name} Team,

I wanted to reach out personally regarding your order for ${customer.quantity} units of ${customer.product} (Order #${customer.orderNumber}).

Due to a supply chain delay with a critical component, we're offering you an exclusive upgrade to our Premium A200 model at a reduced additional cost. This upgraded product:

✓ Is available for immediate shipment
✓ Exceeds the specifications of the original A100 model
✓ Comes with extended warranty coverage

We value your partnership and want to ensure zero disruption to your operations. I'm available to discuss this upgrade or explore other options that work best for your needs.

Please let me know your preference, and I'll expedite the necessary arrangements.

Best regards,
Your Account Manager`;
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
