/* eslint-disable no-unused-vars */
import { IcCTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

import patterns from '@/ui/commons/configurations/patterns';

const VALID_PASSWORD_MAPPINGS = {
	lowercase: {
		pattern : patterns.PASSWORD.lowercase,
		message : 'at least one lowercase character.',
	},
	uppercase: {
		pattern : patterns.PASSWORD.uppercase,
		message : 'at least one uppercase character.',
	},
	digit: {
		pattern : patterns.PASSWORD.digit,
		message : 'at least one digit.',
	},
	special: {
		pattern : patterns.PASSWORD.special,
		message : 'at least one special character (!@#$%^&*).',
	},
	minLength: {
		pattern : patterns.PASSWORD.minLength,
		message : 'minimum 8 characters.',
	},
};

function PasswordValidator({ password = '' }) {
	return (
		<div className={styles.password_validator}>
			<div className={styles.title}>Password must contain:</div>

			<div className={styles.list}>
				{Object.entries(VALID_PASSWORD_MAPPINGS)?.map(([key, value]) => {
					const { pattern = null, message = '' } = value;
					const regex = new RegExp(pattern);
					const isValid = regex.test(password);
					return (
						<div className={styles.item}>
							<div className={`${styles.icon} `}>
								{isValid ? <IcCTick /> : <div className={styles.dot} />}
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
