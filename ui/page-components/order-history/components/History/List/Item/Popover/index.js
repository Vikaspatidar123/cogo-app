import { IcMWasteScrap, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const popover = ({
	itemData, setShowModal, setDeleteModal = () => {}, archived,
}) => (
	<div>
		{!archived && (
			<div
				className={styles.div}
				role="presentation"
				onClick={() => {
					setShowModal(true);
				}}
			>
				<IcMEdit className="icon" />
				<div className="label">Edit</div>
			</div>
		)}
		{!archived && itemData?.totalQuotes <= 0 && (
			<div
				className={styles.div}
			>
				<IcMWasteScrap className="icon" />
				<div
					className="label"
					role="presentation"
					onClick={() => {
						setDeleteModal(true);
					}}
				>
					Delete
				</div>
			</div>
		)}
	</div>
);
export default popover;
