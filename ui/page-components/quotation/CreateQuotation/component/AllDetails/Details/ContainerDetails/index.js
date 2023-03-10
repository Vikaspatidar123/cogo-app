import { cl, Button } from '@cogoport/components';
import { IcMFcl } from '@cogoport/icons-react';
import { useImperativeHandle, forwardRef } from 'react';

import containerDetailsFields from '../../../../configuration/containerDetailsControls';
import styles from '../styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function ContainerDetails(props, ref) {
	const {
		control,
		watch,
		// formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			serviceType    : 'FCL_FREIGHT',
			containerSize  : '20FT',
			containerCount : 1,
			containerType  : 'DRY',
		},
	});
	const SelectController = getField('select');
	const watchSericeType = watch('serviceType');

	const val = watch();
	console.log('val::', val);

	// const imperativeHandle = () => ({
	// 	handleSubmit: () => {
	// 		const onSubmit = (data) => data;

	// 		return handleSubmit((values) => (onSubmit(values)))();
	// 	},
	// });

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => values;

			const onError = (error) => error;

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));
	// useImperativeHandle(ref, imperativeHandle);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMFcl width={24} height={24} fill="#2d3342" />
				<h3 className={styles.title}>Container Details</h3>
			</div>
			<div className={styles.row}>
				<div className={cl`${styles.col} ${styles.service_type}`}>
					<SelectController {...containerDetailsFields[0]} control={control} />
				</div>
				<div style={{ marginBottom: '12px' }}>
					<Button themeType="secondary">Calculate Load</Button>
				</div>
			</div>
			<div className={styles.row}>
				{containerDetailsFields.map((field, index) => {
					// eslint-disable-next-line react/jsx-no-useless-fragment
					if (index === 0) return <></>;
					const Element = getField(field.type);
					return (
						<>
							{watchSericeType === 'FCL_FREIGHT' && index <= 3 && (
								<div
									key={field?.name}
									className={cl`${styles.col} ${field?.name === 'containerType' && styles.type}
								${styles?.[field?.className]} }`}
								>
									<p className={styles.label}>{field.label}</p>
									<Element {...field} control={control} />
								</div>
							)}
							{watchSericeType === 'LCL_FREIGHT' && index >= 3 && (
								<div key={field?.name} className={cl`${styles.col} ${styles?.[field.className]}`}>
									<p className={styles.label}>{field.label}</p>
									<Element {...field} control={control} />
								</div>
							)}
						</>
					);
				})}
			</div>

		</div>
	);
}

export default forwardRef(ContainerDetails);
