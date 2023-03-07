import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import "./style.css"

export const Highlight = (props: { 
  height: number; 
  width: number;
  top: number;
  left: number;
}) => {

  let frame = useCurrentFrame();
  let { fps } = useVideoConfig();

  // Animate the highlight into the picture.

  let progress = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  })

  let width = interpolate(
    progress,
    [0, 1],
    [0, props.width]
  )

  return (
    <div className="highlight" style={{ 
      height: props.height, 
      width: width,
      position: "absolute",
      top: props.top,
      left: props.left,
      transform: `skew(-10deg)`,
    }}>
        
    </div>
  )
}