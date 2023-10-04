import { useEffect, useState, useRef, ComponentType } from 'react';
import { IconButton, Paper } from '@mui/material';
import { useOnClickOutside } from 'usehooks-ts';
import { FaEllipsisVertical, FaTrashCan } from 'react-icons/fa6';
import { WidgetType, WidgetInfo } from './WidgetType';
import GroupWidget from './GroupWidget';
import CounterWidget from './CounterWidget';
import ProgressWidget from './ProgressWidget';
import TableWidget from './TableWidget';
import LinkWidget from './LinkWidget';

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
  onClick: () => void;
  onContextMenu: (item: string, x: number, y: number) => void;
  widgetInfo: WidgetInfo;
}

function Widget({ item, editable, onClick, onContextMenu, widgetInfo }: WidgetProps) {
  const widgetBox = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // console.log(`use effect ${item} ${widgetInfo.widgetType}`);
  }, []);

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
  useOnClickOutside(widgetBox, handleClickOutside);

  return (
    <div
      className="w-full h-full"
      style={{ zIndex: '-1' }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={widgetBox}
      role="presentation"
    >
      <Paper
        component="div"
        sx={{
          width: 1,
          height: 1,
          border: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <span className="ml-1 font-sans text-lg font-bold text-primary">{widgetInfo.title}</span>
          {isHover && editable && (
            <span className="float-right h-full">
              <IconButton size="small" onClick={handleDeleteClick}>
                <FaTrashCan className="text-md" />
              </IconButton>
              <IconButton size="small" onClick={handleDetailClick}>
                <FaEllipsisVertical className="text-md" />
              </IconButton>
            </span>
          )}
        </div>
        <WidgetComponent {...widgetInfo} />
      </Paper>
    </div>
  );
}

export default Widget;
