import {
	cl, Pill, Tooltip, Checkbox, ButtonIcon, Button, Popover, Input,
} from '@cogoport/components';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import iconUrl from '../../../../../../utils/iconUrl.json';
import servicesConfiguration from '../../../../../configuration/serviceConfiguration';
import useProductField from '../../../../../hooks/useProductField';
import useVerifyHsCode from '../../../../../hooks/useVerifyHsCode';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import HsCodeModal from '@/ui/page-components/hs-code-modal';

const content = ({ hsRecommendation = [], setStatus, setCheckButton, setVerifiedData }) => (
	<div className={styles.recommend_container}>
		{hsRecommendation.map((recommend) => {
			const { hsCode:hsCodeValue = '', description = '' } = recommend;

			return (
				<div
					key={hsCodeValue}
					className={styles.content}
					role="presentation"
					onClick={() => {
						setStatus((prev) => !prev);
						setVerifiedData({
							hsCode: hsCodeValue,
							description,
						});
						setCheckButton(true);
					}}
				>
					{`${hsCodeValue}: ${description}`}
				</div>
			);
		})}
	</div>
);

function ProductField({
	index,
	services,
	serviceCurrency,
	isUserSubscribed = false,
	isQuotaLeft = false,
	destinationPortDetails = {},
	productInfo = {},
	servicesSelected = {},
	productInfoArr = [],
	productLineItemDetails = [],
	deleteProduct,
	verifyHandler,
	checkBoxChangeHandler,
	commonLoading = false,
}) {
	const [verifiedData, setVerifiedData] = useState({});
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [selectedData, setSelectedData] = useState({});

	const { hsCode, description, productId, name:productName } = productInfo;

	const {
		hsRecommendation, status, setStatus,
		checkButton, setCheckButton, verifyLoading, verifyHsCode,
	} = useVerifyHsCode({ isQuotaLeft });

	const { productLength, disableValidateBtn, lineItemLength } = useProductField({
		selectedData,
		productInfo,
		productInfoArr,
		isUserSubscribed,
		isQuotaLeft,
		verifyLoading,
		status,
		productLineItemDetails,
		verifiedData,
		verifyHandler,
		checkButton,
	});

	return (
		<div className={cl`${styles.container} ${index === productLength - 1 && styles.remove_line}`}>
			{!hsCode && !checkButton && (
				<Button className="text primary lg cta" themeType="linkUi" onClick={() => setShowHsCodeModal(true)}>
					<IcMPlusInCircle width={16} height={16} />
					Add HS Code
				</Button>
			)}
			<div className={styles.input_box_container}>
				<div className={styles.col} style={{ width: '20%' }}>
					<p className={styles.label}>HS Code</p>
					<Input
						size="sm"
						placeholder="HS Code"
						value={verifiedData?.hsCode || hsCode || selectedData?.hsCode}
						disabled
					/>
				</div>

				<div className={styles.col} style={{ width: '45%' }}>
					<p className={styles.label}>HS Code</p>
					<Popover
						interactive
						placement="bottom"
						content={content({ hsRecommendation, setStatus, setCheckButton, setVerifiedData })}
						visible={!status}
						caret={false}
					>
						<div>
							<Input
								size="sm"
								placeholder="Product Name"
								value={verifiedData?.description || description || productName}
								disabled
							/>
						</div>
					</Popover>
				</div>

				<div style={{ width: '15%' }}>
					{!checkButton ? (
						<Button
							themeType="accent"
							loading={verifyLoading}
							onClick={() => verifyHsCode({
								hsCode,
								productId,
								destinationPortDetails,
								selectedHscode: selectedData?.hsCode,
							})}
							disabled={disableValidateBtn || (!hsCode && !selectedData?.hsCode)}
						>
							Validate
						</Button>
					) : (
						<div className={styles.validate_icon}>
							<img src={iconUrl.validate} alt="validated" />
							<div className={styles.validate_text}>Validated</div>
						</div>
					)}
				</div>

				{productLength > 1 && (
					<div className={lineItemLength > 0 && commonLoading && styles.delete_icon}>
						<ButtonIcon
							size="lg"
							icon={<IcMDelete />}
							themeType="primary"
							onClick={() => (lineItemLength === 0 || !commonLoading) && deleteProduct(productId, index)}
						/>
					</div>
				)}
			</div>

			<div className={styles.card}>
				{(servicesConfiguration || []).map((service) => (
					<div key={service?.id} className={styles.service_container}>
						<Checkbox
							key={`${productId}_${service?.name}`}
							id={`${productId}_${service?.name}`}
							checked={servicesSelected?.[productId]?.[service?.name]}
							onChange={() => checkBoxChangeHandler(productId, service?.name)}
							disabled={commonLoading || lineItemLength > 0}
						/>
						<div>
							<Tooltip placement="right" content={service?.tooltip}>
								<div className={styles.cursor}>
									<div className={styles.service_name}>{service?.displayName}</div>
									<div className={styles.hrborder} />
								</div>
							</Tooltip>
							{!isQuotaLeft && (
								<Pill color="#FEF0DF">
									{formatAmount({
										amount   : services[service?.name]?.price,
										currency : serviceCurrency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'symbol',
											notation              : 'standard',
											maximumFractionDigits : 2,
										},
									})}
									/-
								</Pill>
							)}
						</div>
					</div>

				))}
			</div>
			<HsCodeModal
				showHsCodeModal={showHsCodeModal}
				setShowHsCodeModal={setShowHsCodeModal}
				setSelectedData={setSelectedData}
			/>
		</div>
	);
}

export default ProductField;
