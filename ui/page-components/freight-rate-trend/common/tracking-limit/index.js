import { Button, Modal } from '@cogoport/components';
import React from 'react';
import { useSelector } from 'react-redux';

// import IconCross1 from '../../icons/cross.svg';
// import IconCross from '../../icons/cross1.svg';
// import IconTrackingLimit from '../../icons/tracking-limit.svg';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrackingLimitModal({ closeModal, overflow = 'auto' }) {
	const { isMobile } = useSelector((state) => state);
	const { push } = useRouter();

	const Component = isMobile ? styles.container : Modal;
	return (
		<Component isOpen overflow={overflow}>
			{isMobile && (
				<div
					role="presentation"
					className={styles.mobile_icon_container}
					onClick={closeModal}
					id="air_sch_tracking_limit_close_btn_mb"
				>
					{/* <IconCross1 size={1.5} style={{ fill: 'white' }} /> */}
				</div>
			)}
			<div className={styles.flex}>
				<div
					className={styles.icon_container}
					role="presentation"
					onClick={closeModal}
					id="air_sch_tracking_limit_close_btn"
				>
					{/* <IconCross size={1} style={{ fill: 'black' }} /> */}
				</div>
			</div>
			<div>
				{isMobile ? (
					<>
						<div className={styles.mobile_content}>
							{/* <IconTrackingLimit
								style={{ width: '300px', height: '100px', marginBottom: 32 }}
							/> */}
							<div className={styles.text}>
								UPGRADE TRACKING LIMIT
							</div>
							<div className={styles.txt1}>
								To tracker more please upgrade your plan or wait till one of your tracking
								requests to gets over.
							</div>
						</div>
						<div
							role="presentation"
							className={styles.mobile_content}
							onClick={() => push('/saas/cogo-subscriptions/manage-subscription')}
							id="air_sch_upgrade_plan"
						>
							UPGRADE PLAN
						</div>
					</>
				) : (
					<div className={styles.content}>
						{/* <IconTrackingLimit
							style={{ width: '400px', height: '100px', marginBottom: 32 }}
						/> */}
						<div className={styles.text}>
							UPGRADE TRACKING LIMIT
						</div>
						<div className={styles.txt1}>
							To track more please upgrade your plan or wait till one of your tracking
							requests to gets over.
						</div>
						<Button
							size="lg"
							variant="primary"
							style={{ marginTop: 32 }}
							onClick={() => push('/saas/cogo-subscriptions/manage-subscription')}
							id="air_sch_upgrade_plan"
						>
							UPGRADE PLAN
						</Button>
					</div>
				)}
			</div>
		</Component>
	);
}

export default TrackingLimitModal;
