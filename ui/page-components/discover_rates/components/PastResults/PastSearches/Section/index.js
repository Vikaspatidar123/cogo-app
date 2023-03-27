import React from 'react';
import { shape, bool } from 'prop-types';

import QuickSearch from './QuickSearch';
import SearchType from '../../../../../common/SearchType';
import PortDetails from '../../../../../common/PortDetails';
import ContainerInfo from '../../../../../common/ContainerInfo';

import { Container, IconSection, Content, Box } from './styles';

const Section = ({ data, mobile }) => {
	const className = `${mobile ? 'mobile' : ''}`;

	return (
		<Container>
			<IconSection className={className}>
				<SearchType search_type={data.search_type} mobile={mobile} />
			</IconSection>
			<Content className={className}>
				<Box className={className}>
					<PortDetails data={data} />
					<div style={{ maxWidth: !mobile ? 180 : '' }}>
						<ContainerInfo detail={data} />
					</div>
				</Box>
				<Box className="column">
					<QuickSearch
						data={data}
						mobile={mobile}
						extraParams={{
							importer_exporter_id: data.importer_exporter_id,
							importer_exporter_branch_id: data?.importer_exporter_branch_id,
							user_id: data?.user_id,
						}}
					/>
				</Box>
			</Content>
		</Container>
	);
};

Section.propTypes = {
	data: shape({}).isRequired,
	mobile: bool.isRequired,
};

export default Section;
