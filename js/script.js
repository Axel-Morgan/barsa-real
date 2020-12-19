
//-------------------------------------------------------СЛАЙДЕР С МАТЧАМИ------------------------------------------
var dataSliderMatches = {
	matchSlider: document.getElementsByClassName('slide'),
	widthWindow: document.querySelector('.slider_window').offsetWidth,
	dots: document.getElementsByClassName('dot'),
	shiftSlide: 0,
	indexDot: 0
};


window.onload = function() {
	initializationDots();
	inputDefault();
	getTasks();
}

window.onresize= function(){
    correctionSlider();
    correctionSliderPlayers();
};

//ИНИЦИАЛИЗАЦИЯ ПОЛОЖЕНИЯ ДОТСА
function initializationDots(){
	let dot = dataSliderMatches.dots;
	let numberDot = dataSliderMatches.indexDot;
	dot[numberDot].style.backgroundColor = "#000000";
}

//КОРРЕКЦИЯ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА СЛАЙДЕРА
function correctionSlider(){
	dataSliderMatches.widthWindow = document.querySelector('.slider_window').offsetWidth;
    dataSliderMatches.dots[dataSliderMatches.indexDot].style.backgroundColor = "#ffffff";
    dataSliderMatches.shiftSlide = 0;
    dataSliderMatches.indexDot = 0;
    dataSliderMatches.dots[dataSliderMatches.indexDot].style.backgroundColor = "#000000";
    for(let i = 0; i < dataSliderMatches.matchSlider.length; i++){
	  	dataSliderMatches.matchSlider[i].style.left = dataSliderMatches.shiftSlide +'px';
	}
}

//ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ С ПОМОЩЬЮ ДОТСОВ 
function moveSlideDots(numberDot){
	let dot = dataSliderMatches.dots;
	let index_dot = dataSliderMatches.indexDot;
	let multFactor = 0;

	dot[index_dot].style.backgroundColor = "#ffffff";
	dot[numberDot].style.backgroundColor = "#000000";

	multFactor = Math.abs(numberDot - index_dot);

	if (numberDot > index_dot){
		moveSlide(false, multFactor, true);
	}
	else if (numberDot < index_dot){
		moveSlide(true, multFactor, true);
	}

	dataSliderMatches.indexDot = numberDot;
}


//ДВИГАЕМ ЛЕНТУ 
function moveSlide(vector, multFactor = 1, isDotTrigger = false){

	  let shift = dataSliderMatches.shiftSlide;
	  let widthSlider = dataSliderMatches.widthWindow;
	  let slides = dataSliderMatches.matchSlider;
	  let dot = dataSliderMatches.dots;

	  let index_dot = dataSliderMatches.indexDot;

	  //ЛЕВАЯ СТРЕЛКА
	  if ((vector == true) && (shift > 0)){
	  	shift = shift - widthSlider * multFactor;

	  	if (isDotTrigger == false){
	  		index_dot--;
	  		console.log(index_dot);
	  		dot[dataSliderMatches.indexDot].style.backgroundColor = "#ffffff";
			dot[index_dot].style.backgroundColor = "#000000";
	  	}

	  	for(let i = 0; i < slides.length; i++){
	  	  	slides[i].style.left = -shift +'px';
	  	}
	  }

	  //ПРАВАЯ СТРЕЛКА
	  else if ((vector == false) && (shift < (slides.length - 1) * widthSlider)) {
	  	shift = shift + widthSlider * multFactor;

	  	if (isDotTrigger == false){ 
	  		index_dot++;
	  		console.log(index_dot);
	  		dot[dataSliderMatches.indexDot].style.backgroundColor = "#ffffff";
			dot[index_dot].style.backgroundColor = "#000000";
		}

	  	for(let i = 0; i < slides.length; i++){
	  		slides[i].style.left = -shift +'px';
	  	}
	  }

	  dataSliderMatches.shiftSlide = shift;
	  dataSliderMatches.indexDot = index_dot;
}




//---------------------------------------------АВТОМАТИЧЕСКИЙ СЛАЙДЕР----------------------------------

var dataSliderPlayers = {
	playerSliderOne: document.getElementsByClassName('slide_one'),
	playerSliderTwo: document.getElementsByClassName('slide_two'),
	widthWindow: document.querySelector('.container_slides').offsetWidth,
	shiftSlide: 0,
	timer: 0
};

