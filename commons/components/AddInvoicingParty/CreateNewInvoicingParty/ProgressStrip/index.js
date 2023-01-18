import SingleStrip from './SingleStrip';
import { Container, Line, Steps, Step } from './styles';

function ProgressStrip({ currentStep = '', progressSteps = [] }) {
	return (
		<Container>
			<Steps>
				{(progressSteps || []).map((item, index) => (
					<>
						<Step>
							<SingleStrip
								item={item}
								currentStep={currentStep}
								count={index + 1}
							/>
						</Step>
						{index < progressSteps.length - 1 ? <Line /> : null}
					</>
				))}
			</Steps>
		</Container>
	);
}

export default ProgressStrip;
