import { cl } from '@cogoport/components';

import styles from './styles.module.css';
import TagContainer from './TagContainer';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

const CHARGE_MAPPING = {
	productCost         : 'Consignment Total',
	insurance           : 'Insurance',
	dutiesAndTaxes      : 'Duties And taxes',
	basicFreightCharges : 'Basic Freight',
};

const renderComment = ({ comments }) => (
	comments && (
		<div className={styles.comment}>
			<h2 className={cl`${styles.title} ${styles.notes_title}`}>Additional Notes:</h2>
			<p className={styles.text}>{comments}</p>
		</div>
	)
);

function ChargeDetails(props) {
	const {
		basicFreightCharges,
		dutiesAndTaxes,
		insurance,
		additionalChargesList,
		quotationAmount,
		comments,
		currency,
		productCost,
		...rest
	} = props;
	const { additionalCharges = [], incotermCharges = [] } = additionalChargesList || {};
	const charges = [...additionalCharges, ...incotermCharges];

	return (
		<div className={styles.container}>
			<div className={styles.comment_container}>
				<div>
					<TagContainer {...rest} />
				</div>
				<div className={styles.comment_web_view}>
					{renderComment({ comments })}
				</div>
			</div>
			<div className={styles.charge_container}>
				<h2 className={styles.title}>Charges: </h2>

				{Object.keys(CHARGE_MAPPING).map((charge, index) => (
					<div key={charge} className={cl`${styles.row} ${index % 2 === 0 ? styles.row_bg : ''}`}>
						<p className={styles.text}>{CHARGE_MAPPING[charge]}</p>
						{shortFormatNumber(props?.[charge], currency)}

					</div>
				))}

				{charges?.length !== 0
					&& charges?.map((charge, index) => (
						<div
							key={`${charge?.name}_${index}`}
							className={cl`${styles.row} ${index % 2 === 0 ? styles.row_bg : ''}`}
						>
							<p className={styles.text}>{charge?.name}</p>
							{shortFormatNumber(charge?.value, currency)}
						</div>
					))}

				<div className={cl`${styles.row} ${styles.total}`}>
					<p>Quotation Total</p>
					<p className={styles.total_amt}>{shortFormatNumber(quotationAmount, currency)}</p>
				</div>
			</div>
			<div className={styles.comment_mobile_view}>
				{renderComment({ comments })}
			</div>
		</div>
	);
}

export default ChargeDetails;
