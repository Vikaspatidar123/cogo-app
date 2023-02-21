import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useHSCODE from '../../hooks/useHsCode';

import HSCodelistAddproduct from './HSCodeListAddProduct';
// import { StyledModal } from './style';
import styles from './styles.module.css';

function HsCodeModal({
	hsCode,
	setHSCode,
	showProduct,
	setShowProduct,
	countryInfo,
	prefiledValues,
	setPrefiledValues,
	addProduct,
	refetchProduct,
	setActiveTab,
	isMobile,
}) {
	const [chapterCodeforAPi, setChapCodeforAPi] = useState('');
	const [countryforHscode, setCountryforHsCode] = useState();
	const [selectedCountry, setSelectedCountry] = useState('INDIA');
	const {
		ApiData,
		headingObj,
		refetchHeading,
		hsCodeObj,
		refetchHsCode,
		loading,
		headingLoading,
		hsloading,
		hsCodeResponse,
		setSearchTerm,
	} = useHSCODE({ chapterCodeforAPi, countryforHscode });
	return (
		<Modal
			className={styles.styled_modal}
			show={hsCode}
			onOuterClick={() => setHSCode(false)}
			width={isMobile ? 600 : 700}
			onClose={() => setHSCode(false)}
			style={{ height: '600px' }}
		>
			<HSCodelistAddproduct
				showProduct={showProduct}
				setShowProduct={setShowProduct}
				setHSCode={setHSCode}
				ApiData={ApiData}
				setChapCodeforAPi={setChapCodeforAPi}
				headingObj={headingObj}
				refetchHeading={refetchHeading}
				hsCodeObj={hsCodeObj}
				refetchHsCode={refetchHsCode}
				countryInfo={countryInfo}
				prefiledValues={prefiledValues}
				setPrefiiledValues={setPrefiledValues}
				loading={loading}
				headingLoading={headingLoading}
				hsloading={hsloading}
				countryforHscode={countryforHscode}
				setCountryforHsCode={setCountryforHsCode}
				setSelectedCountry={setSelectedCountry}
				selectedCountry={selectedCountry}
				addProduct={addProduct}
				refetchProduct={refetchProduct}
				setActiveTab={setActiveTab}
				isMobile={isMobile}
				hsCodeResponse={hsCodeResponse}
				setSearchTerm={setSearchTerm}
			/>
		</Modal>
	);
}

export default HsCodeModal;
