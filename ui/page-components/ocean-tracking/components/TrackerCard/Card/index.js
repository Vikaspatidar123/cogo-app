import { FluidContainer } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';

import BottomContainer from './BottomContainer';
import DetailsList from './DetailsList';
import Stepper from './Stepper';
import styles from './styles.module.css';

function Card({ trackerDetails }) {
	return (
		<FluidContainer className={styles.container}>
			<div className={styles.head}>
				<div className={styles.booking_no}>
					{trackerDetails.type === 'CONTAINER_NO' ? 'Container No:' : 'BL/Booking no:'}
					{' '}
					{trackerDetails.input}

				</div>
				<div className={styles.icon_style}>
					<IcMOverflowDot />
				</div>
			</div>
			<div className={styles.child_container}>
				<div className={styles.stepper}>
					<Stepper trackerDetails={trackerDetails} />
				</div>
				<div className={styles.dashed_line} />
				<FluidContainer className={styles.details_list}>
					<DetailsList />
				</FluidContainer>
			</div>
			<div className={styles.bottom_container}>
				<BottomContainer trackerDetails={trackerDetails} />
			</div>
		</FluidContainer>
	);
}
export default Card;
