import { cl, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import CONTAINER_STATUS from '@/ui/page-components/manage-rfq/configurations/SearchFormControls/draft-status-mapping';

function Tags({
	tags = {},
	commodity = '',
	serviceType,
	incoTerm = '',
	commoditySubtype = '',
	commodityType = '',
	paymentType = '',
}) {
	return (
		<div className={styles.container}>
			{Object.keys(tags).map((item) => (
				<div className={styles.styled_tag}>
					{tags[item]}
					{' '}
					{CONTAINER_STATUS[item]}
				</div>
			))}
			{serviceType === 'air_freight' ? (
				<Tooltip
					content={(
						<div>
							{incoTerm && (
								<div className={cl`${styles.styled_tag} ${styles.margin}`}>{startCase(incoTerm)}</div>
							)}
							{commodity && (
								<div className={cl`${styles.styled_tag} ${styles.margin}`}>{commodity}</div>
							)}
							{commoditySubtype && (
								<div className={cl`${styles.styled_tag} ${styles.margin}`}>{commoditySubtype}</div>
							)}
							{commodityType && (
								<div className={cl`${styles.styled_tag} ${styles.margin}`}>{commodityType}</div>
							)}
							{paymentType && (
								<div className={cl`${styles.styled_tag} ${styles.margin}`}>
									{startCase(paymentType)}
								</div>
							)}
						</div>
					)}
				>
					<div className={styles.more}>show more</div>
				</Tooltip>
			) : (
				<>
					{incoTerm && <div className={styles.styled_tag}>{startCase(incoTerm)}</div>}
					{commodity && <div className={styles.styled_tag}>{commodity}</div>}
					{commoditySubtype && <div className={styles.styled_tag}>{commoditySubtype}</div>}
					{commodityType && <div className={styles.styled_tag}>{commodityType}</div>}
					{paymentType && <div className={styles.styled_tag}>{startCase(paymentType)}</div>}
				</>
			)}
		</div>
	);
}

export default Tags;
