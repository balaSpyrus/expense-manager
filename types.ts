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

export type TimePeriod = "this_day" | "this_week" | "this_month" | "this_year";
export type FilterAttrType = 'category' | 'payment_mode' | 'account';

export type ChartData = { amount: number; color: string; label: string, total?: number };

export interface TopExpenseCategory {
  category_name: string;
  category_id: number;
  percentage: number;
}

export interface SummaryData {
  income: number;
  expense: number;
  top_expense_category: TopExpenseCategory[];
}

export type SummaryType = {
  [key in TimePeriod]: SummaryData
}

