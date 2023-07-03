import { cl, Button, Tooltip } from '@cogoport/components';
import { IcMPdf, IcMDownload, IcMEyeopen } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function Document({ doc = {}, hsNumber = '' }) {
	const {
		docName = '',
		docLink = '',
		docExpNotes = '',
		docSource = '',
		docResponsibleParty = '',
	} = doc;

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

	const previewHandler = () => {
		if (typeof window !== 'undefined') {
			window.open(docLink, '_blank');
		}
	};
	const downloadHandler = () => {
		const url = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/pdf/trade-engine/?`
		+ `docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber || ''}`;
		window.open(url);
	};

	return (
		<div className={styles.doc_container}>
			<div className={styles.row_container}>
				<div className={cl`${styles.row} ${styles.header}`}>
					<div className={styles.name}>
						<IcMPdf width={20} height={20} className={styles.icon} />
						<span>{docName}</span>
					</div>
					<div className={styles.cta_web_view}>
						<Button className={styles.download_btn} themeType="linkUi" onClick={downloadHandler}>
							Download
						</Button>

						<Button themeType="linkUi" onClick={previewHandler}>
							Preview
						</Button>
					</div>
					<div className={styles.cta_mobile_view}>
						<Button className={styles.download_btn} themeType="linkUi" onClick={downloadHandler}>
							<IcMDownload />
						</Button>

						<Button themeType="linkUi" onClick={previewHandler}>
							<IcMEyeopen />
						</Button>
					</div>
				</div>
				<div className={cl`${styles.row} ${styles.row_mobile_view}`}>
					<div className={cl`${styles.info} ${styles.info_src}`}>
						<span className={styles.label}>Document Source: </span>
						<span className={styles.value}>{docSource || '--'}</span>
					</div>
					<div className={cl`${styles.info} ${styles.info_party}`}>
						<span className={styles.label}>Responsible Party: </span>
						<span className={styles.value}>{docResponsibleParty}</span>
					</div>
					<div className={cl`${styles.info} ${styles.desc_row}`}>
						<span className={styles.label}>Description: </span>
						<span className={styles.value}>{renderDesc(docExpNotes)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Document;
