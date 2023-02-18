import { Tooltip } from '@cogoport/components';
import { IcMDownload, IcMServices } from '@cogoport/icons-react';
import { useState } from 'react';

// import useGetPermission from '../../../../common/form/business/hooks/useGetPermission';
import useService from '../../hooks/useService';
import CC from '../../utils/condition-constants';
import TransactionModal from '../TransactionModal';

import styles from './styles.module.css';

function Download({ data, isMobile }) {
	// const { isConditionMatches } = useGetPermission();
	// const isAllowed = isConditionMatches(CC.SEE_DOWNLOAD_ALLOWED, 'or');
	const { getService, transactionData = {}, loading } = useService();
	const [show, setShow] = useState(false);
	const {
		billId = '', billRefId = '', billStatus = '', billType = '',
	} = data || {};
	const download = () => {
		window.open(`${process.env.BUSINESS_FINANCE_BASE_URL}/pdf/bill/${billId}`);
	};
	const service = () => {
		getService(billRefId);
		setShow(true);
	};
	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				{/* {isAllowed && billStatus === 'PAID' && (
					<Tooltip content="Download Invoice" theme="light" animation="shift-away">
						<div>
							<IcMDownload onClick={() => download()} width={25} height={25} />
						</div>
					</Tooltip>
				)} */}
				{billStatus === 'PAID' && billType === 'PREMIUM_SERVICES' && (
					<Tooltip content="Service" animation="shift-away" theme="light">
						<div className={styles.service}>
							<IcMServices onClick={() => service()} width={25} height={25} />
						</div>
					</Tooltip>
				)}
			</div>
			{show && (
				<TransactionModal
					paymentSuccess={show}
					setPaymentSuccess={setShow}
					isMobile={isMobile}
					transactionData={transactionData}
					getTransactionLoading={loading}
				/>
			)}
		</div>
	);
}
export default Download;
