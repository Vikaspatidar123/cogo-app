import { Radio, Popover, Toggle } from '@cogoport/components';
import { useEffect } from 'react';

import AddModal from '../../../../common/AddAddressModal';
import Addres from '../../../../common/AddressListPopover';
import { CheckBoxOptions } from '../../../../common/constants';
// import { AlignDiv } from '../style';

// import { Div, SideWrapper } from './style';
import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Individual',
		value : 'INDIVIDUAL',
	},
	{
		label : 'Corporate',
		value : 'CORPORATE',
	},
];

function SellerAddress({
	addressdata = [],
	insuranceType = [],
	setInsuranceType = () => {},
	setValue = () => {},
	setChecked = () => {},
	checked = [],
	loading = false,
	setOrganizationAddressId = () => {},
	resetField,
	addressApi = () => {},
	organisationAddress = () => {},
	setData = () => {},
	formDetails,
	uploadType = '',
	setUploadType = () => {},
	showFilters = false,
	setshowFilters = () => {},
	allInfo,
	setAllInfo = () => {},
	addAddressModal = false,
	setAddAddressModal = () => {},
	setisBillingAddress = () => {},
}) {
	useEffect(() => {
		if (Object.keys(formDetails).length === 0 && insuranceType[0] === 'SELF') {
			setAllInfo(addressdata?.[0]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(addressdata)]);

	useEffect(() => {
		if (insuranceType[0] !== 'SELF') {
			resetField('billingState');
			resetField('billingCity');
			resetField('billingAddress');
			resetField('partyName');
			resetField('gstin');
			resetField('billingPincode');
			resetField('aadharNumber');
			resetField('panNumber');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [insuranceType]);

	useEffect(() => {
		if (allInfo && insuranceType[0] === 'SELF') {
			setValue('gstin', allInfo?.tax_number);
			setValue('partyName', allInfo.name);
			setValue('billingAddress', allInfo.address);
			setValue('billingPincode', allInfo.pincode);
		}
		if (checked?.length > 0) {
			setshowFilters(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allInfo, checked, insuranceType]);

	return (
		<div className={styles.side_wrapper}>
			<div className={styles.billing_details_header}>
				<div className={styles.insurance_buy_div}>
					<div>Buying insurance for:</div>
					{(CheckBoxOptions || []).map((x) => (
						<div className={styles.div_margin_left} key={x.value}>
							<Radio
								checked={insuranceType.includes(x.value)}
								label={x.label}
								onChange={() => {
									setInsuranceType([x.value]);
								}}
								multiple={false}
							/>
						</div>
					))}
					<div className={styles.change_address}>
						{insuranceType[0] === 'SELF' && (
							<Popover
								animation="scale"
								theme="light-border"
								placement="top"
								interactive
								visible={showFilters && !addAddressModal}
								onClickOutside={() => setshowFilters(false)}
								content={Addres({
									setAllInfo,
									addressdata,
									checked,
									setChecked,
									loading,
									setOrganizationAddressId,
									addressApi,
									setData,
									setshowFilters,
									insuranceType,
									addAddressModal,
									setAddAddressModal,
									setisBillingAddress,
								})}
							>
								<div
									role="presentation"
									onClick={() => {
										setshowFilters(true);
									}}
									className={styles.underline}
								>
									Change address
								</div>
							</Popover>
						)}
					</div>
				</div>
				<div>
					<Toggle
						offLabel={OPTIONS?.[0].value}
						onLabel={OPTIONS?.[1].value}
						value={uploadType}
						onChange={setUploadType}
						disabled={false}
					/>
				</div>
			</div>
			{addAddressModal && (
				<AddModal
					addAddressModal={addAddressModal}
					setAddAddressModal={setAddAddressModal}
					addressApi={addressApi}
					organisationAddress={organisationAddress}
				/>
			)}
		</div>
	);
}

export default SellerAddress;
