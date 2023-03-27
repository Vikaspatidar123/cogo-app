import { Tooltip } from '@cogoport/components';
import { IcCFcrossInCircle, IcMArrowRotateDown, IcMArrowRotateUp, IcMInfo } from '@cogoport/icons-react';

import useKycDetails from './hooks/useKycDetails';
import styles from './styles.module.css';
import TAG_COMPONENT_MAPPING from './utils/component-mapping';

function KycDetails({
	source,
	setShow,
	onClose,
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const { verification_progress } = kycDetails;

	const {
		COMPONENTS_MAPPING,
		showComponents,
		componentProps,
		showHiddenComponentContents,
		setShowHiddenComponentContents,
		componentsRef,
	} = useKycDetails({
		kycDetails,
		setKycDetails,
		channelPartnerDetails,
		setShow,
		source,
		onClose,
	});

	const renderRejectedKycStatusHeader = () => {
		if (kycDetails.kyc_status !== 'rejected') {
			return null;
		}

		return (

			<div className={styles.rejected_label}>
				<div className={styles.header}>
					<IcCFcrossInCircle style={{ width: 20, height: 20, marginRight: 8 }} />

					<div className={styles.rejected_text}>Your KYC has been Rejected!</div>

					<div className={styles.rejected_sub_text}>

						Kindly resubmit the details to proceed further.
					</div>
				</div>

				<div className={styles.rejection_reason}>

					{`Reason : ${kycDetails.kyc_rejection_reason}`}
				</div>
			</div>
		);
	};

	return (
		<>
			{renderRejectedKycStatusHeader()}

			<div className={styles.list_container}>
				{Object.entries(COMPONENTS_MAPPING).map(([key, value]) => {
					const { title, tooltip, component: Component } = value;

					if (!showComponents[key] || !Component) {
						return null;
					}

					const showHiddenComponentContent = showHiddenComponentContents[key];

					const status = TAG_COMPONENT_MAPPING[(verification_progress || {})[key]] || null;

					return (
						<div
							className={styles.item_container}
							key={key}
							ref={(element) => {
								componentsRef.current[key] = element;
							}}
						>
							<div className={styles.item_stroke} />
							<div
								className={styles.item_header}
								role="presentation"
								onClick={() => setShowHiddenComponentContents((previousState) => ({
									...previousState,
									[key]: !previousState[key],
								}))}
							>
								<div className={styles.flex}>
									<div className={styles.text}>
										{title}
									</div>

									<Tooltip
										content={<div style={{ fontSize: '12px' }}>{tooltip}</div>}
										animation="scale"
										placement="top"
									>
										<div>
											<IcMInfo style={{ marginLeft: 8, marginBottom: -2 }} />
										</div>
									</Tooltip>
								</div>

								<div className={styles.flex}>
									{status}

									{showHiddenComponentContent ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
								</div>
							</div>

							{showHiddenComponentContent && (
							// <FadeIn type="enter">
								<div>
									<Component
										key={`${key}__${showHiddenComponentContent}`}
										{...(componentProps[key] || {})}
									/>
								</div>
							// </FadeIn>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}

export default KycDetails;
