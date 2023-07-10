import { Button, Modal } from '@cogoport/components';

import Layout from '../../../../Layout';

import { controls } from './controls';
import styles from './styles.module.css';

import useCreatePoc from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useCreatePoc';

function AddExternalPoc({
	stakeholder,
	businessName,
	setUtilities = () => {},
	utilities = {},
	listShipmentTradePartners = () => {},
	shipment_data,
}) {
	const {
		control,
		controlPoc,
		handleAddPoc,
		handleSubmit,
		errors,
		onError,
		loading,
		register,
	} = useCreatePoc({
		stakeholder,
		controls,
		setUtilities,
		utilities,
		listShipmentTradePartners,
		shipment_data,
	});

	const handleClose = () => {
		setUtilities({
			roleCheck          : '',
			businessName       : '',
			servProvId         : '',
			addExternlPocModal : false,
			trade_party_id     : '',
			trade_type         : '',
		});
	};

	return (
		<div>
			{utilities.addExternlPocModal ? (
				<Modal
					show={utilities.addExternlPocModal}
					onClose={handleClose}
					className="primary lg"
					closable={false}
				>
					<p className={styles.heading}>
						ADD External
						{utilities.trade_type}
						{' '}
						POC
					</p>
					<div className={styles.company_details}>
						<p className={styles.company_name}>
							Company Name :
							{' '}
							<span style={{ color: '#393f70', fontWeight: '500' }}>
								{businessName}
							</span>
						</p>
					</div>
					<div className={styles.line} />
					<Layout
						theme="admin"
						control={control}
						register={register}
						controls={controlPoc}
						errors={errors}
					/>
					<div className={styles.button_container}>
						<Button
							disabled={loading}
							className="secondary md"
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							disabled={loading}
							onClick={handleSubmit(handleAddPoc, onError)}
							className="primary md"
						>
							Submit
						</Button>
					</div>
				</Modal>
			) : null}
		</div>
	);
}

export default AddExternalPoc;
