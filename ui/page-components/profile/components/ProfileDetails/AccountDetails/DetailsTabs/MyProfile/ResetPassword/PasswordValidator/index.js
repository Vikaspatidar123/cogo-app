/* eslint-disable no-unused-vars */
import { IcCTick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import patterns from '@/ui/commons/configurations/patterns';

function PasswordValidator({ password = '' }) {
	const { t } = useTranslation(['settings']);

	const VALID_PASSWORD_MAPPINGS = {
		lowercase: {
			pattern : patterns.PASSWORD.lowercase,
			message : t('settings:password_validator_1'),
		},
		uppercase: {
			pattern : patterns.PASSWORD.uppercase,
			message : t('settings:password_validator_2'),
		},
		digit: {
			pattern : patterns.PASSWORD.digit,
			message : t('settings:password_validator_3'),
		},
		special: {
			pattern : patterns.PASSWORD.special,
			message : t('settings:password_validator_4'),
		},
		minLength: {
			pattern : patterns.PASSWORD.minLength,
			message : t('settings:password_validator_5'),
		},
	};

	return (
		<div className={styles.password_validator}>
			<div className={styles.title}>{t('settings:password_validator_heading')}</div>

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
