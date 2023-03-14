/* eslint-disable no-undef */
import { Input, Chips, Button } from '@cogoport/components';
import { IcMPlus, IcMSearchlight, IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import CancellationAndConfirmModal from '../../common/CancellationModal';
import FAQComponent from '../../common/FAQComponent';
import List from '../../common/List';
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
	const [click, setClick] = useState('');
	const [cancellationPolicyDetails, setcancellationPolicyDetails] = useState('');
	const [rotateIcon, setRotateIcon] = useState(false);

	const { loading, data, setFilters, filters, setSort, sort } = useList({ activeTab });

	const { summaryData, summaryLoading } = userSummary({ activeTab, filters, sort });

	const { redirectHome, redirectBuy } = redirectUrl();

	const { respData, refetchPreview, previewloading = false } = usePreviewModal();

	const downloadFunction = ({ itemData }) => {
		const { policyId } = itemData || {};
		window.open(
			`${process.env.BUSINESS_FINANCE_BASE_URL}/saas/insurance/pdf/${policyId}`,
		);
	};

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	const createFunction = () => {
		setRotateIcon(true);
		redirectHome();
	};

	const cancellationFunction = ({ itemData }) => {
		setcancellationPolicyDetails(itemData);
		setCancelModal(true);
	};

	const { functions } = renderFunctions({
		setClick,
		redirectBuy,
		downloadFunction,
		refetchPreview,
		isMobile,
		showPreviewModal,
		setShowPreviewModal,
		previewloading,
		cancellationFunction,
	});

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
								searchTerm : e?.target?.value,
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
			<div className={styles.list_container}>
				<List
					config={listConfig}
					data={data || []}
					loading={loading}
					setGlobalFilters={setFilters}
					showPagination="true"
					functions={functions}
					sort={sort}
					setSort={setSort}
					isMobile={isMobile}
				/>
			</div>
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
					click={click}
				/>
			)}
		</>
	);
}

export default ListView;
