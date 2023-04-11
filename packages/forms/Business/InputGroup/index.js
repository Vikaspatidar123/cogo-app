import { Input, InputGroup as IpGroup } from '@cogoport/components';
import React, { useState } from 'react';

import Select from '../Select';

import styles from './styles.module.css';

function InputGroup({
	value = {},
	inputControls = [],
	onChange = () => {},
	style = {},
	id,
	disabled = false,
}) {
	const [objs, setObjs] = useState({});
	const newControls = inputControls.map((control) => ({
		...control,
		value: (value || {})[control.name],
		disabled,
	}));

	const handleChange = (name, newValue, obj) => {
		const newObjs = { ...objs, [name]: obj || {} };
		setObjs(newObjs);
		onChange({ ...(value || {}), [name]: newValue }, newObjs);
	};

	return (
		<div className={styles.container}>
			<IpGroup style={style}>
				{newControls.map((control) => {
					if (control.type === 'select') {
						return (
							<Select
								{...control}
								onChange={(val, obj) => handleChange(control.name, val, obj)}
								inputId={`${id || control.name}_${control.name}`}
							/>
						);
					}
					return (
						<Input
							{...control}
							id={`${id || control.name}_${control.name}`}
							onChange={(e) => {
								handleChange(control.name, e, {});
							}}
						/>
					);
				})}
			</IpGroup>
		</div>
	);
}

export default InputGroup;
