import {
	IcMEnquiriesReceived,
	IcMWasteScrap,
	IcMEdit,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import usePutArchiveUnarchiveStatus from '../../../../../hooks/usePutArchiveUnarchiveStatus';
import ArchiveModal from '../ArchivedModal';
import DeleteModal from '../DeleteModal';

import styles from './styles.module.css';

function Popover({
	itemData,
	deleteTradeParty,
	deleteLoading,
	setShowModal,
	setTradePartyDetails,
	setIsEdit,
	archived,
	getList,
}) {
	const { t } = useTranslation(['tradePartner']);
	const [deleteModal, setDeleteModal] = useState(false);
	const [archive, setArchive] = useState(false);
	const { tradePartyStatus } = usePutArchiveUnarchiveStatus({
		archived,
		getList,
		setArchive,
	});

	const onSubmit = () => {
		tradePartyStatus(itemData);
	};

	return (
		<div>
			{!archived && (
				<div
					className={styles.div}
					role="presentation"
					onClick={() => {
						setIsEdit(true);
						setTradePartyDetails(itemData);
						setShowModal(true);
					}}
				>
					<IcMEdit className={styles.icon} />
					<div className={styles.label}>{t('tradePartner:item_popover_text_1')}</div>
				</div>
			)}
			<div
				className={styles.div}
				role="presentation"
				onClick={() => setArchive(true)}
			>
				<IcMEnquiriesReceived className={styles.icon} />
				<div className={styles.label}>
					{!archived ? t('tradePartner:archive_modal_text_2') : t('tradePartner:archive_modal_text_3')}
				</div>
			</div>
			{!archived && itemData?.totalQuotes <= 0 && (
				<div
					className={styles.div}
					role="presentation"
					onClick={() => setDeleteModal(true)}
				>
					<IcMWasteScrap className={styles.icon} />
					<div className={styles.label}>{t('tradePartner:item_popover_text_2')}</div>
				</div>
			)}
			{deleteModal && (
				<DeleteModal
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
					deleteTradeParty={deleteTradeParty}
					deleteLoading={deleteLoading}
					itemData={itemData}
				/>
			)}
			{archive && (
				<ArchiveModal
					archive={archive}
					setArchive={setArchive}
					onSubmit={onSubmit}
					archived={archived}
				/>
			)}
		</div>
	);
}
export default Popover;
