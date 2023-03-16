import { cl } from '@cogoport/components';
import { IcMFfcl } from '@cogoport/icons-react';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import packageDetailsControls from '../../../../configuration/packageDetailsControls';
import styles from '../styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function PackageDetails(props, ref) {
	const { editAir = {} } = props;
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			packageHandling : 'STACKABLE',
			packageType     : 'BOX',
		},
	});

	useEffect(() => {
		if (editAir?.packageHandling) {
			setValue('packageHandling', editAir?.packageHandling);
			setValue('packageType', editAir?.packageType);
			setValue('weight', editAir?.weight);
			setValue('volume', editAir?.volume);
			setValue('quantity', editAir?.quantity);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editAir?.packageHandling]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => values;

			const onError = (err) => ({ check: true, err });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMFfcl width={22} height={22} fill="#2d3342" />
				<h3 className={styles.title}>Package Details</h3>
			</div>

			<div className={styles.row}>
				{packageDetailsControls.map((field) => {
					const Element = getField(field.type);
					return (
						<div
							key={field?.name}
							className={cl`${styles.col} ${field?.name === 'quantity' && styles.type}
								${styles?.[field?.className]} }`}
						>
							<p className={styles.label}>{field.label}</p>
							<Element
								{...field}
								control={control}
								className={cl`${errors?.[field?.name] && styles.error} `}

							/>
						</div>

					);
				})}
			</div>

		</div>
	);
}

export default forwardRef(PackageDetails);
