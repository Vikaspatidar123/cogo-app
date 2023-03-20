import { cl, Button } from '@cogoport/components';
import { IcATransparency, IcMPlus } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import IconMaping from '../../../../commons/components/HsCodeIcon';
import iconUrl from '../../configuration/icon-config.json';
import useProductList from '../../hooks/useProductList';
import ProductList from '../ProductList';

import ProductCategoryMobileView from './MobileViewProduct';
import styles from './styles.module.css';

function ProductCategory({
	categoryViewData = [],
	loading = false,
	setSelectedData,
	setShowCatalogue,
	multiSelect,
	categoryselectedId = [],
}) {
	const [subCategory, setSubCategory] = useState({});
	const [categoryList, setCategoryList] = useState({});
	const [selectedId, setSelectedId] = useState(categoryselectedId);
	const { MAPPING } = IconMaping();

	const subCategoryLength = Object.keys(subCategory).length;
	const categoryLength = Object.keys(categoryList).length;

	const {
		productList,
		loading: listLoading,
		refetchProduct,
		allprductData,
	} = useProductList({ labeledValue: 'category' });

	const addToForm = () => {
		const arr = allprductData.filter((product) => selectedId.includes(product?.id));
		if (multiSelect) {
			const productItem = [
				...new Map(allprductData.map((data) => [data.id, data])).values(),
			];
			const productToAdd = (productItem || []).filter((data) => (
				selectedId.includes(data.id) && !categoryselectedId.includes(data.id)));
			setSelectedData(productToAdd);
			setSelectedData(arr);
		} else {
			setSelectedData(...arr);
		}
		setShowCatalogue(false);
	};

	const addRemoveCheckBox = (ids) => {
		const ans = selectedId.includes(ids);
		if (ans) {
			if (multiSelect) {
				const checkId = selectedId.filter((x) => x !== ids);
				setSelectedId(checkId);
			} else {
				setSelectedId([]);
			}
		} else if (!multiSelect) {
			setSelectedId((prv) => [...prv, ids]);
		} else {
			setSelectedId([ids]);
		}
	};

	useEffect(() => {
		if (subCategoryLength > 0) {
			setCategoryList({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subCategory?.categoryCode]);

	return (
		<div>
			{loading && (
				<img
					className={styles.loading}
					src={iconUrl?.LoadingIcon}
					alt="loading..."
				/>
			)}
			{!loading && categoryViewData?.length === 0 && (
				<div className={styles.empty_state}>
					<IcATransparency width={50} height={50} />
					<div>No Product in your Catalogue</div>
				</div>
			)}
			{!loading && categoryViewData?.length > 0 && (
				<div className={styles.category_container}>
					<div className={styles.horizontal_section}>
						<h3>Select Category</h3>
						<div className={styles.horizontal_scroll_tab}>
							{(categoryViewData || []).map((item) => (
								<div
									className={cl`${styles.tab} ${styles.horizontal_tab}
									${subCategory?.categoryCode === item?.categoryCode && styles.tabSelected}`}
									role="presentation"
									onClick={() => setSubCategory(item)}
								>
									<div>{MAPPING[item?.categoryCode]}</div>
									<div>{item?.categoryDisplayName}</div>
								</div>
							))}
						</div>
					</div>

					{subCategoryLength > 0 && (
						<div className={styles.bottom_section}>
							<h3>Sub - Categories</h3>
							<div className={styles.vertical_section}>
								<div className={styles.vertical_scroll}>
									<div className={styles.vertical_tab_section}>
										{(subCategory?.subCategory || []).map((category) => (
											<div
												role="presentation"
												className={cl`${styles.tab} ${styles.vertical_tab} ${
													category?.subCategoryCode
											=== categoryList?.subCategoryCode && styles.tabSelected
												}`}
												onClick={() => setCategoryList(category)}
											>
												{category?.subCategoryDisplayName}
											</div>
										))}
									</div>
								</div>

								{categoryLength > 0 && (
									<div className={styles.vertical_list_section}>
										<ProductList
											productList={productList}
											refetchProduct={refetchProduct}
											loading={listLoading}
											item={categoryList}
											selectedId={categoryselectedId}
											setSelectedId={setSelectedId}
											isCategory
											multiSelect={multiSelect}
										/>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			)}

			<ProductCategoryMobileView
				productList={productList}
				refetchProduct={refetchProduct}
				categoryViewData={categoryViewData}
				addRemoveCheckBox={addRemoveCheckBox}
				addProductId={selectedId}
			/>
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
					themeType="primary"
					onClick={addToForm}
					disabled={selectedId.length === 0}
				>
					<IcMPlus />
					Add
				</Button>
			</div>
		</div>
	);
}

export default ProductCategory;
