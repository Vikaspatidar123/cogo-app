// import { Pagination } from '@cogoport/front/components/admin';
// import React from 'react';

// import EmptyState from '../../../../commons/EmptyState';
// import Loader from '../Loader';

// import DocumentCard from './DocumentCard';
// import {
// 	Header,
// 	PaginationContainer,
// 	DocumentCardContainer,
// 	Container,
// } from './styles';
import { Pagination, Placeholder } from '@cogoport/components';

import EmptyState from '../../../EmptyState';

import DocumentCard from './DocumentCard';
import styles from './styles.module.css';

function UploadedDocuments({
	shipmentDocumentsTotal,
	shipmentDocumentsHookSetters,
	shipmentDocumentsPage,
	shipmentFilters,
	shipmentDocuments,
	shipmentDocumentsLoading,
	shipment_data,
	containsFreightCertificate = false,
	refetch = () => {},
	primary_service,
}) {
	if (!shipmentDocumentsLoading && !shipmentDocuments?.length) {
		return (
			<EmptyState
				showContent={{
					heading     : 'No Documents Found!',
					description : 'Looks like you do not have any uploaded documents',
				}}
			/>
		);
	}

	if (shipmentDocumentsLoading) {
		return <Placeholder />;
	}

	const handlePageChange = (val) => {
		if (val !== shipmentDocumentsPage) {
			shipmentDocumentsHookSetters.setFilters({
				...shipmentFilters,
				page: val,
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{shipmentDocumentsTotal}
				{' '}
				{shipmentDocumentsTotal > 1 ? 'Documents' : 'Document'}
			</div>

			{shipmentDocumentsTotal > 10 ? (
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						pageRange={10}
						total={shipmentDocumentsTotal}
						pagination={shipmentDocumentsPage}
						setPagination={(val) => handlePageChange(val)}
					/>
				</div>
			) : null}

			{shipmentDocuments?.map((item) => (
				<div className={styles.document_container}>
					<DocumentCard
						details={item}
						shipment_data={shipment_data}
						containsFreightCertificate={containsFreightCertificate}
						refetch={refetch}
						primary_service={primary_service}
					/>
				</div>
			))}
		</div>
	);
}

export default UploadedDocuments;
