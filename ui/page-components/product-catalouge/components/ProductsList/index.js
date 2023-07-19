/* eslint-disable max-len */
import {
	Tabs, TabPanel, Tooltip, Button,
} from '@cogoport/components';
import {
	IcMGrid,
	IcMPaste,
	IcMArrowBack,
	IcMPlus,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import AddProductModal from '../../common/AddProductModal';
import EmptyState from '../../common/List/EmptyState';
import AllProducts from '../AllProducts';
import SubCategory from '../SubCategories';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import HsCodeIcon from '@/ui/commons/components/HsCodeIcon';

function ProductsList({
	handelRouting, hsLoading, setHSCode, showProductView, apiData, loading, hsCode, subCategory,
	hsList, setActiveTab, activeTab, setShowProductView, refetchProduct, setPrefiledValues, deleteProduct, isEdit,
	setSubCategory, setActiveHeaderTab, showProduct, setShowProduct, prefiledValues, addProductLoading,
	activeHeaderTab, setIsEdit,
}) {
	const { t } = useTranslation(['common', 'productCatalogue']);
	const { profile } = useSelector((state) => state);
	const { MAPPING } = HsCodeIcon(false);
	const checkLength = apiData?.totalRecords;
	const countryInfo = profile?.organization?.country;

	const [proId, setProId] = useState('');
	const [productClassification, setProductClassification] = useState('');

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>
				<div className={styles.title_section}>
					<h1 className="title">{t('productCatalogue:product_catalogue_title')}</h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>
				<div className={styles.button_container}>
					<Tooltip
						content={t('productCatalogue:product_catalogue_archived_list_tooltip')}
						placement="bottom"
					>
						<div className={styles.archived_button} role="presentation">
							<IcMPaste onClick={handelRouting} width={30} height={30} />
						</div>
					</Tooltip>

					{/* <Button className={styles.styled_button} onClick={() => setUploadModal(true)}>
						Import product
					</Button> */}

					<Button
						className={styles.styled_add_button}
						disabled={hsLoading}
						onClick={() => setHSCode(true)}
					>
						{t('productCatalogue:add_new_product_button')}
					</Button>
				</div>
			</div>
			<div className={styles.scroll_content}>
				{(showProductView) && (
					<div>
						<div className={styles.sub_title}>{t('productCatalogue:product_catalogue_tabs_title')}</div>
						<div>
							{hsList.length > 0 && (
								<div className="scroll">
									<div className={styles.scroll_container}>
										<div className={styles.styled_div}>
											<Tabs
												activeTab={activeTab}
												onChange={setActiveTab}
												className="horizontal one tabs catgeory"
											>
												<TabPanel
													name="allProducts"
													title={(
														<div
															className={styles.styled_tab_heading}
															role="presentation"
															onClick={() => {
																setShowProductView(true);
																refetchProduct({});
															}}
														>
															<div
																className={styles.colored_icon}
															>
																<IcMGrid fill="#d94646" className={styles.icon} />
															</div>
															{t('productCatalogue:product_catalogue_tabs_title_1')}
														</div>
													)}
												/>
												{(hsList || []).map((item) => {
													const {
														categoryDisplayName = '',
														categoryCode = '',
													} = item;

													return (
														<TabPanel
															name={categoryDisplayName}
															key={`${item.categoryDisplayName}_${item.categoryDisplayName}`}
															title={(
																<div
																	className={styles.styled_tab_heading}
																	role="presentation"
																	onClick={() => {
																		setSubCategory(
																			item.subCategory,
																		);
																		setShowProductView(true);
																		setActiveHeaderTab();
																	}}
																>
																	<div
																		className={styles.colored_icon}
																	>
																		{MAPPING[categoryCode]}
																	</div>
																	{categoryDisplayName}
																</div>
															)}
														/>
													);
												})}
											</Tabs>
											<div className={styles.styled_filter_section}>
												<div
													className="btn"
													role="presentation"
													onClick={() => setHSCode(true)}
												>
													<IcMPlus
														className={styles.plus_icon}
														fill="#ffffff"
														height="1.2rem"
														width="1.2rem"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{!showProductView && (
					<div className={styles.back}>
						<div className="archived" role="presentation">
							<IcMArrowBack
								className="icon"
								height={20}
								width={25}
								onClick={() => {
									setShowProductView(false);
								}}
							/>
							<div className="back">{t('productCatalogue:product_catalogue_archived_list_go_back_button')}</div>
						</div>
					</div>
				)}

				<div className={styles.tab_div}>
					{activeTab === 'allProducts' && showProductView && (
						<>
							<div className={styles.tab_header}>
								<IcMGrid fill="#d94646" />
								<div className={styles.title_styled}>{t('productCatalogue:product_catalogue_tabs_title_1')}</div>
								<div className={styles.total_records}>{!loading ? checkLength : '...'}</div>
							</div>
							<div className={styles.border_bottom} />
							<div>
								{!isEmpty(checkLength) ? (
									<AllProducts
										setShowProduct={setShowProduct}
										countryInfo={countryInfo}
										apiData={apiData}
										refetchProduct={refetchProduct}
										loading={loading}
										addProductLoading={addProductLoading}
										hsCode={hsCode}
										deleteProduct={deleteProduct}
										setIsEdit={setIsEdit}
										isEdit={isEdit}
										showProductView={showProductView}
										activeTab={activeTab}
										setHSCode={setHSCode}
										setProductClassification={setProductClassification}
										setProId={setProId}
										productClassification={productClassification}
										proId={proId}
									/>
								) : (
									<EmptyState />
								)}
							</div>
						</>
					)}

					{activeTab !== 'allProducts' && showProductView && (
						<SubCategory
							activeHeaderTab={activeHeaderTab}
							setActiveHeaderTab={setActiveHeaderTab}
							subCategory={subCategory}
							activeTab={activeTab}
							apiData={apiData}
							refetchProduct={refetchProduct}
							showProduct={showProduct}
							setShowProduct={setShowProduct}
							setHSCode={setHSCode}
							deleteProduct={deleteProduct}
							setActiveTab={setActiveTab}
							loading={loading}
							setIsEdit={setIsEdit}
							isEdit={isEdit}
							showProductView={showProductView}
						/>
					)}
					<AddProductModal
						showProduct={showProduct}
						setShowProduct={setShowProduct}
						countryInfo={countryInfo}
						prefiledValues={prefiledValues}
						setPrefiledValues={setPrefiledValues}
						isEdit={isEdit}
						setIsEdit={setIsEdit}
						addProductLoading={addProductLoading}
						refetchProduct={refetchProduct}
						setHSCode={setHSCode}
						productClassificationId={productClassification}
						productId={proId}
						card
					/>
				</div>
			</div>
		</div>
	);
}

export default ProductsList;
