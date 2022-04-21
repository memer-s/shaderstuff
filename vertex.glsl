export default `


uniform float time;
float PI = 3.1415629;
varying float y;

float waveY() {
	return sin(time+(position.x+position.z)*0.1)*0.5+0.5; // returns value in range (0<=y<=1)
	// return sin(position.x+time)+sin(position.z+time)+cos(position.z+position.x+(time*0.34));
}

vec4 cool(float yVal) {
	return vec4(
		position.x,
		yVal,
		position.z,
	1.0);
}

void main() {
	y = waveY();
	gl_Position = projectionMatrix * modelViewMatrix * cool(y*3.0);
}

`
