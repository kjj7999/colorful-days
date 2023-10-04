import { WidgetInfo } from "./WidgetType";

function TableWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div />
    </>
  );
}

export default TableWidget;
