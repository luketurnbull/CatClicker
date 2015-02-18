$(function(){

	var model = {
		currentCat : null,
		cats: [
			{
				"name" : "Tony",
				"src" : "0.jpeg",
				"clicks" : 0
			},
			{
				"name" : "Tom",
				"src" : "1.jpg",
				"clicks" : 0
			},
			{
				"name" : "Jeff",
				"src" : "2.jpg",
				"clicks" : 0
			},
			{
				"name" : "Sheila",
				"src" : "3.jpg",
				"clicks" : 0
			},
			{
				"name" : "Ralph",
				"src" : "4.jpg",
				"clicks" : 0
			}
		]

	};

	var octopus = {

		getCatList: function() {
			return model.cats;
		},

		getCurrentCat: function() {
			adminView.hide();
			return model.currentCat;
		},

		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		incrementCatCounter: function(){
			model.currentCat.clicks++;
			catView.render();
		},

		save: function(clicks, name){
			model.currentCat.clicks = clicks;
			model.currentCat.name = name;
			catView.render();
		},

		init: function() {
			catView.init();
			catListView.init();
			adminView.init();
		}
	};

	var catView = {

		init: function() {
			this.catContainer = document.getElementById("cat");
			this.clicks = document.getElementById("clicks");
			this.catsName = document.getElementById("name");
			catContainer.addEventListener('click', function(){
				octopus.incrementCatCounter();
			});
		},

		render: function() {
			var cat = octopus.getCurrentCat();
			this.catContainer.src = "img/"+cat.src;
			this.clicks.innerHTML = cat.clicks;
			this.catsName.innerHTML = cat.name;
		}

	};

	var catListView = {

		init: function() {
			catListView.render();
		},
		render: function() {
            octopus.getCatList().forEach(function(cat) {
			    var elem = document.createElement('li');
			    elem.textContent = cat.name;
			    elem.addEventListener('click', (function(catCopy) {
			        return function() {
			        	octopus.setCurrentCat(catCopy);
			        	catView.render();
			        }
			    })(cat));
			    document.getElementById("cats").appendChild(elem);
            });
		}
	};

	var adminView = {
		init: function() {
			this.nameEdit = document.getElementById("nameEdit");
			this.clickEdit = document.getElementById("clickEdit");
			this.adminButton = document.getElementById("admin");
			this.adminButton.addEventListener('click', function(){
				adminView.show();
			});
			this.save = document.getElementById("save");
			this.save.addEventListener('click', function(){
				octopus.save(clickEdit.value, nameEdit.value);
			});
			this.adminArea = document.getElementById("adminArea");
			adminView.hide();

		},
		show: function() {
			var currentCat = octopus.getCurrentCat();
			this.nameEdit.value = currentCat.name;
			this.clickEdit.value = currentCat.clicks;
			this.adminArea.style.visibility = 'visible';
		},
		hide: function() {
			this.adminArea.style.visibility = 'hidden';
		}
	};

	octopus.init();
});