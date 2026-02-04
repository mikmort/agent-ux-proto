// Core types for the Agentic UX Prototype

export interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  importance: 'high' | 'medium' | 'low';
  read: boolean;
}

export interface Customer {
  id: string;
  name: string;
  orderNumber: string;
  product: string;
  quantity: number;
  dueDate: string;
  revenue: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Supplier {
  id: string;
  name: string;
  leadTime: string;
  pricePerUnit: string;
  reliability: string;
  certified: boolean;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
  reorderPoint: number;
  status: 'in-stock' | 'low' | 'out-of-stock';
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  confidence: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  dynamicContent?: DynamicContent;
  streaming?: boolean;
}

export type DynamicContent =
  | { type: 'table'; data: TableData }
  | { type: 'chart'; data: ChartData }
  | { type: 'actions'; data: ActionData }
  | { type: 'form'; data: FormData };

export interface TableData {
  columns: { key: string; label: string; width?: number }[];
  rows: Record<string, any>[];
  highlightRows?: string[]; // row IDs to highlight
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: { [key: string]: any }[];
  xAxisKey?: string;
  yAxisKey?: string;
}

export interface ActionData {
  actions: {
    id: string;
    label: string;
    variant: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
  }[];
}

export interface FormData {
  fields: {
    id: string;
    type: 'text' | 'date' | 'select' | 'number';
    label: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
    required?: boolean;
  }[];
  submitLabel: string;
}

export interface DemoState {
  stage: 'salesOrder' | 'email' | 'suggestions' | 'chat';
  conversationStep: number;
}
