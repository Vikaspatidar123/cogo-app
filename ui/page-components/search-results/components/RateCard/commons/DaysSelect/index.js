import { toast, Input } from '@cogoport/front/components/admin';
import { Container, MethodContainer, Vline, StyledText } from './styles';

const MAPPING = {
	subtract: 'Cannot remove existing days',
	add: 'Cannot add more days',
};

const DaysSelect = ({ days, minimumDays, maximumDays, setDays }) => {
	const onChangeDays = (type) => {
		const i = type === 'subtract' ? -1 : 1;

		const limit_type = type === 'subtract' ? minimumDays : maximumDays;

		if (Number(days) === limit_type) {
			toast.info(MAPPING[type]);
		} else {
			setDays((prev) => Number(prev) + i || '');
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;

		if (value > maximumDays) {
			toast.error(MAPPING.add);
		} else if (value < minimumDays) {
			toast.error(MAPPING.subtract);
		} else setDays(Number(value));
	};

	return (
		<div>
			<StyledText>Total days</StyledText>

			<Container>
				<MethodContainer onClick={() => onChangeDays('subtract')}>
					-
				</MethodContainer>

				<Vline />

				<Input type="number" value={days} onChange={(e) => handleChange(e)} />

				<Vline />

				<MethodContainer onClick={() => onChangeDays('add')}>+</MethodContainer>
			</Container>
		</div>
	);
};
export default DaysSelect;
