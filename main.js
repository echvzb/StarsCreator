let height = 0;
let width = 0;
let svg = null;

function setup(e) {
	height = document.body.clientHeight;
	width = document.body.clientWidth;
	document.querySelector(
		"body"
	).innerHTML = `<svg width="${width}" height="${height}"></svg>`;
	svg = document.querySelector("svg");
	const starCoef = 50;

	const stars = Math.round((height / starCoef) * (width / starCoef));

	for (let i = 0; i < stars; i++) {
		let star = new Star(i);
		star.activate();
	}
}

window.addEventListener("resize", setup);

function render(child) {
	svg.innerHTML += child;
}

const xCoord = () => Math.random() * width;
const yCoord = () => Math.random() * height;
const setRadius = () => Math.random() * (radius.max - radius.min) + radius.min;

const radius = { max: 3, min: 1 };
const time = { max: 2000, min: 1000 };

class Star {
	constructor(id) {
		this.id = id;
		render(
			`<circle id="${id}" r="${setRadius()}" cx="${xCoord()}" cy="${yCoord()}"></circle>`
		);
	}
	setCoords() {
		let node = document.getElementById(this.id);
		node.setAttribute("cx", xCoord());
		node.setAttribute("cy", yCoord());
		node.setAttribute("r", setRadius());
		if (Math.random() >= 0.5) {
			node.classList.toggle("on");
		}else{
			node.classList.toggle('off');
		}
	}
	activate() {
		setTimeout(() => {
			this.setCoords();
			this.activate();
		}, Math.random() * (time.max - time.min) + time.min);
	}
}
setup();
