import Layout from '@cogo/business-modules/form/Layout';
import { Flex, Text } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';

// import { LayoutContainer } from './styles';

import styles from './styles.module.css';
import useDocuments from './useDocuments';

function Documents({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		controls = [],
		formState = {},
		createChannelPartnerVerificationDocumentLoading = false,
	} = useDocuments({
		channelPartnerDetails,
		kycDetails,
		setKycDetails,
	});

	return (
		<Flex direction="column">
			<Text size={14} color="#333333">
				We need these documents to check the legitamacy of your organization
			</Text>

			<LayoutContainer>
				<Layout controls={controls} fields={fields} errors={formState.errors} />
			</LayoutContainer>

			<Flex justifyContent="flex-end">
				<Button
					disabled={createChannelPartnerVerificationDocumentLoading}
					onClick={handleSubmit(onSubmit)}
				>
					SAVE AND CONTINUE
				</Button>
			</Flex>
		</Flex>
	);
}

export default Documents;
