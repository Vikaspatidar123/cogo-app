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
	isMobile = false,
}) {
	const { tradeEngineResponse, tradeEngineResponseLoading, TradeEngineResponseFunc } = useGetTradeEngine({ itm });
	useEffect(() => {
		TradeEngineResponseFunc();
	}, []);

	return (
		<Modal
			show={modal}
			showCloseIcon
			onClose={() => setModal(false)}
			className={!isMobile ? 'secondary lg' : 'primary sm mobile'}
		>
			{!tradeEngineResponseLoading && (
				<div className={styles.container}>
					<div>
						<div className={styles.label}>
							{itm?.requestType === 'DUTIES' && 'Duties & Taxes'}
							{itm?.requestType === 'SCREENING' && 'Trader Eligibility Check'}
						</div>
						<div className={styles.line_wrapper}>
							<div className={styles.line} />
						</div>
					</div>
					<div>
						{itm?.requestType === 'DUTIES' && (
							<DutiesTaxesModal
								tradeEngineResp={tradeEngineResponse}
								isMobile={isMobile}
							/>
						)}
						{itm?.requestType === 'SCREENING' && (
							<TraderEligibilityModal
								tradeEngineResponse={tradeEngineResponse}
								isMobile={isMobile}
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
