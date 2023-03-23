import { Toast, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import DraftEditLayout from './DraftEditLayout';
import PortPairLayout from './PortPairLayout';
import styles from './styles.module.css';

function FormLayout(props) {
	const {
		fields,
		control,
		serviceType,
		formState: { errors },
		draftFormData,
		setShowForm,
		editForm,
		showForm,
		reset,
		setValues = () => {},
	} = props;

	const draftLength = (draftFormData?.formData?.[serviceType]?.data || [])
		.length;

	const [count, setCount] = useState(1);

	useEffect(() => {
		setCount((prev) => prev + 1);
	}, [serviceType]);

	return (
		<div className={styles.container}>
			<div>
				{(draftFormData?.formData?.[serviceType]?.data || []).map(
					(item, index) => (
						item.id === editForm ? (
							<div
								className={styles.form}
								key={`draft_${count}_${draftLength}`}
							>
								<div className={styles.header}>
									<div className={styles.title}>
										Edit Port Pair
										{index + 1}
									</div>
								</div>
								<DraftEditLayout {...props} index={index} item={item} />
							</div>
						) : (
							null
						)
					),
				)}
			</div>
			{draftLength === 0 || showForm === serviceType ? (
				<div
					className={styles.form}
					key={`form_${count}_${draftLength}`}
				>
					<div className={styles.header}>
						<div className={styles.title}>
							Port Pair
							{' '}
							{draftLength + 1}
						</div>
					</div>
					<PortPairLayout
						{...props}
						{...fields[0]}
						control={control}
						draftLength={draftLength}
						error={errors?.search_rates}
						mode={serviceType}
					/>
				</div>
			) : (
				<div className={styles.button_box}>
					<div>
						<Button
							themeType="secondary"
							onClick={() => {
								if (!showForm && !editForm) {
									reset();
									setShowForm(serviceType);
								} else if (!editForm) {
									Toast.error('save all forms to open new form');
								} else {
									Toast.error('save edited form to open new form');
								}
							}}
						>
							Add New Port Pair
							{' '}
							<IcMPlus className={styles.plus_icon} />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default FormLayout;
