import { useState, useEffect } from 'react';

import DraftEditLayout from './DraftEditLayout';
import styles from './styles.module.css';

function FormLayout(props) {
	const {
		fields,
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
							<DraftSeachLayout
								{...props}
								index={index}
								item={item}
								draftLength={draftLength}
								serviceType={serviceType}
								setValues={setValues}
							/>
						)
					),
				)}
			</div>
		</div>
	);
}

export default FormLayout;
