import { Button } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import FooterImage from './FooterImage';
import useUnsubscribe from './hooks/useUnsubscribe';
import ReasonToUnsubscribe from './ReasonToUnsubscribe';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PUBLIC_PAGE_URL = 'https://www.cogoport.com';
const onClickRedirect = () => {
	window.location.href = PUBLIC_PAGE_URL;
};

const image_urls = [...Array(3).keys()];

const DEFAULT_TIMER = 0;

function Unsubscribe() {
	const { t } = useTranslation(['cancellationTicket']);
	const [unsubscribe, setUnsubscribe] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [timer, setTimer] = useState(DEFAULT_TIMER);
	const [ticket, setTicket] = useState('');

	const { onSubmit, loading, copyToClipBoard } = useUnsubscribe({
		setSubmit,
		setTimer,
		timer,
		setTicket,
		ticket,
	});

	useEffect(() => {
		if (timer === DEFAULT_TIMER && submit) {
			onClickRedirect();
		}
	}, [timer, submit]);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.content}>
					{!unsubscribe && !submit && (
						<div>
							<h1>{t('cancellationTicket:unsubscribe_text')}</h1>
							<div>
								{t('cancellationTicket:unsubscribe_description1_text')}
							</div>
							<div>
								{t('cancellationTicket:unsubscribe_description2_text')}
							</div>
							<div className={styles.footer}>
								<Button
									themeType="secondary"
									onClick={() => onClickRedirect()}
									type="button"
								>
									{t('cancellationTicket:cancel_button_text')}
								</Button>
								<Button
									className={styles.unsubscribe}
									themeType="primary"
									onClick={() => setUnsubscribe((prev) => !prev)}
									type="button"
								>
									{t('cancellationTicket:unsubscribe_button_text')}
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
								<h1>
									{t('cancellationTicket:see_message')}
								</h1>
								<p>
									{t('cancellationTicket:tricket_number_text')}
									&nbsp;
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
									{t('cancellationTicket:tricket_message')}
									{' '}
									<a href={GLOBAL_CONSTANTS.customer_support}>
										{GLOBAL_CONSTANTS.customer_support}
									</a>
								</p>
								<div>
									{t('cancellationTicket:redirecting_text')}
									&nbsp;
									{timer}
									{t('cancellationTicket:sub_text')}
								</div>
							</div>
						</div>
					)}
				</div>

				{(unsubscribe || submit) && (
					<div className={submit ? styles.remove_images : styles.plane_images}>
						{image_urls.map((index) => (
							<div className={styles[`plane_movement${index + 1}`]}>
								<Image
									alt=""
									src={GLOBAL_CONSTANTS.image_url.unsubscription_plane}
									width={70}
									height={70}
								/>
							</div>
						))}
					</div>
				)}

			</div>
			<FooterImage unsubscribe={unsubscribe} />
		</div>
	);
}
export default Unsubscribe;
