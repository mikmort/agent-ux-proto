# Agentic UX Prototype

A Next.js prototype demonstrating modern agentic AI UX for business scenarios. This demo shows how AI can assist with complex business decisions through an interactive chat interface.

## Demo Scenario

A supplier sends an email about a 3-week delay on a critical component. The demo walks through:

1. **Email Viewing**: See the supplier delay notification
2. **AI Suggestions**: Get AI-powered recommendations for handling the situation
3. **Interactive Chat**: Work with an AI assistant to:
   - Analyze affected customer orders and revenue impact
   - Find alternate suppliers with faster lead times
   - Explore premium product upgrades for customers
   - Generate personalized customer communications

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Microsoft Fluent UI React v9
- **Charts**: Recharts
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Fluent UI theming

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Flow

### Stage 1: Email Viewer
- View an unread supplier delay email
- Click "Ask Copilot for Help" to get AI assistance

### Stage 2: AI Suggestions
- See 4 AI-generated suggestions with confidence scores
- Each suggestion addresses a different aspect of the problem
- Click "Start Chat with Copilot" to dive deeper

### Stage 3: Interactive Chat
The chat demonstrates several key UX patterns:

1. **Automatic Analysis**: AI immediately analyzes the situation and shows:
   - Table of affected customers
   - Revenue impact chart
   - Action buttons for next steps

2. **Find Alternate Suppliers**:
   - AI searches supplier database
   - Shows comparison table with lead times, pricing, reliability
   - Visualizes supplier comparison in a chart

3. **Premium Product Upgrade**:
   - AI analyzes which customers can upgrade to in-stock premium product
   - Shows upgrade eligibility and costs
   - Generate approval buttons per customer

4. **Email Generation**:
   - AI drafts personalized customer communications
   - Shows email preview
   - Offers send or edit options

## Key Features

### Dynamic Content Injection
The chat can inject various UI components:
- **Tables**: Customer orders, supplier data, inventory
- **Charts**: Bar charts, line charts for data visualization
- **Action Buttons**: Contextual actions that advance the scenario
- **Forms**: Dynamic input forms for user data entry

### Mock MCP Integration
Simulates Microsoft Cloud for Partners (MCP) integrations:
- Dynamics 365 ERP queries
- SharePoint document access
- Teams availability checks
- Realistic network delays (1-2 seconds)

### Streaming Responses
AI messages stream character-by-character for a natural feel.

### Responsive Design
Optimized for desktop viewing with clean, professional design.

## Project Structure

```
agent-ux-proto/
├── app/
│   ├── layout.tsx           # Root layout with Fluent UI provider
│   ├── page.tsx             # Main demo orchestrator
│   └── globals.css          # Global styles
├── components/
│   ├── EmailViewer.tsx      # Email inbox interface
│   ├── CopilotSuggestions.tsx  # AI suggestion cards
│   ├── CopilotChat.tsx      # Main chat interface
│   ├── ChatMessage.tsx      # Individual message component
│   └── dynamic/
│       ├── DataTable.tsx    # Dynamic table renderer
│       ├── ChartView.tsx    # Chart components
│       ├── ActionButtons.tsx # Action button groups
│       └── InputForm.tsx    # Dynamic form inputs
├── lib/
│   ├── mockMCP.ts          # Simulated MCP service layer
│   ├── mockData.ts         # All fixture data
│   └── types.ts            # TypeScript interfaces
└── public/
    └── data/               # (Optional) JSON fixtures
```

## Customization

### Adding New Scenarios
Edit `components/CopilotChat.tsx` to add new conversation branches in the `handleActionClick` function.

### Modifying Mock Data
Update `lib/mockData.ts` to change customer information, suppliers, products, etc.

### Adjusting MCP Delays
Modify delay times in `lib/mockMCP.ts` to make the demo faster or slower.

### Styling
- Fluent UI theme: Edit the theme in `app/layout.tsx`
- Custom styles: Add to `app/globals.css`
- Component styles: Use Tailwind classes in components

## Reset Demo
Click the "Reset Demo" button in the chat header to return to the email view and start over.

## Notes

- All data is mocked - no real API calls
- MCP integration is simulated with realistic delays
- Conversation flow is scripted, not true AI
- Focus is on UX patterns, not actual AI implementation
- Optimized for demonstration purposes

## Future Enhancements

Potential additions:
- More business scenarios (inventory management, sales forecasting)
- Multi-step approval workflows
- Real-time collaboration features
- Voice interface integration
- Mobile responsive design
- Accessibility improvements

## License

MIT
