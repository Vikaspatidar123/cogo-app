import { Modal, Badge, Button } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMArrowRotateRight,
	IcMFtaskNotCompleted,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import BillingAddressCard from './BillingAddressCard';
import EditBillingAddress from './EditBillingAddress';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function BillingAddresses({
	title = '',
	organizationType = '',
	organizationBillingAddressesList = [],
	loading,
	getAddress,
}) {
	const { t } = useTranslation(['settings']);

	const [showEditBillingAddress, setShowEditBillingAddress] = useState(false);

	const [addressIdxToUpdate, setAddressIdxToUpdate] = useState(null);

	const [showData, setShowData] = useState(false);

	const [mobalType, setMobalType] = useState(false);

	const handleCloseModal = () => {
		setShowEditBillingAddress(false);
		setAddressIdxToUpdate(null);
	};
	function RenderBillingAddress() {
		if (!organizationBillingAddressesList.length) {
			return (
				<div className={styles.empty}>
					<IcMFtaskNotCompleted width={40} height={40} />
					<div className={styles.no_data}>{t('settings:no_data_found_text')}</div>
				</div>
			);
		}
		return (organizationBillingAddressesList || []).map((address, index) => (
			<BillingAddressCard
				index={index}
				setAddressIdxToUpdate={setAddressIdxToUpdate}
				address={address}
				setMobalType={setMobalType}
				getAddress={getAddress}
			/>
		));
	}
	const addresCount = () => {
		const count = organizationBillingAddressesList.length;
		const value = count === 0 ? t('settings:addresses_not_found_text_1')
			: `${count} ${t('settings:addresses_added_text_1')}`;
		return value;
	};
	if (loading) {
		return <LoadingState />;
	}
	return (
		<>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div
						role="presentation"
						className={styles.icon_container}
						onClick={() => setShowData(!showData)}
					>
						{showData ? (
							<IcMArrowRotateDown width={20} height={15} style={{ transform: 'rotate(180deg)' }} />
						) : (
							<IcMArrowRotateRight
								width={20}
								height={15}
							/>
						)}
					</div>

					<div className={styles.body}>
						<div className={styles.flex}>
							<div className={styles.text}>{title}</div>

							<div className={styles.head}>
								<Badge color="#f3fafa" size="md" text={addresCount()} />
							</div>
						</div>

						<div className={styles.flex}>
							<Button
								themeType={showData ? 'primary' : 'secondary'}
								onClick={() => {
									setShowEditBillingAddress(true);
									setMobalType(false);
								}}
								type="button"
							>
								{t('settings:add_address_button_label')}
							</Button>
						</div>
					</div>

				</div>

				<div>{showData ? <RenderBillingAddress /> : null}</div>
			</div>

			{(showEditBillingAddress || addressIdxToUpdate !== null) && (
				<Modal
					show={showEditBillingAddress || addressIdxToUpdate !== null}
					onClose={handleCloseModal}
					closeOnOuterClick={handleCloseModal}
					size="lg"
					scroll
				>
					<EditBillingAddress
						handleCloseModal={handleCloseModal}
						organizationBillingAddressesList={organizationBillingAddressesList}
						addressIdxToUpdate={addressIdxToUpdate}
						organizationType={organizationType}
						mobalType={mobalType}
						getAddress={getAddress}
					/>
				</Modal>
			)}
		</>
	);
}
export default BillingAddresses;
