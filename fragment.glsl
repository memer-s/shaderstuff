export default `

uniform sampler2D texture1;
uniform float time;
varying vec3 vPos;
varying vec2 vUv;
float x;
float z;

void main() {
	// gl_FragColor = vec4(abs(sin(y)), 0.2, 0.5, 1.0);
	// x = 1.0*time+vPos.z+2.0+vPos.x;
	// z = 1.1*time+2.0+vPos.z+0.3*vPos.x;
	gl_FragColor = texture2D(texture1, vUv);
	// gl_FragColor = vec4(0.1, 0.3, sin(pow(mod(x,3.07)*0.1+0.9, 2.0))/2.0+sin(pow(mod(z,3.07)*0.1+0.9, 1.0))/2.0, 0.4);
	// gl_FragColor = vec4(0.1,0.1,0.1,1);
}

`