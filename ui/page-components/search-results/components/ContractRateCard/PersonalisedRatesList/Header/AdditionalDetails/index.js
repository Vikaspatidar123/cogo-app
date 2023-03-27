import { ToolTip } from '@cogoport/front/components';
import { Pincode, TouchPoints, PincodeLink, Container } from './styles';
import ToolTipContent from './ToolTipContent';

const AdditionalDetails = ({ touch_point_locations = [] }) => {
	const leftPincodes = touch_point_locations.slice(
		1,
		touch_point_locations.length,
	);

	return (
		<Container>
			<TouchPoints>Touch Points ({touch_point_locations.length}):</TouchPoints>
			<Pincode>
				{touch_point_locations?.[0]?.name}
				<ToolTip
					placement="bottom"
					content={<ToolTipContent leftPincodes={leftPincodes} />}
					theme="light"
				>
					{touch_point_locations.length > 1 && (
						<PincodeLink>+{touch_point_locations.length - 1}</PincodeLink>
					)}
				</ToolTip>
			</Pincode>
		</Container>
	);
};

export default AdditionalDetails;
