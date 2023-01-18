import { Flex, Text } from '@cogoport/front/components';

function Support() {
	return (
		<Flex direction="column">
			<Text as="div" size={12} color="#ffffff" bold={400}>
				Need any help?
			</Text>

			<Text
				size={12}
				color="#ffffff"
				bold={400}
				textDecoration="underline"
				style={{ cursor: 'pointer' }}
			>
				<a href="mailto:support@cogoport.com">support@cogoport.com</a>
			</Text>
		</Flex>
	);
}

export default Support;
