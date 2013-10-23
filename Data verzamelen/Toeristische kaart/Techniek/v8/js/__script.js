$(function() {
	document.onkeydown = keyPressed;
	var arrInt = 0,
		currentDegree = 0,
		partDegree = 36,
		nextDegree = 0;

	/**
	 * @param degreeFrom
	 * @param degreeTo
	 */
	function rotateWorld(degreeFrom, degreeTo)
	{
		$({deg: degreeFrom}).animate({deg: degreeTo}, {
			duration: 500,
			step: function(now)
			{
				$(".world").css({
					transform: 'rotate(' + now + 'deg)'
				});
			}
		});
	}



	/**
	 * @param e
	 */
	function keyPressed(e) {
		e = e || window.event;
		if (e.keyCode == '37') {
			nextItem('left');
		}
		else if (e.keyCode == '39') {
			nextItem('right');
		}
	}

	/**
	 * @param key
	 */
	function nextItem(key)
	{

		if(key == 'left') {

//		if (int==0) {
//			int = items.length-1;
//		} else {
//			int -= 1;
//		}
			arrInt -= 1;
			if(arrInt<=0) {
				arrInt = 9;
			}

			nextDegree = currentDegree - partDegree;
			rotateWorld(currentDegree, nextDegree);
			currentDegree = nextDegree;

		} else {

//		if (int==items.length-1) {
//			int = 0;
//		} else {
//			int += 1;
//		}

			arrInt += 1;
			if(arrInt>=9) {
				arrInt=0;
			}

			nextDegree = currentDegree + partDegree;
			rotateWorld(currentDegree, nextDegree);
			currentDegree = nextDegree;

		}

//		console.log(arrInt);
//
//		console.log(getWeatherType(getWeatherCode(arrInt)));
//		console.log(getWeatherCode(arrInt));
//		getData(arrInt);

	}

});