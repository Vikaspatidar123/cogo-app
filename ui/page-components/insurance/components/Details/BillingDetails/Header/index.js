import styles from '../styles.module.css';

function Header({ isMobile = false, name = '' }) {
	return 					(
		<div className={isMobile ? styles.heading_wrapper_mobile : styles.heading_wrapper}>
			<div className={isMobile ? styles.flex_2_mobile : styles.flex_2}>
				<div className={styles.heading}>{name}</div>
			</div>
			<div className={isMobile ? styles.line_wrapper_mobile : styles.line_wrapper}>
				<div className={styles.line} />
			</div>
		</div>
	);
}

export default Header;
