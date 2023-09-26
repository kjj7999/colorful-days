import { useEffect, useState, useRef, useCallback } from "react";
import { Paper } from "@mui/material";
import { useOnClickOutside } from "usehooks-ts";

interface GadgetProps {
  item: string;
  onClick: Function;
  onContextMenu: Function;
}

function Gadget({ item, onClick, onContextMenu }: GadgetProps) {
  const gadgetBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`use effect ${item}`);
  }, []);

  useOnClickOutside(gadgetBox, handleClickOutside);

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    onContextMenu(item, event.pageX, event.pageY);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick();
  }

  function handleClickOutside() {
  }

  return (
    <>
      <div
        className={"w-full h-full"}
        style={{ zIndex: "-1" }}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        ref={gadgetBox}
      >
        <Paper
          component="div"
          sx={{ width: 1, height: 1, border: 1, padding: 1 }}
        >
          {item}
        </Paper>
      </div>
    </>
  );
}

export default Gadget;
