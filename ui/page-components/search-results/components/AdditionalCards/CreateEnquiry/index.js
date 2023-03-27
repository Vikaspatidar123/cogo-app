import React, { useState } from 'react';
import { useSelector } from '@cogo/store';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { getRequest } from '@cogo/app-common';
import Card from './Card';
import MultiServiceEnquiry from '../MultiService';
import { Message } from './styles';

const CreateEnquiry = ({
	data = {},
	refetch = () => {},
	enquiryQuota = {},
}) => {
	const [view, setView] = useState(false);
	const [showMessage] = useState(false);

	const { scope, importer_exporter_id } = useSelector(({ general }) => ({
		scope: general.scope,
		importer_exporter_id: (general.query || {}).importer_exporter_id,
	}));

	const onEnquiryHandler = () => {
		if (scope === 'app') {
			setView(true);
			return;
		}

		const request = getRequest(scope);
		request
			.get('get_organization', { params: { id: importer_exporter_id } })
			.then((res) => {
				if (!res.hasError) {
					setView(true);
					// if (res.data.data.kyc_status === 'verified') {
					// 	setView(true);
					// } else {
					// 	setShowMessage(true);
					// }
				} else {
					showErrorsInToast(res.messages);
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

			<Message classsName={showMessage ? 'active' : ''}>
				Looks like orgnization kyc is not completed, so you won’t be able create
				an enquiry.
			</Message>
		</>
	);
};

export default CreateEnquiry;
