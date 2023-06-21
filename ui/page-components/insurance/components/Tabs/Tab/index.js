import { startCase } from '@cogoport/utils';

import { PlaneGif, ShipGif, TruckGif } from '../../../common/constants';
import styles from '../styles.module.css';

const GIF = {
	ocean : ShipGif,
	air   : PlaneGif,
	road  : TruckGif,
};

const URLS = {
	ocean : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ocean.svg',
	air   : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/plane.svg',
	road  : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truck_new.svg',
};

function Tab({ isMobile = false, clickHandler = () => {}, css = '', tab = 'ocean' }) {
	return 				(
		<div
			className={css === tab
				? `${isMobile ? styles.button_mobile_active : styles.button_active}`
				: `${isMobile ? styles.button_mobile : styles.button}`}
			id={tab}
			onClick={() => clickHandler(tab)}
			role="presentation"
		>
			{!isMobile && (
				<div className={styles.dot_wrapper}>
					<div className={css === tab ? styles.dot_active : styles.dot} />
				</div>
			)}
			{css === tab ? (
				<img className={styles.gif} src={GIF[tab]} alt="" />
			) : (
				<img
					src={URLS[tab]}
					alt=""
					className={isMobile && styles.image_mobile}
					width={80}
					height={80}
				/>
			)}
			<div className={isMobile ? styles.label_container_mobile : styles.label_containe}>
				<div
					className={css === tab
						? `${isMobile ? styles.label_active_mobile : styles.label_active}`
						: `${isMobile ? styles.label_mobile : styles.label}`}
				>
					{tab === 'road' ? 'Surface' : startCase(tab)}
				</div>
				<div
					className={css === tab
						? `${isMobile ? styles.label_active_mobile : styles.label_active}`
						: `${isMobile ? styles.label_mobile : styles.label}`}
				>
					Insurance
				</div>
			</div>
		</div>
	);
}

export default Tab;
