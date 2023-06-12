import { cl, Button } from '@cogoport/components';

import useDeleteTracker from '../../hooks/useDeleteTracker';

import styles from './styles.module.css';

const TITLE_MAPPING = {
	archive : 'archive',
	delete  : 'delete',
};

function ArchiveDelete({ name = 'delete', shipmentId = '', closeHandler, activeTab = 'ocean', refetchTrackerList }) {
	const { loading, deleteArchiveHandler } = useDeleteTracker({
		name,
		id: shipmentId,
		closeHandler,
		activeTab,
		refetchTrackerList,
	});

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>
				{`Are you sure, you want to ${TITLE_MAPPING?.[name]} this tracker ?`}
			</div>
			<div className={cl`${styles.flex_box} ${styles.footer}`}>
				<Button themeType="secondary" type="button" onClick={closeHandler} disabled={loading}>No</Button>
				<Button
					themeType="accent"
					className={styles.submit}
					type="button"
					loading={loading}
					onClick={deleteArchiveHandler}
				>
					Yes
				</Button>
			</div>
		</div>

	);
}

export default ArchiveDelete;
