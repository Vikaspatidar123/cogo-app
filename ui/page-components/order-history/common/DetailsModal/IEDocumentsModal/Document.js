import { Tooltip, ButtonIcon } from '@cogoport/components';
import { IcMPdf, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

const renderDesc = (desc = '') => {
	if (desc?.length > 40) {
		return (
			<Tooltip content={desc} interactive>
				<span>
					{desc.substring(0, 40)}
					...
				</span>
			</Tooltip>
		);
	}
	return desc;
};

function Document({ doc = {}, hsNumber = '' }) {
	const {
		docName = '',
		docLink = '',
		docExpNotes = '',
		docSource = '',
		docResponsibleParty = '',
	} = doc;

	const downloadHandler = () => {
		const url = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}
		/saas/pdf/trade-engine?docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber || ''}`;
		window.open(url, '_self');
	};

	return (
		<div className={styles.doc_container}>
			<div className={styles.row_container}>
				<div className={`${styles.row} ${styles.header}`}>
					<div className={styles.name}>
						<IcMPdf width={20} height={20} className={styles.icon} />
						<span>{docName}</span>
					</div>
					<div className={styles.cta_web_view}>
						<IcMDownload className={styles.download_btn} size="md" onClick={downloadHandler}>
							Download
						</IcMDownload>
					</div>
					<div className={styles.cta_mobile_view}>
						<ButtonIcon
							className={styles.download_btn}
							icon={<IcMDownload />}
							themeType="primary"
							onClick={downloadHandler}
						/>
					</div>
				</div>
				<div className={`${styles.row} ${styles.row_mobile_view}`}>
					<div className={`${styles.info} ${styles.info_src}`}>
						<span className={styles.label}>Document Source: </span>
						<span className={styles.value}>{docSource || '--'}</span>
					</div>
					<div className={`${styles.info} ${styles.info_party}`}>
						<span className={styles.label}>Responsible Party: </span>
						<span className={styles.value}>{docResponsibleParty}</span>
					</div>
					<div className={`${styles.info} ${styles.desc_row}`}>
						<span className={styles.label}>Description: </span>
						<span className={styles.value}>{renderDesc(docExpNotes)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Document;
