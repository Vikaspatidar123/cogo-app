import { Button } from '@cogoport/components';
import { IcMDeviation } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useFetchStoreQuota from '../../hooks/useFetchStoreQuota';
import AddTrackerModal from '../AddTracker';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Header() {
	const { loading, quotaCount } = useFetchStoreQuota();
	const { general } = useSelector((s) => s);
	const [isAddTrackerModalOpen, setAddTrackerModal] = useState(general?.query?.openModal);
	const [show, setShow] = useState(false);
	console.log(general?.query, 'general');
	useEffect(() => {
		if (general?.query?.redirect === 'true') {
			setAddTrackerModal(true);
			// setShowJoyride(false);
		}
	}, []);
	const handleAddTrackerModal = () => {
		setAddTrackerModal(!isAddTrackerModalOpen);
		setShow(!show);
	};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.heading}>Container Track & Trace</div>
				<div className={styles.upgrade_container}>
					<IcMDeviation />
					<div className={styles.text}>
						Tracker Remaining (
						{quotaCount}
						)
					</div>
					<Button themeType="accent" size="sm" loading={loading}>Upgrade</Button>
				</div>
				<div className={styles.button_container}>
					<div className={styles.status}>Manage status report</div>
					<Button onClick={() => handleAddTrackerModal()}>Create New</Button>
				</div>
			</div>
			{show && (
				<AddTrackerModal show={show} overflow="auto" />
			)}
		</div>
	);
}
export default Header;
