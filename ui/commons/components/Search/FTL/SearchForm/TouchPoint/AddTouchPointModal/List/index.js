import { cl } from '@cogoport/components';
import React, { useRef } from 'react';

import DeleteIcon from '../../../../icons/delete-icon.svg';
import DragIcon from '../../../../icons/drag-icon.svg';

import styles from './styles.module.css';

function List({ onDeleteTouchPoint, touchPoints, setTouchPoints }) {
	const dragItem = useRef();
	const dragOverItem = useRef();

	const handleSort = () => {
		const _touchPoints = [...touchPoints];

		const draggedItemContent = _touchPoints.splice(dragItem.current, 1)[0];

		_touchPoints.splice(dragOverItem.current, 0, draggedItemContent);

		dragItem.current = null;
		dragOverItem.current = null;

		setTouchPoints(_touchPoints);
	};

	return (
		<div>
			{(touchPoints || []).map((touchPoint, index) => (
				<div
					className={cl`${styles.draggable} ${styles.list_wrapper}`}
					draggable="true"
					onDragStart={() => {
						dragItem.current = index;
					}}
					onDragEnter={() => {
						dragOverItem.current = index;
					}}
					onDragEnd={handleSort}
					onDragOver={(e) => e.preventDefault()}
				>
					<div className={styles.title}>
						Touch Point
						{' '}
						{index + 1}
					</div>

					<li className={styles.single_list}>
						<div className={styles.wrapper}>
							<DragIcon size={1.5} />

							<div className={styles.box}>{touchPoint?.display_name}</div>

							<DeleteIcon
								size={1.5}
								style={{ cursor: 'pointer' }}
								onClick={() => onDeleteTouchPoint(index)}
							/>
						</div>
					</li>
				</div>
			))}
		</div>
	);
}

export default List;
