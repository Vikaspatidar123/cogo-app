import { Input } from '@cogoport/components';
import { IcMCross, IcMSearchdark } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Filters({
	handleChange = () => {},
	handleInputReset = () => {},
	placeholder = '',
	values = '',
	setValues = () => {},
}) {
	const { t } = useTranslation(['createTicketPublic']);

	return (
		<div className={styles.container}>
			<Input
				placeholder={placeholder || t('createTicketPublic:search_placeholder_default')}
				value={values}
				size="sm"
				onChange={(e) => handleChange(e, setValues)}
				suffix={(
					<IcMCross
						onClick={handleInputReset}
						cursor="pointer"
						width={12}
						height={12}
					/>
				)}
				prefix={<IcMSearchdark width={12} height={12} />}
			/>
		</div>
	);
}

export default Filters;
