import { IcMArrowNext } from '@cogoport/icons-react';
import Image from 'next/image';
import React from 'react';

import styles from './styles.module.css';

import ExternalLink from '@/ui/components/ExternalLink';
import { useTranslation } from '@/ui/components/LocaleTranslationContext';
import { useGetUserLocationContent } from '@/ui/components/UserLocationContentContext';

function RateLimitExceeded() {
	const { t } = useTranslation(['spot_search']);

	const { spotSearch_rateLimitExceeded } = useGetUserLocationContent();

	return (
		<div className={styles.request_limit_exceeded}>
			<h4>{t('rate_limit_1')}</h4>
			<h3>{t('try_our_services')}</h3>
			<ExternalLink
				className={styles.link_to}
				scope="app"
				label={(
					<>
						<div className={styles.left_text}>
							<span>{t('shipper')}</span>
							<span>
								{t('shipper_description')}
							</span>
						</div>
						<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />

					</>
				)}
				page="signup"
				section="rate_discovery"
			/>
			<ExternalLink
				className={styles.link_to}
				scope="partners"
				label={(
					<>
						<div className={styles.left_text}>
							<span>{t('carrier')}</span>
							<span>
								{t('carrier_description')}
							</span>
						</div>
						<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />

					</>
				)}
				page="signup"
				section="rate_discovery"
			/>
			<div className={styles.image_container}>
				<Image
					alt="rate limit exceeded"
					src={spotSearch_rateLimitExceeded}
					width={300}
					height={200}
					style={{ objectFit: 'contain' }}
				/>
			</div>
		</div>
	);
}

export default RateLimitExceeded;
