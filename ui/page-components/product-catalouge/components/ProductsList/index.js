import {
	Tabs, TabPanel, Tooltip, Button,
} from '@cogoport/components';
import {
	IcMGrid,
	IcMPaste,
	IcMArrowBack,
	IcMPlus,
} from '@cogoport/icons-react';
import React from 'react';

import Loading from '../../assets/loading.svg';
import HsCodeIconMaping from '../../common/hsCodeIcons';
import EmptyState from '../../common/List/EmptyState';
import AllProducts from '../AllProducts';
import SubCategory from '../SubCategories';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function ProductsList({
	handelRouting, setUploadModal, hsLoading, setHSCode, showProductView, apiData, loading, hsCode, subCategory,
	hsList, setActiveTab, activeTab, setShowProductView, refetchProduct, setPrefiledValues, deleteProduct, isEdit,
	setSubCategory, setActiveHeaderTab, showProduct, setShowProduct, prefiledValues, addProductLoading,
	activeHeaderTab, setIsEdit,
}) {
	const { profile, general } = useSelector((state) => state);
	const { isMobile } = general;
	const { Mapping } = HsCodeIconMaping(false);
	const checkLength = apiData?.totalRecords;
	const countryInfo = profile?.organization?.country;

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>
				<div className={styles.title_section}>
					<h1 className="title">Products Catalogue</h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>
				<div className={styles.button_container}>
					<Tooltip
						content="Click to view archived List"
						placement="bottom"
					>
						<div className={styles.archived_button} role="presentation">
							<IcMPaste onClick={handelRouting} width={30} height={30} />
						</div>
					</Tooltip>

					<Button className={styles.styled_button} onClick={() => setUploadModal(true)}>
						Import product
					</Button>

					{!isMobile && (
						<Button
							className={styles.styled_button}
							disabled={hsLoading}
							onClick={() => setHSCode(true)}
						>
							+ Add New
						</Button>
					)}
				</div>
			</div>
			<div className={styles.scroll_content}>
				{(!showProductView || !isMobile) && (
					<>
						<div className={styles.sub_title}>Select Category</div>
						{hsLoading ? (
							<Loading className={styles.styled_loading} />
						) : (
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
																role="presentation"
																onClick={() => {
																	setShowProductView(true);
																	refetchProduct({});
																}}
															>
																<IcMGrid fill="#d94646" />
																<div
																	className={styles.label}
																>
																	All Products
																</div>
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
																			{Mapping[categoryCode]}
																		</div>
																		{categoryDisplayName}
																	</div>
																)}
															/>
														);
													})}
												</Tabs>
												{isMobile && (
													<div className={styles.styled_filter_section}>
														<div
															className="btn"
															role="presentation"
															onClick={() => setHSCode(true)}
														>
															<IcMPlus
																className={styles.plus_icon}
																fill="#ffffff"
																height={50}
																width={50}
															/>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						)}
					</>
				)}

				{isMobile && showProductView && (
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
							<div className="back">Go Back</div>
						</div>
					</div>
				)}

				<div className={styles.tab_div}>
					{activeTab === 'allProducts' && showProductView && (
						<>
							<div className={styles.tab_header}>
								<IcMGrid fill="#d94646" />
								<div className={styles.title_styled}>All Products</div>
								<div className={styles.total_records}>{!loading ? checkLength : '...'}</div>
							</div>
							<div className={styles.border_bottom} />
							<div>
								{checkLength !== 0 ? (
									<AllProducts
										showProduct={showProduct}
										setShowProduct={setShowProduct}
										countryInfo={countryInfo}
										prefiledValues={prefiledValues}
										setPrefiledValues={setPrefiledValues}
										apiData={apiData}
										refetchProduct={refetchProduct}
										loading={loading}
										addProductLoading={addProductLoading}
										hsCode={hsCode}
										deleteProduct={deleteProduct}
										setIsEdit={setIsEdit}
										isEdit={isEdit}
										isMobile={isMobile}
										showProductView={showProductView}
										activeTab={activeTab}
										setHSCode={setHSCode}
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
							isMobile={isMobile}
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
				</div>
			</div>
		</div>
	);
}

export default ProductsList;
