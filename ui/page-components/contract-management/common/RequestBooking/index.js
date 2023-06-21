import React from 'react';

import Form from './Form';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

const organizationControls = [
	{
		type: 'select',
		name: 'importer_exporter_branch_id',
		label: 'Select Branch',
		optionsListKey: 'organization-branches',
		defaultOptions: true,
		span: 6,
		rules: { required: true },
		cacheOptions: false,
	},
	{
		type: 'select',
		name: 'user_id',
		label: 'Select User',
		optionsListKey: 'organization-users',
		defaultOptions: true,
		valueKey: 'user_id',
		labelKey: 'name',
		span: 6,
		rules: { required: true },
		cacheOptions: false,
	},
	{
		type: 'textarea',
		name: 'cargo_description',
		label: 'Cargo Description',
		span: 12,
	},
];

function RequestBooking({
	serviceId,
	service_type,
	org_name,
	importer_exporter_id,
	setOpen = () => { },
	originPortData = {},
	destinationPortData = {},
}) {
	const {
		name: originPort = '',
		id: origin_id = '',
		display_name: originFullName = '',
		port_code: originPortCode = '',
	} = originPortData || {};

	const {
		name: destinationPort = '',
		id: destination_id = '',
		display_name: destinationFullName = '',
		port_code: destinationPortCode = '',
	} = destinationPortData || {};

	const newOrganizationControls = (organizationControls || []).map(
		(control) => {
			const { name } = control;

			if (['importer_exporter_branch_id', 'user_id'].includes(name)) {
				return {
					...control,
					params: {
						filters: {
							organization_id: importer_exporter_id,
							status: 'active',
						},
					},
				};
			}
			return [];
		},
	);

	const cargoDetailControls = (organizationControls || []).map((control) => {
		const { name } = control;
		if (['cargo_description'].includes(name)) {
			return { ...control };
		}
		return [];
	});

	const formProps = useForm(newOrganizationControls);
	const { fields, formState, watch } = formProps;

	const watchImporterExporterBranchId = watch('importer_exporter_branch_id') || '';
	const watchUserId = watch('user_id') || '';

	return (
		<div className={styles.container}>
			<div className={styles.text} as="div">
				Booking Shipment
			</div>

			<div className={styles.flex}>
				<div
					className={styles.text1}
				>
					{org_name}
				</div>

				<div className={styles.flex1} direction="column" width={400}>
					{/* <Layout
						controls={newOrganizationControls}
						fields={fields}
						errors={formState.errors}
					/> */}
				</div>
			</div>

			{/* <Form
				serviceId={serviceId}
				origin_id={origin_id}
				destination_id={destination_id}
				service_type={service_type}
				setOpen={setOpen}
				importer_exporter_id={importer_exporter_id}
				user={watchUserId}
				branch={watchImporterExporterBranchId}
				originPort={originPort}
				destinationPort={destinationPort}
				destinationPortCode={destinationPortCode}
				originPortCode={originPortCode}
				originFullName={originFullName}
				destinationFullName={destinationFullName}
				cargoDetailControls={cargoDetailControls || []}
			/> */}
		</div>
	);
}

export default RequestBooking;
