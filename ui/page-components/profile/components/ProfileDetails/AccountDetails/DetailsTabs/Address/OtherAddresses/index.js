import { Modal, Badge, Button } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMArrowRotateRight,
	IcMFtaskNotCompleted,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EditOtherAddress from './EditOtherAddress';
import LoadingState from './LoadingState';
import OtherAddressCard from './OtherAddressCard';
import styles from './styles.module.css';
import getOtherAddressOptions from './utils/get-other-address-options';

function OtherAddresses({ addressesData, addressLoading, getAdd }) {
	const organizationOtherAddressesList = addressesData?.list || [];

	const { t } = useTranslation(['settings']);

	const OTHER_ADDRESSES_MAPPING = getOtherAddressOptions({ t });

	const [editOtherAddresKey, setEditOtherAddressKey] = useState(null);

	const [otherAddressObjToUpdate, setOtherAddressObjToUpdate] = useState({});

	const [showData, setShowData] = useState({});
	const [mobalType, setMobalType] = useState(false);

	const filterAddress = (address_key) => {
		const listData = (organizationOtherAddressesList || []).filter(
			(item) => item.address_type === address_key.api_property_key,
		);
		return listData || [];
	};
	function RenderAddressCards({ address_key }) {
		const data = filterAddress(address_key);
		if ((data || []).length === 0) {
			return (
				<div className={styles.empty}>
					<IcMFtaskNotCompleted width={40} height={40} />
					<div className={styles.no_data}>{t('settings:no_data_found_text')}</div>
				</div>
			);
		}
		return (data || []).map((other_address_data, index) => (
			<OtherAddressCard
				setOtherAddressObjToUpdate={setOtherAddressObjToUpdate}
				index={index}
				other_address_data={other_address_data}
				setMobalType={setMobalType}
				setEditOtherAddressKey={setEditOtherAddressKey}
				address_key={address_key}
				organizationOtherAddressesList={organizationOtherAddressesList}
				getAdd={getAdd}
			/>
		));
	}

	const handleCloseModal = () => {
		setEditOtherAddressKey(null);
		setOtherAddressObjToUpdate({});
	};

	if (addressLoading) {
		return <LoadingState />;
	}
	const addresCount = (address_key) => {
		const count = filterAddress(address_key).length;
		const value = count === 0 ? t('settings:addresses_not_found_text_1')
			: `${count} ${t('settings:addresses_added_text_1')}`;
		return value;
	};

	return (
		<>
			{Object.values(OTHER_ADDRESSES_MAPPING).map((address_key) => (
				<div className={styles.main_container} key={address_key.api_property_key}>
					<div className={styles.flex}>
						<div
							className={styles.icon_container}
							onClick={() => setShowData((ps) => ({
								...ps,
								[address_key.api_property_key]:
									!ps[address_key.api_property_key],
							}))}
							role="presentation"
							key={address_key.api_property_key}
						>
							{showData[address_key.api_property_key] ? (
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
								<div className={styles.head}>
									<div className={styles.text}>{address_key.label}</div>
									<Badge
										className={styles.badge}
										color="#f3fafa"
										size="md"
										text={addresCount(address_key)}
									/>
								</div>
							</div>
							<div className={styles.flex}>
								<Button
									onClick={() => {
										setEditOtherAddressKey(address_key);
										setMobalType(false);
									}}
									themeType={showData[address_key.api_property_key] ? 'primary' : 'secondary'}
									type="button"
								>
									{t('settings:add_address_button_label')}
								</Button>
							</div>
						</div>

					</div>

					<div>
						{showData[address_key.api_property_key] ? (
							<RenderAddressCards address_key={address_key} />
						) : null}
					</div>
				</div>
			))}

			{(!!editOtherAddresKey || !isEmpty(Object.keys(otherAddressObjToUpdate))) ? (
				<Modal
					show={!!editOtherAddresKey || Object.keys(otherAddressObjToUpdate).length !== 0}
					onClose={handleCloseModal}
					closeOnOuterClick={handleCloseModal}
					size="lg"
				>
					<EditOtherAddress
						organizationOtherAddressesList={organizationOtherAddressesList}
						otherAddressObjToUpdate={otherAddressObjToUpdate}
						address_key={editOtherAddresKey}
						handleCloseModal={handleCloseModal}
						getAdd={getAdd}
						mobalType={mobalType}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default OtherAddresses;
