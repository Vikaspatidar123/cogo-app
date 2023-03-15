import { Modal } from '@cogoport/components';
import { useEffect } from 'react';

import useGetTradeEngine from '../../hooks/useGetTradeEngine';

import DutiesTaxesModal from './DutiesTaxesModal';
import styles from './styles.module.css';
import TraderEligibilityModal from './TraderEligibilityModal';

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

	const heading = () => (
		<>
			{ itm?.requestType === 'DUTIES' && 'Duties & Taxes'}
			{ itm?.requestType === 'SCREENING' && 'Trader Eligibility Check' }
		</>
	);

	return (
		<Modal
			show={modal}
			showCloseIcon
			onClose={() => setModal(false)}
		>
			{!tradeEngineResponseLoading && (
				<div className={styles.container}>
					<div>
						<Modal.Header title={heading()} />
						<div className={styles.line_wrapper}>
							<div className={styles.line} />
						</div>
					</div>
					<div>
						{itm?.requestType === 'DUTIES' && (
							<DutiesTaxesModal
								tradeEngineResp={tradeEngineResponse}
							/>
						)}
						{itm?.requestType === 'SCREENING' && (
							<TraderEligibilityModal
								tradeEngineResponse={tradeEngineResponse}
							/>
						)}
					</div>
				</div>
			)}
			{tradeEngineResponseLoading && <>Loading</> }
		</Modal>
	);
}

export default DetailsModal;
