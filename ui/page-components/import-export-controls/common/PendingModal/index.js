import { cl, Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';

import iconUrl from '../../utils/iconUrl.json';

import SameHsCode from './SameHsCode';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PendingModal({
	showPendingModal,
	setShowPendingModal,
	stop = false,
	btnSubtmitHandler,
}) {
	const { query = {}, billId = '' } = useRouter();
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const closeModalHandler = () => {
		// eslint-disable-next-line max-len
		const redirectUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/import-export-controls`;
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};

	return (
		<Modal className="primary md" show={showPendingModal} closable={false}>
			{billId ? (
				<>
					{!stop && (
						<div className={styles.container}>
							<img
								src={iconUrl.loadingBanner}
								alt="loading.."
								className={styles.loading_banner}
							/>
							<div className={styles.title}>Hang on! Checking payment status...</div>
							<img src={iconUrl.loading} alt="loading" className={styles.loading} />
						</div>
					)}
					{stop && (
						<div className={styles.container}>
							<IcMInformation fill="#FBDC00" width={52} height={52} />
							<div className={cl`${styles.text} ${styles.error}`}>
								Sorry, It took longer than usual. We will notify you once
								payment is successful
							</div>
							<Button themeType="linkUI" onClick={closeModalHandler}>
								Close
							</Button>
						</div>
					)}
				</>
			) : (
				<SameHsCode
					setShowPendingModal={setShowPendingModal}
					btnSubtmitHandler={btnSubtmitHandler}
				/>
			)}
		</Modal>
	);
}
export default PendingModal;
