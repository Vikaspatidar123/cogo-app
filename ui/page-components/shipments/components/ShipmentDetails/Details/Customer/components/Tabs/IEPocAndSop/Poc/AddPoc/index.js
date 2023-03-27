// import Layout from '@cogo/bookings/commons/Layout';
// import { Button, Modal, RadioGroup } from '@cogoport/front/components/admin';
// import React, { useState } from 'react';

import { Modal } from '@cogoport/components';

// import useCreatePoc from '../../hooks/useCreatePoc';

// import { pocOptions, controls } from './controls';
// import ExistingPocs from './ExistingPoc';
// import {
// 	Container,
// 	Line,
// 	CompanyDetails,
// 	ButtonContainer,
// 	Heading,
// 	CompanyName,
// 	RadioGroupContainer,
// } from './styles';

function AddPoc({
	stakeholder,
	businessName,
	setUtilities = () => {},
	utilities,
	listShipmentTradePartners = () => {},
}) {
	const [addPoc, setAddPoc] = useState('create_new');

	const {
		fields,
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
			<Container>
				<Heading>ADD POC</Heading>
				<CompanyDetails>
					<CompanyName>
						Company Name :
						{' '}
						<span style={{ color: '#393f70', fontWeight: '500' }}>
							{businessName}
						</span>
					</CompanyName>
				</CompanyDetails>
				<Line />

				<RadioGroupContainer>
					<RadioGroup
						className="primary lg"
						options={pocOptions}
						value={addPoc}
						onChange={(item) => setAddPoc(item)}
					/>
				</RadioGroupContainer>

				{addPoc === 'existing_poc' ? (
					<ExistingPocs
						utilities={utilities}
						handleClose={handleClose}
						handleAddPoc={handleAddPoc}
					/>
				) : (
					<Container>
						<Layout
							theme="admin"
							fields={fields}
							controls={controlPoc}
							errors={errors}
						/>
						<ButtonContainer>
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
						</ButtonContainer>
					</Container>
				)}
			</Container>
		</Modal>
	);
}

export default AddPoc;
