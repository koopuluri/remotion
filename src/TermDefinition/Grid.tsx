import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"

export const Grid = (props: { 
  cellWidth: number, 
  cellHeight: number,
  collapseAt: number,
  collapseToHeight: number,
}) => {

  // Animate the grid by drawing the lines according to the width & height:

    let frame = useCurrentFrame();
    const { width, height, fps, durationInFrames } = useVideoConfig();

    // Animate the rows and columns into existence:
    // Animate from 0 to 1 after 25 frames
    const progress = spring({
      frame,
      fps,
      config: {
        damping: 100,
      },
    });

    // Move the logo up by 150 pixels once the transition starts
    const lineWidth = interpolate(
      progress,
      [0, 1],
      [0, width]
    );

    const lineHeight = interpolate(
      progress,
      [0, 1],
      [0, height]
    );

    const collapseProgress = spring({
      frame: frame - props.collapseAt,
      fps,
      config: { damping: 100 }
    })

    const collapseHeight = interpolate(
      collapseProgress,
      [0, 1],
      [props.cellHeight, props.collapseToHeight],
    )

    const Row = (y: number) => {
        return (
            <div style={{
                width: lineWidth,
                height: "1px",
                backgroundColor: "rgba(256, 256, 256, 0.1)",
                position: "absolute",
                top: y,
                left: "0",
            }}></div>
        )
    }

    const Column = (x: number) => {
      return (
        <div style={{
          width: "1px",
          height: lineHeight,
          backgroundColor: "rgba(256, 256, 256, 0.1)",
          position: "absolute",
          top: "0",
          left: x,
        }}></div>
      )
    }

    let cellHeight = (frame < props.collapseAt) ? props.cellHeight : props.collapseToHeight;

    let numCols = Math.round(width / props.cellWidth);
    let numRows = Math.round(height / cellHeight) + 10;

    let rows = [];
    let cols = [];

    for (let i = 1; i < numRows; i++) {
      rows.push(Row(i * collapseHeight));
    }

    for (let i = 1; i < numCols; i++) {
      cols.push(Column(i * props.cellWidth));
    }
  
    return (
      <AbsoluteFill>
        {rows}
        {cols}
      </AbsoluteFill>
    )
}