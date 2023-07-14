import { Button, cl, Modal, Placeholder, Toast } from '@cogoport/components';
import { IcCCogoCoin, IcMCopy } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function SuccessModal({
	showSuccessModal,
	setShowSuccessModal,
	onConfirmOrder,
	confirmLoading = false,
	orderList = {},
	total_cogopoint,
}) {
	const { t } = useTranslation(['cogoStore']);
	const [showConfirmation, setShowConfirmation] = useState(true);
	const [showFailed, setShowFailed] = useState(false);
	const { push } = useRouter();
	const { order_items = [] } = orderList;

	const handleCopy = (voucher_no) => {
		navigator.clipboard.writeText(voucher_no);
		Toast.success('Text copied to clipboard');
	};

	const handelConfirmation = async () => {
		const res = await onConfirmOrder();
		if (res) setShowConfirmation(false);
		else setShowFailed(true);
	};

	const closeHandler = () => {
		if (showConfirmation) setShowSuccessModal(false);
		else push('/saas/cogo-store/order');
	};
	return (
		<Modal
			show={showSuccessModal}
			onClose={closeHandler}
			placement="top"
			showCloseIcon
		>
			<div
				className={cl`${!showConfirmation ? styles.modal_container : ''} ${!showConfirmation ? styles.bg : ''
				}`}
			>
				{confirmLoading && (
					<div className={styles.loader_container}>
						<Placeholder type="circle" margin="0px 0px 20px 0" radius="50px" />
						<Placeholder margin="0px 0px 20px 0" width="30vw" />
						<Placeholder margin="0px 0px 20px 0" width="20vw" />
					</div>
				)}
				{!confirmLoading && showConfirmation && !showFailed && (
					<div>
						<Modal.Header title={t('cogoStore:cart_confirm_order')} />
						<Modal.Body>
							<div className={styles.cart_header}>
								{t('cogoStore:cogostore_components_add_cart_modal')}
							</div>
							<div className={styles.cart_value}>
								<div className={styles.cart_heading}>
									{t('cogoStore:cogostore_components_total_cart_value')}
								</div>
								<div className={styles.cogo_points}>
									<IcCCogoCoin width={20} height={20} />
									{total_cogopoint}
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button
								themeType="secondary"
								onClick={() => setShowSuccessModal(false)}
								className={styles.cancel_button}
							>
								{t('cogoStore:modal_cancel')}
							</Button>
							<Button onClick={() => handelConfirmation()}>
								{t('cogoStore:modal_confirm')}
							</Button>
						</Modal.Footer>
					</div>
				)}
				{!confirmLoading && !showConfirmation && !showFailed && (
					<>
						<div className={styles.container}>
							<div className={styles.head}>
								{t('cogoStore:order_completed')}
							</div>
						</div>
						<div className={styles.card_container}>
							{(order_items || []).map((item, index) => {
								const {
									id = '',
									product_code = {},
									brand = {},
									status = '',
									vouchers = [],
								} = item;
								const {
									name = '',
									product_type = '',
									logo_urls = '',
								} = product_code;
								const { name: brand_name = '' } = brand;
								const [firstVoucher = {}] = vouchers;
								const { VoucherNo: voucherNumber = '' } = firstVoucher;
								return (
									<div key={id}>
										<div className={cl`${styles.card} `}>
											<div className={styles.card_img}>
												<img
													src={logo_urls}
													alt={t('cogoStore:orderHistory_card_image_alt')}
													className={styles.img}
												/>
												<div className={styles.voucher_card}>
													<div className={styles.voucher}>{name}</div>
													<div className={styles.name}>{brand_name}</div>
												</div>
											</div>
											<div>
												{status === 'success'
													&& product_type?.toLowerCase() === 'voucher' && (
														<div className={styles.border} disabled>
															<div className={styles.token}>
																{voucherNumber}
															</div>
															<IcMCopy
																className={styles.input}
																onClick={() => handleCopy(voucherNumber)}
															/>
														</div>
												)}
											</div>
											<div
												className={
													status === 'success'
														? styles.status_success
														: styles.status_fail
												}
											>
												{status === 'success'
													? t('cogoStore:cogostore_components_cart_success')
													: t('cogoStore:cogostore_components_cart_failed')}
											</div>
										</div>
										{order_items.length > 1
											&& index !== order_items.length - 1 && (
												<div className={styles.line} />
										)}
									</div>
								);
							})}
						</div>
						<div className={styles.close_btn_container}>
							<Button size="sm" onClick={closeHandler} themeType="linkUi">
								{t('cogoStore:cart_success_modal_close')}
							</Button>
						</div>
					</>
				)}
				{showFailed && (
					<div className={cl`${styles.container} ${styles.alert_container}`}>
						<img
							src={GLOBAL_CONSTANTS.image_url.success_image}
							alt={t('cogoStore:cart_successmodal_image_alt_text')}
							className={styles.alert_icon}
						/>
						<p className={styles.sub_head}>
							{t('cogoStore:cart_successModal_failed_text')}
						</p>
						<Button
							size="sm"
							className={styles.close_btn}
							onClick={() => {
								setShowSuccessModal(false);
								setShowFailed(false);
							}}
							themeType="linkUi"
						>
							{t('cogoStore:cart_success_modal_close')}
						</Button>
					</div>
				)}
			</div>
		</Modal>
	);
}
export default SuccessModal;
