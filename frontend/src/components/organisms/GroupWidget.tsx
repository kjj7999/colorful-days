import { WidgetInfo } from "./Widget";

function GroupWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div></div>
    </>
  );
}

export default GroupWidget;
