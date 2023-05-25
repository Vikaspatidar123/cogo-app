import { Popover } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import AddModal from '../../../../common/AddAddressModal';
import addres from '../../../../common/AddressListPopover';
import Loader from '../../../../common/Loader';
import useGetAddresses from '../../../../hooks/useGetAddresses';
import SavedAddressCards from '../SavedAddressCards';

import styles from './styles.module.css';

function Component({
	insuranceType = [],
	returnField = () => {},
	prosporerAddress = {},
	setProsporerAddress = () => {},
	addAddressModal = false,
	setAddAddressModal = () => {},
	uploadType = '',
	setOrganizationAddress = () => {},
	organizationAddress = {},
	checked = [],
	setChecked = () => {},
	setValues = () => {},
	control = [],
	formDetails = {},
}) {
	const [showFilters, setShowFilters] = useState(false);
	const { data = [], loading = false } = useGetAddresses({ uploadType });
	const { checkedId = '' } = formDetails || {};

	useEffect(() => {
		if (!checkedId) {
			setProsporerAddress({});
		}
	}, [checkedId, setProsporerAddress, uploadType]);

	if (loading) {
		return <Loader />;
	}
	return (
		<>
			{insuranceType?.[0] === 'SELF' && (
				<>
					<SavedAddressCards
						addressdata={data}
						setChecked={setChecked}
						checked={checked}
						setOrganizationAddress={setOrganizationAddress}
						setValues={setValues}
						setAddAddressModal={setAddAddressModal}
					/>
					<div className={styles.row}>
						{control.map((item, index) => {
							if (
								index > 3
								&& ((item.name === 'panNumber' && uploadType === 'CORPORATE')
									|| (['panNumber', 'aadharNumber'].includes(item.name)
										&& uploadType === 'INDIVIDUAL'))
							) {
								return returnField({ item });
							}
							return null;
						})}
					</div>
				</>
			)}
			{insuranceType?.[0] === 'OTHER' && (
				<>
					<div className={styles.row}>
						{control.map((item, index) => {
							if (
								index > 3
								&& (!['aadharNumber', 'gstin'].includes(item.name)
									|| (item.name === 'aadharNumber' && uploadType === 'INDIVIDUAL')
									|| (item.name === 'gstin' && uploadType === 'CORPORATE'))
							) {
								return returnField({ item });
							}
							return null;
						})}
					</div>
					<Popover
						animation="scale"
						theme="light-border"
						placement="top"
						interactive
						visible={showFilters && !addAddressModal}
						onClickOutside={() => setShowFilters(false)}
						content={addres({
							addressdata: data,
							loading,
							setOrganizationAddress,
							insuranceType,
							addAddressModal,
							setAddAddressModal,
							prosporerAddress,
							setProsporerAddress,
							organizationAddress,
							setChecked,
							setShowFilters,
						})}
					>
						<div
							className={styles.align_div}
							role="presentation"
							onClick={() => {
								setShowFilters(!showFilters);
							}}
						>
							<IcMPlus />
							Add/Change proposer address
						</div>
					</Popover>
					{Object.keys(prosporerAddress || {})?.length > 0 && (
						<div className={styles.section_2}>
							<div className={styles.selected}>
								<div className={styles.org_name}>{prosporerAddress?.name}</div>
								<div className={styles.card_text}>
									{`${prosporerAddress?.address} - ${prosporerAddress?.pincode}`}
								</div>
								<div className={styles.card_text}>{prosporerAddress?.tax_number}</div>
							</div>
						</div>
					)}
				</>
			)}
			{addAddressModal && (
				<AddModal
					addAddressModal={addAddressModal}
					setAddAddressModal={setAddAddressModal}
					uploadType={uploadType}
				/>
			)}
		</>
	);
}

export default Component;
