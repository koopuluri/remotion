import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { random } from "remotion";

const DancingCharacter = (props: {character: string, index: number}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  
  const skewAnimation = Math.cos(0.1 * frame)
  let skew = interpolate(skewAnimation, [-1, 2], [-3, 3]);

  if (props.index % 2 === 0) {
    skew = -skew;
  }

  return (
    <span
      className="character"
      style={{
        display: "inline-block",
        transform: `skew(${skew}deg)`,
      }}
    >
      {props.character}
    </span>
  );
}


// A word that jiggles around a bit: side to side, and a bit of scaling.
export const DancingWord = (props: {word: string}) => {

  let characters = props.word.split("").map((character, index) => {
    return (<DancingCharacter character={character} index={index} />)
  })

  return (
    <span className="dancing-word">
      {characters}
    </span>
  )
}