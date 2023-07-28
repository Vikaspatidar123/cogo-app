import { Button, Popover } from '@cogoport/components';

import Info from './AddressInfo';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const btnStyle = {
	width        : '20px',
	height       : '20px',
	borderRadius : '20px',
	marginLeft   : '10px',
	fontSize     : '15px',
};
const labelStyle = {
	width      : '354px',
	marginTop  : '6px',
	fontSize   : '12px',
	fontWeight : 'normal',
};

function InfoPopover({ isOpen, addressLabel, setIsOpen, handleClick }) {
	const label = `Your Company’s ${addressLabel}`;

	return (
		<div style={{ display: 'flex' }}>
			{label}
			<div>
				<Popover
					show={isOpen}
					placement="bottom-start"
					content={() => <Info />}
					onOuterClick={() => setIsOpen(false)}
				>
					<Button
						type="button"
						themeType="tertiary"
						onClick={handleClick}
						style={btnStyle}
					>
						i
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export const controls = (countryCode, isOpen, setIsOpen, rest) => {
	const ADDRESS_LABEL = getCountrySpecificData({
		country_code : countryCode,
		accessorType : 'address',
		accessor     : 'label',
	});
	const IDENTIFICAITON_LABEL = getCountrySpecificData({
		country_code : countryCode,
		accessorType : 'identification_number',
		accessor     : 'label',
	});

	const handleClick = () => {
		setIsOpen(true);
	};
	const mobileLabel = () => (
		<div>
			<div>
				Enter Your Mobile Number
			</div>
			<div style={labelStyle}>
				We will send you a One Time Password on this number
			</div>
		</div>
	);

	const mobileSection = rest.showMobile ? [{
		name        : 'mobile',
		showLabel   : false,
		type        : 'mobile_number',
		codeKey     : 'mobile_country_code',
		numberKey   : 'mobile_number',
		span        : 8,
		select2     : 'new big',
		caret       : true,
		value       : rest?.mobile,
		label       : mobileLabel(),
		validations : [
			{
				type      : 'required',
				message   : 'mobile number is required',
				inputType : 'group',
			},
		],
	}] : [];
	return (
		[
			{
				name        : 'registration_number',
				label       : `Your Company’s ${IDENTIFICAITON_LABEL}`,
				type        : 'text',
				span        : 6,
				value       : rest?.registration_number,
				validations : [{
					type    : 'required',
					message : `${IDENTIFICAITON_LABEL} is Required`,
				}],
			},
			{
				name  : 'utility_bill_document_url',
				label : <InfoPopover
					isOpen={isOpen}
					addressLabel={ADDRESS_LABEL}
					setIsOpen={setIsOpen}
					handleClick={handleClick}
				/>,
				type            : 'file',
				span            : 12,
				drag            : true,
				uploadType      : 'aws',
				multiple        : false,
				uploadIcon      : 'ic-upload',
				themeType       : 'black',
				onlyURLOnChange : true,
				value           : rest?.utility_bill_document_url,
				validations     : [{
					type    : 'required',
					message : `${ADDRESS_LABEL} is Required`,
				}],

			},
			...mobileSection,
		]
	);
};
