import {Easing, spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { DancingWord } from './DancingWord';
import { DownArrow } from '../../TermDefinition/DownArrow';

// TODO:
// https://codepen.io/zerospree/pen/GRmBga -> give each character a jitter.
// https://codepen.io/wagerfield/pen/AxGbVz
// https://codepen.io/soulwire/pen/mEMPrK -> Only for the title, the caption should appear as it does.
const SlideIn = (props: { index: number; children: any;  }) => {
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
        display: "inline-block",
        transform: `translateX(${translateX}px)`,         
      }}>
        {props.children}
    </span>
  )
}

// Animate each word in the sentence at a time, until all words are completed.
export const Sentence = (props: {
  sentence: string;
  index: number;
  collapseAt: number;
}) => {

  let frame = useCurrentFrame()

  let words = props.sentence.split(" ");
  let wordComponents = words.map((word, index) => {
    return (
      <SlideIn index={index}>
        <DancingWord word={word} />
      </SlideIn>
    )
  })

  let progress = spring({
    frame: frame - props.collapseAt,
    fps: 30,
    config: {
      damping: 100,
    },
  });

  let translateY = interpolate(
    progress,
    [0, 1],
    [0, -props.index*100 - 130]  
  )

  // Want to let each word appear on its own timeline:
  // Each word will take 10 frames to appear.
  // => this Sequence will take 10 * words.length frames to complete
  return (
    <div className="word" style={{ 
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 400 + (props.index * 200),
      transform: `translateY(${translateY}px)`,
    }}>

      <DownArrow delay={0} visible={frame < props.collapseAt} />
      {wordComponents}
    </div>
  )
}