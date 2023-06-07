import { Button } from '@cogoport/components';

import styles from '../styles.module.css';

function Footer({
	createAddressLoading = false,
	handleCloseModal = () => {},
	handleSubmit = () => {},
	onSubmit = () => {},
}) {
	return (
		<div className={styles.button_container}>
			<Button
				themeType="tertiary"
				size="md"
				className={styles.cancel}
				onClick={handleCloseModal}
			>
				Cancel
			</Button>
			<Button onClick={handleSubmit(onSubmit)} disabled={createAddressLoading}>
				{createAddressLoading ? (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						width="40px"
						height="15px"
						alt=""
					/>
				) : (
					'Add'
				)}
			</Button>
		</div>
	);
}

export default Footer;
