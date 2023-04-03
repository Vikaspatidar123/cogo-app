import { Tooltip } from '@cogoport/components';
import { IcMArrowBack, IcMArrowNext, IcMOverflowDot } from '@cogoport/icons-react';

import { WarnIcon } from '../../../../configuration/icon-configuration';

import styles from './styles.module.css';

function DetailsList({ containersList, activeCarouselIndex, setActiveCarouselIndex, commodityDetails }) {
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

	const itemData = containersList?.[activeCarouselIndex] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_title}>
				<div>
					Cargo Details
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
					<div className={styles.sub_element}>weight</div>
					<div>
						<IcMOverflowDot />
					</div>
					<div className={styles.sub_element}>{commodityDetails?.weight}</div>
				</div>
				<div className={styles.element1}>
					<div className={styles.sub_element}>Piece</div>
					<div>
						<IcMOverflowDot />
					</div>
					<div className={styles.sub_element}>{commodityDetails?.piece}</div>
				</div>
				<div className={styles.element1}>
					<div className={styles.sub_element}>
						{commodityDetails?.commodity ? 'Commodity' : 'Commodity Unknown'}
					</div>
					<div>
						<IcMOverflowDot />
					</div>
					<div className={styles.sub_element}>
						<div>
							{commodityDetails?.commodity

								? (
									<>
										{' '}
										{commodityDetails?.commodity?.length > 16 ? (
											<Tooltip
												theme="light"
												placement="top"
												content={commodityDetails?.commodity}
											>
												<div>{`${commodityDetails?.commodity.substring(0, 16)}..`}</div>
											</Tooltip>
										) : (
											<div>{commodityDetails?.commodity}</div>
										)}
									</>
								)
								: (
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
		</div>
	);
}

export default DetailsList;
