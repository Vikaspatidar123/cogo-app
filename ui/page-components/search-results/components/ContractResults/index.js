import React from 'react';
import RateCard from '../RateCard';
import { Container } from './styles';

const ContractResults = ({ data = {} }) => (
	<Container>
		<RateCard
			data={data?.checkout_detail?.rate}
			details={data?.checkout_detail?.detail}
			results_type="contract"
			id={data?.id}
		/>
	</Container>
);

export default ContractResults;
