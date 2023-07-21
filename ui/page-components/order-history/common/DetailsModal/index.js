import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import getTitle from '../../configurations/titleMapping';
import useGetTradeEngine from '../../hooks/useGetTradeEngine';
import IEControlsModal from '../IEControlsModal';

import IEDocumentsModal from './IEDocumentsModal';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import DutiesTaxesModal from '@/ui/commons/components/DutiesTaxes';
import TraderEligibilityModal from '@/ui/commons/components/TraderEligibility';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Title({ requestType, TITLE_MAPPING }) {
	return (
		<div className={styles.container}>
			<div>{TITLE_MAPPING?.[requestType]}</div>
			<div className={styles.line_wrapper}>
				<div className={styles.line} />
			</div>
		</div>
	);
}

const COMPONENT_MAPPING = {
	DUTIES    : DutiesTaxesModal,
	SCREENING : TraderEligibilityModal,
	DOCUMENTS : IEDocumentsModal,
	CONTROLS  : IEControlsModal,
};

function DetailsModal({
	itm = {},
	modal = false,
	setModal = () => { },
}) {
	const { t } = useTranslation(['orderHistory']);

	const TITLE_MAPPING = getTitle({ t });

	const { tradeEngineResponse, tradeEngineResponseLoading, tradeEngineResponseFunc } = useGetTradeEngine({ itm });

	useEffect(() => {
		tradeEngineResponseFunc();
	}, [tradeEngineResponseFunc]);

	const { requestType = '' } = itm || {};

	const Component = COMPONENT_MAPPING?.[requestType];
	return (
		<Modal
			show={modal}
			showCloseIcon
			onClose={() => setModal(false)}
			size="xl"
		>
			<Modal.Header
				className={styles.heading}
				title={(
					<Title
						requestType={requestType}
						TITLE_MAPPING={TITLE_MAPPING}
					/>
				)}
			/>

			<Modal.Body>
				{tradeEngineResponseLoading ? (
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading}
						alt={t('orderHistory:loading')}
						width={100}
						height={100}
						className={styles.loading_image}
					/>
				) : (
					<div>

						<Component
							tradeEngineResponse={tradeEngineResponse}
						/>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer />

		</Modal>
	);
}

export default DetailsModal;
