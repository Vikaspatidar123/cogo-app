import React, { useState } from 'react';
import ListView from '../ProductTab/ListView';
import { StyledTabDiv, CatalogueLabel, TabContainer } from './style';

const SubCategory = ({
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
}) => {
	const [activeData, setActiveData] = useState({});
	const onSubmit = (item) => {
		setActiveHeaderTab(item?.subCategoryCode);
		setActiveData(item);
	};
	return (
		<StyledTabDiv>
			<CatalogueLabel className="subCategory">Sub - Categories</CatalogueLabel>
			<div className="category">
				<div>
					{(Object.keys(activeData).length === 0 || !isMobile) &&
						(subCategory || []).map((category) => {
							return (
								<TabContainer
									key={category?.subCategoryCode}
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
								</TabContainer>
							);
						})}
				</div>
				<div className={`${!isMobile && 'section'}`}>
					{activeTab &&
						activeHeaderTab &&
						(Object.keys(activeData).length > 0 || !isMobile) && (
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
		</StyledTabDiv>
	);
};

export default SubCategory;
