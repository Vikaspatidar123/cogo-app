// import { UICustomTheme, Grid1 } from '@cogo/deprecated_legacy/ui';
// import { shape, arrayOf } from 'prop-types';
// import React from 'react';

// import CUSTOM_THEME from './custom-theme';
// import Item from './Item';
// import { Container } from './styles';

// const { Row } = Grid1;

function Options({ fields, controls, id_prefix }) {
	return (
		<UICustomTheme theme={CUSTOM_THEME}>
			<Container>
				<Row>
					{controls.map((item) => (
						<Item
							key={item.name}
							name={item.name}
							fields={fields}
							id={`${id_prefix}_${item.name}`}
						/>
					))}
				</Row>
			</Container>
		</UICustomTheme>
	);
}

export default Options;
