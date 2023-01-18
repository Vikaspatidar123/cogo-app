import { useEffect, useState } from 'react';

import { useSelector } from '@cogoport/front/store';
import { Popover } from '@cogoport/front/components';
import { startCase } from '@cogoport/front/utils';

import Menu from './Menu';
import DownArrow from './ic-dropdown-toggle.svg';

import { Container, ContainerFlex, BussinessName } from './styles';

function UserName() {
	const { name, partner = {} } = useSelector(({ profile }) => profile);

	const { business_name } = partner;

	const [showPopover, setShowPopover] = useState(false);
	console.log(showPopover, 'isIt?');
	const [showChannelPartners, setShowChannelPartners] = useState(false);

	useEffect(() => {
		if (showPopover) {
			setShowChannelPartners(false);
		}
	}, [showPopover]);

	const renderBody = () => (
		<Menu
			setShowPopover={setShowPopover}
			showChannelPartners={showChannelPartners}
			setShowChannelPartners={setShowChannelPartners}
		/>
	);

	return (
		<Container>
			<Popover
				placement="bottom-end"
				animation="shift-away"
				content={renderBody()}
				theme="light"
				visible={showPopover}
				onClickOutside={() => setShowPopover(!showPopover)}
				interactive
			>
				<ContainerFlex
					style={{ cursor: 'pointer' }}
					onClick={() => setShowPopover(!showPopover)}
				>
					<BussinessName bold marginLeft={6} size={14} color="#333">
						{startCase(business_name) || startCase(name)}
					</BussinessName>
					<DownArrow width={16} height={8} style={{ marginLeft: 16 }} />
				</ContainerFlex>
			</Popover>
		</Container>
	);
}

export default UserName;
