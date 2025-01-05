import { ACCOUNTS, CATEGORIES, PAYMENT_MODES } from "@/constant";
import Dropdown from "../atoms/dropdown";
import { useActionState } from "react";
import styles from "./addExpense.module.css";
const AddExpense = () => {
  const [state, dispatch, pending] = useActionState(() => ({}), {});
  return (
    <form action={dispatch} className={styles["add-expense-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="amount">Amount</label>
        <input type="number" className={styles["form-control"]} id="amount" />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="category">Category</label>
        <Dropdown
          titleCase
          className={styles["form-control"]}
          id="category"
          options={CATEGORIES as unknown as string[]}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="payment_mode">Payment Mode</label>
        <Dropdown
          titleCase
          className={styles["form-control"]}
          id="payment_mode"
          options={PAYMENT_MODES as unknown as string[]}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className={styles["form-control"]}
          id="description"
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="account">Account</label>
        <Dropdown
          titleCase
          className={styles["form-control"]}
          id="account"
          options={ACCOUNTS as unknown as string[]}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="date">Date</label>
        <input type="date" className={styles["form-control"]} id="date" />
      </div>
      <button type="submit" className={styles["btn btn-primary"]}>
        Submit
      </button>
    </form>
  );
};

export default AddExpense;
