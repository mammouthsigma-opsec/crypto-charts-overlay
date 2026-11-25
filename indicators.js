(function(global){
 const sma=(data,n,key='close')=>data.map((d,i)=>i<n-1?null:{time:d.time,value:data.slice(i-n+1,i+1).reduce((a,x)=>a+x[key],0)/n}).filter(Boolean);
 const ema=(data,n,key='close')=>{let out=[],k=2/(n+1),v;data.forEach((d,i)=>{v=i===0?d[key]:d[key]*k+v*(1-k);if(i>=n-1)out.push({time:d.time,value:v});});return out;};
 const bollinger=(data,n=20,m=2)=>data.slice(n-1).map((d,j)=>{let a=data.slice(j,j+n).map(x=>x.close),avg=a.reduce((x,y)=>x+y,0)/n,sd=Math.sqrt(a.reduce((x,y)=>x+(y-avg)**2,0)/n);return{time:d.time,upper:avg+m*sd,middle:avg,lower:avg-m*sd};});
 const rsi=(data,n=14)=>{let out=[],g=0,l=0;for(let i=1;i<data.length;i++){let ch=data[i].close-data[i-1].close;g+=Math.max(ch,0);l+=Math.max(-ch,0);if(i>=n){if(i>n){let prev=data[i-n].close-data[i-n-1].close;g-=Math.max(prev,0);l-=Math.max(-prev,0);}out.push({time:data[i].time,value:l===0?100:100-100/(1+g/l)});}}return out;};
 const macd=(data)=>{let fast=ema(data,12),slow=ema(data,26),m=fast.map((x)=>({time:x.time,value:x.value-(slow.find(y=>y.time===x.time)?.value||x.value)}));let signal=[];if(m.length>=9)signal=ema(m,9,'value');return{macd:m,signal};};
 const heikinAshi=data=>{let prevO,prevC;return data.map((d,i)=>{let c=(d.open+d.high+d.low+d.close)/4,o=i?((prevO+prevC)/2):(d.open+d.close)/2;prevO=o;prevC=c;return{time:d.time,open:o,high:Math.max(d.high,o,c),low:Math.min(d.low,o,c),close:c};});};
 global.Indicators={sma,ema,bollinger,rsi,macd,heikinAshi};
})(window);
