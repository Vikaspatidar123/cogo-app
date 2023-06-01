import { TruckGif } from '../../../common/constants';
import styles from '../styles.module.css';

function SurfaceTab({ isMobile = false, clickHandler = () => {}, css = '' }) {
	return (
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
	);
}

export default SurfaceTab;
