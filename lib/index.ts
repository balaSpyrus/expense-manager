import { PALETTE } from "@/constant";
import { ChartData, ExpenseObjType, FilterAttrType } from "@/types";

// lib/filterExpenses.ts
export const filterExpenses = async (
    expenses: ExpenseObjType[],
    filterConfig: { [key in FilterAttrType]?: string }
): Promise<ExpenseObjType[]> => expenses.filter(({ payment_mode, category }) => {
    return (
        (filterConfig.category === "" || filterConfig.category === category) &&
        (filterConfig.payment_mode === "" || filterConfig.payment_mode === payment_mode)
    );
});


// lib/fetchExpenses.ts
export async function fetchExpenses(startIndex: number, stopIndex: number): Promise<ExpenseObjType[]> {
    // Simulate fetching from an API or database
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // Return a slice of data (this would typically be fetched dynamically)
    const expenses: ExpenseObjType[] = []; // Replace with actual data source
    for (let i = startIndex; i <= stopIndex; i++) {
        expenses.push({
            id: `${i}`,
            category: `Category ${i}`,
            payment_mode: "Credit Card",
            account: `Account ${i}`,
            total_amount: i * 10,
            bill_date: new Date().toISOString(),
            created_by: "Simulated Data",
            merchant: `Merchant ${i}`,
            type: Math.random() > 0.5 ? "expense" : "income",
            description: "#f0f0f0", // Example color
        });
    }

    return expenses;
}

export const getChartData = async (expenses: ExpenseObjType[], attr: keyof typeof PALETTE = 'category') => {


    const chartData = expenses.reduce((acc, curr) => {
        const key = curr[attr];
        const existingItem = acc.find((item) => item.label === key);
        if (existingItem) {
            existingItem.amount += curr.total_amount;
        } else {
            acc.push({
                label: key,
                amount: curr.total_amount,
                color: PALETTE[attr][key as keyof typeof PALETTE[typeof attr]],
            });
        }
        return acc;
    }, [] as ChartData[]);

    const total = chartData.reduce((sum, item) => sum + item.amount, 0);
    chartData.forEach((item) => (item.total = total));

    return chartData;
}


