import { useCurrentFrame, useVideoConfig, Easing, interpolate, spring } from "remotion";
import { evolvePath } from "@remotion/paths";

export const DownArrow = (props: {delay: number}) => {

  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // https://javascript.plainenglish.io/how-to-do-an-oscillation-animation-with-remotion-f6aeb313f6a9
  const jumpingAnimation = frame > props.delay ? Math.cos(frame * 0.2) : -1;

  const translateY = interpolate(jumpingAnimation, [-1, 1], [0, -3], {
    easing: Easing.bezier(0.12, 0.55, 0.79, 0.94),
  });

//  let path = "M11.0001 18.5858V3H13.0001V18.5858L19.293 12.2929L20.7072 13.7071L12.0001 22.4142L3.29297 13.7071L4.70718 12.2929L11.0001 18.5858Z"
  let path = "M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883"

  let progress = spring({
		frame: frame,
		fps,
		config: {
			damping: 100,
		},
	});

  const evolution = evolvePath(progress, path)
  
  return (
    <div 
      style={{ transform: `translateY(${translateY}px)`}}
      className="vertical-line">
        <svg width="48" height="55" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="24 / arrows / arrow-bottom">
          <path
            id="icon" 
            d={path} 
            strokeDasharray={evolution.strokeDasharray}
            strokeDashoffset={evolution.strokeDashoffset}
          />
          </g>
        </svg>
    </div>
  )
}