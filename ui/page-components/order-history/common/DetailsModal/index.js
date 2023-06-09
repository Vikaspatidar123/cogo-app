import { Modal } from '@cogoport/components';
import { useEffect } from 'react';

import TITLE_MAPPING from '../../configurations/titleMapping';
import useGetTradeEngine from '../../hooks/useGetTradeEngine';
import IEControlsModal from '../IEControlsModal';

import DutiesTaxesModal from './DutiesTaxesModal';
import IEDocumentsModal from './IEDocumentsModal';
import styles from './styles.module.css';
import TraderEligibilityModal from './TraderEligibilityModal';

const COMPONENT_MAPPING = {
	DUTIES    : DutiesTaxesModal,
	SCREENING : TraderEligibilityModal,
	DOCUMENTS : IEDocumentsModal,
	CONTROLS  : IEControlsModal,
};

function DetailsModal({
	itm = {},
	modal = false,
	setModal = () => {},
}) {
	const { tradeEngineResponse, tradeEngineResponseLoading, TradeEngineResponseFunc } = useGetTradeEngine({ itm });
	useEffect(() => {
		TradeEngineResponseFunc();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { requestType = '' } = itm || {};

	const Component = COMPONENT_MAPPING?.[requestType];

	return (
		<Modal
			show={modal}
			showCloseIcon
			onClose={() => setModal(false)}
			size="lg"
		>
			{!tradeEngineResponseLoading && (
				<div className={styles.container}>
					<div>
						<Modal.Header className={styles.heading} title={TITLE_MAPPING?.[requestType]} />
						<div className={styles.line_wrapper}>
							<div className={styles.line} />
						</div>
					</div>
					<div>

						<Component
							tradeEngineResponse={tradeEngineResponse}
						/>
					</div>
				</div>
			)}
			{tradeEngineResponseLoading && (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
					alt="loading"
					className={styles.loading_image}
				/>
			) }
		</Modal>
	);
}

export default DetailsModal;
