import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getwidth from '../../../utils/getWidth';

import ChildFormat from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function FormElement({
	fields,
	controls,
	control,
	errors = {},
	showElements = {},
	formValues = {},
	showForm = true,
	service,
	setCheckErrors = () => {},
}) {
	useEffect(() => {
		setCheckErrors((prev) => ({ ...prev, [service]: false }));
		controls.forEach((item) => {
			const show = !(item.name in showElements) || showElements[item.name];

			if (show && !isEmpty(errors[item.name])) {
				setCheckErrors((prev) => ({ ...prev, [service]: true }));
			}
		});
	}, [errors, showElements]);

	return (
		<div className={cl`${styles.container} ${showForm && styles.showForm}`}>
			<div className={styles.row}>
				{controls.map((item) => {
					const show = !(item.name in showElements) || showElements[item.name];

					if (item.type === 'fieldArray') {
						return show ? (
							<div className={styles.col} key={item.name}>
								<ChildFormat
									{...item}
									{...fields[item.name]}
									key={item.name}
									control={control}
									buttonText={item.buttonText}
									showButtons={item.showButtons}
									heading={item.heading}
									showDeleteButton={item.showDeleteButton}
									showDivider={item.showDivider}
									noDeleteButtonTill={fields[item.name].noDeleteButtonTill}
									label={item.label}
									formValues={formValues[item.name]}
									error={errors[item.name]}
									showElements={showElements[item.name]}
								/>
							</div>
						) : null;
					}

					return show ? (
						<div
							className={styles.col}
							style={{ width: getwidth(item?.span || 12) }}
							key={item.name}
						>
							<Item
								{...fields[item.name]}
								key={item.name}
								name={item.name}
								control={control}
								formValue={formValues[item.name]}
								error={errors[item.name]}
								value={item.value}
							/>
						</div>
					) : null;
				})}
			</div>
		</div>
	);
}

export default FormElement;
