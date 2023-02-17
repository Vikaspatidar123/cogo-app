import {
	Pagination, ToolTip, Table, Button,
} from '@cogoport/components';
// import {ToolTip, } from '@cogoport/components';
// import Grid from '@cogoport/front/components/Grid';
// import Table from '@cogoport/front/components/Table';
import {
	IcMArrowRight,
	IcAFormsAndCertificates,
	IcMSearchlight,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Loading from '../../../assets/loading.svg';
import AddProductModal from '../../../common/AddProductModal';
import GetCountriesFilter from '../../../common/Countries';
import { ChapterColumns, HeadersColumns } from '../../../common/HsCodeProduct';
// import {
// 	FlexDiv,
// 	StyledHSCODElabel,
// 	SelectLabel,
// 	Select,
// 	StyledColumnHeading,
// 	FlexDiv2,
// 	SelectLabel2,
// 	STyledROW,
// 	TableWrapper,
// 	DIVHSCode,
// 	SubHeading,
// 	HSCodeTableWrapper,
// 	AddButtonWrapper,
// 	TableWrapper2,
// 	TabHeader,
// 	StyledLoading,
// 	StyledBackButton,
// 	SelectRow,
// 	EndAlignDiv2,
// 	StyledTag2,
// 	Div,
// } from '../style';

import EmptyState from './EmptyState';
import Stepper from './Stepper';
import styles from './styles.module.css';

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
				<div className={styles.select_row}>
					{!isMobile ? (
						<div className={styles.col_container}>
							<GetCountriesFilter
								setCountryforHsCode={setCountryforHsCode}
								setSelectedCountry={setSelectedCountry}
							/>
						</div>
					) : (
						<div className={styles.col_container}>
							<GetCountriesFilter
								setCountryforHsCode={setCountryforHsCode}
								setSelectedCountry={setSelectedCountry}
							/>
						</div>
					)}
				</div>
			),
			key      : 'sectionDescription',
			accessor : (record) => (
				<div className={styles.row_container}>
					<div className={styles.col_container}>
						<div className={styles.divhs_code}>
							{record?.sectionCode}
							{' '}
							{'   '}
							{' '}
							{record?.sectionDescription}
						</div>
					</div>
				</div>
			),
		},
	];
	const HsCodeColumns = [
		{
			id     : 'hscodeDescription',
			Header : (
				<div className={styles.select_row}>
					<div className={styles.end_align_div2}>
						<div className={styles.styled_tag2}>{selectedCountry || 'INDIA'}</div>
					</div>
				</div>
			),
			key      : 'description',
			accessor : (record) => (
				<div className={styles.divhs_code}>
					{record?.displayHsCode}
					{' '}
					{'      '}
					{' '}
					{record?.description}
				</div>
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
			<div className={styles.table_wrapper_2}>
				<div className={styles.flex_div}>
					<div className="title">
						<IcAFormsAndCertificates width={25} height={25} />
						<div className={styles.styled_hscode_label}>HS Code</div>
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
				</div>
				{!isMobile ? (
					<div className={styles.styled_row}>
						<div className={styles.col_container}>
							<div className={styles.select}>Select:</div>
						</div>
						<div className={styles.row_container}>
							{showCategoryTable ? (
								<div className={styles.flex_div_2}>
									<div className={styles.select_label_2}>Description </div>
									<IcMArrowRight />
								</div>
							) : (
								activeSection && (
									<div className={styles.flex_div_2}>
										<div
											className={styles.select_label}
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
										</div>
										<IcMArrowRight />
									</div>
								)
							)}
						</div>
						<div className={styles.row_container}>
							{showChapterTable ? (
								<div className={styles.flex_div_2}>
									<div className={styles.select_label_2}>Section </div>
									<IcMArrowRight />
								</div>
							) : (
								activeChapter && (
									<div className={styles.flex_div_2}>
										<div
											className={styles.select_label}
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
										</div>
										<IcMArrowRight />
									</div>
								)
							)}
						</div>
						<div className={styles.row_container}>
							{showHeadingTable ? (
								<div className={styles.flex_div_2}>
									<div className={styles.select_label_2}>Chapter </div>
									<IcMArrowRight />
								</div>
							) : (
								activeheading && (
									<div className={styles.flex_div_2}>
										<div
											className={styles.select_label}
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
										</div>
										<IcMArrowRight />
									</div>
								)
							)}
						</div>
						<div className={styles.row_container}>
							{showhscode && (
								<div className={styles.flex_div_2}>
									<div className={styles.select_label_2}>HS Code </div>
									<IcMArrowRight />
								</div>
							)}
						</div>
					</div>
				) : (
					<Stepper activeStepper={activeStepper} />
				)}
				{!isMobile && (
					<div className={styles.tab_header}>
						{activeSection
							&& (activeSection.length > 25 ? (
								<ToolTip content={startCase(activeSection).toLowerCase()} theme="light">
									<div className={styles.sub_heading}>
										{startCase(activeSection?.toLowerCase()).substring(0, 25)}
										... |
									</div>
								</ToolTip>
							) : (
								<div className={styles.sub_heading}>
									{startCase(activeSection?.toLowerCase())}
									{' '}
									|
									{' '}
								</div>
							))}
						{activeChapter
							&& (activeChapter.length > 25 ? (
								<ToolTip content={startCase(activeChapter)} theme="light">
									<div className={styles.sub_heading}>
										{startCase(activeChapter).substring(0, 25)}
										... |
									</div>
								</ToolTip>
							) : (
								<div className={styles.sub_heading}>
									{' '}
									{startCase(activeChapter)}
									{' '}
									|
									{' '}
								</div>
							))}
						{activeheading
							&& (activeChapter.length > 25 ? (
								<ToolTip content={startCase(activeheading)} theme="light">
									<div className={styles.sub_heading}>
										{startCase(activeheading).substring(0, 25)}
										...
										{' '}
									</div>
								</ToolTip>
							) : (
								<div className={styles.sub_heading}>
									{' '}
									{startCase(activeheading)}
									{' '}
								</div>
							))}
					</div>
				)}
				{ApiData.length === 0 && <EmptyState />}
				{showCategoryTable && ApiData.length > 0 && (
					<div className={styles.table_wrapper}>
						{loading && <Loading className={styles.styled_loading} />}
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
					</div>
				)}
				{showChapterTable && (
					<div className={styles.table_wrapper}>
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
					</div>
				)}

				{showHeadingTable && (
					<div className={styles.table_wrapper}>
						{headingLoading && <Loading className={styles.styled_loading} />}
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
					</div>
				)}

				{showhscode && !hsloading && (
					<div>
						<div className={styles.hscode_table_wrapper}>
							<div className={styles.table_wrapper}>
								{hsloading && <Loading className={styles.styled_loading} />}
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
							</div>
						</div>
					</div>
				)}

				<div className={styles.add_button_wrapper}>
					{isMobile && showCategoryTable === false && (
						<Button
							className={styles.styled_back_button}
							// className="primary md text prevBtn"
							role="presentation"
							onClick={() => {
								previousFunction();
							}}
						>
							Previous
						</Button>
					)}
					{showhscode && !hsloading && (
						<div className={styles.div_container}>
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
							<Button
								className={styles.styled_back_button}
								// className={`${hsRowLength && 'disableBtn'} secondary md`}
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
							</Button>
						</div>
					)}
				</div>
			</div>

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
