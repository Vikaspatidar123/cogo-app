import MobileView from './MobileView';
import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Item({
	item,
	fields,
	handleClick,
	loading,
	functions,
	deleteTradeParty = () => {},
	deleteLoading = false,
	setShowModal = () => {},
	setTradePartyDetails = () => {},
	setIsEdit = () => {},
	deleteModal,
	setDeleteModal = () => {},
	archived,
	getList,
	showmodal,
}) {
	const { newFunctions } = itemFunctions({
		functions,
		deleteTradeParty,
		deleteLoading,
		setShowModal,
		setTradePartyDetails,
		setIsEdit,
		deleteModal,
		setDeleteModal,
		archived,
		getList,
		showmodal,
	});

	const infoData = (singleItem, itm) => getValue(itm, singleItem, newFunctions);
	const renderItem = (itm) => (
		<div className={styles.container}>

			<div className={styles.mobile_view}>
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			</div>

			<div className={styles.web_view}>
				<div className={styles.row} role="presentation" onClick={handleClick}>
					{(fields || []).map((singleItem) => (
						<div
							className={styles.col}
							style={singleItem?.styles}
							key={singleItem?.key}
						>
							{infoData(singleItem, itm)}
						</div>
					))}
				</div>
			</div>

		</div>
	);

	return renderItem(item);
}

export default Item;
