import { useState } from 'react';
import { useRouter } from '@/temp/next';
import { get, startCase } from '@cogoport/front/utils';
import { useSelector } from '@cogoport/front/store';
import {
	ArrowIconContainer,
	BorderLine,
	ButtonText,
	Container,
	ProfileContainer,
	StyledButton,
	ToolsContaioner,
} from './styles';
import MenuProfileHeader from '../Menu/MenuProfileHeader';
import SwitchPartner from '../Menu/SwitchPartner';
import ArrowIcon from '../Menu/icons/Vector.svg';
import navigationsMenu from './navigation.json';
import Logout from '../Menu/Logout';

function MobileMenu() {
	const {
		profile: { partner },
	} = useSelector((reduxState) => reduxState);

	const { twin_importer_exporter_id, twin_service_provider_id, verifications } =
		partner;

	const status = get(verifications, '[0].kyc_status');

	const accountTypes = [
		twin_importer_exporter_id ? 'importer_exporter' : '',
		twin_service_provider_id ? 'service_provider' : '',
	].filter((accountType) => accountType);

	const { push } = useRouter();

	const [showChannelPartners, setShowChannelPartners] = useState(false);

	if (showChannelPartners) {
		return <SwitchPartner setShowChannelPartners={setShowChannelPartners} />;
	}

	const navigationMapping = [];
	navigationsMenu.forEach((navigationItem) => {
		if (status === 'verified' || !!get(navigationItem, 'show.notKycVerified')) {
			const navigationAccountTypes = get(navigationItem, 'account_type') || [];

			const isAccountTypePresent = accountTypes.some((accType) => {
				return navigationAccountTypes.includes(accType);
			});

			if (isAccountTypePresent) {
				navigationMapping.push(navigationItem);
			}
		}
	});

	return (
		<Container>
			<ProfileContainer>
				<MenuProfileHeader setShowChannelPartners={setShowChannelPartners} />
			</ProfileContainer>
			<BorderLine />

			{navigationMapping.map((menuItem) => {
				return (
					<ToolsContaioner key={menuItem.href}>
						<StyledButton onClick={() => push(menuItem.as)}>
							<ButtonText>{startCase(menuItem.label)}</ButtonText>

							<ArrowIconContainer>
								<ArrowIcon />
							</ArrowIconContainer>
						</StyledButton>

						<BorderLine />
					</ToolsContaioner>
				);
			})}

			<Logout />
		</Container>
	);
}

export default MobileMenu;
