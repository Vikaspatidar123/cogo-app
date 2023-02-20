import DotIconSvg from './dot.svg';
import styles from './styles.module.css';
import TickIconSvg from './tick.svg';
// import { getGeoConstants } from '@/constants/geo';

// const geo = getGeoConstants();

// const PASSWORD_PATTERN =	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm;

function PasswordValidator({ password = '' }) {
	const VALID_PASSWORD_MAPPINGS = {
		lowercase: {
			// pattern : geo.regex.PASSWORD.lowercase,
			message: 'at least one lowercase character.',
		},
		uppercase: {
			// pattern : geo.regex.PASSWORD.uppercase,
			message: 'at least one uppercase character.',
		},
		digit: {
			// pattern : geo.regex.PASSWORD.digit,
			message: 'at least one digit.',
		},
		special: {
			// pattern : geo.regex.PASSWORD.special,
			message: 'at least one special character (!@#$%^&*).',
		},
		minLength: {
			// pattern : geo.regex.PASSWORD.minLength,
			message: 'minimum 8 characters.',
		},
	};

	return (
		<div className={styles.password_validator}>
			<div className={styles.title}>
				Password must contain:
			</div>

			<div className={styles.list}>
				{Object.entries(VALID_PASSWORD_MAPPINGS)?.map(([key, value]) => {
					const { pattern = null, message = '' } = value;

					const regex = new RegExp(pattern);

					const isValid = regex.test(password);

					return (
						<div className={styles.item}>
							<div className={`${styles.icon} `}>
								{isValid ? <TickIconSvg /> : <DotIconSvg />}
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
