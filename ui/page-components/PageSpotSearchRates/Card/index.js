/* eslint-disable max-len */
import { Button, cl } from '@cogoport/components';
import {
	IcAOceanFcl,
	IcABook,
	IcAInternational,
	IcMLock,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { kebabCase } from '@cogoport/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import BreakUp from '../BreakUp';
import PopupModal from '../PopupModal';

import styles from './styles.module.css';

import Image from '@/ui/components/Image';
import { useTranslation } from '@/ui/components/LocaleTranslationContext';
import { useGetUserLocationContent } from '@/ui/components/UserLocationContentContext';
import getFormattedCurrency from '@/ui/helpers/getFormattedCurrency';
import useFetchCountries from '@/ui/hooks/useFetchCountries';

function getLinkOrigin(origin_loc, port_code) {
	return kebabCase(`${origin_loc}${port_code}`);
}
function Card({
	searchIds,
	title,
	img_url,
	from_loc,
	to_loc,
	shipping_time,
	rate_details,
	rate_options,
	isCogoAssured = false,
	origin_main_port,
	destination_main_port,
	type,
	isBlur,
	routes,
	data,
	origin_name,
	destination_name,
	logo_url,
	validity_start,
	validity_end,
}) {
	const { t } = useTranslation(['spot_search']);
	const { countriesOptions } = useFetchCountries();
	const [show, setShow] = useState(false);
	const [display, setDisplay] = useState(false);

	const router = useRouter();

	const { locale } = router;

	const linkdataorigin = getLinkOrigin(from_loc, router.query.origin);

	const linkdatadestination = getLinkOrigin(to_loc, router.query.destination);

	const {
		spotSearch_cogoassured_cardLabel,
	} = useGetUserLocationContent();

	const Icon = type === 'air_freight' ? IcAInternational : IcAOceanFcl;
	const onClose = () => {
		setShow(false);
	};

	return (
		<div className={styles.card_container}>
			<div className={styles.card_top}>
				<div className={styles.card_left}>
					{isCogoAssured ? (
						<div>

							<div className={styles.cogoassured}>
								<Image
									src={spotSearch_cogoassured_cardLabel}
									alt={t('cogo_assured')}
									width="200"
									height="100"
									className={styles.cogoassured_icon}
								/>
							</div>

						</div>

					) : (
						<div className={styles.card_header_brand}>
							<Link href={logo_url}>
								<div className={styles.image_container}>
									<img src={img_url} alt={title} />
								</div>
							</Link>
						</div>
					)}
					<div
						className={styles.card_body}
						style={
							((origin_main_port || destination_main_port) && !isBlur) ? { paddingTop: 0 } : {}
						}
					>
						{
							((origin_main_port || destination_main_port) && !isBlur) ? (
								<Icon className={styles.haulage_ocean_icon} />
							) : null
						}
						<div
							className={cl`
								${styles.card_body_content}
								${((origin_main_port || destination_main_port) && !isBlur) ? styles.card_haulage : ''}
							`}
						>
							<div className={styles.card_text}>
								<Link href={`/knowledge-center/resources/port-info/${linkdataorigin}`} locale={locale}>
									{from_loc}
								</Link>
							</div>
							<Icon
								className={styles.ocean_icon}
								style={
									((origin_main_port || destination_main_port) && !isBlur) ? { display: 'none' } : {}
								}
							/>
							<div className={styles.card_text}>
								<Link href={`/knowledge-center/resources/port-info/${linkdatadestination}`} locale={locale}>
									{to_loc}
								</Link>
							</div>
						</div>
						<div
							className={styles.loc_marker_div}
							style={(origin_main_port || destination_main_port) ? { marginTop: '20px' } : {}}
						>
							<div>
								<div className={styles.red_circle} />
							</div>
							<div className={styles.horizontal_line}>
								{
									((origin_main_port || destination_main_port) && !isBlur) ? (
										<div className={styles.multiple}>
											<div className={styles.text_card}>
												{
													origin_main_port ? (
														<div className={styles.port_name}>{origin_main_port}</div>
													) : null
												}
												{
													destination_main_port ? (
														<div className={styles.port_name}>{destination_main_port}</div>
													) : null
												}
											</div>
											<div className={styles.vertical_line}>
												{
													origin_main_port ? (
														<div className={styles.haulage_red_circle} />
													) : null
												}
												{
													destination_main_port ? (
														<div className={styles.haulage_red_circle} />
													) : null
												}
											</div>
										</div>
									) : null
								}
							</div>
							<div>
								<div className={styles.red_circle} />
							</div>
						</div>
						{
							(isBlur || shipping_time === 'None') ? null : (
								<div className={styles.shipping_time_box}>
									<IcABook className={styles.book_icon} />
									{shipping_time}
									{' '}
									{shipping_time === 1 ? 'Day' : 'Days'}
								</div>
							)
						}
					</div>

				</div>

				{show && (
					<PopupModal
						searchIds={searchIds}
						show={show}
						onClose={onClose}
						origin={from_loc}
						destination={to_loc}
						origin_name={origin_name}
						destination_name={destination_name}
						data={data}
						countriesOptions={countriesOptions}
					/>
				)}
				{/* <div>
					<span className={styles.usd_text}>
						{rate_details.total_price_currency}
						&nbsp;
					</span>
					<span className={styles.rate_text}>
						{Math.ceil(rate_details.total_price)}
					</span>
				</div> */}
				<div
					className={styles.card_right}
				>
					{isBlur ? null : (
						<div className={styles.slash_pricing}>
							<div className={styles.slashed_price}>
								<span className={styles.usd_text}>
									{rate_details.total_price_currency}
							&nbsp;
								</span>
								<span className={styles.rate_text}>
									{getFormattedCurrency({ amount: Math.ceil(rate_details.total_price * 1.15), formatType: 'decimal' })}
								</span>
							</div>
							<div>
								<span className={styles.usd_text}>
									{rate_details.total_price_currency}
							&nbsp;
								</span>
								<span className={styles.rate_text}>
									{getFormattedCurrency({ amount: Math.ceil(rate_details.total_price), formatType: 'decimal' })}
								</span>
							</div>
						</div>
					)}
					<Button
						className={cl`
							${styles.gtm_track_buy_btn}
							${cl.ns('gtm_book_button')}
						`}
						size="xl"
						themeType="primary"
						onClick={() => setShow(true)}
					>
						{
							isBlur ? (
								<IcMLock
									className={cl`
										${styles.gtm_track_lock_icon}
										${cl.ns('gtm_lock')}
									`}
								/>
							) : (

								<div
									className={cl`
										${styles.gtm_track_book_now}
										${cl.ns('gtm_book_now')}
									`}
								>
									{t('book_now')}

								</div>
							)
						}
					</Button>
					{isBlur ? null : (
						<div
							className={styles.view}
							onClick={() => { setDisplay(!display); }}
							role="presentation"
						>
							<div style={{ paddingRight: '10px' }}>
								<strong>
									{t('view_details')}
								</strong>
							</div>
							<div
								className={styles.buttonicon1}
								style={display ? { transform: 'rotate(-180deg)' } : {}}
							>
								<IcMArrowRotateDown />
							</div>
						</div>
					)}

				</div>

			</div>

			{(!isBlur && display) ? (
				<div className={styles.cost}>
					<BreakUp
						display={display}
						setDisplay={setDisplay}
						data={rate_options}
						routes={routes}
						data_detail={data?.detail}
						validity_start={validity_start}
						validity_end={validity_end}
					/>
				</div>
			) : null}

		</div>
	);
}

export default Card;
