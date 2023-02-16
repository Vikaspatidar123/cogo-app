// import ToolTip from '@cogoport/front/components/admin/ToolTip';
import { IcMInfo } from '@cogoport/icons-react';

import { shortFormatNumber } from '../../../../utils/getShortFormatNumber';

import { Container, Title, Row } from './styles';

function ServicesCharge({ formData }) {
	const {
		hsCode, consignmentValue, quantity, currency, productName,
	} = formData || {};

	const getProductData = () => (
		<div>
			Product Name:
			{productName}
		</div>
	);
	return (
		<Container>
			<Title>Product Details</Title>
			<Row>
				<div className="hscode">
					<div>{hsCode}</div>
					{productName !== '' && (
						<ToolTip theme="light-border" placement="right" content={getProductData()}>
							<div>
								<IcMInfo />
							</div>
						</ToolTip>
					)}
				</div>
				<div className="quantity">
					Qty:
					{quantity}
				</div>
				<div>{shortFormatNumber(consignmentValue, currency, true)}</div>
			</Row>
		</Container>
	);
}

export default ServicesCharge;
