import { Toast } from '@cogoport/components';
import React, { useState } from 'react';

import MultiServiceEnquiry from '../MultiService';

import Card from './Card';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function CreateEnquiry({
	data = {},
	refetch = () => {},
	enquiryQuota = {},
}) {
	const [view, setView] = useState(false);
	const [showMessage] = useState(false);

	const { importer_exporter_id } = useSelector(({ general }) => ({
		importer_exporter_id: (general.query || {}).importer_exporter_id,
	}));

	const onEnquiryHandler = () => {
		setView(true);

		// const request = getRequest();
		const request = '';
		request
			.get('get_organization', { params: { id: importer_exporter_id } })
			.then((res) => {
				if (!res.hasError) {
					setView(true);
				} else {
					Toast.error(res.messages);
				}
			});
	};

	return (
		<>
			<Card onClick={onEnquiryHandler} enquiryQuota={enquiryQuota} />

			<MultiServiceEnquiry
				show={view}
				onClose={() => {
					setView(false);
					refetch();
				}}
				refetch={refetch}
				detail={data}
				enquiryQuota={enquiryQuota}
			/>

			<div className={`${styles.message} ${showMessage ? 'active' : ''}`}>
				Looks like orgnization kyc is not completed, so you won’t be able create
				an enquiry.
			</div>
		</>
	);
}

export default CreateEnquiry;
