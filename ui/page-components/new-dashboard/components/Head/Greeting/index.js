import { useSelector } from '@/packages/store';

import getTimeGreet from '../../../utils/getTimeGreet';

import styles from './styles.module.css';

function HeaderGreeting() {
	const { name } = useSelector(({ profile }) => profile);

	const { icon, message } = getTimeGreet();

	return (
		<div className={styles.container}>
			{icon}
			{`${message}, ${name} !`}
		</div>
	);
}

export default HeaderGreeting;
