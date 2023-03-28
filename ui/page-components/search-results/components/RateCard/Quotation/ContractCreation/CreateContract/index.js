import Button from '@cogoport/front/components/admin/Button';
import { useFormCogo } from '@cogoport/front/hooks';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import createContracts from '../../../../../configurations/create-contract-controls';
import useCreateContract from '../../../../../hooks/useCreateContract';

import CreateContractModal from './CreateContractModal';
import { Header, ModalWrapper, Footer, Body } from './styles';

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
		fields,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useFormCogo(newControls);
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
		<ModalWrapper
			show={showContract}
			onClose={() => setShowContract(false)}
			onOuterClick={() => setShowContract(false)}
			className="secondary md"
		>
			<>
				<Header>
					<div className="title">Request Contract</div>
					<IcMCross
						width={20}
						height={20}
						cursor="pointer"
						onClick={() => setShowContract(false)}
					/>
				</Header>

				<Body>
					<CreateContractModal
						details={details}
						errors={errors}
						fields={fields}
						controls={newControls}
						watchForm={watchForm}
						setValue={setValue}
					/>
				</Body>

				<Footer>
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
				</Footer>
			</>
		</ModalWrapper>
	);
}

export default CreateContract;
