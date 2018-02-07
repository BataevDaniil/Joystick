class mousedragdrop{
	public press:boolean;
	public elementIcone;
	public grub;
	public mainAreaMovement;
	public mouseX:number;
	public mouseY:number;
	public element;
	constructor(element) {
		element.css('position', 'relative');

		this.elementIcone = element.children('.icone');
		this.elementIcone.css('position','absolute');
		this.press = false;
		this.mainAreaMovement = this.areaMovementSquare;

		this.elementIcone.on('mousedown', this.mousedownEvent);
		$(document).on('mouseup', this.mouseupEvent);
		$(document).on('mousemove', this.mousemoveEvent);

		this.elementIcone.on('touchstart', this.touchstartEvent);
		this.elementIcone.on('touchend', this.touchendEvent);
		this.elementIcone.on('touchmove', this.touchmoveEvent);
		this.element = element;
	}

	public mousedownEvent = (event) => {
		this.press = true;
		this.grub = {left : event.pageX - this.elementIcone.offset().left,
			    top : event.pageY - this.elementIcone.offset().top};
	};

	public touchstartEvent = (event) => {
		this.press = true;
		let eventTuouch = event.changedTouches[0];
		this.grub = {left : eventTuouch.pageX - this.elementIcone.offset().left,
			top : eventTuouch.pageY - this.elementIcone.offset().top};
		event.preventDefault();
	};

	public mouseupEvent = () => {
		this.press = false;
	};

	public touchendEvent = (event) => {
		this.press = false;
		event.preventDefault();
	};

	public mousemoveEvent = (event) => {
		if (this.press) {
			this.mainAreaMovement(event);
		}
		event.preventDefault();
	};
	public touchmoveEvent = (event) => {
		if (this.press) {
			this.mainAreaMovement(event.changedTouches[0]);
		}
	};

	public areaMovementSquare(event) {
		this.mouseX = event.pageX;
		this.mouseY = event.pageY;
		let maxShiftTop = this.element.height() - this.elementIcone.height();
		let maxShiftLeft = this.element.width() - this.elementIcone.width();

		let shiftLeft:number = event.pageX - this.element.offset().left - this.grub.left;
		let shiftTop:number = event.pageY - this.element.offset().top - this.grub.top;

		if (shiftLeft > 0)
			if (shiftTop < maxShiftTop)
				if (shiftLeft < maxShiftLeft)
					if (shiftTop > 0)
					//move inside
						this.elementIcone.css('left', shiftLeft)
							.css('top', shiftTop);
					else {
						//top line move
						if (0 < shiftLeft && shiftLeft < maxShiftLeft)
							this.elementIcone.css('left', shiftLeft)
								.css('top', 0);
					}
				else {
					//right line move
					if (0 < shiftTop && shiftTop < maxShiftTop)
						this.elementIcone.css('left', maxShiftLeft)
							.css('top', shiftTop);
				}
			else {
				//bottom line move
				if (0 < shiftLeft && shiftLeft < maxShiftLeft)
					this.elementIcone.css('left', shiftLeft)
						.css('top', maxShiftTop);
			}
		else {
			//left line move
			if (0 < shiftTop && shiftTop < maxShiftTop)
				this.elementIcone.css('left', 0)
					.css('top', shiftTop);
		}

		//left top angle
		if (shiftLeft < 0 && shiftTop < 0)
			this.elementIcone.css('left', 0)
				.css('top', 0);
		//right top angle
		else if (shiftLeft > maxShiftLeft && shiftTop < 0)
			this.elementIcone.css('left', maxShiftLeft)
				.css('top', 0);
		//right bottom angle
		else if (shiftLeft > maxShiftLeft && shiftTop > maxShiftTop)
			this.elementIcone.css('left', maxShiftLeft)
				.css('top', maxShiftTop);
		//left bottom angle
		else if (shiftLeft < 0 && shiftTop > maxShiftTop)
			this.elementIcone.css('left', 0)
				.css('top', maxShiftTop);
	};
}

class Joystick extends mousedragdrop {
	public radiusX:number;
	public radiusY:number;

	constructor(selector) {
		super(selector);
		$(document).on('mouseup', this.defaultPos);
		this.elementIcone.on('touchend', this.defaultPos);
		this.defaultPos();
		this.mainAreaMovement = this.areaMovementEllipse;
		this.radiusX = this.element.width()/2;
		this.radiusY = this.element.height()/2
	}

	public defaultPos = () => {
		this.elementIcone.css('left', this.element.width()/2 - this.elementIcone.width()/2)
			.css('top', this.element.height()/2 - this.elementIcone.height()/2);
	};

	public angle = () => {
		let sin:number = this.element.height()/2 + this.element.offset().top - this.mouseY;
		let cos:number = this.mouseX - this.element.width()/2 - this.element.offset().left ;

		let ang:number;
		if (cos === 0)
			ang = 0;
		else if ((sin > 0 && cos > 0) || (sin < 0 && cos > 0))
			ang = Math.PI/2 - Math.atan( sin / cos );
		else ang = -Math.PI/2 - Math.atan( sin / cos );
		return ang;
	};

	public radianToDegree(rad: number):number {
		return rad / (Math.PI / 180);
	}

	public areaMovementEllipse(event) {
		this.mouseX = event.pageX;
		this.mouseY = event.pageY;

		let shiftLeft:number = event.pageX - this.element.offset().left - this.grub.left;
		let shiftTop:number = event.pageY - this.element.offset().top - this.grub.top;
		let x_0:number = this.element.offset().left + this.element.width()/2;
		let x:number = event.pageX;
		let y_0:number = this.element.offset().top + this.element.height()/2;
		let y:number = event.pageY;

		if ((x - x_0)*(x - x_0)/(this.radiusX*this.radiusX) +
			(y - y_0)*(y - y_0)/(this.radiusY*this.radiusY) <= 1)
			this.elementIcone.css('left', shiftLeft)
				.css('top', shiftTop);
		else {
			let sin:number = this.mouseY - this.element.height()/2 - this.element.offset().top;
			let cos:number = this.mouseX - this.element.width()/2 - this.element.offset().left;
			let length:number = Math.sqrt(sin*sin + cos*cos);
			sin /= length;
			cos /= length;
			this.elementIcone.css('left',cos*this.radiusX + this.element.width()/2 - this.elementIcone.width()/2)
				.css('top', sin*this.radiusY + this.element.height()/2 - this.elementIcone.height()/2);
			console.log(sin*this.radiusY);
		}
	}
}

$(function () {
	let joystick0 = new Joystick($('.joystick').eq(0));
	let joystick1 = new Joystick($('.joystick').eq(1));
	let joystick2 = new Joystick($('.joystick').eq(2));
	$(document).on('mousemove', joystick0.angle);
	$(document).on('mousemove', joystick1.angle);
	$(document).on('mousemove', joystick2.angle);
});