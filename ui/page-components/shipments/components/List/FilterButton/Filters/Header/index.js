// import { Btn } from '@cogo/deprecated_legacy/ui';
// import { func } from 'prop-types';
// import React from 'react';

// import Icon from './ic-refresh.svg';
// import { Container, Title, Right } from './styles';
import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ onClose, onSubmit, onReset, id_prefix = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Filters</div>
			<div className={styles.right}>
				<Button
					className="outline small"
					onClick={onReset}
					style={{ border: 'none', color: '#4F4F4F', fontSize: 12 }}
					id={`${id_prefix}_reset_btn`}
				>
					{/* <Icon style={{ width: 12, height: 12, marginRight: 3 }} /> */}
					Reset
				</Button>
				<Button id={`${id_prefix}_cancel_btn`} className="outline small" onClick={onClose} style={{ marginLeft: 10 }}>
					CANCEL
				</Button>
				<Button type="submit" id={`${id_prefix}_cancel_btn`} className="small" onClick={onSubmit} style={{ marginLeft: 10 }}>
					APPLY
				</Button>
			</div>
		</div>
	);
}

export default Header;
