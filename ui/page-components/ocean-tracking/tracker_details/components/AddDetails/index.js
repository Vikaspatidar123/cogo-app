import { IcMArrowBack, IcMArrowNext, IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import { WarnIcon } from '../../../configuration/icon-configuration';

import AddCommodityDetail from './AddCommodityDetail';
import styles from './styles.module.css';

function AddDetails({
	containersList,
	shipmentInfo,
	setTrackerDetails,
	trackerDetails,
	selectedContainer,
	setSelectedContainer,
}) {
	// const [selectedContainer, setSelectedContainer] = useState(0);
	const handlePrevious = () => {
		if (selectedContainer > 0) setSelectedContainer(selectedContainer - 1);
	};
	const handleNext = () => {
		if (selectedContainer < containersList?.length - 1) { setSelectedContainer(selectedContainer + 1); }
	};

	const commodity = shipmentInfo?.commodity;
	const itemData = containersList?.[selectedContainer] || {};
	const [isModalOpen, setModal] = useState(false);
	const handleModal = () => {
		setModal((prev) => !prev);
	};
	console.log(isModalOpen, 'ismodal');
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header_title}>
					<div>
						Container Details
						{containersList.length > 1 && `(${containersList.length})` }

						<div className={styles.line} />
					</div>
					{containersList.length > 1 && (
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
						<div className={styles.sub_element}>Container no</div>
						<div>
							<IcMOverflowDot />
						</div>
						<div className={styles.sub_element}>{itemData?.container_no}</div>
					</div>
					<div className={styles.element1}>
						<div className={styles.sub_element}>{commodity ? 'Commodity' : 'Commodity Unknown'}</div>
						<div>
							<IcMOverflowDot />
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
							<div>
								{commodity ? (
									<div>
										<div role="presentation" className={styles.add} onClick={() => handleModal()}>
											Change
										</div>
									</div>

								) : (

									<div>
										<div role="presentation" className={styles.add} onClick={() => handleModal()}>
											Add
										</div>
									</div>

								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{isModalOpen && (
				<AddCommodityDetail
					isOpen={isModalOpen}
					handleModal={handleModal}
					setTrackerDetails={setTrackerDetails}
					trackerDetails={trackerDetails}
				/>
			)}
		</div>
	);
}

export default AddDetails;
