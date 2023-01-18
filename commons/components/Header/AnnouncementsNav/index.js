import { useState } from 'react';

import Horn from './horn.svg';
import Announcements from './Announcements';
import CustomTooltip from '../CustomTooltip';

import { Container } from './styles';

function AnnouncementsNav() {
	const [show, setShow] = useState(false);

	return (
		<>
			<CustomTooltip message="Announcements">
				<Container>
					<Horn
						width="18px"
						height="18px"
						style={{ marginRight: 16 }}
						onClick={() => setShow(true)}
					/>
				</Container>
			</CustomTooltip>

			<Announcements
				show={show}
				onClose={() => {
					setShow(false);
				}}
			/>
		</>
	);
}

export default AnnouncementsNav;
