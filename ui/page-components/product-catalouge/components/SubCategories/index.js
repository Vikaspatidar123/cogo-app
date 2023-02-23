import React, { useState } from 'react';

import ListView from '../ProductTab/ListView';

import styles from './styles.module.css';

function SubCategory({
	activeHeaderTab,
	setActiveHeaderTab,
	isMobile,
	subCategory,
	activeTab,
	apiData,
	refetchProduct,
	showProduct,
	setShowProduct,
	setHSCode,
	deleteProduct,
	setActiveTab,
	loading,
	setIsEdit,
	isEdit,
}) {
	const [activeData, setActiveData] = useState({});
	const onSubmit = (item) => {
		setActiveHeaderTab(item?.subCategoryCode);
		setActiveData(item);
	};
	return (
		<div className={styles.styled_tab_div}>
			<div className={`${styles.catalouge_label}${styles.sub_category}`}>Sub - Categories</div>
			<div className="category">
				<div>
					{(Object.keys(activeData).length === 0 || !isMobile)
						&& (subCategory || []).map((category) => (
							<div
								className={styles.tab_container}
								key={category?.subCategoryCode}
								role="presentation"
								onClick={() => {
									onSubmit(category);
								}}
							>
								<div
									className={`card ${
										activeHeaderTab === category.subCategoryCode && 'active'
									}`}
								>
									{category.subCategoryDisplayName}
								</div>
							</div>
						))}
				</div>
				<div className="section">
					{activeTab
						&& activeHeaderTab
						&& (Object.keys(activeData).length > 0 || !isMobile) && (
							<ListView
								item={activeData || {}}
								activeSubTab={activeHeaderTab}
								apiData={apiData}
								refetchProduct={refetchProduct}
								showProduct={showProduct}
								setShowProduct={setShowProduct}
								setHSCode={setHSCode}
								deleteProduct={deleteProduct}
								setActiveTab={setActiveTab}
								subCategory={subCategory}
								loading={loading}
								setIsEdit={setIsEdit}
								isEdit={isEdit}
								productClassificationId={activeData?.productClassificationId}
								isMobile={isMobile}
							/>
					)}
				</div>
			</div>
		</div>
	);
}

export default SubCategory;
