(function(){
var offer = document.querySelectorAll(".best-offers__item");


offer.forEach(function (entry) {
entry.addEventListener("mouseover", function(evt){
	evt.preventDefault();
	var header = entry.querySelector(".best-offers__header");
	header.style.marginTop = "170px";

  var place = entry.querySelector(".best-offers__place");
  place.style.marginBottom = "120px";

	var button = entry.querySelector(".button-best-offer");
	button.classList.remove("visually-hidden");
})
});

offer.forEach(function (entry) {
entry.addEventListener("mouseout", function(evt){
	evt.preventDefault();

	var header = entry.querySelector(".best-offers__header");
	header.style.marginTop = "320px";

	var place = entry.querySelector(".best-offers__place");
  place.style.marginBottom = "10px";

	var button = entry.querySelector(".button-best-offer");
	button.classList.add("visually-hidden");
})
});

offer.forEach(function (entry) {
entry.addEventListener("focus", function(evt){
	evt.preventDefault();
	var header = entry.querySelector(".best-offers__header");
	header.style.marginTop = "170px";

  var place = entry.querySelector(".best-offers__place");
  place.style.marginBottom = "120px";

	var button = entry.querySelector(".button-best-offer");
	button.classList.remove("visually-hidden");

	button.addEventListener("focus", function(evt){
	evt.preventDefault();
  var header = entry.querySelector(".best-offers__header");
	header.style.marginTop = "170px";

  var place = entry.querySelector(".best-offers__place");
  place.style.marginBottom = "120px";

	var button = entry.querySelector(".button-best-offer");
	button.classList.remove("visually-hidden");
	})
})
});

offer.forEach(function (entry) {
entry.addEventListener("blur", function(evt){
	evt.preventDefault();

	var header = entry.querySelector(".best-offers__header");
	header.style.marginTop = "320px";

	var place = entry.querySelector(".best-offers__place");
  place.style.marginBottom = "10px";

	var button = entry.querySelector(".button-best-offer");
	button.classList.add("visually-hidden");

	button.addEventListener("blur", function(evt){
	evt.preventDefault();
	var header = entry.querySelector(".best-offers__header");
	header.style.marginTop = "320px";

	var place = entry.querySelector(".best-offers__place");
  place.style.marginBottom = "10px";

  var button = entry.querySelector(".button-best-offer");
	button.classList.add("visually-hidden");

  })
})
});

}());