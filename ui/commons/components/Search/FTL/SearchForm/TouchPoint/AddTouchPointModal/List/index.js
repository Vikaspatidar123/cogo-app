import React, { useRef } from 'react';
import {
	Container,
	Box,
	Title,
	ListWrapper,
	SingleList,
	Wrapper,
} from './styles';
import DragIcon from '../../../../icons/drag-icon.svg';
import DeleteIcon from '../../../../icons/delete-icon.svg';

const List = ({ onDeleteTouchPoint, touchPoints, setTouchPoints }) => {
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
		<Container>
			{(touchPoints || []).map((touchPoint, index) => {
				return (
					<ListWrapper
						className="draggable"
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
						<Title> Touch Point {index + 1}</Title>

						<SingleList>
							<Wrapper>
								<DragIcon size={1.5} />

								<Box>{touchPoint?.display_name}</Box>

								<DeleteIcon
									size={1.5}
									style={{ cursor: 'pointer' }}
									onClick={() => onDeleteTouchPoint(index)}
								/>
							</Wrapper>
						</SingleList>
					</ListWrapper>
				);
			})}
		</Container>
	);
};

export default List;
