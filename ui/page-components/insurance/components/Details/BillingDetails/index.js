/* eslint-disable react-hooks/rules-of-hooks */
import { Popover, Toast, Button } from '@cogoport/components';
import { IcMArrowNext, IcMBldo, IcMPlus } from '@cogoport/icons-react';
import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import addres from '../../../common/AddressListPopover';
import getControls from '../../../configurations/controls';
import useGetStateFromPincode from '../../../hooks/useGetStateFromPincode';

import SellerAddress from './Address';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const billingDetails = ({
	formDetails = {},
	setActiveStepper = () => {},
	setFormDetails = () => {},
	insuranceType = '',
	setInsuranceType = () => {},
	organisationAddress = () => {},
	addressApi = () => {},
	setData = () => {},
	addressdata,
	checked = '',
	setChecked = () => {},
	addressLoading = false,
	setOrganizationAddressId = () => {},
	isMobile = false,
	draftResponse = () => {},
	draftLoading = false,
	policyid = '',
	uploadType = '',
	setUploadType = () => {},
	setisBillingAddress = () => {},
}) => {
	const [cityState, setCityState] = useState({});
	const { profile } = useSelector((state) => state);
	const fields = getControls(formDetails, profile, uploadType);
	const [showFilters, setshowFilters] = useState(false);
	const [allInfo, setAllInfo] = useState();
	const [prosporerAddress, setProsporerAddress] = useState({});
	const [addAddressModal, setAddAddressModal] = useState(false);

	const {
		handleSubmit, control,
		setValue,
		resetField,
		setError,
		formState: { errors }, watch,
	} = useForm();

	const submit = (values) => {
		let checkEmptyFlag = 0;
		Object.keys(values)
			.filter((item) => (uploadType === 'CORPORATE' ? item !== 'aadharNumber' : item !== 'gstin'))
			.forEach((itm) => {
				if (!values[itm]) {
					checkEmptyFlag += 1;
					setError(itm, { type: 'required', message: 'required' });
				}
			});
		if (checkEmptyFlag === 0) {
			setFormDetails((prev) => ({
				...prev,
				...values,
			}));
			setActiveStepper(() => ({
				1   : true,
				2   : 'pro',
				3   : false,
				svg : 1,
			}));
		}
	};

	const watchPincode = watch('billingPincode');

	useMemo(() => {
		organisationAddress();
		addressApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { cityLoading } = useGetStateFromPincode({
		watchPincode,
		setCityState,
		insuranceType,
	});

	const returnField = ({ item }) => {
		const Element = getField(item.type);
		const renderingField = fields.find((ele) => ele.name === item.name);
		return (
			<div
				className={styles.field}
				key={item.name}
			>
				<Element
					{...renderingField}
					control={control}
				/>
				<div>
					<span className={watch(renderingField?.name) !== '' ? styles.display : styles.hidden}>
						{renderingField.placeholder}
					</span>
				</div>
				{(errors[renderingField.name]?.type === 'required'
					|| errors[renderingField.name]?.type === 'pattern'
					|| errors[renderingField.name]?.type === 'maxLength') && (
						<div className={styles.error_message}>
							{errors[renderingField.name]?.message}
						</div>
				)}
			</div>
		);
	};

	const saveDraft = (values) => {
		setFormDetails((prev) => ({
			...prev,
			...values,
		}));
		const draftPayload = { ...formDetails, ...values };
		draftResponse(draftPayload, policyid);
	};

	const { list } = cityState || {};
	const { region, city } = list?.[0] || {};

	useMemo(() => {
		if (list?.length === 0) {
			Toast.error('Invalid Pincode');
		}
		if (city && region?.name && watchPincode?.length === 6) {
			setValue('billingCity', city?.name);
			setValue('billingState', region?.name);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city, region]);

	useEffect(() => {
		if (!watchPincode) {
			resetField('billingState');
			resetField('billingCity');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchPincode]);

	console.log('cityLoading', cityLoading);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.yellow_line} />
				<div className={styles.padded_div}>
					<div className={isMobile ? styles.heading_wrapper_mobile : styles.heading_wrapper}>
						<div className={isMobile ? styles.flex_2_mobile : styles.flex_2}>
							<div className={styles.heading}>Personal Details</div>
						</div>
						<div className={isMobile ? styles.line_wrapper_mobile : styles.line_wrapper}>
							<div className={styles.line} />
						</div>
					</div>
					<div className={styles.content_wrapper}>
						<form type="submit">
							<div className={styles.div_as_row}>
								{fields
									.filter((items, index) => index < 4)
									.map((item, index) => returnField({ item, index }))}
							</div>

							<div className={styles.heading_wrapper_billing}>
								<div className={styles.flex_3}>
									<div className={styles.heading_billing}>Billing Details</div>
									<div className={isMobile ? styles.flex_self_mobile : styles.flex_self}>
										<SellerAddress
											addressdata={addressdata}
											insuranceType={insuranceType}
											setInsuranceType={setInsuranceType}
											setValue={setValue}
											setChecked={setChecked}
											checked={checked}
											loading={addressLoading}
											setOrganizationAddressId={setOrganizationAddressId}
											resetField={resetField}
											addressApi={addressApi}
											organisationAddress={organisationAddress}
											setData={setData}
											formDetails={formDetails}
											setUploadType={setUploadType}
											uploadType={uploadType}
											showFilters={showFilters}
											setshowFilters={setshowFilters}
											allInfo={allInfo}
											setAllInfo={setAllInfo}
											addAddressModal={addAddressModal}
											setAddAddressModal={setAddAddressModal}
											setisBillingAddress={setisBillingAddress}
										/>
									</div>
								</div>
								<div className={styles.line_wrapper_billing}>
									<div className={styles.line} />
								</div>
							</div>
							{insuranceType?.length !== 0 && (
								<div className={styles.div_as_row}>
									{fields
										.filter((items, index) => index > 3)
										.map((item) => {
											if (!['aadharNumber', 'gstin'].includes(item.name)) {
												return returnField({ item });
											}
											if (item.name === 'aadharNumber' && uploadType === 'INDIVIDUAL') {
												return returnField({ item });
											}
											if (item.name === 'gstin' && uploadType === 'CORPORATE') {
												return returnField({ item });
											}
											return null;
										})}
								</div>
							)}
							{insuranceType[0] === 'OTHER' && (
								<Popover
									animation="scale"
									theme="light-border"
									placement="top"
									interactive
									visible={showFilters && !addAddressModal}
									onClickOutside={() => setshowFilters(false)}
									content={addres({
										setAllInfo,
										addressdata,
										checked,
										setChecked,
										loading: addressLoading,
										setOrganizationAddressId,
										addressApi,
										setData,
										setshowFilters,
										insuranceType,
										addAddressModal,
										setAddAddressModal,
										prosporerAddress,
										setProsporerAddress,
									})}
								>
									<div
										className={styles.align_div_add_address}
										role="presentation"
										onClick={() => {
											setshowFilters(!showFilters);
										}}
									>
										<IcMPlus />
										Add/Change proposer address
									</div>
								</Popover>
							)}
							{insuranceType[0] === 'OTHER'
								&& Object.keys(prosporerAddress).length > 0 && (
									<div className={styles.section_2}>
										<div className={styles.selected}>
											<div className={styles.card_text_org_name}>{prosporerAddress?.name}</div>
											<div className={styles.card_text}>
												{`${prosporerAddress?.address} - ${prosporerAddress?.pincode}`}
											</div>
											<div className={styles.card_text}>{prosporerAddress?.tax_number}</div>
										</div>
									</div>
							)}
							<div className={styles.wrapper_2}>
								<Button
									themeType="accent"
									disabled={draftLoading}
									onClick={handleSubmit(saveDraft)}
									loading={draftLoading}
								>
									<div className={styles.align_div}>
										Save as Draft
										<IcMBldo width="22px" height="22px" />
									</div>
								</Button>
								<Button
									className="primary md"
									type="button"
									onClick={handleSubmit(submit)}
								>
									<div className={styles.align_div}>
										Next step
										<IcMArrowNext />
									</div>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default billingDetails;
