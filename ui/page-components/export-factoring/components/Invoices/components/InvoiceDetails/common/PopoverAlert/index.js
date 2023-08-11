import { Popover } from '@cogoport/components';
import React from 'react';

import DeleteAlert from '../DeleteAlert';

import styles from './styles.module.css';

function PopoverAlert({
	onSubmit,
	loading,
	showDeleteForm,
	setShowDeleteForm,
}) {
	return (
		<Popover
			content={(
				<DeleteAlert
					onSubmit={onSubmit}
					loading={loading}
					showDeleteForm={showDeleteForm}
					setShowDeleteForm={setShowDeleteForm}
				/>
			)}
			visible={showDeleteForm}
			onOuterClick={() => setShowDeleteForm(false)}
			theme="light"
			placement="top"
			interactive
		>
			<div
				role="presentation"
				className={styles.editText}
				onClick={() => setShowDeleteForm(!showDeleteForm)}
			>
				Delete
			</div>
		</Popover>
	);
}

export default PopoverAlert;
