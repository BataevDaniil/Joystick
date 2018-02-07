## About
Create joystick area action which limit ellips or square. All work on phone.

## Get started
Important create one block insede which element have class ```.icone```. This block
set width, height, color, border-radius etc. And necessary install jquery.

##### Example
```html
<div class="joystick">  
	<div class="icone"></div>
</div>
```
```sass
.joystick
	width: 200px
	height: 200px
	border-radius: 50%
	border: 5px solid black
	background: white
.icone
	width: 50px
	height: 50px
	border-radius: 50%
	background: #600
```
Create object clsss ```Joystick($(necessary selector to block element when will joystick))```
```typescript
	let joystick0 = new Joystick($('.joystick').eq(0));
```
Method angle class Joystick return angle turn a icone in radian but on img in degree
<img src="angle.png">

##### Options
Options in class joystick
```typescript
public radiusX:number;
public radiusY:number;
```
set radius ellipsa but default size joystick block
```typescript
object.mainAreaMovement = object.areaMovementEllipse;
object.mainAreaMovement = object.areaMovementSquare;
```
set movement on ellipse or square

## Build
```
npm i
gulp
```
## Project directory tree
```
src/
├── pug/
│	└── main.pug
├── sass/
│	└── main.scss
└── ts/
	└── main.ts
```

## Possible errors
[one error](https://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)

Solution
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
[two error](https://github.com/sindresorhus/gulp-autoprefixer/issues/83)

Solution: update nodejs and remove folder node_modules and again make ```npm install```