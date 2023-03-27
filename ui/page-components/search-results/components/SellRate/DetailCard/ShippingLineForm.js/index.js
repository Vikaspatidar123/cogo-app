import { useEffect } from 'react';
import Layout from '@cogo/business-modules/form/Layout';
import { Button, CheckBox } from '@cogoport/front/components/admin';
import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { Flex, Text } from '@cogoport/front/components';
import { isEmpty } from '@cogoport/utils';
import { useSelector } from '@cogo/store';
import useGetShippingLine from '../../../../hooks/useGetShippingLine';
// import AddLineItem from './AddDetails';
import {
	Container,
	ShipmentDetails,
	BtnContainer,
	RadioContainer,
	HeaderContainer,
} from './styles';

const MAIN_SERVICE_TO_FILTER = ['fcl_freight'];

const ShippingLineForm = ({
	rates = [],
	handleSave = () => {},
	setAddRate = () => {},
	setWayToBook = () => {},
	data,
	loading,
	wayToBook,
	spotBookingDetails,
	check_multiple_containers_fcl = [],
	showSpotBookingDetails = () => {},
}) => {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const {
		errors,
		fields,
		handleSubmit,
		controls,
		showElements,
		reset,
		setScheduleList,
		OPTIONS,
		manualSelect,
		setManualSelect,
		scheduleList,
	} = useGetShippingLine({
		check_multiple_containers_fcl,
		data,
		rates,
		wayToBook,
	});

	useEffect(() => {
		reset();
		setScheduleList({
			list: [],
			isApiCalled: false,
		});
		showSpotBookingDetails({
			...spotBookingDetails,
			showForm: false,
		});
	}, [wayToBook]);

	const renderSegmentedControl = () => {
		if (MAIN_SERVICE_TO_FILTER.includes(data?.search_type)) {
			return (
				<HeaderContainer>
					<RadioContainer>
						<SegmentedControl
							options={OPTIONS}
							activeTab={wayToBook}
							setActiveTab={setWayToBook}
							separatorMarginRight={4}
						/>
					</RadioContainer>

					{scheduleList.isApiCalled && !isEmpty(scheduleList?.list) ? (
						<Flex
							alignItems="center"
							marginBottom={-132}
							className="checkbox_container"
						>
							<CheckBox
								className="primary md"
								checked={manualSelect}
								onChange={setManualSelect}
								disabled={loading}
							/>
							<Text marginLeft={8} color="#393F70" size={isMobile ? 12 : 14}>
								Add custom departure & arrival
							</Text>
						</Flex>
					) : null}
				</HeaderContainer>
			);
		}
		return null;
	};

	// const renderContent = () => {
	// 	return (
	// 		<Container>
	// 			<AddLineItem data={data} spotBookingDetails={spotBookingDetails} />
	// 		</Container>
	// 	);
	// };

	return (
		<Container>
			{renderSegmentedControl()}
			{/* {!spotBookingDetails?.showForm ? (
				<> */}
			<ShipmentDetails>
				<Layout
					controls={controls}
					fields={fields}
					errors={errors}
					showElements={showElements}
					themeType="admin"
				/>
			</ShipmentDetails>
			<BtnContainer>
				<Button
					onClick={() => {
						setAddRate(false);
					}}
					className="secondary sm"
				>
					Go Back
				</Button>
				<Button
					style={{ marginLeft: '10px' }}
					disabled={
						loading ||
						(check_multiple_containers_fcl?.length > 1 &&
							wayToBook === 'spot_booking')
					}
					onClick={handleSubmit(handleSave)}
					className="primary sm"
				>
					{wayToBook === 'spot_booking'
						? 'Create Checkout'
						: 'Customize checkout'}
				</Button>
			</BtnContainer>
			{/* </>
			) : (
				renderContent()
			)} */}
		</Container>
	);
};

export default ShippingLineForm;
