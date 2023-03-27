import React from 'react';
import QuickSearch from '@cogo/app-search/components/SearchPage/PastResults/PastSearches/Section/QuickSearch';
import { IcCWaitForSometime, IcMRefresh } from '@cogoport/icons-react';
import AwaitingResponse from './AwaitingResponse';
import { Container, Main, Description } from './styles';

const EnquriyStatus = ({
	data = {},
	refetch = () => {},
	enquiryQuota = {},
}) => {
	if (
		data?.negotiation_status === 'awaiting_responses' ||
		data?.rates_count > 0
	) {
		return (
			<AwaitingResponse
				data={data}
				refetch={refetch}
				enquiryQuota={enquiryQuota}
			/>
		);
	}

	let description = '';
	let title = '';

	if (data?.negotiation_status === 'completed' && !data?.rates_count) {
		title = 'No Reverts by Supplier';
		description =
			'No reverts have been received for this request, please create a new search to find the rates or try to decrease your indicative price for suppliers to accept it';
	}

	return (
		<Container>
			<IcCWaitForSometime width={28} color="#cb6464" />

			<Main>
				<Description className="bold">{title}</Description>
				<Description>{description}</Description>
			</Main>

			{data?.negotiation_status === 'completed' && !data?.rates_count && (
				<QuickSearch
					type="negotiation"
					refresh={() => (
						<IcMRefresh style={{ color: '#fff', width: 30, height: 30 }} />
					)}
					data={data}
					mobile={false}
					extraParams={{
						importer_exporter_id: data.importer_exporter_id,
						importer_exporter_branch_id: data?.importer_exporter_branch_id,
						user_id: data?.user_id,
					}}
				/>
			)}
		</Container>
	);
};

export default EnquriyStatus;
