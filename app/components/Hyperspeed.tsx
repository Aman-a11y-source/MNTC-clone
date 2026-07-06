"use client";

import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hyperspeed.css';

/* ─── Inlined fog GLSL (avoids THREE.ShaderChunk version issues) ─── */
const FOG_PARS_VERTEX   = `varying float vFogDepth;`;
const FOG_VERTEX        = `vFogDepth = -mvPosition.z;`;
const FOG_PARS_FRAGMENT = `
  uniform vec3  fogColor;
  uniform float fogNear;
  uniform float fogFar;
  varying float vFogDepth;
`;
const FOG_FRAGMENT = `
  float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
`;

/* ─── Default options ─────────────────────────────────────────────── */
const DEFAULT_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
};

const Hyperspeed = ({ effectOptions = {} }) => {
  const containerRef = useRef(null);
  const appRef      = useRef(null);

  useEffect(() => {
    /* ── helpers ────────────────────────────────────────────── */
    const rand    = b => Array.isArray(b) ? Math.random() * (b[1] - b[0]) + b[0] : Math.random() * b;
    const pick    = a => Array.isArray(a) ? a[Math.floor(Math.random() * a.length)] : a;
    const lerp    = (cur, tgt, spd = 0.1, lim = 0.001) => {
      const d = (tgt - cur) * spd;
      return Math.abs(d) < lim ? tgt - cur : d;
    };
    const nsin    = v => Math.sin(v) * 0.5 + 0.5;

    /* ── distortion uniforms & presets ─────────────────────── */
    const turbUni = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp:  { value: new THREE.Vector4(25, 5, 10, 10) },
    };

    const distortions = {
      turbulentDistortion: {
        uniforms: turbUni,
        getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float hs(float v){ return sin(v)*0.5+0.5; }
          #define PI 3.14159265358979
          float gdX(float p){
            return cos(PI*p*uFreq.r+uTime)*uAmp.r
                 + pow(cos(PI*p*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g;
          }
          float gdY(float p){
            return -hs(PI*p*uFreq.b+uTime)*uAmp.b
                   -pow(hs(PI*p*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a;
          }
          vec3 getDistortion(float progress){
            return vec3(
              gdX(progress)-gdX(0.0125),
              gdY(progress)-gdY(0.0125),
              0.0
            );
          }
        `,
        getJS: (progress, time) => {
          const f = turbUni.uFreq.value, a = turbUni.uAmp.value;
          const gx = p => Math.cos(Math.PI*p*f.x+time)*a.x + Math.pow(Math.cos(Math.PI*p*f.y+time*(f.y/f.x)),2)*a.y;
          const gy = p => -nsin(Math.PI*p*f.z+time)*a.z - Math.pow(nsin(Math.PI*p*f.w+time/(f.z/f.w)),5)*a.w;
          return new THREE.Vector3(gx(progress)-gx(progress+0.007), gy(progress)-gy(progress+0.007), 0)
            .multiply(new THREE.Vector3(-2,-5,0)).add(new THREE.Vector3(0,0,-10));
        },
      },
    };

    /* ── default straight-road distortion ──────────────────── */
    const straightDistortionUniforms = {
      uDistortionX: { value: new THREE.Vector2(80, 3) },
      uDistortionY: { value: new THREE.Vector2(-40, 2.5) },
    };
    const straightDistortionVertex = `
      #define PI 3.14159265358979
      uniform vec2 uDistortionX;
      uniform vec2 uDistortionY;
      float ns(float v){ return sin(v)*0.5+0.5; }
      vec3 getDistortion(float p){
        p = clamp(p,0.,1.);
        return vec3(
          uDistortionX.r * ns(p*PI*uDistortionX.g - PI/2.),
          uDistortionY.r * ns(p*PI*uDistortionY.g - PI/2.),
          0.
        );
      }
    `;

    /* ── shader sources ─────────────────────────────────────── */
    const carLightsVert = `
      ${FOG_PARS_VERTEX}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vColor;
      #include <getDistortion_vertex>
      void main(){
        vec3 t = position.xyz;
        float radius   = aMetrics.r;
        float myLength = aMetrics.g;
        float speed    = aMetrics.b;
        t.xy *= radius;
        t.z  *= myLength;
        t.z  += myLength - mod(uTime*speed + aOffset.z, uTravelLength);
        t.xy += aOffset.xy;
        float progress = abs(t.z / uTravelLength);
        t.xyz += getDistortion(progress);
        vec4 mvPosition = modelViewMatrix * vec4(t, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        vUv   = uv;
        vColor = aColor;
        ${FOG_VERTEX}
      }
    `;

    const carLightsFrag = `
      ${FOG_PARS_FRAGMENT}
      varying vec3 vColor;
      varying vec2 vUv;
      uniform vec2 uFade;
      void main(){
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(vColor, alpha);
        if(gl_FragColor.a < 0.0001) discard;
        ${FOG_FRAGMENT}
      }
    `;

    const sideSticksVert = `
      ${FOG_PARS_VERTEX}
      attribute float aOffset;
      attribute vec3  aColor;
      attribute vec2  aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotY(float a){
        return mat4(cos(a),0,sin(a),0, 0,1,0,0, -sin(a),0,cos(a),0, 0,0,0,1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 t = position.xyz;
        float w = aMetrics.x;
        float h = aMetrics.y;
        t.xy *= vec2(w, h);
        float time = mod(uTime*60.*2. + aOffset, uTravelLength);
        t = (rotY(3.14/2.) * vec4(t,1.)).xyz;
        t.z += -uTravelLength + time;
        float progress = abs(t.z / uTravelLength);
        t.xyz += getDistortion(progress);
        t.y += h/2.;
        t.x += -w/2.;
        vec4 mvPosition = modelViewMatrix * vec4(t,1.0);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${FOG_VERTEX}
      }
    `;

    const sideSticksFragSrc = `
      ${FOG_PARS_FRAGMENT}
      varying vec3 vColor;
      void main(){
        gl_FragColor = vec4(vColor, 1.0);
        ${FOG_FRAGMENT}
      }
    `;

    const roadVert = `
      ${FOG_PARS_VERTEX}
      uniform float uTime;
      uniform float uTravelLength;
      varying vec2 vUv;
      #include <getDistortion_vertex>
      void main(){
        vec3 t = position.xyz;
        vec3 dist = getDistortion((t.y + uTravelLength/2.) / uTravelLength);
        t.x +=  dist.x;
        t.z +=  dist.y;
        t.y += -dist.z;
        vec4 mvPosition = modelViewMatrix * vec4(t, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${FOG_VERTEX}
      }
    `;

    const roadMarkingsVars = `
      uniform float uLanes;
      uniform vec3  uBrokenLinesColor;
      uniform vec3  uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
    `;
    const roadMarkingsFrag = `
      uv.y = mod(uv.y + uTime*0.05, 1.0);
      float laneW   = 1.0 / uLanes;
      float brkW    = laneW * uBrokenLinesWidthPercentage;
      float emptyS  = 1.0 - uBrokenLinesLengthPercentage;
      float brk = step(1.0-brkW, fract(uv.x*2.0)) * step(emptyS, fract(uv.y*10.0));
      float side = step(1.0-brkW, fract((uv.x - laneW*(uLanes-1.0))*2.0)) + step(brkW, uv.x);
      brk = mix(brk, side, uv.x);
    `;

    const roadBaseFrag = `
      ${FOG_PARS_FRAGMENT}
      varying vec2  vUv;
      uniform vec3  uColor;
      uniform float uTime;
      ROAD_MARKINGS_VARS
      void main(){
        vec2  uv    = vUv;
        vec3  color = uColor;
        ROAD_MARKINGS_FRAG
        gl_FragColor = vec4(color, 1.0);
        ${FOG_FRAGMENT}
      }
    `;

    const islandFrag = roadBaseFrag
      .replace('ROAD_MARKINGS_VARS', '')
      .replace('ROAD_MARKINGS_FRAG', '');

    const roadFrag = roadBaseFrag
      .replace('ROAD_MARKINGS_VARS', roadMarkingsVars)
      .replace('ROAD_MARKINGS_FRAG', roadMarkingsFrag);

    /* ── geometry / material helpers ───────────────────────── */
    function makeMaterial(fragSrc, vertSrc, distortion, extraUniforms, transparent = false) {
      const mat = new THREE.ShaderMaterial({
        fragmentShader: fragSrc,
        vertexShader:   vertSrc,
        transparent,
        uniforms: Object.assign({}, extraUniforms),
      });
      mat.onBeforeCompile = shader => {
        shader.vertexShader = shader.vertexShader.replace(
          '#include <getDistortion_vertex>',
          distortion.getDistortion,
        );
      };
      return mat;
    }

    /* ── Road class ─────────────────────────────────────────── */
    class Road {
      constructor(webgl, opts) {
        this.webgl = webgl;
        this.opts  = opts;
        this.uTime = { value: 0 };
      }
      plane(side, isRoad) {
        const { opts, webgl } = this;
        const geo = new THREE.PlaneGeometry(
          isRoad ? opts.roadWidth : opts.islandWidth,
          opts.length, 20, 100,
        );
        let u = {
          uTravelLength: { value: opts.length },
          uColor:        { value: new THREE.Color(isRoad ? opts.colors.roadColor : opts.colors.islandColor) },
          uTime:         this.uTime,
          ...webgl.fogUniforms,
          ...opts.distortion.uniforms,
        };
        if (isRoad) Object.assign(u, {
          uLanes:                         { value: opts.lanesPerRoad },
          uBrokenLinesColor:              { value: new THREE.Color(opts.colors.brokenLines) },
          uShoulderLinesColor:            { value: new THREE.Color(opts.colors.shoulderLines) },
          uShoulderLinesWidthPercentage:  { value: opts.shoulderLinesWidthPercentage },
          uBrokenLinesLengthPercentage:   { value: opts.brokenLinesLengthPercentage },
          uBrokenLinesWidthPercentage:    { value: opts.brokenLinesWidthPercentage },
        });
        const mat = makeMaterial(isRoad ? roadFrag : islandFrag, roadVert, opts.distortion, u);
        mat.side = THREE.DoubleSide;
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -opts.length / 2;
        mesh.position.x = (opts.islandWidth / 2 + opts.roadWidth / 2) * side;
        webgl.scene.add(mesh);
        return mesh;
      }
      init() {
        this.left   = this.plane(-1, true);
        this.right  = this.plane(1,  true);
        this.island = this.plane(0,  false);
      }
      update(t) { this.uTime.value = t; }
    }

    /* ── CarLights class ────────────────────────────────────── */
    class CarLights {
      constructor(webgl, opts, colors, speed, fade) {
        this.webgl = webgl; this.opts = opts;
        this.colors = colors; this.speed = speed; this.fade = fade;
      }
      init() {
        const { opts, webgl } = this;
        const curve = new THREE.LineCurve3(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1));
        const geo   = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        const inst  = new THREE.InstancedBufferGeometry().copy(geo);
        inst.instanceCount = opts.lightPairsPerRoadWay * 2;
        const laneW = opts.roadWidth / opts.lanesPerRoad;
        const aOff = [], aMet = [], aCol = [];
        const cols = Array.isArray(this.colors)
          ? this.colors.map(c => new THREE.Color(c))
          : new THREE.Color(this.colors);
        for (let i = 0; i < opts.lightPairsPerRoadWay; i++) {
          const r = rand(opts.carLightsRadius), l = rand(opts.carLightsLength), s = rand(this.speed);
          const lane = i % opts.lanesPerRoad;
          let lx = lane * laneW - opts.roadWidth / 2 + laneW / 2;
          lx += rand(opts.carShiftX) * laneW;
          const oy = rand(opts.carFloorSeparation) + r * 1.3;
          const oz = -rand(opts.length);
          const cw = rand(opts.carWidthPercentage) * laneW;
          aOff.push(lx-cw/2, oy, oz, lx+cw/2, oy, oz);
          aMet.push(r, l, s, r, l, s);
          const c = pick(cols);
          aCol.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
        inst.setAttribute('aOffset',  new THREE.InstancedBufferAttribute(new Float32Array(aOff), 3, false));
        inst.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMet), 3, false));
        inst.setAttribute('aColor',   new THREE.InstancedBufferAttribute(new Float32Array(aCol), 3, false));
        const u = {
          uTime:         { value: 0 },
          uTravelLength: { value: opts.length },
          uFade:         { value: this.fade },
          ...webgl.fogUniforms,
          ...opts.distortion.uniforms,
        };
        const mat = makeMaterial(carLightsFrag, carLightsVert, opts.distortion, u, true);
        const mesh = new THREE.Mesh(inst, mat);
        mesh.frustumCulled = false;
        webgl.scene.add(mesh);
        this.mesh = mesh;
      }
      update(t) { this.mesh.material.uniforms.uTime.value = t; }
    }

    /* ── LightsSticks class ─────────────────────────────────── */
    class LightsSticks {
      constructor(webgl, opts) { this.webgl = webgl; this.opts = opts; }
      init() {
        const { opts, webgl } = this;
        const inst  = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1,1));
        const total = opts.totalSideLightSticks;
        inst.instanceCount = total;
        const step = opts.length / (total - 1);
        const aOff = [], aCol = [], aMet = [];
        const cols = Array.isArray(opts.colors.sticks)
          ? opts.colors.sticks.map(c => new THREE.Color(c))
          : new THREE.Color(opts.colors.sticks);
        for (let i = 0; i < total; i++) {
          aOff.push((i-1)*step*2 + step*Math.random());
          const c = pick(cols);
          aCol.push(c.r, c.g, c.b);
          aMet.push(rand(opts.lightStickWidth), rand(opts.lightStickHeight));
        }
        inst.setAttribute('aOffset',  new THREE.InstancedBufferAttribute(new Float32Array(aOff), 1, false));
        inst.setAttribute('aColor',   new THREE.InstancedBufferAttribute(new Float32Array(aCol), 3, false));
        inst.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMet), 2, false));
        const u = {
          uTravelLength: { value: opts.length },
          uTime:         { value: 0 },
          ...webgl.fogUniforms,
          ...opts.distortion.uniforms,
        };
        const mat = makeMaterial(sideSticksFragSrc, sideSticksVert, opts.distortion, u);
        mat.side = THREE.DoubleSide;
        const mesh = new THREE.Mesh(inst, mat);
        mesh.frustumCulled = false;
        webgl.scene.add(mesh);
        this.mesh = mesh;
      }
      update(t) { this.mesh.material.uniforms.uTime.value = t; }
    }

    /* ── App class ──────────────────────────────────────────── */
    class App {
      constructor(container, opts) {
        this.container = container;
        this.opts      = opts;
        this.disposed  = false;
        this.hasSize   = false;

        const w = Math.max(1, container.offsetWidth);
        const h = Math.max(1, container.offsetHeight);

        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(w, h, false);
        container.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);

        this.camera = new THREE.PerspectiveCamera(opts.fov, w/h, 0.1, 10000);
        this.camera.position.set(0, 8, -5);

        this.scene = new THREE.Scene();
        this.scene.background = null;

        const fog = new THREE.Fog(opts.colors.background, opts.length*0.2, opts.length*500);
        this.scene.fog = fog;
        this.fogUniforms = {
          fogColor: { value: fog.color },
          fogNear:  { value: fog.near  },
          fogFar:   { value: fog.far   },
        };

        this.clock      = new THREE.Clock();
        this.fovTarget  = opts.fov;
        this.speedUpTgt = 0;
        this.speedUp    = 0;
        this.timeOff    = 0;

        this.road           = new Road(this, opts);
        this.leftCarLights  = new CarLights(this, opts, opts.colors.leftCars,  opts.movingAwaySpeed,   new THREE.Vector2(0, 1-opts.carLightsFade));
        this.rightCarLights = new CarLights(this, opts, opts.colors.rightCars, opts.movingCloserSpeed, new THREE.Vector2(1, 0+opts.carLightsFade));
        this.leftSticks     = new LightsSticks(this, opts);

        /* bind */
        ['tick','init','setSize','onMouseDown','onMouseUp','onTouchStart','onTouchEnd','onContextMenu','onResize'].forEach(m => this[m] = this[m].bind(this));
        window.addEventListener('resize', this.onResize);
        if (w > 0 && h > 0) this.hasSize = true;
      }

      initPasses() {
        const rp = new RenderPass(this.scene, this.camera);
        const bloom = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, resolutionScale: 1 }));
        const smaa  = new EffectPass(this.camera, new SMAAEffect({ preset: SMAAPreset.MEDIUM }));
        rp.renderToScreen    = false;
        bloom.renderToScreen = false;
        smaa.renderToScreen  = true;
        this.composer.addPass(rp);
        this.composer.addPass(bloom);
        this.composer.addPass(smaa);
      }

      init() {
        this.initPasses();
        const o = this.opts;
        this.road.init();
        this.leftCarLights.init();
        this.leftCarLights.mesh.position.setX(-o.roadWidth/2 - o.islandWidth/2);
        this.rightCarLights.init();
        this.rightCarLights.mesh.position.setX(o.roadWidth/2 + o.islandWidth/2);
        this.leftSticks.init();
        this.leftSticks.mesh.position.setX(-(o.roadWidth + o.islandWidth/2));

        this.container.addEventListener('mousedown',  this.onMouseDown);
        this.container.addEventListener('mouseup',    this.onMouseUp);
        this.container.addEventListener('mouseout',   this.onMouseUp);
        this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });
        this.container.addEventListener('touchend',   this.onTouchEnd,   { passive: true });
        this.container.addEventListener('touchcancel',this.onTouchEnd,   { passive: true });
        this.container.addEventListener('contextmenu',this.onContextMenu);
        this.tick();
      }

      onMouseDown() { this.fovTarget = this.opts.fovSpeedUp; this.speedUpTgt = this.opts.speedUp; if (this.opts.onSpeedUp) this.opts.onSpeedUp(); }
      onMouseUp()   { this.fovTarget = this.opts.fov;        this.speedUpTgt = 0;                 if (this.opts.onSlowDown) this.opts.onSlowDown(); }
      onTouchStart(){ this.fovTarget = this.opts.fovSpeedUp; this.speedUpTgt = this.opts.speedUp; }
      onTouchEnd()  { this.fovTarget = this.opts.fov;        this.speedUpTgt = 0; }
      onContextMenu(e) { e.preventDefault(); }

      onResize() {
        const w = this.container.offsetWidth, h = this.container.offsetHeight;
        if (!w || !h) { this.hasSize = false; return; }
        this.renderer.setSize(w, h, false);
        this.camera.aspect = w/h;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(w, h);
        this.hasSize = true;
      }

      setSize(w, h, style) {
        if (!w || !h) { this.hasSize = false; return; }
        this.composer.setSize(w, h, style);
        this.hasSize = true;
      }

      update(delta) {
        const lp = Math.exp(-(-60*Math.log2(1-0.1))*delta);
        this.speedUp += lerp(this.speedUp, this.speedUpTgt, lp, 0.00001);
        this.timeOff += this.speedUp * delta;
        const t = this.clock.elapsedTime + this.timeOff;
        this.rightCarLights.update(t);
        this.leftCarLights.update(t);
        this.leftSticks.update(t);
        this.road.update(t);
        const fc = lerp(this.camera.fov, this.fovTarget, lp);
        if (fc !== 0) this.camera.fov += fc * delta * 6;
        if (this.opts.distortion.getJS) {
          const d = this.opts.distortion.getJS(0.025, t);
          this.camera.lookAt(new THREE.Vector3(
            this.camera.position.x + d.x,
            this.camera.position.y + d.y,
            this.camera.position.z + d.z,
          ));
        }
        this.camera.updateProjectionMatrix();
      }

      dispose() {
        this.disposed = true;
        window.removeEventListener('resize', this.onResize);
        if (this.scene) {
          this.scene.traverse(obj => {
            if (!obj.isMesh) return;
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material?.dispose();
          });
          this.scene.clear();
        }
        if (this.renderer) {
          this.renderer.dispose();
          this.renderer.forceContextLoss();
          this.renderer.domElement?.parentNode?.removeChild(this.renderer.domElement);
        }
        this.composer?.dispose();
        if (this.container) {
          ['mousedown','mouseup','mouseout'].forEach(e => this.container.removeEventListener(e, e === 'mousedown' ? this.onMouseDown : this.onMouseUp));
          ['touchstart','touchend','touchcancel'].forEach(e => this.container.removeEventListener(e, e === 'touchstart' ? this.onTouchStart : this.onTouchEnd));
          this.container.removeEventListener('contextmenu', this.onContextMenu);
        }
      }

      tick() {
        if (this.disposed) return;
        if (!this.hasSize) {
          const w = this.container.offsetWidth, h = this.container.offsetHeight;
          if (w > 0 && h > 0) {
            this.renderer.setSize(w, h, false);
            this.camera.aspect = w/h;
            this.camera.updateProjectionMatrix();
            this.composer.setSize(w, h);
            this.hasSize = true;
          } else { requestAnimationFrame(this.tick); return; }
        }
        /* check canvas resize */
        const canvas = this.renderer.domElement;
        if (canvas.clientWidth > 0 && canvas.clientHeight > 0 &&
            (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight)) {
          this.setSize(canvas.clientWidth, canvas.clientHeight, false);
          this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
          this.camera.updateProjectionMatrix();
        }
        const delta = this.clock.getDelta();
        this.composer.render(delta);
        this.update(delta);
        requestAnimationFrame(this.tick);
      }
    }

    /* ── bootstrap ──────────────────────────────────────────── */
    const container = containerRef.current;
    if (!container) return;

    const merged = {
      ...DEFAULT_OPTIONS,
      ...effectOptions,
      colors: { ...DEFAULT_OPTIONS.colors, ...(effectOptions.colors || {}) },
    };
    merged.distortion = distortions[merged.distortion] || distortions['turbulentDistortion'];

    const app = new App(container, merged);
    appRef.current = app;
    /* give the DOM a tick to measure proper size before init */
    requestAnimationFrame(() => { if (!app.disposed) app.init(); });

    return () => {
      app.dispose();
      appRef.current = null;
    };
  }, [effectOptions]);

  return <div id="lights" ref={containerRef} />;
};

export default Hyperspeed;
