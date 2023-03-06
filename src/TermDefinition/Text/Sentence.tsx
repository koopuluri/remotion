import {Easing, spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { DancingWord } from './DancingWord';

const Letter = (props: { letter: string; index: number; }) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // Wiggle side to side:
  return (
    <span
      className="letter"
      style={{
      }}>
        {props.letter}
    </span>
  )
}

// TODO:
// https://codepen.io/zerospree/pen/GRmBga -> give each character a jitter.
// https://codepen.io/wagerfield/pen/AxGbVz
// https://codepen.io/soulwire/pen/mEMPrK -> Only for the title, the caption should appear as it does.
const SlideIn = (props: { children: any; index: number; }) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // Animate from 0 to 1 after 25 frames
  const translateXProgress = spring({
    frame: frame - (props.index * 2),
    fps,
    config: {
      damping: 100,
    },
  });

  // Move the logo up by 150 pixels once the transition starts
  const translateX = interpolate(
    translateXProgress,
    [0, 1],
    [0, -20]
  );
  // Fade in the animation at the beginning
  const opacity = interpolate(
    frame - (props.index * 2),
    [0, 10],
    [0, 1]
  );

  return (
    <span
      className="slide-in"
      style={{
        opacity, 
        transform: `translateX(${translateX}px)`,         
      }}>
        {props.children}
    </span>
  )
}


const VerticalLine = (props: {delay: number}) => {

  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // https://javascript.plainenglish.io/how-to-do-an-oscillation-animation-with-remotion-f6aeb313f6a9
  const jumpingAnimation = frame > props.delay ? Math.cos(frame * 0.2) : -1;

  const translateY = interpolate(jumpingAnimation, [-1, 1], [0, -3], {
    easing: Easing.bezier(0.12, 0.55, 0.79, 0.94),
  });

  return (
    <div 
      style={{ transform: `translateY(${translateY}px)`}}
      className="vertical-line">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="24 / arrows / arrow-bottom">
          <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 18.5858V3H13.0001V18.5858L19.293 12.2929L20.7072 13.7071L12.0001 22.4142L3.29297 13.7071L4.70718 12.2929L11.0001 18.5858Z" 
            fill="white"/>
          </g>
        </svg>
    </div>
  )
}

// Animate each word in the sentence at a time, until all words are completed.
export const Sentence = (props: {
  sentence: string;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  let words = props.sentence.split(" ");
  let wordComponents = words.map((word, index) => {
    return (
      <SlideIn index={index}>
        <DancingWord word={word} />
      </SlideIn>
    )
  })

  // Want to let each word appear on its own timeline:
  // Each word will take 10 frames to appear.
  // => this Sequence will take 10 * words.length frames to complete
  return (
    <div className="word" style={{ 
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 400 + (props.index * 200),
    }}>
      <VerticalLine delay={0}/>
      {wordComponents}
    </div>
  )
}