const createBezier = (inputPoints, step) => {
	let t = 0;
	const bezierPoints = [];
	while (t <= 1) {
		try {
			let x1;
			let x2;
			let x3;

			x1 = parseFloat(inputPoints[0].lat);
			x3 = parseFloat(inputPoints[1].lat);
			x2 = Math.max(x1, x3) + 20;
			const lat_x =
				(1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

			x1 = parseFloat(inputPoints[0].lng);
			x3 = parseFloat(inputPoints[1].lng);
			x2 = (x1 + x3) / 2;
			const lng_x =
				(1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

			bezierPoints.push({
				lat: lat_x,
				lng: lng_x,
			});
		} catch (err) {
			t = 1;
		}
		t += step;
	}
	return bezierPoints;
};

export default createBezier;
