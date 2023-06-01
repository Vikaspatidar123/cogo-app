import { PlaneGif } from '../../../common/constants';
import styles from '../styles.module.css';

function AirTab({ isMobile = false, clickHandler = () => {}, css = '' }) {
	return (
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
	);
}

export default AirTab;
