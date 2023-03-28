import Layout from '@cogo/business-modules/form/Layout';
import { Grid } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/front/utils';

import useAddLineItem from '../../../../../../hooks/useAddLineItem';

import RenderLineItems from './RenderLineItems';
import {
	Container,
	ButtonContainer,
	Text,
	DetailCon,
	GrayLine,
} from './styles';

function AddLineItem({ service, spotBookingDetails, getCheckout }) {
	const line_items = service?.line_items;
	const { Row, Col } = Grid;

	const {
		controls,
		fields,
		handleSubmit,
		errors,
		handleSave,
		deleteLineItem,
		loading,
	} = useAddLineItem({ service, spotBookingDetails, getCheckout });

	const showLineItems = () => {
		if (service?.line_items?.length > 0) {
			return (
				<RenderLineItems
					deleteLineItem={deleteLineItem}
					lineItems={line_items}
					loading={loading}
				/>
			);
		}

		return (
			<DetailCon>
				<Layout
					themeType="admin"
					controls={controls}
					fields={fields}
					errors={errors}
				/>
			</DetailCon>
		);
	};

	return (
		<Container>
			<Text>
				{startCase(service?.service_type)}
				{' '}
				(
				{service?.container_size}
				{' '}
				FT)
			</Text>
			<DetailCon>
				<Row>
					<Col xs={12} md={12} lg={2.5} xl={2.5}>
						Line Item
					</Col>
					<Col xs={12} md={12} lg={2} xl={2}>
						Unit
					</Col>
					<Col xs={12} md={12} lg={2} xl={2}>
						Currency
					</Col>
					{/* <Col xs={12} md={12} lg={2} xl={2}>
						Buy Price
					</Col> */}
					<Col xs={12} md={12} lg={2} xl={2}>
						Sell Price
					</Col>
				</Row>
			</DetailCon>
			{showLineItems()}
			<GrayLine />
			<ButtonContainer>
				<Button
					className="primary sm"
					disabled={loading || service?.line_items?.length > 0}
					onClick={handleSubmit(handleSave)}
				>
					Save
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default AddLineItem;
