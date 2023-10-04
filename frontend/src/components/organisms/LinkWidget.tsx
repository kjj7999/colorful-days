import { WidgetInfo } from './WidgetType';

function LinkWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div />
    </>
  );
}

export default LinkWidget;
