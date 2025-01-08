import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from "react";

const AddBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="add-btn" onClick={onClick}>
      <CurrencyRupeeIcon width={40} height={40} />
    </div>
  );
};

export default AddBtn;
