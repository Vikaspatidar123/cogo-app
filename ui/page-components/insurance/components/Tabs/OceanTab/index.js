import { ShipGif } from '../../../common/constants';
import styles from '../styles.module.css';

function OceanTab({ isMobile = false, clickHandler = () => {}, css = '' }) {
	return 				(
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
	);
}

export default OceanTab;
