import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function FormElement({
	fields,
	controls,
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
	}, [JSON.stringify(errors), JSON.stringify(showElements)]);

	return (
		<div className={cl`${styles.container} ${showForm && styles.showForm}`} />
	);
}

export default FormElement;
