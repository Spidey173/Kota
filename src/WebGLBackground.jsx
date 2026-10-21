import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const perlinNoiseGLSL = `
// Classic Perlin 2D Noise by Stefan Gustavson
vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float cnoise21(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
`;

const DotScreenShader = {
  name: 'DotScreenShader',
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseEffect: { value: 0.1 },
    uAmount: { value: 0.15 },
    uVelocity: { value: 0 },
    tDiffuse: { value: null },
    tSize: { value: new THREE.Vector2(256, 256) },
    center: { value: new THREE.Vector2(0.5, 0.5) },
    angle: { value: 1.57 },
    scale: { value: 1 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec2 center;
    uniform float angle;
    uniform float scale;
    uniform float uTime;
    uniform float uAmount;
    uniform vec2 uMouse;
    uniform float uMouseEffect;
    uniform float uVelocity;
    uniform vec2 tSize;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    varying vec3 vPosition;

    ${perlinNoiseGLSL}

    void main() {
      vec2 newUv = vUv;
      vec2 p = 2.0 * vUv - vec2(1.0);
      float uRandom = 0.523;
      p += 0.3 * uRandom * cos(2.0 * (p.yx * uRandom) + uTime);
      p += 0.4 * uRandom * cos(5.0 * (p.xy * uRandom) + 1.5 * uTime);
      p += 0.2 * uRandom * cos(3.7 * p.yx + 2.5 * uTime);
      p += 0.2 * cos(7.0 * p.yx + 0.5 * uTime);

      vec2 centredUv = 2.0 * vUv - vec2(1.0);
      newUv = vUv + centredUv * vec2(1.0, 1.0);

      newUv.x = mix(vUv.x, length(p), uAmount);
      newUv.y = mix(vUv.y, 0.0, uAmount);

      vec4 color = texture2D(tDiffuse, newUv);
      gl_FragColor = vec4(color.xyz, 1.0);
    }
  `,
};

const MeshVertexShader = `
varying vec2 uPos;
varying vec2 vUv;
uniform vec2 uRayMouse;
uniform float uMouseEffect;
uniform float uRatio;
float uTrailWidth = 0.32; 
float PI = 3.141592653589793;

void main() {
    vUv = uv;
    vec2 direction = normalize(position.xy - uRayMouse);
    float distanceToMouse = length(position.xy - uRayMouse);
    float falloff = smoothstep(0.0, uTrailWidth, distanceToMouse);
    float displacement = uMouseEffect * 0.12 * falloff;
    vec3 newPosition = vec3(position.xy - direction * displacement / 2.0, position.z);
    uPos = direction * displacement * 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const MeshFragmentShader = `
uniform float uTime;
uniform vec2 uRayMouse;
uniform float uMouseEffect;
uniform float uNoiseAmount;
uniform float uAmount;
uniform float uPow;
uniform float uAlpha;
varying vec2 vUv;
varying vec2 uPos;
uniform vec3 uColor[6];
float PI = 3.141592653589793;

${perlinNoiseGLSL}

void main() {
  vec3 firstColor = uColor[0];
  vec2 seed = (vUv * -uPos) * mix(vUv, uPos, 30.0 * uAmount);
  
  float ml = pow(6.0, 0.5) * -0.01;
  float n = cnoise21(seed) + 1.0 * uTime;
  vec3 color = mix(firstColor, firstColor, cnoise21(seed) / 1000.0);

  for (int i = 1; i < 5; i++) {
    float amount = (float(i) + 1.0) * 0.09;
    float n2 = smoothstep(amount * uTime + ml, amount * uTime + ml + amount * uTime, n * uTime);
    color = mix(color, uColor[i], n2);
  }

  float alpha = uAlpha * pow(sin(vUv.x * PI), uPow);
  alpha *= pow((sin(vUv.y * PI)), uPow);
  gl_FragColor = vec4(color, alpha);
}
`;

const VARIATIONS = [
  { nr: 1, mouseEffect: 1, distortionAmount: 0.15, shapeAmount: 0.2, noiseOpacity: 0.2, widthMultiplier: 0.6, heightMultiplier: 2, position: { x: -0.1, y: 0.3 }, rotation: 0.7, speedMultiplier: 1, timeStart: 0, background: 0xFAF5ED },
  { nr: 2, mouseEffect: 1, distortionAmount: 0.15, shapeAmount: 0.15, noiseOpacity: 0.2, widthMultiplier: 0.4, heightMultiplier: 2, position: { x: -0.1, y: 0.3 }, rotation: 2.7, speedMultiplier: 1, timeStart: 100, background: 0xFAF5ED },
  { nr: 3, mouseEffect: 1, distortionAmount: 0.15, shapeAmount: 0.25, noiseOpacity: 0.2, widthMultiplier: 0.5, heightMultiplier: 2, position: { x: -0.2, y: 0.3 }, rotation: 2.5, speedMultiplier: 1, timeStart: 100, background: 0xFAF5ED },
  { nr: 4, mouseEffect: 1, distortionAmount: 0.15, shapeAmount: 0.25, noiseOpacity: 0.2, widthMultiplier: 0.6, heightMultiplier: 2, position: { x: 0.2, y: 0 }, rotation: 3.5, speedMultiplier: 1, timeStart: -100, background: 0xFAF5ED },
  { nr: 5, mouseEffect: 1, distortionAmount: 0.15, shapeAmount: 0.25, noiseOpacity: 0.2, widthMultiplier: 0.5, heightMultiplier: 1.9, position: { x: -0.3, y: 0.3 }, rotation: 1.1, speedMultiplier: 1, timeStart: -100, background: 0xFAF5ED },
  { nr: 6, mouseEffect: 1, distortionAmount: 0.15, shapeAmount: 0.25, noiseOpacity: 0.2, widthMultiplier: 0.3, heightMultiplier: 2, position: { x: 0.05, y: -0.1 }, rotation: 4.7, speedMultiplier: 1, timeStart: -100, background: 0x000000 },
];

const COLOR_STOPS = [
  "#FAF5ED", // Warm ivory background
  "#71D9E9", // Sky cyan (exact Kota hex)
  "#8c3dd0", // Vivid purple (exact Kota hex)
  "#D03F83", // Rose magenta (exact Kota hex)
  "#F43FF9", // Neon fuchsia (exact Kota hex)
  "#8c3dd0", // Purple (exact Kota hex)
].map(c => new THREE.Color(c));

class WebGLScene {
  constructor(options) {
    this.container = options.dom;
    this.darkBackground = options.darkBackground || false;
    this.scrollTriggerOpacity = options.scrollTriggerOpacity ?? 0;
    const varIdx = Number(this.container.dataset.background) || 0;
    this.activeBackground = VARIATIONS[varIdx] || VARIATIONS[0];

    this.width = this.container.offsetWidth || window.innerWidth;
    this.height = this.container.offsetHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.darkBackground ? 0x000000 : 0xFAF5ED, 1);
    if (this.darkBackground) {
      this.scene.background = new THREE.Color(0x000000);
    }
    this.container.appendChild(this.renderer.domElement);

    this.positionZ = 4000;
    this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 10, 10000);
    this.camera.position.z = this.positionZ;
    this.camera.aspect = this.width / this.height;
    this.camera.fov = 2 * Math.atan(this.height / 2 / this.positionZ) * 180 / Math.PI;
    this.camera.updateProjectionMatrix();

    this.time = this.activeBackground.timeStart;
    this.uTime = 0.1;
    this.reverseUTime = false;
    this.uMouse = new THREE.Vector2(0, 0);
    this.rayMouse = new THREE.Vector2(-0.35, -0.28);
    this.allowRayMouse = false;
    this.raycaster = new THREE.Raycaster();
    this.isPlaying = true;

    this.settings = {
      mouseEffect: this.activeBackground.mouseEffect,
      distortionAmount: this.activeBackground.distortionAmount,
      shapeAmount: this.activeBackground.shapeAmount,
      rotation: this.activeBackground.rotation,
      speedMultiplier: this.activeBackground.speedMultiplier,
    };

    this.initPostProcessing();
    this.addObjects();
    this.resize();
    this.setupResize();
    this.render();
  }

  initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.effect1 = new ShaderPass(DotScreenShader);
    this.effect1.uniforms.uAmount.value = this.settings.distortionAmount;
    this.effect1.uniforms.uMouseEffect.value = this.settings.mouseEffect;
    this.composer.addPass(this.effect1);
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNoiseAmount: { value: 0 },
        uRayMouse: { value: this.rayMouse },
        uAmount: { value: this.activeBackground.shapeAmount },
        uPow: { value: 1.5 },
        uAlpha: { value: 1 },
        uColor: { value: COLOR_STOPS },
        uMouseEffect: { value: this.activeBackground.mouseEffect },
        uVelocity: { value: 0 },
        uRatio: { value: 1 },
      },
      side: THREE.DoubleSide,
      transparent: true,
      vertexShader: MeshVertexShader,
      fragmentShader: MeshFragmentShader,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 128, 128);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.camera.rotation.z = this.activeBackground.rotation;
    this.initResponsivePositioning();
    this.scene.add(this.plane);
  }

  initResponsivePositioning() {
    if (!this.plane) return;
    this.plane.scale.x = this.activeBackground.widthMultiplier * this.width;
    this.plane.scale.y = this.activeBackground.heightMultiplier * (1.25 * this.height);
    this.plane.scale.z = this.activeBackground.widthMultiplier * this.width;
    this.camera.position.x = this.activeBackground.position.x * this.width;
    this.camera.position.y = -this.activeBackground.position.y * this.height;
    if (this.plane.material && this.plane.material.uniforms) {
      this.plane.material.uniforms.uRatio.value = this.plane.scale.x / this.plane.scale.y;
    }
  }

  setupResize() {
    this._onResize = this.resize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  resize() {
    this.width = this.container.offsetWidth || window.innerWidth;
    this.height = this.container.offsetHeight || window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.fov = 2 * Math.atan(this.height / 2 / this.positionZ) * 180 / Math.PI;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    if (this.composer) this.composer.setSize(this.width, this.height);
    this.initResponsivePositioning();
  }

  animateIn(duration = 2, delay = 0.1) {
    gsap.to(this.material.uniforms.uPow, { value: 1.5, duration, delay, ease: 'power4.out' });
    gsap.to(this.material.uniforms.uAlpha, { value: 1, duration, delay, ease: 'power4.out' });
  }

  animateOut(duration = 2, delay = 0.1) {
    gsap.to(this.material.uniforms.uPow, { value: 3, duration, delay, ease: 'power4.out' });
    gsap.to(this.material.uniforms.uAlpha, { value: 0, duration, delay, ease: 'power4.out' });
  }

  setScrollTrigger(triggerEl, scrollTarget, variation) {
    if (this.darkBackground || variation === 4) {
      // Dark WebGL background: stays hidden until dark #carousel section
      gsap.set(this.container, { opacity: 0 });
      if (scrollTarget) {
        ScrollTrigger.create({
          trigger: scrollTarget,
          start: 'top 70%',
          onEnter: () => gsap.to(this.container, { opacity: 1, duration: 0.8, overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(this.container, { opacity: 0, duration: 0.8, overwrite: 'auto' }),
        });
      }
    } else {
      // Light WebGL background:
      // Slightly lowers opacity when scrolling down from Hero, stays visible through Approach
      // and Services (all the way through "Growth marketing"), and only fades out at #carousel.
      const targetOp = (this.scrollTriggerOpacity !== undefined && this.scrollTriggerOpacity !== null && this.scrollTriggerOpacity > 0)
        ? this.scrollTriggerOpacity
        : 0.58;

      // 1. Softly lower opacity from 1.0 to targetOp as user scrolls past hero
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: () => '+=' + Math.min(window.innerHeight * 0.75, 600),
        id: 'HeroScrollTrigger',
        onUpdate: (self) => {
          let op = 1 - self.progress * (1 - targetOp);
          op = Math.max(targetOp, Math.min(op, 1));
          gsap.set(this.container, { opacity: op, overwrite: 'auto' });
        },
      });

      // 2. Fades out only when entering the dark #carousel section
      if (scrollTarget) {
        ScrollTrigger.create({
          trigger: scrollTarget,
          start: 'top 70%',
          onEnter: () => gsap.to(this.container, { opacity: 0, duration: 0.8, overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(this.container, { opacity: targetOp, duration: 0.8, overwrite: 'auto' }),
        });
      }
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.015;
    if (this.reverseUTime) {
      this.uTime -= 0.0018;
      if (this.uTime < 0.1) this.reverseUTime = false;
    } else {
      this.uTime += 0.0018;
      if (this.uTime > 0.5) this.reverseUTime = true;
    }

    // Continuous automatic undulating fluid wave (completely independent of cursor movement)
    const wt = this.time * 0.65;
    const waveX = -0.35 + Math.sin(wt * 0.75) * 0.3 + Math.cos(wt * 0.32) * 0.14;
    const waveY = -0.28 + Math.cos(wt * 0.65) * 0.3 + Math.sin(wt * 0.38) * 0.14;
    this.rayMouse.set(waveX, waveY);

    this.uMouse.set(
      Math.sin(wt * 0.5) * 0.18,
      Math.cos(wt * 0.42) * 0.18
    );

    if (this.material && this.material.uniforms) {
      this.material.uniforms.uTime.value = this.uTime;
      this.material.uniforms.uRayMouse.value = this.rayMouse;
    }
    if (this.effect1 && this.effect1.uniforms) {
      this.effect1.uniforms.uMouse.value = this.uMouse;
      this.effect1.uniforms.uTime.value = this.time * this.settings.speedMultiplier;
    }

    this.composer.render();
    this._raf = requestAnimationFrame(this.render.bind(this));
  }

  destroy() {
    this.isPlaying = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._onResize) window.removeEventListener('resize', this._onResize);
    if (this.plane) {
      this.plane.geometry.dispose();
      this.plane.material.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
      if (this.container && this.container.contains(this.renderer.domElement)) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
  }
}

export function WebGLBackground({
  scrollTrigger = false,
  scrollTarget = '',
  scrollTriggerOpacity = 0,
  variation = 3,
  darkBackground = false,
  position = 'fixed',
  noise = true,
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let scene = null;
    try {
      scene = new WebGLScene({
        dom: el,
        darkBackground,
        scrollTriggerOpacity,
      });
      scene.animateIn(2, 0.5);

      if (scrollTrigger) {
        scene.setScrollTrigger(el, scrollTarget, variation);
      }
    } catch (err) {
      console.warn('WebGLBackground: WebGL is not supported or failed to initialize, falling back gracefully.', err);
    }

    return () => {
      if (scene) {
        scene.destroy();
      }
    };
  }, [variation, darkBackground, scrollTrigger, scrollTarget, scrollTriggerOpacity]);

  return (
    <div
      ref={containerRef}
      className="webgl-background_container__Ojc1v"
      data-background={variation}
      data-dark-background={darkBackground ? 'true' : 'false'}
      data-position={position}
      data-noise={noise ? 'true' : 'false'}
    />
  );
}

export default WebGLBackground;
