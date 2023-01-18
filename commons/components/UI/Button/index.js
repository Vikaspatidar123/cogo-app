import { Button as CoreButton } from '@cogoport/front/components/admin';

const STYLE_MAPPING = {
	primary: {
		background: '#2c3e50',
		color: '#ffffff',
		textTransform: 'capitalize',
	},
	secondary: {
		color: '#2c3e50',
		border: '1px solid #2c3e50',
		textTransform: 'capitalize',
	},
	text: {
		color: '#356EFD',
		background: 'none',
		textTransform: 'capitalize',
	},
	disabled: {
		primary: {
			background: '#bdbdbd',
			color: '#2c3e50',
		},
		secondary: {
			color: '#2c3e50',
			borderColor: '#2c3e50',
		},
		text: {
			color: '#bdbdbd',
			background: 'none',
		},
	},
};

function Button({ className = '', children, style, ...restProps }) {
	const { disabled = false } = restProps;

	let buttonType = 'primary';
	if (className.includes('secondary')) {
		buttonType = 'secondary';
	}
	if (className.includes('text')) {
		buttonType = 'text';
	}

	const newStyle = {
		...(style || {}),
		...(STYLE_MAPPING[buttonType] || {}),
		...(disabled && {
			cursor: 'not-allowed',
			...(STYLE_MAPPING.disabled[buttonType] || {}),
		}),
	};

	return (
		<CoreButton className={className} {...restProps} style={newStyle}>
			{children}
		</CoreButton>
	);
}

export default Button;
