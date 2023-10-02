import { WidgetInfo } from "./Widget";

function TableWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div></div>
    </>
  );
}

export default TableWidget;
