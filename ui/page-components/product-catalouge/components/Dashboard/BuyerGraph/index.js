import { ResponsivePie } from '@cogoport/charts/pie';

import { shortFormatNumber } from '../../../common/getShortFromatNumber';

import {
	Container,
	BarContainer,
	ToolTip,
	Box,
	Label,
	SideContainer,
	Value,
} from './style';

function Buyer({ topProduct = [], productLoading }) {
	const colorMapping = ['#FBE39F', '#D9EAFD', '#ee3425', '#65677a'];
	const data = topProduct.map((x) => ({
		id    : x.saasPartnerId,
		label : x.buyerName,
		value : x.buyerProductAmount,
	}));

	return (
		<Container>
			<>
				{!productLoading && topProduct.length !== 0 && (
					<BarContainer>
						<ResponsivePie
							margin={{
								top    : 15,
								right  : 50,
								bottom : 20,
								left   : 0,
							}}
							data={data}
							padAngle={0.5}
							justify
							cornerRadius={3}
							activeOuterRadiusOffset={5}
							enableArcLinkLabels={false}
							enableArcLabels={false}
							isInteractive
							animate
							colors={['#FBE39F', '#D9EAFD', '#ee3425', '#65677a']}
							tooltip={({ datum: { label, value, color } }) => (
								<ToolTip>
									<Box color={color} />
									<Label>{label}</Label>
									:
									<span>{shortFormatNumber(value, 'INR')}</span>
								</ToolTip>
							)}
						/>
						<SideContainer>
							{data.map((y, i) => (
								<Value active={colorMapping[i]} key={y.value}>
									<div className="data">
										<div>{shortFormatNumber(y.value, 'INR')}</div>
									</div>
								</Value>
							))}
						</SideContainer>
					</BarContainer>
				)}
			</>
		</Container>
	);
}

export default Buyer;
