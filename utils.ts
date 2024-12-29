import { PALETTE } from "./constant";
import { AttrInfoType, ExpenseObjType } from "./types";

export const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}

//capitalize the word and remove underscores
export const toTitleCase = (category: string) => {
    return category
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const getAttrwiseInfo = (expenses: ExpenseObjType[], attr: keyof typeof PALETTE = 'category') => expenses.reduce(
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

