import { Tooltip } from '@cogoport/components';
import { IcMPdf, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { downloadDocument } from '@/ui/commons/utils/downloadDocument';

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

	return (
		<div className={styles.doc_container}>
			<div className={styles.row_container}>
				<div className={`${styles.row} ${styles.header}`}>
					<div className={styles.name}>
						<IcMPdf width={20} height={20} className={styles.icon} />
						<span>{docName}</span>
					</div>
					<div>
						<IcMDownload
							className={styles.download_btn}
							size="md"
							onClick={() => downloadDocument({ docLink, docName, hsNumber })}
						>
							Download
						</IcMDownload>
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
