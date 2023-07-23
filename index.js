(()=>{"use strict";var e={344:(e,t,n)=>{n.r(t)},154:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getAllWinners=t.getWinnersOnPage=t.deleteWinner=t.updateWinner=t.createWinner=t.brokeEngine=t.velocityCar=t.deleteCar=t.getPages=t.updateCar=t.getAllCars=t.createCar=t.getCurrentGarage=t.getWinner=t.garage=void 0;const n="http://localhost:3000";t.garage=`${n}/garage`;const a=`${n}/winners`,r=`${n}/engine`;t.getAllCars=async()=>(await fetch(`${t.garage}`)).json(),t.getCurrentGarage=async e=>(await fetch(`${t.garage}?_page=${e}&_limit=7`)).json(),t.getPages=async()=>{const e=await fetch(`${t.garage}?_limit=7`),n=Number(e.headers.get("X-Total-Count"));return Math.ceil(n/7)};const o=async e=>(await fetch(`${t.garage}/${e}`)).json();t.deleteCar=async e=>(await fetch(`${t.garage}/${e}`,{method:"DELETE"})).json(),t.createCar=async e=>(await fetch(`${t.garage}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json(),t.updateCar=async(e,n)=>(await fetch(`${t.garage}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json(),t.velocityCar=async e=>{const t=await fetch(`${r}?id=${e}&status=started`,{method:"PATCH"}),{velocity:n}=await t.json();return n},t.brokeEngine=async e=>500===(await fetch(`${r}?id=${e}&status=drive`,{method:"PATCH"}).catch()).status,t.getAllWinners=async()=>(await fetch(`${a}`)).json(),t.getWinnersOnPage=async(e,t,n)=>{const r=await fetch(`${a}?_page=${e}&_limit=10&${((e,t)=>e&&t?`&_sort=${e}&_order=${t}`:"")(t,n)}`),c=await r.json();return{items:await Promise.all(c.map((async e=>({...e,car:await o(e.id)})))),count:Number(r.headers.get("X-Total-Count"))}},t.createWinner=async e=>(await fetch(`${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json(),t.updateWinner=async(e,t)=>(await fetch(`${a}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json(),t.deleteWinner=async e=>(await fetch(`${a}/${e}`,{method:"DELETE"})).json(),t.getWinner=async e=>(await fetch(`${a}/${e}`)).json()},753:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=n(952),r=n(154),o=n(94),c=n(999),s=n(167),i=n(755),l=document.getElementById("btn-create"),d=document.getElementById("btn-update"),u=document.getElementById("btn-generate"),m=document.getElementById("btn-next"),g=document.getElementById("btn-prev"),b=document.getElementById("btn-to-garage"),p=document.getElementById("btn-to-winners"),y=document.getElementById("race"),h=document.getElementById("reset"),w=document.querySelector(".main"),f=document.querySelector(".winners");p.addEventListener("click",(()=>{p.disabled=!0,b.disabled=!1,w.classList.add("hidden"),f.classList.remove("hidden"),(0,s.fillCurrentWinners)()})),l.addEventListener("click",(async()=>{const e=document.getElementById("colorCar").value,t=document.getElementById("nameCar").value;await(0,a.counterMaxPage)()(),await(0,r.createCar)({name:t,color:e}),await(0,o.fillCurrentPage)(),(0,a.carsCount)(1)}));const v=document.getElementById("updNameCar"),C=document.getElementById("updColorCar");d.addEventListener("click",(()=>{if(-1===a.index.current)return;const e=document.querySelector(`#road-${a.index.current} .car__name`),t=document.querySelector(`#road-${a.index.current} .car svg g`);e&&(e.innerHTML=v.value,t.setAttribute("fill",C.value),(0,r.updateCar)(a.index.current,{name:v.value,color:C.value}).catch((e=>console.log(e))),C.value="#000000",v.value="",a.index.current=-1)})),u.addEventListener("click",(async()=>{const e=(0,c.generateRandomCars)();for(let t=0;t<e.length;t++)(0,a.carsCount)(1),await(0,r.createCar)({name:e[t].name,color:e[t].color});await(0,o.fillCurrentPage)()})),m.addEventListener("click",(async()=>{const e=(0,a.counterMaxPage)()();a.page.number>=await e||(a.clickRace.bool&&(a.clickRace.bool=!1,(0,i.reset)()),a.page.number+=1,await(0,o.fillCurrentPage)())})),g.addEventListener("click",(async()=>{a.page.number<=1||(a.clickRace.bool&&(a.clickRace.bool=!1,(0,i.reset)()),a.page.number-=1,await(0,o.fillCurrentPage)())})),y.onclick=async()=>{y.disabled=!0,await(0,i.race)(),h.disabled=!1},h.onclick=async()=>{(0,i.reset)()}},524:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=n(154),r=n(952),o=n(275),c=n(94),s=n(952),i=document.getElementById("updNameCar"),l=document.getElementById("updColorCar");document.querySelector(".garage").addEventListener("click",(async e=>{const t=e.target,n=t.closest(".road"),d=Number(n.id.split("-")[1]);if(n){if(t.closest(".btn-select")){r.index.current=d;const e=n.querySelector(".car__name"),t=n.querySelector(".car svg g");l.value=t.getAttribute("fill"),i.value=e.textContent}t.closest(".btn-remove")&&(await(0,a.deleteCar)(d),await(0,a.getWinner)(d)&&await(0,a.deleteWinner)(d),await(0,c.fillCurrentPage)(),(0,r.carsCount)(-1)),t.closest(".btn-start")&&(r.clickRace.bool=!1,(0,s.clearAnimation)(),(0,o.startCar)(d)),t.closest(".btn-stop")&&(0,o.stopCar)(d)}}))},567:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=n(952),r=n(167),o=document.getElementById("btn-to-garage"),c=document.getElementById("btn-to-winners"),s=document.querySelector(".main"),i=document.querySelector(".winners"),l=document.querySelector("table tbody"),d=document.getElementById("sort-wins"),u=document.getElementById("sort-time");o.addEventListener("click",(()=>{a.clickWinnerPage.bool=!1,c.disabled=!1,o.disabled=!0,s.classList.remove("hidden"),i.classList.add("hidden"),l.innerHTML=""}));const m=()=>{a.winners.sortOrder="asc"===a.winners.sortOrder?"desc":"asc"};d.onclick=async()=>{a.winners.sortBy="wins",m(),await(0,r.fillCurrentWinners)()},u.onclick=async()=>{a.winners.sortBy="time",m(),await(0,r.fillCurrentWinners)()},document.getElementById("btn-winners-next").onclick=async()=>{a.winners.page>=a.winners.maxPage||(a.winners.page+=1,a.clickWinnerPage.bool=!0,await(0,r.fillCurrentWinners)())},document.getElementById("btn-winners-prev").onclick=async()=>{a.winners.page<=1||(a.winners.page-=1,a.clickWinnerPage.bool=!0,await(0,r.fillCurrentWinners)())}},275:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.stopCar=t.startCar=void 0;const a=n(154),r=n(952);t.startCar=async function(e){const t=document.querySelector(`#road-${e} .btn-start`),n=document.querySelector(`#road-${e} .btn-stop`);t.disabled=!0,n.disabled=!1;let o=await(0,a.velocityCar)(e);r.animation[e]=function(){const t={},n=document.querySelector(`#road-${e} .car`),a=window.innerWidth,r=a-110;let c=n.offsetLeft;return a>=1e3&&(o=Number((o/34).toFixed(2))),a>=800&&a<1e3&&(o=Number((o/52).toFixed(2))),a>=670&&a<800&&(o=Number((o/37/2).toFixed(2))),a<670&&(o=Number((o/40/3).toFixed(2))),t.id=window.requestAnimationFrame((async function e(){c+=o,n.style.transform=`translateX(${Math.min(c,r)}px)`,c<r&&(t.id=window.requestAnimationFrame(e))})),t}();const c=await(0,a.brokeEngine)(e).then((t=>(t&&cancelAnimationFrame(r.animation[e].id),t)));return{id:e,broke:c}},t.stopCar=async function(e){const t=document.querySelector(`#road-${e} .car`),n=document.querySelector(`#road-${e} .btn-start`);document.querySelector(`#road-${e} .btn-stop`).disabled=!0,n.disabled=!1,cancelAnimationFrame(r.animation[e].id),t.style.transform="translateX(0)"}},755:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reset=t.race=void 0;const a=n(275),r=n(250),o=n(952);t.race=async function(){o.clickRace.bool=!0,(0,o.clearAnimation)();const e=window.innerWidth-110;console.log(e);const t=document.querySelectorAll(".car"),n=Array.from(t).map((e=>Number(e.closest(".road").id.split("-")[1]))).map((e=>(0,a.startCar)(e))),c=(new Date).getTime();await Promise.race(n),requestAnimationFrame((function n(){let a=null;for(let n=0;n<t.length;n++){const o=t[n],s=o.style.transform.match(/translateX\((-?\d+\.?\d*)px\)/);if((s?parseFloat(s[1]):null)>=e){const e=o.closest(".road");a=Number(e.id.split("-")[1]),(0,r.addWinner)(c,a,e);break}}a||requestAnimationFrame(n)}))};const c=document.getElementById("race"),s=document.getElementById("reset");t.reset=async function(){c.disabled=!1,s.disabled=!0,document.querySelector(".message-winner").classList.add("hidden");const e=document.querySelectorAll(".car"),t=Array.from(e).map((e=>Number(e.closest(".road").id.split("-")[1]))).map((e=>(0,a.stopCar)(e)));await Promise.all(t)}},250:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addWinner=void 0;const a=n(154);t.addWinner=async function(e,t,n){const r=document.querySelector(".message-winner"),o=n.querySelector(".car__name").textContent,c=(new Date).getTime(),s=Number(((c-e)/1e3).toFixed(2));r.classList.remove("hidden"),r.innerHTML=`${o} went first in ${s}s`;const i=await(0,a.getAllWinners)();let l=!1;i.forEach((e=>{if(t===e.id){l=!0;const n=e.wins+1,r=s>e.time?s:e.time;(0,a.updateWinner)(t,{wins:n,time:r})}})),l||await(0,a.createWinner)({id:t,wins:1,time:s})}},944:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createCarImage=void 0,t.createCarImage=e=>`<?xml version="1.0" standalone="no"?>\n<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="80px" height="30px" viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">\n  <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="${e}" stroke="none">\n    <path d="M3525 5341 c-72 -18 -79 -28 -90 -121 -4 -30 -11 -62 -16 -71 -4 -9 -97 -51 -206 -94 -774 -304 -1348 -540 -1603 -661 -163 -77 -222 -91 -421 -104 -85 -5 -170 -14 -189 -20 -101 -32 -362 -58 -620 -63 l-115 -2 -47 -80 c-47 -78 -47 -80 -29 -100 34 -36 35 -77 5 -177 -30 -99 -34 -178 -19 -370 5 -67 4 -88 -6 -88 -29 0 -83 -56 -110 -114 -50 -106 -74 -343 -48 -467 13 -58 13 -62 3 -159 -5 -54 16 -238 28 -244 2 -1 29 -20 61 -41 73 -49 123 -103 132 -143 17 -79 167 -155 355 -181 104 -15 969 -97 1087 -104 l32 -2 5 160 c7 230 50 394 146 559 281 479 917 673 1405 429 316 -159 530 -424 598 -742 22 -106 29 -365 13 -519 l-8 -82 3002 0 c2855 0 3002 1 2995 18 -33 87 -56 325 -45 461 28 320 177 567 459 759 399 273 847 282 1243 24 239 -157 397 -392 460 -687 18 -84 15 -341 -5 -430 -8 -38 -14 -71 -12 -73 7 -8 386 20 478 34 180 28 253 65 304 152 24 41 28 57 28 127 -1 44 -9 117 -20 163 -18 79 -18 88 -2 190 31 199 40 306 41 497 1 176 -1 195 -23 260 -46 135 -103 190 -283 274 -222 104 -633 220 -1168 330 -523 108 -1524 210 -2054 211 l-229 0 -236 139 c-813 477 -1593 884 -1852 966 -498 157 -1598 195 -2892 100 l-188 -14 -47 30 c-92 58 -223 89 -297 70z m1912 -311 c13 -45 58 -305 88 -515 33 -226 74 -539 71 -542 -7 -7 -1672 40 -2054 58 -357 16 -464 56 -573 215 -62 91 -87 225 -59 326 12 40 56 74 192 148 369 198 799 289 1618 340 246 15 290 16 510 16 l194 -1 13 -45z m649 10 c383 -36 717 -86 934 -139 210 -52 451 -163 720 -332 141 -88 379 -259 380 -271 0 -5 -14 -8 -32 -8 -48 0 -114 -37 -140 -78 -24 -39 -30 -113 -15 -189 l9 -43 -904 0 -904 0 -176 540 -175 540 47 0 c25 0 141 -9 256 -20z"/>\n    <path d="M2617 3125 c-431 -82 -774 -440 -838 -875 -17 -117 -7 -292 24 -410 113 -436 497 -751 947 -777 507 -29 959 313 1076 813 28 117 26 348 -4 467 -94 378 -383 670 -760 768 -105 27 -336 34 -445 14z m378 -310 c84 -21 209 -85 280 -142 116 -94 210 -242 251 -393 23 -87 24 -260 0 -355 -58 -237 -242 -439 -473 -519 -531 -186 -1074 277 -969 828 30 152 94 274 206 386 111 110 237 178 385 206 84 16 235 11 320 -11z"/>\n    <path d="M2918 2568 c2 -90 7 -167 12 -172 17 -17 108 58 201 166 l51 57 -48 31 c-52 33 -131 65 -185 75 l-34 6 3 -163z"/>\n    <path d="M2591 2700 c-62 -22 -167 -82 -164 -94 3 -13 237 -216 249 -216 7 0 15 7 18 16 8 20 8 127 -1 232 -7 95 -8 96 -102 62z"/>\n    <path d="M3209 2355 c-57 -64 -105 -123 -107 -131 -6 -25 46 -35 157 -29 58 3 121 8 139 11 33 5 34 6 27 42 -7 44 -64 167 -92 201 l-19 24 -105 -118z"/>\n    <path d="M2260 2409 c-31 -44 -68 -133 -77 -186 l-6 -33 155 0 c165 0 201 9 181 44 -13 24 -204 216 -214 216 -5 0 -22 -18 -39 -41z"/>\n    <path d="M2786 2354 c-36 -35 0 -87 44 -64 26 14 26 56 1 70 -25 13 -27 13 -45 -6z"/>\n    <path d="M2751 2186 c-57 -32 -68 -111 -22 -157 43 -42 101 -43 143 -1 42 42 41 100 -1 143 -33 32 -78 38 -120 15z"/>\n    <path d="M2560 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z"/>\n    <path d="M3002 2124 c-27 -19 -28 -36 -3 -58 25 -23 61 -6 61 29 0 33 -30 49 -58 29z"/>\n    <path d="M2245 1993 c-77 -6 -76 -5 -59 -65 16 -55 61 -146 92 -186 l18 -23 103 122 c57 67 104 129 105 138 1 14 -14 16 -104 17 -58 0 -127 -1 -155 -3z"/>\n    <path d="M3165 1981 c-44 -4 -61 -10 -63 -22 -3 -16 210 -229 228 -229 22 0 86 141 105 228 l7 32 -109 -2 c-59 -1 -135 -4 -168 -7z"/>\n    <path d="M2776 1914 c-19 -18 -19 -20 -6 -45 6 -11 21 -19 35 -19 20 0 45 24 45 44 0 10 -32 36 -45 36 -7 0 -21 -7 -29 -16z"/>\n    <path d="M2589 1743 c-86 -90 -139 -151 -139 -162 0 -25 179 -101 236 -101 l27 0 -7 143 c-9 166 -13 187 -35 187 -9 0 -46 -30 -82 -67z"/>\n    <path d="M2936 1801 c-6 -10 -24 -168 -29 -258 -3 -60 -2 -63 19 -63 79 0 262 68 248 92 -5 7 -53 64 -108 126 -93 105 -117 124 -130 103z"/>\n    <path d="M10723 3125 c-318 -58 -597 -266 -743 -555 -223 -441 -98 -996 289 -1288 112 -84 188 -125 311 -166 274 -91 545 -70 802 61 552 282 735 983 392 1500 -225 339 -651 521 -1051 448z m385 -315 c348 -98 579 -443 532 -796 -67 -508 -596 -796 -1055 -574 -239 116 -396 352 -412 620 -20 335 192 640 516 745 122 40 289 42 419 5z"/>\n    <path d="M11017 2568 c3 -90 9 -167 14 -172 13 -14 53 18 155 122 l95 97 -23 18 c-50 40 -189 97 -235 97 -10 0 -11 -33 -6 -162z"/>\n    <path d="M10705 2706 c-50 -16 -133 -58 -163 -82 l-23 -19 121 -107 c67 -60 128 -108 135 -108 23 0 27 39 20 186 -8 162 -4 157 -90 130z"/>\n    <path d="M11307 2354 c-59 -65 -107 -126 -107 -136 0 -11 11 -18 38 -22 44 -7 278 7 289 17 15 16 -51 183 -94 236 l-19 24 -107 -119z"/>\n    <path d="M10362 2413 c-39 -62 -70 -134 -78 -184 l-7 -39 152 0 c86 0 161 5 172 10 17 10 18 13 5 38 -8 15 -59 71 -114 125 l-99 99 -31 -49z"/>\n    <path d="M10888 2359 c-24 -14 -23 -56 2 -69 44 -23 80 29 44 64 -18 19 -23 19 -46 5z"/>\n    <path d="M10851 2187 c-49 -29 -66 -101 -35 -146 9 -13 32 -29 50 -37 29 -12 39 -12 68 0 99 41 85 180 -19 192 -24 3 -50 -1 -64 -9z"/>\n    <path d="M10660 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z"/>\n    <path d="M11096 2124 c-9 -8 -16 -22 -16 -29 0 -13 26 -45 36 -45 20 0 44 25 44 45 0 14 -8 29 -19 35 -25 13 -27 13 -45 -6z"/>\n    <path d="M10335 1991 c-60 -6 -60 -6 -57 -36 9 -69 104 -248 122 -229 57 61 210 250 207 258 -4 12 -176 17 -272 7z"/>\n    <path d="M11267 1983 c-68 -5 -79 -19 -47 -60 23 -31 200 -193 210 -193 3 0 20 24 37 53 29 48 52 111 67 180 l6 27 -107 -2 c-60 -1 -134 -3 -166 -5z"/>\n    <path d="M10870 1910 c-16 -31 4 -62 38 -58 21 2 28 9 30 32 5 45 -47 65 -68 26z"/>\n    <path d="M10651 1703 c-56 -59 -101 -113 -101 -120 0 -28 172 -103 237 -103 l26 0 -7 123 c-10 179 -15 207 -36 207 -10 0 -63 -48 -119 -107z"/>\n    <path d="M11035 1801 c-7 -12 -23 -144 -29 -243 -4 -77 -4 -78 19 -78 45 0 130 22 193 51 l64 29 -19 23 c-65 82 -198 227 -209 227 -7 0 -15 -4 -19 -9z"/>\n  </g>\n</svg>`},952:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clickWinnerPage=t.clickRace=t.animation=t.winners=t.carsCount=t.index=t.counterMaxPage=t.page=t.clearAnimation=void 0;const a=n(154);t.counterMaxPage=function(){let e=1;return async()=>(e=await(0,a.getPages)(),e)};const r={pageNumber:1,get number(){return this.pageNumber},set number(e){this.pageNumber=e}};t.page=r;const o={};t.animation=o,t.clearAnimation=function(){for(const e in o)delete o[e]};const c={click:!1,get bool(){return this.click},set bool(e){this.click=e}};t.clickRace=c;const s={click:!1,get bool(){return this.click},set bool(e){this.click=e}};t.clickWinnerPage=s;const i={pageNumber:1,maxPage:1,sortBy:"",sortOrder:"",save:[],race:{},get page(){return this.pageNumber},set page(e){this.pageNumber=e}};t.winners=i;const l={indexNumber:-1,get current(){return this.indexNumber},set current(e){this.indexNumber=e}};t.index=l,t.carsCount=function(e){const t=document.getElementById("cars-amount"),n=Number(t.textContent)+e;return t.innerHTML=String(n)}},126:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.models=t.brands=void 0,t.brands=["Acura","Alfa Romeo","Aston Martin","Audi","Axon","Bentley","BMW","Brilliance","Brooke","Cadillac","Citroen","Chery","Dacia","Daimler","Delage","Dodge","Exeed","Ferrari","Ford","Gardner Douglas","Genesis","Great Wall","Gumpert","Hennessey","Holden","Honda","Hummer","Hupmobile","Infinity","Intermeccanica","Isdera","Jaguar","Jeep","Karma","Keating","Kia","Lamborghini","Lexus","Lincoln","Lotus","Maserati","Mazda","Mercedes","Mitsubishi","Nissan","Olympian Motors","Opel","Peugeot","Pontiac","Porsche","Renault","Rolls-Royce","Rover","Saab","Seat","Skoda","Subaru","Suzuki","Tank","Tesla","Toroidion","Toyota","Troller","Ultima Sports","Vandenbrink","Volkswagen","Volvo","Vortex","Wanderer","Wiesmann","Wuling","XPeng","Yulon","Zenos","Zenvo","Zotye"],t.models=["ILX","TLX","RLX","CDX","RDX","MDX","I3","I8","IX","M1","M2","M3","M4","M5","M6","M7","M8","X1","X2","X3","X3 M","X4","X4 M","X5","X5 M","X6","X6 M","X7","Z4","A1","A3","A4","A4","A5","A6","A7","A7","A8","A8","Q2","Q3","A6","Q7","R8","TT","Q8","2104","2107","2110","4X4","GARNET","GRAN","GR","LOCO","GUS","PRIZE","SAMARA","XRAY","XRAY C","CADENZA","TROPHY","CARNIVAL","CEED","EDDY","EV6","K2","K5","K9","K900","BOON","MOHAVE","MERCY","LUCKY","OPTIMA","FORTUNA","PROCEED","HIT","RIO","CLOUD","JUST","SOUL","MIRA","SPECTRA","STINGER","GENES","GENESIS","GETZ","DELTA","BOUNTY","H-1","I10","I20","I30","I40","ION","IX20","IX25","IX35","IX55","MATRIX","MAX","NF","PAL","SANTA","SOLARIS","SONATA","EXTOL","TUCSON","ROCKY","VENUE","VERNA","tC","xA","xB"]},999:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateRandomCars=void 0;const a=n(126),r=()=>{const e=a.models[Math.floor(Math.random()*a.models.length)];return`${a.brands[Math.floor(Math.random()*a.brands.length)]} ${e}`},o=()=>{let e="#";for(let t=0;t<6;t+=1)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e};t.generateRandomCars=(e=100)=>new Array(e).fill(0).map((()=>({name:r(),color:o()})))},353:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.additionData=t.generateGarage=t.createRoad=void 0;const a=n(944),r=(e,t,n)=>{const r=document.createElement("li");return r.className="road",r.id=`road-${n}`,r.innerHTML=`\n       <div class="car__control">\n            <button class="button btn-select">Select</button>\n            <button class="button btn-remove">Remove</button>\n            <span class="car__name">${e}</span>\n       </div>\n        <div class="race">\n            <div class="control-panel">\n              <button type="button" class="button btn-start">Start</button>\n              <button type="button" class="button btn-stop" disabled>Stop</button>\n            </div>\n             <div class="car">\n                 ${(0,a.createCarImage)(t)}\n             </div>\n             <div class="flag">\n             </div>\n        </div>`,r};t.createRoad=r,t.additionData=function(e,t,n){const a=document.querySelector(".garage"),o=r(e,t,n);a.append(o)},t.generateGarage=e=>{const t=document.querySelector(".garage");for(let n=0;n<e.length;n+=1){const a=r(e[n].name,e[n].color,e[n].id);t.append(a)}}},94:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fillCurrentPage=void 0;const a=n(353),r=n(154),o=n(952);async function c(){const e=document.querySelector(".garage"),t=document.querySelector(".page-num");e.innerHTML="",t.textContent=String(o.page.number);const n=await(0,r.getCurrentGarage)(o.page.number);(0,a.generateGarage)(n),await(0,o.counterMaxPage)()()}t.fillCurrentPage=c,c(),async function(){const e=await(0,r.getAllCars)();(0,o.carsCount)(e.length)}()},890:()=>{const e=document.querySelector("body");console.log("1"),e.insertAdjacentHTML("beforeend",'\n<div class="wrapper">\n  <header class="header">\n    <nav class="header__nav">\n      <button class="button" id="btn-to-garage" disabled> to garage\n      </button>\n      <button class="button" id="btn-to-winners"> to winners\n      </button>\n    </nav>\n    <div class="header__logo"></div>\n  </header>\n  <div class="winners hidden">\n    <h2>Winners: <span class="winners__amount"></span></h2>\n    <h2>Page № <span class="winners__page-num">1</span></h2>\n    <table class="table">\n      <thead>\n      <tr>\n        <th>Number</th>\n        <th>Car</th>\n        <th >Name</th>\n        <th class="table-button table-wins" id="sort-wins">Wins</th>\n        <th class="table-button table-time" id="sort-time">Best time (sec)</th>\n      </tr>\n      </thead>\n      <tbody>\n      </tbody>\n    </table>\n      <button type="button" class="button" id="btn-winners-prev"><span>PREV</span></button>\n      <button type="button" class="button" id="btn-winners-next">NEXT</button>\n  </div>\n  <main class="main">\n    <div class="container-forms">\n      <div class="form" id="create">\n        <label for="nameCar"></label>\n        <input type="text" name="name" id="nameCar" class="input-text">\n        <label for="colorCar"></label>\n        <input type="color" name="color" id="colorCar">\n        <button class="button" id="btn-create" type="submit">Create</button>\n      </div>\n      <div class="form">\n        <label for="updNameCar"></label>\n        <input type="text" name="name" id="updNameCar" class="input-text">\n        <label for="updColorCar"></label>\n        <input type="color" name="color" id="updColorCar">\n        <button class="button" id="btn-update">Update</button>\n      </div>\n\n    </div>\n    <div class="race-control">\n      <button type="button" class="button" id="btn-generate">Generate cars</button>\n      <button type="button" class="button" id="race">RACE</button>\n      <button type="button" class="button" id="reset" disabled>RESET</button>\n    </div>\n    <div class="garage-wrap">\n      <h1 class="garage__title">Garage <span id="cars-amount"></span></h1>\n      <h2 class="garage__page">Page № <span class="page-num">1</span></h2>\n      <ul class="garage">\n    \n      </ul>\n      <div class="pagination">\n        <button type="button" class="button" id="btn-prev"><span>PREV</span></button>\n        <button type="button" class="button" id="btn-next">NEXT</button>\n      </div>\n     <p class="message-winner hidden"></p>\n    </div>\n\n\n  </main>\n</div>')},167:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fillCurrentWinners=void 0;const a=n(154),r=n(944),o=n(952),c=document.querySelector(".winners__page-num");t.fillCurrentWinners=async function(){c.textContent=`${o.winners.page}`;const e=document.querySelector("table tbody");e.innerHTML="";const{items:t}=await(0,a.getWinnersOnPage)(o.winners.page,o.winners.sortBy,o.winners.sortOrder),n=`${t.map(((e,t)=>`\n        <tr>\n          <td>${t+1}</td>\n          <td>${(0,r.createCarImage)(e.car.color)}</td>\n          <td>${e.car.name}</td>\n          <td>${e.wins}</td>\n          <td>${e.time}</td>\n        </tr>\n        `)).join(" ")}`;if(e.insertAdjacentHTML("beforeend",n),!o.clickWinnerPage.bool){console.log("1");const e=await(0,a.getAllWinners)();o.winners.maxPage=Math.ceil(e.length/10)}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(890),n(344),n(126),n(154),n(944),n(353),n(94),n(999),n(753),n(524),n(567),n(167)})();