import styles from './styles.module.css';

function HeaderContainer() {
	return (
		<div className={styles.container}>
			<div>
				<span className={styles.one}> The Right Plan for Your Business </span>
			</div>

			<div className={styles.text}>
				We have several powerful plans to showcase your business and get
				discovered
				<div> as a creative entrepreneurs. Everything you need.</div>
			</div>
		</div>
	);
}

export default HeaderContainer;
