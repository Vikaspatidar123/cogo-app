import React from 'react';
import { shape, bool } from 'prop-types';

import Status from './Status';
import SearchType from '../../../../../common/SearchType';
import PortDetails from '../../../../../common/PortDetails';
import ContainerInfo from '../../../../../common/ContainerInfo';

import { Container, Section, Main, IconSection } from './styles';

const ReceivedRevert = ({ data, mobile }) => {
	const className = `${mobile ? 'mobile' : ''}`;

	return (
		<Container className={data.expired ? 'disabled' : 'enabled'}>
			<Section>
				<IconSection className={className}>
					<SearchType
						search_type={data.search_type}
						mobile={mobile}
						width="90px"
					/>
				</IconSection>
				<Main className={className}>
					<Section className={className}>
						<PortDetails data={data} mobile={mobile} />
						<div
							style={{
								maxWidth: !mobile ? 180 : '',
							}}
						>
							<ContainerInfo detail={data} />
						</div>
					</Section>
					{(mobile && <Status data={data} mobile={mobile} />) || null}
				</Main>
				{(!mobile && <Status data={data} mobile={mobile} />) || null}
			</Section>
		</Container>
	);
};

ReceivedRevert.propTypes = {
	data: shape({}),
	mobile: bool,
};

ReceivedRevert.defaultProps = {
	data: {},
	mobile: false,
};

export default ReceivedRevert;
