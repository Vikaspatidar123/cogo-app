import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TogglePasswordView({ showPassword, setShowPassword }) {
	const Icon = showPassword ? IcMEyeclose : IcMEyeopen;
	return <Icon className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
}

export default TogglePasswordView;
