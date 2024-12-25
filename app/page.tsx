"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Expense Manager</h1>
      <p className={styles.description}>
        This is a simple expense manager app to manage your expenses.
      </p>
    </div>
  );
}
