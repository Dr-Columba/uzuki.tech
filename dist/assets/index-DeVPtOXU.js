(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const q=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],L={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},E=[{title:"迁移记录：从 WordPress 到新的卯月科技",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标轨迹和桌宠都可以有，但需要可关闭、低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"},{title:"旧相册整理：一些值得留在首页的瞬间",category:"相册",date:"2026-06-05",views:"1.8k",comments:15,excerpt:"从旧 WordPress 媒体库中挑出适合展示的轻量缩略图，避免直接使用数 MB 原图拖慢加载。",image:"/assets/images/post-5.jpg"},{title:"待办：评论、搜索、归档与管理后台",category:"路线图",date:"2026-06-01",views:"520",comments:3,excerpt:"当前版本先完成视觉和静态结构，之后可接入 REST API、Markdown/MDX 或轻量数据库。",image:"/assets/images/post-6.jpg"}],T=["Vite","TypeScript","Bun","Hono","SQLite","ACG","前端","迁移"],x=document.querySelector("#app");if(!x)throw new Error("Missing #app root");x.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${q.map(e=>`<a href="${e.path}" data-route>${e.label}</a>`).join("")}
        <button class="search-trigger" type="button" data-search-open>Search</button>
      </div>
    </nav>
  </header>

  <main id="page-root"></main>

  <footer class="site-footer">
    <p>© 2026 卯月科技 | Static frontend with Bun/Hono backend reserved.</p>
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
`;const p=document.querySelector("#page-root"),H=document.querySelector("[data-header]"),g=document.querySelector("[data-menu-button]"),S=document.querySelector("[data-nav-links]"),c=document.querySelector("[data-search-modal]"),C=document.querySelector("[data-search-open]"),I=document.querySelector("[data-search-close]"),M=document.querySelector("[data-backtop]"),h=document.querySelector("[data-pet]"),m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;v();window.addEventListener("popstate",v);window.addEventListener("scroll",()=>{H?.classList.toggle("is-scrolled",window.scrollY>20),M?.classList.toggle("is-visible",window.scrollY>420)});g?.addEventListener("click",()=>{S?.classList.toggle("is-open"),g.classList.toggle("is-open")});C?.addEventListener("click",()=>V());I?.addEventListener("click",()=>w());c?.addEventListener("click",e=>{e.target===c&&w()});document.addEventListener("keydown",e=>{e.key==="Escape"&&w()});M?.addEventListener("click",()=>window.scrollTo({top:0,behavior:m?"auto":"smooth"}));h?.addEventListener("click",()=>h.classList.add("is-hidden"));document.addEventListener("click",R);document.addEventListener("keydown",W);document.addEventListener("input",z);m||(K(),U(),_());function v(){if(!p)return;const e=window.location.pathname;if(j(e),e==="/admin"){p.innerHTML=G(),Y();return}if(e!=="/"&&L[e]){p.innerHTML=F(L[e]);return}p.innerHTML=B(),Q(),X()}function j(e){document.querySelectorAll("[data-route]").forEach(t=>{const a=t.pathname===e||e==="/"&&t.pathname==="/";t.classList.toggle("is-active",a)})}function B(){return`
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
        ${E.map(N).join("")}
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
          <a href="/announcements" data-route>公告通知 <span>3</span></a>
          <a href="/notes" data-route>技术笔记 <span>8</span></a>
          <a href="/notes" data-route>生活手记 <span>12</span></a>
          <a href="/gallery" data-route>相册收藏 <span>6</span></a>
        </section>
        <section class="side-panel">
          <h2>标签</h2>
          <div class="tag-cloud">
            ${T.map(e=>`<a href="#">${e}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>
  `}function F(e){return`
    <section class="subpage-hero">
      <div>
        <span>${e.eyebrow}</span>
        <h1>${e.title}</h1>
        <p>${e.description}</p>
      </div>
    </section>
    <section class="empty-state">
      <h2>内容准备中</h2>
      <p>这个页面已经预留路由、导航和基础样式，后续接入后端文章分类后会自动填充内容。</p>
    </section>
  `}function G(){return`
    <section class="admin-shell">
      <header class="admin-head">
        <div>
          <span>Admin</span>
          <h1>后台管理</h1>
          <p>隐藏入口页面，用于后续文章发布、图片上传、嵌入预览和评论管理。</p>
        </div>
        <div class="api-status" data-api-status>API: checking...</div>
      </header>

      <section class="admin-grid">
        <form class="admin-panel" data-static-action>
          <h2>登录占位</h2>
          <label>用户名<input type="text" value="administrator" autocomplete="username" /></label>
          <label>密码<input type="password" placeholder="部署后使用本地生成的强密码" autocomplete="current-password" /></label>
          <button type="button">登录</button>
        </form>

        <form class="admin-panel editor-panel" data-static-action>
          <h2>Markdown 编辑器占位</h2>
          <label>标题<input type="text" placeholder="文章标题" /></label>
          <label>Slug<input type="text" placeholder="article-slug" /></label>
          <label>分类<input type="text" placeholder="公告 / 手记 / ACG / 资源 / 相册" /></label>
          <label>正文<textarea data-md-source rows="12" placeholder="支持 Markdown。Bilibili iframe 可粘贴到这里预览。"></textarea></label>
          <div class="editor-actions">
            <button type="button">保存草稿</button>
            <button type="button">发布</button>
            <button type="button">上传图片</button>
          </div>
        </form>

        <section class="admin-panel preview-panel">
          <h2>预览</h2>
          <div class="markdown-preview" data-md-preview>输入 Markdown 后这里会显示预览。</div>
        </section>
      </section>
    </section>
  `}function N(e){return`
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
  `}function R(e){const t=e.target;if(!(t instanceof Element))return;const a=t.closest("a[data-route]");if(a){e.preventDefault(),history.pushState({},"",a.pathname),S?.classList.remove("is-open"),g?.classList.remove("is-open"),v(),window.scrollTo({top:0,behavior:m?"auto":"smooth"});return}const o=t.closest('a[href^="#"]');if(o){e.preventDefault(),b(o);const n=o.getAttribute("href")?.slice(1);n&&document.getElementById(n)?.scrollIntoView({behavior:m?"auto":"smooth"});return}const s=t.closest("[data-static-action]");s&&b(s)}function W(e){if(e.key!=="Enter"&&e.key!==" ")return;const t=e.target;t instanceof HTMLElement&&t.matches("[data-static-action]")&&(e.preventDefault(),b(t))}function z(e){const t=e.target;if(!(t instanceof HTMLTextAreaElement)||!t.matches("[data-md-source]"))return;const a=document.querySelector("[data-md-preview]");a&&(a.innerHTML=D(t.value))}function D(e){return O(e.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(o,s)=>`<iframe class="embed-preview" src="https:${s}" loading="lazy" allowfullscreen></iframe>`).split(/\n{2,}/).map(o=>`<p>${o.replace(/\n/g,"<br />")}</p>`).join("")}function O(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function b(e){e.classList.remove("is-clicked"),e.offsetWidth,e.classList.add("is-clicked"),window.setTimeout(()=>e.classList.remove("is-clicked"),220)}function V(){c&&(c.hidden=!1,requestAnimationFrame(()=>{c.classList.add("is-open"),c.querySelector("input")?.focus()}))}function w(){c&&(c.classList.remove("is-open"),window.setTimeout(()=>{c.hidden=!0},180))}function X(){fetch("https://v1.hitokoto.cn/?c=a").then(e=>e.json()).then(e=>{const t=document.querySelector("[data-hitokoto]");t&&e.hitokoto&&(t.textContent=e.hitokoto)}).catch(()=>{})}function Y(){const e=document.querySelector("[data-api-status]");e&&fetch("/api/health").then(t=>t.json()).then(t=>{e.textContent=t.ok&&t.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{e.textContent="API: not deployed"})}function K(){const e=document.querySelector("[data-mouse-trail]"),t=e?.getContext("2d");if(!e||!t)return;const a=[],o=24,s=520;let n=0,i=0;const l=()=>{const r=window.devicePixelRatio||1;e.width=Math.floor(window.innerWidth*r),e.height=Math.floor(window.innerHeight*r),e.style.width=`${window.innerWidth}px`,e.style.height=`${window.innerHeight}px`,t.setTransform(r,0,0,r,0,0)},d=r=>{t.clearRect(0,0,window.innerWidth,window.innerHeight);for(let u=a.length-1;u>=0;u--){const f=a[u],y=r-f.age;if(y>s){a.splice(u,1);continue}const k=y/s,P=(1-k)*.72,$=9-k*6;t.beginPath(),t.fillStyle=`rgba(255, 120, 172, ${P})`,t.shadowColor="rgba(255, 120, 172, 0.34)",t.shadowBlur=12,t.arc(f.x,f.y,$,0,Math.PI*2),t.fill()}t.shadowBlur=0,a.length>0||r-i<900?n=requestAnimationFrame(d):n=0},A=()=>{n===0&&(n=requestAnimationFrame(d))};window.addEventListener("resize",l),window.addEventListener("pointermove",r=>{r.pointerType!=="touch"&&(i=performance.now(),a.push({x:r.clientX,y:r.clientY,age:i}),a.length>o&&a.shift(),A())},{passive:!0}),l()}function U(){if(!h)return;let e=0;const t=()=>{e+=.012,h.style.setProperty("--pet-y",`${Math.sin(e)*10}px`),requestAnimationFrame(t)};t()}function Q(){const e=document.querySelector("[data-wave]");if(!e)return;const t=e.getContext("2d");if(!t)return;const a=(o=0)=>{if(!document.body.contains(e))return;const s=e.clientWidth,n=e.clientHeight,i=window.devicePixelRatio||1;e.width=Math.floor(s*i),e.height=Math.floor(n*i),t.setTransform(i,0,0,i,0,0),t.clearRect(0,0,s,n),t.fillStyle="rgba(255, 255, 255, 0.96)",t.beginPath(),t.moveTo(0,n);for(let l=0;l<=s;l+=8){const d=44+Math.sin(l*.014+o*.0018)*9+Math.sin(l*.028+o*.001)*5;t.lineTo(l,d)}t.lineTo(s,n),t.closePath(),t.fill(),requestAnimationFrame(a)};a()}function _(){const t=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(t,650)}
