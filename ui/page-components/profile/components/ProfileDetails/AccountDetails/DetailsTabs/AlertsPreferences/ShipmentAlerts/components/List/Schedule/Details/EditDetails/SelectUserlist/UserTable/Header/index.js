import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

const HEADER = ['name', 'designation', 'Email Id', 'mobile no.'];

function Header({ setValue, list }) {
	const onCheck = (value) => {
		if (value?.target.checked) {
			setValue(list.map((item) => item.id));
		} else {
			setValue([]);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.checkbox}>
					<Checkbox onChange={onCheck} />
				</div>
				{HEADER.map((item) => <div key={item} className={styles.box}>{item}</div>)}
			</div>

		</div>
	);
}

export default Header;
