import { Pagination } from '@cogoport/components';
import { get, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import LoadingState from '../../../../../LoadingState';

import BankDetailsDocumentItem from './BankDetailsDocumentItem';
import BankDetailsDocumentModal from './BankDetailsDocumentModal';
import styles from './styles.module.css';

// import EmptyState from '@/commons/components/EmptyState';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {boolean} 	[loading]
 * @property {Object} 	[data]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[pagination]
 * @property {function} [setPagination]
 */
function BankDetailsDocument(props) {
	const {
		orgResponse,
		tradePartyData,
		showModal,
		setShowModal,
		loading,
		data,
		getOrganizationDocuments,
		pagination,
		setPagination,
	} = props;

	const [editBankDetailsDocumentItem, setEditBankDetailsDocumentItem] =		useState({});

	const { t } = useTranslation(['profile']);

	if (loading) {
		return <LoadingState />;
	}

	const renderBankDetailsDocumentModal = () => (
		<BankDetailsDocumentModal
			orgResponse={orgResponse}
			tradePartyId={tradePartyData.id}
			showModal={showModal}
			setShowModal={setShowModal}
			getOrganizationDocuments={getOrganizationDocuments}
			editBankDetailsDocumentItem={editBankDetailsDocumentItem}
			setEditBankDetailsDocumentItem={setEditBankDetailsDocumentItem}
		/>
	);

	const list = data.list || [];
	const totalCount = data.total_count || 0;

	if (isEmpty(list)) {
		return (
			<>
				{/* <EmptyState
					height={124}
					width={124}
					bottomText={t(
						'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.bankDetailsDocument.emptyState',
					)}
				/> */}

				{renderBankDetailsDocumentModal()}
			</>
		);
	}

	return (
		<div className={styles.container}>
			{list.map((item, index) => (
				<BankDetailsDocumentItem
					key={item.id}
					data={item}
					onClickEditButton={() => setShowModal(() => {
						setEditBankDetailsDocumentItem(item);

						return true;
					})}
					marginBottom={index === list.length - 1 ? 0 : '16px'}
				/>
			))}

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

			{renderBankDetailsDocumentModal()}
		</div>
	);
}

export default BankDetailsDocument;
