import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import ValueChip from './ValueChip';

import getField from '@/packages/forms/Controlled';

function Item({ name, fields, id, val }) {
	const controls = fields[name];

	const Element = getField(controls?.type);
	const {
		className = '',
		label,
		showLabel = true,
		showMargin = true,
		subLabel,
		...rest
	} = controls;

	const props = {};

	if (rest.type === 'select-2' && !rest.style) {
		props.style = {
			control: {
				fontSize   : '12px',
				lineHeight : '14px',
				color      : 'black',
				minHeight  : '30px',
			},
			indicatorsContainer : { height: '28px' },
			option              : {
				fontSize   : '12px',
				lineHeight : '17px',
				padding    : '5px 16px',
			},
		};
		props.defaultOptions = false;
	}

	if (rest.type.includes('select')) {
		props.defaultOptions = false;
	}

	const errorClass = controls.error || controls.message ? 'error' : null;

	const messageStyles = {
		fontStyle      : 'normal',
		fontWeight     : 'normal',
		fontSize       : '10px',
		lineHeight     : '140%',
		textAlign      : 'right',
		letterSpacing  : '0.02em',
		color          : '#CB6464',
		justifyContent : 'flex-end',
	};

	return (
		<div
			className={styles.col}
			style={errorClass ? { paddingLeft: 0, paddingRight: 0 } : null}
		>
			{errorClass && (
				<div
					style={{ poistion: 'relative', ...messageStyles }}
				>
					{controls.error || controls.message}
				</div>
			)}
			<div
				className={`${styles.container} ${styles?.[className]} ${errorClass || ''} ${
					(!showMargin && 'no-margin') || ''
				}`}
			>
				{label && showLabel && (
					<div className={styles.label}>
						{label}
						{subLabel && <span className="sub-label">{subLabel}</span>}
						{(controls.collapse && controls?.value && (
							<ValueChip
								style={{ maxWidth: '208px', marginLeft: 4 }}
								value={startCase(controls.value || '')}
								onCancel={() => controls.onChange('', null)}
							/>
						))
							|| null}
					</div>
				)}
				{((!controls?.collapse || !controls?.value) && (
					<Element
						width="100%"
						{...rest}
						{...props}
						className={className}
						key={val || id || name}
						id={id}
					/>
				))
					|| null}
			</div>
		</div>
	);
}

export default Item;
