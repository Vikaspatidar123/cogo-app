import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import AddCommercialInvoice from '../AddCommercialInvoice';

import CommercialInvoiceList from './CommercialInvoiceList';
import styles from './styles.module.css';

function InvoiceList({
	invoice = {},
	creditRequest = {},
	setShowCiDetails,
	refetch,
}) {
	const [openAddInvoice, setOpenAddInvoice] = useState(false);
	const { fid = '', sid = '', invoices = [] } = invoice || {};
	return (
		<div style={{ margin: '20px 0px' }}>
			<div className={styles.flexDiv}>
				<div style={{ display: 'flex' }}>
					<div className={styles.sidText}>
						FID:
						{' '}
						{fid}
					</div>
					<div className={styles.sidText}>
						SID:
						{' '}
						{sid}
					</div>
				</div>
				<Button
					type="button"
					size="md"
					themeType="tertiary"
					onClick={() => setOpenAddInvoice((pv) => !pv)}
				>
					<IcMPlus size={3} />
					Add Invoice
				</Button>
			</div>
			<div>
				{(invoices || []).map((ci) => (
					<CommercialInvoiceList
						key={ci.id}
						sid={sid}
						invoices={ci}
						creditRequest={creditRequest}
						setShowCiDetails={setShowCiDetails}
					/>
				))}
			</div>
			{openAddInvoice && (
				<AddCommercialInvoice
					refetch={refetch}
					invoice={invoice}
					creditRequest={creditRequest}
					openAddInvoice={openAddInvoice}
					setOpenAddInvoice={setOpenAddInvoice}
				/>
			)}
		</div>
	);
}
export default InvoiceList;
