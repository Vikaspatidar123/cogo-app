import { cl, TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import PendingModal from '../../common/PendingModal';
import useCheckPaymentStatus from '../../hooks/useCheckPaymentStatus';
import useTradeEngine from '../../hooks/useTradeEngine';
import iconUrl from '../../utils/iconUrl.json';

import Document from './Document';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Result() {
	const { push, query } = useRouter();
	const { trade_engine_id = '', billId = '', razorpay_payment_id = '' } = query || {};

	const [activeTab, setActiveTab] = useState('IMPORT');
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
	const { modeOfTransport = '', lineItem = [] } = tradeEngineResp || {};
	const { documents = [], hsNumber = '' } = lineItem?.[0] || {};

	const importDoc = documents.filter((doc) => doc?.tradeType === 'IMPORT');
	const exportDoc = documents.filter((doc) => doc?.tradeType === 'EXPORT');

	useEffect(() => {
		if (razorpay_payment_id) {
			checkPaymentStatus();
		}
	}, [razorpay_payment_id]);

	useEffect(() => {
		if (!razorpay_payment_id && trade_engine_id) {
			postTradeEngine(trade_engine_id);
		}
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
				<>
					<div className={styles.flex_box}>
						<Tabs
							activeTab={activeTab}
							themeType="primary"
							onChange={setActiveTab}
						>
							<TabPanel name="IMPORT" title="Import" />

							<TabPanel name="EXPORT" title="Export" />

						</Tabs>
						<div className={styles.tag_container}>
							<div className={cl`${styles.tag} ${styles.transport_mode}`}>
								Mode of Transport:
								{' '}
								{modeOfTransport}
							</div>
							{hsNumber && (
								<div className={styles.tag}>
									Hs Code:
									{' '}
									{hsNumber}
								</div>
							)}
						</div>
					</div>

					{activeTab === 'IMPORT'
						&& importDoc.map((doc) => (
							<Document key={doc?.docLink} doc={doc} hsNumber={hsNumber} />
						))}
					{activeTab === 'EXPORT'
						&& exportDoc.map((doc) => (
							<Document key={doc?.docLink} doc={doc} hsNumber={hsNumber} />
						))}
					{(importDoc?.length === 0 || exportDoc?.length === 0) && (
						<div>
							<img
								className={styles.empty_state}
								src={iconUrl?.emptyState}
								alt="No Data Found"
							/>
						</div>
					)}
				</>
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
