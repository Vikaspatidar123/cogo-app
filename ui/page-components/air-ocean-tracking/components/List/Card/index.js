import { Placeholder, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useMemo, useState } from 'react';

import { LOADING_ARR, TITLE_MAPPING } from '../../../constant/card';

import ContainerInfo from './ContainerInfo';
import Content from './Content';
import Footer from './Footer';
import Stepper from './Stepper';
import styles from './styles.module.css';

function Card({ listItem = {}, loading = false, setModalInfo }) {
	const [activeContainerIndex, setActiveContainerIndex] = useState(1);
	const [showPopover, setShowPopover] = useState(false);

	const {
		id = '',	type = '', input = '', container_details = [], milestones = [], shipping_line = {},
		shipment_info = {}, updated_at = '', action = {},
	} = listItem || {};

	const { currentMilestone, currentContainer, currentContainerAction, containerDetailsLength } = useMemo(() => ({
		currentMilestone       : milestones?.[activeContainerIndex - 1],
		currentContainer       : container_details?.[activeContainerIndex - 1],
		currentContainerAction : action?.[activeContainerIndex - 1],
		containerDetailsLength : container_details.length,
	}), [action, activeContainerIndex, container_details, milestones]);

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
							<div className={styles.header}>
								{TITLE_MAPPING?.[type]}
								{' '}
								:
								{' '}
								{input}
							</div>
							<Stepper currentMilestone={currentMilestone} shippingLine={shipping_line} />
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
							loading={loading}
						/>
					</div>
					<div className={styles.setting}>
						<Popover
							placement="bottom"
							caret={false}
							visible={showPopover}
							onClickOutside={() => setShowPopover(false)}
							content={(
								<Content
									setModalInfo={setModalInfo}
									setShowPopover={setShowPopover}
									id={id}
								/>
							)}
						>
							<IcMOverflowDot onClick={() => setShowPopover(true)} />
						</Popover>
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
