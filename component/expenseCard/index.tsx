import { ExpenseType } from "@/types";
import React, { FC } from "react";
import styles from "./expenseCard.module.css";
import Image from "next/image";
import { formatCategory } from "@/utils";

type Props = {
  expense: ExpenseType;
  categoryInfo: { amount: number; color: string; label: string };
};

const ExpenseCard: FC<Props> = ({ expense, categoryInfo }) => {
  const {
    category,
    total_amount,
    image_url,
    bill_date,
    payment_mode,
    account,
    description,
    merchant,
  } = expense;

  const { color, label } = categoryInfo;
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={image_url} alt={category} fill unoptimized />
      </div>
      <div className={styles.details}>
        <h3 className={styles.category}>{label}</h3>
        <p className={styles.merchant}>Merchant: {merchant}</p>
        <p className={styles.paymentMode}>
          Payment Mode: {formatCategory(payment_mode)}
        </p>
        <p className={styles.description}>{description}</p>
      </div>
      <div
        className={styles.amount}
        style={{
          backgroundColor: color,
        }}
      >
        <p>${total_amount.toFixed(2)}</p>
        <p className={styles.date}>{bill_date}</p>
        <span className={styles.chip}>{formatCategory(account)}</span>
      </div>
    </div>
  );
};

export default ExpenseCard;
