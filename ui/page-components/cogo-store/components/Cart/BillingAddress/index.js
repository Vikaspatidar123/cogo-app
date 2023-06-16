import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import BillingAddressModal from '../../../common/BillingAddressModal';
import RenderSelectedAddress from '../../../common/RenderSelectedAddress';
import useGetBillingAddress from '../../../hooks/useGetBillingAddresses';
import ContactInfo from '../ContactInfo';

import styles from './styles.module.css';

function BillingAddress({ selectAddressId, setSelectAddressId = () => { } }) {
	const { t } = useTranslation(['cogoStore']);
	const {
		data = {},
		billingAddress = () => { },
		loading,
	} = useGetBillingAddress({ setSelectAddressId });
	const { list } = data || {};
	const [showMoreAddress, setShowMoreAddress] = useState(false);
	const [showAddressModal, setShowAddressModal] = useState(false);

	const firstData = (list || [])[0];

	const filteredData = (list || []).filter(
		(val) => val?.id === selectAddressId,
	)[0];

	if (isEmpty(list) && !loading) {
		return (
			<>
				<div
					role="presentation"
					className={styles.new_content}
					onClick={() => setShowAddressModal(true)}
				>
					{t('cogoStore:new_address_button')}
				</div>
				<ContactInfo
					showAddressModal={showAddressModal}
					setShowAddressModal={setShowAddressModal}
					billingAddress={billingAddress}
				/>
			</>
		);
	}

	const selectedAddressData = filteredData || firstData || {};

	// return (
	// 	<>
	// 		<div className={styles.container}>
	// 			<div className={styles.header}>
	// 				<div className={styles.title}>{t('cogoStore:delivery_address')}</div>
	// 			</div>
	// 			<div className={styles.list_container}>
	// 				{loading ? (
	// 					<Placeholder width="700px" height="70px" />
	// 				) : (
	// 					<RenderSelectedAddress
	// 						data={selectedAddressData}
	// 						setShowMoreAddress={setShowMoreAddress}
	// 						setSelectAddressId={setSelectAddressId}
	// 						selectAddressId={selectAddressId}
	// 					/>
	// 				)}
	// 			</div>
	// 		</div>

	// 		{showMoreAddress && (
	// 			<BillingAddressModal
	// 				showMoreAddress={showMoreAddress}
	// 				setShowMoreAddress={setShowMoreAddress}
	// 				setShowAddressModal={setShowAddressModal}
	// 				list={list}
	// 				selectAddressId={selectAddressId}
	// 				setSelectAddressId={setSelectAddressId}
	// 			/>
	// 		)}

	// 		{showAddressModal && (
	// 			<ContactInfo
	// 				showAddressModal={showAddressModal}
	// 				setShowAddressModal={setShowAddressModal}
	// 				billingAddress={billingAddress}
	// 			/>
	// 		)}
	// 	</>
	// );
}

export default BillingAddress;
