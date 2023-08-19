import { Modal } from '@cogoport/components';
import { IcMArrowNext, IcMCross } from '@cogoport/icons-react';
import Image from 'next/image';

import styles from './styles.module.css';

import { useGetUserLocationContent } from '@/ui/commons/components/UserLocationContentContext';

function ServiePopupModal({ show, onClose }) {
	const {
		spotSearch_popupModal_img1,
	} = useGetUserLocationContent();

	return (
		<div>
			<Modal size="xl" show={show} onClose={onClose} className={styles.modal}>
				<IcMCross onClick={onClose} height={24} width={24} className={styles.cross_btn} />
				<div className={styles.email}>
					<div className={styles.register_heading_container}>
						<p className={styles.register_heading}>
							<span>access</span>
						</p>
					</div>
					<div className={styles.main}>
						<div className={styles.right_container}>
							<p className={styles.sub_heading_2}>Sign Now</p>
							<a
								className={styles.link_to}
								target="_blank"
								href={'https://app.cogoport.com/'
									+ 'signup/?utm_source=public_page&utm_medium=rate_discovery'}
								rel="noreferrer nofollow"
							>
								<div className={styles.left_text}>
									<span>Shipper</span>
									<span>
										Shipper Description
									</span>
								</div>
								<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />
							</a>
							<a
								className={styles.link_to}
								target="_blank"
								href={'https://partners.cogoport.com/'
									+ 'signup/?utm_source=public_page&utm_medium=rate_discovery'}
								rel="noreferrer nofollow"
							>
								<div className={styles.left_text}>
									<span>Carrier</span>
									<span>
										Carrier Description
									</span>
								</div>
								<IcMArrowNext fill="#EE3425" className={styles.arrow_right_icon} />
							</a>
							<Image
								src={spotSearch_popupModal_img1}
								width={100}
								height={100}
								className={styles.right_container_image}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default ServiePopupModal;
