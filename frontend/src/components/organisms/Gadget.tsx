import { useEffect, useState, useRef, useCallback } from "react";
import { Paper } from "@mui/material";
import { useOnClickOutside } from "usehooks-ts";
import GadgetContext from "../molecules/GadgetContext";

interface GadgetProps {
  item: string;
}

function Gadget({ item }: GadgetProps) {
  const gadgetBox = useRef<HTMLDivElement>(null);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log(`use effect ${item}`);
  }, []);

  useOnClickOutside(gadgetBox, handleClickOutside);

  function showContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsContextMenu(false);
    let parentX = 0;
    let parentY = 0;
    if (gadgetBox.current) {
      const gadgetRect = gadgetBox.current.getBoundingClientRect();
      parentX = gadgetRect.left;
      parentY = gadgetRect.top;
      console.log(gadgetBox.current.style);
    }
    const newPosition = {
      x: event.pageX - parentX,
      y: event.pageY - parentY,
    };
    setPosition(newPosition);
    setIsContextMenu(true);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    setIsContextMenu(false);
  }

  function handleClickOutside() {
    setIsContextMenu(false);
    handleClickContextItem("s");
  }

  function handleClickContextItem(item: string) {
    console.log(`click item ${item}`);
  }

  return (
    <>
      <div
        className={"w-full h-full"}
        style={{ zIndex: "-1" }}
        onContextMenu={showContextMenu}
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
      {/* Define the custom context menu */}
      {isContextMenu && <GadgetContext y={position.y} x={position.x} />}
    </>
  );
}

export default Gadget;
