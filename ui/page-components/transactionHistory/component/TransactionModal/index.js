import { Placeholder, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CommonServicesModal from './CommonServicesModal';
import QuotationModal from './QuotationModal';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SERVICES_MODAL = {
	QUOTATION : QuotationModal,
	DEFAULT   : CommonServicesModal,
	// DUTIES    : DutiesTaxesModal,
	// SCREENING : TraderEligibilityModal,
	// DOCUMENTS : IEDocumentsModal,
	// CONTROLS  : IEControlsModal,
};

const TITLE_MAPPING = {
	QUOTATION : 'Service details',
	DUTIES    : 'Duties & Taxes',
	SCREENING : 'Trader Eligibility Check',
	DOCUMENTS : 'Import/Export Documents',
	CONTROLS  : 'Import/Export Controls',
};

function ServiceDetailModal({
	setPaymentSuccess,
	paymentSuccess,
	transactionData = {},
	loading = false,
	requestType,
}) {
	const ServiceComponent = SERVICES_MODAL?.[requestType] || SERVICES_MODAL.DEFAULT;

	return (
		<Modal
			show={paymentSuccess}
			onClose={() => setPaymentSuccess(false)}
			size="xl"
		>
			{(loading) && (
				<div className={styles.flex}>
					<Placeholder height="50px" />
				</div>
			)}

			{!loading && isEmpty(transactionData) && (
				<>
					<div className={styles.empty_div}>
						<Image
							height={100}
							width={100}
							alt="No Data"
							src={GLOBAL_CONSTANTS.image_url.empty_state}
						/>
					</div>
					<div className={styles.text}>
						Something Went Wrong
					</div>
				</>
			)}

			{!loading && requestType && !isEmpty(transactionData) && (
				<>
					<Modal.Header title={TITLE_MAPPING?.[requestType]} />
					<div className={styles.hr} />
					<ServiceComponent
						tradeEngineResponse={transactionData}
						requestType={requestType}
					/>
				</>
			)}

		</Modal>
	);
}
export default ServiceDetailModal;
