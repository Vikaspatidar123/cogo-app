import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BasicPlan({ enquiryQuota = {} }) {
	return (
		<div>
			<div className={`${styles.Refund} ${styles.normal}`}>
				No need to worry, place an enquiry with us and our team will get back to
				you soon
			</div>

			<div className={styles.container}>
				<div className={styles.inner_container}>
					<div className={styles.text}>basic</div>

					<div className={styles.text_label}>
						{enquiryQuota?.left_limit}
						{' '}
						free enquries left!
					</div>

					{enquiryQuota?.left_limit ? <div className={styles.tab}>Active</div> : null}
				</div>
				{/* <Text className="rate">$500/10 enquries</Text> */}

				<div className={styles.footer}>
					<div className={`${styles.inner_container} ${styles.label}`}>
						<IcCFtick style={{ marginRight: 8 }} />
						<div className={styles.text}>
							The best rates to give you a competitive edge
						</div>
					</div>

					<div className={`${styles.inner_container} ${styles.label}`}>
						<IcCFtick style={{ marginRight: 8 }} />
						<div className={styles.text}>The quickest service in the business</div>
					</div>
				</div>
			</div>

			<div className={styles.refund}>
				Also, if you book with us after an enquiry, the price of that enquiry will
				be refunded.
			</div>
		</div>
	);
}
export default BasicPlan;
