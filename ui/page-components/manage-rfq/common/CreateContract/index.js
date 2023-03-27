import { cl, Button } from '@cogoport/components';
import { IcMTick, IcMPlus, IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import CreateContractsControls from '../../configurations/create-contract-details';
import getNameSuggestions from '../../helpers/getNameSuggestions';
import useCreateContractRfq from '../../hooks/useCreateContractRfq';
import addDays from '../../utils/addDays';
import getwidth from '../../utils/getWidth';

import PortPairs from './portpairs';
import styles from './styles.module.css';

import { InputController, DatepickerController, useForm } from '@/packages/forms';

function CreateContract({
	formData,
	setShowContractCreation = () => {},
	setShowModal = () => {},
}) {
	const RfqId = formData?.[0]?.rfq_id || '';
	const { nameSuggestions } = getNameSuggestions({
		formData,
	});
	const { loading, onContractRequest } = useCreateContractRfq({
		RfqId,
		setShowModal,
		setShowContractCreation,
	});

	const {
		fields,
		watch,
		setValue,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm(CreateContractsControls({ formData }));

	const watchName = watch('contract_name');
	const ValidityStart = watch('validity_start') || new Date();

	const submitForm = (val) => {
		onContractRequest(val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.backicon} onClick={() => setShowContractCreation(false)} />
				Back to RFQ
			</div>

			<div className={styles.title}>One last step, finalise your contract</div>

			<div className={styles.row}>
				<div className={styles.cols} style={{ width: getwidth(3.7) }}>
					<div className={styles.label}>{fields.contract_name.label}</div>
					<InputController
						{...fields.contract_name}
						className={(errors?.contract_name?.message || '') && styles.error_class}
					/>
					<div className={styles.error}>{errors?.contract_name?.message}</div>
				</div>

				<div className={styles.cols} style={{ width: getwidth(0.1) }} />

				<div className={styles.cols} style={{ width: getwidth(2.1) }}>
					<div className={styles.label}>{fields.validity_start.label}</div>
					<DatepickerController
						{...fields.validity_start}
						maxDate={addDays(new Date(), 29)}
						className={(errors?.validity_start?.message || '') && styles.error_class}
					/>
					<div className={styles.sublabel}>{fields.validity_start.miniLabel}</div>
					{' '}
					<div className={styles.error}>{errors?.validity_start?.message}</div>
				</div>

				<div className={styles.cols} style={{ width: getwidth(2.1) }}>
					<div className={styles.label}>{fields.validity_end.label}</div>
					<DatepickerController
						{...fields.validity_end}
						minDate={ValidityStart}
						maxDate={addDays(ValidityStart, 29)}
						className={(errors?.validity_end?.message || '') && styles.error_class}
					/>
					<div className={styles.sublabel}>{fields.validity_end.miniLabel}</div>
					{' '}
					<div className={styles.error}>{errors?.validity_end?.message}</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.cols} style={{ width: getwidth(12) }}>
					<div className={styles.subtitle}>Name Suggestions</div>
					<div className={styles.tags}>
						{nameSuggestions.map((name) => (
							<div
								className={cl`${styles.tag} ${startCase(watchName) === name ? styles.active : ''}`}
								role="presentation"
								onClick={() => {
									setValue('contract_name', name);
									setError('contract_name', undefined);
								}}
							>
								{startCase(watchName) === name ? <IcMTick className={styles.tickicon} />
									: <IcMPlus className={styles.plusicon} />}
								<div>{name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<PortPairs
				formData={formData}
				errors={errors}
				fields={fields}
				watch={watch}
			/>
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					onClick={() => setShowContractCreation(false)}
					disabled={loading}
				>
					Back
				</Button>
				<Button
					themeType="secondary"
					onClick={handleSubmit(submitForm)}
					disabled={loading}
					loading={loading}
				>
					Request Contract
				</Button>
			</div>
		</div>
	);
}

export default CreateContract;
