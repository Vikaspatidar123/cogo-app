import useViewQuote from '../hooks/useViewQuote';

import Bottompage from './Sections/Bottompage';
import Buttn from './Sections/Buttons';
import Container from './Sections/Container';
import ProductDetails from './Sections/ProductDetails';
import Section1 from './Sections/Section1';
import QuotationDetails from './Sections/Section1/QuotationDetails';
import Section2 from './Sections/section2';
import styles from './styles.module.css';

function ViewQuotation() {
	const {
		loading, viewQuoteData,
	} = useViewQuote();
	console.log(viewQuoteData, 'viewQuoteData');
	const { products = [], buyerDetails = {} } = viewQuoteData || {};
	return (
		<>
			<div className={styles.mainclass}>
				<div className={styles.top}>
					<div className={styles.icon}>
						<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/side.svg" alt="sidearrow" />
					</div>
				</div>
				<div className={styles.border}>
					<div className={styles.header}>
						<h1 className={styles.header_data}>HAMBURGERS</h1>
					</div>
					<div className={styles.quote}>
						<h1 className={styles.quote_data}>Quotation</h1>
					</div>
					<div className={styles.main_section}>
						<Section1 viewQuoteData={viewQuoteData} />
					</div>
					<div className={styles.section2}>
						<Section2 viewQuoteData={viewQuoteData} />
					</div>
					<div className={styles.product_details}>
						<h2 className={styles.prod}>Product Details</h2>
						<ProductDetails
							products={products}
						/>
					</div>
					<div className={styles.main_container}>
						<Container viewQuoteData={viewQuoteData} />

					</div>
					<div className={styles.Bottom}>
						<Bottompage> </Bottompage>
					</div>
				</div>
			</div>
			<div>
				<Buttn />
			</div>

		</>

	);
}

export default ViewQuotation;
