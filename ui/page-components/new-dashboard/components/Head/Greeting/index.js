import { useTranslation } from 'next-i18next';

import getTimeGreet from '../../../utils/getTimeGreet';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function HeaderGreeting() {
	const { t } = useTranslation(['dashboard']);

	const { name } = useSelector(({ profile }) => profile);

	const { message } = getTimeGreet({ t });

	return (
		<div className={styles.container}>
			{`${message}, ${name} !`}
		</div>
	);
}

export default HeaderGreeting;
