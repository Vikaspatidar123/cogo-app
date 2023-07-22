import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.container}>
			{[...Array(2).keys()].map((item) => (
				<Placeholder
					key={item}
					height="85px"
					width="400px"
					margin="0px 0px 10px 10px"
				/>
			))}
		</div>
	);
}
export default Loading;
