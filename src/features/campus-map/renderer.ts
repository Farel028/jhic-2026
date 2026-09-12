import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { categories, hallRoof, paths, PLAN, rooms } from '@/data/campus-map';

export type MapState = { selected: string | null; visible: string[]; roofs: boolean; labels: boolean };
export type MapEngine = { update: (state: MapState) => void; view: (top: boolean) => void; zoom: (factor: number) => void; pan: (x: number, z: number) => void; dispose: () => void };

export function createMap(host: HTMLElement, onSelect: (id: string) => void, onLost: () => void): MapEngine {
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor('#edf1f2');
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label', 'Peta sekolah tiga dimensi. Gunakan daftar ruang untuk navigasi dengan keyboard.');
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-750,750,450,-450,1,6000);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = false; // On-demand rendering; reduced motion is instant too.
  controls.minZoom = .45;
  controls.maxZoom = 7;
  controls.maxPolarAngle = Math.PI / 2.08;
  controls.screenSpacePanning = true;
  scene.add(new THREE.HemisphereLight('#ffffff','#c0c6cd',2.2));
  const sun = new THREE.DirectionalLight('#fff5e6',2.2);
  sun.position.set(-400,900,500);
  scene.add(sun);
  const centerX = PLAN.width/2, centerZ = PLAN.height/2;
  const meshes = new Map<string, THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>();
  const labels = new Map<string, THREE.Sprite>();
  const roofGroup = new THREE.Group();
  const disposables: THREE.Texture[] = [];
  const material = (color: string) => new THREE.MeshStandardMaterial({color,roughness: .88});
  function box(x: number,z: number,w: number,d: number,h: number,color: string,y=0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));
    mesh.position.set(x+w/2-centerX,y+h/2,z+d/2-centerZ);
    scene.add(mesh);
    return mesh;
  }
  // Only traced paths are paved; blank source margins remain empty.
  for (const [x,z,w,d] of paths) box(x,z,w,d,2,'#b6bdc8');
  const gradientCanvas = document.createElement('canvas');
  gradientCanvas.width=64; gradientCanvas.height=64;
  const gc=gradientCanvas.getContext('2d')!;
  const gradient=gc.createLinearGradient(0,0,0,64);
  gradient.addColorStop(0,'#5c91ea'); gradient.addColorStop(1,'#ed78b8');
  gc.fillStyle=gradient; gc.fillRect(0,0,64,64);
  const bathroomTexture=new THREE.CanvasTexture(gradientCanvas);
  bathroomTexture.colorSpace=THREE.SRGBColorSpace;
  disposables.push(bathroomTexture);
  for (const r of rooms) {
    const mesh=box(r.x,r.z,r.w-.8,r.d-.8,r.h,categories[r.category].color);
    mesh.userData.roomId=r.id;
    if(r.category==='toilet') {mesh.material.color.set('#ffffff');mesh.material.map=bathroomTexture;}
    meshes.set(r.id,mesh);
    const edges=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color:'#203348',transparent:true,opacity:.2}));
    mesh.add(edges);
    const labelCanvas=document.createElement('canvas');
    labelCanvas.width=512; labelCanvas.height=96;
    const ctx=labelCanvas.getContext('2d')!;
    ctx.fillStyle='#f9fbfc';ctx.beginPath();ctx.roundRect(2,2,508,92,16);ctx.fill();
    ctx.strokeStyle='#c7d0d8';ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle='#102a43';ctx.font='600 31px Arial';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(r.id==='belum-terkonfirmasi'?'Label belum pasti':r.name,256,48,482);
    const texture=new THREE.CanvasTexture(labelCanvas);texture.colorSpace=THREE.SRGBColorSpace;disposables.push(texture);
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,depthTest:false,transparent:true}));
    sprite.position.copy(mesh.position);sprite.position.y=r.h+12;
    // Label width tracks footprint, so adjacent classroom codes do not overlap at plan scale.
    const width=Math.min(Math.max(r.w*.88,42),110);
    sprite.scale.set(width,width*96/512,1);sprite.renderOrder=5;
    scene.add(sprite);labels.set(r.id,sprite);
  }
  // A single shared hip-roof skirt spans both aula footprints. The stepped
  // central crown over Aula Luar expresses joglo form without a detached roof.
  function hip(x: number,z: number,w: number,d: number,base: number,rise: number,topW: number,topD: number) {
    const vertices:number[]=[];
    const lower=[[-w/2,0,-d/2],[w/2,0,-d/2],[w/2,0,d/2],[-w/2,0,d/2]];
    const upper=[[-topW/2,rise,-topD/2],[topW/2,rise,-topD/2],[topW/2,rise,topD/2],[-topW/2,rise,topD/2]];
    for(let i=0;i<4;i++){const j=(i+1)%4;vertices.push(...lower[i],...upper[i],...lower[j],...lower[j],...upper[i],...upper[j]);}
    vertices.push(...upper[0],...upper[2],...upper[1],...upper[0],...upper[3],...upper[2]);
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();
    const roof=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:'#64594e',roughness:.95,side:THREE.DoubleSide}));
    roof.position.set(x-centerX,base,z-centerZ);roofGroup.add(roof);
  }
  // Open-sided aula: schematic posts support the shared roof, not solid walls.
  // Exact column counts/positions are not documented by the source.
  for(const x of [608,753]) for(const z of [63,145,208]) {
    const post=box(x,z,5,5,28,'#64594e',3);
    roofGroup.attach(post);
  }
  for(const r of hallRoof)hip(r.x,r.z,r.w,r.d,r.base,r.rise,r.topW,r.topD);
  // Gazebo roofs stay in the same visibility group as the halls.
  for(const r of rooms.filter(r=>r.category==='gazebo')) hip(r.x+r.w/2,r.z+r.d/2,r.w+4,r.d+4,r.h+2,13,3,3);
  scene.add(roofGroup);
  let disposed=false;
  let state:MapState={selected:null,visible:rooms.map(r=>r.id),roofs:true,labels:true};
  const selectedOutline=new THREE.BoxHelper(new THREE.Object3D(),'#102a43');
  selectedOutline.visible=false;scene.add(selectedOutline);
  function render(){if(!disposed)renderer.render(scene,camera);}
  function update(next:MapState){
    state=next;
    const visible=new Set(next.visible);
    for(const [id,mesh] of meshes){
      mesh.material.transparent=!visible.has(id);
      mesh.material.opacity=visible.has(id)?1:.16;
      mesh.material.depthWrite=visible.has(id);
      mesh.material.emissive.set(id===next.selected?'#6b5522':'#000000');
      mesh.material.emissiveIntensity=.22;
      const sprite=labels.get(id)!;
      sprite.visible=next.labels&&visible.has(id)&&(!next.roofs||!['panggung','aula-luar','aula-dalam'].includes(id));
    }
    roofGroup.visible=next.roofs;
    selectedOutline.visible=!!next.selected;
    if(next.selected&&meshes.has(next.selected))selectedOutline.setFromObject(meshes.get(next.selected)!);
    render();
  }
  function view(top:boolean){
    controls.target.set(0,0,0);
    camera.position.set(top?0:250,top?1500:850,top?.01:700);
    camera.up.set(0,1,0);camera.zoom=1;camera.lookAt(controls.target);camera.updateProjectionMatrix();controls.update();resize();
  }
  function resize(){
    const {width,height}=host.getBoundingClientRect();
    const aspect=Math.max(width,1)/Math.max(height,1);
    camera.updateMatrixWorld();
    let extentX=0,extentY=0;
    const targetInView=controls.target.clone().applyMatrix4(camera.matrixWorldInverse);
    for(const x of [-centerX,centerX])for(const z of [-centerZ,centerZ])for(const y of [0,100]){
      const projected=new THREE.Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse).sub(targetInView);
      extentX=Math.max(extentX,Math.abs(projected.x));extentY=Math.max(extentY,Math.abs(projected.y));
    }
    const halfHeight=Math.max(extentY,extentX/aspect)*1.08;
    camera.left=-halfHeight*aspect;camera.right=halfHeight*aspect;camera.top=halfHeight;camera.bottom=-halfHeight;
    camera.updateProjectionMatrix();renderer.setSize(width,height);render();
  }
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  controls.addEventListener('change',render);
  const raycaster=new THREE.Raycaster();
  let down:{x:number;y:number;id:number}|null=null;
  const pointerDown=(e:PointerEvent)=>{down=e.isPrimary&&e.button===0?{x:e.clientX,y:e.clientY,id:e.pointerId}:null;};
  const pointerCancel=()=>{down=null;};
  const pointerUp=(e:PointerEvent)=>{
    if(!down||e.pointerId!==down.id||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){down=null;return;}
    down=null;
    const bounds=canvas.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((e.clientX-bounds.left)/bounds.width*2-1,-(e.clientY-bounds.top)/bounds.height*2+1),camera);
    // Rays ignore roofs intentionally: selecting the hall still works with roof on.
    const candidates=[...meshes.entries()].filter(([id])=>state.visible.includes(id)).map(([,mesh])=>mesh);
    const hit=raycaster.intersectObjects(candidates,false)[0];
    if(hit)onSelect(hit.object.userData.roomId);
  };
  const lost=(event:Event)=>{event.preventDefault();onLost();};
  canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerCancel);canvas.addEventListener('webglcontextlost',lost);
  view(false);resize();update(state);
  return {
    update,view,
    zoom(factor){camera.zoom=THREE.MathUtils.clamp(camera.zoom*factor,.45,7);camera.updateProjectionMatrix();render();},
    pan(x,z){const delta=new THREE.Vector3(x,0,z);controls.target.add(delta);camera.position.add(delta);controls.update();render();},
    dispose(){
      disposed=true;resizeObserver.disconnect();controls.removeEventListener('change',render);controls.dispose();
      canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointerup',pointerUp);canvas.removeEventListener('pointercancel',pointerCancel);canvas.removeEventListener('webglcontextlost',lost);
      scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.LineSegments){object.geometry.dispose();const mats=Array.isArray(object.material)?object.material:[object.material];mats.forEach(m=>m.dispose());}else if(object instanceof THREE.Sprite)object.material.dispose();});
      disposables.forEach(texture=>texture.dispose());renderer.dispose();renderer.forceContextLoss();canvas.remove();
    },
  };
}
