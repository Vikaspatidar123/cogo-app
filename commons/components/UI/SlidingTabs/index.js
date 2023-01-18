import { isEmpty } from '@cogoport/front/utils';
import { useEffect, useRef, useState } from 'react';
import {
	Container,
	ContentsContainer,
	Content,
	ContentIcon,
	ContentLabel,
	Slider,
} from './styles';

const calculateTransform = {
	translateX: ({
		options,
		activeTabContentOptionIndex,
		separatorMarginRight,
		tabContentsRef,
	}) => {
		let translateX = 0;

		options.forEach((option, index) => {
			if (index >= activeTabContentOptionIndex) {
				return;
			}

			translateX += tabContentsRef.current?.[option.value].clientWidth || 0;
			translateX += separatorMarginRight;
		});

		return translateX;
	},
};

const getSliderProps = ({
	options,
	activeTab,
	separatorMarginRight,
	tabContentsRef,
}) => {
	if (!activeTab || !tabContentsRef.current?.[activeTab]) {
		return {};
	}

	const activeTabContentDomElement = tabContentsRef.current[activeTab];

	const activeTabContentOptionIndex = options.findIndex((option) => {
		return option.value === activeTab;
	});
	const activeTabContentOption = options[activeTabContentOptionIndex];

	return {
		width: activeTabContentDomElement.clientWidth,
		height: activeTabContentDomElement.clientHeight,
		backgroundColor: activeTabContentOption.backgroundColor,
		translateX: calculateTransform.translateX({
			options,
			activeTabContentOptionIndex,
			separatorMarginRight,
			tabContentsRef,
		}),
	};
};

function SlidingTabs(props) {
	const {
		options: optionsProp, // [{ label, value, backgroundColor, color, icon }]
		activeTab,
		setActiveTab,
		separatorMarginRight = 0,
	} = props;

	const options = isEmpty(optionsProp) ? [] : optionsProp;

	const [isMounted, setIsMounted] = useState(false);
	const tabContentsRef = useRef({});

	useEffect(() => {
		if (isMounted) {
			return;
		}

		setActiveTab(activeTab || (options[0] || {}).value || '');
		setIsMounted(true);
	}, [isMounted]);

	return (
		<Container className="sliding-tabs">
			<ContentsContainer className="sliding-tabs__contents-container">
				{options.map((tabOption, index) => {
					const { label, value, color, icon } = tabOption;

					const isActive = activeTab === value;

					return (
						<Content
							key={value}
							ref={(element) => {
								tabContentsRef.current[value] = element;
							}}
							className={`sliding-tabs__content ${
								isActive ? 'sliding-tabs__content--active' : ''
							}`}
							marginRight={
								index === options.length - 1 ? 0 : separatorMarginRight
							}
							color={color}
							onClick={() => setActiveTab(value)}
						>
							{icon && (
								<ContentIcon className="sliding-tabs__content-icon">
									{icon}
								</ContentIcon>
							)}

							<ContentLabel className="sliding-tabs__content-label">
								{label}
							</ContentLabel>
						</Content>
					);
				})}

				<Slider
					className="sliding-tabs__slider"
					{...getSliderProps({
						options,
						activeTab,
						separatorMarginRight,
						tabContentsRef,
					})}
				/>
			</ContentsContainer>
		</Container>
	);
}

export default SlidingTabs;
