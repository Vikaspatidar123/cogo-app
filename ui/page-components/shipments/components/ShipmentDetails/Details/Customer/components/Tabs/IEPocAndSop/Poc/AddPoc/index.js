import { Modal, RadioGroup, Button } from '@cogoport/components';
import { useState } from 'react';

import Layout from '../../../../Layout';

import { pocOptions, controls } from './controls';
import ExistingPocs from './ExistingPocs';
import styles from './styles.module.css';

import useCreatePoc from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useCreatePoc';

function AddPoc({
	stakeholder,
	businessName,
	setUtilities = () => {},
	utilities,
	listShipmentTradePartners = () => {},
}) {
	const [addPoc, setAddPoc] = useState('create_new');

	const {
		control,
		controlPoc,
		handleAddPoc,
		handleSubmit,
		errors,
		onError,
		loading,
	} = useCreatePoc({
		stakeholder,
		controls,
		setUtilities,
		utilities,
		listShipmentTradePartners,
	});

	const handleClose = () => {
		setUtilities({
			roleCheck       : '',
			businessName    : '',
			servProvId      : '',
			addPocModal     : false,
			addCompanyModal : false,
			trade_party_id  : '',
		});
	};

	const onSubmit = () => {
		handleAddPoc();
	};

	return (
		<Modal
			show={utilities?.addPocModal}
			onClose={handleClose}
			theme="admin"
			className="primary xl"
		>
			<div className={styles.container}>
				<p className={styles.heading}>ADD POC</p>
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

				<div>
					<RadioGroup
						className="primary lg"
						options={pocOptions}
						value={addPoc}
						onChange={(item) => setAddPoc(item)}
					/>
				</div>

				{addPoc === 'existing_poc' ? (
					<ExistingPocs
						utilities={utilities}
						handleClose={handleClose}
						handleAddPoc={handleAddPoc}
					/>
				) : (
					<div className={styles.container}>
						<Layout
							theme="admin"
							control={control}
							controls={controlPoc}
							errors={errors}
						/>
						<div className={styles.button_container}>
							<Button
								className="secondary md"
								onClick={handleClose}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button
								disabled={loading}
								onClick={handleSubmit(onSubmit, onError)}
								className="primary md"
							>
								Submit
							</Button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}

export default AddPoc;
