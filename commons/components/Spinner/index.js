import { Text } from '@cogoport/front/components';
import { DIV, Container } from './styles';

function Spinner({
	size = 10,
	borderWidth = 2,
	outerBorderColor = '#e5e5e5',
	spinBorderColor = '#66acf7',
	style = {},
	loadingText = '',
}) {
	return (
		<Container>
			<DIV
				size={size}
				style={style}
				borderWidth={borderWidth}
				outerBorderColor={outerBorderColor}
				spinBorderColor={spinBorderColor}
			/>

			{loadingText && <Text marginTop={16}>{loadingText}</Text>}
		</Container>
	);
}

export default Spinner;
