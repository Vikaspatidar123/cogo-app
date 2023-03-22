import { useRouter } from '@cogo/next';

import { KEYS_MAPPING } from '../../../../../../configurations/payload-key-mapping';
import { SERVICE_MAPPING } from '../../../../../../constants';

import Route from './Route';
import { Container, Actions, PortPairs, ViewMore, ViewMoreBtn } from './styles';

function Ports({ item }) {
	const { push } = useRouter();
	const { status, services } = item || {};

	const portPairData = [];
	services?.forEach((val) => {
		item[SERVICE_MAPPING?.[val]]?.forEach((data) => {
			portPairData.push({ ...data, service_type: val });
		});
	});

	const formattedData = portPairData.map((val) => {
		const serviceKey = KEYS_MAPPING?.[val?.service_type].name;

		return {
			service_id              : val.id,
			service_type            : val?.service_type || '',
			origin                  : val?.[serviceKey.origin] || '',
			destination             : val?.[serviceKey.destination] || '',
			max_containers_count    : val?.max_containers_count || 0,
			booked_containers_count : val?.booked_containers_count || 0,
			max_weight              : val?.max_weight || 0,
			booked_weight           : val?.booked_weight || 0,
			max_volume              : val?.max_volume || 0,
			booked_volume           : val?.booked_volume || 0,
			validity_start          : val?.validity_start || 0,
			validity_end            : val?.validity_end || 0,
			trade_type              : val?.trade_type,
		};
	});

	const firstThreeService = formattedData.splice(0, 3);
	const isMoreThanThree = portPairData.length > 3;
	const viewMore = isMoreThanThree ? formattedData.length : 0;
	return (
		<Container>
			<PortPairs>
				{(firstThreeService || []).map((val) => <Route val={val} status={status} />)}
			</PortPairs>

			{(status === 'active' || status === 'pending_approval') && (
				<Actions>
					{isMoreThanThree && (
						<ViewMore>
							+
							{viewMore}
							{' '}
							More
						</ViewMore>
					)}
					<ViewMoreBtn
						className="secondary sm"
						onClick={() => push(
							`/contract-management/[contract_id]?contract_status=${status}`,
							`/contract-management/${item.id}?contract_status=${status}`,
						)}
					>
						View
					</ViewMoreBtn>
				</Actions>
			)}
		</Container>
	);
}

export default Ports;
