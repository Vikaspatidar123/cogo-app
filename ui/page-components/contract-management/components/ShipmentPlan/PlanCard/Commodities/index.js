import { Tooltip, Button, cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import getInfo from '../../../../utils/getInfo';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const DEFAULT_SERVICE_LENGTH = 2;
const MINIMUN_SERVICE_LENGTH = 1;

const ViewServices = ({ serviceDetails }) => (serviceDetails || []).map((detail, index) => {
	if (!index) return null;

	return (
		<div className={styles.tag_container}>
			{(detail || []).map((data) => (
				<div className={styles.tooltip_tag} key={data?.valueText}>{data?.valueText}</div>
			))}
		</div>
	);
});

function Commodities({ itemData }) {
	const {
		service_type = '',
		[`${service_type}_services`]: freightDetails = [],
	} = itemData || {};

	const primaryServicesDetails = freightDetails.flatMap((freight) => freight.service_details.filter(
		(detail) => detail.service_type === service_type,
	));

	const serviceDetails = primaryServicesDetails.map(getInfo);

	const initalServices = serviceDetails?.[ZEROTH_INDEX];

	const additionalServices = [
		...new Set(
			freightDetails.reduce((acc, curr) => {
				const { additional_services = [] } = curr;
				return [...acc, ...additional_services];
			}, []),
		),
	];

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{initalServices?.map((data) => (
					<div
						className={styles.tag}
						key={data?.valueText}
					>
						{data?.valueText}
					</div>
				))}

				{serviceDetails?.length > 1 ? (
					<Tooltip
						content={<ViewServices serviceDetails={serviceDetails} />}
						placement="bottom"
						maxWidth={600}
					>
						<Button themeType="linkUi">View More</Button>
					</Tooltip>
				) : null}
			</div>

			<div className={cl`${styles.card} ${styles.service_card}`}>
				<div className={styles.service_tag}>{startCase(service_type)}</div>

				{!isEmpty(additionalServices) && (
					<div className={styles.service_tag}>{startCase(additionalServices?.[ZEROTH_INDEX])}</div>
				)}

				{additionalServices?.length > MINIMUN_SERVICE_LENGTH && (
					<Tooltip
						interactive
						placement="right"
						content={(
							<div className={styles.add_services}>
								{(additionalServices.slice(1) || [])
									.map((service) => (
										<div key={service} className={styles.service_tag}>{startCase(service)}</div>
									))}
							</div>
						)}
					>
						<div className={styles.service_tag} style={{ background: '#CFEAED' }}>
							+
							{(additionalServices?.length || DEFAULT_SERVICE_LENGTH) - MINIMUN_SERVICE_LENGTH}
							{' '}
							More
						</div>
					</Tooltip>
				)}
			</div>
		</div>
	);
}

export default Commodities;
