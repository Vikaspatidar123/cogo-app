import { Button, Input, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import AddFundingRequest from './components/AddFundingRequest';
import InvoiceList from './components/InvoiceList';
import styles from './styles.module.css';

function Invoices() {
	const [showCiDetails, setShowCiDetails] = useState({
		flag                       : false,
		sid                        : '',
		id                         : '',
		invoice_number             : '',
		credit_export_factoring_id : '',
	});
	const [openAddFundingRequest, setOpenFundingRequest] = useState();
	const [searchValue, setSearchValue] = useState('');
	const [pagination, setPagination] = useState(1);

	return (
		<div>
			<div className={styles.divFlex}>
				<Button
					themeType="primary"
					size="md"
					onClick={() => setOpenFundingRequest((pv) => !pv)}
				>
					Create Funding Request
				</Button>
			</div>
			<div className={styles.divFlex}>
				<Input
					value={searchValue}
					placeholder="Search by SID/FID/INVOICE NO."
					style={{ width: '300px' }}
					prefix={<IcMSearchlight width="20px" height="20px" />}
				/>
			</div>
			<div className={styles.headFlex}>
				<div className={styles.tableHeader} style={{ width: '20%' }}>Invoice No</div>
				<div className={styles.tableHeader} style={{ width: '17%' }}>Gross Invoice Amt</div>
				<div className={styles.tableHeader} style={{ width: '17%' }}>Date Created</div>
				<div className={styles.tableHeader} style={{ width: '30%' }}>Buyer Name</div>
				<div className={styles.tableHeader} style={{ width: '15%' }}>Status</div>
			</div>
			<div>
				<InvoiceList />
			</div>

			<div className={styles.divFlex}>
				<Pagination
					className="sm"
					type="table"
					currentPage={1}
					totalItems={20}
					pageSize={10}
					onPageChange={(val) => {
						setPagination((prev) => ({ ...prev, page: val }));
					}}
				/>
			</div>
			{openAddFundingRequest && (
				<AddFundingRequest
					openAddFundingRequest={openAddFundingRequest}
					setOpenFundingRequest={setOpenFundingRequest}
				/>
			)}
		</div>
	);
}

export default Invoices;
