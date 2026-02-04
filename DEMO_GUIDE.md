# Demo Guide - Agentic UX Prototype

## Quick Start

1. Open http://localhost:3000
2. Follow the natural flow: Email → Suggestions → Chat

## Demo Script

### Introduction (30 seconds)
"This prototype demonstrates how AI can assist business users with complex decisions. Today, we'll see how an AI assistant helps handle a supplier delay that could impact multiple customers."

### Stage 1: Email View (1 minute)
**What to show:**
- Point out the unread email with HIGH priority tag
- Read the key details: 3-week delay on part XYZ-789
- Highlight the "Ask Copilot for Help" button (it pulses to draw attention)

**What to say:**
"Instead of manually figuring out the impact, we can ask our AI assistant to help analyze the situation."

**Action:** Click "Ask Copilot for Help"

### Stage 2: AI Suggestions (1-2 minutes)
**What to show:**
- Watch the loading spinner (simulates AI thinking)
- Point out the 4 suggestion cards with confidence scores
- Highlight how each suggestion addresses a different aspect

**What to say:**
"The AI has quickly analyzed the email and generated several actionable suggestions:
- Finding alternate suppliers
- Identifying affected orders
- Exploring upgrade options
- Preparing customer notifications

Each suggestion shows a confidence score based on the AI's analysis."

**Action:** Click "Start Chat with Copilot"

### Stage 3: Interactive Chat - Initial Analysis (2 minutes)
**What to show:**
- Watch messages stream in character-by-character
- Point out the **data table** showing affected customers
- Highlight the rows in red (high priority customers)
- Show the **revenue impact chart** ($225,000 at risk)
- Point out the three action buttons

**What to say:**
"The AI immediately provides context with:
1. A table of affected customers with order details
2. Visual representation of revenue at risk
3. Clear next actions I can take

This is much faster than manually checking our ERP system."

### Stage 4: Finding Alternate Suppliers (2-3 minutes)
**Action:** Click "Find Alternate Suppliers"

**What to show:**
- Watch the typing indicator (AI is "querying" Dynamics 365)
- Point out the supplier comparison table
- Highlight key metrics: lead time, pricing, reliability
- Show the comparison chart
- Notice Premium Parts Co. has 5-day lead time vs. 21 days

**What to say:**
"The AI searched our supplier database and found three alternatives. It presents them in both table and chart form, making it easy to compare options. Premium Parts Co. offers the fastest delivery with high reliability."

### Stage 5: Premium Product Upgrade (2-3 minutes)
**Action:** Click "Explore Premium Upgrade Instead"

**What to show:**
- Another "thinking" indicator
- Upgrade eligibility table
- Point out additional costs and benefits
- Show the two approval buttons

**What to say:**
"Here's where it gets interesting. Instead of waiting for new suppliers, the AI suggests upgrading customers to our premium product that's already in stock. It shows:
- Which customers are eligible
- Additional costs (relatively small)
- Benefits: no delay, better specs, extended warranty

This is a win-win solution the AI discovered by analyzing our inventory."

### Stage 6: Email Generation (1-2 minutes)
**Action:** Click "Approve for Contoso Manufacturing"

**What to show:**
- AI generates a personalized email
- Point out how it includes:
  - Customer-specific details (order number, quantity)
  - Professional tone
  - Clear value proposition
  - Call to action
- Show send/edit options

**What to say:**
"The AI doesn't just suggest actions—it can execute them. It's generated a personalized email that:
- References the specific order
- Explains the premium upgrade benefits
- Maintains a professional, helpful tone
- Is ready to send or edit as needed

This level of automation saves significant time while maintaining quality."

### Conclusion (30 seconds)
**Action:** Click "Reset Demo" to show the cycle

**What to say:**
"This demo shows how AI can be embedded throughout business workflows:
- Proactive analysis of incoming information
- Dynamic UI that adapts to the conversation
- Integration with enterprise systems (ERP, email, etc.)
- Context-aware suggestions and actions

The key is making AI feel like a natural assistant, not a separate tool."

## Key Features to Highlight

### 1. Dynamic Content Injection
"Notice how the chat doesn't just show text—it injects tables, charts, and action buttons contextually."

### 2. Streaming Responses
"Messages appear character-by-character, giving natural feedback that the AI is working."

### 3. Simulated System Integration
"The delays you see are simulating real API calls to Dynamics 365, SharePoint, and other systems."

### 4. Progressive Disclosure
"Information is revealed progressively as needed, not all at once. This reduces cognitive load."

### 5. Action-Oriented
"Every insight leads to a clear action. The AI doesn't just inform—it enables decisions."

## Audience-Specific Talking Points

### For Business Users
- Focus on time savings and decision quality
- Emphasize the reduction in manual work
- Highlight the revenue protection ($225K at risk)

### For Technical Audiences
- Point out the architecture (Next.js, Fluent UI, TypeScript)
- Discuss the mock MCP layer and how it could integrate with real systems
- Explain the streaming message implementation
- Show the dynamic component injection pattern

### For UX/Design Audiences
- Highlight the progressive disclosure pattern
- Discuss the balance of automation vs. control
- Point out the consistent use of Fluent UI patterns
- Explain the visual hierarchy (color, spacing, emphasis)

### For Executives
- Focus on business outcomes (speed to decision, revenue protection)
- Emphasize scalability (same pattern for many scenarios)
- Discuss ROI: automated analysis + communication = time savings
- Show confidence scores building trust in AI suggestions

## Common Questions & Answers

**Q: Is this using real AI?**
A: The conversation flow is scripted for demo purposes, but it demonstrates patterns that real AI systems would use. The UI components and interaction patterns are production-ready.

**Q: Can this integrate with our systems?**
A: Yes, the mock MCP layer shows where real integrations would plug in. We'd connect to your Dynamics 365, SAP, or other ERP systems via APIs.

**Q: What if the AI makes a mistake?**
A: Notice the AI suggests actions but doesn't take them automatically. Approvals are required for critical steps. Users maintain control.

**Q: How long would this take to build for real?**
A: The UI framework is here. The main work is:
1. Real AI integration (LLM fine-tuning)
2. System connectors (ERP, email, etc.)
3. Security & compliance
4. Additional scenarios beyond this one

**Q: Can users type their own questions?**
A: This demo focuses on guided actions, but yes—a production version would support natural language queries. The input box is there but guided actions ensure better outcomes.

## Tips for a Smooth Demo

1. **Pre-load the page** before presenting to avoid startup delays
2. **Clear your browser cache** if you've run it multiple times
3. **Use a large screen** so tables and charts are clearly visible
4. **Talk while waiting** for streaming/loading effects
5. **Have the reset button ready** to quickly restart if needed
6. **Practice the timing** so you don't rush through insights

## Technical Notes

- Development server must be running: `npm run dev`
- Best viewed in Chrome/Edge (Fluent UI optimized for these)
- Designed for 1920x1080 or higher resolution
- All data persists only in browser memory (no backend)
- Safe to demo offline once page loads initially

## Troubleshooting

**Page won't load:**
- Check that dev server is running on port 3000
- Look for compilation errors in terminal

**Styles look broken:**
- Hard refresh (Ctrl+Shift+R)
- Check that all dependencies installed (`npm install`)

**Charts not appearing:**
- Ensure Recharts is installed
- Check browser console for errors

**Streaming feels too slow/fast:**
- Edit character delay in `CopilotChat.tsx` (line ~30)
- Edit MCP delays in `lib/mockMCP.ts`
