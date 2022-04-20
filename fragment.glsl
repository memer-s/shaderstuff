uniform float time;
varying vec3 vPosition;

void main() {
	gl_FragColor = vec4(sin(0.3+time*0.1), 0.2, 0.5, 1.0);
}