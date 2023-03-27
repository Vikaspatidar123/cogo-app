import React from 'react';
import { Btn } from '@cogo/deprecated_legacy/ui';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';
import { IcCFtick } from '@cogoport/icons-react';
import {
	Container,
	SettingIcon,
	PlanType,
	Benefit,
	Row,
	Desktop,
	Mobile,
	SpaceBetween,
	Main,
} from './styles';

const EnquiryPlan = ({ enquiryQuota }) => {
	const { push } = useRouter();
	const { unPrefixedPath } = useSelector(({ general }) => ({ ...general }));
	const afterPaymentUrl = unPrefixedPath;

	const benefits = (
		<>
			<Row style={{ marginBottom: '8px' }}>
				<IcCFtick style={{ marginRight: 8 }} />
				<Benefit>The best rates to give you a competitive edge</Benefit>
			</Row>

			<Row>
				<IcCFtick style={{ marginRight: 8 }} />
				<Benefit>The quickest service in the business</Benefit>
			</Row>
		</>
	);

	const handleEnquiriesCount = () => {
		if (!enquiryQuota?.left_limit) {
			return null;
		}
		if (enquiryQuota?.left_limit === 0) {
			return 'no enquiries left!';
		}
		return `only ${enquiryQuota?.left_limit} enquiries left!`;
	};

	const freeLeft = (
		<Benefit className="trialLeft">{handleEnquiriesCount()}</Benefit>
	);

	return (
		<Container>
			<SpaceBetween>
				<div style={{ display: 'flex' }}>
					<SettingIcon>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-settings.svg"
							alt="settings"
							width={24}
							height={24}
						/>
					</SettingIcon>

					<Main>
						<PlanType style={{ marginBottom: 8 }}>Basic Plan</PlanType>
						<Row>
							<PlanType className="subType">Paid</PlanType>
							<Mobile className="mobile">{freeLeft}</Mobile>
						</Row>
					</Main>
				</div>

				<Desktop>{benefits}</Desktop>

				<div>
					<Desktop>{freeLeft}</Desktop>
					<Btn
						className="mid uppercase"
						onClick={() =>
							push(
								`/pricing/[service_type]?afterPaymentUrl=${afterPaymentUrl}`,
								`/pricing/spot-negotiation?afterPaymentUrl=${afterPaymentUrl}`,
							)
						}
					>
						Explore plan
					</Btn>
				</div>
			</SpaceBetween>

			<Mobile>{benefits}</Mobile>
		</Container>
	);
};
export default EnquiryPlan;
