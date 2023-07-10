import { Tooltip } from '@cogoport/components';
import { IcMDownload, IcMServices } from '@cogoport/icons-react';
import { useState } from 'react';

import useService from '../../hooks/useService';
import TransactionModal from '../TransactionModal';

import styles from './styles.module.css';

function Download({ data }) {
	const { getService, transactionData = {}, loading } = useService();
	const [show, setShow] = useState(false);
	const { billRefId = '', billStatus = '', billType = '', requestType = '' } = data || {};

	const serviceHandler = () => {
		getService(billRefId);
		setShow(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				{billStatus === 'PAID' && data?.invoicePdfUrl && (
					<Tooltip content="Download Invoice" theme="light" animation="shift-away">
						<div>
							<IcMDownload
								onClick={() => window.open(data.invoicePdfUrl, '_blank')}
								width={20}
								height={20}
							/>
						</div>
					</Tooltip>
				)}
				{billStatus === 'PAID' && billType === 'PREMIUM_SERVICES' && (
					<Tooltip content="Service" animation="shift-away" theme="light">
						<div className={styles.service}>
							<IcMServices onClick={serviceHandler} width={20} height={20} />
						</div>
					</Tooltip>
				)}
			</div>
			{show && (
				<TransactionModal
					paymentSuccess={show}
					setPaymentSuccess={setShow}
					transactionData={transactionData}
					loading={loading}
					requestType={requestType}
				/>
			)}
		</div>
	);
}
export default Download;
