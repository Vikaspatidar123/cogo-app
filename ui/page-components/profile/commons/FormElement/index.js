import { isEmpty } from '@cogoport/utils';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function SearchResultsServiceItemFormElement({
	controls,
	control,
	errors,
	showElements = {},
}) {
	return (
		<div className={styles.flex_container}>
			{controls.map((controlItem) => {
				const { name, label, type } = controlItem;
				const controlStyle = controlItem?.style;
				const Element = getField(type);

				const show = !(controlItem.name in showElements) || showElements[controlItem.name];

				if (!show || !Element) {
					return null;
				}

				if (type === 'fieldArray') {
					return (
						<FieldArray
							{...controlItem}
							name={controlItem.name}
							control={control}
							showElements={showElements}
							error={errors.controlItem}
							key={name}
						/>
					);
				}

				const options = [];

				const finalProps = {
					...controlItem,
					...(!isEmpty(options) && { options }),
				};

				if (type === 'async_select') {
					delete finalProps.style;
				}
				if (type === 'file' && controlStyle) {
					controlStyle.maxWidth = controlStyle.flexBasis;
				}

				return (
					<div
						className={styles.flex_item}
						style={{
							...controlStyle,
							...(name === 'is_sez' ? { margin: 'auto' } : null),
						}}
						key={name}
					>
						<div>
							{name !== 'is_sez' ? (
								<div className={styles.label}>{label}</div>
							) : null}

							<div>
								<Element
									{...finalProps}
									key={name}
									control={control}
									id={`${name}_profile_controls`}
								/>
								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default SearchResultsServiceItemFormElement;
