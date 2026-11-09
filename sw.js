var V="sunno-v1",SHELL=["app.html","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==location.origin)return;
 if(r.mode==="navigate"&&/\/app\.html$/.test(u.pathname)){
  e.respondWith(fetch(r).then(function(x){var cp=x.clone();caches.open(V).then(function(c){c.put("app.html",cp)});return x}).catch(function(){return caches.match("app.html").then(function(m){return m||new Response("Internet nahi hai. Dobara koshish karein.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}})})}));
  return;
 }
 if(/\.png$/.test(u.pathname)){e.respondWith(caches.match(r).then(function(m){return m||fetch(r)}))}
});
