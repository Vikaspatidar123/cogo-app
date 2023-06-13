import { cl } from '@cogoport/components';
import { IcAShipAmber, IcATruck } from '@cogoport/icons-react';

import styles from './styles.module.css';

const mapping2 = [
	{
		name  : 'dot',
		type  : 'text',
		label : 'Origin PickUp',
	},
	{
		name  : 'line',
		type  : 'icon',
		label : <IcATruck width={30} height={30} />,
	},
	{
		name  : 'dot',
		type  : 'text',
		label : 'Origin PickUp',
	},
	{
		name  : 'wave',
		type  : 'icon',
		label : <IcAShipAmber width={50} height={30} />,
	},
	{
		name  : 'dot',
		type  : 'text',
		label : 'Destination Port',
	},
	{
		name  : 'line',
		type  : 'icon',
		label : <IcATruck width={30} height={30} />,
	},
	{
		name  : 'dot',
		type  : 'text',
		label : 'Destination Drop',
	},
];

function Header() {
	return (
		<div className={styles.container}>
			{mapping2.map((ele) => {
				const { name, type } = ele;
				return (
					<div className={styles.section}>
						<div className={cl`${styles.label} ${type === 'text' ? styles.text : styles.icon}`}>
							{ele.label}
						</div>
						{name !== 'wave' ? <div className={styles[name]} />
							: (
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/tracking_wave.png"
									alt="wave"
								/>
							)}
					</div>
				);
			})}
		</div>
	);
}

export default Header;
