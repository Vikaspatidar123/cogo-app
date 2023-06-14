import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DisplayAddedPackages({ dimensions = [], setDimensions = () => {} }) {
	const handleDeletion = (index) => {
		setDimensions(dimensions.filter((elem, idx) => idx !== index));
	};

	const addDeleteIcon = (index) => (
		<div className={styles.flex} role="presentation" onClick={() => handleDeletion(index)}>
			<IcMDelete fill="#7A5EF3" />
		</div>
	);

	return (
		<div className={styles.container}>
			{dimensions.map((item, index) => (
				<div className={styles.main}>
					{Object.keys(item).map((key) => (
						<div className={styles.display_cox}>
							{' '}
							<div className={styles.item}>{item[key]}</div>
							{' '}
						</div>
					))}

					<div>{addDeleteIcon(index)}</div>
				</div>
			))}
		</div>
	);
}

export default DisplayAddedPackages;
