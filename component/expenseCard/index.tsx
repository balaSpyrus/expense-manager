import { ExpenseType } from "@/types";
import { toTitleCase } from "@/utils";
import Image from "next/image";
import { FC } from "react";
import styles from "./expenseCard.module.css";

type Props = {
  expense: ExpenseType;
};

const ExpenseCard: FC<Props> = ({ expense }) => {
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

  return (
    <div className={styles.card}>
      {image_url && (
        <div className={styles.image}>
          <Image src={image_url} alt={category} fill unoptimized />
        </div>
      )}
      <div className={styles.details}>
        <h3 className={styles.category}>
          {toTitleCase(category)}
          <p className={styles.chip}>Merchant: {merchant}</p>
          <p className={styles.chip}>
            Payment Mode: {toTitleCase(payment_mode)}
          </p>
        </h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.amount}>
        <p>${total_amount.toFixed(2)}</p>
        <p className={styles.date}>{bill_date}</p>
        <span className={styles.acc_info}>{toTitleCase(account)}</span>
      </div>
    </div>
  );
};

export default ExpenseCard;
