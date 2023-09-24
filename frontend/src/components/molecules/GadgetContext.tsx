import {
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

interface GadgetContextProps {
  x: number;
  y: number;
}

function GadgetContext({ x, y }: GadgetContextProps) {
  return (
    <Paper
      style={{ top: y, left: x, zIndex: 5000}}
      sx={{ width: 320, position: "absolute"}}
    >
      <MenuList>
        <MenuItem>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default GadgetContext;
