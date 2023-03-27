import React, { useState, useEffect } from 'react';
import { Modal, Button, Text } from '@cogoport/front/components';
import { useSelector } from '@cogo/store';
import { SingleDatePicker } from '@cogoport/front/components/DateTimePicker';
import isEmpty from '@cogo/utils/isEmpty';

import Service from '../Service';

import useEnquiry from '../../../../hooks/useEnquiry';

import { Container, ButtonContainer, AddServiceHeading } from '../styles';

const MultiServiceRfqEnquiry = ({
	detail = {},
	show = false,
	onClose = () => {},
	// enquiryQuota = {},
	refetch = () => {},
	results_type,
}) => {
	const [selectedService, setSelectedService] = useState(null);
	const [datePickerValue, setDatePickerValue] = useState();
	const { isMobile } = useSelector(({ general }) => ({
		isMobile: general?.isMobile,
	}));
	const { service_type } = detail;
	const [serviceID, setServiceID] = useState();
	const rfqSellingDateServices = ['ftl_freight', 'fcl_freight', 'air_freight'];
	const [payLoad, setPayLoad] = useState([]);

	const {
		originServices,
		destinationServices,
		mainServices,
		isLoading,
		rfqSaveHandle,
		setAllServices,
	} = useEnquiry({
		detail,
		refetch: () => {
			refetch();
			onClose();
		},
		serviceID,
		payLoad,
		datePickerValue,
		results_type,
	});

	useEffect(() => {
		if (!isEmpty(mainServices)) {
			setSelectedService((mainServices || [])[0] || {});
		}
	}, []);

	let widthCondition = 800;

	if (isMobile) {
		widthCondition = 'auto';
	}

	const serviceItem = (service) => {
		return (
			<>
				<Service
					service={service}
					detail={detail}
					setSelectedService={setSelectedService}
					isOpen={selectedService?.id === service?.id}
					results_type={results_type}
					payLoad={payLoad}
					setPayLoad={setPayLoad}
					setServiceID={setServiceID}
					setAllServices={setAllServices}
				/>
			</>
		);
	};

	return show ? (
		<Modal show={show} width={widthCondition} onClose={onClose}>
			<Container>
				<AddServiceHeading>Add Services for Enquiry</AddServiceHeading>

				{(mainServices || []).map((service) => serviceItem(service))}

				{[...originServices, ...destinationServices].length > 0 ? (
					<>
						{[...originServices, ...destinationServices]
							.filter((item) => item?.isServiceAdded)
							.map((service) => serviceItem(service))}
					</>
				) : null}

				{rfqSellingDateServices?.includes(service_type) ? (
					<div style={{ marginTop: '20px' }}>
						<Text style={{ fontWeight: 'bold', marginBottom: '4px' }}>
							Select Sailing Date
						</Text>

						<SingleDatePicker
							withTimePicker={false}
							onChange={setDatePickerValue}
							value={datePickerValue}
							minDate={new Date()}
						/>
					</div>
				) : null}

				<ButtonContainer>
					<Button
						style={{
							width: '180px',
							height: '44px',
							opacity: isLoading ? '0.6' : '1',
						}}
						onClick={rfqSaveHandle}
						disabled={isLoading}
					>
						{isLoading ? 'Saving Enquiry...' : 'SAVE AND PROCEED'}
					</Button>
				</ButtonContainer>
			</Container>
		</Modal>
	) : null;
};
export default MultiServiceRfqEnquiry;
