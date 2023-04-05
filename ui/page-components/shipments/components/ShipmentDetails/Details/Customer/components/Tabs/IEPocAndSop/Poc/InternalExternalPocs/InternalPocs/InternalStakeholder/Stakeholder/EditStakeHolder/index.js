import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Layout from '../../../../../../../../Layout';

import styles from './styles.module.css';

import useUpdateShipmentStakeholders from
	'@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpdateShipmentStakeholders';

function EditStakeHolder({
	editStakeHolder = {},
	setEditStakeHolder = () => {},
	handleClose = () => {},
	stakeholderListRefetch = () => {},
	displayServiceType = 'Shipment',
}) {
	const { modal_check, value: data } = editStakeHolder;

	const stakeholder_type = data?.stakeholder_type;

	const {
		control,
		controls,
		handleSubmit,
		errors,
		updateStakeHolder,
		showElements,
		formValues,
		onError,
	} = useUpdateShipmentStakeholders({
		stakeholder_type,
		data,
		stakeholderListRefetch,
		setEditStakeHolder,
	});

	return (
		<Modal
			show={modal_check}
			onClose={handleClose}
			className="primary lg"
			closable
			onOuterClick={handleClose}
			styles={{ dialog: { overflow: 'visible' } }}
		>
			<div className={styles.heading}>POC - Internal</div>
			<div className={styles.details}>
				<div className={styles.detail_header}>Role -</div>
				<div className={styles.detail_text}>
					{startCase(formValues.stakeholder_type || data?.stakeholder_type)}
				</div>
			</div>
			{data?.service_type || formValues.service_type ? (
				<div className={styles.details}>
					<div className={styles.detail_header}>Service -</div>
					<div className={styles.detail_text}>
						{displayServiceType || startCase(formValues.service_type)}
					</div>
				</div>
			) : null}
			<div>
				<Layout
					control={control}
					controls={controls}
					errors={errors}
					showElements={showElements}
				/>
			</div>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}
			>
				<Button
					className="primary md"
					onClick={handleSubmit(updateStakeHolder, onError)}
				>
					Submit
				</Button>
			</div>
		</Modal>
	);
}

export default EditStakeHolder;
