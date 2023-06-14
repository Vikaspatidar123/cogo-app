const isDocPresent = (documents, name) => {
	const docObj = documents.find((document) => document.document_type === name);
	return !!docObj && docObj.document_type === name;
};
export default isDocPresent;
