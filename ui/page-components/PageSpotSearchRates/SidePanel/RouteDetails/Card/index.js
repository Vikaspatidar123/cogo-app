import {
	// Tooltip,
	Button, cl,
} from '@cogoport/components';
import {
	// IcMArrowRight,
	IcMLock,
} from '@cogoport/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import PopupModal from '../../../PopupModal';

import styles from './styles.module.css';
import {
	getOptions,
	// toTitleCase
} from './utils';

// import getMainLocation from '@/ui/hooks/getMainLocation';
// import useFetchCountries from '@/ui/hooks/useFetchCountries';
// function LocationDetails({ location }) {
// 	const locationName = location?.display_name;
// 	const port_code = location?.port_code;
// 	const mainLocation = getMainLocation(locationName || '');
//
// 	return (
// 		<div className={styles.loc_box}>
// 			<p className={styles.port_code}>
// 				{port_code || mainLocation || ''}
// 			</p>
// 			<Tooltip
// 				content={<div className={styles.content}>{locationName}</div>}
// 			>
// 				<p className={styles.name}>
// 					{toTitleCase(locationName)}
// 				</p>
// 			</Tooltip>
// 		</div>
// 	);
// }

function Card({
	route,
	// details,
	location,
	containerSize,
	rate,
	line,
	isBlur,
	// handleDetailsView,
	isDummy = false,
	searchIds,
}) {
	// const { countriesOptions } = useFetchCountries();

	const [show, setShow] = useState(false);

	// const { origin = {}, destination = {} } = details || {};
	const { total_length, units = 'km', total_time } = route?.summary || {};

	const { total_price = '', total_price_currency = '', source = '' } = rate || {};
	const isCogoAssured = source === 'cogo_assured_rate';

	const onClose = () => {
		setShow(false);
	};

	const options = getOptions({
		priceLabel    : 'Price',
		distanceLabel : 'Distance',
		timeLabel     : 'Time',
		total_price,
		total_price_currency,
		total_length,
		total_time,
		units,
	});

	// const defaultCountryCode = countriesOptions?.find((item) => item?.mobile_country_code === location)?.value;

	return (
		<>
			<div
				className={`${styles.card} ${styles.slide_up}`}
			>
				{isCogoAssured ? <span className={styles.icon_badge}>{`${containerSize}FT`}</span> : null}
				<div className={styles.cogo_assured}>
					{isCogoAssured ? (
						<Image
							src={line.icon}
							alt="cogo_assured"
							width={200}
							height={100}
							className={styles.cogoassured_icon}
						/>
					) : null}

					{isDummy ? (
						<Link
							prefetch={false}
							href={line.link}
							target="_blank"
						>
							<Image
								src={line.icon}
								alt={line}
								width={200}
								height={100}
								className={styles.shipping_icon}
							/>
						</Link>
					) : null}
				</div>
				<div className={styles.inner_card}>
					{/* <div className={styles.location_container}> */}
					{/* 	<LocationDetails location={origin} /> */}
					{/* 	<div className={styles.divider}> */}
					{/* 		<div className={styles.line} /> */}
					{/* 		<IcMArrowRight /> */}
					{/* 	</div> */}
					{/* 	<LocationDetails location={destination} /> */}
					{/* </div> */}
					{/* { */}
					{/* 	!isBlur ? ( */}
					{/* 		<div className={styles.view_details}> */}
					{/* 			<span */}
					{/* 				role="presentation" */}
					{/* 				className={styles.view_details_btn} */}
					{/* 				onClick={handleDetailsView} */}
					{/* 			> */}
					{/* 				<span>{t('view_details')}</span> */}
					{/* 				<IcMArrowRight /> */}
					{/* 			</span> */}
					{/* 		</div> */}
					{/* 	) : null */}
					{/* } */}
					<div className={styles.row}>
						<div className={styles.inner_row}>
							{options.map(({
								label, value, unit,
							}) => (
								<div key={label}>
									<p className={styles.label}>
										{label}
									</p>
									<p className={cl`${styles.value} ${isBlur || value === 'USD NA'
										? styles.blur_value : ''}`}
									>
										{unit ? `${value} ${unit || ''}` : value}
									</p>
								</div>
							))}
						</div>
						<Button className={styles.book_now} onClick={() => setShow(true)}>
							{isBlur ? (
								<IcMLock />
							) : 'get_quotes'}
						</Button>
					</div>
				</div>
			</div>
			{show && (
				<PopupModal
					show={show}
					onClose={onClose}
					// countriesOptions={countriesOptions}
					// defaultValue={defaultCountryCode}
					searchIds={searchIds}
				/>
			)}
		</>
	);
}

export default Card;
