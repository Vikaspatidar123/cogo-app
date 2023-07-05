import { Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function SameHsCode({ setShowPendingModal, btnSubtmitHandler }) {
	const { t } = useTranslation(['common', 'importExportControls']);
	return (
		<div className={styles.container}>
			<IcMAlert fill="#FBDC00" width={45} height={45} />
			<div className={styles.title}>
				{t('importExportControls:same_hscode_title')}
			</div>
			<div className={styles.btn_container}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => setShowPendingModal(false)}
				>
					{t('common:close')}
				</Button>
				<Button
					size="sm"
					className={styles.submit_btn}
					onClick={() => {
						btnSubtmitHandler();
						setShowPendingModal(false);
					}}
				>
					{t('common:proceed')}
				</Button>
			</div>
		</div>
	);
}

export default SameHsCode;
