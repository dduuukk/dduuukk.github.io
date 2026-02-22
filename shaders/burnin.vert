#version 300 es

in vec2 a_pos;
in vec2 a_uv;

out vec2 qt_TexCoord0;

void main() {
    qt_TexCoord0 = a_uv;
    gl_Position  = vec4(a_pos, 0.0, 1.0);
}
