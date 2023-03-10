import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

// import Ocean from '../../assets/ocean.svg';
// import Plane from '../../assets/plane.svg';
// import Truck from '../../assets/truck.svg';
import { PlaneGif, ShipGif, TruckGif } from '../../common/constants';

// import {
// 	Heading,
// 	StyledDiv,
// 	ButtonWrapper,
// 	StyledButton,
// 	Label,
// 	RedButton,
// 	Wrapper2,
// 	DotDiv,
// 	DotWrapper,
// 	Image,
// } from './style.js';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TabsSection({ isMobile }) {
	const { push } = useRouter();
	const [css, setCss] = useState('');
	const clickHandler = (val) => {
		setCss(val);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>Select Type of Insurance: </div>
			<div className={isMobile ? styles.button_wrapper_mobile : styles.button_wrapper}>
				<div
					className={css === 'ocean'
						? `${isMobile ? styles.button_mobile_active : styles.button_active}`
						: `${isMobile ? styles.button_mobile : styles.button}`}
					id="ocean"
					onClick={() => clickHandler('ocean')}
					role="presentation"
				>
					{!isMobile && (
						<div className={styles.dot_wrapper}>
							<div className={css === 'ocean' ? styles.dot_active : styles.dot} />
						</div>
					)}
					{css === 'ocean' ? (
						<img className={styles.gif} src={ShipGif} alt="" />
					) : (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ocean.svg"
							alt=""
							className={isMobile && styles.image_mobile}
							width={80}
							height={80}
						/>
					)}
					<div className={isMobile ? styles.label_container_mobile : styles.label_containe}>
						<div
							className={css === 'ocean'
								? `${isMobile ? styles.label_active_mobile : styles.label_active}`
								: `${isMobile ? styles.label_mobile : styles.label}`}
						>
							Ocean
						</div>
						<div
							className={css === 'ocean'
								? `${isMobile ? styles.label_active_mobile : styles.label_active}`
								: `${isMobile ? styles.label_mobile : styles.label}`}
						>
							Insurance
						</div>
					</div>
				</div>
				<div
					id="air"
					onClick={() => clickHandler('air')}
					className={css === 'air'
						? `${isMobile ? styles.button_mobile_active : styles.button_active}`
						: `${isMobile ? styles.button_mobile : styles.button}`}
					role="presentation"
				>
					{!isMobile && (
						<div className={styles.dot_wrapper}>
							<div className={css === 'air' ? styles.dot_active : styles.dot} />
						</div>
					)}
					{css === 'air' ? <img src={PlaneGif} alt="" className={styles.gif} /> : (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/plane.svg"
							alt=""
							width={80}
							height={80}
							className={isMobile && styles.image_mobile}
						/>
					)}
					<div className={isMobile ? styles.label_container_mobile : styles.label_containe}>
						<div
							className={css === 'air'
								? `${isMobile ? styles.label_active_mobile : styles.label_active}`
								: `${isMobile ? styles.label_mobile : styles.label}`}
						>
							Air
						</div>
						<div
							className={css === 'air'
								? `${isMobile ? styles.label_active_mobile : styles.label_active}`
								: `${isMobile ? styles.label_mobile : styles.label}`}
						>
							Insurance
						</div>
					</div>
				</div>
				<div
					id="road"
					className={css === 'road'
						? `${isMobile ? styles.button_mobile_active : styles.button_active}`
						: `${isMobile ? styles.button_mobile : styles.button}`}
					onClick={() => clickHandler('road')}
					role="presentation"
				>
					{!isMobile && (
						<div className={styles.dot_wrapper}>
							<div className={css === 'road' ? styles.dot_active : styles.dot} />
						</div>
					)}
					{css === 'road' ? <img src={TruckGif} className={styles.gif} alt="" /> : (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truck_new.svg"
							alt=""
							width={80}
							height={80}
							className={isMobile && styles.image_mobile}
						/>
					)}
					<div className={isMobile ? styles.label_container_mobile : styles.label_containe}>
						<div
							className={css === 'road'
								? `${isMobile ? styles.label_active_mobile : styles.label_active}`
								: `${isMobile ? styles.label_mobile : styles.label}`}
						>
							Surface
						</div>
						<div
							className={css === 'road'
								? `${isMobile ? styles.label_active_mobile : styles.label_active}`
								: `${isMobile ? styles.label_mobile : styles.label}`}
						>
							Insurance
						</div>
					</div>
				</div>
			</div>
			<div className={styles.wrapper_2}>
				<Button
					onClick={() => push('/saas/insurance/[type]', `/saas/insurance/${startCase(css)}`)}
					disabled={css === ''}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default TabsSection;
