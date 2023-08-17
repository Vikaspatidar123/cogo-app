import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

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
	detailsModal = {},
	setDetailsModal = () => {},
}) {
	const { t } = useTranslation(['orderHistory']);
	const { show = false, requestType = '', tradeEngineInputId = '' } = detailsModal || {};

	const TITLE_MAPPING = getTitle({ t });
	const Component = COMPONENT_MAPPING?.[requestType] || null;

	const { tradeEngineResponse = {}, loading = false } =	useGetTradeEngine({ tradeEngineInputId });

	const closeModalHandler = () => {
		setDetailsModal({
			show: false,
		});
	};

	return (
		<Modal
			show={show}
			showCloseIcon
			onClose={closeModalHandler}
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

			<Modal.Body className={styles.modal_body}>
				{loading ? (
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading}
						alt={t('orderHistory:loading')}
						width={100}
						height={100}
						className={styles.loading_image}
					/>
				) : (
					<div>
						<Component tradeEngineResponse={tradeEngineResponse} />
					</div>
				)}
			</Modal.Body>
			<Modal.Footer />

		</Modal>
	);
}

export default DetailsModal;
