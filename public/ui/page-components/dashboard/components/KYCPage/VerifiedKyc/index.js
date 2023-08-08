import { IcCFtick, IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function VerifiedKyc({ is_free_plan, plan_name }) {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.image}>

			<div className={styles.inner}>
				<IcCFtick width={34} height={34} />
				<div className={styles.status_text}>
					<strong>{t('dashboard:kycStatus_text_6')}</strong>
				</div>
				<div className={styles.image2}>
					{t('dashboard:kycStatus_text_1')}
				</div>
			</div>
			<div className={styles.line}>
				<div className={styles.sub_line}>
					<div className={styles.lines}>
						<p className={styles.Account}>{t('dashboard:kycStatus_text_2')}</p>
						<div>
							{is_free_plan === false && (
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/crown_new.svg"
									alt="img"
								/>
							)}
							<span className={styles.standard}>{plan_name}</span>
						</div>
					</div>
					<div
						className={styles.Benifits}
						role="presentation"
						onClick={() => push('/saas/cogo-subscriptions/manage-subscription')}
					>
						<p className={styles.text}>
							{is_free_plan === false
								? t('dashboard:kycStatus_text_4')
								: t('dashboard:kycStatus_text_5')}

						</p>
						<IcMArrowNext className={styles.arrow} />
					</div>
				</div>

			</div>

		</div>
	);
}
export default VerifiedKyc;
