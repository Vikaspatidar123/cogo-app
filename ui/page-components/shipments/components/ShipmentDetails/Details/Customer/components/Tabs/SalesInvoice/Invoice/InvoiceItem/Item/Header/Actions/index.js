import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AmendInvoice from '../AmendInvoice';

import styles from './styles.module.css';

function Actions({ invoice }) {
	const [showAmend, setShowAmend] = useState(false);

	return (
		<div className={styles.conatiner}>
			<div className={styles.info_container}>
				{startCase(invoice.status) || 'Under Review'}
			</div>

			{invoice.status === 'reviewed' ? (
				<div className={styles.row}>
					<Button
						className="primary sm"
						style={{
							marginRight : '8px',
							background  : '#2C3E50',
							padding     : '4px 44px',
						}}
						onClick={() => setShowAmend('approved')}
					>
						Approve
					</Button>

					<Button
						className="secondary sm"
						style={{ background: '#ffffff', color: '#333' }}
						onClick={() => setShowAmend('amendment_requested')}
					>
						Request Amendment
					</Button>
				</div>
			) : null}

			{showAmend ? (
				<AmendInvoice
					showAmend={showAmend}
					setShowAmend={setShowAmend}
					invoice={invoice}
				/>
			) : null}
		</div>
	);
}
export default Actions;
