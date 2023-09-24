import Button from "@mui/material/Button";
import { ReactNode } from "react";

interface ActionButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ActionButton({children, icon, onClick}: ActionButtonProps) {
  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        onClick={onClick}
      >
        {icon &&
          <span className="mr-1">{icon}</span>
        }
        {children}
      </Button>
    </div>
  );
}
export default ActionButton;