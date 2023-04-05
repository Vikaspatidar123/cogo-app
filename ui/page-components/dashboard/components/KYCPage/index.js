import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import ModalPage from './ModalPage';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function KYCPage() {
	const { push } = useRouter();
	const [open, setOpen] = useState(false);
	console.log(open);
	return (
		<>
			<div className={styles.image}>

				<div className={styles.inner}>
					<img
						className={styles.image1}
						src="	https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tds-doc-icon.svg"
						alt="img"
					/>
					<div className={styles.image2}>
						Please complete your KYC to Book Logisticss
					</div>
					<div className={styles.image3}>
						<Button
							onClick={() => { setOpen(true); }}
							// onClick={() => (
							// 	<ModalPage />
							// )}
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
				</div>
				<div className={styles.line}>
					<div className={styles.sub_line}>
						<div className={styles.lines}>
							<p className={styles.Account}>Your Account</p>
							<div>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/crown_new.svg"
									alt="img"
								/>
								<span className={styles.standard}>Standard</span>
							</div>
						</div>
						<div
							role="presentation"
							className={styles.Benifits}
							onClick={() => push('/saas/cogo-subscriptions/manage-subscription')}
						>
							<p className={styles.text}>view Benifits</p>
							{/* <img
								className={styles.arrow}
								src="IcMArrowNext"
								alt="img"
							/> */}
							<IcMArrowNext className={styles.arrow} />
						</div>
					</div>

				</div>

			</div>
			<div />
		</>
	);
}
export default KYCPage;
