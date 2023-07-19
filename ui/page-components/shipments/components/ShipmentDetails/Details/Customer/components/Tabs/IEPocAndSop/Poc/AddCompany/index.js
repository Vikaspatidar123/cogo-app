import { Button, Select, RadioGroup, Modal, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateAddCompany from '../../../../../../../hooks/useCreateAddCompany';
import useListShipTradePartners from '../../../../../../../hooks/useListShipTradePartners';
import Layout from '../../../../Layout';

import ExistingCompany from './ExistingCompany';
import Historical from './Historical';
import {
	options,
	shipperOptions,
	consigneeOptions,
	bookingPartyOptions,
} from './options';
import SameAsBP from './SameAsBP';
import getCompanyControls from './shipAndConsControls';
import styles from './styles.module.css';

import { useDebounceQuery } from '@/packages/forms';

const getTradePartnersDetails = (shipment_data) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { refetch, tradePartnerData } = useListShipTradePartners(shipment_data);
	const selfData = tradePartnerData?.list?.find(
		(item) => item?.trade_party_type === 'self',
	);
	return {
		refetch,
		selfData,
	};
};

function AddCompany({
	stakeholderOptions,
	listServiceRefetch = () => {},
	service_prov_ids,
	setUtilities = () => {},
	bookingPartyData = {},
	utilities = {},
	listShipmentTradePartners = () => {},
	onClose,
	task = {},
	source = '',
	shipment_data = {},
	taskRefetch = () => {},
	onCancel = () => {},
}) {
	const [tradeParties, setTradeParties] = useState([]);
	const { query, debounceQuery } = useDebounceQuery();

	let { roleCheck } = utilities;
	let taskListShipmentTradePartners = '';
	let taskBookingPartyData = [];

	const { trade_party_id, servProvId: shipmentServiceProviderId } = utilities;

	if (source === 'task') {
		if (task.task === 'add_shipper_details') {
			roleCheck = 'shipper';
			setUtilities({
				...utilities,
				roleCheck: 'shipper',
			});
		} else if (task.task === 'add_consignee_details') {
			roleCheck = 'consignee';
			setUtilities({
				...utilities,
				roleCheck: 'consignee',
			});
		}
		const { refetch, selfData } = getTradePartnersDetails(shipment_data);

		taskListShipmentTradePartners = refetch;
		taskBookingPartyData = selfData;
	}

	const controls = getCompanyControls(roleCheck);

	let OPTIONS = options || [];

	if (roleCheck === 'shipper') {
		OPTIONS = shipperOptions();
	} else if (roleCheck === 'consignee') {
		OPTIONS = consigneeOptions;
	} else if (roleCheck === 'booking_party') {
		OPTIONS = bookingPartyOptions;
	}

	const {
		control,
		handleSubmit,
		onError,
		errors,
		handleAddCompany,
		setCompType,
		compType,
		loading,
		newFields,
		register,
	} = useCreateAddCompany({
		setTradeParties,
		roleCheck,
		controls,
		setUtilities,
		utilities,
		service_prov_ids,
		shipmentServiceProviderId,
		trade_party_id,
		listShipmentTradePartners,
		source,
		task,
		taskRefetch,
		tradeParties,
	});

	const onSubmit = () => {
		handleAddCompany();
	};
	console.log(newFields, 'newFields');

	const renderAddCompany = () => {
		const props = {
			source,
			task,
			taskRefetch,
			onCancel,
			tradeParties,
			role       : roleCheck,
			compType,
			servProvId : trade_party_id || shipmentServiceProviderId,
			bookingPartyData:
				source === 'task' ? taskBookingPartyData : bookingPartyData,
			setUtilities,
			utilities,
			listServiceRefetch,
			listShipmentTradePartners:
				source === 'task'
					? taskListShipmentTradePartners
					: listShipmentTradePartners,
		};

		if (compType === 'same_as_booking_party') {
			return (
				<div className={styles.company}>
					<SameAsBP
						role={roleCheck}
						bookingPartyData={bookingPartyData}
						setUtilities={setUtilities}
						utilities={utilities}
						listServiceRefetch={listServiceRefetch}
						listShipmentTradePartners={listShipmentTradePartners}
						onClose={onClose}
					/>
				</div>
			);
		}
		if (compType === 'historical') {
			return (
				<>
					{shipment_data?.shipment_type === 'ftl_freight'
					&& roleCheck === 'shipper' ? (
						<div className={styles.search_container}>
							<Input
								suffix={<IcMSearchlight style={{ marginTop: '5px' }} />}
								placeholder="Pincode, PAN, GSTIN, Name"
								type="text"
								onChange={(e) => debounceQuery(e?.target?.value)}
								style={{ width: '400px', marginRight: '20px' }}
							/>
						</div>
						) : null}
					<Historical
						props={props}
						query={query}
						shipment_data={shipment_data}
					/>
				</>
			);
		}
		if (['booking_party', 'trade_partner'].includes(compType)) {
			return (
				<div className={styles.company}>
					<ExistingCompany
						role={roleCheck}
						compType={compType}
						servProvId={trade_party_id || shipmentServiceProviderId}
						listServiceRefetch={listServiceRefetch}
						service_prov_ids={service_prov_ids}
						setUtilities={setUtilities}
						utilities={utilities}
						listShipmentTradePartners={listShipmentTradePartners}
						onClose={onClose}
					/>
				</div>
			);
		}
		return (
			<div>
				<Modal.Body>
					<Layout
						controls={newFields}
						control={control}
						errors={errors}
						register={register}
					/>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<div className={styles.button_container}>
							<Button
								onClick={() => onClose()}
								themeType="secondary"
								disabled={loading}
							>
								Cancel
							</Button>
							<Button
								onClick={handleSubmit(onSubmit, onError)}
								className="primary md"
								disabled={loading}
							>
								Submit
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</div>
		);
	};
	const heard = () => (
		<div>
			<div className={styles.heading}>ADD COMPANY</div>
			<div className={styles.role_container}>
				<div className={styles.label}>Role</div>

				<Select
					value={utilities.roleCheck}
					disabled={!!utilities.roleCheck}
					onChange={(e) => setUtilities({
						...utilities,
						roleCheck: e.target?.value,
					})}
					options={stakeholderOptions}
					style={{ width: '250px' }}
				/>
			</div>

			<RadioGroup
				options={OPTIONS}
				value={compType}
				onChange={(item) => { setCompType(item); }}
			/>
		</div>
	);
	return (
		<div className={styles.container}>
			<Modal.Header title={heard()} />
			{renderAddCompany()}
		</div>
	);
}

export default AddCompany;
