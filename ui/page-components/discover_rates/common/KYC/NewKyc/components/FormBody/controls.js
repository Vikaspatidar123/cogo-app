import { Btn, Popover } from '@cogo/deprecated_legacy/ui';
import Info from './AddressInfo';

export const controls = (countryCode, isOpen, setIsOpen, rest) => {
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
	const infoPopover = (country_code) => {
		const label = country_code === 'IN' ? 'Your Company’s Address Proof' : 'Your Company’s Registration Extract';
		const style = { display: 'flex' };

		return (
			<div style={style}>
				{label}
				<div>
					<Popover
						show={isOpen}
						withArrow={false}
						usePortal
						placement="bottom-start"
						renderBody={() => <Info />}
						onOuterClick={() => setIsOpen(false)}
					>
						<Btn
							onClick={handleClick}
							className="small"
							style={btnStyle}
						>i
						</Btn>
					</Popover>
				</div>
			</div>
		);
	};
	const mobileSection = rest.showMobile ? [{
		name        : 'mobile',
		showLabel   : false,
		type        : 'mobile-number-select',
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
				label       : countryCode === 'IN' ? 'Your Company’s PAN Number' : 'Your Company’s Registration Number',
				type        : 'text',
				span        : 6,
				value       : rest?.registration_number,
				validations : [{ type: 'required', message: countryCode === 'IN' ? 'Pan number is Required' : 'Registration Number is Required' }],
			},
			{
				name            : 'utility_bill_document_url',
				label           : infoPopover(countryCode),
				type            : 'file',
				span            : 12,
				drag            : true,
				uploadType      : 'aws',
				multiple        : false,
				uploadIcon      : 'ic-upload',
				themeType       : 'black',
				onlyURLOnChange : true,
				value           : rest?.utility_bill_document_url,
				validations     : [{ type: 'required', message: countryCode === 'IN' ? 'Address is Required' : 'Registration Extract is Required' }],

			},
			...mobileSection,
		]
	);
};
