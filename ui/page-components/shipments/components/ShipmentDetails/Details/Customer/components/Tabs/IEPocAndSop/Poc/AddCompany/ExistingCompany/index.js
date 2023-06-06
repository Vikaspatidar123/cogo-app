import { Button, Modal } from '@cogoport/components';

import Layout from '../../../../../Layout';

import existing_company_controls from './controls';
import styles from './styles.module.css';

import useUpdateShipment from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpdateShipment';

function ExistingCompany({
	role,
	compType,
	servProvId,
	listServiceRefetch = () => {},
	service_prov_ids,
	setUtilities = () => {},
	utilities,
	listShipmentTradePartners = () => {},
	onClose,
	source = '',
	task = {},
	taskRefetch = () => {},
	onCancel = () => {},
}) {
	const {
		handleExistingCompany,
		loading,
		errors,
		onError,
		handleSubmit,
		control,
		newFields,
	} = useUpdateShipment({
		role,
		servProvId,
		listServiceRefetch,
		service_prov_ids,
		setUtilities,
		utilities,
		listShipmentTradePartners,
		compType,
		existing_company_controls,
		source,
		task,
		taskRefetch,
		onCancel,
	});

	return (
		<div>
			<Modal.Body>
				<Layout
					control={control}
					controls={newFields}
					errors={errors}
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
							onClick={handleSubmit(handleExistingCompany, onError)}
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
}

export default ExistingCompany;
