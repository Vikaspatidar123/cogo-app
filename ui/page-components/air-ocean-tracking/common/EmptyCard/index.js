import { ButtonIcon, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useState } from 'react';

import GET_MAPPING from '../../constant/card';
import ArchiveDelete from '../ArchiveDelete';

import styles from './styles.module.css';

function EmptyCard({ activeTab = '', type = '', input = '', shipmentId = '', refetchTrackerList }) {
	const [openModal, setOpenModal] = useState(false);
	const { CARD_TITLE, EMPTY_STATE_INFO } = GET_MAPPING?.[activeTab] || {};

	const closeHandler = () => setOpenModal(false);

	return (
		<div className={styles.container}>
			<div className={styles.flex_box}>
				<div className={styles.info}>
					{activeTab === 'ocean' ? CARD_TITLE?.[type] : CARD_TITLE }
					{' '}
					:
					{' '}
					{input}
				</div>
				<ButtonIcon icon={<IcMDelete />} onClick={() => setOpenModal(true)} />
			</div>

			<div className={styles.info_container}>
				<h3 className={styles.title}>Retrieving Tracking Data</h3>
				<p>
					{`Fetching data on this ${EMPTY_STATE_INFO} is
					taking longer than usual. We will inform you as soon as its available.`}
				</p>
			</div>

			<Modal show={openModal} onClose={closeHandler} closeOnOuterClick>
				<Modal.Header title="Delete Tracker" />
				<div className={styles.border} />
				<ArchiveDelete
					activeTab={activeTab}
					closeHandler={closeHandler}
					shipmentId={shipmentId}
					refetchTrackerList={refetchTrackerList}
				/>
			</Modal>
		</div>
	);
}

export default EmptyCard;
