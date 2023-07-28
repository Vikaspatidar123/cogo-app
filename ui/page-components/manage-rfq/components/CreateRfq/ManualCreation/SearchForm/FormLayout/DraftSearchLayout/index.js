import { cl, Toast } from '@cogoport/components';
import { IcMEdit, IcMDuplicate, IcMDelete } from '@cogoport/icons-react';
import { useEffect } from 'react';

import ContainerInfo from './ContainerInfo';
import Route from './Route';
import ShippingLineInfo from './ShippingLineInfo';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getConfiguration from '@/ui/page-components/manage-rfq/configurations/SearchFormControls/getConfiguration';
import useGetOperatorsById from '@/ui/page-components/manage-rfq/hooks/useGetOperatorsById';

const MANDATORY_TYPE = 'mandatory_shipping_lines';
const SERVICES_ARR = ['fcl_freight', 'air_freight', 'lcl_freight'];
const ZERO_INDEX = GLOBAL_CONSTANTS.zeroth_index;

function DraftSearchLayout({
	item,
	index,
	editForm,
	showForm,
	services,
	draftLength,
	serviceType,
	originDetails,
	hscodeDetails,
	setHscodeDetails,
	destinationDetails,
	shippingLinesDetails,
	importerExporterDetails,
	setValues = () => {},
	setEditForm = () => {},
	setShowForm = () => {},
	setServices = () => {},
	updateRfqDraft = () => {},
	setOriginDetails = () => {},
	setDestinationDetails = () => {},
	setShippingLinesDetails = () => {},
}) {
	const {
		containers,
		remarks = [],
		commodity,
		inco_term,
		cargo_ready_date = '',
		commodity_subtype = '',
		commodity_type = '',
		payment_type = '',
		calculate_by = '',
		dimensions = [],
		container_remarks = '',
		shipping_frequency = 0,
		custom_shipping_frequency,
		is_transit_shipment = false,
	} = item?.search_rates?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		price,
		min_destination_demurrage,
		min_destination_detention,
		min_origin_demurrage,
		min_origin_detention,
	} = remarks[0] || {};

	const detentionDemurrage = [
		{ label: 'Destination Demurrage Days : ', value: min_destination_demurrage },
		{ label: 'Destination Detention Days : ', value: min_destination_detention },
		{ label: 'Origin Demurrage Days : ', value: min_origin_demurrage },
		{ label: 'Origin Detention Days : ', value: min_origin_detention },
		{
			label : 'Shipment Frequency : ',
			value : shipping_frequency === 'other' ? custom_shipping_frequency : shipping_frequency,
		},
		{
			label: '', value: is_transit_shipment[0] === 'true' ? 'Transit Shipment' : 'Direct Shipment',
		},
	].filter((itm) => itm.value);

	const detentionDemurrageCount = detentionDemurrage.reduce((acc, obj) => {
		let hash = acc;
		if (obj.value) {
			hash += 1;
		}
		return hash;
	}, 0);

	const isAdditionalRemarks =	detentionDemurrageCount !== 0 || price?.price !== '';
	const commodityRemarks = serviceType === 'fcl_freight'
		? containers?.[ZERO_INDEX]?.container_remarks : container_remarks;

	const shippingRemarks = remarks[ZERO_INDEX] || {};
	const hasKey = 'calculate_by' in (item?.search_rates?.[ZERO_INDEX] || {});

	const serviceDetails = getConfiguration('service-details', serviceType);

	const prefferedType = serviceType !== 'air_freight'
		? 'preferred_shipping_lines'
		: 'preferred_air_lines';

	const excludedType = serviceType !== 'air_freight'
		? 'excluded_shipping_lines'
		: 'excluded_air_lines';

	const { getOperators, operatorsLoading } = useGetOperatorsById({
		setShippingLinesDetails,
	});

	const checkServices = () => {
		let check = [];
		Object.keys(services?.[serviceType]?.[index] || {}).forEach(
			(serviceKey) => {
				if (
					!['fcl_freight', 'lcl_freight', 'air_freight'].includes(serviceKey)
					&& services[serviceType][index][serviceKey]
				) {
					check = [...check, serviceKey];
				}
			},
		);

		return check;
	};

	const handleClick = () => {
		if (!showForm && editForm === '') {
			setEditForm(item.id);
		}
		if (showForm) {
			Toast.error(
				'Save or cancel current form to edit the selected port pair.',
			);
		}
	};

	const handleDelete = () => {
		updateRfqDraft({
			id              : item.id,
			serviceType,
			importerExporterDetails,
			formData        : item,
			index,
			status          : 'inactive',
			services        : services?.[serviceType]?.[index],
			originData      : originDetails[serviceType][index],
			destinationData : destinationDetails[serviceType][index],
		});
	};
	const handleDuplicate = () => {
		if (editForm || showForm) {
			Toast.error(
				'Save or cancel the current form to make duplicate of the selected port pair',
			);
			return;
		}
		setShowForm(serviceType);
		setValues(item);
		setOriginDetails({
			...originDetails,
			[serviceType]: {
				...originDetails?.[serviceType],
				[draftLength]: originDetails?.[serviceType]?.[index],
			},
		});
		setDestinationDetails({
			...destinationDetails,
			[serviceType]: {
				...destinationDetails?.[serviceType],
				[draftLength]: destinationDetails?.[serviceType]?.[index],
			},
		});
		setHscodeDetails({
			...hscodeDetails,
			[serviceType]: {
				...hscodeDetails?.[serviceType],
				[draftLength]: hscodeDetails?.[serviceType]?.[index],
			},
		});
		setShippingLinesDetails({
			...shippingLinesDetails,
			[serviceType]: {
				...shippingLinesDetails?.[serviceType],
				[draftLength]: shippingLinesDetails?.[serviceType]?.[index],
			},
		});
		setServices({
			...services,
			[serviceType]: {
				...services?.[serviceType],
				[draftLength]: services?.[serviceType]?.[index] || {},
			},
		});
		Toast.success('Successfully created a duplicate scroll down to edit it.');
	};

	useEffect(() => {
		(async () => {
			await Promise.all([
				await getOperators(
					shippingRemarks[excludedType],
					index,
					excludedType,
					serviceType,
				),

				await getOperators(
					shippingRemarks[prefferedType],
					index,
					prefferedType,
					serviceType,
				),

				await getOperators(
					shippingRemarks[MANDATORY_TYPE],
					index,
					MANDATORY_TYPE,
					serviceType,
				),
			]);
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [remarks]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Route
					originDetails={originDetails?.[serviceType]?.[index]}
					destinationDetails={destinationDetails?.[serviceType]?.[index]}
					index={index}
				/>
				<ContainerInfo
					serviceType={serviceType}
					cargoReadyDate={cargo_ready_date}
					containers={containers}
					commodity={commodity}
					incoTerm={inco_term}
					hscodeDetails={hscodeDetails?.[serviceType]?.[index]}
					commoditySubtype={commodity_subtype}
					commodityType={commodity_type}
					paymentType={payment_type}
					calculateBy={calculate_by}
					dimensions={dimensions}
					hasKey={hasKey}
				/>
				<div className={styles.action_buttons}>
					<IcMEdit
						disable={editForm || showForm}
						className={cl`${styles.edit_icon}`}
						onClick={() => handleClick()}
					/>
					<IcMDuplicate className={styles.duplicate_icon} onClick={() => handleDuplicate()} />
					<IcMDelete className={styles.delete_icon} onClick={handleDelete} />
				</div>
			</div>
			<div className={styles.form_info}>
				{shippingLinesDetails && serviceType !== 'lcl_freight' && (
					<ShippingLineInfo
						serviceType={serviceType}
						operatorsLoading={operatorsLoading}
						shippingLinesDetails={
							shippingLinesDetails?.[serviceType]?.[index] || {}
						}
					/>
				)}

				<div className={styles.addition_remarks}>
					<div className={styles.label}>Additional Services: </div>
					{checkServices().length > 0 ? (
						<>
							{checkServices().map((itm) => (
								<div className={styles.custom_services}>{serviceDetails[itm].title}</div>
							))}
						</>
					) : (
						<div className={styles.empty}>No additional services added</div>
					)}
				</div>

				<div className={styles.indicative}>
					<div>Additional Remarks: </div>
					{isAdditionalRemarks ? (
						<>
							{price?.price !== '' && (
								<div className={styles.tag_div}>
									{price?.currency}
									{' '}
									{price?.price}
									{' '}
									Indicative Price
								</div>
							)}
							{SERVICES_ARR.includes(serviceType) && (
								(detentionDemurrage || []).map(({ label, value }) => (
									<div
										key={`${label}_${value}`}
										className={styles.tag_div}
									>
										{` ${label} ${value}`}
									</div>
								))
							)}
						</>
					) : (
						<div className={styles.empty}>No additional remarks added</div>
					)}
				</div>
				<div className={styles.commodity_remark}>
					<div className={styles.label}>Remarks: </div>
					{commodityRemarks ? (
						<div className={styles.remark}>{commodityRemarks}</div>
					) : (
						<div className={styles.empty}>No remarks added</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default DraftSearchLayout;
