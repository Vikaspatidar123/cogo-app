import { IcCTick } from '@cogoport/icons-react';

import VALID_PASSWORD_MAPPINGS from '../../utils/getValidPasswordMapping';

import styles from './styles.module.css';

function PasswordValidator({ password = '' }) {
	return (
		<div className={styles.password_validator}>
			<div className={styles.title}>Password must contain:</div>

			<div className={styles.list}>
				{Object.entries(VALID_PASSWORD_MAPPINGS)?.map(([key, value]) => {
					const { message = '', length = 0, characters = [] } = value;

					let isValid = false;
					if (key === 'minLength') {
						isValid = password.length >= length;
					} else {
						isValid = password.split('').some((char) => characters.includes(char));
					}

					return (
						<div key={key} className={styles.item}>
							<div className={styles.icon}>
								{isValid ? <IcCTick width={12} height={16} /> : <div className={styles.dot} />}
							</div>

							<div className={styles.message}>{message}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PasswordValidator;
