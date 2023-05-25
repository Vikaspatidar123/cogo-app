import { IcMAirport } from '@cogoport/icons-react';

import { Flex, OptionText } from '../components/styles.module.css';

import { useRequest } from '@/packages/request';

const useGetPriorityAirlineOptions = () => {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : 'list_priority_airlines',
			method : 'get',
		},
		{ manual: true },
	);

	const priorityAirlineOptions = async (params) => {
		try {
			await trigger({
				params: {
					filters: { operator_type: 'airline', status: 'active' },
					...params,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	const airlineOptions = [];
	if (!loading) {
		(data?.list || []).map((option) => airlineOptions.push({
			label: (
				<Flex justifyContent="space-between" alignItems="center">
					<Flex>
						{option?.airline?.logo_url ? (
							<img
								alt="logo"
								src={option?.airline?.logo_url}
								style={{ maxWidth: '16px', marginRight: '20px' }}
							/>
						) : (
							<IcMAirport
								width={16}
								height={16}
								fill="#888888"
								style={{ marginRight: '20px' }}
							/>
						)}

						<OptionText>{option?.airline?.business_name || ''}</OptionText>
					</Flex>
					<OptionText>{option?.airline?.iata_code}</OptionText>
				</Flex>
			),
			id: option?.airline?.id,
		}));
	}
	return { priorityAirlineOptions, airlineOptions };
};
export default useGetPriorityAirlineOptions;
