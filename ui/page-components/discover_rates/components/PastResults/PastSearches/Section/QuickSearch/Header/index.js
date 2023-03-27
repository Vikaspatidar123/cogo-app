import React from 'react';
import { func, bool } from 'prop-types';

import { Button } from '@cogoport/front/components';

import { Container, Title, Right } from './styles';

const Header = ({ onClose, isLoading }) => (
	<Container>
		<Title>QUICK SEARCH</Title>
		<Right>
			<Button type="button" className="small outline" onClick={onClose} isLoading={isLoading}>
				Cancel
			</Button>
			<Button type="submit" className="small" isLoading={isLoading} style={{ marginLeft: 16 }}>
				Search Now
			</Button>
		</Right>
	</Container>
);

Header.propTypes = {
	onClose   : func.isRequired,
	isLoading : bool,
};

Header.defaultProps = { isLoading: false };

export default Header;
