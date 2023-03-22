import isEmpty from '@cogo/utils/isEmpty';
import { IcABlog } from '@cogoport/icons-react';
import React from 'react';

import Empty from '../../../../common/Empty';
import { getContractState } from '../../../../utils/getUnit';

import Loader from './Loader';
import QuotationCard from './QuotationCard';
import { Rfqs } from './styles';

function Quotations({ contractList, loading, activeFilter }) {
	if (loading) {
		return <Loader />;
	}

	if (isEmpty(contractList)) {
		return (
			<Empty
				label={`You have no ${getContractState[activeFilter]} contracts`}
				subLabel={`Your ${getContractState[activeFilter]} contract will show up here`}
				icon={<IcABlog />}
			/>
		);
	}

	return (
		<Rfqs>
			<QuotationCard contractList={contractList} activeFilter={activeFilter} />
		</Rfqs>
	);
}

export default Quotations;
