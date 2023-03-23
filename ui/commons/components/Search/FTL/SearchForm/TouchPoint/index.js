import { Button, Modal, ToolTip } from '@cogoport/front/components/admin';
import React, {
	useState,
	useImperativeHandle,
	forwardRef,
	useEffect,
} from 'react';
import { useSelector } from '@cogo/store';
import getFormattedTouchPointDataprefill from '../../utils/getFormattedTouchPointDataprefill';
import AddTouchPointModal from './AddTouchPointModal';
import {
	MoreBtn,
	TouchPointName,
	Name,
	TouchPointContainer,
	Container,
	Wrapper,
} from './styles';

const TouchPoint = (
	{
		validate,
		searchData = {},
		typeOfJourney = '',
		touchPointsToggle = [],
		setTouchPointsToggle = () => {},
		location = {},
	},
	ref,
) => {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { forwardJourneyTouchPoints } =
		getFormattedTouchPointDataprefill(searchData);

	const [show, setShow] = useState(false);
	const [touchPointItems, setTouchPointItems] = useState(() => {
		if (touchPointsToggle.length === 0) {
			return forwardJourneyTouchPoints;
		}
		return touchPointsToggle;
	});

	useEffect(() => {
		setTouchPointsToggle(touchPointItems);
	}, [touchPointItems]);

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};
	const content = () => {
		return (
			<>
				{touchPointItems.map((touchPoint, idx) => {
					return (
						<TouchPointContainer>
							<div className="circle" />
							{idx < touchPointItems.length - 1 && <div className="line" />}

							<div> Touch Point {idx + 1}</div>
							<Name>
								{touchPoint.name?.split(' ', 1)},{' '}
								{touchPoint.display_name?.split('-', 1)}
							</Name>
						</TouchPointContainer>
					);
				})}
			</>
		);
	};

	useImperativeHandle(ref, () => {
		return {
			handleSubmit: () => {
				return {
					hasError: !(touchPointItems.length > 0),
					values: {
						touchPoints: touchPointItems,
					},
				};
			},
		};
	});

	return (
		<Container>
			<Button
				className="secondary sm"
				onClick={() => {
					onClick();
				}}
				style={{ textTransform: 'none' }}
				disabled={typeOfJourney === 'round'}
			>
				+ Touch Point
			</Button>

			{touchPointItems.length > 0 && (
				<Wrapper>
					<ToolTip
						theme="light"
						placement="bottom"
						content={
							<div style={{ fontSize: '10px', width: '150px' }}>
								{touchPointItems[0].name?.split(',', 1) ||
									touchPointItems[0].display_name?.split('-', 1)}
							</div>
						}
					>
						<TouchPointName>
							{touchPointItems[0].name?.split(',', 1) ||
								touchPointItems[0].display_name?.split('-', 1)}
						</TouchPointName>
					</ToolTip>

					{touchPointItems.length > 1 ? (
						<ToolTip
							theme="light"
							placement="bottom"
							content={
								<div style={{ fontSize: '10px', width: '150px' }}>
									{content()}
								</div>
							}
						>
							<MoreBtn className={typeOfJourney}>
								{' '}
								+{touchPointItems.length - 1} more
							</MoreBtn>
						</ToolTip>
					) : null}
				</Wrapper>
			)}

			<Modal
				className="primary sm"
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
		</Container>
	);
};

export default forwardRef(TouchPoint);
