import { Select } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState, useRef, useEffect } from 'react';

import AddModal from '../AddAddressModal';
import addressOptions from '../AddressOptions';

import styles from './styles.module.css';

function SelectAddressComponent({ setAddress = () => {}, address = '' }) {
	const { t } = useTranslation(['traderEligibilityCheck']);
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
				placeholder={t('traderEligibilityCheck:tec_select_address_placeholder')}
				multiple={false}
				onChange={setAddress}
				noOptionsMessage={t('traderEligibilityCheck:tec_select_adress_no_options_label')}
			/>
			<div className={styles.or_tag}>
				<div className={styles.line} />
				<div className={styles.text}>
					{t('traderEligibilityCheck:tec_or_label')}
				</div>
				<div className={styles.line} />
			</div>
			<div
				className={styles.add_address}
				role="presentation"
				onClick={() => setAddAddressModal(true)}
			>
				<IcMPlusInCircle />
				{t('traderEligibilityCheck:tec_add_new_address_label')}
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
