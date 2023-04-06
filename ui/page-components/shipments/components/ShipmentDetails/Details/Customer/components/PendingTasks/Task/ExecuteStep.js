import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useHandleSubmit from '../../../../../hooks/useHandleSubmit';
import { useStepExecuton } from '../../../../../hooks/useStepExecution';
import Layout from '../../Layout';

import ConfirmationModal from './ConfirmationModal';
import styles from './styles.module.css';

function ExecuteStep({
	task = {},
	stepConfig = {},
	onCancel = () => {},
	refetch = () => {},
	shipment_data = {},
	isLastStep,
	currentStep = 0,
	serviceIdMapping = {},
	getApisData = {},
	timeLineRefetch = () => {},
	selectedMail = {},
	uiConfig = {},
	services = [],
}) {
	const {
		finalConfig,
		controls,
		showElements,
		error,
		control,
		handleSubmit,
		isLoading,
		setIsLoading,
		onError,
	} = useStepExecuton({
		task,
		stepConfig,
		shipment_data,
		getApisData,
		selectedMail,
		services,
	});
	const fields = controls?.map((item) => {
		if (item.type === 'pills') {
			return {
				...item,
				type    : 'chips',
				options : item.options.map((x) => ({ key: x.value, children: x.label })),
			};
		}
		if (item.name === 'preferred_shipping_line_id') {
			return {
				...item,
				type     : 'async_select',
				asyncKey : 'shipping_lines',
			};
		}
		if (item.name === 'hs_code') {
			return {
				...item,
				type               : 'async_select',
				asyncKey           : 'hs_code',
				getModifiedOptions : (list) => (
					list?.options.map((ele) => ({
						...ele,
						value: ele.id,

					}))
				),
			};
		}
		if (item.name === 'preferred_container_pickup_location_id') {
			return {
				...item,
				type     : 'async_select',
				asyncKey : 'locations',
			};
		}
		if (item.name === 'preferred_container_handover_location_id') {
			return {
				...item,
				type     : 'async_select',
				asyncKey : 'locations',
			};
		}
		return { ...item };
	});

	const requiresConfirmationModal = uiConfig.confirmation?.required;

	const handleSubmitClick = async () => {
		if (stepConfig.end_point || isLastStep) {
			await handleSubmit(handleSubmitTask, onError)();
		}
	};
	const [showModal, setShowModal] = useState(false);
	const handleClick = () => {
		if (requiresConfirmationModal) {
			setShowModal(true);
		} else {
			handleSubmitClick();
		}
	};
	console.log(fields, 'controls');
	return (
		<div>
			<div className={styles.form}>
				<Layout
					controls={fields}
					control={control}
					errors={error}
					showElements={showElements}
				/>
			</div>
			<div className={styles.button_wrap}>
				<Button
					className="secondary md"
					onClick={() => onCancel()}
					disabled={isLoading}
				>
					cancel
				</Button>

				<Button disabled={isLoading} onClick={handleClick}>
					{isLastStep ? 'Submit' : 'Next'}
				</Button>

				{showModal ? (
					<Modal
						show={showModal}
						onClose={() => setShowModal(false)}
						closable={false}
						withAnimation
					>
						<ConfirmationModal
							isLoading={isLoading}
							triggerFunction={handleSubmitClick}
							label={task.label}
							setShowModal={setShowModal}
							confirmation={uiConfig?.confirmation}
						/>
					</Modal>
				) : null}
			</div>
		</div>
	);
}

export default ExecuteStep;
