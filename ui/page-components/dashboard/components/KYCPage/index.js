import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import ModalPage from './ModalPage';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function KYCPage() {
	const [open, setOpen] = useState(false);
	const { push } = useRouter();

	return (
		<div className={styles.image}>
			<div className={styles.inner}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tds-doc-icon.svg"
					alt="img"
					height={30}
					width={30}
				/>
				<div className={styles.display_text}>
					Please complete your KYC to Book Logisticss
				</div>

				<Button
					onClick={() => { setOpen(true); }}
					size="md"
					themeType="accent"
				>
					SUBMIT KYC

				</Button>
				{open && (
					<ModalPage
						open={open}
						setOpen={setOpen}
					/>
				)}
			</div>

			<div className={styles.line}>
				<div>
					Your Account
					<div className={styles.flex}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/crown_new.svg"
							alt="img"
							height={20}
							width={20}
						/>
						<span className={styles.standard}>Standard</span>
					</div>
				</div>
				<div
					style={{ display: 'flex' }}
					role="presentation"
					onClick={() => push('/saas/cogo-subscriptions/manage-subscription')}
				>
					<p className={styles.text}>view Benefits</p>
					<IcMArrowNext className={styles.arrow} />
				</div>
			</div>
		</div>
	);
}
export default KYCPage;
