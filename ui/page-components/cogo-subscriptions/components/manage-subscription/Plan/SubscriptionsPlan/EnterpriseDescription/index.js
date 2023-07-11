import { cl, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EnterpriseDescription({
	requestCallback = () => { },
	callbackLoading,
	setActiveHover,
	activeIndex,
}) {
	return (
		<div
			className={styles.flex_column}
			onMouseEnter={() => {
				setActiveHover();
			}}
			onMouseLeave={() => {
				setActiveHover(activeIndex);
			}}
		>
			<div className={styles.container}>
				<div className={styles.label}>Enterprise</div>
				<div className={styles.sub_heading}>
					<IcMTick width={20} height={20} />
					Tailor a plan to your needs
				</div>
				<div className={`${styles.wrapper} ${styles.subscribe}`}>
					<Button
						role="presentation"
						onClick={requestCallback}
						disabled={callbackLoading}
						className={cl`${styles.request_button} ${styles.button} 
						${callbackLoading ? styles.disabled : ''}`}
					>
						{callbackLoading ? (
							<Image
								src={GLOBAL_CONSTANTS.image_url.loading_image}
								alt="loading..."
								width={25}
								height={20}
							/>
						) : (
							'Request Callback'
						)}

					</Button>
				</div>
			</div>
		</div>
	);
}

export default EnterpriseDescription;
