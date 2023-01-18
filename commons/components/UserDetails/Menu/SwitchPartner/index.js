import { useSelector } from '@cogoport/front/store';

import Item from './Item';
import BackIcon from './icons/backIcon.svg';

import {
	Container,
	Header,
	Separator,
	List,
	FadeOutScale,
	StyledButton,
} from './styles';

function SwitchPartner({ setShowChannelPartners }) {
	const {
		profile: { partners },
		general: { pathname },
	} = useSelector(({ profile, general }) => ({ profile, general }));

	const onBack = () => {
		setShowChannelPartners(false);
	};

	return (
		<FadeOutScale type="enter">
			<Container>
				<Header>
					<BackIcon
						width="24px"
						height="24px"
						style={{ cursor: 'pointer' }}
						onClick={onBack}
					/>

					{pathname === '/get-started' ? null : (
						<StyledButton className="primary sm" as="a" href="/get-started">
							+ Add New Account
						</StyledButton>
					)}
				</Header>

				<Separator />

				<List>
					{partners.map((item) => (
						<Item key={item.id} item={item} />
					))}
				</List>
			</Container>
		</FadeOutScale>
	);
}

export default SwitchPartner;
