import { Grid } from '@cogoport/front/components';
import Spinner from '@cogo/commons/components/Spinner';
import { startCase } from '@cogoport/front/utils';
import { IcMDelete } from '@cogoport/icons-react';
import { Container, DetailCon, DeleteCon } from './styles';

const RenderLineItems = ({ lineItems, deleteLineItem = () => {}, loading }) => {
	const { Row, Col } = Grid;

	const renderDeleteBtn = (item) => {
		if (loading) {
			return (
				<Spinner
					size={22}
					borderWidth={3}
					outerBorderColor="#cbcff5"
					spinBorderColor="#5936f0"
				/>
			);
		}

		return (
			<Col xs={12} md={12} lg={1} xl={1}>
				<DeleteCon onClick={() => deleteLineItem(item)}>
					<IcMDelete height="17px" width="17px" />
				</DeleteCon>
			</Col>
		);
	};

	return (
		<Container>
			{(lineItems || []).map((line_item) => {
				return (
					<DetailCon>
						<Row>
							<Col xs={12} md={12} lg={2.5} xl={2.5}>
								{startCase(line_item?.name)} ({line_item?.code})
							</Col>
							<Col xs={12} md={12} lg={2} xl={2}>
								{startCase(line_item?.unit)}
							</Col>
							<Col xs={12} md={12} lg={2} xl={2}>
								{startCase(line_item?.currency)}
							</Col>
							{/* <Col xs={12} md={12} lg={2} xl={2}>
								{line_item?.buy_price}
							</Col> */}
							<Col xs={12} md={12} lg={2} xl={2}>
								{line_item?.price}
							</Col>
							{line_item?.source === 'manual'
								? renderDeleteBtn(line_item)
								: null}
						</Row>
					</DetailCon>
				);
			})}
		</Container>
	);
};

export default RenderLineItems;
