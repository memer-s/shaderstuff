export default `


uniform float time;
float PI = 3.1415629;
varying vec3 vPos;
float y;
varying vec2 vUv;

float waveY() {
	return 
	sin(
		time+(position.x+position.z*1.44)*0.13
	)*0.5+0.5; // returns value in range (0<=y<=1)
	// return sin(position.x+time)+sin(position.z+time)+cos(position.z+position.x+(time*0.34));
}

vec4 cool(float yVal) {
	return vec4(
		position.x,
		yVal*1.0+position.y,
		position.z,
	1.0);
}

void main() {
	vUv = uv;
	y = waveY();
	vPos = position;
	gl_Position = projectionMatrix * modelViewMatrix * cool(y*3.0);
	// gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}

`
