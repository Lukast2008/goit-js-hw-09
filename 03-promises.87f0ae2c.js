function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequired7c6=i);var r=i("eWCmQ");const l=document.querySelector("form");let u=0,d=0,a=0;function s(e,t){const n=Math.random()>.3;return new Promise(((o,i)=>{setTimeout((()=>{n?o({position:e,delay:t}):i({position:e,delay:t})}),u)}))}l.addEventListener("submit",(function(t){t.preventDefault();const{delay:n,step:o,amount:i}=t.target.elements;u=Number(n.value),d=Number(o.value),a=Number(i.value);for(let t=1;t<=a;t+=1)s(t,u).then((({position:t,delay:n})=>{e(r).Notify.info(`✅ Fulfilled promise ${t} in ${n}ms`)})).catch((({position:t,delay:n})=>{e(r).Notify.info(`❌ Rejected promise ${t} in ${n}ms`)})),u+=d}));
//# sourceMappingURL=03-promises.87f0ae2c.js.map
