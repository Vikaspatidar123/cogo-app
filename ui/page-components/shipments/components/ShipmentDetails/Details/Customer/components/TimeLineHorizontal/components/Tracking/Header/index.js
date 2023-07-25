import { Select } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	ContainerOptions = [],
	setContainerNo = () => {},
	containerNo = '',

}) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>Tracking Information</div>
			<Select
				size="sm"
				style={{ width: '200px' }}
				placeholder="Container no"
				value={containerNo}
				onChange={(e) => setContainerNo(e)}
				options={ContainerOptions || []}
			/>
		</div>
	);
}

export default Header;
