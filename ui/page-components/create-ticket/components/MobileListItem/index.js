import { Placeholder } from '@cogoport/components';

import ItemFunctions from '../../utils/RenderFunctions';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

const MobileListItem = ({
	item,
	fields,
	loading = false,
	handleCheckboxSelect,
	selectedInvoices,
	handleBoxSelect,
	selectedpayments,
}) => {
	const { newFunctions } = ItemFunctions({
		handleCheckboxSelect,
		selectedInvoices,
		handleBoxSelect,
		selectedpayments,
	});
	// const spanFunc = (idx) => (idx === 0 ? 12 : 6);

	const renderItem = (itm) => (
		<div className={styles.row}>
			{(fields || []).map((singleItem, index) => (
				<div className={styles.col}>
					{!loading ? (
						<div className={styles.flex_div}>
							<div
								className={`${styles.card_title} 
                            ${index === 0 ? styles.card_title_zero_index : ''}`}
							>
								{singleItem?.label}

							</div>
							<div className={styles.title_black}>
								{getValue(itm, singleItem, false, newFunctions)}
							</div>
						</div>
					) : (
						<Placeholder height="20px" />
					)}
				</div>
			))}
		</div>
	);

	return renderItem(item);
};

export default MobileListItem;
