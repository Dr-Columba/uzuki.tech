(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const X=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],j={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},Q=[{title:"迁移记录：从 WordPress 到新的卯月科技",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标轨迹和桌宠都可以有，但需要低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"}],_=["Vite","TypeScript","Bun","Hono","SQLite","ACG","前端","迁移"];let v=null;const U=document.querySelector("#app");if(!U)throw new Error("Missing #app root");U.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${X.map(t=>`<a href="${t.path}" data-route>${t.label}</a>`).join("")}
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
`;const h=document.querySelector("#page-root"),Z=document.querySelector("[data-header]"),I=document.querySelector("[data-menu-button]"),z=document.querySelector("[data-nav-links]"),f=document.querySelector("[data-search-modal]"),tt=document.querySelector("[data-search-open]"),et=document.querySelector("[data-search-close]"),R=document.querySelector("[data-backtop]"),A=document.querySelector("[data-pet]"),q=window.matchMedia("(prefers-reduced-motion: reduce)").matches;M();window.addEventListener("popstate",M);window.addEventListener("scroll",()=>{Z?.classList.toggle("is-scrolled",window.scrollY>20),R?.classList.toggle("is-visible",window.scrollY>420)});I?.addEventListener("click",()=>{z?.classList.toggle("is-open"),I.classList.toggle("is-open")});tt?.addEventListener("click",()=>Mt());et?.addEventListener("click",()=>C());f?.addEventListener("click",t=>{t.target===f&&C()});document.addEventListener("keydown",t=>{t.key==="Escape"&&C()});R?.addEventListener("click",()=>window.scrollTo({top:0,behavior:q?"auto":"smooth"}));A?.addEventListener("click",()=>A.classList.add("is-hidden"));document.addEventListener("click",St);document.addEventListener("keydown",At);document.addEventListener("input",kt);document.addEventListener("change",qt);document.addEventListener("error",Lt,!0);q||(Ht(),jt(),Nt());function M(){if(!h)return;const t=window.location.pathname;if(at(t),t==="/admin"){h.innerHTML=ot(),Ct(),dt();return}if(t.startsWith("/articles/")){h.innerHTML=rt(),ct(decodeURIComponent(t.replace("/articles/","")));return}if(t!=="/"&&j[t]){h.innerHTML=it(j[t]);return}h.innerHTML=nt(),Dt(),Pt(),L()}function at(t){document.querySelectorAll("[data-route]").forEach(e=>{const a=e.pathname===t||t==="/"&&e.pathname==="/";e.classList.toggle("is-active",a)})}function nt(){return`
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
        ${Q.map(W).join("")}
        ${G()}
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
            ${_.map(t=>`<a href="#" data-static-action>${t}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>
  `}function it(t){return`
    <section class="subpage-hero">
      <div>
        <span>${t.eyebrow}</span>
        <h1>${t.title}</h1>
        <p>${t.description}</p>
      </div>
    </section>
    <section class="empty-state">
      <h2>内容准备中</h2>
      <p>这个页面已经预留路由、导航和基础样式，后续接入后端文章分类后会自动填充内容。</p>
    </section>
  `}function ot(){return`
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

        <nav class="admin-tabs" data-admin-content hidden aria-label="后台功能">
          <button type="button" class="is-active" data-admin-tab="articles">文章</button>
          <button type="button" data-admin-tab="editor">编辑器</button>
          <button type="button" data-admin-tab="media">媒体库</button>
        </nav>

        <section class="admin-panel admin-list-panel" data-admin-content data-admin-section="articles" hidden>
          <div class="admin-panel-title">
            <h2>文章台账</h2>
            <button type="button" data-logout-button>退出</button>
          </div>
          <div class="admin-toolbar">
            <input type="search" placeholder="搜索标题、Slug、分类、摘要" data-article-search />
            <button type="button" data-new-article>新建文章</button>
          </div>
          <div class="admin-list" data-admin-article-list>正在读取...</div>
        </section>

        <section class="admin-panel media-panel" data-admin-content data-admin-section="media" hidden>
          <div class="admin-panel-title">
            <h2>媒体库</h2>
            <button type="button" data-upload-button>上传图片</button>
          </div>
          <div class="media-list" data-admin-media-list>正在读取...</div>
        </section>

        <form class="admin-panel editor-panel" data-admin-content data-admin-section="editor" hidden>
          <div class="admin-panel-title">
            <h2>Markdown 编辑器</h2>
            <button type="button" data-new-article>新建文章</button>
          </div>
          <p class="editor-state" data-editor-state>当前：新建文章</p>
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
            <button type="button" data-upload-button>上传并插入正文</button>
          </div>
        </form>

        <section class="admin-panel preview-panel" data-admin-content data-admin-section="editor" hidden>
          <h2>预览</h2>
          <div class="markdown-preview" data-md-preview>输入 Markdown 后这里会显示预览。</div>
        </section>
      </section>
    </section>
  `}function W(t){const e=t.featured?"post-card featured":"post-card",a=t.slug?`/articles/${encodeURIComponent(t.slug)}`:"#",n=t.slug?"data-route":"";return`
    <article class="${e}" role="button" tabindex="0" data-static-action>
      ${t.image?`<a class="post-image" href="${a}" ${n}><img src="${l(t.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="#" data-static-action>${l(t.category)}</a>
        <h2><a href="${a}" ${n}>${l(t.title)}</a></h2>
        <p>${l(t.excerpt)}</p>
        <div class="post-meta">
          <span>${l(t.date)}</span>
          <span>${t.views} views</span>
          <span>${t.comments} comments</span>
        </div>
      </div>
    </article>
  `}function G(){return`
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `}function rt(){return`
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `}function st(t){return`
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${t.coverImage?`<img class="article-cover" src="${l(t.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${l(t.category)}</p>
      <h1>${l(t.title)}</h1>
      <p class="article-meta">${x(t.publishedAt??t.updatedAt)}</p>
      <div class="article-content">${t.html||K(t.markdown)}</div>
    </article>
  `}async function L(){const t=document.querySelector("[data-post-column]");if(t)try{const e=await fetch("/api/articles");if(!e.ok)throw new Error("Failed to load articles");const a=await e.json();if(!a.articles?.length)return;const n=a.articles.map((i,o)=>lt(i,o===0));t.innerHTML=`${n.map(W).join("")}${G()}`}catch{}}async function ct(t){if(h)try{const e=await fetch(`/api/articles/${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Not found");const a=await e.json();if(!a.article)throw new Error("Not found");h.innerHTML=st(a.article)}catch{h.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function lt(t,e=!1){return{id:t.id,slug:t.slug,title:t.title,category:t.category,date:x(t.publishedAt??t.updatedAt),views:"0",comments:0,excerpt:t.summary||Tt(t.html).slice(0,96),image:t.coverImage||"/assets/images/post-1.jpg",featured:e,html:t.html}}async function dt(){try{const t=await fetch("/api/admin/me",{credentials:"include"});if(!t.ok)throw new Error("Session unavailable");const e=await t.json();if(e.user?.role==="administrator"){J(e.user),await w(),await E();return}}catch{}m("请输入 administrator 密码登录。")}async function ut(){const t=document.querySelector("[data-login-username]")?.value.trim()??"",e=document.querySelector("[data-login-password]")?.value??"";m("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:e})});if(!a.ok)throw new Error("登录失败");const n=await a.json();J(n.user),c("登录成功。"),await w(),await E()}catch{m("登录失败，请检查密码。","error"),c("登录失败，请检查密码。","error")}}async function mt(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!0}),m("已退出登录。"),c("已退出登录。")}function J(t){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!1}),k("articles"),m(`已登录：${t.username}`)}function m(t,e="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=t,a.classList.toggle("error",e==="error"))}async function w(){const t=document.querySelector("[data-admin-article-list]");if(!t)return;t.textContent="正在读取...";const e=document.querySelector("[data-article-search]")?.value.trim()??"";try{const a=await fetch(`/api/admin/articles${e?`?q=${encodeURIComponent(e)}`:""}`,{credentials:"include"});if(!a.ok)throw new Error("Failed to load admin articles");const i=(await a.json()).articles??[];t.innerHTML=i.length?`
        <div class="admin-ledger" role="table" aria-label="文章台账">
          ${i.map(pt).join("")}
        </div>
      `:"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{t.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}function pt(t){return`
    <article class="ledger-row" data-article-id="${t.id}" data-article-slug="${l(t.slug)}" role="row">
      <div class="ledger-main">
        <strong>${l(t.title)}</strong>
        <small>${l(t.slug)} · ${l(t.category)} · ${t.status==="published"?"已发布":"草稿"} · ${x(t.updatedAt)}</small>
      </div>
      <div class="ledger-actions">
        ${$("查看","view",t.id,"↗")}
        ${$("编辑","edit",t.id,"✎")}
        ${$("上移","up",t.id,"↑")}
        ${$("下移","down",t.id,"↓")}
        ${$("删除","delete",t.id,"×","danger")}
      </div>
    </article>
  `}function $(t,e,a,n,i=""){return`
    <button type="button" class="icon-action ${i}" aria-label="${t}" data-tooltip="${t}" data-article-action="${e}" data-article-id="${a}">
      ${n}
    </button>
  `}async function E(){const t=document.querySelector("[data-admin-media-list]");if(t){t.textContent="正在读取...";try{const e=await fetch("/api/admin/uploads",{credentials:"include"});if(!e.ok)throw new Error("Failed to load uploads");const n=(await e.json()).uploads??[];t.innerHTML=n.length?n.map(ft).join(""):"<p>还没有上传图片。上传后会出现在这里，可复用为封面或正文图片。</p>"}catch{t.innerHTML="<p>媒体库读取失败，请确认后端已启动并已登录。</p>"}}}function ft(t){return`
    <article class="media-item">
      <img src="${l(t.path)}" alt="${l(t.originalName)}" loading="lazy" />
      <div>
        <strong title="${l(t.originalName)}">${l(t.originalName)}</strong>
        <small>${xt(t.size)} · ${x(t.createdAt)}</small>
        <div class="media-actions">
          <button type="button" data-media-cover="${l(t.path)}">设为封面</button>
          <button type="button" data-media-insert="${l(t.path)}" data-media-name="${l(t.originalName)}">插入正文</button>
          <button type="button" class="icon-action danger" aria-label="删除" data-tooltip="删除" data-media-delete="${t.id}">×</button>
        </div>
      </div>
    </article>
  `}async function D(t){const e=document.querySelector("[data-article-title]"),a=document.querySelector("[data-article-slug]"),n=document.querySelector("[data-article-category]"),i=document.querySelector("[data-article-summary]"),o=document.querySelector("[data-article-cover]"),s=document.querySelector("[data-md-source]"),d=e?.value.trim()??"",p=Et(a?.value||d),y=n?.value.trim()||"手记",r=s?.value??"";if(!d||!p||!r.trim()){m("标题、Slug 和正文不能为空。","error"),c("标题、Slug 和正文不能为空。","error");return}m(t==="published"?"正在发布...":"正在保存草稿..."),c(t==="published"?"正在发布文章...":"正在保存草稿..."),B(!0);try{const u=await fetch(v?`/api/admin/articles/${v}`:"/api/admin/articles",{method:v?"PUT":"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:d,slug:p,category:y,summary:i?.value.trim()??"",coverImage:o?.value.trim()??"",markdown:r,status:t})});if(!u.ok)throw new Error("Save failed");const g=await u.json();v=g.article.id,a.value=g.article.slug,m(t==="published"?"文章已发布。":"草稿已保存。"),c(t==="published"?"文章已发布。":"草稿已保存。"),await w(),t==="published"&&await L(),t==="published"&&P()}catch{m("保存失败。Slug 可能已存在，或登录状态已过期。","error"),c("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{B(!1)}}async function ht(t){m("正在上传图片..."),c("正在上传图片..."),F(!0);const e=new FormData;e.append("file",t);try{const a=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:e});if(!a.ok)throw new Error("Upload failed");const n=await a.json(),i=n.upload?.path;if(!i)throw new Error("Upload path missing");const o=document.querySelector("[data-article-cover]"),s=document.querySelector("[data-md-source]");o&&!o.value&&(o.value=i),s&&(s.value=`${s.value.trim()}

![${t.name}](${i})`.trim(),S(s.value)),await E();const d=n.reused?"图片已存在，已复用并插入正文。":"图片已上传，并已插入正文。";m(d),c(d)}catch{m("图片上传失败，请确认已登录且文件小于 5MB。","error"),c("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{F(!1)}}async function gt(t){try{const e=await fetch("/api/admin/articles",{credentials:"include"});if(!e.ok)throw new Error("Failed to load articles");const n=(await e.json()).articles?.find(i=>i.id===t);if(!n)throw new Error("Article not found");yt(n),k("editor"),c("已载入文章。")}catch{c("载入文章失败。","error")}}async function vt(t){if(window.confirm("确定删除这篇文章？此操作不可恢复。"))try{if(!(await fetch(`/api/admin/articles/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete failed");v===t&&P(),await w(),await L(),c("文章已删除。")}catch{c("删除失败。","error")}}async function N(t,e){try{if(!(await fetch(`/api/admin/articles/${t}/move`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({direction:e})})).ok)throw new Error("Move failed");await w(),await L(),c(e==="up"?"已上移。":"已下移。")}catch{c("调整顺序失败。","error")}}function yt(t){v=t.id,document.querySelector("[data-article-title]").value=t.title,document.querySelector("[data-article-slug]").value=t.slug,document.querySelector("[data-article-category]").value=t.category,document.querySelector("[data-article-summary]").value=t.summary,document.querySelector("[data-article-cover]").value=t.coverImage??"",document.querySelector("[data-md-source]").value=t.markdown;const e=document.querySelector("[data-editor-state]");e&&(e.textContent=`当前：编辑 #${t.id} · ${t.status==="published"?"已发布":"草稿"}`),S(t.markdown)}function k(t){document.querySelectorAll("[data-admin-section]").forEach(e=>{e.hidden=e.dataset.adminSection!==t}),document.querySelectorAll("[data-admin-tab]").forEach(e=>{e.classList.toggle("is-active",e.dataset.adminTab===t)})}function wt(t){const e=document.querySelector("[data-article-cover]");!e||!t||(e.value=t,c("已设为封面图。"))}function bt(t,e="image"){const a=document.querySelector("[data-md-source]");!a||!t||(a.value=`${a.value.trim()}

![${e}](${t})`.trim(),S(a.value),c("已插入正文。"))}async function $t(t){if(window.confirm("确定删除这张图片？使用它的文章会显示图片不存在占位图。"))try{if(!(await fetch(`/api/admin/uploads/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete upload failed");await E(),c("图片已删除。")}catch{c("图片删除失败。","error")}}function B(t){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function F(t){document.querySelectorAll("[data-upload-button]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function P(){v=null,document.querySelectorAll("[data-article-title], [data-article-slug], [data-article-category], [data-article-summary], [data-article-cover], [data-md-source]").forEach(e=>{e.value=""});const t=document.querySelector("[data-editor-state]");t&&(t.textContent="当前：新建文章"),S("")}function St(t){const e=t.target;if(!(e instanceof Element))return;const a=e.closest("[data-admin-tab]");if(a){t.preventDefault();const r=a.dataset.adminTab;(r==="articles"||r==="editor"||r==="media")&&k(r);return}if(e.closest("[data-new-article]")){t.preventDefault(),P(),k("editor"),c("已切换为新建文章。");return}if(e.closest("[data-login-button]")){t.preventDefault(),ut();return}if(e.closest("[data-logout-button]")){t.preventDefault(),mt();return}if(e.closest("[data-save-draft]")){t.preventDefault(),D("draft");return}if(e.closest("[data-publish-article]")){t.preventDefault(),D("published");return}if(e.closest("[data-upload-button]")){t.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const n=e.closest("[data-article-action]");if(n){t.preventDefault();const r=Number(n.dataset.articleId),u=n.dataset.articleAction;if(u==="view"){const b=n.closest("[data-article-slug]")?.dataset.articleSlug;b&&O(`/articles/${encodeURIComponent(b)}`);return}u==="edit"&&gt(r),u==="delete"&&vt(r),u==="up"&&N(r,"up"),u==="down"&&N(r,"down");return}const i=e.closest("[data-media-cover]");if(i){t.preventDefault(),wt(i.dataset.mediaCover??"");return}const o=e.closest("[data-media-insert]");if(o){t.preventDefault(),bt(o.dataset.mediaInsert??"",o.dataset.mediaName??"image");return}const s=e.closest("[data-media-delete]");if(s){t.preventDefault(),$t(Number(s.dataset.mediaDelete));return}const d=e.closest("a[data-route]");if(d){t.preventDefault(),O(d.pathname);return}const p=e.closest('a[href^="#"]');if(p){t.preventDefault(),T(p);const r=p.getAttribute("href")?.slice(1);r&&document.getElementById(r)?.scrollIntoView({behavior:q?"auto":"smooth"});return}const y=e.closest("[data-static-action]");y&&T(y)}function At(t){if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;e instanceof HTMLElement&&e.matches("[data-static-action]")&&(t.preventDefault(),T(e))}function kt(t){const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-article-search]")){w();return}!(e instanceof HTMLTextAreaElement)||!e.matches("[data-md-source]")||S(e.value)}function qt(t){const e=t.target;if(!(e instanceof HTMLInputElement)||!e.matches("[data-upload-file]"))return;const a=e.files?.[0];a&&(ht(a),e.value="")}function Lt(t){const e=t.target;e instanceof HTMLImageElement&&e.dataset.missingImage!=="true"&&(!e.currentSrc.includes("/api/uploads/")&&!e.src.includes("/api/uploads/")||(e.dataset.missingImage="true",e.alt="图片不存在",e.src=It()))}function S(t){const e=document.querySelector("[data-md-preview]");e&&(e.innerHTML=K(t)||"输入 Markdown 后这里会显示预览。")}function K(t){return l(t.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(n,i)=>`<iframe class="embed-preview" src="https:${i}" loading="lazy" allowfullscreen></iframe>`).split(/\n{2,}/).map(n=>{if(n.startsWith("# "))return`<h1>${n.slice(2)}</h1>`;if(n.startsWith("## "))return`<h2>${n.slice(3)}</h2>`;const i=n.match(/^!\[(.*?)\]\((.*?)\)$/);return i?`<img src="${i[2]}" alt="${i[1]}" loading="lazy" />`:`<p>${n.replace(/\n/g,"<br />")}</p>`}).join("")}function O(t){history.pushState({},"",t),z?.classList.remove("is-open"),I?.classList.remove("is-open"),M(),window.scrollTo({top:0,behavior:q?"auto":"smooth"})}function Et(t){return t.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function x(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?String(t).slice(0,10):e.toISOString().slice(0,10)}function xt(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/1024/1024).toFixed(1)} MB`}function It(){return`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#fff7fb"/><rect x="24" y="24" width="912" height="492" rx="18" fill="#ffffff" stroke="#ff78ac" stroke-opacity=".35" stroke-width="2"/><path d="M408 288l48-58 42 50 30-36 72 86H360l48-42z" fill="#ffd8e8"/><circle cx="586" cy="202" r="24" fill="#ff78ac" fill-opacity=".55"/><text x="480" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#7d8493">Image missing</text></svg>')}`}function Tt(t){return t.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function l(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function T(t){t.classList.remove("is-clicked"),t.offsetWidth,t.classList.add("is-clicked"),window.setTimeout(()=>t.classList.remove("is-clicked"),220)}function c(t,e="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const n=document.createElement("div");n.className=`toast ${e==="error"?"error":""}`.trim(),n.textContent=t,a.append(n),requestAnimationFrame(()=>n.classList.add("is-visible")),window.setTimeout(()=>{n.classList.remove("is-visible"),window.setTimeout(()=>n.remove(),220)},2600)}function Mt(){f&&(f.hidden=!1,requestAnimationFrame(()=>{f.classList.add("is-open"),f.querySelector("input")?.focus()}))}function C(){f&&(f.classList.remove("is-open"),window.setTimeout(()=>{f.hidden=!0},180))}function Pt(){fetch("https://v1.hitokoto.cn/?c=a").then(t=>t.json()).then(t=>{const e=document.querySelector("[data-hitokoto]");e&&t.hitokoto&&(e.textContent=t.hitokoto)}).catch(()=>{})}function Ct(){const t=document.querySelector("[data-api-status]");t&&fetch("/api/health").then(e=>e.json()).then(e=>{t.textContent=e.ok&&e.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{t.textContent="API: not deployed"})}function Ht(){const t=document.querySelector("[data-mouse-trail]"),e=t?.getContext("2d");if(!t||!e)return;const a=[],n=24,i=520;let o=0,s=0;const d=()=>{const r=window.devicePixelRatio||1;t.width=Math.floor(window.innerWidth*r),t.height=Math.floor(window.innerHeight*r),t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`,e.setTransform(r,0,0,r,0,0)},p=r=>{e.clearRect(0,0,window.innerWidth,window.innerHeight);for(let u=a.length-1;u>=0;u--){const g=a[u],b=r-g.age;if(b>i){a.splice(u,1);continue}const H=b/i,V=(1-H)*.72,Y=9-H*6;e.beginPath(),e.fillStyle=`rgba(255, 120, 172, ${V})`,e.shadowColor="rgba(255, 120, 172, 0.34)",e.shadowBlur=12,e.arc(g.x,g.y,Y,0,Math.PI*2),e.fill()}e.shadowBlur=0,a.length>0||r-s<900?o=requestAnimationFrame(p):o=0},y=()=>{o===0&&(o=requestAnimationFrame(p))};window.addEventListener("resize",d),window.addEventListener("pointermove",r=>{r.pointerType!=="touch"&&(s=performance.now(),a.push({x:r.clientX,y:r.clientY,age:s}),a.length>n&&a.shift(),y())},{passive:!0}),d()}function jt(){if(!A)return;let t=0;const e=()=>{t+=.012,A.style.setProperty("--pet-y",`${Math.sin(t)*10}px`),requestAnimationFrame(e)};e()}function Dt(){const t=document.querySelector("[data-wave]");if(!t)return;const e=t.getContext("2d");if(!e)return;const a=(n=0)=>{if(!document.body.contains(t))return;const i=t.clientWidth,o=t.clientHeight,s=window.devicePixelRatio||1;t.width=Math.floor(i*s),t.height=Math.floor(o*s),e.setTransform(s,0,0,s,0,0),e.clearRect(0,0,i,o),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,o);for(let d=0;d<=i;d+=8){const p=44+Math.sin(d*.014+n*.0018)*9+Math.sin(d*.028+n*.001)*5;e.lineTo(d,p)}e.lineTo(i,o),e.closePath(),e.fill(),requestAnimationFrame(a)};a()}function Nt(){const e=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),n=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${n}px`,a.style.height=`${n}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(e,650)}
