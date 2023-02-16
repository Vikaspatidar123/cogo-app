import { Tabs, TabPanel, Tooltip } from '@cogoport/components';
// import TabPanel from '@cogoport/front/components/admin/Tabs/TabPanel';
// import Tooltip from '@cogoport/front/components/admin/ToolTip';
import {
	IcMGrid,
	IcMPaste,
	IcMArrowRight,
	IcMArrowBack,
	// IcMDownload,
} from '@cogoport/icons-react';
import { useEffect, useState, useRef } from 'react';

// import { useSaasState } from '../../../common/context';

import HsCodeIconMaping from '../common/hsCodeIcons';
import EmptyState from '../common/List/EmptyState';
import { useWindowDimensions } from '../common/MobileView';
import useEdit from '../hooks/useEdit';
import useHSCodelist from '../hooks/useHsCodeList';
import useProductCatalogue from '../hooks/useProductCatalogue';

import AllProducts from './AllProducts';
import Dashboard from './Dashboard';
import UploadDocument from './Dashboard/UploadDocument';
import HsCodeModal from './HsCodeModal';
import {
	Container,
	WidthDiv,
	Heading,
	TitleSection,
	StyledButton,
	SubTitle,
	ScrollContent,
	StyledLoading,
	StyledDiv,
	StyledTabHeading,
	ColoredIcon,
	Label,
	TabDiv,
	Section,
	TotalRecords,
	TabHeader,
	BorderBottom,
	TitleStyled,
	ProductAnalyticsTabCtn,
	IcnContainer,
	ScrollContainer,
	LineWrapper,
	Line,
	Back,
	TitleDiv,
	// IconButton,
	StyledFilterSection,
	PlusIcon,
} from './style';
import SubCategory from './SubCategories';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';
// import useDownloadExcel from '../hooks/useDownloadExcel';

function ProductInventory() {
	const [isMobile, setIsMobile] = useState(false);
	const [activeTab, setActiveTab] = useState('allProducts');
	const { width } = useWindowDimensions();
	const [showProductView, setShowProductView] = useState(false);
	useEffect(() => {
		if (width < 1154) {
			setIsMobile(true);
			setShowProductView(false);
		} else {
			setShowProductView(true);
			setIsMobile(false);
		}
	}, [width]);

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
	const { profile } = useSelector((state) => state);
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

	// const { useDownloadProduct = () => {} } = useDownloadExcel({ refetchProduct });
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

	const scrollRef = useRef();

	const scrollHandler = () => {
		scrollRef.current.scrollLeft += 820;
	};
	const checkLength = apiData?.totalRecords;

	return (
		<>
			<Container direction={isMobile ? 'column' : 'row'}>
				{isMobile && (
					<ProductAnalyticsTabCtn>
						<Tabs
							activeTab={sectionTab}
							onChange={setSectionTab}
							className="horizontal two"
						>
							<TabPanel name="products" title="Products" className="horizontal one" />
							<TabPanel name="analytics" title="Analytics" className="horizontal one">
								<Section width={isMobile ? '100%' : '30%'}>
									<Dashboard apiData={apiData} activeTab={activeTab} />
								</Section>
							</TabPanel>
						</Tabs>
					</ProductAnalyticsTabCtn>
				)}
				{(sectionTab === 'products' || !isMobile) && (
					<WidthDiv width={isMobile ? '100%' : '70%'}>
						<Heading>
							<TitleSection>
								<h1 className="title">Products Catalogue</h1>
								<LineWrapper>
									<Line />
								</LineWrapper>
							</TitleSection>
							<div className="flex">
								<Tooltip
									theme="light-border"
									content="Click to view archived List"
									placement="bottom"
								>
									<div className="archived" role="presentation">
										<IcMPaste onClick={handelRouting} width={30} height={30} />
									</div>
								</Tooltip>

								{/* <Tooltip
										theme="light-border"
										content="Download Product Catalogue Details"
										placement="bottom"
									>
										<IconButton>
											<IcMDownload
												height={isMobile ? 30 : 27}
												width={isMobile ? 30 : 27}
												onClick={() => useDownloadProduct(false)}
											/>
										</IconButton>
									</Tooltip> */}

								<StyledButton onClick={() => setUploadModal(true)}>
									Import product
								</StyledButton>

								{!isMobile && (
									<StyledButton disabled={hsLoading} onClick={() => setHSCode(true)}>
										+ Add New
									</StyledButton>
								)}
							</div>
						</Heading>
						<ScrollContent>
							{(!showProductView || !isMobile) && (
								<>
									<SubTitle>Select Category</SubTitle>
									{hsLoading ? (
										<StyledLoading />
									) : (
										<div>
											{hsList.length > 0 && (
												<div className="scroll">
													<ScrollContainer ref={scrollRef}>
														<StyledDiv className="tabs-css">
															<Tabs
																activeTab={activeTab}
																onChange={setActiveTab}
																className="horizontal one tabs catgeory"
															>
																<TabPanel
																	name="allProducts"
																	title={(
																		<TitleDiv
																			onClick={() => {
																				setShowProductView(true);
																				refetchProduct({});
																			}}
																		>
																			<IcMGrid fill="#d94646" />
																			<Label>All Products</Label>
																		</TitleDiv>
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
																				<StyledTabHeading
																					role="presentation"
																					onClick={() => {
																						setSubCategory(item.subCategory);
																						setShowProductView(true);
																						setActiveHeaderTab();
																					}}
																				>
																					<ColoredIcon>
																						{Mapping[categoryCode]}
																					</ColoredIcon>
																					{categoryDisplayName}
																				</StyledTabHeading>
																			)}
																		/>
																	);
																})}
															</Tabs>
															{isMobile && (
																<StyledFilterSection className="pulse">
																	<div
																		className="btn"
																		role="presentation"
																		onClick={() => setHSCode(true)}
																	>
																		<PlusIcon fill="#ffffff" height={50} width={50} />
																	</div>
																</StyledFilterSection>
															)}
														</StyledDiv>
													</ScrollContainer>
													{!isMobile && hsList.length > 4 && (
														<IcnContainer onClick={scrollHandler}>
															<IcMArrowRight
																className="animatedArrow"
																width={35}
																height={35}
															/>
															<IcMArrowRight width={35} height={35} />
														</IcnContainer>
													)}
												</div>
											)}
										</div>
									)}
								</>
							)}

							{isMobile && showProductView && (
								<Back>
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
								</Back>
							)}

							<TabDiv>
								{activeTab === 'allProducts' && showProductView && (
									<>
										<TabHeader>
											<IcMGrid fill="#d94646" />
											<TitleStyled>All Products</TitleStyled>
											<TotalRecords>{!loading ? checkLength : '...'}</TotalRecords>
										</TabHeader>
										<BorderBottom />
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
							</TabDiv>
						</ScrollContent>
					</WidthDiv>
				)}
				{!isMobile && (
					<Section>
						<Dashboard apiData={apiData} activeTab={activeTab} isMobile={isMobile} />
					</Section>
				)}
			</Container>

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
