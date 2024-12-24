import { ExpenseType } from "@/types";
import React, { FC } from "react";
import styles from "./expenseCard.module.css";
import Image from "next/image";

type Props = ExpenseType;

const ExpenseCard: FC<Props> = ({
  category,
  total_amount,
  image_url,
  bill_date,
  created_by,
  payment_mode,
  account,
  description,
  merchant,
}) => {
  return (
    <div className={styles.card}>
      <Image
        src={image_url}
        alt={category}
        width={150}
        height={150}
        unoptimized
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.category}>{category}</h3>
        <p className={styles.merchant}>Merchant: {merchant}</p>
        <p className={styles.date}>Bill Date: {bill_date}</p>
        <p className={styles.paymentMode}>Payment Mode: {payment_mode}</p>
        <p className={styles.account}>Account: {account}</p>
        <p className={styles.amount}>Amount: ${total_amount.toFixed(2)}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.createdBy}>Created By: {created_by}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
