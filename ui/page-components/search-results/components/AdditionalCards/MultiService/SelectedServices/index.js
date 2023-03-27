import React from 'react';
import BookingRoute from '@cogo/app-search/common/BookingRoute';
import { Container, Heading, SubHeading } from './styles';

const SelectedServices = ({ detail = {} }) => (
	<Container>
		<Heading>Select Your Services</Heading>

		<SubHeading>
			Add services as per your requirement and then select the ones you want to create an enquiry on
		</SubHeading>

		<div style={{ marginTop: 32 }}>
			<BookingRoute data={detail} showServiceDetails={false} />
		</div>
	</Container>
);
export default SelectedServices;
