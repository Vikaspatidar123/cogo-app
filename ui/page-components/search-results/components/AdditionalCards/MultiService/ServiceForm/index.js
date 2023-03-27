import React from 'react';
import { Button } from '@cogoport/front/components';
import ServiceAdd from './ServiceAdd';
import EnquiryExtraControls from './EnquiryExtra';
import useEnquiryModalForm from '../../../../hooks/useEnquiryModalForm';
import { Container } from './styles';

const Form = ({
	detail,
	service,
	onClose,
	handleServiceAdd,
	location,
	refetch,
	formData = {},
	setFormData = () => {},
	apiData,
	setApiData,
	addedServiceEnquiry,
	prefillDetails,
	setPrefillDetails,
	setAddedServiceEnquiry,
	setSelectedService,
}) => {
	const {
		handleAddService,
		loading,
		extraDetails,
		noOfServiceForms,
		setNoOfServiceForms,
		setShowElementAdd,
		setShowElementExtra,
		setLocationObj,
		serviceRef,
		setExtraDetails,
		params,
		setParams,
	} = useEnquiryModalForm({
		detail,
		service,
		onClose,
		handleServiceAdd,
		location,
		refetch,
		formData,
		setFormData,
		apiData,
		setApiData,
		addedServiceEnquiry,
		prefillDetails,
		setPrefillDetails,
		setAddedServiceEnquiry,
		setSelectedService,
	});

	const serviceAddComponent = (
		<ServiceAdd
			service={service}
			detail={detail}
			location={location}
			onClose={onClose}
			handleServiceAdd={handleServiceAdd}
			refetch={refetch}
			ref={(r) => {
				serviceRef.current.serviceData = r;
			}}
			setNoOfServiceForms={setNoOfServiceForms}
			addedServiceEnquiry={addedServiceEnquiry}
			formData={formData}
			prefillDetails={prefillDetails}
			setShowElementAdd={setShowElementAdd}
			setLocationObj={setLocationObj}
			setParams={setParams}
			params={params}
		/>
	);

	return (
		<Container>
			{!service?.similar_service_details?.length && (
				<>
					{serviceAddComponent}
					{noOfServiceForms.length &&
						noOfServiceForms?.map((obj, index) => {
							return (
								<EnquiryExtraControls
									service={{ ...service, service_type: obj?.service }}
									detail={detail}
									location={location}
									onClose={onClose}
									handleServiceAdd={handleServiceAdd}
									refetch={refetch}
									ref={(r) => {
										serviceRef.current[JSON.stringify(obj)] = r;
									}}
									extraDetails={extraDetails}
									setExtraDetails={setExtraDetails}
									prefillDetails={prefillDetails}
									index={index}
									setShowElementExtra={setShowElementExtra}
									params={params}
								/>
							);
						})}
				</>
			)}

			{(service?.similar_service_details || []).map((obj, index) => {
				return (
					<>
						{service?.service !== detail?.search_type && serviceAddComponent}

						<EnquiryExtraControls
							service={service}
							detail={detail}
							location={location}
							onClose={onClose}
							handleServiceAdd={handleServiceAdd}
							refetch={refetch}
							ref={(r) => {
								serviceRef.current[obj?.id] = r;
							}}
							serviceKey={obj?.id}
							extraDetails={extraDetails}
							setExtraDetails={setExtraDetails}
							prefillDetails={prefillDetails}
							setShowElementExtra={setShowElementExtra}
							params={params}
							index={index}
						/>
					</>
				);
			})}

			<Button
				onClick={() => {
					handleAddService();
				}}
				disabled={loading}
				style={{
					marginTop: '30px',
					background: '#333333',
					fontWeight: 500,
					width: '126px',
				}}
			>
				Add Services
			</Button>
		</Container>
	);
};

export default Form;
