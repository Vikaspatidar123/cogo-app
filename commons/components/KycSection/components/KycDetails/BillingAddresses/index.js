import { Button } from '@cogoport/front/components/admin';
import {
	Container,
	Content,
	AddMoreButtonContainer,
	BookingContactAlign,
} from './styles';
import BillingAddressForm from './BillingAddressForm';
import BillingAddressItem from './BillingAddressItem';
import useBillingAddresses from './useBillingAddresses';

function BillingAddresses(props) {
	const {
		showBookingContactForm = false,
		setShowBookingContactForm = () => {},
		isGstApplicable,
		setIsGstApplicable,
		gstinOptions,
	} = useBillingAddresses(props);

	const { CONSTANTS, state } = props;

	const {
		COMPONENT_KEYS: { ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const { [ACCOUNT_INFORMATION]: accountInformation } = state || {};

	const { addressDetails } = accountInformation || {};
	const { formList } = addressDetails || {};

	return (
		<Container>
			<BookingContactAlign>
				<Content>
					{(formList || []).map((item, index) => (
						<BillingAddressItem
							index={index}
							data={item}
							isGstApplicable={isGstApplicable}
							marginBottom={index === formList.length - 1 ? 0 : 16}
						/>
					))}

					{showBookingContactForm ? (
						<BillingAddressForm
							{...props}
							type="create"
							showBookingContactForm={showBookingContactForm}
							setShowBookingContactForm={setShowBookingContactForm}
							isGstApplicable={isGstApplicable}
							setIsGstApplicable={setIsGstApplicable}
							gstinOptions={gstinOptions}
						/>
					) : (
						<AddMoreButtonContainer>
							<Button
								className="secondary md"
								onClick={() => setShowBookingContactForm(true)}
								style={{ width: '100%', fontSize: 12 }}
							>
								+ Another Address
							</Button>
						</AddMoreButtonContainer>
					)}
				</Content>
			</BookingContactAlign>
		</Container>
	);
}

export default BillingAddresses;
