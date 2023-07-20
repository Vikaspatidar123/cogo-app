import { Avatar } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import KycStatus from '../KycStatus';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function MenuProfileHeader({ setShow }) {
	const { t } = useTranslation(['common']);
	const { name, organization, organizations } = useSelector(
		({ profile }) => profile,
	);
	const { business_name, kyc_status, account_type } = organization || {};

	return (
		<div className={styles.container}>
			<Avatar
				width="40px"
				height="40px"
				style={{ marginRight: 4, flexShrink: 0 }}
			/>

			<div className={styles.user_details}>
				<div className={styles.header}>
					<div className={styles.name}>{name}</div>

					{organizations?.length ? (
						<div
							className={styles.switch_account}
							onClick={() => {
								setShow(true);
							}}
							role="presentation"
						>
							{t('common:layouts_app_settings_switch_account')}
						</div>
					) : null}
				</div>

				{business_name && (
					<div className={styles.footer}>
						<div className={styles.business_name}>{business_name}</div>
						<KycStatus kyc_status={kyc_status} account_type={account_type} />
					</div>
				)}
			</div>
		</div>
	);
}

export default MenuProfileHeader;
