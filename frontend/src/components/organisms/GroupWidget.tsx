import { WidgetInfo } from "./WidgetType";

function GroupWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div />
    </>
  );
}

export default GroupWidget;
