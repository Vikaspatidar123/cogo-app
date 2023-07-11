import { useEffect } from 'react';

import Header from '../../common/Header';
import useTradeEngine from '../../hooks/useTradeEngine';
import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import ControlResult from '@/ui/commons/components/ImportExportControls';

function EmptyState() {
	return (
		<img
			className={styles.empty_state}
			src={iconUrl?.emptyState}
			alt="No Data Found"
		/>
	);
}

function Result() {
	const { query } = useRouter();
	const { trade_engine_id = '', billId = '' } = query || {};

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
				<img src={iconUrl?.loading} alt="loading" className={styles.loader} />
			)}
			{!tradeEngineLoading && <Header title="Transaction Results" redirect />}
			{!tradeEngineLoading && controls.length > 0 && (
				<div className={styles.result_container}>
					<ControlResult
						tradeEngineResponse={tradeEngineResp}
						EmptyState={EmptyState}
					/>
				</div>

			)}
			{!tradeEngineLoading && controls.length === 0 && <EmptyState />}
		</div>
	);
}
export default Result;
