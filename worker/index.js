export default{
  async fetch(req,env){
    const u = new URL(req.url);
    const cors = {'Access-Control-Allow-Origin':'*'};

    if(u.pathname==='/odds'){
      const sport  = u.searchParams.get('sport');
      const league = u.searchParams.get('league');
      const url = `https://api.the-odds-api.com/v4/sports/${sport}_${league}/odds/?regions=us&markets=h2h&apiKey=${env.ODDS_API}`;
      const raw = await (await fetch(url)).json();

      const list = raw.map(ev=>{
        const prices = ev.bookmakers.flatMap(b=>b.markets[0].outcomes.map(o=>o.price));
        const half = prices.length/2;
        return {
          name : `${ev.home_team} vs ${ev.away_team}`,
          best : [ Math.max(...prices.slice(0,half)), Math.max(...prices.slice(half)) ]
        };
      });
      return Response.json(list,{headers:cors});
    }

    return new Response('404',{status:404,headers:cors});
  }
}
