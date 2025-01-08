export type ExpType = 'expense' | 'income';

export interface ExpenseObjType {
  category: string;
  total_amount: number;
  image_url?: string | null
  bill_date: string;
  created_by: string;
  payment_mode: string;
  account: string;
  description: string;
  merchant: string;
  type: ExpType;
  id: string;
}

export type FilterAttrType = 'category' | 'payment_mode' | 'account';

export type ChartData = { amount: number; color: string; label: string, total?: number };

