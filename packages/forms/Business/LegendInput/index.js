import { Input } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { Label, Container, Input } from './style';
import styles from './styles.module.css';

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
		<div className={styles.container}>
			{/* <div className={`${styles.input}${val && 'move'} ${labelClassName}`}>
				{label || placeholder}
			</div> */}
			{/* <div className={`inputBoxContainer ${className}`}> */}
			<Input
				{...rest}
				placeholder={placeholder}
				type={type}
				value={val}
				onChange={(e) => {
					setVal(e);
					onChange(e);
				}}
				className={`${styles.input}${SuffixIcon && 'icon'}`}
				suffix={<SuffixIcon width={width} height={height} />}
			/>
			{/* </div> */}
		</div>
	);
}

export default LegendInput;
