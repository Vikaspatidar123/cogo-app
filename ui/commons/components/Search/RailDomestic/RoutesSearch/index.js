import { forwardRef } from 'react';
import { Grid } from '@cogoport/front/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import Layout from '@cogo/business-modules/form/Layout';

import { Container, ArrowIconContainer } from './styles';
import useRoutesSearch from './useRoutesSearch';

const { Row, Col } = Grid;

const RoutesSearch = (props, ref) => {
	const { originLocationControl, destinationLocationControl, formProps } =
		useRoutesSearch(props, ref);

	const {
		fields,
		formState: { errors },
	} = formProps;

	return (
		<Container>
			<Row>
				<Col xs={12} md={5.5}>
					<Layout
						controls={[originLocationControl]}
						fields={fields}
						errors={errors}
					/>
				</Col>

				<Col xs={12} md={1}>
					<ArrowIconContainer>
						<IcMPortArrow width={32} height={24} />
					</ArrowIconContainer>
				</Col>

				<Col xs={12} md={5.5}>
					<Layout
						controls={[destinationLocationControl]}
						fields={fields}
						errors={errors}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default forwardRef(RoutesSearch);
