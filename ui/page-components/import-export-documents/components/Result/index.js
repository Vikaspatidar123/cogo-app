/* eslint-disable react-hooks/exhaustive-deps */
import { cl, TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import PendingModal from '../../common/PendingModal';
import useCheckPaymentStatus from '../../hooks/useCheckPaymentStatus';
import useTradeEngine from '../../hooks/useTradeEngine';

import Document from './Document';
import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
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

	const [activeTab, setActiveTab] = useState('IMPORT');
	const [showPendingModal, setShowPendingModal] = useState(false);
	const [docVal, setDocVal] = useState({
		importDocs : [],
		exportDocs : [],
	});

	const TAB_MAPPING = {
		IMPORT : docVal.importDocs,
		EXPORT : docVal.exportDocs,
	};

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

	useEffect(() => {
		clearStorageHandler();
	}, []);

	useEffect(() => {
		if (!isEmpty(documents)) {
			const impDoc = [];
			const expDoc = [];

			documents.forEach((doc) => {
				if (doc?.tradeType === 'IMPORT') {
					impDoc.push(doc);
				} else {
					expDoc.push(doc);
				}
			});

			setDocVal({
				importDocs : impDoc,
				exportDocs : expDoc,
			});
		}
	}, [documents]);

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
			{!tradeEngineLoading && !isEmpty(documents) && (
				<>
					<div className={styles.flex_box}>
						<Tabs
							activeTab={activeTab}
							themeType="tertiary"
							onChange={setActiveTab}
						>
							<TabPanel name="IMPORT" title={t('importExportDoc:result_tab_1')} />
							<TabPanel name="EXPORT" title={t('importExportDoc:result_tab_2')} />
						</Tabs>

						<div className={styles.tag_container}>
							<div className={cl`${styles.tag} ${styles.transport_mode}`}>
								{t('importExportDoc:document_control_transport_label')}
								:
								{' '}
								{modeOfTransport}
							</div>
							{hsNumber && (
								<div className={styles.tag}>
									{t('importExportDoc:document_control_hscode_label')}
									:
									{' '}
									{hsNumber}
								</div>
							)}
						</div>
					</div>

					{!isEmpty(TAB_MAPPING[activeTab])
						? TAB_MAPPING[activeTab].map((doc) => (
							<Document key={doc?.docLink} doc={doc} hsNumber={hsNumber} />
						))
						: <EmptyState />}
				</>
			)}
			<PendingModal
				showPendingModal={showPendingModal}
				setShowPendingModal={setShowPendingModal}
				stop={stop}
			/>
			{!tradeEngineLoading && isEmpty(documents) && (
				<EmptyState />
			)}
		</div>
	);
}

export default Result;
