import { Button, Tooltip } from '@cogoport/components';
import { IcMPdf, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Document({ doc = {}, hsNumber = '' }) {
	const {
		docName = '',
		docLink = '',
		docExpNotes = '',
		docSource = '',
		docResponsibleParty = '',
	} = doc;

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

	const downloadHandler = () => {
		const url = `${process.env.BUSINESS_FINANCE_BASE_URL}
		/saas/pdf/trade-engine?docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber}`;
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
						<Button className={styles.download_btn} size="md" onClick={downloadHandler}>
							Download
						</Button>
					</div>
					<div className={styles.cta_mobile_view}>
						<Button className={styles.download_btn} size="md" onClick={downloadHandler}>
							<IcMDownload />
						</Button>
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
