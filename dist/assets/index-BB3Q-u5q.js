(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const $=["首页","公告","手记","ACG","资源","相册","留言"],q=[{title:"迁移记录：从 WordPress 到新的 uzuki.tech",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标跟随和桌宠都可以有，但需要可关闭、低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"},{title:"旧相册整理：一些值得留在首页的瞬间",category:"相册",date:"2026-06-05",views:"1.8k",comments:15,excerpt:"从旧 WordPress 媒体库中挑出适合展示的轻量缩略图，避免直接使用数 MB 原图拖慢加载。",image:"/assets/images/post-5.jpg"},{title:"待办：评论、搜索、归档与管理后台",category:"路线图",date:"2026-06-01",views:"520",comments:3,excerpt:"当前版本先完成视觉和静态结构，之后可接入 REST API、Markdown/MDX 或轻量数据库。",image:"/assets/images/post-6.jpg"}],E=["Vite","TypeScript","ACG","日常","相册","前端","性能","迁移"],b=document.querySelector("#app");if(!b)throw new Error("Missing #app root");b.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="#" aria-label="uzuki.tech 首页">
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${$.map(e=>`<a href="#${e==="首页"?"top":"posts"}">${e}</a>`).join("")}
        <button class="search-trigger" type="button" data-search-open>Search</button>
      </div>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-label="博客头图">
      <div class="hero-bg" role="img" aria-label="二次元风格头图"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="eyebrow">Personal Blog</p>
        <p class="hero-text">把日常、技术笔记与收藏慢慢整理成一个轻快的新家。</p>
        <div class="hero-actions">
          <a href="#posts" class="primary-action">查看文章</a>
          <a href="#about" class="ghost-action">关于本站</a>
        </div>
      </div>
      <canvas class="wave-canvas" data-wave aria-hidden="true"></canvas>
    </section>

    <section class="quote-band" aria-label="一句话">
      <span>Home</span>
      <p data-hitokoto>每个人的心里，都有一个忘不记，却无法拥抱珍惜的人。</p>
    </section>

    <section class="content-shell" id="posts">
      <div class="post-column" aria-label="文章列表">
        ${q.map(P).join("")}
        <nav class="pagination" aria-label="分页">
          <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
        </nav>
      </div>

      <aside class="sidebar" id="about" aria-label="侧边栏">
        <section class="profile-panel">
          <img src="/assets/images/hero-alt.jpg" alt="" />
          <h2>Uzuki</h2>
          <p>个人博客重建中。这里会放技术笔记、生活记录、ACG 收藏和项目进度。</p>
        </section>
        <section class="side-panel">
          <h2>分类</h2>
          <a href="#">公告通知 <span>3</span></a>
          <a href="#">技术笔记 <span>8</span></a>
          <a href="#">生活手记 <span>12</span></a>
          <a href="#">相册收藏 <span>6</span></a>
        </section>
        <section class="side-panel">
          <h2>标签</h2>
          <div class="tag-cloud">
            ${E.map(e=>`<a href="#">${e}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 uzuki.tech | Theme inspired by LoLiMeow, rebuilt as a modern static frontend.</p>
  </footer>

  <div class="search-modal" data-search-modal hidden>
    <button class="search-close" type="button" aria-label="关闭搜索" data-search-close>X</button>
    <form class="search-box">
      <label for="site-search">Search</label>
      <input id="site-search" type="search" placeholder="输入搜索关键词..." autocomplete="off" />
    </form>
  </div>

  <canvas class="mouse-trail" data-mouse-trail aria-hidden="true"></canvas>
  <button class="backtop" type="button" aria-label="回到顶部" data-backtop>
    <img src="/assets/images/backtop.gif" alt="" />
  </button>
  <button class="pet" type="button" aria-label="隐藏桌宠" title="隐藏桌宠" data-pet>
    <img src="/assets/images/pet.gif" alt="" />
  </button>
`;function P(e){return`
    <article class="${e.featured?"post-card featured":"post-card"}" role="button" tabindex="0" data-static-action>
      ${e.image?`<a class="post-image" href="#"><img src="${e.image}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="#">${e.category}</a>
        <h2><a href="#">${e.title}</a></h2>
        <p>${e.excerpt}</p>
        <div class="post-meta">
          <span>${e.date}</span>
          <span>${e.views} views</span>
          <span>${e.comments} comments</span>
        </div>
      </div>
    </article>
  `}const T=document.querySelector("[data-header]"),y=document.querySelector("[data-menu-button]"),A=document.querySelector("[data-nav-links]"),c=document.querySelector("[data-search-modal]"),j=document.querySelector("[data-search-open]"),C=document.querySelector("[data-search-close]"),k=document.querySelector("[data-backtop]"),p=document.querySelector("[data-pet]"),l=document.querySelector("[data-wave]"),L=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.addEventListener("scroll",()=>{T?.classList.toggle("is-scrolled",window.scrollY>20),k?.classList.toggle("is-visible",window.scrollY>420)});y?.addEventListener("click",()=>{A?.classList.toggle("is-open"),y.classList.toggle("is-open")});j?.addEventListener("click",()=>z());C?.addEventListener("click",()=>f());c?.addEventListener("click",e=>{e.target===c&&f()});document.addEventListener("keydown",e=>{e.key==="Escape"&&f()});k?.addEventListener("click",()=>window.scrollTo({top:0,behavior:L?"auto":"smooth"}));p?.addEventListener("click",()=>p.classList.add("is-hidden"));document.addEventListener("click",F);document.addEventListener("keydown",I);function z(){c&&(c.hidden=!1,requestAnimationFrame(()=>{c.classList.add("is-open"),c.querySelector("input")?.focus()}))}function f(){c&&(c.classList.remove("is-open"),window.setTimeout(()=>{c.hidden=!0},180))}function F(e){const t=e.target;if(!(t instanceof Element))return;const a=t.closest('a[href^="#"]');if(a){e.preventDefault(),m(a);return}const n=t.closest("[data-static-action]");n&&m(n)}function I(e){if(e.key!=="Enter"&&e.key!==" ")return;const t=e.target;t instanceof HTMLElement&&t.matches("[data-static-action]")&&(e.preventDefault(),m(t))}function m(e){e.classList.remove("is-clicked"),e.offsetWidth,e.classList.add("is-clicked"),window.setTimeout(()=>e.classList.remove("is-clicked"),220)}L||(W(),H(),O(),D());fetch("https://v1.hitokoto.cn/?c=a").then(e=>e.json()).then(e=>{const t=document.querySelector("[data-hitokoto]");t&&e.hitokoto&&(t.textContent=e.hitokoto)}).catch(()=>{});function W(){const e=document.querySelector("[data-mouse-trail]"),t=e?.getContext("2d");if(!e||!t)return;const a=[],n=24,s=520;let o=0,i=0;const d=()=>{const r=window.devicePixelRatio||1;e.width=Math.floor(window.innerWidth*r),e.height=Math.floor(window.innerHeight*r),e.style.width=`${window.innerWidth}px`,e.style.height=`${window.innerHeight}px`,t.setTransform(r,0,0,r,0,0)},g=r=>{t.clearRect(0,0,window.innerWidth,window.innerHeight);for(let u=a.length-1;u>=0;u--){const h=a[u],v=r-h.age;if(v>s){a.splice(u,1);continue}const w=v/s,M=(1-w)*.72,S=9-w*6;t.beginPath(),t.fillStyle=`rgba(255, 120, 172, ${M})`,t.shadowColor="rgba(255, 120, 172, 0.34)",t.shadowBlur=12,t.arc(h.x,h.y,S,0,Math.PI*2),t.fill()}t.shadowBlur=0,a.length>0||r-i<900?o=requestAnimationFrame(g):o=0},x=()=>{o===0&&(o=requestAnimationFrame(g))};window.addEventListener("resize",d),window.addEventListener("pointermove",r=>{r.pointerType!=="touch"&&(i=performance.now(),a.push({x:r.clientX,y:r.clientY,age:i}),a.length>n&&a.shift(),x())},{passive:!0}),d()}function H(){if(!p)return;let e=0;const t=()=>{e+=.012,p.style.setProperty("--pet-y",`${Math.sin(e)*10}px`),requestAnimationFrame(t)};t()}function O(){if(!l)return;const e=l.getContext("2d");if(!e)return;const t=(a=0)=>{const n=l.clientWidth,s=l.clientHeight,o=window.devicePixelRatio||1;l.width=Math.floor(n*o),l.height=Math.floor(s*o),e.setTransform(o,0,0,o,0,0),e.clearRect(0,0,n,s),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,s);for(let i=0;i<=n;i+=8){const d=44+Math.sin(i*.014+a*.0018)*9+Math.sin(i*.028+a*.001)*5;e.lineTo(i,d)}e.lineTo(n,s),e.closePath(),e.fill(),requestAnimationFrame(t)};t()}function D(){const t=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),n=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${n}px`,a.style.height=`${n}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(t,650)}
