import { Popover } from '@cogoport/front/components/admin';
import getField from '@cogo/business-modules/form/components';
import { useSelector } from '@cogo/store';
import { PopoverFieldContainer } from './styles';
import PopoverContent from './PopoverContent';

const CargoHandlingPopover = ({
	show,
	control,
	field,
	railCommodityType,
	railCommoditySubType,
	formValues,
	onSubmitSuccess,
	onClose,
	onClickOutside,
}) => {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { type: fieldType, name: controlName } = control;

	const FieldController = getField(fieldType) || null;
	if (!FieldController) {
		return null;
	}

	return (
		<Popover
			visible={show}
			placement={isMobile ? 'bottom' : 'right'}
			theme="light"
			content={
				<PopoverContent
					show={show}
					formValues={formValues}
					onSubmitSuccess={onSubmitSuccess}
					onClose={onClose}
					controlName={controlName}
					railCommodityType={railCommodityType}
					railCommoditySubType={railCommoditySubType}
				/>
			}
			interactive
			onClickOutside={() => onClickOutside({ controlName })}
		>
			<PopoverFieldContainer>
				<FieldController key={field.name} {...field} />
			</PopoverFieldContainer>
		</Popover>
	);
};

export default CargoHandlingPopover;
