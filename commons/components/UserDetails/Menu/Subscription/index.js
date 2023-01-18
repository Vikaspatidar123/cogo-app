import { useState } from 'react';
import { Popover } from '@cogoport/front/components';
import { useRouter } from '@/temp/next';
import PremiumService from '../icons/premium-service.svg';
import { A, SubscriptionContainer, Flex } from '../styles';

function Subscription({ setShowPopover = () => {} }) {
	const [isOpen, setIsOpen] = useState(false);
	const { push } = useRouter();
	const handleClick = async (suffix) => {
		push(
			`/saas/cogo-subscriptions/${suffix}`,
			`/saas/cogo-subscriptions/${suffix}`,
			true,
		);
		setShowPopover(false);
		setIsOpen(false);
	};

	const content = () => {
		return (
			<Flex>
				{['Manage Subscriptions', 'Balance History'].map((title) => {
					return (
						<A
							as="button"
							className="sub-navlink"
							onClick={() =>
								handleClick(title.toLowerCase().split(' ').join('-'))
							}
						>
							{title}
						</A>
					);
				})}
			</Flex>
		);
	};
	return (
		<div>
			<Popover
				placement="bottom-start"
				animation="shift-away"
				content={content()}
				theme="light"
				visible={isOpen}
				onClickOutside={() => setIsOpen(false)}
				interactive
			>
				<SubscriptionContainer>
					<PremiumService style={{ marginRight: '0.75rem' }} />
					<A as="button" onClick={() => setIsOpen(!isOpen)}>
						Subscription
					</A>
				</SubscriptionContainer>
			</Popover>
		</div>
	);
}

export default Subscription;
