import { useEffect, useState, useRef, ComponentType } from "react";
import { IconButton, Paper } from "@mui/material";
import { FaEllipsisV, FaRegTrashAlt } from "react-icons/fa";
import { useOnClickOutside } from "usehooks-ts";
import GroupWidget from "./GroupWidget";
import CounterWidget from "./CounterWidget";
import ProgressWidget from "./ProgressWidget";
import TableWidget from "./TableWidget";
import LinkWidget from "./LinkWidget";

export type WidgetType = "counter" | "progress" | "table" | "group" | "link";
export type WidgetInfo = {
  widgetType: WidgetType;
  title: string;
  value?: number;
};

const WIDGET_COMPONENTS: Record<WidgetType, ComponentType<WidgetInfo>> = {
  group: GroupWidget,
  counter: CounterWidget,
  progress: ProgressWidget,
  table: TableWidget,
  link: LinkWidget,
};

interface WidgetProps {
  item: string;
  editable: boolean;
  onClick: Function;
  onContextMenu: Function;
  widgetInfo: WidgetInfo;
}

function Widget({
  item,
  editable,
  onClick,
  onContextMenu,
  widgetInfo,
}: WidgetProps) {
  const widgetBox = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // console.log(`use effect ${item} ${widgetInfo.widgetType}`);
  }, []);

  useOnClickOutside(widgetBox, handleClickOutside);

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    onContextMenu(item, event.pageX, event.pageY);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick();
  }

  function handleClickOutside() {}

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`delete ${widgetInfo.title}`);
  }

  function handleDetailClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`detail ${widgetInfo.title}`);
    onContextMenu(item, event.pageX, event.pageY);
  }
  const WidgetComponent = WIDGET_COMPONENTS[widgetInfo.widgetType];

  return (
    <>
      <div
        className={"w-full h-full"}
        style={{ zIndex: "-1" }}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={widgetBox}
      >
        <Paper
          component="div"
          sx={{
            width: 1,
            height: 1,
            border: 1,
            padding: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <span className={"font-sans font-bold text-lg text-primary"}>
              {widgetInfo.title}
            </span>
            {isHover && editable && (
              <span className={"float-right h-full"}>
                <IconButton size="small" onClick={handleDeleteClick}>
                  <FaRegTrashAlt className={"text-sm"}/>
                </IconButton>
                <IconButton size="small" onClick={handleDetailClick}>
                  <FaEllipsisV className={"text-sm"}/>
                </IconButton>
              </span>
            )}
          </div>
          <WidgetComponent {...widgetInfo} />
        </Paper>
      </div>
    </>
  );
}

export default Widget;
