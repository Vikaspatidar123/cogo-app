import { useMemo, useState } from 'react';

import ContainerInfo from './ContainerInfo';
import Footer from './Footer';
import Stepper from './Stepper';
import styles from './styles.module.css';

const TITLE_MAPPING = {
	CONTAINER_NO       : 'Container No.',
	'BOOKING_NO/BL_NO' : 'BL/Booking No:',
};

function Card({ listItem = {} }) {
	const [activeContainerIndex, setActiveContainerIndex] = useState(1);
	const {
		type = '', input = '', container_details = [], milestones = [], shipping_line = {},
		shipment_info = {},
	} = listItem || {};

	const currentMilestone = useMemo(() => milestones?.[activeContainerIndex - 1], [activeContainerIndex, milestones]);
	const currentContainer = useMemo(
		() => container_details?.[activeContainerIndex - 1],
		[activeContainerIndex, container_details],
	);
	const containerDetailsLength = container_details.length;
	return (
		<div className={styles.container}>
			<div className={styles.main_body}>
				<div className={styles.stepper_container}>
					<div className={styles.header}>
						{TITLE_MAPPING?.[type]}
						{' '}
						:
						{' '}
						{input}
					</div>
					<Stepper currentMilestone={currentMilestone} shippingLine={shipping_line} />
				</div>
				<div className={styles.dashed_line} />
				<div className={styles.container_details}>
					<ContainerInfo
						currentContainer={currentContainer}
						shipmentInfo={shipment_info}
						activeContainerIndex={activeContainerIndex}
						setActiveContainerIndex={setActiveContainerIndex}
						containerDetailsLength={containerDetailsLength}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Card;
