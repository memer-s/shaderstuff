uniform float time;

float PI = 3.1415629;
varying vec3 vPosition;

vec4 cool() {
	return vec4(
		position.x,
		floor(10.0*sin(position.x+time)+7.5*sin(position.z+time)),
		position.z,
	1.0);
}

void main() {
	gl_Position = projectionMatrix * modelViewMatrix * cool();
	vPosition = position;
}