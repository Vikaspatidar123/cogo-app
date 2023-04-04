import { IcMArrowBack, IcMArrowNext, IcMOverflowDot } from '@cogoport/icons-react';

import { WarnIcon } from '../../../../configuration/icon-configuration';

import styles from './styles.module.css';

function DetailsList({ containersList, shipmentInfo, activeCarouselIndex, setActiveCarouselIndex }) {
	const handlePrevious = () => {
		if (activeCarouselIndex > 0) {
			setActiveCarouselIndex(
				(previousActiveCarouselIndex) => previousActiveCarouselIndex - 1,
			);
		}
	};
	const handleNext = () => {
		if (activeCarouselIndex < containersList?.length - 1) {
			setActiveCarouselIndex(
				(previousActiveCarouselIndex) => previousActiveCarouselIndex + 1,
			);
		}
	};

	const commodity = shipmentInfo?.commodity;
	const itemData = containersList?.[activeCarouselIndex] || {};
	return (
		<div className={styles.container}>
			<div className={styles.header_title}>
				<div>
					Container Details
					{containersList?.length > 1 && `(${containersList.length})` }

					<div className={styles.line} />
				</div>
				{containersList?.length > 1 && (
					<div className={styles.arrow_div}>
						<IcMArrowBack className={styles.icon} onClick={handlePrevious} />
						<IcMArrowNext className={styles.icon} onClick={handleNext} />
					</div>
				)}
			</div>
			<div className={styles.title_div}>
				<div className={styles.title}>
					{itemData?.container_length ? `${itemData?.container_length}ft` : ''}
				</div>
				<div className={styles.title}>
					{itemData?.container_description ?? ''}
				</div>

			</div>
			<div className={styles.list_container}>
				<div className={styles.element1}>
					<div className={styles.sub_element}>
						Container no
						<div className={styles.colon}><IcMOverflowDot /></div>
					</div>
					<div className={styles.sub_element2}>{itemData?.container_no}</div>
				</div>
				<div className={styles.element1}>
					<div className={styles.sub_element}>
						{commodity ? 'Commodity' : 'Commodity Unknown'}
						<div className={styles.colon}>
							<IcMOverflowDot />
						</div>
					</div>

					<div className={styles.sub_element}>
						{commodity || (
							<img
								src={WarnIcon}
								alt=""
								width="15px"
								height="15px"
							/>
						)}

					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailsList;
