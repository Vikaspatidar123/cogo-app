import { Tooltip } from '@cogoport/components';
import { IcMPdf, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { downloadDocument } from '@/ui/commons/utils/downloadDocument';

const MAX_DESC_LENGTH = 40;

function RenderDesc({ desc = '' }) {
	if (desc?.length > MAX_DESC_LENGTH) {
		return (
			<Tooltip content={desc} interactive>
				<span>
					{desc.substring(0, MAX_DESC_LENGTH)}
					...
				</span>
			</Tooltip>
		);
	}
	return <span>{desc || '--'}</span>;
}

function Document({ doc = {}, hsNumber = '' }) {
	const {
		docName = '',
		docLink = '',
		docExpNotes = '',
		docSource = '',
		docResponsibleParty = '',
	} = doc;

	const clickHandler = () => {
		downloadDocument({ urlKey: 'importExportDoc', payloadObj: { docLink, docName, hsNumber } });
	};

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
							onClick={clickHandler}
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
						<span className={styles.value}>
							<RenderDesc desc={docExpNotes} />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Document;
