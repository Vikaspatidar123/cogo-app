import { cl, Button } from '@cogoport/components';
import { IcMTick, IcMPlus, IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import createContractsControls from '../../configurations/create-contract-details';
import getNameSuggestions from '../../helpers/getNameSuggestions';
import useCreateContractRfq from '../../hooks/useCreateContractRfq';
import addDays from '../../utils/addDays';
import getwidth from '../../utils/getWidth';

import PortPairs from './portpairs';
import styles from './styles.module.css';

import { InputController, DatepickerController, useForm } from '@/packages/forms';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

function CreateContract({
	formData,
	setShowContractCreation = () => {},
	setShowModal = () => {},
}) {
	const rfqId = formData?.[ZEROTH_INDEX]?.rfq_id || '';

	const { nameSuggestions } = getNameSuggestions({
		formData,
	});
	const { loading, onContractRequest } = useCreateContractRfq({
		rfqId,
		setShowModal,
		setShowContractCreation,
	});

	const { defaultValues, fields } = createContractsControls({ formData });
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ defaultValues });

	const watchName = watch('contract_name');
	const ValidityStart = watch('validity_start') || new Date();

	const submitForm = (values) => {
		onContractRequest({ values });
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.backicon} onClick={() => setShowContractCreation(false)} />
				Back to RFQ
			</div>

			<div className={styles.title}>One last step, finalise your contract</div>

			<div className={styles.row}>
				<div
					className={cl`${styles.cols} ${(errors?.contract_name?.message || '') && styles.error_class}`}
					style={{ width: getwidth(3.7) }}
				>
					<div className={styles.label}>{fields[0]?.label}</div>
					<InputController
						{...fields[0]}
						control={control}
					/>
					<div className={styles.error}>{errors?.contract_name?.message}</div>
				</div>

				<div className={styles.cols} style={{ width: getwidth(0.1) }} />

				<div className={styles.cols} style={{ width: getwidth(2.1) }}>
					<div className={styles.label}>{fields[1].label}</div>
					<DatepickerController
						{...fields[1]}
						control={control}
						maxDate={addDays(new Date(), 29)}
						className={(errors?.validity_start?.message || '') && styles.error_class}
					/>
					<div className={styles.sublabel}>{fields[1].miniLabel}</div>
					<div className={styles.error}>{errors?.validity_start?.message}</div>
				</div>

				<div className={styles.cols} style={{ width: getwidth(2.1) }}>
					<div className={styles.label}>{fields[2].label}</div>
					<DatepickerController
						{...fields[2]}
						control={control}
						minDate={ValidityStart}
						maxDate={addDays(ValidityStart, 29)}
						className={(errors?.validity_end?.message || '') && styles.error_class}
					/>
					<div className={styles.sublabel}>{fields[2].miniLabel}</div>
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
				control={control}
				watch={watch}
			/>
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					onClick={() => setShowContractCreation(false)}
					disabled={loading}
					type="button"
				>
					Back
				</Button>
				<Button
					themeType="accent"
					onClick={handleSubmit(submitForm)}
					disabled={loading}
					loading={loading}
					className={styles.submit_btn}
					type="submit"
				>
					Request Contract
				</Button>
			</div>
		</div>
	);
}

export default CreateContract;
