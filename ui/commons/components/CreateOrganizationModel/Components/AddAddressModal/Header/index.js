import styles from '../styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.icon_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/sellerAddress.svg"
					width="24px"
					height="24px"
					alt="logo"
				/>
			</div>
			<h3 className={styles.title}>
				Add Address
			</h3>
		</div>
	);
}

export default Header;
