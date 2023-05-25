import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getControls from '../../../configurations/controls';
import useGetStateFromPincode from '../../../hooks/useGetStateFromPincode';

import SelectType from './Address';
import Component from './Component';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const useBillingDetails = ({
	formDetails = {},
	setActiveStepper = () => {},
	setFormDetails = () => {},
	insuranceType = [],
	setInsuranceType = () => {},
	addressdata = [],
	checked = '',
	setChecked = () => {},
	// addressLoading = false,
	setOrganizationAddress = () => {},
	organizationAddress = {},
	isMobile = false,
	draftResponse = () => {},
	draftLoading = false,
	policyid = '',
	uploadType = '',
	setUploadType = () => {},
}) => {
	const { profile } = useSelector((state) => state);
	const names = profile?.name?.split(' ');
	const fields = getControls(formDetails, profile, uploadType);
	const [prosporerAddress, setProsporerAddress] = useState({});
	const [addAddressModal, setAddAddressModal] = useState(false);
	const { name, pincode, tax_number } = prosporerAddress || {};

	const {
		handleSubmit,
		control,
		setValue,
		reset,
		setError,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			insuredFirstName: !isEmpty(formDetails)
				? formDetails.insuredFirstName
				: names[0],
			insuredLastName: !isEmpty(formDetails)
				? formDetails.insuredLastName
				: names[1] || '',
			email   : !isEmpty(formDetails) ? formDetails.email : profile?.email,
			phoneNo : !isEmpty(formDetails)
				? formDetails.phoneNo
				: profile?.mobile_number,
			gstin: !isEmpty(formDetails)
				? formDetails.gstin
				: addressdata?.[0]?.tax_number,
			partyName: !isEmpty(formDetails)
				? formDetails.partyName
				: addressdata?.[0]?.name,
			aadharNumber   : !isEmpty(formDetails) ? formDetails.aadharNumber : '',
			billingAddress : !isEmpty(formDetails)
				? formDetails.billingAddress
				: addressdata?.[0]?.address,
			billingPincode: !isEmpty(formDetails)
				? formDetails.billingPincode
				: addressdata?.[0]?.pincode,
			billingState     : !isEmpty(formDetails) ? formDetails?.billingState : '',
			billingCity      : !isEmpty(formDetails) ? formDetails?.billingCity : '',
			panNumber        : !isEmpty(formDetails) ? formDetails?.panNumber : '',
			proposersAddress : !isEmpty(formDetails)
				? formDetails?.proposersAddress
				: '',
		},
	});

	const watchPincode = watch('billingPincode');

	const { cityLoading, cityState } = useGetStateFromPincode({
		watchPincode,
	});

	useEffect(() => {
		if (!isEmpty(prosporerAddress)) {
			setValue('proposersAddress', `${name},${pincode},${tax_number}`);
		}
	}, [name, pincode, prosporerAddress, setValue, tax_number]);

	useEffect(() => {
		if (!isEmpty(cityState) && !cityLoading) {
			setValue('billingCity', cityState?.city?.name);
			setValue('billingState', cityState?.region?.name);
		}
	}, [cityState, cityLoading, setValue]);

	const submit = (values) => {
		let checkEmptyFlag = 0;
		let requiredValueFields = [];
		if (insuranceType?.[0] === 'SELF') {
			requiredValueFields = Object.keys(values).filter((item) => (uploadType === 'CORPORATE'
				? !['aadharNumber', 'proposersAddress'].includes(item)
				: !['gstin', 'proposersAddress'].includes(item)));
		} else if (insuranceType?.[0] === 'OTHER') {
			requiredValueFields = Object.keys(values)
				.filter((item) => (uploadType === 'CORPORATE' ? item !== 'aadharNumber' : item !== 'gstin'));
		}
		requiredValueFields.forEach((itm) => {
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

	useEffect(() => {
		if (insuranceType[0] === 'OTHER') {
			reset({
				billingAddress : '',
				billingCity    : '',
				billingState   : '',
				billingPincode : '',
				partyName      : '',
				gstin          : '',
				panNumber      : '',
			});
		} else {
			reset({
				gstin: !isEmpty(formDetails)
					? formDetails.gstin
					: addressdata?.[0]?.tax_number,
				partyName: !isEmpty(formDetails)
					? formDetails.partyName
					: addressdata?.[0]?.name,
				aadharNumber   : !isEmpty(formDetails) ? formDetails.aadharNumber : '',
				billingAddress : !isEmpty(formDetails)
					? formDetails.billingAddress
					: addressdata?.[0]?.address,
				billingPincode: !isEmpty(formDetails)
					? formDetails.billingPincode
					: addressdata?.[0]?.pincode,
				billingState     : !isEmpty(formDetails) ? formDetails?.billingState : '',
				billingCity      : !isEmpty(formDetails) ? formDetails?.billingCity : '',
				panNumber        : !isEmpty(formDetails) ? formDetails?.panNumber : '',
				proposersAddress : !isEmpty(formDetails)
					? formDetails?.proposersAddress
					: '',
			});
		}
	}, [addressdata, formDetails, insuranceType, reset]);

	const returnField = ({ item }) => {
		const Element = getField(item.type);
		const renderingField = fields.find((ele) => ele.name === item.name);
		return (
			<div className={styles.field} key={item.name}>
				<div>{renderingField.placeholder}</div>
				<Element {...renderingField} control={control} />
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

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.yellow_line} />
				<div className={styles.padded_div}>

					<Header isMobile={isMobile} name="Personal Details" />

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
									<div
										className={isMobile ? styles.flex_self_mobile : styles.flex_self}
									>
										<SelectType
											insuranceType={insuranceType}
											setInsuranceType={setInsuranceType}
											setUploadType={setUploadType}
											uploadType={uploadType}
										/>
									</div>
								</div>
								<div className={styles.line_wrapper_billing}>
									<div className={styles.line} />
								</div>
							</div>

							<Component
								insuranceType={insuranceType}
								returnField={returnField}
								prosporerAddress={prosporerAddress}
								setProsporerAddress={setProsporerAddress}
								addAddressModal={addAddressModal}
								setAddAddressModal={setAddAddressModal}
								uploadType={uploadType}
								organizationAddress={organizationAddress}
								setOrganizationAddress={setOrganizationAddress}
								checked={checked}
								setChecked={setChecked}
								// setValues={setValues}
								control={fields}
								formDetails={formDetails}
							/>

							<Footer
								handleSubmit={handleSubmit}
								submit={submit}
								saveDraft={saveDraft}
								draftLoading={draftLoading}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default useBillingDetails;
