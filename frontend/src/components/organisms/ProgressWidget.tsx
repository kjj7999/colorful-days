import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useObserveElementSize } from '../../hooks/useObserverElementSize';
import { WidgetInfo } from './WidgetType';

function ProgressWidget(props: WidgetInfo) {
  const { width, height, ref } = useObserveElementSize<HTMLDivElement>();
  const progress: number = props.value ? Math.floor(props.value) : 0;
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(Math.min(width, height));
  }, [width, height]);

  return (
    <div className="relative w-full h-full" ref={ref}>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={0.8 * size} variant="determinate" value={progress} />
      </Box>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: `${0.25 * size}px` }}>{`${progress}%`}</span>
      </Box>
    </div>
  );
}

export default ProgressWidget;
