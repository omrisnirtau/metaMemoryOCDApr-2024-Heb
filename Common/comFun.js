"use strict";

window.comFun = window.comFun || {};

comFun.shuffling = function (array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
        }
    return array;
};

comFun.arrayRange = function (start, len) {
		var arr = [];
		for (var i = 0; i < len; i++, start++) {
			arr[i] = start;
		}
      	return arr;
};
