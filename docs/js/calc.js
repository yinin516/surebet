go.onclick = ()=>{
  const r1v = +r1.value, r2v = +r2.value, totv = +tot.value;
  const x = 1/r1v + 1/r2v;
  if(x >= 1){
    out.textContent = `❌ 無套利空間 (x=${x.toFixed(3)})`; return;
  }
  const a = totv / (1 + r1v / r2v);
  out.textContent =
    `✅ 可套利 (x=${x.toFixed(3)})\n` +
    `投注1: ${a.toFixed(2)}   投注2: ${(totv-a).toFixed(2)}\n` +
    `淨利≈ ${(a*r1v - totv).toFixed(2)} (${(((a*r1v - totv)/totv)*100).toFixed(2)}%)`;
};
