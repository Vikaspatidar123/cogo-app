import { cl, Button, Tooltip } from '@cogoport/components';
import { IcMPdf, IcMDownload } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

const downloadHandler = ({ docLink, docName, hsNumber }) => {
	const url = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/trade-engine/pdf?`
    + `docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber}`;
	window.open(url);
};

const renderDesc = (desc = '') => {
	if (desc?.length > 50) {
		return (
			<Tooltip content={desc} interactive>
				<span>
					{desc.substring(0, 50)}
					...
				</span>
			</Tooltip>
		);
	}
	return desc || '--';
};

function Document({ doc = {}, hsNumber = '' }) {
	const {
		docName = '',
		docLink = '',
		docExpNotes = '',
		docSource = '',
		docResponsibleParty = '',
	} = doc;

	const { t } = useTranslation(['iedResult']);

	return (
		<div className={styles.doc_container}>
			<div className={styles.row_container}>
				<div className={cl`${styles.row} ${styles.header}`}>
					<div className={styles.name}>
						<IcMPdf width={20} height={20} className={styles.icon} />
						<span>{docName}</span>
					</div>
					<div className={styles.cta_web_view}>
						<Button themeType="linkUi" onClick={() => downloadHandler({ docLink, docName, hsNumber })}>
							{t('iedResult:result_download')}
						</Button>

					</div>
					<div className={styles.cta_mobile_view}>
						<Button themeType="linkUi" onClick={() => downloadHandler({ docLink, docName, hsNumber })}>
							<IcMDownload />
						</Button>
					</div>
				</div>
				<div className={cl`${styles.row} ${styles.row_mobile_view}`}>
					<div className={cl`${styles.info} ${styles.info_src}`}>
						<span className={styles.label}>{t('iedResult:result_doc_label_1')}</span>
						<span className={styles.value}>{docSource || '--'}</span>
					</div>
					<div className={cl`${styles.info} ${styles.info_party}`}>
						<span className={styles.label}>{t('iedResult:result_doc_label_2')}</span>
						<span className={styles.value}>{docResponsibleParty}</span>
					</div>
					<div className={cl`${styles.info} ${styles.desc_row}`}>
						<span className={styles.label}>{t('iedResult:result_doc_label_3')}</span>
						<span className={styles.value}>{renderDesc(docExpNotes)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Document;
