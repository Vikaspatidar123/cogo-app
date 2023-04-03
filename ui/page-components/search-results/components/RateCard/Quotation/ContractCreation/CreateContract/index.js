import { Modal, Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import createContracts from '../../../../../configurations/create-contract-controls';
import useCreateContract from '../../../../../hooks/useCreateContract';

import CreateContractModal from './CreateContractModal';

import { useForm } from '@/packages/forms';

function CreateContract({
	data = {},
	details = {},
	showContract = false,
	setShowContract = () => {},
	setPriceLocked = () => {},
	setContractData = () => {},
}) {
	const newControls = createContracts();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm();
	const watchForm = watch();

	const { search_type = '' } = details || {};
	const { createContract, loading } = useCreateContract({
		data,
		setPriceLocked,
		setContractData,
		setShowContract,
		search_type,
	});

	const onSubmit = (val) => {
		createContract({ ...val });
	};

	return (
		<Modal
			show={showContract}
			onClose={() => setShowContract(false)}
			onOuterClick={() => setShowContract(false)}
			className="secondary md"
		>
			<>
				<Modal.Header>
					<div className="title">Request Contract</div>
					<IcMCross
						width={20}
						height={20}
						cursor="pointer"
						onClick={() => setShowContract(false)}
					/>
				</Modal.Header>

				<Modal.Body>
					<CreateContractModal
						details={details}
						errors={errors}
						fields={control}
						controls={newControls}
						watchForm={watchForm}
						setValue={setValue}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						className="secondary md close-create-contract-modal"
						onClick={() => setShowContract(false)}
					>
						Close
					</Button>
					<Button
						disabled={loading}
						className="primary md next-step-create-contract"
						onClick={handleSubmit(onSubmit)}
					>
						Create
					</Button>
				</Modal.Footer>
			</>
		</Modal>
	);
}

export default CreateContract;
