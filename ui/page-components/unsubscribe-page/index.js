import { Button } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import FooterImage from './FooterImage';
import useUnsubscribe from './hooks/useUnsubscribe';
import ReasonToUnsubscribe from './ReasonToUnsubscribe';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PUBLIC_PAGE_URL = 'https://www.cogoport.com';

function Unsubscribe() {
	const [unsubscribe, setUnsubscribe] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [timer, setTimer] = useState(0);
	const [ticket, setTicket] = useState('');

	const onClickRedirect = () => {
		window.location.href = PUBLIC_PAGE_URL;
	};

	const { onSubmit, loading, copyToClipBoard } = useUnsubscribe({
		setSubmit,
		setTimer,
		timer,
		setTicket,
		ticket,
	});

	useEffect(() => {
		if (timer === 0 && submit) {
			onClickRedirect();
		}
	}, [timer, submit]);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.content}>
					{!unsubscribe && !submit && (
						<div>
							<h1>Unsubscribe ?</h1>
							<div>
								We understand that you would like to unsubscribe from your
								subscription with Cogoport.
							</div>
							<div>
								We are sorry to hear that you no longer wish to continue your
								subscription with us.
							</div>
							<div className={styles.footer}>
								<Button
									themeType="secondary"
									onClick={() => onClickRedirect()}
									type="button"
								>
									Cancel
								</Button>
								<Button
									className={styles.unsubscribe}
									themeType="primary"
									onClick={() => setUnsubscribe((prev) => !prev)}
									type="button"
								>
									Unsubscribe
								</Button>
							</div>
						</div>
					)}
					{unsubscribe && !submit && (
						<ReasonToUnsubscribe
							onClickRedirect={onClickRedirect}
							onSubmit={onSubmit}
							loading={loading}
						/>
					)}
					{submit && (
						<div className={styles.final_page}>
							<div className={styles.success_page}>
								<h1>Its sad to see you go.....</h1>
								<p>
									Your ticket number is &nbsp;
									{' '}
									<b>
										#
										{ticket}
									</b>
									{' '}
                                        &nbsp;
									<IcMCopy
										onClick={copyToClipBoard}
										className={styles.copy_on_clipboard}
									/>
								</p>
								<p>
									Please note it down to contact us for further details. Reach
									out to us at
									{' '}
									<a href="support@cogoport.com">support@cogoport.com</a>
								</p>
								<div>
									Redirecting to cogoport.com in &nbsp;
									{timer}
									s....
								</div>
							</div>
						</div>
					)}
				</div>
				{(unsubscribe || submit) && (
					<div className={submit ? styles.remove_images : styles.plane_images}>
						<div className={styles.plane_movement1}>
							<Image
								alt=""
								src={GLOBAL_CONSTANTS.image_url.unsubscription_plane}
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.plane_movement2}>
							<Image
								alt=""
								src={GLOBAL_CONSTANTS.image_url.unsubscription_plane}
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.plane_movement3}>
							<Image
								alt=""
								src={GLOBAL_CONSTANTS.image_url.unsubscription_plane}
								width={70}
								height={70}
							/>
						</div>
					</div>
				)}
			</div>
			<FooterImage unsubscribe={unsubscribe} />
		</div>
	);
}
export default Unsubscribe;
