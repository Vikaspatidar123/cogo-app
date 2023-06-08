import { Select } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import AddModal from '../AddAddressModal';
import addressOptions from '../AddressOptions';

import styles from './styles.module.css';

function SelectAddressComponent({ setAddress = () => {}, address = '' }) {
	const elementRef = useRef();
	const [addAddressModal, setAddAddressModal] = useState(false);
	const { options = [] } = addressOptions();
	useEffect(() => {
		if (isEmpty(address)) {
			const divElement = elementRef.current;
			divElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [address]);

	return (
		<div className={styles.heading} ref={elementRef}>
			<Select
				className={styles.select}
				value={address}
				name="addressSelect"
				options={options}
				labelKey="name"
				placeholder="Select Billing Address"
				multiple={false}
				onChange={setAddress}
				noOptionsMessage="No options"
			/>
			<div className={styles.or_tag}>
				<div className={styles.line} />
				<div className={styles.text}>
					OR
				</div>
				<div className={styles.line} />
			</div>
			<div
				className={styles.add_address}
				role="presentation"
				onClick={() => setAddAddressModal(true)}
			>
				<IcMPlusInCircle />
				Add New Address
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

export default SelectAddressComponent;
