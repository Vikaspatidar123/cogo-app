import { Button, Checkbox } from '@cogoport/components';
import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetShippingLine from '../../../../hooks/useGetShippingLine';

// import AddLineItem from './AddDetails';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const MAIN_SERVICE_TO_FILTER = ['fcl_freight'];

function ShippingLineForm({
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
}) {
	const {
		errors,
		handleSubmit,
		controls,
		control,
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
			list        : [],
			isApiCalled : false,
		});
		showSpotBookingDetails({
			...spotBookingDetails,
			showForm: false,
		});
	}, [wayToBook]);

	const renderSegmentedControl = () => {
		if (MAIN_SERVICE_TO_FILTER.includes(data?.search_type)) {
			return (
				<div className={styles.header_container}>
					<div className={styles.radio_container}>
						<SegmentedControl
							options={OPTIONS}
							activeTab={wayToBook}
							setActiveTab={setWayToBook}
							separatorMarginRight={4}
						/>
					</div>

					{scheduleList.isApiCalled && !isEmpty(scheduleList?.list) ? (
						<div
							style={{
								display      : 'flex',
								alignItems   : 'center',
								marginBottom : '-132px',
							}}
							className={styles.checkbox_container}
						>
							<Checkbox
								className="primary md"
								checked={manualSelect}
								onChange={setManualSelect}
								disabled={loading}
							/>
							<div className={styles.text} marginLeft={8} color="#393F70" size={14}>
								Add custom departure & arrival
							</div>
						</div>
					) : null}
				</div>
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
		<div>
			{renderSegmentedControl()}
			{/* {!spotBookingDetails?.showForm ? (
				<> */}
			<div className={styles.shipment_details}>
				<div className={styles.header_container}>
					{controls.map((item) => {
						const Element = getField(item.type);
						const show = showElements[item.name];
						return (
							show && (
								<div className={styles.field} key={item.name}>
									<div className={styles.lable}>{item.label}</div>
									<Element {...item} control={control} />
									{errors && (
										<div className={styles.errors}>
											{errors[item?.name]?.message}
										</div>
									)}
								</div>
							)
						);
					})}

				</div>
			</div>
			<div className={styles.btn_container}>
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
						loading
						|| (check_multiple_containers_fcl?.length > 1
							&& wayToBook === 'spot_booking')
					}
					onClick={handleSubmit(handleSave)}
					className="primary sm"
				>
					{wayToBook === 'spot_booking'
						? 'Create Checkout'
						: 'Customize checkout'}
				</Button>
			</div>
			{/* </>
			) : (
				renderContent()
			)} */}
		</div>
	);
}

export default ShippingLineForm;
