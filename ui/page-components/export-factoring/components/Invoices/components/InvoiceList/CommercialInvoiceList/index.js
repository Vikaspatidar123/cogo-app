import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';
import StatusTag from '@/ui/page-components/export-factoring/common/StatusTag';

function CommercialInvoiceList({
	sid = '',
	invoices = {},
	creditRequest,
	setShowCiDetails,
}) {
	const {
		company_name = '',
		currency = '',
		invoice_amount = '',
		created_at = '',
		invoice_number = '',
		status = '',
		id = '',
	} = invoices;
	return (
		<div>
			<div className={styles.headFlex}>
				<div className={styles.tableHeader} style={{ width: '15%' }}>{invoice_number}</div>
				<div className={styles.tableHeader} style={{ width: '17%' }}>
					{formatAmount({
						amount  : invoice_amount,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</div>
				<div className={styles.tableHeader} style={{ width: '15%' }}>
					{formatDate({
						date       : created_at,
						formatType : 'date',
					})}
				</div>
				<div className={styles.tableHeader} style={{ width: '30%' }}>{company_name}</div>
				<div className={styles.tableHeader} style={{ width: '20%' }}><StatusTag status={status} /></div>
				<div
					className={styles.tableHeader}
					style={{ width: '3%', cursor: 'pointer' }}
					onClick={() => {
						setShowCiDetails({
							flag                       : true,
							sid,
							invoice_number,
							id,
							credit_export_factoring_id : creditRequest?.credit_export_factoring_id,
						});
					}}
				>
					<IcMArrowRight
						width="20px"
						height="20px"
					/>
				</div>
			</div>
		</div>
	);
}

export default CommercialInvoiceList;
