(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const X=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],j={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},Q=[{title:"迁移记录：从 WordPress 到新的卯月科技",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标轨迹和桌宠都可以有，但需要低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"}],_=["Vite","TypeScript","Bun","Hono","SQLite","ACG","前端","迁移"];let y=null;const R=document.querySelector("#app");if(!R)throw new Error("Missing #app root");R.innerHTML=`
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
`;const b=document.querySelector("#page-root"),Z=document.querySelector("[data-header]"),I=document.querySelector("[data-menu-button]"),U=document.querySelector("[data-nav-links]"),g=document.querySelector("[data-search-modal]"),tt=document.querySelector("[data-search-open]"),et=document.querySelector("[data-search-close]"),z=document.querySelector("[data-backtop]"),k=document.querySelector("[data-pet]"),q=window.matchMedia("(prefers-reduced-motion: reduce)").matches;P();window.addEventListener("popstate",P);window.addEventListener("scroll",()=>{Z?.classList.toggle("is-scrolled",window.scrollY>20),z?.classList.toggle("is-visible",window.scrollY>420)});I?.addEventListener("click",()=>{U?.classList.toggle("is-open"),I.classList.toggle("is-open")});tt?.addEventListener("click",()=>Ht());et?.addEventListener("click",()=>H());g?.addEventListener("click",t=>{t.target===g&&H()});document.addEventListener("keydown",t=>{t.key==="Escape"&&H()});z?.addEventListener("click",()=>window.scrollTo({top:0,behavior:q?"auto":"smooth"}));k?.addEventListener("click",()=>k.classList.add("is-hidden"));document.addEventListener("click",St);document.addEventListener("keydown",kt);document.addEventListener("input",At);document.addEventListener("change",qt);document.addEventListener("focusin",Lt);document.addEventListener("focusout",Et);document.addEventListener("error",xt,!0);q||(Bt(),Nt(),Ot());function P(){if(!b)return;const t=window.location.pathname;if(at(t),t==="/admin"){b.innerHTML=it(),Dt(),dt();return}if(t.startsWith("/articles/")){b.innerHTML=rt(),ct(decodeURIComponent(t.replace("/articles/","")));return}if(t!=="/"&&j[t]){b.innerHTML=ot(j[t]);return}b.innerHTML=nt(),Ft(),jt(),L()}function at(t){document.querySelectorAll("[data-route]").forEach(e=>{const a=e.pathname===t||t==="/"&&e.pathname==="/";e.classList.toggle("is-active",a)})}function nt(){return`
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
  `}function ot(t){return`
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
  `}function it(){return`
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
          <div class="markdown-toolbar" data-md-toolbar aria-label="Markdown 工具栏">
            <button type="button" data-md-tool="h1" data-tooltip="一级标题">H1</button>
            <button type="button" data-md-tool="h2" data-tooltip="二级标题">H2</button>
            <button type="button" data-md-tool="h3" data-tooltip="三级标题">H3</button>
            <button type="button" data-md-tool="bold" data-tooltip="加粗">B</button>
            <button type="button" data-md-tool="italic" data-tooltip="斜体">I</button>
            <button type="button" data-md-tool="quote" data-tooltip="引用">"</button>
            <button type="button" data-md-tool="ul" data-tooltip="无序列表">•</button>
            <button type="button" data-md-tool="ol" data-tooltip="有序列表">1.</button>
            <button type="button" data-md-tool="inline-code" data-tooltip="行内代码">&#96;</button>
            <button type="button" data-md-tool="code" data-tooltip="代码块">{ }</button>
            <button type="button" data-md-tool="link" data-tooltip="链接">↗</button>
          </div>
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
  `}function W(t){const e=t.featured?"post-card featured":"post-card",a=t.slug?`/articles/${encodeURIComponent(t.slug)}`:"#",o=t.slug?"data-route":"";return`
    <article class="${e}" role="button" tabindex="0" data-static-action>
      ${t.image?`<a class="post-image" href="${a}" ${o}><img src="${u(t.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="#" data-static-action>${u(t.category)}</a>
        <h2><a href="${a}" ${o}>${u(t.title)}</a></h2>
        <p>${u(t.excerpt)}</p>
        <div class="post-meta">
          <span>${u(t.date)}</span>
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
      ${t.coverImage?`<img class="article-cover" src="${u(t.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${u(t.category)}</p>
      <h1>${u(t.title)}</h1>
      <p class="article-meta">${x(t.publishedAt??t.updatedAt)}</p>
      <div class="article-content">${t.html||K(t.markdown)}</div>
    </article>
  `}async function L(){const t=document.querySelector("[data-post-column]");if(t)try{const e=await fetch("/api/articles");if(!e.ok)throw new Error("Failed to load articles");const a=await e.json();if(!a.articles?.length)return;const o=a.articles.map((n,i)=>lt(n,i===0));t.innerHTML=`${o.map(W).join("")}${G()}`}catch{}}async function ct(t){if(b)try{const e=await fetch(`/api/articles/${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Not found");const a=await e.json();if(!a.article)throw new Error("Not found");b.innerHTML=st(a.article)}catch{b.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function lt(t,e=!1){return{id:t.id,slug:t.slug,title:t.title,category:t.category,date:x(t.publishedAt??t.updatedAt),views:"0",comments:0,excerpt:t.summary||Ct(t.html).slice(0,96),image:t.coverImage||"/assets/images/post-1.jpg",featured:e,html:t.html}}async function dt(){try{const t=await fetch("/api/admin/me",{credentials:"include"});if(!t.ok)throw new Error("Session unavailable");const e=await t.json();if(e.user?.role==="administrator"){J(e.user),await v(),await E();return}}catch{}h("请输入 administrator 密码登录。")}async function ut(){const t=document.querySelector("[data-login-username]")?.value.trim()??"",e=document.querySelector("[data-login-password]")?.value??"";h("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:e})});if(!a.ok)throw new Error("登录失败");const o=await a.json();J(o.user),l("登录成功。"),await v(),await E()}catch{h("登录失败，请检查密码。","error"),l("登录失败，请检查密码。","error")}}async function mt(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!0}),h("已退出登录。"),l("已退出登录。")}function J(t){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!1}),A("articles"),h(`已登录：${t.username}`)}function h(t,e="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=t,a.classList.toggle("error",e==="error"))}async function v(){const t=document.querySelector("[data-admin-article-list]");if(!t)return;t.textContent="正在读取...";const e=document.querySelector("[data-article-search]")?.value.trim()??"";try{const a=await fetch(`/api/admin/articles${e?`?q=${encodeURIComponent(e)}`:""}`,{credentials:"include"});if(!a.ok)throw new Error("Failed to load admin articles");const n=(await a.json()).articles??[];t.innerHTML=n.length?`
        <div class="admin-ledger" role="table" aria-label="文章台账">
          ${n.map(pt).join("")}
        </div>
      `:"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{t.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}function pt(t){return`
    <article class="ledger-row" data-article-id="${t.id}" data-article-slug="${u(t.slug)}" role="row">
      <div class="ledger-main">
        <strong>${u(t.title)}</strong>
        <small>${u(t.slug)} · ${u(t.category)} · ${t.status==="published"?"已发布":"草稿"} · ${x(t.updatedAt)}</small>
      </div>
      <div class="ledger-actions">
        ${S("查看","view",t.id,"↗")}
        ${S("编辑","edit",t.id,"✎")}
        ${S("上移","up",t.id,"↑")}
        ${S("下移","down",t.id,"↓")}
        ${S("删除","delete",t.id,"×","danger")}
      </div>
    </article>
  `}function S(t,e,a,o,n=""){return`
    <button type="button" class="icon-action ${n}" aria-label="${t}" data-tooltip="${t}" data-article-action="${e}" data-article-id="${a}">
      ${o}
    </button>
  `}async function E(){const t=document.querySelector("[data-admin-media-list]");if(t){t.textContent="正在读取...";try{const e=await fetch("/api/admin/uploads",{credentials:"include"});if(!e.ok)throw new Error("Failed to load uploads");const o=(await e.json()).uploads??[];t.innerHTML=o.length?o.map(ft).join(""):"<p>还没有上传图片。上传后会出现在这里，可复用为封面或正文图片。</p>"}catch{t.innerHTML="<p>媒体库读取失败，请确认后端已启动并已登录。</p>"}}}function ft(t){return`
    <article class="media-item">
      <img src="${u(t.path)}" alt="${u(t.originalName)}" loading="lazy" />
      <div>
        <strong title="${u(t.originalName)}">${u(t.originalName)}</strong>
        <small>${Mt(t.size)} · ${x(t.createdAt)}</small>
        <div class="media-actions">
          <button type="button" data-media-cover="${u(t.path)}">设为封面</button>
          <button type="button" data-media-insert="${u(t.path)}" data-media-name="${u(t.originalName)}">插入正文</button>
          <button type="button" class="icon-action danger" aria-label="删除" data-tooltip="删除" data-media-delete="${t.id}">×</button>
        </div>
      </div>
    </article>
  `}async function D(t){const e=document.querySelector("[data-article-title]"),a=document.querySelector("[data-article-slug]"),o=document.querySelector("[data-article-category]"),n=document.querySelector("[data-article-summary]"),i=document.querySelector("[data-article-cover]"),r=document.querySelector("[data-md-source]"),s=e?.value.trim()??"",c=It(a?.value||s),p=o?.value.trim()||"手记",m=r?.value??"";if(!s||!c||!m.trim()){h("标题、Slug 和正文不能为空。","error"),l("标题、Slug 和正文不能为空。","error");return}h(t==="published"?"正在发布...":"正在保存草稿..."),l(t==="published"?"正在发布文章...":"正在保存草稿..."),N(!0);try{const d=await fetch(y?`/api/admin/articles/${y}`:"/api/admin/articles",{method:y?"PUT":"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:s,slug:c,category:p,summary:n?.value.trim()??"",coverImage:i?.value.trim()??"",markdown:m,status:t})});if(!d.ok)throw new Error("Save failed");const f=await d.json();y=f.article.id,a.value=f.article.slug,h(t==="published"?"文章已发布。":"草稿已保存。"),l(t==="published"?"文章已发布。":"草稿已保存。"),await v(),t==="published"&&await L(),t==="published"&&C()}catch{h("保存失败。Slug 可能已存在，或登录状态已过期。","error"),l("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{N(!1)}}async function ht(t){h("正在上传图片..."),l("正在上传图片..."),F(!0);const e=new FormData;e.append("file",t);try{const a=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:e});if(!a.ok)throw new Error("Upload failed");const o=await a.json(),n=o.upload?.path;if(!n)throw new Error("Upload path missing");const i=document.querySelector("[data-article-cover]"),r=document.querySelector("[data-md-source]");i&&!i.value&&(i.value=n),r&&(r.value=`${r.value.trim()}

![${t.name}](${n})`.trim(),w(r.value)),await E();const s=o.reused?"图片已存在，已复用并插入正文。":"图片已上传，并已插入正文。";h(s),l(s)}catch{h("图片上传失败，请确认已登录且文件小于 5MB。","error"),l("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{F(!1)}}async function gt(t){try{const e=await fetch("/api/admin/articles",{credentials:"include"});if(!e.ok)throw new Error("Failed to load articles");const o=(await e.json()).articles?.find(n=>n.id===t);if(!o)throw new Error("Article not found");yt(o),A("editor"),l("已载入文章。")}catch{l("载入文章失败。","error")}}async function bt(t){if(window.confirm("确定删除这篇文章？此操作不可恢复。"))try{if(!(await fetch(`/api/admin/articles/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete failed");y===t&&C(),await v(),await L(),l("文章已删除。")}catch{l("删除失败。","error")}}async function B(t,e){try{if(!(await fetch(`/api/admin/articles/${t}/move`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({direction:e})})).ok)throw new Error("Move failed");await v(),await L(),l(e==="up"?"已上移。":"已下移。")}catch{l("调整顺序失败。","error")}}function yt(t){y=t.id,document.querySelector("[data-article-title]").value=t.title,document.querySelector("[data-article-slug]").value=t.slug,document.querySelector("[data-article-category]").value=t.category,document.querySelector("[data-article-summary]").value=t.summary,document.querySelector("[data-article-cover]").value=t.coverImage??"",document.querySelector("[data-md-source]").value=t.markdown;const e=document.querySelector("[data-editor-state]");e&&(e.textContent=`当前：编辑 #${t.id} · ${t.status==="published"?"已发布":"草稿"}`),w(t.markdown)}function A(t){document.querySelectorAll("[data-admin-section]").forEach(e=>{e.hidden=e.dataset.adminSection!==t}),document.querySelectorAll("[data-admin-tab]").forEach(e=>{e.classList.toggle("is-active",e.dataset.adminTab===t)})}function vt(t){const e=document.querySelector("[data-article-cover]");!e||!t||(e.value=t,l("已设为封面图。"))}function wt(t,e="image"){const a=document.querySelector("[data-md-source]");!a||!t||(a.value=`${a.value.trim()}

![${e}](${t})`.trim(),w(a.value),l("已插入正文。"))}async function $t(t){if(window.confirm("确定删除这张图片？使用它的文章会显示图片不存在占位图。"))try{if(!(await fetch(`/api/admin/uploads/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete upload failed");await E(),l("图片已删除。")}catch{l("图片删除失败。","error")}}function N(t){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function F(t){document.querySelectorAll("[data-upload-button]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function C(){y=null,document.querySelectorAll("[data-article-title], [data-article-slug], [data-article-category], [data-article-summary], [data-article-cover], [data-md-source]").forEach(e=>{e.value=""});const t=document.querySelector("[data-editor-state]");t&&(t.textContent="当前：新建文章"),w("")}function St(t){const e=t.target;if(!(e instanceof Element))return;const a=e.closest("[data-admin-tab]");if(a){t.preventDefault();const d=a.dataset.adminTab;(d==="articles"||d==="editor"||d==="media")&&A(d);return}if(e.closest("[data-new-article]")){t.preventDefault(),C(),A("editor"),l("已切换为新建文章。");return}if(e.closest("[data-login-button]")){t.preventDefault(),ut();return}if(e.closest("[data-logout-button]")){t.preventDefault(),mt();return}if(e.closest("[data-save-draft]")){t.preventDefault(),D("draft");return}if(e.closest("[data-publish-article]")){t.preventDefault(),D("published");return}if(e.closest("[data-upload-button]")){t.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const o=e.closest("[data-md-tool]");if(o){t.preventDefault(),Tt(o.dataset.mdTool??"");return}const n=e.closest("[data-article-action]");if(n){t.preventDefault();const d=Number(n.dataset.articleId),f=n.dataset.articleAction;if(f==="view"){const $=n.closest("[data-article-slug]")?.dataset.articleSlug;$&&O(`/articles/${encodeURIComponent($)}`);return}f==="edit"&&gt(d),f==="delete"&&bt(d),f==="up"&&B(d,"up"),f==="down"&&B(d,"down");return}const i=e.closest("[data-media-cover]");if(i){t.preventDefault(),vt(i.dataset.mediaCover??"");return}const r=e.closest("[data-media-insert]");if(r){t.preventDefault(),wt(r.dataset.mediaInsert??"",r.dataset.mediaName??"image");return}const s=e.closest("[data-media-delete]");if(s){t.preventDefault(),$t(Number(s.dataset.mediaDelete));return}const c=e.closest("a[data-route]");if(c){t.preventDefault(),O(c.pathname);return}const p=e.closest('a[href^="#"]');if(p){t.preventDefault(),M(p);const d=p.getAttribute("href")?.slice(1);d&&document.getElementById(d)?.scrollIntoView({behavior:q?"auto":"smooth"});return}const m=e.closest("[data-static-action]");m&&M(m)}function kt(t){if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;e instanceof HTMLElement&&e.matches("[data-static-action]")&&(t.preventDefault(),M(e))}function At(t){const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-article-search]")){v();return}!(e instanceof HTMLTextAreaElement)||!e.matches("[data-md-source]")||w(e.value)}function qt(t){const e=t.target;if(!(e instanceof HTMLInputElement)||!e.matches("[data-upload-file]"))return;const a=e.files?.[0];a&&(ht(a),e.value="")}function Lt(t){const e=t.target;e instanceof HTMLElement&&(!e.matches("[data-md-source]")&&!e.closest("[data-md-toolbar]")||document.querySelector(".editor-panel")?.classList.add("has-md-focus"))}function Et(){window.setTimeout(()=>{const t=document.activeElement,e=document.querySelector(".editor-panel");!e||t instanceof HTMLElement&&(t.matches("[data-md-source]")||t.closest("[data-md-toolbar]"))||e.classList.remove("has-md-focus")},80)}function xt(t){const e=t.target;e instanceof HTMLImageElement&&e.dataset.missingImage!=="true"&&(!e.currentSrc.includes("/api/uploads/")&&!e.src.includes("/api/uploads/")||(e.dataset.missingImage="true",e.alt="图片不存在",e.src=Pt()))}function w(t){const e=document.querySelector("[data-md-preview]");e&&(e.innerHTML=K(t)||"输入 Markdown 后这里会显示预览。")}function Tt(t){const e=document.querySelector("[data-md-source]");if(!e)return;const a=e.selectionStart,o=e.selectionEnd,n=e.value.slice(a,o),i=n||"文本";let r="",s=a,c=a;if(t==="h1"||t==="h2"||t==="h3"){const p=Number(t.slice(1));r=`${"#".repeat(p)} ${i}`,s=a+p+1,c=s+i.length}else if(t==="bold")r=`**${i}**`,s=a+2,c=s+i.length;else if(t==="italic")r=`*${i}*`,s=a+1,c=s+i.length;else if(t==="quote")r=n?n.split(`
`).map(p=>`> ${p}`).join(`
`):"> 引用内容",s=a+2,c=a+r.length;else if(t==="ul")r=n?n.split(`
`).map(p=>`- ${p}`).join(`
`):"- 列表项",s=a+2,c=a+r.length;else if(t==="ol")r=n?n.split(`
`).map((p,m)=>`${m+1}. ${p}`).join(`
`):"1. 列表项",s=a+3,c=a+r.length;else if(t==="inline-code")r=`\`${i}\``,s=a+1,c=s+i.length;else if(t==="code")r=`
\`\`\`ts
${n||"代码"}
\`\`\`
`,s=a+7,c=s+(n||"代码").length;else if(t==="link")r=`[${i}](https://)`,s=a+i.length+3,c=s+8;else return;e.setRangeText(r,a,o,"end"),e.focus(),e.setSelectionRange(s,c),w(e.value)}function K(t){return u(t.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(o,n)=>`<iframe class="embed-preview" src="https:${n}" loading="lazy" allowfullscreen></iframe>`).split(/\n{2,}/).map(o=>{if(o.startsWith("# "))return`<h1>${o.slice(2)}</h1>`;if(o.startsWith("## "))return`<h2>${o.slice(3)}</h2>`;const n=o.match(/^!\[(.*?)\]\((.*?)\)$/);return n?`<img src="${n[2]}" alt="${n[1]}" loading="lazy" />`:`<p>${o.replace(/\n/g,"<br />")}</p>`}).join("")}function O(t){history.pushState({},"",t),U?.classList.remove("is-open"),I?.classList.remove("is-open"),P(),window.scrollTo({top:0,behavior:q?"auto":"smooth"})}function It(t){return t.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function x(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?String(t).slice(0,10):e.toISOString().slice(0,10)}function Mt(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/1024/1024).toFixed(1)} MB`}function Pt(){return`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#fff7fb"/><rect x="24" y="24" width="912" height="492" rx="18" fill="#ffffff" stroke="#ff78ac" stroke-opacity=".35" stroke-width="2"/><path d="M408 288l48-58 42 50 30-36 72 86H360l48-42z" fill="#ffd8e8"/><circle cx="586" cy="202" r="24" fill="#ff78ac" fill-opacity=".55"/><text x="480" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#7d8493">Image missing</text></svg>')}`}function Ct(t){return t.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function u(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function M(t){t.classList.remove("is-clicked"),t.offsetWidth,t.classList.add("is-clicked"),window.setTimeout(()=>t.classList.remove("is-clicked"),220)}function l(t,e="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const o=document.createElement("div");o.className=`toast ${e==="error"?"error":""}`.trim(),o.textContent=t,a.append(o),requestAnimationFrame(()=>o.classList.add("is-visible")),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),220)},2600)}function Ht(){g&&(g.hidden=!1,requestAnimationFrame(()=>{g.classList.add("is-open"),g.querySelector("input")?.focus()}))}function H(){g&&(g.classList.remove("is-open"),window.setTimeout(()=>{g.hidden=!0},180))}function jt(){fetch("https://v1.hitokoto.cn/?c=a").then(t=>t.json()).then(t=>{const e=document.querySelector("[data-hitokoto]");e&&t.hitokoto&&(e.textContent=t.hitokoto)}).catch(()=>{})}function Dt(){const t=document.querySelector("[data-api-status]");t&&fetch("/api/health").then(e=>e.json()).then(e=>{t.textContent=e.ok&&e.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{t.textContent="API: not deployed"})}function Bt(){const t=document.querySelector("[data-mouse-trail]"),e=t?.getContext("2d");if(!t||!e)return;const a=[],o=24,n=520;let i=0,r=0;const s=()=>{const m=window.devicePixelRatio||1;t.width=Math.floor(window.innerWidth*m),t.height=Math.floor(window.innerHeight*m),t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`,e.setTransform(m,0,0,m,0,0)},c=m=>{e.clearRect(0,0,window.innerWidth,window.innerHeight);for(let d=a.length-1;d>=0;d--){const f=a[d],T=m-f.age;if(T>n){a.splice(d,1);continue}const $=T/n,V=(1-$)*.72,Y=9-$*6;e.beginPath(),e.fillStyle=`rgba(255, 120, 172, ${V})`,e.shadowColor="rgba(255, 120, 172, 0.34)",e.shadowBlur=12,e.arc(f.x,f.y,Y,0,Math.PI*2),e.fill()}e.shadowBlur=0,a.length>0||m-r<900?i=requestAnimationFrame(c):i=0},p=()=>{i===0&&(i=requestAnimationFrame(c))};window.addEventListener("resize",s),window.addEventListener("pointermove",m=>{m.pointerType!=="touch"&&(r=performance.now(),a.push({x:m.clientX,y:m.clientY,age:r}),a.length>o&&a.shift(),p())},{passive:!0}),s()}function Nt(){if(!k)return;let t=0;const e=()=>{t+=.012,k.style.setProperty("--pet-y",`${Math.sin(t)*10}px`),requestAnimationFrame(e)};e()}function Ft(){const t=document.querySelector("[data-wave]");if(!t)return;const e=t.getContext("2d");if(!e)return;const a=(o=0)=>{if(!document.body.contains(t))return;const n=t.clientWidth,i=t.clientHeight,r=window.devicePixelRatio||1;t.width=Math.floor(n*r),t.height=Math.floor(i*r),e.setTransform(r,0,0,r,0,0),e.clearRect(0,0,n,i),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,i);for(let s=0;s<=n;s+=8){const c=44+Math.sin(s*.014+o*.0018)*9+Math.sin(s*.028+o*.001)*5;e.lineTo(s,c)}e.lineTo(n,i),e.closePath(),e.fill(),requestAnimationFrame(a)};a()}function Ot(){const e=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(e,650)}
