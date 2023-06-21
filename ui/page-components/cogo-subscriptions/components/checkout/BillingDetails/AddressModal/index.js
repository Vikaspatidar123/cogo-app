import { Modal, Button } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import TitleStyle from '../../../../common/Line';
import getControls from '../../../../configuration/config';
import useCreateBillingAddres from '../../../../hooks/useCreateBillingAddress';

import styles from './styles.module.css';

import {
	useForm,
	asyncFieldsLocations,
	useGetAsyncOptions,
	SelectController,
} from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';
import patterns from '@/ui/commons/configurations/patterns';

function AddModal({
	addAddressModal,
	setAddAddressModal,
	billingAddress,
	setAddresses,
}) {
	const { profile } = useSelector((s) => s);
	const { organization } = profile || {};
	const [countryInfo, setCountryInfo] = useState({});
	const [stateInfo, setStateInfo] = useState({});
	const [cityInfo, setCityInfo] = useState({});
	const [mobileCode, setMobileCode] = useState({});

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm();

	const { createSellerAddres, createAddressLoading } = useCreateBillingAddres({
		profile,
	});

	const code = watch('phoneNumber');
	const { country_code = '' } = code || {};

	useEffect(() => {
		if (country_code) {
			setMobileCode(code);
			setValue('country', '');
		}
	}, [code, country_code, setValue]);
	const handleCloseModal = () => {
		setAddAddressModal(false);
	};

	const onSubmit = async (data) => {
		const userData = {
			...data,
			organizationId : organization?.id,
			state          : stateInfo?.name,
			city           : cityInfo?.name,
			country        : countryInfo?.name,
			countryId      : countryInfo?.id,
			phoneCode      : data?.phoneNumber?.country_code,
			phoneNumber    : data?.phoneNumber?.number,
		};

		const resp = await createSellerAddres(userData, handleCloseModal);

		if (resp?.data?.id) {
			billingAddress({ setAddresses });
		}
	};

	const cityOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['country'] } },
		}),
	);

	const fields = getControls({ cityOptions });
	const item = fields[0];

	const MobileNumberController = getField('mobile_number');
	const CountryController = getField('select');
	const InputController = getField('text');
	return (
		<Modal show={addAddressModal} onClose={() => handleCloseModal()}>
			<form>
				<div className={styles.container}>
					<div className={styles.header}>
						<div className={styles.icon_container}>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/sellerAddress.svg"
								alt="cogo"
							/>
						</div>
						<div className={styles.title}>Add New Address</div>
					</div>
					<div className={styles.section}>
						<div className={styles.section_title}>
							<div className={styles.title}>User Details</div>
							<div className={styles.design}>
								<TitleStyle />
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.col}>
								<div className={styles.label}>
									Billing Party Name
									{errors?.billingPartyName && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.billingPartyName?.type}*`}

										</div>
									)}
								</div>
								<InputController
									control={control}
									name="billingPartyName"
									type="text"
									placeholder="Enter Billing Party Name"
									rules={{ required: true }}
								/>
							</div>
							<div className={styles.col}>
								<div>
									<div className={styles.label}>
										POC Name
										{errors?.name && (
											<div
												className={styles.error_txt}
											>
												{`${errors?.name?.type}*`}

											</div>
										)}
									</div>
									<InputController
										control={control}
										name="name"
										type="text"
										placeholder="Enter POC Name"
										rules={{ required: true }}
									/>
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.col}>
								<div className={styles.label}>
									Email Id *
									{errors?.email && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.email?.type}*`}

										</div>
									)}
								</div>
								<InputController
									control={control}
									name="email"
									type="email"
									placeholder="Enter Email Id"
									rules={{
										required : true,
										pattern  : {
											value   : patterns.EMAIL,
											message : 'Invalid email address',
										},
									}}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>
									Tax Number *
									{errors?.taxNumber && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.taxNumber?.type}*`}

										</div>
									)}
								</div>
								<InputController
									control={control}
									name="taxNumber"
									type="text"
									placeholder="Enter Tax Number"
									rules={{
										required : true,
										pattern  : {
											value   : patterns.GST_NUMBER,
											message : 'Invalid phone number',
										},
									}}
								/>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.col}>
								<div className={styles.label}>
									Phone Number *
									{errors?.phoneNumber && (
										<div className={styles.error_txt}>
											{`${
												errors?.phoneNumber?.message
                        || errors?.phoneNumber?.type
											}*`}
										</div>
									)}
								</div>
								<MobileNumberController
									control={control}
									name="phoneNumber"
									placeholder="Enter Phone Number"
									rules={{
										required : true,
										pattern  : {
											value   : patterns.MOBILE,
											message : 'Invalid phone number',
										},
									}}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>
									Country *
									{errors?.country && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.country?.type}*`}

										</div>
									)}
								</div>
								<SelectController
									{...item}
									name="country"
									control={control}
									placeholder="Enter Country"
									disabled={!mobileCode?.country_code}
									rules={{ required: true }}
								/>
							</div>
						</div>
					</div>
					<div className={styles.section}>
						<div className={styles.section_title}>
							<div className={styles.title}>Address Details</div>
							<div className={styles.design}>
								<TitleStyle />
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.col}>
								<div className={styles.label}>
									Address line *
									{errors?.address && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.address?.type}*`}

										</div>
									)}
								</div>
								<InputController
									control={control}
									name="address"
									placeholder="Enter Address"
									rules={{ required: true }}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>
									Pincode *
									{errors?.pincode && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.pincode?.type}*`}

										</div>
									)}
								</div>
								<InputController
									control={control}
									name="pincode"
									placeholder="Enter Pincode"
									rules={{ required: true }}
								/>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.col}>
								<div className={styles.label}>
									State (optional)
									{errors?.state && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.state?.type}*`}

										</div>
									)}
								</div>
								<CountryController
									{...fields.state}
									handleChange={(e) => setStateInfo(e)}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>
									{fields.city.label}
									{errors?.city && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.city?.type}*`}

										</div>
									)}
								</div>
								<CountryController
									{...fields.city}
									handleChange={(data) => setCityInfo(data)}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>
									Country *
									{errors?.country && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.country?.type}*`}

										</div>
									)}
								</div>
								<SelectController
									{...item}
									name="country"
									control={control}
									placeholder="Enter Country"
									disabled={!mobileCode?.country_code}
									rules={{ required: true }}
									handleChange={(data) => setCountryInfo(data)}
								/>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>
									Country *
									{errors?.country && (
										<div
											className={styles.error_txt}
										>
											{`${errors?.country?.type}*`}

										</div>
									)}
								</div>
								<SelectController
									{...item}
									name="country"
									control={control}
									placeholder="Enter Country"
									disabled={!mobileCode?.country_code}
									rules={{ required: true }}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.btn_container}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => handleCloseModal()}
					>
						Cancel
					</Button>
					<Button
						className="submit"
						onClick={handleSubmit(onSubmit)}
						disabled={createAddressLoading}
						size="md"
						themeType="primary"
					>
						{createAddressLoading ? (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
								alt="cogo"
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
