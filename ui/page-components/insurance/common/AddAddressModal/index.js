// import { Text } from '@cogoport/front/components';
import { Checkbox, Chips, Toast, Modal, Button } from '@cogoport/components';
// import Pills from '@cogoport/front/components/admin/Pills';
// import Toast from '@cogoport/front/components/admin/Toast';
import { IcMPlus } from '@cogoport/icons-react';
import { useState, useMemo } from 'react';
// import getField from '../../../../common/form/components';
// import FormItem from '../../../../common/ui/FormItem';
// import { useWindowDimensions } from '../../../../common/utils/getMobileView';

import { getControls } from '../../configurations/addAddressControls';
import useCreateBillingAddres from '../../hooks/useCreateBillingAddress';
import useGetStateFromPincode from '../../hooks/useGetStateFromPincode';

import styles from './styles.module.css';

import { InputController, SelectController, useForm } from '@/packages/forms';

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
	addressApi = () => {},
	organisationAddress = () => {},
	// setAddresses = () => {},
}) {
	const [checked, setChecked] = useState(false);
	const [showPoc, setShowPoc] = useState(false);
	const [addressType, setAddressType] = useState('office');
	const fields = getControls({ checked });
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValues,
		watch,
	} = useForm();

	const watcher = watch(['pincode', 'country_id']);
	const { createSellerAddres, createAddressLoading, response } = useCreateBillingAddres({
		checked,
		addressType,
	});
	const { cityState } = useGetStateFromPincode({ watcher });
	const { list } = cityState || {};
	const { region, city } = list?.[0] || {};

	const returnFeildFunction = ({ item, index }) => {
		const Element = item.type === 'text' ? InputController : SelectController;
		return (
			<div className={styles.field}>
				<Element
					{...fields[index]}
					control={control}
				/>
				<div>
					<span className={watch(fields[index]?.name) !== '' ? styles.display : styles.hidden}>
						{fields[index].placeholder}
					</span>
				</div>
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

	useMemo(() => {
		if (list?.length === 0) {
			Toast.error('Invalid Pincode');
		}
		if (city || region?.name) {
			setValues({
				city  : city?.name,
				state : region?.name,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city, region, list]);

	const handleCloseModal = () => {
		setAddAddressModal(false);
	};

	const onSubmit = async (data) => {
		await createSellerAddres(data, handleCloseModal);
		if (response?.data?.id) {
			organisationAddress();
			addressApi();
		}
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
						<div className={styles.title}>Add New Address</div>
					</div>
					<div className={styles.section}>
						<div className={styles.section_title}>
							<div className={styles.title}>Billing Details</div>
							<div className={styles.design}>{/* <TitleStyle /> */}</div>
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
				<div className={styles.button_container}>
					<Button
						onClick={() => handleCloseModal()}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={createAddressLoading}
					>
						{createAddressLoading ? (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
								width="40px"
								height="15px"
								alt=""
							/>
						) : (
							'Add'
						)}
					</Button>
				</div>
			</form>
		</Modal>
	);
}

export default AddModal;
