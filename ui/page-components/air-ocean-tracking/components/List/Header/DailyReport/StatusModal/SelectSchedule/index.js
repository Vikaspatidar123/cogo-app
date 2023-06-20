import { Button, cl } from '@cogoport/components';

import scheduleControls from '../../../../../../configuration/scheduleControls';
import useDsrSchedule from '../../../../../../hooks/useDsrSchedule';
import parseScheduleString from '../../../../../../utils/parseScheduleString';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function SelectSchedule({
	dsrList = [],
	selectedContact = {},
	setActiveStepper,
	closeModalHandler,
	getDsrList,
}) {
	const { loading, createUpdateSchedule, prevSchedule = '' } = useDsrSchedule({
		dsrList,
		selectedContact,
		closeModalHandler,
		getDsrList,
	});

	const { prevFrequency = '', prevDay = '', prevTime = '' } = parseScheduleString(prevSchedule);

	const { control, formState:{ errors }, handleSubmit, watch } = useForm({
		defaultValues: {
			frequency : prevFrequency,
			day       : prevDay,
			time      : prevTime,
		},
	});
	const watchFrequency = watch('frequency');

	const controls = scheduleControls({ watchFrequency });

	const onSubmit = (data) => {
		createUpdateSchedule({ data });
	};

	return (
		<div className={styles.container}>

			<div className={styles.form_container}>
				{controls.map((config) => {
					const { name, type, label, show = true } = config || {};
					const Element = getField(type);

					return (
						show && (
							<div key={name} className={cl`${styles.col} ${styles?.[name]}`}>
								<p className={styles.label}>{label}</p>
								<Element {...config} control={control} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						)
					);
				})}
			</div>

			<div className={styles.footer}>
				<Button
					themeType="secondary"
					disabled={loading}
					type="button"
					onClick={() => setActiveStepper('shipments')}
				>
					Back
				</Button>

				<Button
					themeType="accent"
					className={styles.submit_btn}
					onClick={handleSubmit(onSubmit)}
					loading={loading}
					type="button"
				>
					Save
				</Button>
			</div>
		</div>
	);
}
export default SelectSchedule;
