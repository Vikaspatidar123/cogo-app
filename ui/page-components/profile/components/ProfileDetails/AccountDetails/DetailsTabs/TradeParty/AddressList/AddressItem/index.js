import { IcMEdit } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import PocList from '../PocList';
import getValue from '../utils/getValue';

import styles from './styles.module.css';

const openDocument = (url = '') => {
	let modifiedUrl = `https://${url}`;
	if (url.includes('http://') || url.includes('https://')) {
		modifiedUrl = url;
	}

	window.open(modifiedUrl, '_blank');
};

const getBillingAddress = (data) => ({
	address  : () => getValue(data, 'address'),
	pincode  : () => getValue(data, 'pincode'),
	tax      : () => getValue(data, 'tax_number'),
	taxProof : () => {
		const taxProof = getValue(data, 'tax_number_document_url');

		if (!taxProof) {
			return '';
		}
		return (
			<div
				role="presentation"
				type="button"
				onClick={() => openDocument(taxProof)}
			>
				<div className={styles.button_text}>
					View Document
				</div>
			</div>
		);
	},
	isSez: () => {
		const isSez = getValue(data, 'is_sez', false);
		const sezProof = getValue(data, 'sez_proof', '');

		return isSez ? (
			<div
				role="presentation"
				type="button"
				onClick={() => openDocument(sezProof)}
			>
				<div className={styles.button_text}>
					View Document
				</div>
			</div>
		) : (
			<span className={styles.is_sez}>
				{isSez}
			</span>
		);
	},
});

const getOtherAddress = (data) => ({
	address     : () => getValue(data, 'address'),
	pincode     : () => getValue(data, 'pincode'),
	addressType : () => getValue(data, 'address_type'),
	country     : () => getValue(data, 'country.name'),
});

const ADDRESS_TYPE_FUNCTION_MAPPING = {
	billingAddress : getBillingAddress,
	otherAddress   : getOtherAddress,
};

/**
 * @typedef  {Object} 			[props]
 * @property {Object} 			[addressConfig]
 * @property {string} 			[addressType]
 * @property {Object} 			[data]
 * @property {function} 		[getAddressesList]
 * @property {function} 		[onClickEditButton]
 * @property {number|string} 	[marginBottom]
 */
function AddressItem(props) {
	const {
		addressConfig,
		addressType,
		data,
		getAddressesList,
		onClickEditButton,
		marginBottom,
	} = props;

	const addressColumns =		ADDRESS_TYPE_FUNCTION_MAPPING[addressType]?.(data) || {};
	return (
		<div className={styles.container} style={{ marginBottom }}>
			<div className={styles.list_item}>
				<div className={styles.row_container}>
					{addressConfig[addressType].list.map((item) => {
						const { key, label } = item;

						return (
							<div className={styles.col_container} key={key}>
								{label && <div className={styles.label_text}>{label}</div>}

								<div className={styles.value_text}>
									{addressColumns[key]() || '---'}
								</div>
							</div>
						);
					})}

					<div
						className={styles.edit_icon_container}
						role="presentation"
						onClick={onClickEditButton}
					>
						<IcMEdit height={16} width={16} />
					</div>
				</div>
			</div>

			<PocList
				data={getValue(data, 'organization_pocs', [])}
				getAddressesList={getAddressesList}
				marginTop="8px"
			/>
		</div>
	);
}

export default AddressItem;
