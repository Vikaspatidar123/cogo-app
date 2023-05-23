const clickFunction = ({
	setChaptersData,
	setHeadingData,
	setActiveSection,
	setActiveStepper,
	setPreviousStepper,
	setActiveChapter,
	setActiveHeading,
	setHsCodeRow,
	refetchHeading,
	refetchHsCode,
	setHeadingCode,
	searchTerm,
}) => {
	const categoryFunction = (row) => {
		setChaptersData(row?.chapters);
		setActiveSection(row?.sectionDescription);
		setActiveStepper((prev) => ({ ...prev, description: true }));
		setPreviousStepper((prev) => ({
			...prev,
			showCategoryTable : false,
			showChapterTable  : true,
		}));
	};

	const chapterFunction = async (row) => {
		setActiveChapter(row?.chapterDescription);
		if (searchTerm === '') {
			await refetchHeading(row?.chapterCode);
		} else {
			setHeadingData(row?.headings);
		}
		setActiveStepper((prev) => ({ ...prev, section: true }));
		setPreviousStepper((prev) => ({
			...prev,
			showChapterTable : false,
			showHeadingTable : true,
		}));
	};

	const headingFunction = async (row) => {
		setActiveHeading(row?.headingDescription);
		setHeadingCode(row?.headingCode);
		await refetchHsCode({ row, page: 1 });
		setActiveStepper((prev) => ({ ...prev, chapter: true }));
		setPreviousStepper((prev) => ({
			...prev,
			showHeadingTable : false,
			showhscode       : true,
		}));
	};

	const hsFunction = (row) => {
		setHsCodeRow(row);
		setActiveStepper((prev) => ({ ...prev, hsCode: true }));
	};

	return {
		categoryFunction,
		chapterFunction,
		headingFunction,
		hsFunction,
	};
};

export default clickFunction;
