import { Pagination } from '@cogoport/components';
import { get, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import LoadingState from '../../../../../LoadingState';

import OthersDocumentItem from './OthersDocumentItem';
import OthersDocumentModal from './OthersDocumentModal';
import styles from './styles.module.css';

// import EmptyState from '@/commons/components/EmptyState';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {Object} 	[tradePartyData]
 * @property {string} 	[documentType]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {boolean} 	[loading]
 * @property {Object} 	[data]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[pagination]
 * @property {function} [setPagination]
 */
function OthersDocument(props) {
	const {
		orgResponse,
		tradePartyType,
		tradePartyData,
		showModal,
		setShowModal,
		loading,
		data,
		getOrganizationDocuments,
		pagination,
		setPagination,
	} = props;

	const [editOthersDocumentItem, setEditOthersDocumentItem] = useState({});

	const { t } = useTranslation(['profile']);

	const translationKey =		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments';

	if (loading) {
		return <LoadingState />;
	}

	const renderOthersDocumentModal = () => (
		<OthersDocumentModal
			orgResponse={orgResponse}
			tradePartyType={tradePartyType}
			tradePartyId={tradePartyData.id}
			showModal={showModal}
			setShowModal={setShowModal}
			getOrganizationDocuments={getOrganizationDocuments}
			editOthersDocumentItem={editOthersDocumentItem}
			setEditOthersDocumentItem={setEditOthersDocumentItem}
		/>
	);

	const list = data?.list || [];
	const totalCount = data?.total_count || 0;

	if (isEmpty(list)) {
		return (
			<>
				{/* <EmptyState
					height={125}
					width={125}
					bottomText={t(`${translationKey}.emptyState.buttonText`)}
				/> */}

				{renderOthersDocumentModal()}
			</>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.row_container}>
				{list.map((item, index) => (
					<div className={styles.column_container} key={item.id}>
						<OthersDocumentItem
							data={item}
							onClickEditButton={() => setShowModal(() => {
								setEditOthersDocumentItem(item);

								return true;
							})}
							marginBottom={index === list.length - 1 ? 0 : '16px'}
						/>
					</div>
				))}
			</div>

			{totalCount >= 10 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						pageSize={pagination.page_limit}
						totalItems={totalCount}
						currentPage={pagination.page}
						onPageChange={(newPage) => setPagination((previousState) => ({
							...previousState,
							page: newPage,
						}))}
					/>
				</div>
			)}

			{renderOthersDocumentModal()}
		</div>
	);
}

export default OthersDocument;
