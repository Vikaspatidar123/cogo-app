import { Button, Modal } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import { KycCampaign as KYC } from '@/ui/page-components/discover_rates/common/KYC';

function CheckKyc() {
	const { profile } = useSelector((state) => state);
	const { kyc_status, kyc_rejection_reason } = profile?.organization || {};
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<Image
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Data_security_14-removebg-preview.svg"
					alt="Kyc"
					width={60}
					height={60}
				/>
				<div>
					<div className={styles.heading}>
						KYC Verification is
						{' '}
						{kyc_status}
						!
					</div>
					<div className={styles.des}>
						{kyc_rejection_reason
							|| 'Kindly upload the required documents to proceed further.'}

					</div>
					<div className={styles.button}>
						{kyc_status !== 'verified' ? (
							<Button
								size="sm"
								themeType="linkUi"
								onClick={() => setOpen(true)}
								type="button"
							>
								Complete KYC
								<IcMArrowNext />
							</Button>
						) : null}
					</div>
				</div>
			</div>
			{open && (
				<Modal
					show={open}
					onClose={() => {
						setOpen(false);
					}}
				>
					<KYC onFinalSubmit={() => setOpen(false)} />
				</Modal>
			)}
		</div>
	);
}
export default CheckKyc;
