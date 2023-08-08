import SingleEnquiry from './SingleEnquiry';
import styles from './styles.module.css';

function Freight({ freightDetails = {} }) {
	const enquiriesLength = freightDetails.length;

	if (enquiriesLength > 1) {
		return (
			<div style={{ fontSize: '20px' }}>
				You have
				{' '}
				{enquiriesLength}
				{' '}
				Different Enquiries
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<SingleEnquiry freightDetails={freightDetails} />
		</div>
	);
}

export default Freight;
