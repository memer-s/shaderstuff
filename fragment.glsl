export default `

uniform float time;
varying float y;

void main() {
	// gl_FragColor = vec4(abs(sin(y)), 0.2, 0.5, 1.0);
	gl_FragColor = vec4(abs(sin(y)), 0, 1, 1.0);
}

`