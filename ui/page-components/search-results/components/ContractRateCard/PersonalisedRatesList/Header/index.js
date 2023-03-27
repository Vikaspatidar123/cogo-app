import Grid from '@cogoport/front/components/Grid';
import IconsMapping from '@cogo/product/contract-rates/common/IconsMapping';
import { Container, ServiceName, IconDiv, StyledCol } from './styles';
import PortsInfo from '../PortsInfo';
import ContainerInfo from '../ContainerInfo';

const { Row, Col } = Grid;

const Header = ({ data, source = '' }) => {
	const {
		origin_location,
		destination_location,
		trip_type = '',
		service_type = '',
	} = data || {};

	const service = service_type.split('_');
	return (
		<Container>
			<Row style={{ width: '108%' }}>
				<Col md={0.6} style={{ borderRight: '1px solid #F2F2F2' }}>
					<IconDiv>
						{IconsMapping[service_type]}
						<ServiceName>{service[0]}</ServiceName>
					</IconDiv>
				</Col>
				<StyledCol md={5.5}>
					<PortsInfo
						originPort={origin_location}
						trip={trip_type}
						destinationPort={destination_location}
						separator={
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/union-2.svg"
								alt="union-icon"
								className="ports-direction-svg"
							/>
						}
					/>
				</StyledCol>

				<Col className="space-top" md={5}>
					<ContainerInfo data={data} source={source} />
				</Col>
			</Row>
		</Container>
	);
};

export default Header;
