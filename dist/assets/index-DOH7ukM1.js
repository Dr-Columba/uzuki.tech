(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const W=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],M={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},U=[{title:"迁移记录：从 WordPress 到新的卯月科技",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标轨迹和桌宠都可以有，但需要低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"}],G=["Vite","TypeScript","Bun","Hono","SQLite","ACG","前端","迁移"],C=document.querySelector("#app");if(!C)throw new Error("Missing #app root");C.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${W.map(e=>`<a href="${e.path}" data-route>${e.label}</a>`).join("")}
        <button class="search-trigger" type="button" data-search-open>Search</button>
      </div>
    </nav>
  </header>

  <main id="page-root"></main>

  <footer class="site-footer">
    <p>© 2026 卯月科技 | Static frontend with Bun/Hono backend.</p>
  </footer>

  <div class="search-modal" data-search-modal hidden>
    <button class="search-close" type="button" aria-label="关闭搜索" data-search-close>X</button>
    <form class="search-box">
      <label for="site-search">Search</label>
      <input id="site-search" type="search" placeholder="输入搜索关键词..." autocomplete="off" />
    </form>
  </div>

  <canvas class="mouse-trail" data-mouse-trail aria-hidden="true"></canvas>
  <div class="toast-root" data-toast-root aria-live="polite" aria-atomic="true"></div>
  <button class="backtop" type="button" aria-label="回到顶部" data-backtop>
    <img src="/assets/images/backtop.gif" alt="" />
  </button>
  <button class="pet" type="button" aria-label="隐藏桌宠" title="隐藏桌宠" data-pet>
    <img src="/assets/images/pet.gif" alt="" />
  </button>
`;const m=document.querySelector("#page-root"),V=document.querySelector("[data-header]"),b=document.querySelector("[data-menu-button]"),H=document.querySelector("[data-nav-links]"),p=document.querySelector("[data-search-modal]"),Y=document.querySelector("[data-search-open]"),J=document.querySelector("[data-search-close]"),j=document.querySelector("[data-backtop]"),y=document.querySelector("[data-pet]"),v=window.matchMedia("(prefers-reduced-motion: reduce)").matches;A();window.addEventListener("popstate",A);window.addEventListener("scroll",()=>{V?.classList.toggle("is-scrolled",window.scrollY>20),j?.classList.toggle("is-visible",window.scrollY>420)});b?.addEventListener("click",()=>{H?.classList.toggle("is-open"),b.classList.toggle("is-open")});Y?.addEventListener("click",()=>fe());J?.addEventListener("click",()=>q());p?.addEventListener("click",e=>{e.target===p&&q()});document.addEventListener("keydown",e=>{e.key==="Escape"&&q()});j?.addEventListener("click",()=>window.scrollTo({top:0,behavior:v?"auto":"smooth"}));y?.addEventListener("click",()=>y.classList.add("is-hidden"));document.addEventListener("click",ce);document.addEventListener("keydown",le);document.addEventListener("input",de);document.addEventListener("change",ue);v||(ve(),we(),Se());function A(){if(!m)return;const e=window.location.pathname;if(K(e),e==="/admin"){m.innerHTML=_(),ye(),ne();return}if(e.startsWith("/articles/")){m.innerHTML=Z(),te(decodeURIComponent(e.replace("/articles/","")));return}if(e!=="/"&&M[e]){m.innerHTML=Q(M[e]);return}m.innerHTML=X(),be(),ge(),O()}function K(e){document.querySelectorAll("[data-route]").forEach(t=>{const a=t.pathname===e||e==="/"&&t.pathname==="/";t.classList.toggle("is-active",a)})}function X(){return`
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
      <div class="post-column" aria-label="文章列表" data-post-column>
        ${U.map(D).join("")}
        ${N()}
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
            ${G.map(e=>`<a href="#" data-static-action>${e}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>
  `}function Q(e){return`
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
  `}function _(){return`
    <section class="admin-shell">
      <header class="admin-head">
        <div>
          <span>Admin</span>
          <h1>后台管理</h1>
          <p>隐藏入口页面，用于文章发布、图片上传、嵌入预览和后续评论管理。</p>
        </div>
        <div class="api-status" data-api-status>API: checking...</div>
      </header>

      <section class="admin-grid">
        <form class="admin-panel" data-admin-login>
          <h2>登录</h2>
          <label>用户名<input type="text" value="administrator" autocomplete="username" data-login-username /></label>
          <label>密码<input type="password" placeholder="本地生成的 administrator 密码" autocomplete="current-password" data-login-password /></label>
          <button type="button" data-login-button>登录</button>
          <p class="admin-message" data-admin-message></p>
        </form>

        <section class="admin-panel admin-list-panel" data-admin-content hidden>
          <div class="admin-panel-title">
            <h2>文章</h2>
            <button type="button" data-logout-button>退出</button>
          </div>
          <div class="admin-list" data-admin-article-list>正在读取...</div>
        </section>

        <form class="admin-panel editor-panel" data-admin-content hidden>
          <h2>Markdown 编辑器</h2>
          <label>标题<input type="text" placeholder="文章标题" data-article-title /></label>
          <label>Slug<input type="text" placeholder="article-slug" data-article-slug /></label>
          <label>分类<input type="text" placeholder="公告 / 手记 / ACG / 资源 / 相册" data-article-category /></label>
          <label>摘要<textarea rows="3" placeholder="首页文章摘要" data-article-summary></textarea></label>
          <label>封面图<input type="text" placeholder="/api/uploads/..." data-article-cover /></label>
          <label>正文<textarea data-md-source rows="14" placeholder="支持 Markdown。Bilibili iframe 可粘贴到这里预览。"></textarea></label>
          <input type="file" accept="image/*" data-upload-file hidden />
          <div class="editor-actions">
            <button type="button" data-save-draft>保存草稿</button>
            <button type="button" data-publish-article>发布</button>
            <button type="button" data-upload-button>上传图片</button>
          </div>
        </form>

        <section class="admin-panel preview-panel" data-admin-content hidden>
          <h2>预览</h2>
          <div class="markdown-preview" data-md-preview>输入 Markdown 后这里会显示预览。</div>
        </section>
      </section>
    </section>
  `}function D(e){const t=e.featured?"post-card featured":"post-card",a=e.slug?`/articles/${encodeURIComponent(e.slug)}`:"#",o=e.slug?"data-route":"";return`
    <article class="${t}" role="button" tabindex="0" data-static-action>
      ${e.image?`<a class="post-image" href="${a}" ${o}><img src="${d(e.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="#" data-static-action>${d(e.category)}</a>
        <h2><a href="${a}" ${o}>${d(e.title)}</a></h2>
        <p>${d(e.excerpt)}</p>
        <div class="post-meta">
          <span>${d(e.date)}</span>
          <span>${e.views} views</span>
          <span>${e.comments} comments</span>
        </div>
      </div>
    </article>
  `}function N(){return`
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `}function Z(){return`
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `}function ee(e){return`
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${e.coverImage?`<img class="article-cover" src="${d(e.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${d(e.category)}</p>
      <h1>${d(e.title)}</h1>
      <p class="article-meta">${L(e.publishedAt??e.updatedAt)}</p>
      <div class="article-content">${e.html||F(e.markdown)}</div>
    </article>
  `}async function O(){const e=document.querySelector("[data-post-column]");if(e)try{const t=await fetch("/api/articles");if(!t.ok)throw new Error("Failed to load articles");const a=await t.json();if(!a.articles?.length)return;const o=a.articles.map((n,i)=>ae(n,i===0));e.innerHTML=`${o.map(D).join("")}${N()}`}catch{}}async function te(e){if(m)try{const t=await fetch(`/api/articles/${encodeURIComponent(e)}`);if(!t.ok)throw new Error("Not found");const a=await t.json();if(!a.article)throw new Error("Not found");m.innerHTML=ee(a.article)}catch{m.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function ae(e,t=!1){return{id:e.id,slug:e.slug,title:e.title,category:e.category,date:L(e.publishedAt??e.updatedAt),views:"0",comments:0,excerpt:e.summary||he(e.html).slice(0,96),image:e.coverImage||"/assets/images/post-1.jpg",featured:t,html:e.html}}async function ne(){try{const e=await fetch("/api/admin/me",{credentials:"include"});if(!e.ok)throw new Error("Session unavailable");const t=await e.json();if(t.user?.role==="administrator"){B(t.user),await k();return}}catch{}l("请输入 administrator 密码登录。")}async function oe(){const e=document.querySelector("[data-login-username]")?.value.trim()??"",t=document.querySelector("[data-login-password]")?.value??"";l("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:e,password:t})});if(!a.ok)throw new Error("登录失败");const o=await a.json();B(o.user),u("登录成功。"),await k()}catch{l("登录失败，请检查密码。","error"),u("登录失败，请检查密码。","error")}}async function ie(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!0}),l("已退出登录。"),u("已退出登录。")}function B(e){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!1}),l(`已登录：${e.username}`)}function l(e,t="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=e,a.classList.toggle("error",t==="error"))}async function k(){const e=document.querySelector("[data-admin-article-list]");if(e){e.textContent="正在读取...";try{const t=await fetch("/api/admin/articles",{credentials:"include"});if(!t.ok)throw new Error("Failed to load admin articles");const o=(await t.json()).articles??[];e.innerHTML=o.length?o.map(n=>`
              <button type="button" class="admin-list-item" data-static-action>
                <span>${d(n.title)}</span>
                <small>${n.status==="published"?"已发布":"草稿"} · ${L(n.updatedAt)}</small>
              </button>
            `).join(""):"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{e.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}}async function T(e){const t=document.querySelector("[data-article-title]"),a=document.querySelector("[data-article-slug]"),o=document.querySelector("[data-article-category]"),n=document.querySelector("[data-article-summary]"),i=document.querySelector("[data-article-cover]"),r=document.querySelector("[data-md-source]"),c=t?.value.trim()??"",h=me(a?.value||c),w=o?.value.trim()||"手记",s=r?.value??"";if(!c||!h||!s.trim()){l("标题、Slug 和正文不能为空。","error"),u("标题、Slug 和正文不能为空。","error");return}l(e==="published"?"正在发布...":"正在保存草稿..."),u(e==="published"?"正在发布文章...":"正在保存草稿..."),P(!0);try{const f=await fetch("/api/admin/articles",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:c,slug:h,category:w,summary:n?.value.trim()??"",coverImage:i?.value.trim()??"",markdown:s,status:e})});if(!f.ok)throw new Error("Save failed");const g=await f.json();a.value=g.article.slug,l(e==="published"?"文章已发布。":"草稿已保存。"),u(e==="published"?"文章已发布。":"草稿已保存。"),await k(),e==="published"&&await O(),e==="published"&&se()}catch{l("保存失败。Slug 可能已存在，或登录状态已过期。","error"),u("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{P(!1)}}async function re(e){l("正在上传图片..."),u("正在上传图片..."),I(!0);const t=new FormData;t.append("file",e);try{const a=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:t});if(!a.ok)throw new Error("Upload failed");const n=(await a.json()).upload?.path;if(!n)throw new Error("Upload path missing");const i=document.querySelector("[data-article-cover]"),r=document.querySelector("[data-md-source]");i&&!i.value&&(i.value=n),r&&(r.value=`${r.value.trim()}

![${e.name}](${n})`.trim(),$(r.value)),l("图片已上传，并已插入正文。"),u("图片已上传，并已插入正文。")}catch{l("图片上传失败，请确认已登录且文件小于 5MB。","error"),u("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{I(!1)}}function P(e){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(t=>{t.disabled=e,t.classList.toggle("is-busy",e)})}function I(e){document.querySelectorAll("[data-upload-button]").forEach(t=>{t.disabled=e,t.classList.toggle("is-busy",e)})}function se(){document.querySelectorAll("[data-article-title], [data-article-slug], [data-article-category], [data-article-summary], [data-article-cover], [data-md-source]").forEach(e=>{e.value=""}),$("")}function ce(e){const t=e.target;if(!(t instanceof Element))return;if(t.closest("[data-login-button]")){e.preventDefault(),oe();return}if(t.closest("[data-logout-button]")){e.preventDefault(),ie();return}if(t.closest("[data-save-draft]")){e.preventDefault(),T("draft");return}if(t.closest("[data-publish-article]")){e.preventDefault(),T("published");return}if(t.closest("[data-upload-button]")){e.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const a=t.closest("a[data-route]");if(a){e.preventDefault(),pe(a.pathname);return}const o=t.closest('a[href^="#"]');if(o){e.preventDefault(),S(o);const i=o.getAttribute("href")?.slice(1);i&&document.getElementById(i)?.scrollIntoView({behavior:v?"auto":"smooth"});return}const n=t.closest("[data-static-action]");n&&S(n)}function le(e){if(e.key!=="Enter"&&e.key!==" ")return;const t=e.target;t instanceof HTMLElement&&t.matches("[data-static-action]")&&(e.preventDefault(),S(t))}function de(e){const t=e.target;!(t instanceof HTMLTextAreaElement)||!t.matches("[data-md-source]")||$(t.value)}function ue(e){const t=e.target;if(!(t instanceof HTMLInputElement)||!t.matches("[data-upload-file]"))return;const a=t.files?.[0];a&&(re(a),t.value="")}function $(e){const t=document.querySelector("[data-md-preview]");t&&(t.innerHTML=F(e)||"输入 Markdown 后这里会显示预览。")}function F(e){return d(e.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(o,n)=>`<iframe class="embed-preview" src="https:${n}" loading="lazy" allowfullscreen></iframe>`).split(/\n{2,}/).map(o=>{if(o.startsWith("# "))return`<h1>${o.slice(2)}</h1>`;if(o.startsWith("## "))return`<h2>${o.slice(3)}</h2>`;const n=o.match(/^!\[(.*?)\]\((.*?)\)$/);return n?`<img src="${n[2]}" alt="${n[1]}" loading="lazy" />`:`<p>${o.replace(/\n/g,"<br />")}</p>`}).join("")}function pe(e){history.pushState({},"",e),H?.classList.remove("is-open"),b?.classList.remove("is-open"),A(),window.scrollTo({top:0,behavior:v?"auto":"smooth"})}function me(e){return e.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function L(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?String(e).slice(0,10):t.toISOString().slice(0,10)}function he(e){return e.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function S(e){e.classList.remove("is-clicked"),e.offsetWidth,e.classList.add("is-clicked"),window.setTimeout(()=>e.classList.remove("is-clicked"),220)}function u(e,t="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const o=document.createElement("div");o.className=`toast ${t==="error"?"error":""}`.trim(),o.textContent=e,a.append(o),requestAnimationFrame(()=>o.classList.add("is-visible")),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),220)},2600)}function fe(){p&&(p.hidden=!1,requestAnimationFrame(()=>{p.classList.add("is-open"),p.querySelector("input")?.focus()}))}function q(){p&&(p.classList.remove("is-open"),window.setTimeout(()=>{p.hidden=!0},180))}function ge(){fetch("https://v1.hitokoto.cn/?c=a").then(e=>e.json()).then(e=>{const t=document.querySelector("[data-hitokoto]");t&&e.hitokoto&&(t.textContent=e.hitokoto)}).catch(()=>{})}function ye(){const e=document.querySelector("[data-api-status]");e&&fetch("/api/health").then(t=>t.json()).then(t=>{e.textContent=t.ok&&t.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{e.textContent="API: not deployed"})}function ve(){const e=document.querySelector("[data-mouse-trail]"),t=e?.getContext("2d");if(!e||!t)return;const a=[],o=24,n=520;let i=0,r=0;const c=()=>{const s=window.devicePixelRatio||1;e.width=Math.floor(window.innerWidth*s),e.height=Math.floor(window.innerHeight*s),e.style.width=`${window.innerWidth}px`,e.style.height=`${window.innerHeight}px`,t.setTransform(s,0,0,s,0,0)},h=s=>{t.clearRect(0,0,window.innerWidth,window.innerHeight);for(let f=a.length-1;f>=0;f--){const g=a[f],x=s-g.age;if(x>n){a.splice(f,1);continue}const E=x/n,z=(1-E)*.72,R=9-E*6;t.beginPath(),t.fillStyle=`rgba(255, 120, 172, ${z})`,t.shadowColor="rgba(255, 120, 172, 0.34)",t.shadowBlur=12,t.arc(g.x,g.y,R,0,Math.PI*2),t.fill()}t.shadowBlur=0,a.length>0||s-r<900?i=requestAnimationFrame(h):i=0},w=()=>{i===0&&(i=requestAnimationFrame(h))};window.addEventListener("resize",c),window.addEventListener("pointermove",s=>{s.pointerType!=="touch"&&(r=performance.now(),a.push({x:s.clientX,y:s.clientY,age:r}),a.length>o&&a.shift(),w())},{passive:!0}),c()}function we(){if(!y)return;let e=0;const t=()=>{e+=.012,y.style.setProperty("--pet-y",`${Math.sin(e)*10}px`),requestAnimationFrame(t)};t()}function be(){const e=document.querySelector("[data-wave]");if(!e)return;const t=e.getContext("2d");if(!t)return;const a=(o=0)=>{if(!document.body.contains(e))return;const n=e.clientWidth,i=e.clientHeight,r=window.devicePixelRatio||1;e.width=Math.floor(n*r),e.height=Math.floor(i*r),t.setTransform(r,0,0,r,0,0),t.clearRect(0,0,n,i),t.fillStyle="rgba(255, 255, 255, 0.96)",t.beginPath(),t.moveTo(0,i);for(let c=0;c<=n;c+=8){const h=44+Math.sin(c*.014+o*.0018)*9+Math.sin(c*.028+o*.001)*5;t.lineTo(c,h)}t.lineTo(n,i),t.closePath(),t.fill(),requestAnimationFrame(a)};a()}function Se(){const t=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(t,650)}
