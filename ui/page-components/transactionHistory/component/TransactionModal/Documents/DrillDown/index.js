import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function DrillDown({ item, hsNumber = '' }) {
	const {
		docName = '', docType = '', docCode = '', docLink = '',
	} = item || {};
	const [showDrill, setShowDrill] = useState(false);

	const downloadTransactionDocument = () => {
		const url = `${process.env.BUSINESS_FINANCE_BASE_URL}
		/saas/trade-engine/pdf?docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber}`;
		// eslint-disable-next-line no-undef
		window.open(url);
	};
	return (
		<>
			<div
				className={styles.row}
				onClick={() => setShowDrill(!showDrill)}
				role="presentation"
			>
				<div className="docName">{docName}</div>
				<IcMArrowDown
					width={15}
					height={15}
					className={`${showDrill && 'rotateIcn'} arrowIcn`}
				/>
			</div>

			<div className={`${styles.content} ${showDrill && 'showContent'}`}>
				<div className={styles.col} width="100px">
					<div className="title">Source</div>
					<div className="info">{docType}</div>
				</div>
				<div className={styles.col} width="100px">
					<div className="title">PDF Link</div>
					<div
						role="presentation"
						className={styles.pdf}
						onClick={() => downloadTransactionDocument()}
					>
						{docCode}
					</div>
				</div>
			</div>
		</>
	);
}

export default DrillDown;
