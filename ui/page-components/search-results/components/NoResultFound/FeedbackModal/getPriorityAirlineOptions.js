import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { IcMAirport } from '@cogoport/icons-react';
import { Flex, Text } from './styles';

const getPriorityAirlineOptions = () => {
	const {
		general: { scope },
	} = useSelector((state) => state);
	const { data, trigger, loading } = useRequest(
		'get',
		false,
		scope,
	)('/list_priority_airlines');
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
		(data?.list || []).map((option) => {
			return airlineOptions.push({
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

							<Text>{option?.airline?.business_name || ''}</Text>
						</Flex>
						<Text>{option?.airline?.iata_code}</Text>
					</Flex>
				),
				id: option?.airline?.id,
			});
		});
	}
	return { priorityAirlineOptions, airlineOptions };
};
export default getPriorityAirlineOptions;
