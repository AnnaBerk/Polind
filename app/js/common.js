var offer = document.querySelectorAll(".best-offers__item");


/*offer.forEach(function (entry) {
entry.addEventListener("focus", function(evt){
	evt.preventDefault();
	var button = entry.querySelector(".button-offer");
	button.classList.remove("visually-hidden");
})
});

offer.forEach(function (entry) {
entry.addEventListener("blur", function(evt){
	evt.preventDefault();
	var button = entry.querySelector(".button-offer");
	button.classList.add("visually-hidden");
})
});

*/
offer.forEach(function (entry) {
entry.addEventListener("mouseover", function(evt){
	evt.preventDefault();
	var button = entry.querySelector(".button-offer");
	button.classList.remove("visually-hidden");
})
});

offer.forEach(function (entry) {
entry.addEventListener("mouseout", function(evt){
	evt.preventDefault();
	var button = entry.querySelector(".button-offer");
	button.classList.add("visually-hidden");
})
});

