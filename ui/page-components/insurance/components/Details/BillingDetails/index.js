import { Popover, Button } from '@cogoport/components';
import { IcMArrowNext, IcMBldo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Addres from '../../../common/AddressListPopover';
import getControls from '../../../configurations/controls';
import useGetStateFromPincode from '../../../hooks/useGetStateFromPincode';

import SellerAddress from './Address';
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
	const { profile } = useSelector((state) => state);
	const names = profile?.name?.split(' ');
	const fields = getControls(formDetails, profile, uploadType);
	const [showFilters, setshowFilters] = useState(false);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [insuranceType?.[0]]);

	const returnField = ({ item }) => {
		const Element = getField(item.type);
		const renderingField = fields.find((ele) => ele.name === item.name);
		return (
			<div className={styles.field} key={item.name}>
				{renderingField.popover ? (
					<Popover
						animation="scale"
						placement="top"
						interactive
						trigger="hover"
						visible={showFilters && !addAddressModal}
						onClickOutside={() => setshowFilters(false)}
						content={(
							<Addres
								addressdata={addressdata}
								checked={checked}
								setChecked={setChecked}
								loading={addressLoading}
								setOrganizationAddressId={setOrganizationAddressId}
								setshowFilters={setshowFilters}
								insuranceType={insuranceType}
								addAddressModal={addAddressModal}
								setAddAddressModal={setAddAddressModal}
								setProsporerAddress={setProsporerAddress}
							/>
						)}
					>
						<div
							role="presentation"
							className={styles.align_div_add_address}
							onClick={() => setshowFilters(true)}
						>
							{!isEmpty(prosporerAddress) || formDetails?.proposersAddress
								? "Proposer's Address (Click to change)"
								: renderingField.placeholder}
						</div>
						{(!isEmpty(prosporerAddress) || formDetails?.proposersAddress) && (
							<Element
								{...renderingField}
								control={control}
								readonly
								disabled
							/>
						)}
					</Popover>
				) : (
					<>
						<div>{renderingField.placeholder}</div>
						<Element {...renderingField} control={control} />
					</>
				)}
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
					<div
						className={
              isMobile ? styles.heading_wrapper_mobile : styles.heading_wrapper
            }
					>
						<div className={isMobile ? styles.flex_2_mobile : styles.flex_2}>
							<div className={styles.heading}>Personal Details</div>
						</div>
						<div
							className={
                isMobile ? styles.line_wrapper_mobile : styles.line_wrapper
              }
						>
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
									<div
										className={
                      isMobile ? styles.flex_self_mobile : styles.flex_self
                    }
									>
										<SellerAddress
											addressdata={addressdata}
											insuranceType={insuranceType}
											setInsuranceType={setInsuranceType}
											setChecked={setChecked}
											checked={checked}
											loading={addressLoading}
											setOrganizationAddressId={setOrganizationAddressId}
											setUploadType={setUploadType}
											uploadType={uploadType}
											showFilters={showFilters}
											setshowFilters={setshowFilters}
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
							<div className={styles.div_as_row}>
								{fields
									.filter((items, index) => index > 3)
									.map((item) => {
										if (
											!['aadharNumber', 'gstin', 'proposersAddress'].includes(
												item.name,
											)
										) {
											return returnField({ item });
										}
										if (
											item.name === 'aadharNumber'
                      && uploadType === 'INDIVIDUAL'
										) {
											return returnField({ item });
										}
										if (item.name === 'gstin' && uploadType === 'CORPORATE') {
											return returnField({ item });
										}
										if (
											item.name === 'proposersAddress'
                     && insuranceType?.[0] === 'OTHER'
										) {
											return returnField({ item });
										}
										return null;
									})}
							</div>
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

export default useBillingDetails;
