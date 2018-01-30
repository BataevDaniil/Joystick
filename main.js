var test1;

//==============================================================================

function setup()
{
	var win = createCanvas(700,100);
	win.id("win")

	var Circle = function(XDefault, YDefault, maxActionCircle, diameter)
	{
		this.XDefault = XDefault;
		this.YDefault = YDefault;
		this.maxActionCircle = maxActionCircle || 60;
		this.diameter = diameter || 30;
	};
	var elli = [new Circle(height/2, height/2), new Circle(width - height/2, height/2)];
	test1 = new joystick(elli);
	test1.add( new test1.Circle(width/2,height/2) );
	test1.rm(1);
};

//==============================================================================

function draw()
{
	background(color(200,200,200));

	test1.draw();
	console.log( degrees(test1.angle()[0]) );
};
//==============================================================================
var joystick = function(elli)
{
	this.elli = elli;
	this.action = [];
	this.elliX = [];
	this.elliY = [];
	for (var i = 0; i < this.elli.length; i++)
	{
		this.action[i] = false;
		this.elliX[i] = this.elli[i].XDefault;
		this.elliY[i] = this.elli[i].YDefault;
	}
	this.Circle = function(XDefault, YDefault, maxActionCircle, diameter)
	{
		this.XDefault = XDefault;
		this.YDefault = YDefault;
		this.maxActionCircle = maxActionCircle || 60;
		this.diameter = diameter || 30;
	};

	this.rm = function(index)
	{
		this.elli.splice(index, 1);
		this.action.splice(index, 1);
		this.elliX.splice(index, 1);
		this.elliY.splice(index, 1);
	}

	this.add = function(elli)
	{
		this.elli.push(elli);
		this.action.push(false);
		this.elliX.push(this.elli[this.elli.length-1].XDefault);
		this.elliY.push(this.elli[this.elli.length-1].YDefault);
	}

	this.speed = function()
	{
		var speed = [];
		for (var i = 0; i < this.elli.length; i++)
		{
			speed[i] = Math.sqrt(pow(this.elliX[i] - this.elli[i].XDefault, 2) + pow(this.elliY[i] - this.elli[i].YDefault, 2));
		}
		return speed;
	}

	this.angle = function()
	{
		var angle = [];
		for (var i = 0; i < this.elli.length; i++)
		{
			var sin = this.elli[i].YDefault - this.elliY[i];
			var cos =  this.elliX[i] - this.elli[i].XDefault;

			if (cos === 0)
				angle[i] = 0;
			else if ((sin > 0 && cos > 0) || (sin < 0 && cos > 0))
				angle[i] = Math.PI/2 - atan( sin / cos );
			else angle[i] = -Math.PI/2 - atan( sin / cos ) ;
		}
		return angle;
	}

	this.draw = function()
	{
		if (mouseIsPressed)
		{
			for (var i = 0; i < this.elli.length; i++)
			{
				if (this.action[i] || pow(mouseX - this.elliX[i], 2) + pow(mouseY - this.elliY[i], 2) < pow(this.elli[i].diameter/2, 2))
				{
					if ( pow(mouseX - this.elli[i].XDefault, 2) + pow(mouseY - this.elli[i].YDefault, 2) <= pow(this.elli[i].maxActionCircle, 2))
					{
						this.elliX[i] = mouseX;
						this.elliY[i] = mouseY;
					}
					else
					{
						var q = abs((mouseY - this.elli[i].YDefault) / (mouseX - this.elli[i].XDefault));
						this.elliX[i] = this.elli[i].maxActionCircle / Math.sqrt( 1+q*q );
						this.elliY[i] = this.elliX[i]*q;
						this.elliX[i] = (mouseX < this.elli[i].XDefault )?this.elli[i].XDefault - this.elliX[i]: this.elli[i].XDefault + this.elliX[i];
						this.elliY[i] = (mouseY < this.elli[i].YDefault )?this.elli[i].YDefault - this.elliY[i]: this.elli[i].YDefault + this.elliY[i];
					}
					this.action[i] = true;
				}
			}
		}
		else
		{
			for (var i = 0; i < this.elli.length; i++)
			{
				this.elliX[i] = this.elli[i].XDefault;
				this.elliY[i] = this.elli[i].YDefault;
				this.action[i] = false;
			}
		}

		noFill(0);
		stroke(0);
		for (var i = 0; i < this.elli.length; i++)
		{
			ellipse(this.elliX[i], this.elliY[i], this.elli[i].diameter);
			ellipse(this.elli[i].XDefault, this.elli[i].YDefault, this.elli[i].maxActionCircle*2);
		}
	}
}