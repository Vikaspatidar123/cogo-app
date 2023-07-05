import { TabPanel, Tabs } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import Header from '../../common/Header';
import useTradeEngine from '../../hooks/useTradeEngine';
import iconUrl from '../../utils/iconUrl.json';

import ResultDetails from './ResultDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function EmptyState() {
	const { t } = useTranslation(['importExportControls']);

	return (
		<img
			className={styles.empty_state}
			src={iconUrl?.emptyState}
			alt={t('importExportControls:result_empty_state')}
		/>
	);
}

function Result() {
	const { query } = useRouter();
	const { trade_engine_id = '', billId = '' } = query || {};

	const { t } = useTranslation(['importExportControls']);

	const [activeTab, setActiveTab] = useState('EXPORT');
	const [controlVal, setControlVal] = useState({
		importControls : [],
		exportControls : [],
	});

	const {
		postTradeEngine,
		tradeEngineLoading = false,
		tradeEngineResp = {},
	} = useTradeEngine({ billId });

	const { lineItem = [] } = tradeEngineResp || {};
	const { controls = [] } = lineItem[0] || {};

	const { importControls, exportControls } = controlVal;

	const TAB_MAPPING = {
		IMPORT: {
			controlArr : importControls,
			title      : t('importExportControls:result_tab_1'),
		},
		EXPORT: {
			controlArr : exportControls,
			title      : t('importExportControls:result_tab_2'),
		},
	};

	useEffect(() => {
		if (!isEmpty(controls)) {
			const impControls = [];
			const expControls = [];

			(controls || []).forEach((control) => {
				if (control?.tradeType === 'IMPORT') {
					impControls.push(control);
				} else {
					expControls.push(control);
				}
			});

			setControlVal({
				importControls : impControls,
				exportControls : expControls,
			});
		}
	}, [controls]);

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
				<img src={iconUrl?.loading} alt={t('importExportControls:loading')} className={styles.loader} />
			)}
			{!tradeEngineLoading && <Header title={t('importExportControls:result_title')} redirect />}
			{!tradeEngineLoading && controls.length > 0 && (
				<div className={styles.importer_exporter}>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						{Object.keys(TAB_MAPPING).map((ele) => {
							const info = TAB_MAPPING[ele];
							return (
								<TabPanel name={ele} title={info.title} key={ele}>
									{(!isEmpty(info?.controlArr)) ? (
										<ResultDetails activeTab={activeTab} controls={info.controlArr} />
									) : (
										<EmptyState />
									)}
								</TabPanel>
							);
						})}

					</Tabs>

				</div>
			)}
			{!tradeEngineLoading && isEmpty(controls) && <EmptyState />}
		</div>
	);
}
export default Result;
