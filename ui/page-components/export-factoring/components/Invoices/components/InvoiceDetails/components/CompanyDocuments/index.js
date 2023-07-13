import { Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import BillOfLading from './components/BillOfLading';
import CommercialInvoice from './components/CommercialInvoice';
import MarineInsurance from './components/MarineInsurance';
import PostdatedChequeDoc from './components/PostdatedChequeDoc';
import PurchaseOrder from './components/PurchaseOrder';
import ShippingBill from './components/ShippingBill';
import styles from './styles.module.css';

import StatusTag from '@/ui/page-components/export-factoring/common/StatusTag';

const DOCS_ARRAY = ['commercial_invoice', 'purchase_order', 'bill_of_lading', 'marine_insurance',
	'shipping_bill', 'postdated_cheque'];

const formMapping = {
	commercial_invoice: {
		heading : 'Commercial Invoice',
		func    : CommercialInvoice,
	},
	purchase_order: {
		heading : 'Purchase Order',
		func    : PurchaseOrder,
	},
	bill_of_lading: {
		heading : 'Bill Of Lading',
		func    : BillOfLading,
	},
	marine_insurance: {
		heading : 'Marine Insurance',
		func    : MarineInsurance,
	},
	shipping_bill: {
		heading : 'Shipping Bill',
		func    : ShippingBill,
	},
	postdated_cheque: {
		heading : 'Postdated Cheque',
		func    : PostdatedChequeDoc,
	},
};

function CompanyDocuments({
	data = {},
	refetch,
	creditRequest,
}) {
	const [openDocsModal, setOpenDocsModal] = useState('');
	const { overall_document_status, status = '', documents = {} } = data || {};
	return (
		<div>
			{DOCS_ARRAY.map((docs) => {
				const docsField = formMapping[docs];
				const ChildrenComponent = formMapping[docs].func;
				return (
					<div>
						<div className={styles.flexBox}>
							<div style={{ width: '40%' }}>
								{docsField?.heading}
							</div>
							<div>
								<StatusTag status={overall_document_status?.[docs]} />
							</div>
							<div>
								<Button
									type="button"
									size="md"
									disabled={['pending'].includes(overall_document_status?.commercial_invoice)
									&& docs !== 'commercial_invoice'}
									onClick={() => setOpenDocsModal(docs)}
								>
									{['pending', 'rejected'].includes(overall_document_status?.[docs])
									|| status === 'active' || !status ? (
										<>
											<IcMUpload style={{ marginRight: '10px' }} />
											Upload
										</>
										) : (
											'Review'
										)}
								</Button>
							</div>
						</div>
						<div className={styles.horizontalLine} />
						{
					openDocsModal === docs
					&& (
						<ChildrenComponent
							openDocsModal={openDocsModal}
							setOpenDocsModal={setOpenDocsModal}
							data={data}
							refetch={refetch}
							creditRequest={creditRequest}
						/>
					)
				}
					</div>
				);
			})}
		</div>
	);
}
export default CompanyDocuments;
