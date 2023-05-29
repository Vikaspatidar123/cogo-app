import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function InfoContainer() {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h3 className={styles.title}>Alert</h3>
				<div className={styles.row}>
					<p className={styles.text}>
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor.
					</p>
					<Button themeType="linkUi">Click Here</Button>
				</div>
				<div className={styles.row}>
					<p className={styles.text}>
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor.
					</p>
					<Button themeType="linkUi">Click Here</Button>
				</div>
			</div>

			<div className={styles.card}>
				<h3 className={styles.title}>Important News</h3>
				<div className={styles.row}>
					<p className={styles.text}>
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor.
					</p>
					<Button themeType="linkUi">Click Here</Button>
				</div>
				<div className={styles.row}>
					<p className={styles.text}>
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor.
					</p>
					<Button themeType="linkUi">Click Here</Button>
				</div>
			</div>
		</div>
	);
}

export default InfoContainer;
