import { Loader } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import useGetFaq from '../../hooks/useGetFaq';

import Card from './Card';
import styles from './styles.module.css';

function FAQComponent({
	showFaq = false,
	setFaq = () => {},
}) {
	const { faqDetails = [], faqsLoading = false } = useGetFaq({ showFaq });

	if (faqsLoading) {
		return <Loader />;
	}
	return (
		<div className={showFaq === 'block' ? styles.wrapper : styles.wrapper_hidden}>
			<div
				className={showFaq === 'block'
					? styles.content_wrapper
					: styles.content_wrapper_hidden}
			>
				<div className={styles.head}>
					<div role="presentation" onClick={() => setFaq('none')} className={styles.flex}>
						<IcMCross />
						<div style={{ paddingLeft: '5px' }}>Close</div>
					</div>
				</div>

				{!faqsLoading && faqDetails?.length > 0 ? (
					(faqDetails || []).map((item) => (
						<Card item={item || []} key={item.question} />
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

export default FAQComponent;
