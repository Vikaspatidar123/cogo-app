// import Grid from '@cogoport/front/components/Grid';
// import styled from '@cogoport/front/styled';
// import React from 'react';

// import getField from '../../../common/form/components';

import styles from './styles.module.css';
import TrashIcon from './trash.svg';

// const { Row, Col } = Grid;
function Child({
	controls,
	control,
	field,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
}) {
	return (
		<div className={`form-fieldArray-${name}-${index}`} key={field.id}>
			{/* <Row style={{ width: '100%', alignItems: 'center' }}>
				{controls.map((controlItem) => {
					const { span = 6 } = controlItem;
					const Element = getField(controlItem.type);
					return (
						<Col xs={12} md={span || 12} lg={span || 12} xl={span || 12}>
							<Element
								{...controlItem}
								control={control}
								key={`${name}.${index}.${controlItem.name}`}
								name={`${name}.${index}.${controlItem.name}`}
								value={field[controlItem.name]}
								id={`${name}_${index}_${controlItem.name}`}
							/>
						</Col>
					);
				})} */}

			<div className={styles.Color}>
				<input type="color" />
			</div>

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.remove_icon}>
					<div className={`form-fieldArray-${name}-remove`}>
						<TrashIcon
							onClick={() => remove(index, 1)}
							style={{ width: '2em', height: '2em' }}
						/>
					</div>
				</div>
			) : null}
			{/* </Row> */}
		</div>
	);
}
export default Child;
