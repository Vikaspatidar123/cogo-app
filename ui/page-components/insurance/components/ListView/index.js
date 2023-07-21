import { Input, Button, Pagination } from '@cogoport/components';
import { IcMPlus, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

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
import styles from './styles.module.css';
import TableComponent from './Table';

function ListView() {
	const [activeTab, setActiveTab] = useState('ALL');
	const [cancelModal, setCancelModal] = useState(false);
	const [showFaq, setFaq] = useState('none');
	const [showPreviewModal, setShowPreviewModal] = useState(false);
	const [cancellationPolicyDetails, setcancellationPolicyDetails] = useState('');

	const { loading:listLoading, data, setFilters, filters, setSort, sort, refetch } = useList({ activeTab });

	const { summaryData, summaryLoading } = userSummary({ activeTab, filters, sort });

	const { respData, refetchPreview, previewloading = false } = usePreviewModal();

	const { list, pageNo = 0, totalRecords = 0 } = data || {};

	const { redirectHome, redirectBuy } = redirectUrl();

	const downloadFunction = ({ itemData }) => {
		const { coiFile } = itemData || {};
		// eslint-disable-next-line no-undef
		window.open(coiFile, '_self');
	};

	const handleTabChange = (value) => {
		setActiveTab(value);
		setFilters(() => ({
			page      : 1,
			pageLimit : 10,
		}));
	};

	const cancellationFunction = ({ itemData, click }) => {
		setcancellationPolicyDetails({ policyDetails: itemData, click });
		setCancelModal(true);
	};

	const { Content } = renderFunctions({
		redirectBuy,
		downloadFunction,
		refetchPreview,
		showPreviewModal,
		setShowPreviewModal,
		previewloading,
		cancellationFunction,
	});

	const fields = listConfig({ setSort, sort, Content });

	return (
		<>
			<FAQComponent showFaq={showFaq} setFaq={setFaq} />
			<div className={styles.header}>
				<div className={styles.title}>My Policies</div>
				<div className={styles.button_div}>
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
							suffix={<IcMSearchlight height={30} style={{ marginRight: '10px' }} />}
						/>
					</div>
					<FilterSection
						filters={filters}
						setFilters={setFilters}
						activeTab={activeTab}
					/>
					<Button onClick={() => redirectHome()} size="md" type="button">
						<IcMPlus height={10} width={10} />
						<div>Create New</div>
					</Button>
				</div>
			</div>
			<div className={styles.flex_end}>
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
			<TableComponent
				fields={fields}
				list={list}
				summaryData={summaryData}
				activeTab={activeTab}
				handleTabChange={handleTabChange}
				data={data}
				loading={(listLoading || summaryLoading)}
				summaryLoading={summaryLoading}
			/>
			{!isEmpty(data?.list) && (
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
			{cancelModal && (
				<CancellationAndConfirmModal
					cancelModal={cancelModal}
					cancellationPolicyDetails={cancellationPolicyDetails}
					setCancelModal={setCancelModal}
					refetch={refetch}
				/>
			)}
		</>
	);
}

export default ListView;
