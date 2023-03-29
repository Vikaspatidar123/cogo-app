import { Button } from '@cogoport/components';
import { IcMDeviation } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useFetchStoreQuota from '../../hooks/useFetchStoreQuota';
import AddTrackerModal from '../AddTracker';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function Header() {
	const { loading, quotaCount } = useFetchStoreQuota();
	const { general } = useSelector((s) => s);
	const [isAddTrackerModalOpen, setAddTrackerModal] = useState(general?.query?.openModal);
	const [show, setShow] = useState(false);
	const { push } = useRouter();

	const handelRouting = () => {
		push('/saas/cogo-subscriptions/manage-subscription');
	};

	useEffect(() => {
		if (general?.query?.redirect === 'true') {
			setAddTrackerModal(true);
		}
	}, [general?.query?.redirect]);
	const handleAddTrackerModal = () => {
		setAddTrackerModal(!isAddTrackerModalOpen);
		setShow(!show);
	};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.heading}>Air Cargo Tracking</div>
				<div className={styles.upgrade_container}>
					<IcMDeviation />
					<div className={styles.text}>
						Tracker Remaining (
						{quotaCount}
						)
					</div>
					<Button
						themeType="accent"
						size="sm"
						loading={loading}
						onClick={() => handelRouting}
					>
						Upgrade
					</Button>
				</div>
				<Button onClick={() => handleAddTrackerModal()}>Create New</Button>
			</div>
			{show && (
				<AddTrackerModal show={show} overflow="auto" onclose={() => setShow(!show)} />
			)}
		</div>
	);
}
export default Header;
