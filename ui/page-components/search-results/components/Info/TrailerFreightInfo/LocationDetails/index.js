import { ToolTip } from '@cogoport/front/components/admin';

import {
	Port,
	IconWrap,
	TripType,
	LocationDetailsDiv,
	DottedLine,
	Circle,
} from './styles';

function LocationDetails({ data }) {
	const { origin_location, destination_location } = data;
	return (
		<LocationDetailsDiv>
			<ToolTip
				theme="light"
				animation="shift-away"
				interactive
				content={origin_location?.port_code || origin_location?.name}
			>
				<Port>{origin_location?.port_code || origin_location?.name}</Port>
			</ToolTip>

			<TripType>
				<IconWrap>
					<Circle />
					<DottedLine />
					<Circle />
				</IconWrap>
			</TripType>

			<ToolTip
				theme="light"
				animation="shift-away"
				interactive
				content={destination_location?.port_code || destination_location?.name}
			>
				<Port>
					{destination_location?.port_code || destination_location?.name}
				</Port>
			</ToolTip>
		</LocationDetailsDiv>
	);
}

export default LocationDetails;
