import {
	Tabs, TabPanel, Tooltip, Button,
} from '@cogoport/components';
import {
	IcMGrid,
	IcMPaste,
	IcMArrowBack,
	IcMPlus,
} from '@cogoport/icons-react';
import { useState } from 'react';

import Loading from '../assets/loading.svg';
import HsCodeIconMaping from '../common/hsCodeIcons';
import EmptyState from '../common/List/EmptyState';
import useEdit from '../hooks/useEdit';
import useHSCodelist from '../hooks/useHsCodeList';
import useProductCatalogue from '../hooks/useProductCatalogue';

import AllProducts from './AllProducts';
import Dashboard from './Dashboard';
import UploadDocument from './Dashboard/UploadDocument';
import HsCodeModal from './HsCodeModal';
import styles from './styles.module.css';
import SubCategory from './SubCategories';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function ProductInventory() {
	const [activeTab, setActiveTab] = useState('allProducts');
	const [showProductView, setShowProductView] = useState(false);

	const [archiveList, setArciveList] = useState(false);
	const { hsList, loading: hsLoading, fetch } = useHSCodelist();
	const { Mapping } = HsCodeIconMaping(false);
	const [subCategory, setSubCategory] = useState([]);
	const [hsCode, setHSCode] = useState(false);
	const [activeHeaderTab, setActiveHeaderTab] = useState('');
	const [showProduct, setShowProduct] = useState(false);
	const [prefiledValues, setPrefiledValues] = useState({});
	const [sectionTab, setSectionTab] = useState('products');
	const [uploadModal, setUploadModal] = useState(false);
	const { profile, general } = useSelector((state) => state);
	const { isMobile } = general;
	const {
		addProductLoading,
		apiData = {},
		refetchProduct,
		loading = false,
		deleteProduct,
	} = useProductCatalogue({
		archive: false,
		fetch,
		setShowProductView,
	});

	const [isEdit, setIsEdit] = useState(false);

	const { addProduct } = useEdit({
		setShowProduct,
		refetchProduct,
		setHSCode,
	});
	const countryInfo = profile?.organization?.country;
	const { push } = useRouter();
	const handelRouting = () => {
		push('/saas/product-inventory/archived');
		setArciveList(!archiveList);
	};

	const checkLength = apiData?.totalRecords;

	return (
		<>
			<div className={styles.container}>
				{isMobile && (
					<div className={styles.product_analytics_tab_ctn}>
						<Tabs
							activeTab={sectionTab}
							onChange={setSectionTab}
							className="horizontal two"
						>
							<TabPanel name="products" title="Products" className="horizontal one" />
							<TabPanel name="analytics" title="Analytics" className="horizontal one">
								<div className={styles.dashboard_data}>
									<Dashboard apiData={apiData} activeTab={activeTab} />
								</div>
							</TabPanel>
						</Tabs>
					</div>
				)}
				{(sectionTab === 'products' || !isMobile) && (
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
									theme="light-border"
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
										<div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
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
													setPrefixledValues={setPrefiledValues}
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
				)}
				{!isMobile && (
					<div style={{ width: '30%' }}>
						<Dashboard apiData={apiData} activeTab={activeTab} isMobile={isMobile} />
					</div>
				)}
			</div>

			{hsCode && (
				<HsCodeModal
					hsCode={hsCode}
					setHSCode={setHSCode}
					showProduct={showProduct}
					setShowProduct={setShowProduct}
					countryInfo={countryInfo}
					prefiledValues={prefiledValues}
					setPrefiledValues={setPrefiledValues}
					addProduct={addProduct}
					refetchProduct={refetchProduct}
					setActiveTab={setActiveTab}
					isMobile={isMobile}
				/>
			)}

			{uploadModal && (
				<UploadDocument
					uploadModal={uploadModal}
					setUploadModal={setUploadModal}
					refetchProduct={refetchProduct}
				/>
			)}
		</>
	);
}

export default ProductInventory;
