import { cl, Tooltip } from '@cogoport/components';

import redirectUrl from '../../../../../../utils/redirectUrl';

import styles from './styles.module.css';

function DrillDown({ item, hsNumber = '' }) {
	const {
		docName = '',
		docType = '',
		docCode = '',
		docLink = '',
		docExpNotes = '',
	} = item || {};
	const { downloadTransactionDocument } = redirectUrl();

	return (
		<div className={styles.row}>
			<div className={styles.col} style={{ width: '30%' }}>
				<div className={styles.col_title_info}>{docName}</div>
			</div>
			<div className={cl`${styles.col}  ${styles.doc_desc}`} style={{ width: '30%' }}>
				<Tooltip content={docExpNotes} placement="top">
					<div className={`${styles.col_info} ${styles.description}`}>{docExpNotes}</div>
				</Tooltip>
			</div>
			<div className={styles.col} style={{ width: '8%' }}>
				<div className={styles.col_info}>{docType}</div>
			</div>
			<div className={styles.col} style={{ width: '12%' }}>
				<div
					role="presentation"
					className={cl`${styles.pdf} ${styles.col_info}`}
					onClick={() => downloadTransactionDocument({ docName, docLink, hsNumber })}
				>
					{docCode}
				</div>
			</div>
		</div>
	);
}

export default DrillDown;
