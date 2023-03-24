import Layout from '@cogo/business-modules/form/Layout';
import { Flex, Text } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';

// import { LayoutContainer } from './styles';
import styles from './styles.module.css';
import useCompanyDetails from './useCompanyDetails';

function CompanyDetails({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) {
	const {
		controls = [],
		fields = {},
		handleSubmit = () => {},
		onSubmit = () => {},
		loading = false,
		formState = {},
	} = useCompanyDetails({
		channelPartnerDetails,
		setKycDetails,
		kycDetails,
	});

	return (
		<Flex direction="column">
			<Text size={14} color="#333333">
				Kindly check the details before you proceed
			</Text>

			<LayoutContainer>
				<Layout controls={controls} fields={fields} errors={formState.errors} />
			</LayoutContainer>

			<Flex justifyContent="flex-end">
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					SAVE AND CONTINUE
				</Button>
			</Flex>
		</Flex>
	);
}

export default CompanyDetails;
