import { cl } from '@cogoport/components';
import {
	IcCGreenCircle,
	IcCRedCircle,
	IcCYelloCircle,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getMapping = ({ t }) => {
	const TEXT_MAPPING = {
		Y: {
			text : t('iecResult:result_details_yes'),
			icon : <IcCGreenCircle width={12} height={12} />,
		},
		N: {
			text : t('iecResult:result_details_no'),
			icon : <IcCRedCircle width={12} height={12} />,
		},
		M: {
			text : t('iecResult:result_details_may'),
			icon : <IcCYelloCircle width={12} height={12} />,
		},
	};

	const TITLE_MAPPING = {
		IMPORT : t('iecResult:result_details_import_title'),
		EXPORT : t('iecResult:result_details_export_title'),
	};

	return { TEXT_MAPPING, TITLE_MAPPING };
};

function ResultDetails({ activeTab, controls = [], listClassName }) {
	const { t } = useTranslation(['iecResult']);
	const { TEXT_MAPPING, TITLE_MAPPING } = getMapping({ t });

	return (
		<div className={styles.container}>
			<div className={cl`${styles.result_heading} ${styles.text}`}>{TITLE_MAPPING[activeTab]}</div>

			<div className={styles.table_heading}>
				<div className={cl`${styles.header} ${styles.text}`}>
					{t('iecResult:result_details_title')}
				</div>
				<div className={styles.text}>{t('iecResult:result_title')}</div>
			</div>

			<div className={styles?.[listClassName]}>
				{(controls || [])?.map((control, index) => (
					<div
						key={`${control?.description}_${index + 1}`}
						className={styles.table_col}
					>
						<div className={styles.header}>{control?.description}</div>
						<div className={styles.table_content}>
							{TEXT_MAPPING?.[control?.status].icon}
							{TEXT_MAPPING?.[control?.status].text}
						</div>
					</div>
				))}
			</div>

		</div>
	);
}
export default ResultDetails;
