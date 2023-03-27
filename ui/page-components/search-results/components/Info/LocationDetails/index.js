import React from 'react';
import getLocationInfo from '@cogo/business-modules/helpers/locations-search';
import { ToolTip } from '@cogoport/front/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { Port, FlexRow, FlexColumn, IconWrap } from './styles';

const singleLocation = ['fcl_customs', 'lcl_customs', 'air_customs', 'fcl_cfs'];

const LocationDetails = ({ data = {} }) => {
	const { origin, destination } = getLocationInfo('search_type', data);

	const origin_country = origin?.display_name?.split(', ');
	const destination_country = destination?.display_name?.split(', ');

	const className = singleLocation.includes(data?.search_type) ? 'single' : '';

	return (
		<FlexRow className={className}>
			<FlexColumn>
				<ToolTip placement="top" theme="light" content={origin?.name}>
					<Port
						className={destination ? '' : 'full'}
						style={{ maxWidth: destination ? '' : '80%' }}
					>
						{origin?.name}
					</Port>
				</ToolTip>

				<Port className={destination ? 'full-name' : 'full-detail'}>
					{`${origin?.port_code ? `${origin?.port_code},` : ''} ${
						origin_country?.pop() || ''
					}`}
				</Port>
			</FlexColumn>

			{destination ? (
				<>
					<IconWrap>
						<IcMPortArrow
							style={{ width: '1.5em', height: '1.5em', color: '#356efd' }}
						/>
					</IconWrap>

					<FlexColumn>
						<ToolTip placement="top" theme="light" content={destination?.name}>
							<Port>{destination?.name}</Port>
						</ToolTip>
						<Port className="full-name">
							{`${destination?.port_code ? `${destination?.port_code},` : ''} ${
								destination_country?.[2] || ''
							}`}
						</Port>
					</FlexColumn>
				</>
			) : null}
		</FlexRow>
	);
};

export default LocationDetails;
