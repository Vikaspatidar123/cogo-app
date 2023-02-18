import React from 'react';

import styles from './styles.module.css';

function CardHeader({
	fields,
	// getTableHeaderCheckbox = () => {},
	singleList,
	sort = {},
	setSort,
	stylesRow,
}) {
	const handleOnchange = (item) => {
		setSort(() => {
			if (sort.sortBy !== item.key) {
				return {
					sortBy   : item.key,
					sortType : 'ASC',
				};
			}
			return {
				sortBy   : item.key,
				sortType : sort.sortType === 'DESC' ? 'ASC' : 'DESC',
			};
		});
	};

	return (
		<>234</>
		// <Row className={styles.styles_row}>
		// 	{(fields || []).map((field) => (
		// 		<Col
		// 			xs={field.span}
		// 			sm={field.span}
		// 			md={field.span}
		// 			lg={field.span}
		// 			style={stylesCol}
		// 			key={field?.key || field?.label}
		// 		>
		// 			<div className={styles.card - title} active={singleList}>{field.label}</div>
		// 			{field.sorting && (
		// 				<Caret
		// 					className={sort.sortType === 'ASC' ? 'rotate' : 'no-rotate'}
		// 					onClick={() => handleOnchange(field)}
		// 				/>
		// 			)}
		// 		</Col>
		// 	))}
		// </Row>
	);
}

export default CardHeader;
