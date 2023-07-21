import { Placeholder, cl } from '@cogoport/components';

import ItemFunctions from '../../utils/RenderFunctions';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function ListItem({
	item,
	fields,
	loading = false,
	handleCheckboxSelect,
	selectedInvoices,
	handleBoxSelect,
	selectedpayments,
}) {
	const { newFunctions } = ItemFunctions({
		handleCheckboxSelect,
		selectedInvoices,
		handleBoxSelect,
		selectedpayments,
	});

	return (
		<div className={styles.row}>
			{(fields || []).map((singleItem) => (
				<div
					className={cl`${styles.col} ${styles?.[singleItem.key]}`}
					key={singleItem?.key}
				>
					{!loading ? (
						<div className={styles.title_black}>
							{getValue(item, singleItem, false, newFunctions)}
						</div>
					) : (
						<Placeholder height="20px" />
					)}
				</div>
			))}
		</div>
	);
}

export default ListItem;
