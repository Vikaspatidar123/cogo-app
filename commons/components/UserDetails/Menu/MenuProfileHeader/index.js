import { useSelector } from '@cogoport/front/store';

import Avatar from './avatar.svg';
import KycStatus from '../KycStatus';

import {
	Container,
	Name,
	Header,
	SwitchAccount,
	UserDetails,
	Footer,
	BusinessName,
} from './styles';

function MenuProfileHeader({ setShowChannelPartners }) {
	const { name, partner, partners } = useSelector(({ profile }) => profile);

	const {
		tnc_accepted,
		business_name,
		verifications,
		twin_importer_exporter_id,
	} = partner || {};

	return (
		<Container tnc_accepted={tnc_accepted}>
			<Avatar
				width="42px"
				height="42px"
				style={{ marginRight: 4, flexShrink: 0 }}
			/>

			<UserDetails>
				<Header>
					<Name>{name}</Name>

					{partners.length ? (
						<SwitchAccount
							onClick={() => {
								setShowChannelPartners(true);
							}}
						>
							Switch Account
						</SwitchAccount>
					) : null}
				</Header>

				{business_name && (
					<Footer>
						<BusinessName>{business_name}</BusinessName>

						<KycStatus
							verifications={verifications}
							twin_importer_exporter_id={twin_importer_exporter_id}
						/>
					</Footer>
				)}
			</UserDetails>
		</Container>
	);
}

export default MenuProfileHeader;
