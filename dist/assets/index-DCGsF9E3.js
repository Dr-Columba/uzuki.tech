(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const v=["首页","公告","手记","ACG","资源","相册","留言"],y=[{title:"迁移记录：从 WordPress 到新的 uzuki.tech",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标跟随和桌宠都可以有，但需要可关闭、低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"},{title:"旧相册整理：一些值得留在首页的瞬间",category:"相册",date:"2026-06-05",views:"1.8k",comments:15,excerpt:"从旧 WordPress 媒体库中挑出适合展示的轻量缩略图，避免直接使用数 MB 原图拖慢加载。",image:"/assets/images/post-5.jpg"},{title:"待办：评论、搜索、归档与管理后台",category:"路线图",date:"2026-06-01",views:"520",comments:3,excerpt:"当前版本先完成视觉和静态结构，之后可接入 REST API、Markdown/MDX 或轻量数据库。",image:"/assets/images/post-6.jpg"}],b=["Vite","TypeScript","ACG","日常","相册","前端","性能","迁移"],h=document.querySelector("#app");if(!h)throw new Error("Missing #app root");h.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="#" aria-label="uzuki.tech 首页">
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${v.map(e=>`<a href="#${e==="首页"?"top":"posts"}">${e}</a>`).join("")}
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
        ${y.map(w).join("")}
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
            ${b.map(e=>`<a href="#">${e}</a>`).join("")}
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

  <div class="cursor-dot" data-cursor-dot aria-hidden="true"></div>
  <div class="cursor-ring" data-cursor-ring aria-hidden="true"></div>
  <button class="backtop" type="button" aria-label="回到顶部" data-backtop>
    <img src="/assets/images/backtop.gif" alt="" />
  </button>
  <button class="pet" type="button" aria-label="隐藏桌宠" title="隐藏桌宠" data-pet>
    <img src="/assets/images/pet.gif" alt="" />
  </button>
`;function w(e){return`
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
  `}const k=document.querySelector("[data-header]"),m=document.querySelector("[data-menu-button]"),L=document.querySelector("[data-nav-links]"),r=document.querySelector("[data-search-modal]"),S=document.querySelector("[data-search-open]"),$=document.querySelector("[data-search-close]"),f=document.querySelector("[data-backtop]"),d=document.querySelector("[data-pet]"),c=document.querySelector("[data-wave]"),g=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.addEventListener("scroll",()=>{k?.classList.toggle("is-scrolled",window.scrollY>20),f?.classList.toggle("is-visible",window.scrollY>420)});m?.addEventListener("click",()=>{L?.classList.toggle("is-open"),m.classList.toggle("is-open")});S?.addEventListener("click",()=>x());$?.addEventListener("click",()=>p());r?.addEventListener("click",e=>{e.target===r&&p()});document.addEventListener("keydown",e=>{e.key==="Escape"&&p()});f?.addEventListener("click",()=>window.scrollTo({top:0,behavior:g?"auto":"smooth"}));d?.addEventListener("click",()=>d.classList.add("is-hidden"));document.addEventListener("click",q);document.addEventListener("keydown",M);function x(){r&&(r.hidden=!1,requestAnimationFrame(()=>{r.classList.add("is-open"),r.querySelector("input")?.focus()}))}function p(){r&&(r.classList.remove("is-open"),window.setTimeout(()=>{r.hidden=!0},180))}function q(e){const t=e.target;if(!(t instanceof Element))return;const s=t.closest('a[href^="#"]');if(s){e.preventDefault(),u(s);return}const n=t.closest("[data-static-action]");n&&u(n)}function M(e){if(e.key!=="Enter"&&e.key!==" ")return;const t=e.target;t instanceof HTMLElement&&t.matches("[data-static-action]")&&(e.preventDefault(),u(t))}function u(e){e.classList.remove("is-clicked"),e.offsetWidth,e.classList.add("is-clicked"),window.setTimeout(()=>e.classList.remove("is-clicked"),220)}g||(E(),P(),T(),j());fetch("https://v1.hitokoto.cn/?c=a").then(e=>e.json()).then(e=>{const t=document.querySelector("[data-hitokoto]");t&&e.hitokoto&&(t.textContent=e.hitokoto)}).catch(()=>{});function E(){const e=document.querySelector("[data-cursor-dot]"),t=document.querySelector("[data-cursor-ring]");if(!e||!t)return;let s=window.innerWidth/2,n=window.innerHeight/2,a=s,o=n;window.addEventListener("pointermove",l=>{a=l.clientX,o=l.clientY,e.style.transform=`translate(${a}px, ${o}px)`});const i=()=>{s+=(a-s)*.16,n+=(o-n)*.16,t.style.transform=`translate(${s}px, ${n}px)`,requestAnimationFrame(i)};i()}function P(){if(!d)return;let e=0;const t=()=>{e+=.012,d.style.setProperty("--pet-y",`${Math.sin(e)*10}px`),requestAnimationFrame(t)};t()}function T(){if(!c)return;const e=c.getContext("2d");if(!e)return;const t=(s=0)=>{const n=c.clientWidth,a=c.clientHeight,o=window.devicePixelRatio||1;c.width=Math.floor(n*o),c.height=Math.floor(a*o),e.setTransform(o,0,0,o,0,0),e.clearRect(0,0,n,a),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,a);for(let i=0;i<=n;i+=8){const l=44+Math.sin(i*.014+s*.0018)*9+Math.sin(i*.028+s*.001)*5;e.lineTo(i,l)}e.lineTo(n,a),e.closePath(),e.fill(),requestAnimationFrame(t)};t()}function j(){const t=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const s=document.createElement("span"),n=8+Math.random()*10;s.className="sakura",s.style.left=`${Math.random()*100}vw`,s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.animationDuration=`${7+Math.random()*7}s`,s.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(s),window.setTimeout(()=>s.remove(),15e3)};window.setInterval(t,650)}
