import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { FaArrowRotateRight, FaCopy, FaGear, FaTrashCan } from "react-icons/fa6";

interface WidgetContextMenuProps {
  x: number;
  y: number;
}

function WidgetContextMenu({ x, y }: WidgetContextMenuProps) {
  return (
    <Paper
      elevation={3}
      style={{ top: y, left: x, zIndex: 5000}}
      sx={{ width: 200, position: "absolute"}}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <FaGear />
          </ListItemIcon>
          <ListItemText>Setting</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaArrowRotateRight />
          </ListItemIcon>
          <ListItemText>Refresh</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaCopy />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaTrashCan />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default WidgetContextMenu;
