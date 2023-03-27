import { Radio, Popover, Toggle } from '@cogoport/components';

import AddModal from '../../../../common/AddAddressModal';
import Addres from '../../../../common/AddressListPopover';
import { CheckBoxOptions } from '../../../../common/constants';

import styles from './styles.module.css';

function SellerAddress({
	addressdata = [],
	insuranceType = [],
	setInsuranceType = () => {},
	setChecked = () => {},
	checked = [],
	loading = false,
	setOrganizationAddressId = () => {},
	uploadType = '',
	setUploadType = () => {},
	showFilters = false,
	setshowFilters = () => {},
	addAddressModal = false,
	setAddAddressModal = () => {},
	setisBillingAddress = () => {},
}) {
	const onToggleHandle = () => {
		if (uploadType === 'CORPORATE') {
			setUploadType('INDIVIDUAL');
		} else {
			setUploadType('CORPORATE');
		}
	};

	return (
		<div className={styles.side_wrapper}>
			<div className={styles.billing_details_header}>
				<div className={styles.insurance_buy_div}>
					<div>Buying insurance for:</div>
					{(CheckBoxOptions || []).map((x) => (
						<div className={styles.div_margin_left} key={`${x.value}_${x.label}`}>
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
								placement="top"
								visible={showFilters && !addAddressModal}
								onClickOutside={() => setshowFilters(false)}
								content={Addres({
									addressdata,
									checked,
									setChecked,
									loading,
									setOrganizationAddressId,
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
										setshowFilters(!showFilters);
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
						size="md"
						name="insurance_type"
						offLabel="INDIVIDUAL"
						onLabel="CORPORATE"
						checked={uploadType === 'CORPORATE'}
						showOnOff
						onChange={() => onToggleHandle()}
						disabled={false}
					/>
				</div>
			</div>
			{addAddressModal && (
				<AddModal
					addAddressModal={addAddressModal}
					setAddAddressModal={setAddAddressModal}
				/>
			)}
		</div>
	);
}

export default SellerAddress;
