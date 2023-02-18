import { shortFormatNumber } from '../../../utils/getShortFormatNumber';

import styles from './styles.module.css';

function LandedCost({ landedCost, resultCurrency = 'INR' }) {
	const { taxSet } = landedCost?.[0] || {};
	let totalone = 0;
	(taxSet || []).map((item) => {
		totalone += item.taxSetResponse.reduce((acc, itm) => +acc + +itm?.value, 0);
		return totalone;
	});

	return (
		<div className={styles.container}>
			{/* // length=
			{taxSet?.length} */}
			<div className="scrollable">
				{(taxSet || []).map(({ groupName, taxSetResponse }) => (
					<>1234</>
					// <div className={styles.card} key={groupName}>
					// 	<Row>
					// 		<div className={styles.text}>{groupName.toUpperCase()}</div>
					// 	</Row>
					// 	<div>
					// 		{(taxSetResponse || []).map((x) => (
					// 			<Row className="padding">
					// 				<Col xs={9} className="dotFlex">
					// 					<div className={styles.text}>{x.name}</div>
					// 					<div className="dot" />
					// 				</Col>
					// 				<Col xs={3} className="paddngFlex">
					// 					<div className={styles.text}>
					// 						{shortFormatNumber(x.value, resultCurrency)}
					// 					</div>
					// 				</Col>
					// 			</Row>
					// 		))}
					// 	</div>
					// </div>
				))}
			</div>
			<div className={styles.card_total}>
				234
				{/* <Col xs={9.5}>
					{taxSet?.length > 0 ? (
						<div className={styles.text_total}>Total Landed Cost</div>
					) : (
						<div className={styles.text_total}>
							Sorry!!!! We are unable to fetch duties and taxes. Please try again after
							some time.
						</div>
					)}
				</Col>
				<Col>
					<div className={styles.text_total}>
						{taxSet?.length > 0 ? shortFormatNumber(totalone, resultCurrency) : ''}
					</div>
				</Col> */}
			</div>
		</div>
	);
}
export default LandedCost;
