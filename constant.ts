import { FilterAttrType } from "./types"

export const PAYMENT_MODES = [
    "bank_transfer",
    "upi",
    "cash",
    "credit_card",
    "debit_card",
] as const

export const CATEGORIES = [
    "travel",
    "entertainment",
    "others",
    "health_care",
    "utilities",
    "shopping",
    "rent",
    "transportation",
    "dining",
    "groceries"
] as const

export const ACCOUNTS = [
    "savings",
    "credit",
    "wallet",
    "cash",
    "current"
] as const

export const PALETTE = {
    "category": {
        "travel": "rgba(158, 1, 66, 1)",
        "entertainment": "rgba(213, 62, 79, 1)",
        "others": "rgba(244, 109, 67, 1)",
        "health_care": "rgba(253, 174, 97, 1)",
        "utilities": "rgba(254, 224, 139, 1)",
        "shopping": "rgba(230, 245, 152, 1)",
        "rent": "rgba(171, 221, 164, 1)",
        "transportation": "rgba(102, 194, 165, 1)",
        "dining": "rgba(50, 136, 189, 1)",
        "groceries": "rgba(94, 79, 162, 1)"
    },
    "payment_mode": {
        "bank_transfer": "rgba(158, 1, 66, 1)",
        "upi": "rgba(213, 62, 79, 1)",
        "cash": "rgba(244, 109, 67, 1)",
        "credit_card": "rgba(253, 174, 97, 1)",
        "debit_card": "rgba(254, 224, 139, 1)"
    },
    "account": {
        "savings": "rgba(158, 1, 66, 1)",
        "credit": "rgba(213, 62, 79, 1)",
        "wallet": "rgba(244, 109, 67, 1)",
        "cash": "rgba(253, 174, 97, 1)",
        "current": "rgba(254, 224, 139, 1)"
    }
} as Record<FilterAttrType,
    Record<(
        typeof CATEGORIES[number] |
        typeof ACCOUNTS[number] |
        typeof PAYMENT_MODES[number]
    ), string>>

