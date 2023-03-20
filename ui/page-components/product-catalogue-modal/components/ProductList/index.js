/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Placeholder, Pagination, Button } from '@cogoport/components';
import { IcMPlus, IcATransparency } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import { listView } from '../../configuration/listView';

import ColItem from './ColItem';
import styles from './styles.module.css';

function ProductList({
	productList = {},
	loading = false,
	pagination,
	setPagination,
	refetchProduct,
	selectedId = [],
	item = {},
	isCategory = false,
	setSelectedData,
	setShowCatalogue,
	setSelectedId,
	multiSelect,
	allprductData,
}) {
	const loaderArr = [1, 2, 3, 4, 5];
	const [addProductId, setAddProductId] = useState(selectedId);
	const { list = [], totalRecords } = productList || {};
	const { productClassificationId = '' } = item || {};

	useEffect(() => {
		if (Object.keys(item).length > 0 && isCategory) {
			refetchProduct({ productClassificationId });
		}
	}, [JSON.stringify(item)]);

	const addToForm = () => {
		const arr = allprductData.filter((product) => addProductId.includes(product?.id));
		if (multiSelect) {
			const productItem = [
				...new Map(allprductData.map((data) => [data.id, data])).values(),
			];
			const productToAdd = (productItem || []).filter((data) => (
				addProductId.includes(data.id) && !selectedId.includes(data.id)));
			setSelectedData(productToAdd);
		} else {
			setSelectedData(...arr);
		}
		setShowCatalogue(false);
	};

	useEffect(() => {
		if (isCategory) {
			if (multiSelect) {
				setSelectedId((prv) => [...new Set([...prv, ...addProductId])]);
			} else {
				setSelectedId(addProductId);
			}
		}
	}, [addProductId]);

	return (
		<div className={styles.container}>
			<div className={styles.scroll_content}>
				{!loading && list.length > 0 && (
					<div
						className={cl`${styles.card_header} ${styles.row}
                    ${isCategory && styles.category_view} ${styles.mobile_row}`}
					>
						{listView.map(({ key, title, width, categoryWidth }) => (
							<h3
								key={key}
								className={styles.col}
								style={{ width: `${!isCategory ? width : categoryWidth}` }}
							>
								{title}
							</h3>
						))}
					</div>
				)}
				{loading && loaderArr.map((ele) => (
					<div key={ele} className={`${styles.row}`}>
						{listView.map(({ key, width, categoryWidth }) => (
							<div
								key={key}
								className={styles.col}
								style={{ width: `${!isCategory ? width : categoryWidth}` }}
							>
								<Placeholder className={styles.loader} />
							</div>
						))}
					</div>
				))}
				{!loading && list.length === 0 && (
					<div className={styles.empty_state}>
						<IcATransparency width={50} height={50} />
						<div>No Product in your Catalogue</div>
					</div>
				)}
				{!loading
					&& (list || [])?.map((rowItem) => (
						<div
							key={rowItem?.id}
							className={cl`${styles.row} ${styles.mobile_row}`}
						>
							<ColItem
								rowItem={rowItem}
								isCategory={isCategory}
								addProductId={addProductId}
								setAddProductId={setAddProductId}
								multiSelect={multiSelect}
							/>
						</div>
					))}
			</div>

			{!isCategory && list.length > 0 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="compact"
						pageSize={5}
						totalItems={totalRecords}
						style={{ background: 'transparent' }}
						currentPage={pagination}
						onPageChange={setPagination}
					/>
				</div>
			)}
			{!isCategory && (
				<div className={styles.footer_container}>
					<Button
						size="md"
						themeType="secondary"
						className={styles.cancel_btn}
						onClick={() => setShowCatalogue(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						onClick={addToForm}
						disabled={addProductId.length === 0}
					>
						<IcMPlus />
						Add
					</Button>
				</div>
			)}
		</div>
	);
}

export default ProductList;
