import React from 'react';

import { Heading, Container, PointsBody, InfoContainer } from './styles';

function AddressInfo() {
	return (
		<Container>
			<InfoContainer>
				<Heading>
					Please upload one of the following. Documents should not be older than 6 months.
				</Heading>
				<PointsBody>
					<ul>
						<li>Electricity Bill</li>
						<li>Water Bill</li>
						<li>Telephone Landline Bill</li>
						<li>Property Tax Receipt</li>
						<li>Current Registered Sale/ Lease/ Rent Agreement</li>
						<li>Gas Connection Bill</li>
						<li>Credit Card Statement</li>
					</ul>
				</PointsBody>
			</InfoContainer>
		</Container>
	);
}

export default AddressInfo;
