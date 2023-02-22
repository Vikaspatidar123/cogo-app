// import { StyledButton, StyledLoading } from './style';
import { Button as StyledButton } from '@cogoport/components';

import { Loading } from '../../configuration/icon-configuration';

import styles from './styles.module.css';

function Button({
	children,
	size,
	isPrev,
	onClick,
	loading,
	productLoading,
	primary,
	...rest
}) {
	const renderBtn = () => {
		if (productLoading && loading) {
			return (
				<>
					<div>Validating HS Code </div>
					<div className={styles.spinner} />
				</>
			);
		}
		if (loading) {
			return <img src={Loading} alt="" width="50px" height="20px" />;
		}

		return children;
	};
	return (
		<StyledButton
			className={`${isPrev && 'secondary prev'} ${primary && 'primary'} ${size} ${
				loading && styles.disableBtn
			} ${styles.styled_button} }`}
			onClick={onClick}
			{...rest}
		>
			{renderBtn()}
		</StyledButton>
	);
}
export default Button;
