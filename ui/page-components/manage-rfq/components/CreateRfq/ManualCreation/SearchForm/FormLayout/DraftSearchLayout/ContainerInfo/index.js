import styles from './styles.module.css';
import Tags from './Tags';

import calculator from '@/ui/page-components/manage-rfq/helpers/calculator';

function ContainerInfo({
	containers = [],
	commodity = '',
	incoTerm = '',
	commoditySubtype = '',
	hscodeDetails = '',
	commodityType = '',
	paymentType = '',
	calculateBy = '',
	dimensions = [],
	hasKey,
	serviceType,
}) {
	const getData = () => {
		if (hasKey && calculateBy !== 'total') {
			const {
				packagesCount: packages_count,
				totalWeight: weight,
				totalVolume: volume,
				stackability: handling_type,
				packageType: package_type,
			} = calculator(dimensions, serviceType);

			return [
				{
					packages_count,
					weight,
					volume,
					...(serviceType === 'air_freight' && { handling_type, package_type }),
				},
			];
		}
		return containers;
	};

	return (
		<div className={styles.details}>
			{getData().map((item) => (
				<div className={styles.container_details}>
					<div className={styles.index_list}>
						{serviceType === 'fcl_freight' ? 'Ctr Details:' : 'Pkg Details:'}
					</div>
					<Tags
						tags={item}
						commodity={commodity}
						serviceType={serviceType}
						incoTerm={incoTerm}
						hscodeDetails={hscodeDetails}
						commoditySubtype={commoditySubtype}
						commodityType={commodityType}
						paymentType={paymentType}
					/>
				</div>
			))}
		</div>
	);
}

export default ContainerInfo;
