import { Button, Input, Modal } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useEnquiry from '../../../hooks/useEnquiry';

import Service from './Service';
import ServiceForm from './ServiceForm';
import styles from './styles.module.css';

function MultiServiceEnquiry({
	detail = {},
	show = false,
	onClose = () => {},
	// enquiryQuota = {},
	refetch = () => {},
	results_type,
	formData,
	setFormData,
	setApiData,
	apiData,
	addedServiceEnquiry,
	setAddedServiceEnquiry,
	prefillDetails,
	setPrefillDetails,
}) {
	const { negotiation_services } = detail;

	const [serviceID, setServiceID] = useState();
	const [payLoad, setPayLoad] = useState([]);

	const {
		originServices,
		destinationServices,
		mainServices,
		isLoading,
		createEnquiry,
		handleChange,
		location,
		selectedService,
		setSelectedService,
		val,
		widthCondition,
		handleQuerySearch,
		notSelectedServices,
		negotiationServiceIds,
		clubbingSimilarNegoServices,
		handleDeletion,
		negoServicesArr,
	} = useEnquiry({
		detail,
		refetch: () => {
			refetch();
			onClose();
		},
		serviceID,
		payLoad,
		apiData,
		addedServiceEnquiry,
		setApiData,
		setFormData,
		setAddedServiceEnquiry,
		formData,
		results_type,
	});

	const serviceItem = (service) => (
		<>
			<Service
				service={service}
				detail={detail}
				setSelectedService={setSelectedService}
				isOpen={
						selectedService?.service === service?.service
						&& selectedService?.trade_type === service?.trade_type
						&& !(detail?.negotiation_services || []).length
					}
				results_type={results_type}
				payLoad={payLoad}
				setPayLoad={setPayLoad}
				setServiceID={setServiceID}
				addedServiceEnquiry={addedServiceEnquiry}
				setAddedServiceEnquiry={setAddedServiceEnquiry}
				clubbingSimilarNegoServices={clubbingSimilarNegoServices}
				handleDeletion={handleDeletion}
				formData={formData}
				negotiationServiceIds={negotiationServiceIds}
				negoServicesArr={negoServicesArr}
			/>

			<div
				className={styles.animated_container}
				type={
						selectedService?.service === service?.service
						&& selectedService?.trade_type === service?.trade_type
						&& !(detail?.negotiation_services || []).length
							? 'enter'
							: 'exit'
					}
			>
				<div className={styles.service_form_wrap}>
					<ServiceForm
						detail={detail}
						service={selectedService}
						location={location}
						onClose={() => setSelectedService(null)}
						refetch={refetch}
						handleServiceAdd={handleChange}
						formData={formData}
						setFormData={setFormData}
						apiData={apiData}
						setApiData={setApiData}
						setSelectedService={setSelectedService}
						setAddedServiceEnquiry={setAddedServiceEnquiry}
						addedServiceEnquiry={addedServiceEnquiry}
						prefillDetails={prefillDetails}
						setPrefillDetails={setPrefillDetails}
					/>
				</div>
			</div>
		</>
	);

	return show ? (
		<Modal show={show} width={widthCondition} onClose={onClose} position="">
			<div className={styles.container}>
				<div className={styles.add_service_heading}>
					{!negotiationServiceIds?.length
						? 'Add Services for Enquiry'
						: 'Selected Service for Enquiry Creation'}
				</div>

				{!negotiationServiceIds?.length ? (
					<div className={styles.input_wrap}>
						<Input
							type="text"
							placeholder="Search any service"
							name="service"
							onChange={(e) => {
								handleQuerySearch(e.target.value);
							}}
							suffix={
								<IcMSearchdark style={{ width: '1.5em', height: '1.5em' }} />
							}
						/>
					</div>
				) : null}

				{!negotiationServiceIds.length
					&& (val?.length
						? notSelectedServices
						: [...mainServices, ...originServices, ...destinationServices]
					).map((service) => serviceItem(service))}

				{negotiationServiceIds?.length
					? [...mainServices, ...originServices, ...destinationServices]
						.filter((serviceObj) => negoServicesArr.includes(serviceObj?.service_type))
						?.map((service) => serviceItem(service))
					: null}

				{negotiationServiceIds?.length ? null : (
					<div className={styles.button_container}>
						<Button
							onClick={createEnquiry}
							disabled={(negotiation_services || []).length > 0 || isLoading}
							style={{
								opacity: isLoading ? '0.6' : '1',
							}}
						>
							Create Enquiry
						</Button>
					</div>
				)}
			</div>
		</Modal>
	) : null;
}
export default MultiServiceEnquiry;
