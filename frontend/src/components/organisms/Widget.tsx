import { useEffect, useState, useRef } from "react";
import { Paper } from "@mui/material";
import { useOnClickOutside } from "usehooks-ts";
import GroupWidget from "./GroupWidget";
import CounterWidget from "./CounterWidget";
import ProgressWidget from "./ProgressWidget";
import TableWidget from "./TableWidget";
import LinkWidget from "./LinkWidget";

interface WidgetProps {
  item: string;
  editable: boolean;
  onClick: Function;
  onContextMenu: Function;
  type: string;
}

const WIDGET_COMPONENTS: Record<string, React.FC> = {
  "group": GroupWidget,
  "counter": CounterWidget,
  "progress": ProgressWidget,
  "table": TableWidget,
  "link": LinkWidget,
};


function Widget({ item, editable, onClick, onContextMenu, type }: WidgetProps) {
  const gadgetBox = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    console.log(`use effect ${item} ${type}`);
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

  const WidgetComponent = WIDGET_COMPONENTS[type];

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
          <WidgetComponent />
        </Paper>
      </div>
    </>
  );
}

export default Widget;
