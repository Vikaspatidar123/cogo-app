import { IcCFtick } from '@cogoport/icons-react';
import {
	Container,
	TextLabel,
	Text,
	InnerContainer,
	Footer,
	Tab,
	MainContiner,
	Refund,
} from './styles';

const BasicPlan = ({ enquiryQuota = {} }) => (
	<MainContiner>
		<Refund className="normal">
			No need to worry, place an enquiry with us and our team will get back to
			you soon
		</Refund>

		<Container>
			<InnerContainer>
				<Text>basic</Text>

				<TextLabel>{enquiryQuota?.left_limit} free enquries left!</TextLabel>

				{enquiryQuota?.left_limit ? <Tab>Active</Tab> : null}
			</InnerContainer>
			{/* <Text className="rate">$500/10 enquries</Text> */}

			<Footer>
				<InnerContainer className="label">
					<IcCFtick style={{ marginRight: 8 }} />
					<Text className="text">
						The best rates to give you a competitive edge
					</Text>
				</InnerContainer>

				<InnerContainer className="label">
					<IcCFtick style={{ marginRight: 8 }} />
					<Text className="text">The quickest service in the business</Text>
				</InnerContainer>
			</Footer>
		</Container>

		<Refund>
			Also, if you book with us after an enquiry, the price of that enquiry will
			be refunded.
		</Refund>
	</MainContiner>
);
export default BasicPlan;
