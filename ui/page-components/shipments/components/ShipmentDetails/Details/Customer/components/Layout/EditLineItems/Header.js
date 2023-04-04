import styles from './styles.module.css';

function Header({ controls = [], isMobile }) {
	return (
		<div className={styles.header_container}>
			<div className={styles.row} style={{ width: '102%' }}>
				{controls.map((ctrl) => {
					const { span } = ctrl;
					return (
						<div className={styles.col}>
							<p className={styles.header_label}>
								{!isMobile ? ctrl.label : null}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Header;
