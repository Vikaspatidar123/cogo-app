import { cl, Toast } from '@cogoport/components';
import { IcMEdit, IcMDuplicate, IcMDelete } from '@cogoport/icons-react';
import { useCallback, useEffect } from 'react';

import ContainerInfo from './ContainerInfo';
import Route from './Route';
import ShippingLineInfo from './ShippingLineInfo';
import styles from './styles.module.css';

import getConfiguration from '@/ui/page-components/manage-rfq/configurations/SearchFormControls/getConfiguration';
import useGetOperatorsById from '@/ui/page-components/manage-rfq/hooks/useGetOperatorsById';

function DraftSearchLayout({
	item,
	index,
	editForm,
	showForm,
	services,
	draftLength,
	serviceType,
	originDetails,
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
	} = item?.search_rates?.[0] || {};

	const {
		price,
		min_destination_demurrage,
		min_destination_detention,
		min_origin_demurrage,
		min_origin_detention,
	} = remarks[0] || {};

	const detentionDemurrage = [
		{ label: 'Destination Demurrage', value: min_destination_demurrage },
		{ label: 'Destination Detention', value: min_destination_detention },
		{ label: 'Origin Demurrage', value: min_origin_demurrage },
		{ label: 'Origin Detention', value: min_origin_detention },
	].filter((itm) => itm.value);

	const detentionDemurrageCount = detentionDemurrage.reduce((acc, obj) => {
		let hash = acc;
		if (obj.value) {
			hash += 1;
		}
		return hash;
	}, 0);

	const isAdditionalRemarks =	detentionDemurrageCount !== 0 || price?.price !== '';
	const shippingRemarks = useCallback(() => remarks[0] || {}, [remarks]);
	const hasKey = 'calculate_by' in (item?.search_rates?.[0] || {});
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
			if (
				!shippingLinesDetails?.[serviceType]?.[index]?.[prefferedType]
				&& (shippingRemarks[prefferedType] || []).length > 0
			) {
				await getOperators(
					shippingRemarks[prefferedType],
					index,
					prefferedType,
					serviceType,
				);
			}
			if (
				!shippingLinesDetails?.[serviceType]?.[index]?.[excludedType]
				&& (shippingRemarks[excludedType] || []).length > 0
			) {
				await getOperators(
					shippingRemarks[excludedType],
					index,
					excludedType,
					serviceType,
				);
			}
		})();
	}, []);

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
					<IcMDelete className={styles.delete_icon} onClick={() => handleDelete()} />
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
							{serviceType === 'fcl_freight' && (
								<>
									{(detentionDemurrage || []).map(({ label, value }) => (
										<div className={styles.tag_div}>{`${value} ${label} Days`}</div>
									))}
								</>
							)}
						</>
					) : (
						<div className={styles.empty}>No additional remarks added</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default DraftSearchLayout;
