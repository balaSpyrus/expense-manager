import { BadgeIndianRupee } from "lucide-react";
import React from "react";

const AddBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="add-btn" onClick={onClick}>
      <BadgeIndianRupee width={40} height={40} />
    </div>
  );
};

export default AddBtn;
