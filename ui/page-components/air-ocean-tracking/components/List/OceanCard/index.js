import { Placeholder } from '@cogoport/components';
import { useMemo, useState } from 'react';

import CardInfo from '../../../common/CardInfo';
import CardPopover from '../../../common/CardPopover';
import EmptyCard from '../../../common/EmptyCard';
import getLoadingArr from '../../../utils/getLoadingArr';

import ContainerInfo from './ContainerInfo';
import Footer from './Footer';
import Stepper from './Stepper';
import styles from './styles.module.css';

const LOADING_ARR = getLoadingArr(3);

function Card({ listItem = {}, loading = false, activeTab, setModalInfo }) {
	const [activeContainerIndex, setActiveContainerIndex] = useState(1);
	const [showPopover, setShowPopover] = useState(false);

	const {
		id = '',	type = '', input = '', container_details = [], milestones = [], shipping_line = {},
		shipment_info = {}, updated_at = '', action = {}, tracking_status = '',
	} = listItem || {};

	const isTrackerEmpty = tracking_status !== 'Found';

	const { currentMilestone, currentContainer, currentContainerAction, containerDetailsLength } = useMemo(() => ({
		currentMilestone       : milestones?.[activeContainerIndex - 1],
		currentContainer       : container_details?.[activeContainerIndex - 1],
		currentContainerAction : action?.[activeContainerIndex - 1],
		containerDetailsLength : container_details.length,
	}), [action, activeContainerIndex, container_details, milestones]);

	if (isTrackerEmpty && !loading) {
		return (
			<EmptyCard type={type} input={input} activeTab={activeTab} shipmentId={id} />
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>

				<div className={styles.stepper_container}>
					{loading ? (
						<div className={styles.skeleton_loader}>
							{LOADING_ARR.map((ele) => (
								<Placeholder key={ele} height="30px" margin="0px 0px 20px 0px" />
							))}
						</div>
					) : (
						<>
							<CardInfo activeTab={activeTab} type={type} input={input} />
							<Stepper
								currentMilestone={currentMilestone}
								lineInfo={shipping_line}
								activeTab={activeTab}
							/>
						</>
					)}
				</div>

				<div className={styles.dashed_line} />

				<div className={styles.container_details}>
					<div className={styles.container_info}>
						<ContainerInfo
							currentContainer={currentContainer}
							shipmentInfo={shipment_info}
							activeContainerIndex={activeContainerIndex}
							setActiveContainerIndex={setActiveContainerIndex}
							containerDetailsLength={containerDetailsLength}
							activeTab={activeTab}
							loading={loading}
						/>
					</div>
					<div className={styles.setting}>
						<CardPopover
							showPopover={showPopover}
							setShowPopover={setShowPopover}
							setModalInfo={setModalInfo}
							id={id}
						/>
					</div>
				</div>

			</div>
			<Footer
				lastUpdated={updated_at}
				currentMilestone={currentMilestone}
				currentContainerAction={currentContainerAction}
			/>
		</div>
	);
}

export default Card;
