import { useEffect, useState, useRef, useCallback } from "react";
import { Paper } from "@mui/material";
import { useOnClickOutside } from "usehooks-ts";

interface WidgetProps {
  item: string;
  editable: boolean;
  onClick: Function;
  onContextMenu: Function;
}

function Widget({ item, editable, onClick, onContextMenu }: WidgetProps) {
  const gadgetBox = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

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

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  return (
    <>
      <div
        className={"w-full h-full"}
        style={{ zIndex: "-1" }}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={gadgetBox}
      >
        <Paper
          component="div"
          sx={{ width: 1, height: 1, border: 1, padding: 1 }}
        >
          {item}
          {(isHover && editable) && <span>Hover</span>}
        </Paper>
      </div>
    </>
  );
}

export default Widget;
