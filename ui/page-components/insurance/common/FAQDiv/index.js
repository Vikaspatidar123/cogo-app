import { IcMCross } from '@cogoport/icons-react';

import Card from './Card';
// import { ContentWrapper, Wrapper, Head, Click } from './style';
import styles from './styles.module.css';

function FAQDiv({
	faqDetails = [],
	showFaq = false,
	setFaq = () => {},
	isMobile = false,
}) {
	return (
		<div className={showFaq === 'block' ? styles.wrapper : styles.wrapper_hidden}>
			<div
				className={showFaq === 'block'
					? `${isMobile ? styles.content_wrapper_mobile : styles.content_wrapper}`
					: styles.content_wrapper_hidden}
			>
				<div className={styles.head}>
					<div role="presentation" onClick={() => setFaq('none')}>
						<IcMCross />
						<div style={{ paddingLeft: '5px' }}>Close</div>
					</div>
				</div>

				{faqDetails?.length > 0 ? (
					(faqDetails || []).map((item) => (
						<Card item={item || []} key={item.question || ''} />
					))
				) : (
					<div className={styles.image_wrapper}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/quotation-expired.svg"
							alt=""
							className="image"
							height="120px"
						/>
						<div>Could not fetch FAQs.</div>
						<div>Sorry for the inconvenience.</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default FAQDiv;
