import { cl } from '@cogoport/components';
import { IcAPlan, IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';

function Header({ title = '', back = false, redirect = false }) {
	const { push, back: routerBack } = useRouter();

	const { t } = useTranslation(['importExportControls']);

	const redirectToHome = () => {
		if (redirect) {
			push('/saas/premium-services/import-export-controls');
		}
	};
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${back ? styles.back_container : ''}`}>
				{back ? (
					<IcMArrowBack
						width={20}
						height={20}
						className={styles.back_icon}
						onClick={routerBack}
					/>
				) : (
					<IcAPlan
						width={30}
						height={30}
						className={redirect ? styles.back_icon : ''}
						onClick={redirectToHome}
					/>
				)}
				<div className={styles.title}>{title}</div>
			</div>
			{!back && (
				<div className={styles.logo}>
					<Image
						src={iconUrl.cogoLogo}
						alt={t('importExportControls:logo')}
						width={200}
						height={200}
					/>
				</div>
			)}
		</div>
	);
}

export default Header;
