import { Tooltip, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const MAX_NAME_LENGTH = 45;
const MAX_NUMBER_LENGTH = 10;
const ZERO_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const SECOND_INDEX = 2;

function RenderProductName({ name }) {
	if (name.length < MAX_NAME_LENGTH) return name;

	return (
		<Tooltip content={name}>
			<span>
				{name.substring(ZERO_INDEX, MAX_NAME_LENGTH)}
				...
			</span>
		</Tooltip>
	);
}

function RenderNumber({ number = '' }) {
	const stringifyNumber = number.toString();

	if (stringifyNumber.length <= MAX_NUMBER_LENGTH) return number;

	return (
		<Tooltip content={number} interactive>
			<div>
				{stringifyNumber?.substring(ZERO_INDEX, MAX_NUMBER_LENGTH)}
				...
				{stringifyNumber?.substring(stringifyNumber.length - SECOND_INDEX, stringifyNumber.length)}
			</div>
		</Tooltip>
	);
}

function ProductBox({ watch }) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	const {
		hsCode = '',
		consignmentValue = 0,
		quantity = 0,
		currency = 'INR',
		productName = '',
	} = watch();

	const formattedConsignmentValue = formatAmount({
		amount  : consignmentValue || 0,
		currency,
		options : {
			notation : 'standard',
			style    : 'currency',
		},
	});

	return (
		<div className={cl`${styles.container} ${styles.mobile_view} ${styles.web_view}`}>
			<div className={styles.row}>
				<div className={styles.flex}>
					<div className={styles.value}>{hsCode}</div>
					<div className={styles.title}><RenderProductName name={productName} /></div>
				</div>
				<div className={styles.icon}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.product_cube}
						alt={t('dutiesTaxesCalculator:alt_product')}
						width={50}
						height={50}
					/>
				</div>
			</div>

			<div className={cl`${styles.box} ${styles.row}`}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.product_box_icon}
					alt={t('dutiesTaxesCalculator:alt_product')}
					width={130}
					height={130}
				/>
			</div>

			<div className={cl`${styles.last_row} ${styles.row}`}>
				<div>
					<div className={styles.title}>{t('dutiesTaxesCalculator:product_box_quantity')}</div>
					<div className={styles.value}><RenderNumber number={quantity} /></div>
				</div>
				<div className={styles.total}>
					<div className={styles.title}>{t('dutiesTaxesCalculator:product_box_value')}</div>
					<div className={styles.value}>
						<RenderNumber number={formattedConsignmentValue} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductBox;
