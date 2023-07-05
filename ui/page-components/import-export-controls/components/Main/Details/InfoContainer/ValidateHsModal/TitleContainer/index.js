import { Tooltip, cl } from '@cogoport/components';
import { IcMInfo, IcAReports } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

function TitleContainer({ billId }) {
	const { t } = useTranslation(['importExportControls']);
	return (
		<>
			<div className={styles.title}>
				<IcAReports width={25} height={25} />
				<div className={styles.title}>{t('importExportControls:validate_modal_title')}</div>
			</div>
			{billId && (
				<dv className={`${styles.success_msg} ${styles.txt}`}>
					{t('importExportControls:validate_modal_subtitle_1')}
					<br />
					{' '}
					{t('importExportControls:validate_modal_subtitle_2')}
				</dv>
			)}
			<div className={styles.sub_heading}>
				<div className={cl`${styles.subheading} ${styles.row}`}>
					<div className={styles.txt}>
						<div className={styles.text}>{t('importExportControls:validate_modal_heading')}</div>
						<div className={styles.hr} />
					</div>
					<Tooltip
						content={(
							<div className={styles.txt}>
								{t('importExportControls:validate_modal_tooltip_content')}
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
