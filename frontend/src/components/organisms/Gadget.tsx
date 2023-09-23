import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

interface GadgetProps {
  item: string;
}

function Gadget({ item }: GadgetProps) {
  useEffect(() => {
    console.log(`use effect ${item}`);
  });

  return (
    <Paper component="div" key={item} sx={{ width: 1, height: 1, border: 1 }}>
      {item}
    </Paper>
  );
}

export default Gadget;
