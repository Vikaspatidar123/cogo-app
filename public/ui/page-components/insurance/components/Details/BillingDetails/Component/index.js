import { Popover } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import AddModal from '../../../../common/AddAddressModal';
import addres from '../../../../common/AddressListPopover';
import Loader from '../../../../common/Loader';
import RenderField from '../../../../common/RenderField';
import useGetAddresses from '../../../../hooks/useGetAddresses';
import SavedAddressCards from '../SavedAddressCards';

import styles from './styles.module.css';

function Component({
	insuranceType = [],
	prosporerAddress = {},
	setProsporerAddress = () => {},
	addAddressModal = false,
	setAddAddressModal = () => {},
	uploadType = '',
	setOrganizationAddress = () => {},
	organizationAddress = {},
	checked = [],
	setChecked = () => {},
	setValue = () => {},
	control = [],
	fields,
	formDetails = {},
	errors,
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
			{insuranceType?.[0] === 'SELF' ? (
				<>
					<SavedAddressCards
						addressdata={data}
						setChecked={setChecked}
						checked={checked}
						setOrganizationAddress={setOrganizationAddress}
						setValue={setValue}
						setAddAddressModal={setAddAddressModal}
					/>
					<div className={styles.row}>
						{fields.map((item, index) => {
							if (
								index > 3
								&& ((item.name === 'panNumber' && uploadType === 'CORPORATE')
									|| (['panNumber', 'aadharNumber'].includes(item.name)
										&& uploadType === 'INDIVIDUAL'))
							) {
								return <RenderField key={item.name} item={item} control={control} errors={errors} />;
							}
							return null;
						})}
					</div>
				</>
			)
				: (
					<>
						<div className={styles.row}>
							{fields.map((item, index) => {
								if (
									index > 3
								&& (!['aadharNumber', 'gstin'].includes(item.name)
									|| (item.name === 'aadharNumber' && uploadType === 'INDIVIDUAL')
									|| (item.name === 'gstin' && uploadType === 'CORPORATE'))
								) {
									return (
										<RenderField
											key={item.name}
											item={item}
											control={control}
											errors={errors}
										/>
									);
								}
								return null;
							})}
						</div>
						<Popover
							animation="scale"
							placement="top"
							interactive
							visible={showFilters && !addAddressModal}
							onClickOutside={() => setShowFilters(false)}
							content={addres({
								addressdata: data,
								loading,
								setOrganizationAddress,
								insuranceType,
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
							<div className={styles.selected}>
								<div className={styles.org_name}>{prosporerAddress?.name}</div>
								<div className={styles.card_text}>
									{`${prosporerAddress?.address} - ${prosporerAddress?.pincode}`}
								</div>
								<div className={styles.card_text}>{prosporerAddress?.tax_number}</div>
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
