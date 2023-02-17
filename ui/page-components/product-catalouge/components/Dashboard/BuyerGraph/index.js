import { ResponsivePie } from '@cogoport/charts/pie';

import { shortFormatNumber } from '../../../common/getShortFromatNumber';

// import {
// 	Container,
// 	BarContainer,
// 	ToolTip,
// 	Box,
// 	Label,
// 	SideContainer,
// 	Value,
// } from './style';
import styles from './styles.module.css';

function Buyer({ topProduct = [], productLoading }) {
	const colorMapping = ['#FBE39F', '#D9EAFD', '#ee3425', '#65677a'];
	const data = topProduct.map((x) => ({
		id    : x.saasPartnerId,
		label : x.buyerName,
		value : x.buyerProductAmount,
	}));

	return (
		<div className={styles.container}>
			{!productLoading && topProduct.length !== 0 && (
				<div className={styles.bar_container}>
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
							<div className={styles.tool_tip}>
								<div className={styles.box} style={{ background: color }} />
								<div className={styles.label}>{label}</div>
								:
								<span>{shortFormatNumber(value, 'INR')}</span>
							</div>
						)}
					/>
					<div className={styles.side_container}>
						{data.map((y, i) => (
							<div className={styles.value} style={{ background: colorMapping[i] }} key={y.value}>
								<div className="data">
									<div>{shortFormatNumber(y.value, 'INR')}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Buyer;
