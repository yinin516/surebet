const api = 'https://6443c78e-surebet-api.yuy20966.workers.dev/';  // ← 換成 Worker URL

async function getOdds(){
  const [sp,lg] = sport.value.split('_');
  const res = await fetch(`${api}/odds?sport=${sp}&league=${lg}`);
  return res.json();
}
function arb(r1,r2){
  const x = 1/r1 + 1/r2;
  return { ok:x<1, x:x.toFixed(3) };
}
function split(total,r1,r2){
  const a = total / (1 + r1 / r2);
  return { a:a.toFixed(2), b:(total-a).toFixed(2) };
}

async function render(){
  status.textContent = '— 更新中…';
  const data = await getOdds();
  table.innerHTML = '';
  data.forEach(g=>{
    const [r1,r2] = g.best;
    const { ok,x } = arb(r1,r2);
    if(!ok) return;
    const { a,b } = split(+bankroll.value,r1,r2);
    table.insertAdjacentHTML('beforeend',
      `<tr><td>${g.name}</td><td>${r1}</td><td>${r2}</td><td>${x}</td><td>A 壓 ${a}<br>B 壓 ${b}</td></tr>`);
  });
  status.textContent = '— 已更新 ' + new Date().toLocaleTimeString();
}
render();
setInterval(render,30_000);
refresh.onclick = render;
