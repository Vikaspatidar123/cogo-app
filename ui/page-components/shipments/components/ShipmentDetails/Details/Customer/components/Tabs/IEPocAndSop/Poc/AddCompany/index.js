import { Button, Select, RadioGroup } from '@cogoport/components';

import Layout from '../../../../Layout';

import ExistingCompany from './ExistingCompany';
import {
	options,
	shipperOptions,
	consigneeOptions,
	bookingPartyOptions,
} from './options';
import SameAsBP from './SameAsBP';
import addControls from './shipAndConsControls';
import styles from './styles.module.css';

import useCreateAddCompany from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useCreateAddCompany';

function AddCompany({
	stakeholderOptions,
	listServiceRefetch = () => {},
	service_prov_ids,
	setUtilities = () => {},
	bookingPartyData = {},
	utilities = {},
	listShipmentTradePartners = () => {},
	onClose,
}) {
	const {
		roleCheck,
		trade_party_id,
		servProvId: shipmentServiceProviderId,
	} = utilities;

	const controls = addControls(roleCheck);

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
	} = useCreateAddCompany({
		roleCheck,
		controls,
		setUtilities,
		utilities,
		service_prov_ids,
		shipmentServiceProviderId,
		trade_party_id,
		listShipmentTradePartners,
	});

	const onSubmit = () => {
		handleAddCompany();
	};
	console.log(controls, 'controls', compType);

	const renderAddCompany = () => {
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
		if (['booking_party', 'trade_partner', 'historical'].includes(compType)) {
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
			<div className={styles.company_details}>
				<Layout
					controls={controls}
					control={control}
					errors={errors}
				/>

				<div className={styles.footer}>
					<div className={styles.line} />
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
			</div>
		);
	};

	return (
		<div className={styles.container}>

			<div className={styles.header_container}>
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

			{renderAddCompany()}
		</div>
	);
}

export default AddCompany;
