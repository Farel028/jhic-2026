import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const path = new URL('../../data/campus-map.ts', import.meta.url);
async function data() {
  const source = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : 'export const rooms = [];';
  return import('data:text/javascript;base64,' + Buffer.from(ts.transpile(source, {module: ts.ModuleKind.ESNext})).toString('base64'));
}
test('traces aula luar against source pixel footprint', async () => {
  const {rooms} = await data();
  const aula = rooms.find(r => r.id === 'aula-luar');
  assert.ok(aula, 'source aula luar must exist');
  assert.deepEqual([aula.x,aula.z,aula.w,aula.d], [601,112,165,106]);
});
test('search is case-insensitive, trims whitespace and intersects category', async () => {
  const {searchRooms} = await data();
  assert.deepEqual(searchRooms('  aULA luar  ').map(r=>r.id), ['panggung','aula-luar']);
  assert.equal(searchRooms('aula','animasi').length, 0);
  assert.equal(searchRooms('not-a-room').length, 0);
  assert.equal(searchRooms('R. 08','rpl').length, 8);
});
test('aula luar is an open-sided slab, not a full-height room', async()=>{
  const {rooms}=await data();
  assert.ok(rooms.find(r=>r.id==='aula-luar').h <= 4);
});
test('source records preserve identifiers and stay within the plan', async()=>{
  const {rooms,PLAN,paths,categories}=await data();
  assert.equal(rooms.length,54);
  assert.equal(new Set(rooms.map(r=>r.id)).size,rooms.length);
  assert.equal(rooms.filter(r=>r.name==='R. BK').length,2);
  assert.ok(rooms.find(r=>r.id==='belum-terkonfirmasi').note.includes('belum dikonfirmasi'));
  assert.equal(categories.dbip.name,'DBIP');
  for(const r of rooms){assert.ok(r.x>=0&&r.z>=0&&r.w>0&&r.d>0&&r.x+r.w<=PLAN.width&&r.z+r.d<=PLAN.height,r.id);}
  for(const [x,z,w,d] of paths)assert.ok(x>=0&&z>=0&&x+w<=PLAN.width&&z+d<=PLAN.height);
});
test('one connected roof covers both halls with touching joglo tiers', async()=>{
  const {hallRoof,rooms}=await data();
  assert.ok(hallRoof,'shared hall roof configuration exists');
  const base=hallRoof[0];
  for(const id of ['aula-luar','aula-dalam']){
    const r=rooms.find(r=>r.id===id);
    assert.ok(base.x-base.w/2<=r.x&&base.x+base.w/2>=r.x+r.w);
    assert.ok(base.z-base.d/2<=r.z&&base.z+base.d/2>=r.z+r.d);
  }
  for(let i=1;i<hallRoof.length;i++)assert.equal(hallRoof[i].base,hallRoof[i-1].base+hallRoof[i-1].rise);
});
