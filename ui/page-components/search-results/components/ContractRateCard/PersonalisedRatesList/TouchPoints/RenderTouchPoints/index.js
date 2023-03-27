import { Flex, Text } from '@cogoport/front/components';
import {
	Dot,
	HorizontalLine,
	Container,
	Location,
	LocationDiv,
} from './styles';

const RenderTouchPoints = (props) => {
	const { forward_touch_points = [], return_touch_points = [] } = props;

	return (
		<Flex direction="column" padding={12}>
			{forward_touch_points.length > 0 ? (
				<Container>
					<Text
						color="#393f70"
						size={16}
						textDecoration="underline"
						style={{ padding: '8px' }}
						bold={500}
					>
						Forward Touch Points
					</Text>

					{forward_touch_points.map((touchPoint) => {
						return (
							<LocationDiv key={touchPoint.display_name} className="box">
								<Dot />
								<HorizontalLine className="line" />
								<Location>{touchPoint.display_name}</Location>
							</LocationDiv>
						);
					})}
				</Container>
			) : null}

			{return_touch_points.length > 0 ? (
				<Container>
					<Text
						color="#393f70"
						size={16}
						textDecoration="underline"
						style={{ padding: '8px' }}
						bold={500}
					>
						Return Touch Points
					</Text>

					{return_touch_points.map((touchPoint) => {
						return (
							<LocationDiv key={touchPoint.display_name} className="box">
								<Dot />
								<HorizontalLine className="line" />
								<Location>{touchPoint.display_name}</Location>
							</LocationDiv>
						);
					})}
				</Container>
			) : null}
		</Flex>
	);
};

export default RenderTouchPoints;
