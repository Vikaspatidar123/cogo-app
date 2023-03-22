import React from 'react';

import Details from './Details';
import Ports from './ports';
import ServiceDetails from './ServiceDetails';
import { Container } from './styles';

function QuotationCard({ contractList, activeFilter }) {
	return (
		<>
			{(contractList || []).map((item) => (
				<Container>
					<Details item={item} activeFilter={activeFilter} />
					<ServiceDetails item={item} />
					<Ports item={item} />
				</Container>
			))}
		</>
	);
}

export default QuotationCard;
