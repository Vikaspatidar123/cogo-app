/* eslint-disable react-hooks/exhaustive-deps */
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import PendingModal from '../../common/PendingModal';
import useCheckPaymentStatus from '../../hooks/useCheckPaymentStatus';
import useTradeEngine from '../../hooks/useTradeEngine';
import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import DocumentResult from '@/ui/commons/components/ImportExportDoc';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState() {
	return (
		<Image
			className={styles.empty_state}
			width={400}
			height={400}
			src={GLOBAL_CONSTANTS.image_url.empty_state}
			alt="logo"
		/>
	);
}

function Result() {
	const { push, query } = useRouter();
	const { trade_engine_id = '', billId = '', razorpay_payment_id = '' } = query || {};

	const [showPendingModal, setShowPendingModal] = useState(false);

	const {
		postTradeEngine,
		tradeEngineResp = {},
		tradeEngineLoading = false,
	} = useTradeEngine({ billId });

	const paymentSuccessHandler = () => {
		setShowPendingModal(false);
		postTradeEngine(trade_engine_id);
	};

	const { stop, checkPaymentStatus } = useCheckPaymentStatus({
		billId,
		setShowPendingModal,
		paymentSuccessHandler,
	});
	const { lineItem = [] } = tradeEngineResp || {};
	const { documents = [] } = lineItem?.[0] || {};

	useEffect(() => {
		if (razorpay_payment_id) {
			checkPaymentStatus();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [razorpay_payment_id]);

	useEffect(() => {
		if (!razorpay_payment_id && trade_engine_id) {
			postTradeEngine(trade_engine_id);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trade_engine_id, razorpay_payment_id]);

	return (
		<div className={styles.container}>
			{tradeEngineLoading && (
				<img src={iconUrl?.loading} alt="loading" className={styles.loader} />
			)}

			<div className={styles.title_container}>
				<IcMArrowBack
					className={styles.back_arrow}
					height={22}
					width={22}
					onClick={() => {
						push('/saas/premium-services/import-export-doc');
					}}
				/>
				<h2>Result</h2>
				{documents.length > 0 && (
					<div className={styles.doc_count}>
						Total Documents:
						{' '}
						<span>{documents.length}</span>
					</div>
				)}
			</div>
			{!tradeEngineLoading && documents.length > 0 && (
				<DocumentResult
					tradeEngineResponse={tradeEngineResp}
					EmptyState={EmptyState}
				/>
			)}
			<PendingModal
				showPendingModal={showPendingModal}
				setShowPendingModal={setShowPendingModal}
				stop={stop}
			/>
			{!tradeEngineLoading && documents.length === 0 && (
				<div>
					<img className={styles.empty_state} src={iconUrl?.emptyState} alt="No Data Found" />
				</div>
			)}
		</div>
	);
}

export default Result;
