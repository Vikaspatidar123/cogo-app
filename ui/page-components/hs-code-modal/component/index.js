import {
	Button, Pagination, Modal, Input, cl,
} from '@cogoport/components';
import {
	IcAFormsAndCertificates,
	IcMArrowBack,
	IcMSearchlight,
} from '@cogoport/icons-react';
import { useState } from 'react';

import useHsCodeData from '../hook/useHsCodeData';

import useClickFunction from './clickFunction';
import hsColumn from './Column';
import { Loading } from './Configuration/icon-configuration';
import HsTable from './HsTable';
import HsTag from './HsTag';
import Stepper from './Stepper';
import styles from './styles.module.css';

function HsCode({
	showHsCodeModal,
	setShowHsCodeModal,
	setSelectedData,
	setShowProduct,
	setPrefiledValues,
}) {
	const [chaptersData, setChaptersData] = useState([]);
	const [headingData, setHeadingData] = useState();
	const [activeSection, setActiveSection] = useState('');
	const [activeChapter, setActiveChapter] = useState('');
	const [activeHeading, setActiveHeading] = useState('');
	const [headingCode, setHeadingCode] = useState();
	const [pagination, setPagination] = useState(1);
	const [countryforHscode, setCountryforHsCode] = useState();
	const [selectedCountry, setSelectedCountry] = useState('INDIA');

	const [hsCodeRow, setHsCodeRow] = useState({});
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

	const values = Object.values(previousStepper);
	const keys = Object.keys(previousStepper);
	const activeStepperKeys = Object.keys(activeStepper);
	const hsRowLength = Object.keys(hsCodeRow).length === 0;

	const {
		secChapObj = [],
		headingObj = [],
		refetchHeading,
		hsCodeObj = [],
		refetchHsCode,
		loading = false,
		headingLoading = false,
		hsloading = false,
		searchTerm,
		setSearchTerm,
	} = useHsCodeData({ countryforHscode });

	const { pageSize, totalRecords, list } = hsCodeObj || {};
	const {
		sectionColumn, headersColumns, chapterColumns, hsCodeColumns,
	} = hsColumn({
		selectedCountry,
		setSelectedCountry,
		setCountryforHsCode,
	});

	const handleClick = () => {
		if (setShowProduct) {
			setShowProduct(true);
		}
		if (setPrefiledValues) {
			setPrefiledValues((prev) => ({
				...prev,
				hscode   : hsCodeRow?.hsCode,
				hsCodeId : hsCodeRow?.id,
			}));
		}
		setSelectedData(hsCodeRow);
		setShowHsCodeModal(false);
	};

	const {
		categoryFunction, chapterFunction, headingFunction, hsFunction,
	} =	useClickFunction({
		setChaptersData,
		setHeadingData,
		setActiveSection,
		setActiveStepper,
		setPreviousStepper,
		setActiveChapter,
		setActiveHeading,
		setHsCodeRow,
		refetchHeading,
		refetchHsCode,
		previousStepper,
		setHeadingCode,
		searchTerm,
		setPrefiledValues,
	});

	const previousFunction = () => {
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

	const headerFn = () => (
		<div className={styles.header_container}>
			<div className={styles.title_container}>
				<IcAFormsAndCertificates width={25} height={25} />
				<div className={styles.title}>HS Code</div>
			</div>
			{showCategoryTable && (
				<div className={styles.search}>
					<Input
						placeholder="Search By Hs Code"
						className={cl`${styles.input_box} ${styles.label_box}`}
						suffix={<IcMSearchlight width="20px" height="20px" className={styles.icon} />}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e)}
						type="number"
						width={20}
						height={20}
					/>
				</div>
			)}
		</div>
	);

	return (
		<Modal
			className="primary"
			show={showHsCodeModal}
			size="xl"
			onClose={() => setShowHsCodeModal(false)}
			scroll
		>
			<Modal.Header title={headerFn()} />
			<Modal.Body>

				<div className={styles.container}>

					<Stepper
						activeSection={activeSection}
						activeChapter={activeChapter}
						activeHeading={activeHeading}
						showCategoryTable={showCategoryTable}
						showChapterTable={showChapterTable}
						showHeadingTable={showHeadingTable}
						showhscode={showhscode}
						setPreviousStepper={setPreviousStepper}
						setActiveChapter={setActiveChapter}
						setActiveHeading={setActiveHeading}
						activeStepper={activeStepper}
					/>
					<div className={styles.hs_tag_web}>
						<HsTag
							activeSection={activeSection}
							activeChapter={activeChapter}
							activeHeading={activeHeading}
						/>
					</div>

					{showCategoryTable && (
						<div className={styles.table_wrapper}>
							{loading && <img src={Loading} alt="" className={styles.loading_style} />}
							{!loading && (
								<HsTable
									columns={sectionColumn}
									callbackFn={categoryFunction}
									data={secChapObj}
								/>
							)}
						</div>
					)}
					{showChapterTable && (
						<div className={styles.table_wrapper}>
							<HsTable
								columns={chapterColumns}
								callbackFn={chapterFunction}
								data={chaptersData}
							/>
						</div>
					)}
					{showHeadingTable && (
						<div className={styles.table_wrapper}>
							{headingLoading && <img src={Loading} alt="" className={styles.loading_style} />}
							{!headingLoading && (
								<HsTable
									columns={headersColumns}
									callbackFn={headingFunction}
									data={headingData || headingObj}
								/>
							)}
						</div>
					)}
					{showhscode && (
						<div>
							<div className={styles.hs_code_table_wrapper}>
								<div className={styles.table_wrapper}>
									{hsloading && <img src={Loading} alt="" className={styles.loading_style} />}
									{!hsloading && (
										<HsTable columns={hsCodeColumns} callbackFn={hsFunction} data={list} />
									)}
								</div>
							</div>
							<div className="pagination">
								<Pagination
									type="compact"
									currentPage={pagination}
									totalItems={totalRecords}
									pageSize={pageSize}
									onPageChange={async (e) => {
										setPagination(e);
										await refetchHsCode({
											headingCode,
											page: e,
										});
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</Modal.Body>

			{showCategoryTable === false && (
				<Modal.Footer>
					<div className={styles.add_button_wrapper}>

						<Button
							className={styles.prev_btn}
							size="md"
							themeType="secondary"
							onClick={() => {
								previousFunction();
							}}
						>
							<IcMArrowBack />
							{' '}
							Previous
						</Button>
						{showhscode && (
							<Button
								className={`${hsRowLength && styles.disable_btn} md`}
								size="md"
								themeType="primary"
								onClick={handleClick}
								disabled={hsRowLength}
							>
								Add
							</Button>
						)}
					</div>
				</Modal.Footer>
			)}
		</Modal>
	);
}

export default HsCode;
