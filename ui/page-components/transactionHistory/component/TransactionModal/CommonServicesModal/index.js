import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import DutiesTaxesModal from '@/ui/commons/components/DutiesTaxes';
import IEControlsModal from '@/ui/commons/components/ImportExportControls';
import IEDocumentsModal from '@/ui/commons/components/ImportExportDoc';
import TraderEligibilityModal from '@/ui/commons/components/TraderEligibility';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SERVICES_MODAL = {
	DUTIES    : DutiesTaxesModal,
	SCREENING : TraderEligibilityModal,
	DOCUMENTS : IEDocumentsModal,
	CONTROLS  : IEControlsModal,
};

function EmptyState() {
	const { t } = useTranslation(['transactionHistory']);

	return (
		<div className={styles.empty_state}>
			<Image
				height={250}
				width={250}
				alt={t('transactionHistory:result_empty_state_alt')}
				src={GLOBAL_CONSTANTS.image_url.empty_state}
			/>
		</div>
	);
}

function CommonServicesModal({ tradeEngineResponse = {}, requestType }) {
	const Component = SERVICES_MODAL?.[requestType];

	return (
		<div>
			<Component tradeEngineResponse={tradeEngineResponse} isModal EmptyState={EmptyState} listClassName="list" />
		</div>
	);
}

export default CommonServicesModal;
