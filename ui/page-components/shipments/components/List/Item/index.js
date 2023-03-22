import getConfigsShipper from '../../../configurations/ShipmentList/Shipper/get-config';
import getConfigsSupplier from '../../../configurations/ShipmentList/Supplier/get-configs';

import ContainerInfo from './ContainerInfo';
import Footer from './Footer';
import MoreDetails from './MoreDetails';
import PortDetails from './PortDetails';
import SearchType from './SearchType';
import Status from './status';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Item({ data, viewAs, className: propClassName = '' }) {
	const { isMobile, scope } = useSelector(({ general }) => ({
		isMobile : general.isMobile,
		scope    : general?.scope,
	}));
	const config =		viewAs === 'importer_exporter'
		? getConfigsShipper(data.shipment_type)
		: getConfigsSupplier(data.service_type);

	const isBookingDesk = propClassName.includes('booking-desk');

	return (
		<div
			className={`${styles.container} ${data.state === 'cancelled' ? styles.disabled : styles.enabled} 
            ${styles.propClassName}`}
		>
			<div className={styles.section}>
				<div>
					<SearchType
						// theme={getText(data, [], viewAs, true)?.color || 'yellow'}
						service_type={data.shipment_type || data.service_type}
						mobile={isMobile}
						width="90px"
					/>
				</div>
				<div className={styles.main}>
					<div className={styles.section}>
						<PortDetails data={data} routeInfo={config?.routeInfo} />
						<div style={{ maxWidth: !isMobile ? 220 : '' }}>
							<ContainerInfo detail={data} />
						</div>
					</div>
					<div className={`${styles.line} ${styles.propClassName}`} />
					<Footer data={data} viewAs={viewAs} isBookingDesk={isBookingDesk} />
				</div>
				<Status data={data} viewAs={viewAs} isBookingDesk={isBookingDesk} />
			</div>
			<hr className={`${styles.line} ${styles.ropClassName}`} />
			<MoreDetails data={data} viewAs={viewAs} scope={scope} />
		</div>
	);
}

export default Item;
