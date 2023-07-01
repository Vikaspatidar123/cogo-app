import { Input } from '@cogoport/components';
import { IcMCross, IcMSearchdark } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Filters({
	handleChange = () => {},
	handleInputReset = () => {},
	placeholder = '',
	values = '',
	setValues = () => {},
}) {
	return (
		<div className={styles.container}>
			<Input
				className="primary md"
				placeholder={placeholder || 'Search...'}
				value={values}
				onChange={(e) => handleChange(e, setValues)}
				suffix={(
					<IcMCross
						onClick={handleInputReset}
						size={1.3}
						cursor="pointer"
						width={20}
						height={20}
					/>
				)}
				prefix={<IcMSearchdark width={20} height={20} />}
			/>
		</div>
	);
}

export default Filters;
