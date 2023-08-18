import { Button } from '@cogoport/components';

import InfoContainer from './InfoContainer';
import ShipmentHead from './ShipmentHead';
import styles from './styles.module.css';

import PublicHeader from '@/ui/commons/components/PublicHeader';

function UserShipmentAlert() {
	const renderFunction = <Button type="button">Login</Button>;
	return (
		<div>
			<PublicHeader renderFunction={renderFunction} />
			<div className={styles.box}>
				<ShipmentHead />
				<InfoContainer />
			</div>
		</div>
	);
}

export default UserShipmentAlert;
