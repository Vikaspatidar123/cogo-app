import styles from './styles.module.css';

function Header({ item = {} }) {
	const { title = '', header = [] } = item || {};
	return (
		<div className={styles.container}>
			<div>{title}</div>
			<div className={styles.box}>
				{header.map((head) => (
					<div key={head}>
						<div className={styles.head}>{head}</div>
						<div className={styles.head} />
					</div>
				))}
			</div>
		</div>
	);
}
export default Header;
