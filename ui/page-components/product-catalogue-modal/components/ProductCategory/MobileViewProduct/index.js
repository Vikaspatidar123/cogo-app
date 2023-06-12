/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import getHsCodeIcon from '../../../../../commons/components/HsCodeIcon';

import popoverContent from './PopoverContent';
import HsCodeList from './PopoverContent/HsCodeList';
import styles from './styles.module.css';

function ProductCategoryMobileView({
	productList = {},
	refetchProduct,
	categoryViewData = [],
	addProductId,
	addRemoveCheckBox,
	checkId = [],
}) {
	const [categoryDetails, setCategoryDetails] = useState([]);
	const [showCategory, setShowCategory] = useState(false);
	const [subCategoryDetails, setSubCategoryDetails] = useState([]);
	const [showSubCategory, setShowSubCategory] = useState(false);

	const { MAPPING } = getHsCodeIcon();

	const categoryDetailsLength = Object.keys(categoryDetails).length;
	const subCategoryDetailsLength = Object.keys(subCategoryDetails).length;

	const { list = [] } = productList || {};
	const { productClassificationId = '' } = subCategoryDetails || {};

	useEffect(() => {
		if (subCategoryDetailsLength > 0) {
			refetchProduct({ productClassificationId });
		}
	}, [subCategoryDetails]);

	return (
		<div className={styles.category_mobile_container}>
			<div className={styles.container}>
				<div className={styles.title}>Select Category</div>
				<Popover
					interactive
					visible={showCategory}
					onClickOutside={() => setShowCategory(false)}
					caret={false}
					placement="bottom"
					maxWidth="400px"
					content={popoverContent({
						dataArr        : categoryViewData,
						MAPPING,
						setDetails     : setCategoryDetails,
						setShowPopover : setShowCategory,
						iconCode       : 'categoryCode',
						displayName    : 'categoryDisplayName',
					})}
				>
					<div
						className={styles.input_box}
						role="presentation"
						onClick={() => setShowCategory(!showCategory)}
					>
						<div className={cl`${styles.flex_row}
						${categoryDetailsLength > 0 ? styles.black : styles.grey}`}
						>
							<div className={styles.color_icon}>{MAPPING[categoryDetails?.categoryCode]}</div>
							<p className={styles.text}>
								{`${
									categoryDetails?.categoryDisplayName || 'Select category from the List'
								} `}

							</p>
						</div>
						<IcMArrowDown fill="#333" width={13} height={13} />
					</div>
				</Popover>
			</div>
			{categoryDetailsLength > 0 && (
				<div className={styles.container}>
					<div className={styles.title}>Select Sub-Category</div>
					<Popover
						interactive
						visible={showSubCategory}
						onClickOutside={() => setShowSubCategory(false)}
						caret={false}
						placement="bottom"
						maxWidth="400px"
						content={popoverContent({
							MAPPING,
							dataArr        : categoryDetails?.subCategory,
							setDetails     : setSubCategoryDetails,
							setShowPopover : setShowSubCategory,
							iconCode       : 'subCategoryCode',
							displayName    : 'subCategoryDisplayName',

						})}
					>
						<div
							className={styles.input_box}
							role="presentation"
							onClick={() => setShowSubCategory(!showSubCategory)}
						>
							<div className={cl`${styles.flex_row}
							${subCategoryDetailsLength > 0 ? styles.black : styles.grey}`}
							>
								<div className={styles.color_icon}>{MAPPING[subCategoryDetails?.subCategoryCode]}</div>
								<p className={styles.text}>{subCategoryDetails?.subCategoryDisplayName}</p>
							</div>
							<IcMArrowDown fill="#333" width={13} height={13} />
						</div>
					</Popover>
				</div>
			)}
			{subCategoryDetailsLength > 0 && (
				<div>
					<HsCodeList
						list={list}
						addProductId={addProductId}
						checkId={checkId}
						addRemoveCheckBox={addRemoveCheckBox}
					/>
				</div>
			)}
		</div>

	);
}

export default ProductCategoryMobileView;
