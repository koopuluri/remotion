import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import { TermDefinition } from './TermDefinition/TermDefinition';
import {Logo} from './HelloWorld/Logo';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="TermDefinition"
				component={TermDefinition}
				durationInFrames={400}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					term: "ECONOMY",
					definition: [
						"The management of the resources of a community or an individual with a view t.",
						"An economic system is a system of production, resource allocation"
					]
				}}
			/>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
