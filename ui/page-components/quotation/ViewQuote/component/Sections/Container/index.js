import { cl } from '@cogoport/components';

import styles from './styles.module.css';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function Container({ viewQuoteData = {} }) {
	const additional_charges = viewQuoteData.additionalChargesList?.incotermCharges;
	const currency = 'USD';
	return (
		<>
			<div className={styles.container_details}>
				<div>
					<div className={styles.container_box1}>
						<h2 className={styles.inside_container}>Container Details: </h2>
						<div className={styles.left_cont}>
							<div className={styles.data1}>
								<p className={styles.text1}>{viewQuoteData.containerType}</p>
							</div>
							<div className={styles.data2}>
								Container Count
								{' '}
								{viewQuoteData.containerCount}

							</div>
							<div className={styles.data2}>
								Container Size
								{' '}
								{viewQuoteData.containerSize}

							</div>
						</div>
					</div>
				</div>

			</div>
			<div className={styles.charges}>
				<h2 className={styles.text_charge}>Charges: </h2>
				<div className={styles.with_background}>
					<p className={styles.inside_data}>Consignment total </p>
					{shortFormatNumber(viewQuoteData.productCost, currency)}
				</div>
				<div className={styles.without_background}>
					<p className={styles.inside_data}>Insurance</p>
					{shortFormatNumber(viewQuoteData.insurance, currency)}
				</div>
				<div className={styles.with_background}>
					<p className={styles.inside_data}>Duties And taxes</p>
					{shortFormatNumber(viewQuoteData.dutiesAndTaxes, currency)}
				</div>
				<div className={styles.without_background}>
					<p className={styles.inside_data}>Basic Freight</p>
					{shortFormatNumber(viewQuoteData.basicFreightCharges, currency)}
				</div>
				{(additional_charges || []).map((charge) => (
					<div className={styles.with_back}>
						<p className={styles.inside_data}>{charge?.name}</p>
						{shortFormatNumber(charge.value, currency)}
						{/* {charge.value} */}
					</div>
				))}
				<div className={cl`${styles.total} ${styles.with_background}`}>
					<p className={styles.final}>Quotation Total</p>
					<p className={cl`${styles.final_text} ${styles.final}`}>
						{shortFormatNumber(viewQuoteData.quotationAmount, currency)}

					</p>
				</div>

				 {/* <div className={styles.with_background}>
					<p className={styles.inside_data}>Destination Custom Clearance</p>
					₹0.00
					<p className={cl`${styles.final_text} ${styles.final}`}>{viewQuoteData.quotationAmount}</p>

				</div> */}

			</div>
		</>

	);
}
export default Container;
