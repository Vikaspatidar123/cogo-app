import { Pagination, ToolTip, Table } from '@cogoport/components';
// import ToolTip from '@cogoport/front/components/admin/ToolTip';
// import Grid from '@cogoport/front/components/Grid';
// import Table from '@cogoport/front/components/Table';
import {
	IcMArrowRight,
	IcAFormsAndCertificates,
	IcMSearchlight,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AddProductModal from '../../../common/AddProductModal';
// import GetCountriesFilter from '../../../common/Countries';
import { ChapterColumns, HeadersColumns } from '../../../common/HsCodeProduct';
import {
	FlexDiv,
	StyledHSCODElabel,
	SelectLabel,
	Select,
	StyledColumnHeading,
	FlexDiv2,
	SelectLabel2,
	STyledROW,
	TableWrapper,
	DIVHSCode,
	SubHeading,
	HSCodeTableWrapper,
	AddButtonWrapper,
	TableWrapper2,
	TabHeader,
	StyledLoading,
	StyledBackButton,
	SelectRow,
	EndAlignDiv2,
	StyledTag2,
	Div,
} from '../style';

import EmptyState from './EmptyState';
import Stepper from './Stepper';

import LegendInput from '@/packages/forms/Business/LegendInput';

function HSCodelistAddproduct({
	ApiData = [],
	showProduct = false,
	setShowProduct = () => {},
	setHSCode = () => {},
	countryInfo = {},
	prefiledValues = {},
	setPrefiiledValues = () => {},
	hsCodeObj = [],
	refetchHsCode = () => {},
	headingObj = [],
	refetchHeading = () => {},
	loading = false,
	headingLoading = false,
	hsloading = false,
	countryforHscode = '',
	setCountryforHsCode = () => {},
	setSelectedCountry = () => {},
	selectedCountry = '',
	addProduct = () => {},
	refetchProduct = () => {},
	setActiveTab = () => {},
	isMobile = false,
	hsCodeResponse = {},
	setSearchTerm,
}) {
	const [page, setPage] = useState(1);
	const { pageSize, totalRecords } = hsCodeResponse || {};
	// const { Row, Col } = Grid;
	const [chaptersData, setChaptersData] = useState([]);
	const [activeSection, setActiveSection] = useState('');
	const [activeChapter, setActiveChapter] = useState('');
	const [activeheading, setActiveHeading] = useState('');
	const [hscoderow, setHsCodeRow] = useState({});
	const [activeHeadingRow, setActiveHeadingRow] = useState({});
	const [activeStepper, setActiveStepper] = useState({
		description : false,
		section     : false,
		chapter     : false,
		hsCode      : false,
	});
	const [previousStepper, setPreviousStepper] = useState({
		showCategoryTable : true,
		showChapterTable  : false,
		showHeadingTable  : false,
		showhscode        : false,
	});
	const {
		showCategoryTable, showChapterTable, showHeadingTable, showhscode,
	} =		previousStepper || {};
	const columns = [
		{
			id     : 'sectionDescription',
			Header : (
				<SelectRow>
					{/* {!isMobile ? (
						// <Col xs={8}>
						// 	<GetCountriesFilter
						// 		setCountryforHsCode={setCountryforHsCode}
						// 		setSelectedCountry={setSelectedCountry}
						// 	/>
						// </Col>
					) : (
						// <Col>
						// 	<GetCountriesFilter
						// 		setCountryforHsCode={setCountryforHsCode}
						// 		setSelectedCountry={setSelectedCountry}
						// 	/>
						// </Col>
					)} */}
				</SelectRow>
			),
			key      : 'sectionDescription',
			accessor : (record) => (
				// <Row align="center">
				// 	<Col>
				// 		<DIVHSCode className="rowcss">
				// 			{record?.sectionCode}
				// 			{' '}
				// 			{'   '}
				// 			{' '}
				// 			{record?.sectionDescription}
				// 		</DIVHSCode>
				// 	</Col>
				// </Row>
				<div>hiii</div>
			),
		},
	];
	const HsCodeColumns = [
		{
			id     : 'hscodeDescription',
			Header : (
				<SelectRow>
					<EndAlignDiv2>
						<StyledTag2>{selectedCountry || 'INDIA'}</StyledTag2>
					</EndAlignDiv2>
				</SelectRow>
			),
			key      : 'description',
			accessor : (record) => (
				<DIVHSCode className="rowcss">
					{record?.displayHsCode}
					{' '}
					{'      '}
					{' '}
					{record?.description}
				</DIVHSCode>
			),
		},
	];
	const hsRowLength = Object.keys(hscoderow).length === 0;
	const previousFunction = () => {
		const values = Object.values(previousStepper);
		const keys = Object.keys(previousStepper);
		const activeStepperKeys = Object.keys(activeStepper);
		values.forEach((x, index) => {
			if (x) {
				setPreviousStepper((prev) => ({
					...prev,
					[keys[index - 1]] : true,
					[keys[index]]     : false,
				}));
				setActiveStepper((prev) => ({
					...prev,
					[activeStepperKeys[index - 1]] : false,
					[activeStepperKeys[index]]     : false,
				}));
			}
		});
	};

	return (
		<>
			<TableWrapper2>
				<FlexDiv>
					<div className="title">
						<IcAFormsAndCertificates width={25} height={25} />
						<StyledHSCODElabel>HS Code</StyledHSCODElabel>
					</div>
					{showCategoryTable && (
						<div className="search">
							<LegendInput
								placeholder="Search By Hs Code"
								suffix={IcMSearchlight}
								className="inputbox"
								labelClassName="labelText"
								onChange={(e) => setSearchTerm(e.target.value)}
								type="number"
								width={20}
								height={20}
							/>
						</div>
					)}
				</FlexDiv>
				{!isMobile ? (
					<STyledROW>
						<Col xs={0.8}>
							<Select>Select:</Select>
						</Col>
						<StyledColumnHeading xs={!isMobile ? 1.75 : 3.5}>
							{showCategoryTable ? (
								<FlexDiv2>
									<SelectLabel2>Description </SelectLabel2>
									<IcMArrowRight />
								</FlexDiv2>
							) : (
								activeSection && (
									<FlexDiv2>
										<SelectLabel
											onClick={() => {
												setPreviousStepper({
													...previousStepper,
													showCategoryTable : true,
													showChapterTable  : false,
													showHeadingTable  : false,
													showhscode        : false,
												});
												setActiveChapter();
												setActiveHeading();
											}}
											role="presentation"
										>
											Description
										</SelectLabel>
										<IcMArrowRight />
									</FlexDiv2>
								)
							)}
						</StyledColumnHeading>
						<StyledColumnHeading xs={1.5}>
							{showChapterTable ? (
								<FlexDiv2>
									<SelectLabel2>Section </SelectLabel2>
									<IcMArrowRight />
								</FlexDiv2>
							) : (
								activeChapter && (
									<FlexDiv2>
										<SelectLabel
											onClick={() => {
												setPreviousStepper({
													...previousStepper,
													showCategoryTable : false,
													showChapterTable  : true,
													showHeadingTable  : false,
													showhscode        : false,
												});
												setActiveHeading();
											}}
											role="presentation"
										>
											Section
										</SelectLabel>
										<IcMArrowRight />
									</FlexDiv2>
								)
							)}
						</StyledColumnHeading>
						<StyledColumnHeading xs={1.6}>
							{showHeadingTable ? (
								<FlexDiv2>
									<SelectLabel2>Chapter </SelectLabel2>
									<IcMArrowRight />
								</FlexDiv2>
							) : (
								activeheading && (
									<FlexDiv2>
										<SelectLabel
											onClick={() => {
												setPreviousStepper({
													...previousStepper,
													showChapterTable  : false,
													showHeadingTable  : true,
													showCategoryTable : false,
													showhscode        : false,
												});
											}}
											role="presentation"
										>
											Chapter
										</SelectLabel>
										<IcMArrowRight />
									</FlexDiv2>
								)
							)}
						</StyledColumnHeading>
						<StyledColumnHeading xs={1.3}>
							{showhscode && (
								<FlexDiv2>
									<SelectLabel2>HS Code </SelectLabel2>
									<IcMArrowRight />
								</FlexDiv2>
							)}
						</StyledColumnHeading>
					</STyledROW>
				) : (
					<Stepper activeStepper={activeStepper} />
				)}
				{!isMobile && (
					<TabHeader>
						{activeSection
							&& (activeSection.length > 25 ? (
								<ToolTip content={startCase(activeSection).toLowerCase()} theme="light">
									<SubHeading>
										{startCase(activeSection?.toLowerCase()).substring(0, 25)}
										... |
									</SubHeading>
								</ToolTip>
							) : (
								<SubHeading>
									{startCase(activeSection?.toLowerCase())}
									{' '}
									|
									{' '}
								</SubHeading>
							))}
						{activeChapter
							&& (activeChapter.length > 25 ? (
								<ToolTip content={startCase(activeChapter)} theme="light">
									<SubHeading>
										{startCase(activeChapter).substring(0, 25)}
										... |
									</SubHeading>
								</ToolTip>
							) : (
								<SubHeading>
									{' '}
									{startCase(activeChapter)}
									{' '}
									|
									{' '}
								</SubHeading>
							))}
						{activeheading
							&& (activeChapter.length > 25 ? (
								<ToolTip content={startCase(activeheading)} theme="light">
									<SubHeading>
										{startCase(activeheading).substring(0, 25)}
										...
										{' '}
									</SubHeading>
								</ToolTip>
							) : (
								<SubHeading>
									{' '}
									{startCase(activeheading)}
									{' '}
								</SubHeading>
							))}
					</TabHeader>
				)}
				{ApiData.length === 0 && <EmptyState />}
				{showCategoryTable && ApiData.length > 0 && (
					<TableWrapper>
						{loading && <StyledLoading />}
						{!loading && (
							<Table
								className="tables"
								columns={columns || []}
								data={ApiData || []}
								fixedHeader
								theme="admin"
								selectType="single"
								onRowSelect={() => {}}
								loading={loading}
								onRowClick={(row) => {
									setChaptersData(row?.chapters);
									setPrefiiledValues((prev) => ({
										...prev,
										category: row?.sectionDescription,
									}));
									setActiveSection(row?.sectionDescription);
									setActiveStepper({ ...activeStepper, description: true });
									setPreviousStepper({
										...previousStepper,
										showCategoryTable : false,
										showChapterTable  : true,
										showHeadingTable  : false,
										showhscode        : false,
									});
								}}
							/>
						)}
					</TableWrapper>
				)}
				{showChapterTable && (
					<TableWrapper>
						<Table
							className="tables"
							columns={ChapterColumns || []}
							data={chaptersData || []}
							fixedHeader
							selectType="single"
							theme="admin"
							onRowSelect={() => {}}
							onRowClick={async (row) => {
								setActiveChapter(row?.chapterDescription);
								setPrefiiledValues((prev) => ({
									...prev,
									subCategory: row?.chapterDescription,
								}));
								await refetchHeading(row?.chapterCode);
								setActiveStepper({ ...activeStepper, section: true });
								setPreviousStepper({
									...previousStepper,
									showChapterTable : false,
									showHeadingTable : true,
								});
							}}
						/>
					</TableWrapper>
				)}

				{showHeadingTable && (
					<TableWrapper>
						{headingLoading && <StyledLoading />}
						{!headingLoading && (
							<Table
								className="tables"
								columns={HeadersColumns || []}
								data={headingObj || []}
								fixedHeader
								theme="admin"
								selectType="single"
								onRowSelect={() => {}}
								onRowClick={async (row) => {
									setActiveHeadingRow(row?.headingCode);
									setActiveHeading(row?.headingDescription);
									await refetchHsCode({
										row,
										countryforHscode,
										activeHeadingRow,
										pagination: 1,
									});
									setActiveStepper({ ...activeStepper, chapter: true });
									setPreviousStepper({
										...previousStepper,
										showHeadingTable : false,
										showhscode       : true,
									});
								}}
								loading={headingLoading}
							/>
						)}
					</TableWrapper>
				)}

				{showhscode && !hsloading && (
					<div>
						<HSCodeTableWrapper>
							<TableWrapper>
								{hsloading && <StyledLoading />}
								{!hsloading && (
									<Table
										className="tables"
										columns={HsCodeColumns || []}
										data={hsCodeObj || []}
										fixedHeader
										theme="admin"
										selectType="single"
										onRowClick={(row) => {
											setHsCodeRow(row);
											setActiveStepper({
												...activeStepper,
												hsCode      : true,
												description : false,
												section     : false,
												chapter     : false,
											});
										}}
										onRowSelect={() => {}}
										loading={hsloading}
									/>
								)}
							</TableWrapper>
						</HSCodeTableWrapper>
					</div>
				)}

				<AddButtonWrapper>
					{isMobile && showCategoryTable === false && (
						<StyledBackButton
							className="primary md text prevBtn"
							onClick={() => {
								previousFunction();
							}}
						>
							Previous
						</StyledBackButton>
					)}
					{showhscode && !hsloading && (
						<Div>
							<Pagination
								className="sm"
								pageLimit={pageSize}
								total={totalRecords}
								pagination={page}
								setPagination={async (e) => {
									setPage(e);
									await refetchHsCode({
										countryforHscode,
										activeHeadingRow,
										pagination: e,
									});
								}}
							/>
							<StyledBackButton
								className={`${hsRowLength && 'disableBtn'} secondary md`}
								onClick={() => {
									setPrefiiledValues((prev) => ({
										...prev,
										hscode   : hscoderow?.hsCode,
										hsCodeId : hscoderow?.id,
									}));
									setShowProduct(true);
								}}
								disabled={hsRowLength}
							>
								Add
							</StyledBackButton>
						</Div>
					)}
				</AddButtonWrapper>
			</TableWrapper2>

			{showProduct && (
				<AddProductModal
					showProduct={showProduct}
					setShowProduct={setShowProduct}
					setHSCode={setHSCode}
					prefiledValues={prefiledValues}
					countryInfo={countryInfo}
					addProduct={addProduct}
					refetchProduct={refetchProduct}
					setActiveTab={setActiveTab}
					isMobile={isMobile}
				/>
			)}
		</>
	);
}

export default HSCodelistAddproduct;
