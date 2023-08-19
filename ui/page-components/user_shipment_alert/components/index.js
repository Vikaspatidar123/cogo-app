import { Button } from '@cogoport/components';
import { useState } from 'react';

import InfoContainer from './InfoContainer';
import LoginModal from './LoginModal';
import ShipmentHead from './ShipmentHead';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import PublicHeader from '@/ui/commons/components/PublicHeader';

function UserShipmentAlert() {
	const { push } = useRouter();
	const [show, setShow] = useState(false);
	const [titleType, showTitleType] = useState('');
	const renderFunction = <Button type="button" onClick={() => push('/login')}>Login</Button>;
	return (
		<div>
			<PublicHeader renderFunction={renderFunction} />
			<div className={styles.box}>
				<ShipmentHead setShow={setShow} showTitleType={showTitleType} />
				<InfoContainer setShow={setShow} showTitleType={showTitleType} />
			</div>
			<LoginModal setShow={setShow} show={show} titleType={titleType} />
		</div>
	);
}

export default UserShipmentAlert;
