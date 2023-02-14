
window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
	}, 500);
}
document.addEventListener('touchstart', haendleTouchStart, false);
document.addEventListener('touchmove', haendleTouchMove, false);

const mainList = document.querySelector('.first__nav')
const secondList = document.querySelector('.second__nav')
const logBlock = document.querySelector('.page')

let x1 = null;
let y1 = null;

function haendleTouchStart(event) {
	const firstTouch = event.touches[0];

	x1 = firstTouch.clientX;
	y1 = firstTouch.clientY;

}
function haendleTouchMove(event) {
	if (!x1 || !y1) {
		return false;
	}
	let x2 = event.touches[0].clientX;
	let y2 = event.touches[0].clientY;
	//console.log(x2, y2);
	let xDiff = x2 - x1;
	let yDiff = y2 - y1;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		//r - l
		if (xDiff > 0) console.log('right');
		else console.log('left');
	}
	else {
		if (yDiff > 0) {
			console.log('down');
			mainList.classList.add('first__nav_sticky');
		}
		else {
			console.log('top')
			mainList.classList.remove('first__nav_sticky');
		}
	}
	x1 = null;
	y1 = null;
}

window.addEventListener('scroll', function (e) {
	if (this.oldScroll > this.scrollY) {
		console.log('up');
		mainList.classList.add('first__nav_sticky');

	} else {
		console.log('down');
		mainList.classList.remove('first__nav_sticky');
	}
	this.oldScroll = this.scrollY;
}, false);


const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			console.log('bu');
			document.querySelectorAll('.second__link').forEach((link) => {
				if (link.getAttribute('href').replace('#', '') === entry.target.id) {
					link.scrollIntoView({
						inline: "center",
					})
					link.classList.add('second__link_activ')
				}
				else {
					link.classList.remove('second__link_activ')
				}
			})
		}
	});

}, {
	threshold: 0.5,
});

document.querySelectorAll('.page__blok').forEach(
	(section) => observer.observe(section),
);
document.querySelector('.second__list').addEventListener('click', (event) => {
	if (event.target.classList.contains('second__link')) {
		event.preventDefault();
		const id = event.target.getAttribute('href').replace('#', '')
		window.scrollTo({
			top: document.getElementById(id).offsetTop,
			behavior: 'smooth',
		})
	}
})
document.querySelector('.first__list').addEventListener('click', (event) => {
	if (event.target.classList.contains('first__link')) {
		event.preventDefault();
		const id = event.target.getAttribute('href').replace('#', '')
		window.scrollTo({
			top: document.getElementById(id).offsetTop,
			behavior: 'smooth',
		})
	}
})

// создаём модальное окно
const img = document.querySelectorAll('.cart__img')
img.forEach(element => {
	console.log(element)
	var modal = $modal({
		title: element.parentElement.previousElementSibling.firstElementChild.innerHTML,
		content: `  ${element.outerHTML} `,
		footerButtons: [
			{ class: 'btn btn__cancel', text: `${element.parentElement.previousElementSibling.childNodes[3].innerHTML}`, handler: 'modalHandlerCancel' }

		]




	});

	// при клике по кнопке #show-modal
	element.addEventListener('click', function () {
		// отобразим модальное окно
		modal.show();
	});
});
