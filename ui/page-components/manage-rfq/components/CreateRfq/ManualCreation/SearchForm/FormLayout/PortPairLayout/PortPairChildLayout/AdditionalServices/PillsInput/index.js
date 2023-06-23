import { cl, Input } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import styles from './styles.module.css';

import getConfiguration from '@/ui/page-components/manage-rfq/configurations/SearchFormControls/getConfiguration';

function PillInput(props, ref) {
	const {
		onFocus = () => {},
		onClick = () => {},
		value: modifiedValues = [],
		showCaret = true,
		show = false,
		error = null,
		className = '',
		action = '',
		mode,
		...rest
	} = props;

	const handleShowChips = () => {
		const remaining_count = modifiedValues.length - 1;
		const text = remaining_count > 1 ? 'Services' : 'Service';

		const serviceDetails = getConfiguration('service-details', mode);

		return (
			<>
				<div className={styles.chip}>{serviceDetails[(modifiedValues || [])[0]].title}</div>
				{remaining_count ? (
					<div className={styles.chip_text}>{`+ ${modifiedValues.length - 1} ${text}`}</div>
				) : null}
			</>
		);
	};
	return (
		<div ref={ref}>
			<p className={styles.label}>
				Additional Services
				<div className={styles.subtext}>

					(optional)
				</div>
			</p>
			<div
				className={styles.container}
				role="presentation"
				onClick={action !== 'disable' ? onClick : null}
				id="search_form_cargo_details_container"
			>
				<div
					className={cl`${styles.sub_container} ${
						modifiedValues.length === 0 ? styles.placeholder : ''
					} ${error ? styles.error : ''} ${show ? styles.show : ''} ${
						action === 'disable' ? styles.disable : ''
					} ${styles?.[className]}`}
				>
					<div className={styles.chip_container}>
						{modifiedValues.length > 0 && handleShowChips()}

						{modifiedValues.length === 0 && (
							<div className={styles.placeholder}>Select Options</div>
						)}

						<Input
							{...rest}
							onFocus={onFocus}
							onBlur={onFocus}
							id="search_form_cargo_details_input"
						/>
					</div>

					<div className={styles.util_div}>
						{showCaret && <IcMArrowRotateDown className={styles.arrow_down} />}

					</div>
				</div>
			</div>

			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
}

export default forwardRef(PillInput);
