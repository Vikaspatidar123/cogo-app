import { useSelector } from '@cogoport/front/store';
import { Avatar } from '@cogoport/front/components';

import KycStatus from '../../KycStatus';

import { Container, Main, Name, Type, PartnerDetails } from './styles';

function SwitchPartnerItem({ item }) {
	const { partner } = useSelector(({ profile }) => profile);

	let accountType = '';
	const accountTypes = item.verifications?.map(
		({ account_type }) => account_type,
	);

	if (accountTypes.length === 2) {
		accountType = 'Channel Partner, Service Provider';
	} else if (accountTypes[0] === 'importer_exporter') {
		accountType = 'Channel Partner';
	} else if (accountTypes[0] === 'service_provider') {
		accountType = 'Service Provider';
	}

	return (
		<Container
			href={`/${item.id}/dashboard`}
			disabled={item.id === partner?.id}
		>
			<Main>
				<Avatar name={item.business_name} />

				<PartnerDetails>
					<Name className="partner-name">{item.business_name}</Name>
					<Type>{accountType}</Type>
				</PartnerDetails>
			</Main>

			<KycStatus
				verifications={item.verifications}
				twin_importer_exporter_id={item.twin_importer_exporter_id}
			/>
		</Container>
	);
}

export default SwitchPartnerItem;
