import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADING_ARR = [...Array(3).keys()];

function ShipmentLoading({ loading }) {
	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>

					<div className={styles.left}>
						<div className={styles.left_des}>
							<Placeholder height="40px" margin="0px 10px 10px 0px" />
							<Placeholder height="40px" margin="0px 0px 10px 0px" />
						</div>

						<div className={styles.line} />
						<Placeholder height="30px" />
					</div>

					<div className={styles.right}>
						<div className={styles.right_loading}>
							{LOADING_ARR.map((item) => (
								<Placeholder
									key={item}
									height="20px"
									width="180px"
									margin="0px 0px 10px 10px"
								/>
							))}
						</div>
					</div>
				</div>

			</div>
		);
	}
	return null;
}
export default ShipmentLoading;
