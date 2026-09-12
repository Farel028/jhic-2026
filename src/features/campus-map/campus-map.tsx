'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, PLAN, rooms, searchRooms, type Category } from '@/data/campus-map';
import type { MapEngine } from './renderer';
import styles from './campus-map.module.css';

export default function CampusMap() {
  const host=useRef<HTMLDivElement>(null);
  const engine=useRef<MapEngine|null>(null);
  const [status,setStatus]=useState<'loading'|'ready'|'unavailable'>('loading');
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState<Category|'all'>('all');
  const [selected,setSelected]=useState<string|null>(null);
  const [roofs,setRoofs]=useState(true);
  const [labels,setLabels]=useState(true);
  const [original,setOriginal]=useState(false);
  const results=useMemo(()=>searchRooms(query,category),[query,category]);
  const current=rooms.find(r=>r.id===selected);
  useEffect(()=>{
    let cancelled=false;
    let instance:MapEngine|null=null;
    import('./renderer').then(({createMap})=>{
      if(cancelled||!host.current)return;
      try{
        instance=createMap(host.current,setSelected,()=>setStatus('unavailable'));
        engine.current=instance;setStatus('ready');
      }catch{setStatus('unavailable');}
    }).catch(()=>{if(!cancelled)setStatus('unavailable');});
    return ()=>{cancelled=true;instance?.dispose();engine.current=null;};
  },[]);
  useEffect(()=>{engine.current?.update({selected,visible:results.map(r=>r.id),roofs,labels});},[selected,results,roofs,labels,status]);
  const changeQuery=(value:string)=>{setQuery(value);setSelected(null);};
  const changeCategory=(value:Category|'all')=>{setCategory(value);setSelected(null);};
  return <section className={styles.explorer} aria-label="Penjelajah peta sekolah">
    <div className={styles.toolbar}>
      <div><strong>Jelajahi denah</strong><p>Pilih ruang di peta atau cari melalui daftar.</p></div>
      <button type="button" aria-pressed={original} onClick={()=>setOriginal(!original)}>{original?'Kembali ke 3D':'Bandingkan denah asli'}</button>
    </div>
    <div className={styles.workspace}>
      <div className={styles.mapColumn}>
        <div className={styles.controls} aria-label="Kontrol peta">
          <button type="button" disabled={status!=='ready'||original} onClick={()=>engine.current?.view(true)}>Tampak atas</button>
          <button type="button" disabled={status!=='ready'||original} onClick={()=>engine.current?.view(false)}>Atur ulang</button>
          <button type="button" disabled={status!=='ready'||original} aria-label="Perbesar peta" onClick={()=>engine.current?.zoom(1.3)}>+</button>
          <button type="button" disabled={status!=='ready'||original} aria-label="Perkecil peta" onClick={()=>engine.current?.zoom(1/1.3)}>−</button>
          <label><input type="checkbox" checked={roofs} onChange={e=>setRoofs(e.target.checked)}/> Atap</label>
          <label><input type="checkbox" checked={labels} onChange={e=>setLabels(e.target.checked)}/> Label</label>
        </div>
        <div className={styles.viewport}>
          <div ref={host} className={styles.canvas} style={{visibility:original||status==='unavailable'?'hidden':'visible'}} data-testid="school-map-canvas"/>
          {(original||status==='unavailable')&&<div className={styles.original}><Image src={PLAN.source} alt="Denah sumber sekolah: sayap Animasi dan RPL di kiri, aula di tengah, DBIP dan TKP di kanan." width={1333} height={595} sizes="(max-width: 900px) 100vw, 75vw" priority/><a href={PLAN.source} target="_blank" rel="noreferrer">Buka gambar ukuran penuh</a></div>}
          {status==='loading'&&!original&&<div className={styles.loading} role="status"><div/><strong>Menyiapkan peta 3D…</strong><span>Daftar ruang sudah dapat digunakan.</span></div>}
          {status==='unavailable'&&<p className={styles.fallback} role="status">Tampilan 3D tidak tersedia pada perangkat ini. Gunakan denah asli dan daftar ruang di bawah/samping.</p>}
          {!original&&status==='ready'&&<span className={styles.orientation}>Atas gambar sumber ↑</span>}
        </div>
        <div className={styles.help}>
          <p>Seret untuk memutar. Gulir atau cubit untuk zoom. Klik kanan + seret atau dua jari untuk menggeser.</p>
          <details><summary>Kontrol keyboard & catatan model</summary><p>Gunakan Tab dan Enter untuk memilih ruang di daftar. Tombol berikut menggeser peta tanpa mouse.</p><div className={styles.controls}>
            {([['Kiri',-80,0],['Kanan',80,0],['Atas',0,-80],['Bawah',0,80]] as const).map(([name,x,z])=><button key={name} type="button" disabled={status!=='ready'||original} onClick={()=>engine.current?.pan(x,z)}>Geser {name.toLowerCase()}</button>)}
          </div><p>Koordinat mengikuti gambar 1333 × 595 piksel, bukan skala meter. Tinggi blok dan bentuk atap bersifat ilustratif. Atap joglo Aula Luar menyambung ke Aula Dalam. Matikan Atap untuk melihat label aula.</p><p>Orientasi mengikuti gambar; arah utara belum diketahui. Data kapasitas tidak tersedia.</p></details>
        </div>
      </div>
      <aside className={styles.sidebar} aria-label="Pencarian dan informasi ruang">
        <div className={styles.search}>
          <label htmlFor="map-search">Cari ruang atau area</label>
          <input id="map-search" type="search" placeholder="Misalnya R. 08, aula, kamar mandi" value={query} onChange={e=>changeQuery(e.target.value)}/>
          <label htmlFor="map-category">Kategori</label>
          <select id="map-category" value={category} onChange={e=>changeCategory(e.target.value as Category|'all')}><option value="all">Semua kategori</option>{Object.entries(categories).map(([id,c])=><option key={id} value={id}>{c.name}</option>)}</select>
        </div>
        <div className={styles.detail} aria-live="polite" aria-atomic="true">
          {current?<><span className={styles.category}><i style={{background:categories[current.category].color}}/>{categories[current.category].name}</span><h2>{current.name}</h2><p>{current.location}</p>{current.note&&<p className={styles.note}>{current.note}</p>}<button type="button" onClick={()=>setSelected(null)}>Tutup detail</button></>:<><h2>Kenali ruangnya.</h2><p>Pilih satu blok untuk melihat nama, kategori, dan posisinya pada denah.</p></>}
        </div>
        <div className={styles.resultsHeader}><strong aria-live="polite">{results.length} ruang & area</strong>{(query||category!=='all')&&<button type="button" onClick={()=>{setQuery('');setCategory('all');setSelected(null);}}>Hapus filter</button>}</div>
        <ul className={styles.results} aria-label="Daftar ruang dan area">
          {results.map(r=><li key={r.id}><button type="button" aria-pressed={selected===r.id} onClick={()=>setSelected(r.id)}><i style={{background:r.category==='toilet'?'linear-gradient(#5c91ea,#ed78b8)':categories[r.category].color}}/><span><strong>{r.name}</strong><small>{r.location}</small></span><span aria-hidden="true">↗</span></button></li>)}
        </ul>
        {results.length===0&&<p className={styles.empty}>Tidak ada ruang yang cocok. Coba nama lain atau hapus filter.</p>}
      </aside>
    </div>
    <div className={styles.legend} aria-label="Legenda warna">{Object.entries(categories).map(([id,c])=><button key={id} type="button" aria-pressed={category===id} onClick={()=>changeCategory(category===id?'all':id as Category)}><i style={{background:id==='toilet'?'linear-gradient(#5c91ea,#ed78b8)':c.color}}/>{c.name}</button>)}</div>
    <p className={styles.source}>Sumber: Screenshot 2026-09-12 090628.png (denah yang diberikan pengguna). Kode R. 08 dan R. BK yang berulang dipertahankan. Label “Jurnal…” dan blok biru tanpa label belum dikonfirmasi.</p>
  </section>;
}
