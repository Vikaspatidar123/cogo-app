/* eslint-disable react-hooks/exhaustive-deps */
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import PendingModal from '../../common/PendingModal';
import useCheckPaymentStatus from '../../hooks/useCheckPaymentStatus';
import useTradeEngine from '../../hooks/useTradeEngine';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import CustomerSatisfaction from '@/ui/commons/components/CustomerSatisfaction';
import DocumentResult from '@/ui/commons/components/ImportExportDoc';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const clearStorageHandler = () => {
	if (typeof window === 'undefined') return;
	const localStorageFormData = JSON.parse(
		localStorage.getItem('transportDetails'),
	);
	if (localStorageFormData) {
		localStorage.removeItem('transportDetails');
	}
};

function EmptyState() {
	const { t } = useTranslation(['importExportDoc']);

	return (
		<Image
			className={styles.empty_state}
			width={400}
			height={400}
			src={GLOBAL_CONSTANTS.image_url.empty_state}
			alt={t('importExportDoc:result_empty_state')}
		/>
	);
}

function Result() {
	const { push, query } = useRouter();
	const { trade_engine_id = '', billId = '' } = query || {};

	const { t } = useTranslation(['importExportDoc']);

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
		clearStorageHandler();
	}, []);

	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		}
	}, [billId]);

	useEffect(() => {
		if (!billId && trade_engine_id) {
			postTradeEngine(trade_engine_id);
		}
	}, [trade_engine_id, billId]);

	if (tradeEngineLoading) {
		return (
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading}
				alt={t('importExportDoc:loading')}
				className={styles.loader}
				width={200}
				height={200}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<IcMArrowBack
					className={styles.back_arrow}
					height={22}
					width={22}
					onClick={() => {
						push('/saas/premium-services/import-export-doc');
					}}
				/>
				<h2>{t('importExportDoc:result_title')}</h2>
				{!isEmpty(documents) && (
					<div className={styles.doc_count}>
						{t('importExportDoc:result_total_doc')}
						:
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
			{
				!tradeEngineLoading && isEmpty(documents) && (
					<EmptyState />
				)
			}
			<CustomerSatisfaction
				serviceName="import_export_document"
				position="center"
				details={{ id: trade_engine_id }}
			/>
		</div>
	);
}

export default Result;
