import { PALETTE } from "@/constant";
import { AttrInfoType, ExpenseObjType, FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
import type { ChartData } from "chart.js";

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

export async function getChartData(
    expenses: ExpenseObjType[],
    selected: FilterAttrType
): Promise<ChartData<"pie", number[], unknown>> {
    const labels: string[] = [];
    const colors: string[] = [];
    const data: number[] = [];

    // Process the expenses based on the selected attribute
    Object.values(await getAttrwiseInfo(expenses, selected)).forEach(
        ({ amount, color, label }) => {
            labels.push(label);
            colors.push(color);
            data.push(amount);
        }
    );

    // Return chart data in the required format
    return {
        labels,
        datasets: [
            {
                label: "Total Expenses",
                backgroundColor: colors,
                borderColor: "black",
                data,
                hoverOffset: 50,
            },
        ],
    };
}

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

export const getAttrwiseInfo = async (expenses: ExpenseObjType[], attr: keyof typeof PALETTE = 'category') => expenses.reduce(
    (expense, { total_amount, ...rest }) => {
        const attrValue = rest[attr];
        if (expense[attrValue]) {
            expense[attrValue].amount += +total_amount;
        } else {
            expense[attrValue] = {
                amount: +total_amount,

                color: PALETTE[attr][attrValue as keyof typeof PALETTE[typeof attr]],
                label: toTitleCase(attrValue),
            };
        }
        return expense;
    },
    {} as Record<string, AttrInfoType>
)

