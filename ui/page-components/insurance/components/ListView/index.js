import { Input, Chips, Button, Table, Pagination } from '@cogoport/components';
import { IcMPlus, IcMSearchlight, IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import CancellationAndConfirmModal from '../../common/CancellationModal';
import FAQComponent from '../../common/FAQComponent';
import PreviewModal from '../../common/PreviewModal';
import redirectUrl from '../../common/redirectUrl';
import renderFunctions from '../../common/renderFunctions';
import listConfig from '../../configurations/list';
import usePreviewModal from '../../hooks/useGetPreviewDetails';
import userSummary from '../../hooks/useGetSummaryDetails';
import useList from '../../hooks/useList';

import FilterSection from './Filter';
import segementedOpt from './Options/index';
import styles from './styles.module.css';

function ListView() {
	const { isMobile } = useSelector((state) => state);
	const [activeTab, setActiveTab] = useState('ALL');
	const [cancelModal, setCancelModal] = useState(false);
	const [showFaq, setFaq] = useState('none');
	const [showPreviewModal, setShowPreviewModal] = useState(false);
	const [cancellationPolicyDetails, setcancellationPolicyDetails] = useState('');
	const [rotateIcon, setRotateIcon] = useState(false);

	const { loading, data, setFilters, filters, setSort, sort } = useList({ activeTab });

	const { summaryData, summaryLoading } = userSummary({ activeTab, filters, sort });

	const { respData, refetchPreview, previewloading = false } = usePreviewModal();

	const { list, pageNo = 0, totalRecords = 0 } = data || {};

	const { redirectHome, redirectBuy } = redirectUrl();

	const downloadFunction = ({ itemData }) => {
		const { policyId } = itemData || {};
		// eslint-disable-next-line no-undef
		window.open(
			`${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/insurance/pdf/${policyId}`,
		);
	};

	const handleTabChange = (value) => {
		setActiveTab(value);
		setFilters(() => ({
			page      : 1,
			pageLimit : 10,
		}));
	};

	const createFunction = () => {
		setRotateIcon(true);
		redirectHome();
	};

	const cancellationFunction = ({ itemData }) => {
		setcancellationPolicyDetails(itemData);
		setCancelModal(true);
	};

	const { Content } = renderFunctions({
		redirectBuy,
		downloadFunction,
		refetchPreview,
		isMobile,
		showPreviewModal,
		setShowPreviewModal,
		previewloading,
		cancellationFunction,
	});

	const fields = listConfig({ setSort, sort, Content });

	return (
		<>
			<FAQComponent showFaq={showFaq} setFaq={setFaq} />
			<div className={isMobile ? styles.header_mobile : styles.header}>
				<div className={styles.title}>My Policies</div>
				<div className={isMobile ? styles.button_div_mobile : styles.button_div}>
					<div className={styles.search_wrapper}>
						<Input
							className="search"
							size="sm"
							onChange={(e) => setFilters((prev) => ({
								...prev,
								searchTerm : e,
								page       : 1,
							}))}
							placeholder="Search by Country or Policy Id"
							suffix={<IcMSearchlight height={30} />}
						/>
					</div>
					<FilterSection
						isMobile={isMobile}
						filters={filters}
						setFilters={setFilters}
						activeTab={activeTab}
					/>
					{!isMobile && (
						<Button onClick={() => redirectHome()} size="md">
							<IcMPlus height={10} width={10} />
							<div>Create New</div>
						</Button>
					)}
				</div>
			</div>
			<div className={styles.segment_faq}>
				<Chips
					size="lg"
					items={segementedOpt(summaryData, activeTab, summaryLoading)}
					selectedItems={activeTab}
					onItemChange={handleTabChange}
					className={styles.chips}
				/>
				{showFaq === 'none' &&				(
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/faq.svg"
						alt=""
						onClick={() => setFaq('block')}
						role="presentation"
						width="60px"
						height="45px"
					/>
				)}
			</div>
			<Table
				columns={fields || []}
				data={list || []}
				loading={loading}
				loadingRowsCount={10}
				className={styles.table}
			/>
			{data?.list?.length > 0 && (
				<div className={styles.pagination_div}>
					<Pagination
						type="table"
						pageSize={10}
						pageLimit={10}
						totalItems={totalRecords}
						currentPage={pageNo}
						onPageChange={(val) => {
							setFilters((prev) => ({ ...prev, page: val }));
						}}
					/>
				</div>
			)}
			{!previewloading && showPreviewModal && (
				<PreviewModal
					showPreviewModal={showPreviewModal}
					setShowPreviewModal={setShowPreviewModal}
					formDetails={respData}
				/>
			)}
			{isMobile && (
				<div
					className={styles.mobile_create}
					onClick={() => createFunction()}
					role="presentation"
				>
					<IcMPlusInCircle
						className={rotateIcon && styles.rotate}
						fill="#db4634"
						width={50}
						height={50}
					/>
				</div>
			)}
			{cancelModal && (
				<CancellationAndConfirmModal
					cancelModal={cancelModal}
					cancellationPolicyDetails={cancellationPolicyDetails}
					setCancelModal={setCancelModal}
				/>
			)}
		</>
	);
}

export default ListView;
