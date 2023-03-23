import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header({
	onClose = () => {},
	onSubmit = () => {},
	search_type = '',
	index = 0,
	clearPreviousValues = () => {},
}) {
	return (
		<>
			<div className={styles.container} style={search_type === 'rfq' ? { marginBootom: '8px' } : {}}>
				<div className={styles.title}>OPTIONS</div>

				<div className={styles.right}>
					<Button ghost onClick={onClose} id="search_form_cargo_details_cancel_button">
						CANCEL
					</Button>

					<Button onClick={onSubmit} style={{ marginLeft: '8px' }} id="search_form_cargo_details_apply_button">
						APPLY
					</Button>
				</div>
			</div>

			{search_type === 'rfq' ? (
				<>
					<Text
						className={index === 0 ? 'disabled' : null}
						onClick={index !== 0 ? () => clearPreviousValues() : null}
					>
						Clear from previous entry
					</Text>
					<Line />
				</>
			) : null}
		</>
	);
}

export default Header;
