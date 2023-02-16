import { useState, useEffect } from 'react';

import { Label, Container, Input } from './style';

function LegendInput({
	key,
	type,
	label = '',
	value = '',
	onChange = () => {},
	onBlur,
	className = '',
	placeholder = '',
	labelClassName = '',
	register,
	rules,
	width,
	height,
	suffix: SuffixIcon,
	...rest
}) {
	const [val, setVal] = useState(value);
	useEffect(() => {
		setVal(value);
	}, [value]);
	return (
		<Container>
			<Label className={`${val && 'move'} ${labelClassName}`}>
				{label || placeholder}
			</Label>
			<div className={`inputBoxContainer ${className}`}>
				<Input
					{...rest}
					type={type}
					value={val}
					onChange={(e) => {
						setVal(e.target.value);
						onChange(e);
					}}
					className={`${SuffixIcon && 'icon'}`}
				/>

				{SuffixIcon && <SuffixIcon width={width} height={height} />}
			</div>
		</Container>
	);
}

export default LegendInput;
