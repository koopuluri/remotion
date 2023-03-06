import {Series, spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

import { Term } from "./Term"

import "./style.css"
import { Sentence } from './Text/Sentence';

// This animation is used to define a term. 
// A term definition requires:
// term - the term to be defined
// definition: string[] - an array of definition sentences that, together, define the term, and are rendered below the term

// Animation sequence:
// 1. Term is rendered at the bottom-center of hte screen (coming in from the right).
// 2. Term slides to the center of the screen
// 3. One by one, the definition sentences are rendered below the term, appearing word by word.
// An arrow appears betweeen each sentence.
// 4. Collapse: the arrows disappear, and the gap between the term and the definition sentences closes.
// 5. The term and definition sentences are highlighted (with different highlight color).

// Components to make this:
// - <Sentence>
// - <Term>
// - <Arrow>

export const TermDefinition = (props: {
  term: string, 
  definition: string[]
}) => { 
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  return (
    <AbsoluteFill className="container">
      <img 
        className="static" src="https://d3n32ilufxuvd1.cloudfront.net/5fcb8cb7333e1d00c3e8bd52/3366588/upload-0a220bbd-7883-41ad-b62f-63b330ff6a39.gif">
      </img>
      <Sequence from={10}>
        <Term term={props.term} />
      </Sequence>
      <Sequence from={60}>
          <Sentence sentence={props.definition[0]} index={0}/>
      </Sequence>
      <Sequence from={60 + props.definition[0].split(" ").length*3}>
          <Sentence sentence={props.definition[1]} index={1}/>
      </Sequence>
    </AbsoluteFill>
  );
}