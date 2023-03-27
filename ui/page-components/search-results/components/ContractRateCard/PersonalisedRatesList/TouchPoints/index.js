import { Button, ToolTip } from '@cogoport/front/components/admin';
import Grid from '@cogoport/front/components/Grid';
import { isEmpty } from '@cogoport/front/utils';
import {
	TouchPointsName,
	TouchContainer,
	Text,
	TransitHeading,
	Days,
	TransitDiv,
} from './styles';
import RenderTouchPoints from './RenderTouchPoints';

const { Col } = Grid;

const TouchPoints = (props) => {
	const { touch_points, service_type, transit_time } = props;
	const { forward_touch_points = [], return_touch_points = [] } =
		touch_points || {};

	if (
		(service_type === 'ltl_freight' || service_type === 'air_freight') &&
		transit_time
	) {
		return (
			<Col md={3}>
				<TransitDiv>
					<TransitHeading>Transit Time:</TransitHeading>
					<Days>{transit_time}</Days>
				</TransitDiv>
			</Col>
		);
	}

	if (service_type === 'ftl_freight') {
		return (
			<Col md={3}>
				<TouchContainer>
					<TouchPointsName>
						Touch Points
						<Text size={14} bold>
							({forward_touch_points.length + return_touch_points.length})
						</Text>
					</TouchPointsName>

					{!isEmpty(forward_touch_points) || !isEmpty(return_touch_points) ? (
						<ToolTip
							theme="light"
							placement="right"
							content={
								<RenderTouchPoints
									forward_touch_points={forward_touch_points}
									return_touch_points={return_touch_points}
								/>
							}
						>
							<Button
								className="primary sm text"
								style={{ textTransform: 'capitalize' }}
							>
								View Details
							</Button>
						</ToolTip>
					) : null}
				</TouchContainer>
			</Col>
		);
	}
	return null;
};

export default TouchPoints;
