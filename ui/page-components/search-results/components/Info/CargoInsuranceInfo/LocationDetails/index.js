import { ToolTip } from '@cogoport/front/components/admin';
import { IcMPortArrow } from '@cogoport/icons-react';

import { Port, IconWrap, LocationDetailsDiv } from './styles';

function LocationDetails({ data }) {
	const { origin_country, destination_country } = data;

	return (
		<LocationDetailsDiv>
			<ToolTip
				theme="light"
				animation="shift-away"
				interactive
				content={origin_country?.display_name || origin_country?.name}
			>
				<Port>{origin_country?.display_name || origin_country?.name}</Port>
			</ToolTip>

			<IconWrap>
				<IcMPortArrow
					style={{ width: '1.5em', height: '1.5em', color: '#356efd' }}
				/>
			</IconWrap>

			<ToolTip
				theme="light"
				animation="shift-away"
				interactive
				content={destination_country?.display_name || destination_country?.name}
			>
				<Port>
					{destination_country?.display_name || destination_country?.name}
				</Port>
			</ToolTip>
		</LocationDetailsDiv>
	);
}

export default LocationDetails;
