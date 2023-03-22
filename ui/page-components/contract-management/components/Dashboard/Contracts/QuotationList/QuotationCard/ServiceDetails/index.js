import React from 'react';
import { upperCase } from '@cogoport/front/utils';
import { formatDateToString } from '@cogoport/front/date';
import {
	Container,
	Card,
	Tag,
	ServiceName,
	ServiceIcon,
	Validity,
} from './styles';
import { getSerivceUnit } from '../../../../../../utils/getUnit';
import { SERVICE_ICON_MAPPING } from '../../../../../../configurations/service-icon-mapping';

const ServiceDetails = ({ item }) => {
	const {
		services = '',
		overseas_port_pairs_count = {},
		contract_utilisation_data = [],
		validity_start = '',
		validity_end = '',
	} = item || {};
	return (
		<Container>
			{(services || []).map((serviceType) => {
				const getCount = contract_utilisation_data?.filter(
					(x) => x.service_type === serviceType,
				)[0];
				const {
					max_containers_count = '',
					max_volume = '',
					max_weight = '',
				} = getCount || {};

				const count = max_containers_count || max_volume || max_weight;
				return (
					<Card>
						<ServiceIcon>{SERVICE_ICON_MAPPING[serviceType]}</ServiceIcon>
						{serviceType && (
							<ServiceName>{upperCase(serviceType).slice(0, 3)}</ServiceName>
						)}
						<Validity>
							Validity:{' '}
							<span>
								{formatDateToString(validity_start, 'dd MMM')} to{' '}
								{formatDateToString(validity_end, 'dd MMM')}
							</span>
						</Validity>
						<Tag>{overseas_port_pairs_count[serviceType]} Port Pairs</Tag>
						{count && (
							<Tag>
								{count} {getSerivceUnit(serviceType)}
							</Tag>
						)}
					</Card>
				);
			})}
		</Container>
	);
};

export default ServiceDetails;
