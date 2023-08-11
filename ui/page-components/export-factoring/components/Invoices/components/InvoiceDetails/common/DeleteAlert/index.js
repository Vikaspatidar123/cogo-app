import { Button } from '@cogoport/components';
import React from 'react';

import styles from '../PopoverAlert/styles.module.css';

function DeleteAlert({
	onSubmit,
	loading,
	showDeleteForm,
	setShowDeleteForm,
}) {
	return (
		<>
			<div className={styles.valueText}>Are you sure want to Delete</div>
			<div className={styles.deleteContainer}>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => {
						setShowDeleteForm(!showDeleteForm);
					}}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					type="button"
					onClick={onSubmit}
					loading={loading}
					disabled={loading}
				>
					Confirm
				</Button>
			</div>
		</>
	);
}

export default DeleteAlert;
