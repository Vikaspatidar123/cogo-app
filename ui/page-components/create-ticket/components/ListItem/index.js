import { Placeholder } from '@cogoport/components';

import ItemFunctions from '../../utils/RenderFunctions';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

const ListItem = ({
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

	const renderItem = (itm) => (
		<div className={styles.row}>
			{(fields || []).map((singleItem) => (
				<div
					className={styles.col}
					key={singleItem?.key}
				>
					{!loading ? (
						<div className={styles.title_black}>
							{getValue(itm, singleItem, false, newFunctions)}
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

export default ListItem;
