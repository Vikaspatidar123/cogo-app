// import React, { useRef, useState } from 'react';

// // import useBookShipment from '../../../hooks/useBookShipment';
// // import PortHeader from '../../PortHeader';

// import { Container, Box, ContainerDetails } from './style';

// const { Row, Col } = Grid;

// function Form({
// 	serviceId,
// 	setOpen,
// 	service_type,
// 	origin_id,
// 	destination_id,
// 	importer_exporter_id,
// 	user,
// 	branch,
// 	originPort,
// 	destinationPort,
// 	originPortCode,
// 	destinationPortCode,
// 	originFullName,
// 	destinationFullName,
// 	cargoDetailControls,
// }) {
// 	const bookShipmentRef = useRef({});

// 	const [dateTimePickerValue, setDateTimePickerValue] = useState();

// 	const { loading, handleFormSubmit, scheduleLoading } = useBookShipment({
// 		serviceId,
// 		setOpen,
// 		service_type,
// 		origin_id,
// 		destination_id,
// 		importer_exporter_id,
// 		user,
// 		branch,
// 		bookShipmentRef,
// 		dateTimePickerValue,
// 	});

// 	const cargoDetailsFormProps = useForm(cargoDetailControls);

// 	const { fields: cargodtailsFields, formState: cargodetailsFormState } =		cargoDetailsFormProps;

// 	return (
// 		<Container>
// 			<Box>
// 				<Row>
// 					<Col xs={12} md={6}>
// 						<PortHeader
// 							originPort={originPort}
// 							destinationPort={destinationPort}
// 							service_type={service_type}
// 							destinationPortCode={destinationPortCode}
// 							originPortCode={originPortCode}
// 							originFullName={originFullName}
// 							destinationFullName={destinationFullName}
// 						/>
// 					</Col>

// 					<Col xs={12} md={3}>
// 						<Flex direction="column">
// 							<Text size={12} color="#333" bold={500} marginBottom={2}>
// 								Departure Date
// 							</Text>

// 							<SingleDatePicker
// 								width={200}
// 								withTimePicker
// 								onChange={setDateTimePickerValue}
// 								value={dateTimePickerValue}
// 								isPreviousDaysAllowed={false}
// 							/>
// 						</Flex>
// 					</Col>

// 					<Col xs={12} md={3}>
// 						<ContainerDetails>
// 							<SearchForm
// 								mode={service_type}
// 								extraParams={{}}
// 								search_type="contract"
// 								ref={(r) => {
// 									bookShipmentRef.current = r;
// 								}}
// 							/>
// 						</ContainerDetails>
// 					</Col>
// 				</Row>
// 			</Box>

// 			<>
// 				<Flex direction="column" width={500}>
// 					<Layout
// 						controls={cargoDetailControls}
// 						fields={cargodtailsFields}
// 						errors={cargodetailsFormState.errors}
// 					/>
// 				</Flex>

// 				<Flex justifyContent="flex-end">
// 					<Button
// 						type="button"
// 						className="secondary md"
// 						style={{ marginRight: 8 }}
// 						onClick={() => setOpen(false)}
// 						disabled={loading || scheduleLoading}
// 					>
// 						CANCEL
// 					</Button>

// 					<Button
// 						type="button"
// 						className="primary md"
// 						onClick={handleFormSubmit}
// 						disabled={loading || scheduleLoading}
// 					>
// 						REQUEST BOOKING
// 					</Button>
// 				</Flex>
// 			</>
// 		</Container>
// 	);
// }

// export default Form;
