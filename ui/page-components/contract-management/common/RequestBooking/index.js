import { ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import getOrganizationControls from '../../configurations/organizationControls';

import Form from './Form';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

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

	const { organizationControls, cargoControls } = getOrganizationControls({ importer_exporter_id	});

	const { formState, watch, control } = useForm();

	const watchImporterExporterBranchId = watch('importer_exporter_branch_id') || '';
	const watchUserId = watch('user_id') || '';

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					Booking Shipment
				</div>
				<ButtonIcon icon={<IcMCross />} onClick={() => setOpen(false)} />
			</div>

			<div className={styles.flex}>
				<div
					className={styles.text1}
				>
					{org_name}
				</div>

				<div className={styles.flex1} width={400}>
					<FormElement
						controls={organizationControls}
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
				cargoDetailControls={cargoControls || []}
				control={control}
			/>
		</div>
	);
}

export default RequestBooking;
