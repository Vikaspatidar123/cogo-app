import {
	Modal,
	Button,
	InputGroup,
	Input,
	Popover,
} from '@cogoport/components';
import { IcMInfo, IcABudgetingTools } from '@cogoport/icons-react';
import { useState } from 'react';

import useCalculation from './calculation';
import { ContainerSizeMappings } from './container-size-mappings';
import styles from './styles.module.css';

function LoadCalculater({
	showCalculater,
	setShowCalculater,
	watchContainerSize,
	setFormValues,
	watchContainerType,
}) {
	const [calculateDisabled, setCalculateDisabled] = useState(true);
	const [noOfContainers, setNoOfContainers] = useState();
	const [globalValue, setGlobalValue] = useState({});
	const [errorMessage, setErrorMessage] = useState({
		length : '',
		width  : '',
		height : '',
		weight : '',
	});
	useCalculation({
		globalValue,
		watchContainerSize,
		calculateDisabled,
		setCalculateDisabled,
		errorMessage,
		setErrorMessage,
		noOfContainers,
		setNoOfContainers,
	});
	const clearFn = () => {
		setShowCalculater(false);
		setGlobalValue({});
		setErrorMessage({});
		setCalculateDisabled(true);
		setNoOfContainers();
	};
	const handleClick = () => {
		if (watchContainerType === 'DRY') {
			setFormValues('containerCount', noOfContainers);
			clearFn();
		}
		clearFn();
	};
	const head = () => (
		<div className={styles.head_container}>
			<IcABudgetingTools width={40} height={40} />
			<div>
				<div className={styles.head}>Calculate Load</div>
				<div className={styles.sub_heading}>
					{`You have selected a ${watchContainerSize}
					container`}
				</div>
			</div>
		</div>
	);
	const info = ContainerSizeMappings.find(
		(item) => item.label === watchContainerSize,
	);
	return (
		<Modal show={showCalculater} onClose={() => setShowCalculater()}>
			<Modal.Header title={head()} />
			<Modal.Body>
				<div className={styles.input_head}>
					<div>
						<div className={styles.tooltip}>
							<div className={styles.lable}>Dimensions</div>
							<Popover
								render={info?.dimensionsInfo}
								placement="right-end"
								trigger="mouseenter"
							>
								<div>
									<IcMInfo width={15} height={15} fill="#356EFD" />
								</div>
							</Popover>
						</div>
						<InputGroup>
							<Input
								placeholder="L"
								className={styles.input_d}
								onChange={(length) => setGlobalValue((prev) => ({
									...prev,
									length,
								}))}
							/>
							<Input
								placeholder="W"
								className={styles.input_d}
								onChange={(width) => setGlobalValue((prev) => ({
									...prev,
									width,
								}))}
							/>
							<Input
								placeholder="H"
								className={styles.input_d}
								onChange={(height) => setGlobalValue((prev) => ({
									...prev,
									height,
								}))}
							/>
							<Input
								placeholder="m"
								size="md"
								disabled
								className={styles.input_d}
							/>
						</InputGroup>
						<div className={styles.error_message}>
							<div>{errorMessage.length && errorMessage.length}</div>
							<div>{errorMessage.width && errorMessage.width}</div>
							{errorMessage.height && errorMessage.height}
						</div>
					</div>
					<div>
						<div className={styles.tooltip}>
							<div className={styles.lable}>Weight</div>
							<Popover
								render={info?.weightInfo}
								placement="right-end"
								trigger="mouseenter"
							>
								<div>
									<IcMInfo width={15} height={15} fill="#356EFD" />
								</div>
							</Popover>
						</div>
						<Input
							placeholder="Weight"
							size="md"
							suffix="Kg"
							style={{ width: '100%' }}
							onChange={(weight) => setGlobalValue((prev) => ({
								...prev,
								weight,
							}))}
						/>
						<div className={styles.error_message}>
							{errorMessage.weight && errorMessage.weight}
						</div>
					</div>
				</div>
				<div>
					<div className={styles.lable}>Quantitiy</div>

					<Input
						placeholder="Quantitiy"
						size="md"
						className={styles.quantitiy}
						onChange={(quantitiy) => setGlobalValue((prev) => ({
							...prev,
							quantitiy,
						}))}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer align="left">
				{/* <div className={styles.footer}> */}
				<div className={styles.container}>
					*
					{noOfContainers > 0
						? `Total containers required: ${noOfContainers}`
						: 'Total containers required: 1'}
				</div>
				<div className={styles.button_div}>
					<Button
						themeType="tertiary"
						onClick={clearFn}
						className={styles.button}
					>
						CANCEL
					</Button>
					<Button
						themeType="primary"
						onClick={handleClick}
						disabled={calculateDisabled}
					>
						ADD To QUOTE
					</Button>
				</div>
				{/* </div> */}
			</Modal.Footer>
		</Modal>
	);
}

export default LoadCalculater;
