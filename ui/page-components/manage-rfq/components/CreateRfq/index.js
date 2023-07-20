import { Stepper, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import { fields } from '../../configurations/basic-details-controls';
import getComponent from '../../helpers/getCreationComponent';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';

const items = [
	{ title: 'Basic Details', key: 1 },
	{ title: 'Method', key: 2 },
	{ title: 'Request', key: 3 },
];

function CreateRfq() {
	const { back, query } = useRouter();

	const { rfq_id, stage, type } = query;

	const [currentStep, setCurrentStep] = useState(Number(stage) || 1);

	const { control, setValue, watch, formState: { errors } } = useForm({
		defaultValues: {
			reason_type  : 'comparison',
			request_type : 'manual_entry',
		},
	});
	const basicDetails = watch();
	const { request_type: watchRequestType, reason_type: watchReasonType } = basicDetails;

	const Component = getComponent({ currentStep, watchRequestType, type });

	const fixedCondition = !(currentStep === 3 && (type === 'manual_entry' || watchRequestType === 'manual_entry'));

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<IcMArrowBack width={20} height={20} fill="#393F70" onClick={back} />
				<div className={styles.title}>Create Quotation</div>
			</div>

			<div className={cl`${styles.content} ${fixedCondition ? styles.fixed : ''}`}>
				<Stepper
					active={currentStep}
					setActive={setCurrentStep}
					items={items}
					arrowed
					shadowed
				/>

				<div className={styles.stepper_content}>
					<Component
						{...basicDetails}
						fields={fields}
						control={control}
						rfqId={rfq_id}
						setValue={setValue}
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
						watchRequestType={watchRequestType}
						watchReasonType={watchReasonType}
						errors={errors}
					/>
				</div>
			</div>

			{!fixedCondition && (<div className={styles.dummy_footer} />)}
		</div>
	);
}
export default CreateRfq;
