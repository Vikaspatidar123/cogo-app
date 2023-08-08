import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import RenderField from '../../../common/RenderField';
import getControls from '../../../configurations/controls';
import useSetErrorFunction from '../../../utils/useSetErrorFunction';

import SelectType from './Address';
import Component from './Component';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

const useBillingDetails = ({
	formDetails = {},
	setActiveStepper = () => { },
	setFormDetails = () => { },
	insuranceType = '',
	setInsuranceType = () => { },
	checked = [],
	setChecked = () => { },
	setOrganizationAddress = () => { },
	organizationAddress = {},
	draftResponse = () => { },
	draftLoading = false,
	policyid = '',
	uploadType = '',
	setUploadType = () => { },
}) => {
	const [cityState, setCityState] = useState({});
	const [prosporerAddress, setProsporerAddress] = useState({});
	const [addAddressModal, setAddAddressModal] = useState(false);

	const { city = '', state: region = '' } = cityState || {};

	const { profile } = useSelector((state) => state);
	const names = profile?.name?.split(' ') || [];
	const fields = getControls(formDetails, profile, setCityState);

	const {
		handleSubmit,
		control,
		setValue,
		reset,
		setError,
		formState: { errors },
		getValues,
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
				: '',
			partyName: !isEmpty(formDetails)
				? formDetails.partyName
				: '',
			aadharNumber   : !isEmpty(formDetails) ? formDetails.aadharNumber : '',
			billingAddress : !isEmpty(formDetails)
				? formDetails.billingAddress
				: '',
			billingPincode: !isEmpty(formDetails)
				? formDetails.billingPincode
				: '',
			billingState : !isEmpty(formDetails) ? formDetails?.billingState : '',
			billingCity  : !isEmpty(formDetails) ? formDetails?.billingCity : '',
			panNumber    : !isEmpty(formDetails) ? formDetails?.panNumber : '',
		},
	});

	const { handleNextClick = () => { } } = useSetErrorFunction({
		getValues,
		setError,
		uploadType,
		prosporerAddress,
		insuranceType,
		checked,
		setFormDetails,
		setActiveStepper,
	});

	const resetCallback = useCallback(() => {
		if (insuranceType[0] === 'OTHER' && formDetails?.policyForSelf) {
			reset({
				billingAddress : '',
				billingCity    : '',
				billingState   : '',
				billingPincode : '',
				partyName      : '',
				gstin          : '',
				panNumber      : '',
			});
		}
	}, [formDetails?.policyForSelf, insuranceType, reset]);

	useEffect(() => {
		resetCallback();
	}, [resetCallback]);

	useEffect(() => {
		if (!isEmpty(cityState)) {
			setValue('billingCity', city);
			setValue('billingState', region);
		}
	}, [city, cityState, region, setValue]);

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

					<Header name="Personal Details" />

					<div className={styles.content_wrapper}>
						<form type="submit">

							<div className={styles.div_as_row}>
								{fields
									.filter((items, index) => index < 4)
									.map((item) => (
										<RenderField key={item.name} item={item} errors={errors} control={control} />
									))}
							</div>

							<div className={styles.heading_wrapper_billing}>
								<div className={styles.flex_3}>
									<div className={styles.heading_billing}>Billing Details</div>
									<div
										className={styles.flex_self}
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
								errors={errors}
								prosporerAddress={prosporerAddress}
								setProsporerAddress={setProsporerAddress}
								addAddressModal={addAddressModal}
								setAddAddressModal={setAddAddressModal}
								uploadType={uploadType}
								organizationAddress={organizationAddress}
								setOrganizationAddress={setOrganizationAddress}
								checked={checked}
								setChecked={setChecked}
								setValue={setValue}
								control={control}
								fields={fields}
								formDetails={formDetails}
							/>

							<Footer
								handleSubmit={handleSubmit}
								saveDraft={saveDraft}
								draftLoading={draftLoading}
								handleNextClick={handleNextClick}
								insuranceType={insuranceType}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default useBillingDetails;
