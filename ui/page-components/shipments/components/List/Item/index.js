import { cl } from '@cogoport/components';

import getConfigsShipper from '../../../configurations/ShipmentList/Shipper/get-config';
import getConfigsSupplier from '../../../configurations/ShipmentList/Supplier/get-configs';
import getText from '../../../utils/get-text';

import ContainerInfo from './ContainerInfo';
import Footer from './Footer';
import MoreDetails from './MoreDetails';
import PortDetails from './PortDetails';
import SearchType from './SearchType';
import Status from './status';
import styles from './styles.module.css';

function Item({ data, viewAs, className: propClassName = '', currentTab = '' }) {
	const config = viewAs === 'importer_exporter'
		? getConfigsShipper(data.shipment_type)
		: getConfigsSupplier(data.service_type);

	const isBookingDesk = propClassName.includes('booking-desk');

	return (
		<div
			className={cl`${styles.container} ${data.state === 'cancelled' ? styles.disabled : styles.enabled} 
            ${styles?.[propClassName]}`}
		>
			<div className={styles.section}>
				<div>
					<SearchType
						theme={getText(data, [], viewAs, true)?.color || 'yellow'}
						service_type={data.shipment_type || data.service_type}
						width="90px"
					/>
				</div>
				<div className={styles.main}>
					<div className={styles.section}>
						<PortDetails data={data} routeInfo={config?.routeInfo} />
						<div>
							<ContainerInfo detail={data} />
						</div>
					</div>
					<div className={cl`${styles.line} ${styles.propClassName}`} />
					<Footer data={data} viewAs={viewAs} isBookingDesk={isBookingDesk} />
				</div>
				<Status data={data} viewAs={viewAs} isBookingDesk={isBookingDesk} />
			</div>
			<hr className={cl`${styles.line} ${styles.ropClassName}`} />
			<MoreDetails data={data} viewAs={viewAs} currentTab={currentTab} />
		</div>
	);
}

export default Item;
