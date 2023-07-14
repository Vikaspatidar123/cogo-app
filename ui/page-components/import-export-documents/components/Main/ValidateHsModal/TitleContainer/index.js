import { cl, Tooltip } from '@cogoport/components';
import { IcMInfo, IcAReports } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

function TitleContainer({ billId }) {
	const { t } = useTranslation(['importExportDoc']);
	return (
		<>
			<div className={styles.title_container}>
				<IcAReports width={25} height={25} />
				<div className={styles.title}>{t('importExportDoc:validate_modal_title')}</div>
			</div>
			{billId && (
				<div className={cl`${styles.txt} ${styles.success_msg}`}>
					{t('importExportDoc:validate_modal_subtitle_1')}
					<br />
					{' '}
					{t('importExportDoc:validate_modal_subtitle_2')}
				</div>
			)}
			<div>
				<div className={cl`${styles.row_container} ${styles.subheading}`}>
					<div className={styles.txt}>
						<div className={styles.text}>{t('importExportDoc:validate_modal_heading')}</div>
						<div className={styles.hr} />
					</div>
					<Tooltip
						content={(
							<div className={styles.txt}>
								{t('importExportDoc:validate_modal_tooltip_content')}
							</div>
						)}
						interactive
						placement="top"
					>
						<div>
							<IcMInfo height={13} width={13} fill="#F68B21" />
						</div>
					</Tooltip>
				</div>
			</div>
		</>
	);
}

export default TitleContainer;
