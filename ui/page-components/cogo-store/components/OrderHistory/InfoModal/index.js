import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import Details from './Details';
import Send from './Send';

function InfoModal({ modalInfo, setModalInfo }) {
	const { t } = useTranslation(['cogoStore']);
	const {
		show = false,
		voucherData = [],
		isView = false,
		orderItemId = '',
	} = modalInfo;
	const voucherInfo = voucherData?.map((item) => item?.Vouchers) || [];
	const closeModal = () => {
		setModalInfo({ show: false });
	};
	return (
		<Modal show={show} onClose={closeModal}>
			<Modal.Header
				title={
					isView ? t('cogoStore:voucher_details') : t('cogoStore:send_gift')
				}
			/>

			{!isView ? (
				<Send orderItemId={orderItemId} closeModal={closeModal} />
			) : (
				<Details voucherInfo={voucherInfo[0]} />
			)}
		</Modal>
	);
}

export default InfoModal;