//АВТОМАТИЧЕСКОЕ ДВИЖЕНИЕ СЛАЙДЕРА 
function autoShiftSlider() {
	let sliderOne = dataSliderPlayers.playerSliderOne;
	let sliderTwo = dataSliderPlayers.playerSliderTwo;
	let widthWindow = dataSliderPlayers.widthWindow;
	let shift = dataSliderPlayers.shiftSlide;

	if ((shift >= 0) && (shift < (sliderOne.length - 1) * widthWindow)){
		shift = shift + widthWindow; 
	}
	else shift = 0;

	clearTimeout(dataSliderPlayers.timer);

	for(let i = 0; i < sliderOne.length; i++){
		sliderOne[i].style.left = -shift +'px';
		sliderTwo[i].style.left = -shift +'px';
	}

	 dataSliderPlayers.shiftSlide = shift;

	 timeOut();
}

//ОТКЛАДЫВАЕМ ВРЕМЯ ВЫПОЛНЕНИЯ ФУНКЦИИ 
function timeOut(){
	dataSliderPlayers.timer = setTimeout(autoShiftSlider, 8000);
}

//КОРРЕКЦИЯ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА СЛАЙДЕРА
function correctionSliderPlayers(){
	dataSliderPlayers.widthWindow = document.querySelector('.container_slides').offsetWidth;
    dataSliderPlayers.shiftSlide = 0;
    for(let i = 0; i < dataSliderPlayers.playerSliderOne.length; i++){
	  	dataSliderPlayers.playerSliderOne[i].style.left = dataSliderPlayers.shiftSlide +'px';
	  	dataSliderPlayers.playerSliderTwo[i].style.left = dataSliderPlayers.shiftSlide +'px'
	}
}

timeOut();

//---------------------------------------------ДОБАВЛЕНИЕ КОММЕНТАРИЕВ----------------------------------

var commentStore = {
	name: 'default',
	nameDefault: 'default',
	comment: 'default',
	commentDefault: 'default'
};

//ДЕФОЛТНЫЕ ЗНАЧЕНИЯ ПОЛЕЙ
function inputDefault() {
	commentStore.nameDefault = document.getElementById('formName').value;
	commentStore.commentDefault = document.getElementById('formComment').value;
}

//ПОЛУЧАЕМ ДАННЫЕ 
function inputData(){
	commentStore.name = document.getElementById('formName').value;
	commentStore.comment = document.getElementById('formComment').value;

	if ((commentStore.name != commentStore.nameDefault) && (commentStore.comment != commentStore.commentDefault) 
		&& (commentStore.name != '') && (commentStore.comment != '')){
	saveTask(commentStore.name, commentStore.comment);
 	}
}

// СОХРАНЯЕМ ЗАДАЧУ 
function saveTask(name, comment) {

  if (localStorage.getItem('comments') === null) {
    let comments = [];
    comments.push(commentStore);
    localStorage.setItem('comments', JSON.stringify(comments));
  } 
  else {
    let comments = JSON.parse(localStorage.getItem('comments'));
    comments.push(commentStore);
    localStorage.setItem('comments', JSON.stringify(comments));
  }
 
  getTasks();	

  // Возвращает начальное состояние формы
  let form =  document.getElementById('mainForm');
  form.reset();
}
 
//УДАЛЯЕМ ЗАПИСИ 
function deleteComment(title) {
 
  let comments = JSON.parse(localStorage.getItem('comments'));
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].name == title) {
      comments.splice(i, 1);
    }
  }
 
  localStorage.setItem('comments', JSON.stringify(comments));
  getTasks();
}

//ВЫВОДИМ КОММЕНТАРИИ
function getTasks() {
 
  let comments = JSON.parse(localStorage.getItem('comments'));
  let commentsView = document.getElementById('comments');

  commentsView.innerHTML = '';
 
  for (let i = 0; i < comments.length; i++) {

    let name = comments[i].name;
    let comment = comments[i].comment;
 
    commentsView.innerHTML +=
      `<div class="comment-block">
            <p>${name} <span onclick="deleteComment('${name}')">Удалить запись</span></p>
            <hr>
            <p>${comment}</p>
      </div>`;
  }
}

