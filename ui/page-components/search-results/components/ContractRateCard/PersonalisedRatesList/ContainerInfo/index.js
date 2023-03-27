import { startCase } from '@cogoport/front/utils';
import React, { useCallback } from 'react';
import { Container, Box } from './styles';

const keys = [
	'truck_type',
	'trucks_count',
	'forward_tat',
	'rate_type',
	'commodity',
	'chargeable_weight',
	'volume',
	'total_weight',
	'total_volume',
];

const ContainerInfo = ({ data = {}, source = '' }) => {
	const { chargeable_weight } = data || {};

	const getContainerDetail = useCallback(
		(key) => {
			let content = null;

			switch (key) {
				case 'truck_type':
					content = (
						<span>
							Truck type :{' '}
							<b>{startCase(data?.truck_type?.replace('_', ' '))}</b>
						</span>
					);
					break;

				case 'trucks_count':
					content = (
						<span>
							Truck Count : <b>{data?.trucks_count}</b>
						</span>
					);

					break;

				case 'forward_tat':
					content = (
						<span>
							Forward Tat : <b>{data?.forward_tat} days</b>
						</span>
					);

					break;

				case 'rate_type':
					content = source === 'list_item' && (
						<span>
							Rate Type :{' '}
							<b style={{ textTransform: 'capitalize' }}>
								{startCase(data?.rate_type)}
							</b>
						</span>
					);

					break;

				case 'commodity':
					content = (
						<span>
							Commodity : <b>{startCase(data?.commodity)}</b>
						</span>
					);

					break;

				case 'volume':
					content = (
						<span>
							Volume : <b>{data?.volume}</b> CC
						</span>
					);

					break;

				case 'chargeable_weight':
					content = source === 'list_item' && (
						<span>
							Chargeable Weight : <b>{chargeable_weight} kg</b>
						</span>
					);

					break;

				case 'total_weight':
					content = (
						<span>
							Total Weight :{' '}
							<b>
								{data?.total_weight} {data?.total_weight_unit}
							</b>
						</span>
					);

					break;

				case 'total_volume':
					content = (
						<span>
							Total Volume :{' '}
							<b>
								{data?.total_volume} {data?.total_volume_unit}
							</b>
						</span>
					);

					break;

				default:
					content = null;
			}

			return content;
		},
		[data],
	);

	return (
		<Container>
			{keys?.map((key) => {
				if (!data?.[key]) return null;

				const content = getContainerDetail(key);

				if (!content) return null;

				return (
					<Box key={key} className={key}>
						{content}
					</Box>
				);
			})}
		</Container>
	);
};

export default ContainerInfo;
