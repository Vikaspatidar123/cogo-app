import { Toggle, Popover, Placeholder } from '@cogoport/components';
import { upperCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const incotermContent = ({
	options = [], toggleState, setToggleState, setInputValue,
	setShowPopover, loading = false,
}) => (
	<>
		<Toggle
			offLabel="Import"
			onLabel="Export"
			value={toggleState}
			disabled={loading}
			onChange={(e) => setToggleState(e.target.checked ? 'export' : 'import')}
		/>
		{!loading && (
			<div className={styles.option_container}>
				{options.map((opt) => (
					<p
						key={opt?.value}
						onClick={() => {
							setInputValue(opt?.value);
							setShowPopover(false);
						}}
						role="presentation"
						className={styles.option}
					>
						{opt?.label}
					</p>
				))}
			</div>
		)}
		{loading && (
			<div className={styles.option_container}>
				{
			[1, 2, 3, 4].map((val) => (
				<Placeholder key={val} margin="0px 0px 20px 0px" />
			))
		}
			</div>
		)}
	</>
);

function IncotermController({
	item = {}, options = [],
	toggleState, setToggleState, setValue, getValues, loading = false,
}) {
	const [inputValue, setInputValue] = useState(getValues('incoterms') || 'cif');
	const [showPopover, setShowPopover] = useState(false);

	useEffect(() => {
		if (inputValue) {
			setValue('incoterms', inputValue);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	return (
		<div className={styles.container}>
			<p>{item?.label}</p>
			<Popover
				placement="bottom"
				content={incotermContent({
					options,
					toggleState,
					setToggleState,
					setInputValue,
					setShowPopover,
					loading,
				})}
				visible={showPopover}
			>
				<div
					className={styles.input_box}
					onClick={() => setShowPopover((prev) => !prev)}
					role="presentation"
				>
					{upperCase(inputValue)}

				</div>

			</Popover>
		</div>
	);
}

export default IncotermController;
