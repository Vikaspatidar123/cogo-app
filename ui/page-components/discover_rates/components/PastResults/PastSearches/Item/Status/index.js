import React from 'react';
import { shape, bool } from 'prop-types';

import QuickSearch from '../../Section/QuickSearch';

import { Container } from './styles';

const Status = ({ data, mobile }) => {
	return (
		<Container className={mobile ? 'mobile' : ''}>
			<QuickSearch
				data={data}
				mobile={mobile}
				extraParams={{
					importer_exporter_id: data.importer_exporter_id,
					importer_exporter_branch_id: data?.importer_exporter_branch_id,
					user_id: data?.user_id,
				}}
			/>
		</Container>
	);
};

Status.propTypes = {
	data: shape({}),
	mobile: bool,
};

Status.defaultProps = {
	data: {},
	mobile: false,
};

export default Status;
