import React from 'react';

import Form from './Form';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

const organizationControls = [
	{
		type: 'async_select',
		name: 'importer_exporter_branch_id',
		label: 'Select Branch',
		asyncKey: 'organization-branches',
		initialCall: true,
		span: 6,
		rules: { required: true },
		cacheOptions: false,
	},
	{
		type: 'async_select',
		name: 'user_id',
		label: 'Select User',
		asyncKey: 'organization_users',
		initialCall: true,
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

	const newOrganizationControls = (organizationControls || []).filter((control) => {
		const { name } = control;

		if (['importer_exporter_branch_id', 'user_id'].includes(name)) {
			// eslint-disable-next-line no-param-reassign
			control.params = {
				filters: {
					organization_id: importer_exporter_id,
					status: 'active',
				},
			};
			return true;
		}
		return false;
	});

	const cargoDetailControls = (organizationControls || []).filter((control) => {
		const { name } = control;
		return ['cargo_description'].includes(name);
	});

	const formProps = useForm();
	const { formState, watch, control } = formProps;

	const watchImporterExporterBranchId = watch('importer_exporter_branch_id') || '';
	const watchUserId = watch('user_id') || '';
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Booking Shipment
			</div>

			<div className={styles.flex}>
				<div
					className={styles.text1}
				>
					{org_name}
				</div>

				<div className={styles.flex1} direction="column" width={400}>
					<FormElement
						controls={newOrganizationControls}
						errors={formState.errors}
						control={control}
						noScroll
					/>
				</div>
			</div>

			<Form
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
				control={control}
			/>
		</div>
	);
}

export default RequestBooking;
