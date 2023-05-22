import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function RenderSkeleton() {
	return (
		<div>
			<div className={styles.container}>
				{[...Array(3).keys()].map(() => (
					<Placeholder
						className={styles.card}
						margin="0px 0px 20px 0px"
					/>
				))}
			</div>
			<div>
				<Placeholder
					className={styles.styled_card}
					margin="0px 0px 20px 0px"
				/>
			</div>
		</div>
	);
}
export default RenderSkeleton;
