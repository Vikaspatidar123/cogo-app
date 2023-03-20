import { useEffect } from 'react';

import { ContainerSizeMappings } from './container-size-mappings';

const useCalculation = ({
	globalValue,
	watchContainerSize,
	setCalculateDisabled,
	setErrorMessage,
	setNoOfContainers,
}) => {
	const Calculation = () => {
		const { length, width, height, quantitiy, weight } = globalValue;
		ContainerSizeMappings.forEach((item) => {
			if (item.label === watchContainerSize) {
				if (+length > item.length) {
					setErrorMessage((prev) => ({
						...prev,
						length: `Length should not be greater than ${item.length}`,
					}));
					setCalculateDisabled(true);
				}
				if (+width > item.width) {
					setErrorMessage((prev) => ({
						...prev,
						width: `Width should not be greater than ${item.width}`,
					}));
					setCalculateDisabled(true);
				}
				if (+height > item.height) {
					setErrorMessage((prev) => ({
						...prev,
						height: `Height should not be greater than ${item.height}`,
					}));
					setCalculateDisabled(true);
				}
				if (+weight > item.weight) {
					setErrorMessage((prev) => ({
						...prev,
						weight: `Weight should not be greater than ${item.weight}`,
					}));
					setCalculateDisabled(true);
				}
				if (
					+length <= item.length
					&& +width <= item.width
					&& +height <= item.height
					&& +weight <= item.weight
				) {
					setCalculateDisabled(false);
					const QCD =						Math.floor(item.length / +length)
						* Math.floor(item.width / +width)
						* Math.floor(item.height / +height);
					const QCW = Math.floor(item.weight / +weight);
					let containers = +quantitiy / Math.min(QCD, QCW);
					containers =						containers % Math.floor(containers) === 0
						? containers
						: Math.floor(containers) + 1;
					setNoOfContainers(containers);
				}
			}
		});
	};

	useEffect(() => {
		setErrorMessage({});
		Calculation();
	}, [JSON.stringify(globalValue)]);

	return { Calculation };
};

export default useCalculation;
