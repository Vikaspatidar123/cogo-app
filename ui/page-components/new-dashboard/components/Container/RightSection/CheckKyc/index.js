import { Button, Modal } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { KycCampaign as KYC } from '@/ui/page-components/discover_rates/common/KYC';

function CheckKyc() {
	const { t } = useTranslation(['dashboard']);

	const { profile } = useSelector((state) => state);
	const { kyc_status, kyc_rejection_reason } = profile?.organization || {};

	const [open, setOpen] = useState(false);

	return (
		<div className={`${styles.container} ${kyc_status === 'verified' ? styles.verified : styles.panding}`}>
			<div className={styles.box}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.kyc_image}
					alt={t('dashboard:cogo_logo')}
					width={60}
					height={60}
				/>

				<div>
					<div className={styles.heading}>
						{t('dashboard:kyc_text_1')}
						{' '}
						{kyc_status}
						!
					</div>

					<div className={styles.des}>
						{kyc_status === 'verified' ? t('dashboard:verified_text')
							: kyc_rejection_reason || t('dashboard:kyc_text_2')}
					</div>

					<div className={styles.button}>
						{kyc_status !== 'verified' ? (
							<Button
								size="sm"
								themeType="linkUi"
								onClick={() => setOpen(true)}
								type="button"
							>
								{t('dashboard:kyc_complete_button_text')}
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
