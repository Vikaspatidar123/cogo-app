function downloadFile(fileUrl) {
	const xhttp = new XMLHttpRequest();
	xhttp.open('GET', fileUrl, true);
	xhttp.responseType = 'blob';
	xhttp.onreadystatechange = () => {
		// eslint-disable-next-line eqeqeq
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			const downloadUrl = URL.createObjectURL(xhttp.response);
			const a = document.createElement('a');
			document.body.appendChild(a);
			a.style = 'display: none';
			a.href = downloadUrl;
			a.download = '';
			a.click();
		}
	};
	xhttp.send();
}

export default downloadFile;
