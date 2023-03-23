import { IcABlog } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Empty from '../../../../common/Empty';
import { getContractState } from '../../../../utils/getUnit';

import Loader from './Loader';
import QuotationCard from './QuotationCard';
import styles from './styles.module.css';

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
		<div className={styles.rfqs}>
			<QuotationCard contractList={contractList} activeFilter={activeFilter} />
		</div>
	);
}

export default Quotations;
