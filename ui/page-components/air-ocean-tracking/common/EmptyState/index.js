import { Button, Modal } from '@cogoport/components';
import Image from 'next/image';
import { useState } from 'react';

import useRedirectFn from '../../hooks/useRedirectFn';
import ArchiveDelete from '../ArchiveDelete';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState() {
	const { query } = useRouter();
	const { trackingType = '', trackingId = '', isFirstVisit = false } = query;
	const [deleteModal, setDeleteModal] = useState(false);

	const { redirectToDashboard } = useRedirectFn();
	const closeHandler = () => setDeleteModal(false);
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading_banner}
				width={300}
				height={200}
				alt="loading"
			/>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading}
				width={40}
				height={40}
				alt="loading"
			/>

			<div>
				<h3>Retrieving Tracking Data</h3>
				<p>
					Fetching data on this container / shipment is taking longer than usual.
					We will inform you as soon as it&apos;s available.
				</p>
			</div>
			{isFirstVisit && (
				<div>
					<Button
						className={styles.back_btn}
						onClick={redirectToDashboard}
						type="button"
					>
						GO BACK &amp; KEEP TRACKING

					</Button>
					<Button
						themeType="linkUi"
						onClick={() => setDeleteModal(true)}
						type="button"
					>
						Delete tracker &amp; restore balance

					</Button>
				</div>
			)}
			<Modal show={deleteModal} closeOnOuterClick onClose={closeHandler}>
				<Modal.Header title="Delete Tracker" />
				<div className={styles.line} />
				<ArchiveDelete
					shipmentId={trackingId}
					activeTab={trackingType}
					closeHandler={closeHandler}
					src="trackingDetails"
				/>
			</Modal>
		</div>
	);
}

export default EmptyState;
