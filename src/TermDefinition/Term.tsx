import {Easing, spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { DancingWord } from '../Base/Text/DancingWord';

export const Term = (props: {term: string}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // Animate from 0 to 1 after 25 frames
  const translateXProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const translateYProgress = spring({
    frame: frame - 35,
    fps,
    config: {
      damping: 100,
    }
  }) 

  // Move the logo up by 150 pixels once the transition starts
  const translateX = interpolate(
    translateXProgress,
    [0, 1],
    [0, -100]
  );

  const translateY = interpolate(
    translateYProgress,
    [0, 1],
    [0, -600]
  )

  // Fade in the animation at the beginning
  const opacity = interpolate(
    frame,
    [0, 25],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // https://javascript.plainenglish.io/how-to-do-an-oscillation-animation-with-remotion-f6aeb313f6a9
  const glowingAnimation = Math.cos(frame * 0.2)
  const textShadow = interpolate(glowingAnimation, [-1, 1], [30, 80], {
    easing: Easing.bezier(0.12, 0.55, 0.79, 0.94),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`
      }}
      className="term">
        <span style={{ 
            textShadow: "0 0 8px rgb(255 255 255 / " + textShadow + "%)"
         }}>
          <DancingWord word={props.term} />
        </span>
    </div>
  )
}