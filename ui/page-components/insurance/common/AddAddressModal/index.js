import { Checkbox, Chips, Modal, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getControls from '../../configurations/addAddressControls';
import useCreateBillingAddres from '../../hooks/useCreateBillingAddress';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

export const OPTIONS = [
	{
		suffix : 'Factory',
		key    : 'factory',
	},
	{
		suffix : 'Office',
		key    : 'office',
	},
	{
		suffix : 'Ware House',
		key    : 'warehouse',
	},
];

function AddModal({
	addAddressModal = false,
	setAddAddressModal = () => {},
}) {
	const [checked, setChecked] = useState(false);
	const [showPoc, setShowPoc] = useState(false);
	const [cityState, setCityState] = useState({});
	const [addressType, setAddressType] = useState('office');
	const fields = getControls({ checked, setCityState });
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const { city = '', state:region = '' } = cityState || {};

	const { createSellerAddres, createAddressLoading } = useCreateBillingAddres({
		checked,
		addressType,
	});

	const returnFeildFunction = ({ item, index }) => {
		const Element = getField(item.type);
		return (
			<div className={styles.field}>
				<div>{item.label}</div>
				<Element
					{...item}
					control={control}
				/>
				{(errors[fields[index].name]?.type === 'required'
					|| errors[fields[index].name]?.type === 'pattern'
					|| errors[fields[index].name]?.type === 'maxLength'
					|| errors[fields[index].name]?.type === 'length') && (
						<div className={styles.error_message}>
							{errors[fields[index].name]?.message}
						</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		if (!isEmpty(cityState)) {
			setValue('city', city);
			setValue('state', region);
		}
	}, [city, cityState, region, setValue]);

	const handleCloseModal = () => {
		setAddAddressModal(false);
	};

	const onSubmit = async (data) => {
		console.log('🚀 ~ file: index.js:86 ~ onSubmit ~ data:', data);
		await createSellerAddres(data, handleCloseModal);
	};

	return (
		<Modal
			show={addAddressModal}
			onClose={() => handleCloseModal()}
			placement="top"
		>
			<form>
				<div className={styles.container}>
					<div className={styles.header}>
						<div className={styles.icon_container}>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/sellerAddress.svg"
								width="24px"
								height="24px"
								alt=""
								className={styles.image}
							/>
						</div>
						<div className={styles.address_title}>Add New Address</div>
					</div>
					<div className={styles.section}>
						<div className={styles.section_title}>
							<div className={styles.title}>Billing Details</div>
						</div>
						<div className={styles.row}>
							{(fields || [])
								.filter((items, index) => index < 6)
								.map((item, index) => returnFeildFunction({ item, index }))}
						</div>
						<div className={styles.checkbox_wrapper}>
							<Checkbox
								checked={checked}
								onChange={() => {
									setChecked(!checked);
									if (!checked) {
										setShowPoc(false);
									}
								}}
							/>
							<div className={styles.gst}>Include Tax Number</div>
						</div>
						{(fields || [])
							.filter((items, index) => index === 6 && checked)
							.map((item, index) => (
								<>
									{returnFeildFunction({ item, index })}
									{!showPoc && (
										<Button
											onClick={() => setShowPoc(!showPoc)}
										>
											<IcMPlus />
											Add POC
										</Button>
									)}
								</>
							))}
						<div className={styles.row}>
							{(fields || [])
								.filter((items, index) => index > 6 && showPoc && checked)
								.map((item, index) => <>{returnFeildFunction({ item, index })}</>)}
						</div>
						{!checked && (
							<div className={styles.address_type_checkbox_wrapper}>
								<div className={styles.address_save}>Save address as</div>
								<div className={styles.checkbox_wrapper}>
									<Chips
										selectedItems={addressType}
										onItemChange={(e) => {
											setAddressType(e);
										}}
										items={OPTIONS}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<Modal.Footer>
					<Button
						onClick={() => handleCloseModal()}
						themeType="accent"
						className={styles.button}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={createAddressLoading}
						loading={createAddressLoading}
					>
						Add
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default AddModal;
