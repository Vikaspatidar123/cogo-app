import { Button, Modal, Tooltip } from '@cogoport/components';
import React, {
	useState,
	useImperativeHandle,
	forwardRef,
	useEffect,
} from 'react';

import getFormattedTouchPointDataprefill from '../../utils/getFormattedTouchPointDataprefill';

import AddTouchPointModal from './AddTouchPointModal';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function TouchPoint(
	{
		validate,
		searchData = {},
		typeOfJourney = '',
		touchPointsToggle = [],
		setTouchPointsToggle = () => {},
		location = {},
	},
	ref,
) {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { forwardJourneyTouchPoints } = getFormattedTouchPointDataprefill(searchData);

	const [show, setShow] = useState(false);
	const [touchPointItems, setTouchPointItems] = useState(() => {
		if (touchPointsToggle.length === 0) {
			return forwardJourneyTouchPoints;
		}
		return touchPointsToggle;
	});

	useEffect(() => {
		setTouchPointsToggle(touchPointItems);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [touchPointItems]);

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};
	const content = () => (
		<>
			{touchPointItems.map((touchPoint, idx) => (
				<div className={styles.touch_point_container}>
					<div className={styles.circle} />
					{idx < touchPointItems.length - 1 && <div className={styles.line} />}

					<div>
						Touch Point
						{idx + 1}
					</div>
					<div className={styles.name}>
						{touchPoint.name?.split(' ', 1)}
						,
						{' '}
						{touchPoint.display_name?.split('-', 1)}
					</div>
				</div>
			))}
		</>
	);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => ({
			hasError : !(touchPointItems.length > 0),
			values   : {
				touchPoints: touchPointItems,
			},
		}),
	}));

	return (
		<div className={styles.container}>
			<Button
				size="sm"
				themeType="secondary"
				onClick={() => {
					onClick();
				}}
				style={{ textTransform: 'none' }}
				disabled={typeOfJourney === 'round'}
			>
				+ Touch Point
			</Button>

			{touchPointItems.length > 0 && (
				<div className={styles.wrapper}>
					<Tooltip
						placement="bottom"
						content={(
							<div style={{ fontSize: '10px', width: '150px' }}>
								{touchPointItems[0].name?.split(',', 1)
								|| touchPointItems[0].display_name?.split('-', 1)}
							</div>
						)}
					>
						<div className={styles.touch_point_name}>
							{touchPointItems[0].name?.split(',', 1) || touchPointItems[0].display_name?.split('-', 1)}
						</div>
					</Tooltip>

					{touchPointItems.length > 1 ? (
						<Tooltip
							placement="bottom"
							content={(
								<div style={{ fontSize: '10px', width: '150px' }}>
									{content()}
								</div>
							)}
						>
							<div className={`${styles[typeOfJourney]}${styles.more_btn}`}>
								{' '}
								+
								{touchPointItems.length - 1}
								{' '}
								more
							</div>
						</Tooltip>
					) : null}
				</div>
			)}

			<Modal
				show={show}
				onClose={() => setShow(false)}
				styles={{ dialog: { width: isMobile ? 350 : 550 } }}
			>
				<AddTouchPointModal
					validate={validate}
					onClick={onOuterClick}
					setTouchPointItems={setTouchPointItems}
					touchPointItems={touchPointItems}
					searchData={searchData}
					typeOfJourney={typeOfJourney}
					location={location}
				/>
			</Modal>
		</div>
	);
}

export default forwardRef(TouchPoint);
