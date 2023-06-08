import { Modal, Button, cl } from '@cogoport/components';
import { useState } from 'react';

import { KycCampaign as KYC } from '../KYC';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function KYCDialog() {
	const { push } = useRouter();
	const { isMobile } = useSelector(({ general, profile }) => ({
		isMobile   : general?.isMobile,
		kyc_status : profile?.organization?.kyc_status,
	}));
	const [show, setShow] = useState(false);
	const text = 'You have exhausted your balance of available searches.'
	+ 'Buy more searches and discover rates across FCL, LCL, Air and Haulage in one place.';
	return (
		<div className={cl`${styles.flex} ${styles.card}`}>
			<Modal
				show={show}
				onClose={() => {
					setShow(false);
				}}
				closable
				width={750}
			>
				<KYC onFinalSubmit={() => setShow(false)} />
			</Modal>
			<div
				className={styles.text_card}
			>
				<div width={!isMobile ? 480 : '100%'}>
					<text className={styles.text}>{text}</text>

					<div className={styles.button}>
						<Button
							onClick={() => push(
								'/saas/cogo-subscriptions/manage-subscription',
								'/saas/cogo-subscriptions/manage-subscription',
							)}
						>
							BUY MORE SEARCHES
						</Button>
					</div>
				</div>

				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nogstIcon.svg"
						alt="loading"
						style={{ marginRight: !isMobile ? 48 : 0 }}
						height={160}
						width={160}
					/>
				</div>
			</div>
		</div>
	);
}

export default KYCDialog;
