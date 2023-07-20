import { Placeholder, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import CommonServicesModal from './CommonServicesModal';
import QuotationModal from './QuotationModal';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SERVICES_MODAL = {
	QUOTATION : QuotationModal,
	DEFAULT   : CommonServicesModal,
};

const LOADER_ARR = [...Array(4).keys()];

function ServiceDetailModal({
	setPaymentSuccess,
	paymentSuccess,
	transactionData = {},
	loading = false,
	requestType,
}) {
	const { t } = useTranslation(['transactionHistory']);

	const TITLE_MAPPING = {
		QUOTATION : t('transactionHistory:result_modal_title_quote'),
		DUTIES    : t('transactionHistory:result_modal_title_dt'),
		SCREENING : t('transactionHistory:result_modal_title_tec'),
		DOCUMENTS : t('transactionHistory:result_modal_title_ied'),
		CONTROLS  : t('transactionHistory:result_modal_title_iec'),
	};
	const ServiceComponent = SERVICES_MODAL?.[requestType] || SERVICES_MODAL.DEFAULT;

	return (
		<Modal
			show={paymentSuccess}
			onClose={() => setPaymentSuccess(false)}
			size="xl"
		>
			{loading ? (
				LOADER_ARR.map((ele) => (
					<div key={ele} className={styles.flex}>
						<Placeholder height="50px" />
					</div>
				))
			) : null}

			{!loading && isEmpty(transactionData) ? (
				<>
					<div className={styles.empty_div}>
						<Image
							height={250}
							width={250}
							alt={t('transactionHistory:result_empty_state_alt')}
							src={GLOBAL_CONSTANTS.image_url.empty_state}
						/>
					</div>
					<div className={styles.text}>
						{t('transactionHistory:result_empty_state')}
					</div>
				</>
			) : null}

			{!loading && requestType && !isEmpty(transactionData) ? (
				<>
					<Modal.Header title={TITLE_MAPPING?.[requestType]} />
					<div className={styles.hr} />
					<ServiceComponent
						tradeEngineResponse={transactionData}
						requestType={requestType}
					/>
				</>
			) : null}

		</Modal>
	);
}
export default ServiceDetailModal;
