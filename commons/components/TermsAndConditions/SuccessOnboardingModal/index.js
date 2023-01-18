import { Flex, Text } from '@cogoport/front/components';
import { Button, Modal } from '@cogoport/front/components/admin';
import { useSelector } from '@cogoport/front/store';
import AnimatedTick from '../../AnimatedTick';

function SuccessOnboardingModal({ show, onClickOkayButton }) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	if (!show) {
		return null;
	}

	return (
		<Modal
			show
			onOuterClick={() => {}}
			onClose={() => {}}
			position={isMobile ? 'bottom' : ''}
			fullscreen={isMobile}
			className="primary md"
			closable={false}
		>
			<Flex direction="column" alignItems="center" padding="16px 32px">
				<AnimatedTick radius={32} />

				<Text
					color="#333333"
					size={24}
					bold={500}
					margin="12px 0 24px 0"
					align="center"
				>
					You have accepted the terms and conditions for pre credit approval
					successfully!
				</Text>

				<Text
					color="#9EC4D6"
					size={16}
					bold={400}
					marginBottom={24}
					align="center"
				>
					You can now proceed with your bookings.
				</Text>

				<Flex justifyContent="center" alignItems="center">
					<Button
						type="button"
						className="primary lg"
						onClick={onClickOkayButton}
					>
						Okay
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
}

export default SuccessOnboardingModal;
