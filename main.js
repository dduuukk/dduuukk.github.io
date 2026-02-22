const W = 800, H = 400;
const canvas = document.getElementById('output');
const gl = canvas.getContext('webgl2');

const vertSrc = await fetch('shaders/burnin.vert').then(r => r.text());
const fragSrc = await fetch('shaders/burnin.frag').then(r => r.text());

const BLIT_VERT = `#version 300 es
  in vec2 a_pos; in vec2 a_uv; out vec2 v_uv;
  void main(){ v_uv = a_uv; gl_Position = vec4(a_pos, 0.0, 1.0); }`;
const BLIT_FRAG = `#version 300 es
  precision mediump float;
  in vec2 v_uv; out vec4 fragColor;
  uniform sampler2D u_tex;
  void main(){ fragColor = vec4(texture(u_tex, v_uv).rgb, 1.0); }`;

// ── Compile + link ─────────────────────────────────────────────
function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s));
  return s;
}

function linkProgram(vSrc, fSrc) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl.VERTEX_SHADER,   vSrc));
  gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fSrc));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(p));
  return p;
}

const progBurnin = linkProgram(vertSrc, fragSrc);
const progBlit   = linkProgram(BLIT_VERT, BLIT_FRAG);

// ── Full-screen quad ───────────────────────────────────────────
// Standard UVs — 0,0 bottom-left, 1,1 top-right (GL convention).
// srcTex is flipped on upload to match, so everything stays consistent.
const quadVerts = new Float32Array([
  -1,-1, 0,0,   1,-1, 1,0,   -1,1, 0,1,
   1,-1, 1,0,   1, 1, 1,1,   -1,1, 0,1,
]);
const quadBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

function bindQuad(prog) {
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  const STRIDE = 4 * 4;
  const posLoc = gl.getAttribLocation(prog, 'a_pos');
  const uvLoc  = gl.getAttribLocation(prog, 'a_uv');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, STRIDE, 0);
  if (uvLoc >= 0) {
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, STRIDE, 2 * 4);
  }
}

// ── FBO factory ────────────────────────────────────────────────
function makeFBO(w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { tex, fb };
}

// ── Texture bind helper ────────────────────────────────────────
function setTex(prog, name, unit, tex) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.uniform1i(gl.getUniformLocation(prog, name), unit);
}

// ── Allocate GPU resources ─────────────────────────────────────
let fboA = makeFBO(W, H), fboB = makeFBO(W, H);
let histRead = fboA, histWrite = fboB;

const srcTex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, srcTex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// ── 2D source canvas ───────────────────────────────────────────
const src = document.createElement('canvas');
src.width = W; src.height = H;
const ctx = src.getContext('2d');
let text = '', cursorOn = true;
setInterval(() => { cursorOn = !cursorOn; }, 530);

function drawSource() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle    = '#ffb347';
  ctx.font         = '18px monospace';
  ctx.textBaseline = 'top';
  ctx.fillText(text + (cursorOn ? '▌' : ' '), 16, 16);
}

// ── Uniform state ──────────────────────────────────────────────
const t0  = performance.now();
const now = () => (performance.now() - t0) / 1000;

// Both start at the same value.
// Each frame: prev = last frame's "now", burnIn = this frame's "now".
// Delta = one frametime (~0.016s at 60fps).
// burnInTime scales that into a per-frame decay amount.
let burnInLastUpdate = now();
let prevLastUpdate   = now();
let burnInTime       = 1.5;
let qt_Opacity       = 1.0;

// ── Render loop ────────────────────────────────────────────────
function render() {
  // Advance the per-frame delta — prev gets last frame's timestamp,
  // burnIn gets this frame's. The shader sees a delta of ~one frametime.
  prevLastUpdate   = burnInLastUpdate;
  burnInLastUpdate = now();

  // 1. Draw text to CPU canvas
  drawSource();

  // 2. Upload canvas → GPU texture, flipping Y so GL-space and
  //    canvas-space agree on which end is "up".
  gl.bindTexture(gl.TEXTURE_2D, srcTex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

  // 3. Burnin pass → histWrite FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, histWrite.fb);
  gl.viewport(0, 0, W, H);
  gl.useProgram(progBurnin);
  bindQuad(progBurnin);
  setTex(progBurnin, 'txt_source',   0, srcTex);
  setTex(progBurnin, 'burnInSource', 1, histRead.tex);
  gl.uniform1f(gl.getUniformLocation(progBurnin, 'burnInLastUpdate'), burnInLastUpdate);
  gl.uniform1f(gl.getUniformLocation(progBurnin, 'burnInTime'),       burnInTime);
  gl.uniform1f(gl.getUniformLocation(progBurnin, 'prevLastUpdate'),   prevLastUpdate);
  gl.uniform1f(gl.getUniformLocation(progBurnin, 'qt_Opacity'),       qt_Opacity);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // 4. Ping-pong: what we just wrote becomes the history for next frame
  [histRead, histWrite] = [histWrite, histRead];

  // 5. Blit → screen
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, W, H);
  gl.useProgram(progBlit);
  bindQuad(progBlit);
  setTex(progBlit, 'u_tex', 0, histRead.tex);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(render);
}

// ── Input ──────────────────────────────────────────────────────
canvas.addEventListener('keydown', e => {
  e.preventDefault();
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Backspace')   text = text.slice(0, -1);
  else if (e.key.length === 1) text += e.key;
});

canvas.addEventListener('click', () => canvas.focus());
canvas.focus();

render();
