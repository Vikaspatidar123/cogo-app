import { Button, cl, Modal, Radio } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from './styles.module.css';

function BillingAddressModal({
	showMoreAddress,
	setShowMoreAddress = () => {},
	setShowAddressModal = () => {},
	list,
	selectAddressId,
	setSelectAddressId = () => {},
}) {
	const { t } = useTranslation(['cogoStore']);

	const [addressId, setAddressId] = useState('');

	const handleClick = () => {
		setSelectAddressId(addressId);
		setShowMoreAddress(false);
	};
	return (
		<Modal
			show={showMoreAddress}
			onClose={() => setShowMoreAddress(false)}
			size="md"
			placement="top"
			closeOnOuterClick={() => setShowMoreAddress(false)}
		>
			<Modal.Header title={t('cogoStore:select_address_title')} />
			<Modal.Body>
				<div
					role="presentation"
					className={styles.new_content}
					onClick={() => setShowAddressModal(true)}
				>
					{t('cogoStore:new_address_button')}
				</div>
				<div className={styles.name}>{t('cogoStore:deliver_to')}</div>
				<div className={styles.list_container}>
					{(list || [])
						.filter((val) => val?.id !== selectAddressId)
						.map((item) => {
							const {
								id = '',
								name = '',
								address = '',
								pincode = '',
							} = item || {};
							return (
								<div
									className={cl` ${
										addressId === id ? styles.active_card : ''
									} ${styles.content}`}
									key={id}
									role="presentation"
									onClick={() => setAddressId(id)}
								>
									<div className={styles.left_div}>
										<Radio checked={addressId === id} />
									</div>
									<div className={styles.right_div}>
										<div className={styles.name}>{name}</div>
										<div className={styles.address}>
											{address}, <span>{pincode}</span>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="tertiary" onClick={() => setShowMoreAddress(false)}>
					{t('cogoStore:cancel_button')}
				</Button>
				<Button themeType="primary" onClick={handleClick}>
					{t('cogoStore:confirm_button')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default BillingAddressModal;
