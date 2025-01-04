import { ACCOUNTS, CATEGORIES, PAYMENT_MODES } from "@/constant";
import EMSelect from "./atoms/select";

const AddExpense = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input type="number" className="form-control" id="amount" />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <EMSelect
          titleCase
          className="form-control"
          id="category"
          options={CATEGORIES as unknown as string[]}
        />
      </div>
      <div className="form-group">
        <label htmlFor="payment_mode">Payment Mode</label>
        <EMSelect
          titleCase
          className="form-control"
          id="payment_mode"
          options={PAYMENT_MODES as unknown as string[]}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" className="form-control" id="description" />
      </div>
      <div className="form-group">
        <label htmlFor="account">Account</label>
        <EMSelect
          titleCase
          className="form-control"
          id="account"
          options={ACCOUNTS as unknown as string[]}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" className="form-control" id="date" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddExpense;
