import { Modal, Button, Datepicker } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useEnquiry from '../../../../hooks/useEnquiry';
import Service from '../Service';
import styles from '../styles.module.css';

function MultiServiceRfqEnquiry({
	detail = {},
	show = false,
	onClose = () => {},
	refetch = () => {},
	results_type,
}) {
	const [selectedService, setSelectedService] = useState(null);
	const [datePickerValue, setDatePickerValue] = useState();

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

	const widthCondition = 800;

	const serviceItem = (service) => (
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
	);

	return (
		<>
			{' '}
			{ show ? (
				<Modal show={show} width={widthCondition} onClose={onClose}>
					<div className={styles.container}>
						<div className={styles.add_service_heading}>Add Services for Enquiry</div>

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
								<div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
									Select Sailing Date
								</div>

								<Datepicker
									withTimePicker={false}
									onChange={setDatePickerValue}
									value={datePickerValue}
									minDate={new Date()}
								/>
							</div>
						) : null}

						<div className={styles.button_container}>
							<Button
								style={{
									width   : '180px',
									height  : '44px',
									opacity : isLoading ? '0.6' : '1',
								}}
								onClick={rfqSaveHandle}
								disabled={isLoading}
							>
								{isLoading ? 'Saving Enquiry...' : 'SAVE AND PROCEED'}
							</Button>
						</div>
					</div>
				</Modal>
			) : null}
		</>
	);
}
export default MultiServiceRfqEnquiry;
