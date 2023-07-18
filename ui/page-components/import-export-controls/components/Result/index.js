import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import Header from '../../common/Header';
import useTradeEngine from '../../hooks/useTradeEngine';
import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import ControlResult from '@/ui/commons/components/ImportExportControls';

function EmptyState() {
	const { t } = useTranslation(['importExportControls']);

	return (
		<Image
			className={styles.empty_state}
			src={iconUrl?.emptyState}
			alt={t('importExportControls:result_empty_state')}
			width={400}
			height={400}
		/>
	);
}

function Result() {
	const { query } = useRouter();
	const { trade_engine_id = '', billId = '' } = query || {};

	const { t } = useTranslation(['importExportControls']);

	const {
		postTradeEngine,
		tradeEngineLoading = false,
		tradeEngineResp = {},
	} = useTradeEngine({ billId });

	const { lineItem = [] } = tradeEngineResp || {};
	const { controls = [] } = lineItem[0] || {};

	const clearStorageHandler = () => {
		if (typeof window === 'undefined') return;
		const localStorageFormData = JSON.parse(localStorage.getItem('formInfo'));
		if (localStorageFormData) {
			localStorage.removeItem('formInfo');
		}
	};

	useEffect(() => {
		clearStorageHandler();
	}, []);

	useEffect(() => {
		if (trade_engine_id) {
			postTradeEngine(trade_engine_id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trade_engine_id]);

	return (
		<div>
			{tradeEngineLoading && (
				<Image
					className={styles.loader}
					alt={t('importExportControls:loading')}
					src={iconUrl?.loading}
					width={200}
					height={200}
				/>
			)}
			{!tradeEngineLoading && <Header title={t('importExportControls:result_title')} redirect />}
			{!tradeEngineLoading && controls.length > 0 && (
				<div className={styles.result_container}>
					<ControlResult
						tradeEngineResponse={tradeEngineResp}
						EmptyState={EmptyState}
					/>
				</div>

			)}
			{!tradeEngineLoading && isEmpty(controls) && <EmptyState />}
		</div>
	);
}
export default Result;
