(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const tt=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],F={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},et=[{title:"迁移记录：从 WordPress 到新的卯月科技",category:"公告",date:"2026-06-22",views:"1.2k",comments:12,excerpt:"前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",image:"/assets/images/post-1.jpg",featured:!0},{title:"夏日车站、晚风与待整理的灵感",category:"手记",date:"2026-06-19",views:"864",comments:8,excerpt:"把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",image:"/assets/images/post-3.jpg"},{title:"前端栈选择：Vite、TypeScript 与静态优先",category:"技术",date:"2026-06-16",views:"932",comments:4,excerpt:"服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",image:"/assets/images/post-4.jpg"},{title:"关于博客 UI 动效的边界",category:"设计",date:"2026-06-12",views:"706",comments:6,excerpt:"樱花、鼠标轨迹和桌宠都可以有，但需要低消耗，并尊重系统的减少动态效果设置。",image:"/assets/images/post-2.jpg"}],at=["Vite","TypeScript","Bun","Hono","SQLite","ACG","前端","迁移"];let $=null,g={total:0,published:0,drafts:0,media:0};const J=document.querySelector("#app");if(!J)throw new Error("Missing #app root");J.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${tt.map(t=>`<a href="${t.path}" data-route>${t.label}</a>`).join("")}
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
`;const w=document.querySelector("#page-root"),nt=document.querySelector("[data-header]"),C=document.querySelector("[data-menu-button]"),K=document.querySelector("[data-nav-links]"),b=document.querySelector("[data-search-modal]"),ot=document.querySelector("[data-search-open]"),it=document.querySelector("[data-search-close]"),V=document.querySelector("[data-backtop]"),E=document.querySelector("[data-pet]"),T=window.matchMedia("(prefers-reduced-motion: reduce)").matches;D();window.addEventListener("popstate",D);window.addEventListener("scroll",()=>{nt?.classList.toggle("is-scrolled",window.scrollY>20),V?.classList.toggle("is-visible",window.scrollY>420)});C?.addEventListener("click",()=>{K?.classList.toggle("is-open"),C.classList.toggle("is-open")});ot?.addEventListener("click",()=>Rt());it?.addEventListener("click",()=>N());b?.addEventListener("click",t=>{t.target===b&&N()});document.addEventListener("keydown",t=>{t.key==="Escape"&&N()});V?.addEventListener("click",()=>window.scrollTo({top:0,behavior:T?"auto":"smooth"}));E?.addEventListener("click",()=>E.classList.add("is-hidden"));document.addEventListener("click",Mt);document.addEventListener("keydown",Tt);document.addEventListener("input",It);document.addEventListener("change",Pt);document.addEventListener("focusin",jt);document.addEventListener("focusout",Ct);document.addEventListener("error",Ht,!0);T||(Wt(),Gt(),Kt());function D(){if(!w)return;const t=window.location.pathname;if(document.body.classList.toggle("is-admin-route",t==="/admin"),rt(t),t==="/admin"){w.innerHTML=lt(),zt(),ft();return}if(t.startsWith("/articles/")){w.innerHTML=dt(),mt(decodeURIComponent(t.replace("/articles/","")));return}if(t!=="/"&&F[t]){w.innerHTML=ct(F[t]);return}w.innerHTML=st(),Jt(),Ut(),I()}function rt(t){document.querySelectorAll("[data-route]").forEach(e=>{const a=e.pathname===t||t==="/"&&e.pathname==="/";e.classList.toggle("is-active",a)})}function st(){return`
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
        ${et.map(Y).join("")}
        ${_()}
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
            ${at.map(t=>`<a href="#" data-static-action>${t}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>
  `}function ct(t){return`
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
  `}function lt(){return`
    <section class="admin-shell">
      <header class="admin-head">
        <div class="admin-stat-card">
          <span>文章总数</span>
          <strong data-stat-total>0</strong>
        </div>
        <div class="admin-stat-card">
          <span>已发布</span>
          <strong data-stat-published>0</strong>
        </div>
        <div class="admin-stat-card">
          <span>草稿</span>
          <strong data-stat-drafts>0</strong>
        </div>
        <div class="admin-stat-card">
          <span>媒体</span>
          <strong data-stat-media>0</strong>
        </div>
        <div class="admin-chart" aria-label="内容统计">
          <svg class="admin-pie" viewBox="0 0 120 120" role="img" aria-label="内容占比" data-admin-pie>
            <circle cx="60" cy="60" r="38" fill="rgba(255, 120, 172, 0.14)"></circle>
          </svg>
          <div class="admin-chart-legend">
            <span><i class="published"></i>已发布</span>
            <span><i class="drafts"></i>草稿</span>
            <span><i class="media"></i>媒体</span>
          </div>
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
  `}function Y(t){const e=t.featured?"post-card featured":"post-card",a=t.slug?`/articles/${encodeURIComponent(t.slug)}`:"#",o=t.slug?"data-route":"";return`
    <article class="${e}" role="button" tabindex="0" data-static-action>
      ${t.image?`<a class="post-image" href="${a}" ${o}><img src="${p(t.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="#" data-static-action>${p(t.category)}</a>
        <h2><a href="${a}" ${o}>${p(t.title)}</a></h2>
        <p>${p(t.excerpt)}</p>
        <div class="post-meta">
          <span>${p(t.date)}</span>
          <span>${t.views} views</span>
          <span>${t.comments} comments</span>
        </div>
      </div>
    </article>
  `}function _(){return`
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `}function dt(){return`
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `}function ut(t){return`
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${t.coverImage?`<img class="article-cover" src="${p(t.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${p(t.category)}</p>
      <h1>${p(t.title)}</h1>
      <p class="article-meta">${j(t.publishedAt??t.updatedAt)}</p>
      <div class="article-content">${t.html||Z(t.markdown)}</div>
    </article>
  `}async function I(){const t=document.querySelector("[data-post-column]");if(t)try{const e=await fetch("/api/articles");if(!e.ok)throw new Error("Failed to load articles");const a=await e.json();if(!a.articles?.length)return;const o=a.articles.map((n,i)=>pt(n,i===0));t.innerHTML=`${o.map(Y).join("")}${_()}`}catch{}}async function mt(t){if(w)try{const e=await fetch(`/api/articles/${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Not found");const a=await e.json();if(!a.article)throw new Error("Not found");w.innerHTML=ut(a.article)}catch{w.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function pt(t,e=!1){return{id:t.id,slug:t.slug,title:t.title,category:t.category,date:j(t.publishedAt??t.updatedAt),views:"0",comments:0,excerpt:t.summary||Ot(t.html).slice(0,96),image:t.coverImage||"/assets/images/post-1.jpg",featured:e,html:t.html}}async function ft(){try{const t=await fetch("/api/admin/me",{credentials:"include"});if(!t.ok)throw new Error("Session unavailable");const e=await t.json();if(e.user?.role==="administrator"){X(e.user),await S(),await P();return}}catch{}h("请输入 administrator 密码登录。")}async function ht(){const t=document.querySelector("[data-login-username]")?.value.trim()??"",e=document.querySelector("[data-login-password]")?.value??"";h("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:e})});if(!a.ok)throw new Error("登录失败");const o=await a.json();X(o.user),m("登录成功。"),await S(),await P()}catch{h("登录失败，请检查密码。","error"),m("登录失败，请检查密码。","error")}}async function gt(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!0}),h("已退出登录。"),m("已退出登录。")}function X(t){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!1}),M("articles"),h(`已登录：${t.username}`)}function h(t,e="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=t,a.classList.toggle("error",e==="error"))}async function S(){const t=document.querySelector("[data-admin-article-list]");if(!t)return;t.textContent="正在读取...";const e=document.querySelector("[data-article-search]")?.value.trim()??"";try{const a=await fetch(`/api/admin/articles${e?`?q=${encodeURIComponent(e)}`:""}`,{credentials:"include"});if(!a.ok)throw new Error("Failed to load admin articles");const n=(await a.json()).articles??[];e||vt(n),t.innerHTML=n.length?`
        <div class="admin-ledger" role="table" aria-label="文章台账">
          ${n.map(bt).join("")}
        </div>
      `:"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{t.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}function bt(t){return`
    <article class="ledger-row" data-article-id="${t.id}" data-article-slug="${p(t.slug)}" role="row">
      <div class="ledger-main">
        <strong>${p(t.title)}</strong>
        <small>${p(t.slug)} · ${p(t.category)} · ${t.status==="published"?"已发布":"草稿"} · ${j(t.updatedAt)}</small>
      </div>
      <div class="ledger-actions">
        ${A("查看","view",t.id,"↗")}
        ${A("编辑","edit",t.id,"✎")}
        ${A("上移","up",t.id,"↑")}
        ${A("下移","down",t.id,"↓")}
        ${A("删除","delete",t.id,"×","danger")}
      </div>
    </article>
  `}function A(t,e,a,o,n=""){return`
    <button type="button" class="icon-action ${n}" aria-label="${t}" data-tooltip="${t}" data-article-action="${e}" data-article-id="${a}">
      ${o}
    </button>
  `}function vt(t){g={...g,total:t.length,published:t.filter(e=>e.status==="published").length,drafts:t.filter(e=>e.status==="draft").length},Q()}function Q(){const t=(e,a)=>{const o=document.querySelector(e);o&&(o.textContent=String(a))};t("[data-stat-total]",g.total),t("[data-stat-published]",g.published),t("[data-stat-drafts]",g.drafts),t("[data-stat-media]",g.media),yt()}function yt(){const t=document.querySelector("[data-admin-pie]");if(!t)return;const e=[{label:"已发布",value:g.published,color:"#ff78ac"},{label:"草稿",value:g.drafts,color:"#7fc8ff"},{label:"媒体",value:g.media,color:"#ffd166"}].filter(n=>n.value>0),a=e.reduce((n,i)=>n+i.value,0);if(!a){t.innerHTML='<circle cx="60" cy="60" r="38" fill="rgba(255, 120, 172, 0.14)"></circle><text x="60" y="64" text-anchor="middle" class="pie-empty">No data</text>';return}let o=-90;t.innerHTML=e.map(n=>{const i=n.value/a*360,r=wt(60,60,42,o,o+i),s=Math.round(n.value/a*100);return o+=i,`<path class="pie-slice" d="${r}" fill="${n.color}" tabindex="0" aria-label="${n.label} ${n.value}，${s}%"><title>${n.label}: ${n.value} (${s}%)</title></path>`}).join("")}function wt(t,e,a,o,n){const i=O(t,e,a,n),r=O(t,e,a,o),s=n-o<=180?"0":"1";return[`M ${t} ${e}`,`L ${i.x} ${i.y}`,`A ${a} ${a} 0 ${s} 0 ${r.x} ${r.y}`,"Z"].join(" ")}function O(t,e,a,o){const n=o*Math.PI/180;return{x:(t+a*Math.cos(n)).toFixed(3),y:(e+a*Math.sin(n)).toFixed(3)}}async function P(){const t=document.querySelector("[data-admin-media-list]");if(t){t.textContent="正在读取...";try{const e=await fetch("/api/admin/uploads",{credentials:"include"});if(!e.ok)throw new Error("Failed to load uploads");const o=(await e.json()).uploads??[];g.media=o.length,Q(),t.innerHTML=o.length?o.map($t).join(""):"<p>还没有上传图片。上传后会出现在这里，可复用为封面或正文图片。</p>"}catch{t.innerHTML="<p>媒体库读取失败，请确认后端已启动并已登录。</p>"}}}function $t(t){return`
    <article class="media-item">
      <img src="${p(t.path)}" alt="${p(t.originalName)}" loading="lazy" />
      <div>
        <strong title="${p(t.originalName)}">${p(t.originalName)}</strong>
        <small>${Nt(t.size)} · ${j(t.createdAt)}</small>
        <div class="media-actions">
          <button type="button" data-media-cover="${p(t.path)}">设为封面</button>
          <button type="button" data-media-insert="${p(t.path)}" data-media-name="${p(t.originalName)}">插入正文</button>
          <button type="button" class="icon-action danger" aria-label="删除" data-tooltip="删除" data-media-delete="${t.id}">×</button>
        </div>
      </div>
    </article>
  `}async function R(t){const e=document.querySelector("[data-article-title]"),a=document.querySelector("[data-article-slug]"),o=document.querySelector("[data-article-category]"),n=document.querySelector("[data-article-summary]"),i=document.querySelector("[data-article-cover]"),r=document.querySelector("[data-md-source]"),s=e?.value.trim()??"",l=Bt(a?.value||s),d=o?.value.trim()||"手记",u=r?.value??"";if(!s||!l||!u.trim()){h("标题、Slug 和正文不能为空。","error"),m("标题、Slug 和正文不能为空。","error");return}h(t==="published"?"正在发布...":"正在保存草稿..."),m(t==="published"?"正在发布文章...":"正在保存草稿..."),z(!0);try{const c=await fetch($?`/api/admin/articles/${$}`:"/api/admin/articles",{method:$?"PUT":"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:s,slug:l,category:d,summary:n?.value.trim()??"",coverImage:i?.value.trim()??"",markdown:u,status:t})});if(!c.ok)throw new Error("Save failed");const f=await c.json();$=f.article.id,a.value=f.article.slug,h(t==="published"?"文章已发布。":"草稿已保存。"),m(t==="published"?"文章已发布。":"草稿已保存。"),await S(),t==="published"&&await I(),t==="published"&&B()}catch{h("保存失败。Slug 可能已存在，或登录状态已过期。","error"),m("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{z(!1)}}async function St(t){h("正在上传图片..."),m("正在上传图片..."),W(!0);const e=new FormData;e.append("file",t);try{const a=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:e});if(!a.ok)throw new Error("Upload failed");const o=await a.json(),n=o.upload?.path;if(!n)throw new Error("Upload path missing");const i=document.querySelector("[data-article-cover]"),r=document.querySelector("[data-md-source]");i&&!i.value&&(i.value=n),r&&(r.value=`${r.value.trim()}

![${t.name}](${n})`.trim(),k(r.value)),await P();const s=o.reused?"图片已存在，已复用并插入正文。":"图片已上传，并已插入正文。";h(s),m(s)}catch{h("图片上传失败，请确认已登录且文件小于 5MB。","error"),m("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{W(!1)}}async function kt(t){try{const e=await fetch("/api/admin/articles",{credentials:"include"});if(!e.ok)throw new Error("Failed to load articles");const o=(await e.json()).articles?.find(n=>n.id===t);if(!o)throw new Error("Article not found");qt(o),M("editor"),m("已载入文章。")}catch{m("载入文章失败。","error")}}async function At(t){if(window.confirm("确定删除这篇文章？此操作不可恢复。"))try{if(!(await fetch(`/api/admin/articles/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete failed");$===t&&B(),await S(),await I(),m("文章已删除。")}catch{m("删除失败。","error")}}async function U(t,e){try{if(!(await fetch(`/api/admin/articles/${t}/move`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({direction:e})})).ok)throw new Error("Move failed");await S(),await I(),m(e==="up"?"已上移。":"已下移。")}catch{m("调整顺序失败。","error")}}function qt(t){$=t.id,document.querySelector("[data-article-title]").value=t.title,document.querySelector("[data-article-slug]").value=t.slug,document.querySelector("[data-article-category]").value=t.category,document.querySelector("[data-article-summary]").value=t.summary,document.querySelector("[data-article-cover]").value=t.coverImage??"",document.querySelector("[data-md-source]").value=t.markdown;const e=document.querySelector("[data-editor-state]");e&&(e.textContent=`当前：编辑 #${t.id} · ${t.status==="published"?"已发布":"草稿"}`),k(t.markdown)}function M(t){document.querySelectorAll("[data-admin-section]").forEach(e=>{e.hidden=e.dataset.adminSection!==t}),document.querySelectorAll("[data-admin-tab]").forEach(e=>{e.classList.toggle("is-active",e.dataset.adminTab===t)})}function Lt(t){const e=document.querySelector("[data-article-cover]");!e||!t||(e.value=t,m("已设为封面图。"))}function xt(t,e="image"){const a=document.querySelector("[data-md-source]");!a||!t||(a.value=`${a.value.trim()}

![${e}](${t})`.trim(),k(a.value),m("已插入正文。"))}async function Et(t){if(window.confirm("确定删除这张图片？使用它的文章会显示图片不存在占位图。"))try{if(!(await fetch(`/api/admin/uploads/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete upload failed");await P(),m("图片已删除。")}catch{m("图片删除失败。","error")}}function z(t){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function W(t){document.querySelectorAll("[data-upload-button]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function B(){$=null,document.querySelectorAll("[data-article-title], [data-article-slug], [data-article-category], [data-article-summary], [data-article-cover], [data-md-source]").forEach(e=>{e.value=""});const t=document.querySelector("[data-editor-state]");t&&(t.textContent="当前：新建文章"),k("")}function Mt(t){const e=t.target;if(!(e instanceof Element))return;const a=e.closest("[data-admin-tab]");if(a){t.preventDefault();const c=a.dataset.adminTab;(c==="articles"||c==="editor"||c==="media")&&M(c);return}if(e.closest("[data-new-article]")){t.preventDefault(),B(),M("editor"),m("已切换为新建文章。");return}if(e.closest("[data-login-button]")){t.preventDefault(),ht();return}if(e.closest("[data-logout-button]")){t.preventDefault(),gt();return}if(e.closest("[data-save-draft]")){t.preventDefault(),R("draft");return}if(e.closest("[data-publish-article]")){t.preventDefault(),R("published");return}if(e.closest("[data-upload-button]")){t.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const o=e.closest("[data-md-tool]");if(o){t.preventDefault(),Dt(o.dataset.mdTool??"");return}const n=e.closest("[data-article-action]");if(n){t.preventDefault();const c=Number(n.dataset.articleId),f=n.dataset.articleAction;if(f==="view"){const y=n.closest("[data-article-slug]")?.dataset.articleSlug;y&&G(`/articles/${encodeURIComponent(y)}`);return}f==="edit"&&kt(c),f==="delete"&&At(c),f==="up"&&U(c,"up"),f==="down"&&U(c,"down");return}const i=e.closest("[data-media-cover]");if(i){t.preventDefault(),Lt(i.dataset.mediaCover??"");return}const r=e.closest("[data-media-insert]");if(r){t.preventDefault(),xt(r.dataset.mediaInsert??"",r.dataset.mediaName??"image");return}const s=e.closest("[data-media-delete]");if(s){t.preventDefault(),Et(Number(s.dataset.mediaDelete));return}const l=e.closest("a[data-route]");if(l){t.preventDefault(),G(l.pathname);return}const d=e.closest('a[href^="#"]');if(d){t.preventDefault(),H(d);const c=d.getAttribute("href")?.slice(1);c&&document.getElementById(c)?.scrollIntoView({behavior:T?"auto":"smooth"});return}const u=e.closest("[data-static-action]");u&&H(u)}function Tt(t){if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;e instanceof HTMLElement&&e.matches("[data-static-action]")&&(t.preventDefault(),H(e))}function It(t){const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-article-search]")){S();return}!(e instanceof HTMLTextAreaElement)||!e.matches("[data-md-source]")||k(e.value)}function Pt(t){const e=t.target;if(!(e instanceof HTMLInputElement)||!e.matches("[data-upload-file]"))return;const a=e.files?.[0];a&&(St(a),e.value="")}function jt(t){const e=t.target;e instanceof HTMLElement&&(!e.matches("[data-md-source]")&&!e.closest("[data-md-toolbar]")||document.querySelector(".editor-panel")?.classList.add("has-md-focus"))}function Ct(){window.setTimeout(()=>{const t=document.activeElement,e=document.querySelector(".editor-panel");!e||t instanceof HTMLElement&&(t.matches("[data-md-source]")||t.closest("[data-md-toolbar]"))||e.classList.remove("has-md-focus")},80)}function Ht(t){const e=t.target;e instanceof HTMLImageElement&&e.dataset.missingImage!=="true"&&(!e.currentSrc.includes("/api/uploads/")&&!e.src.includes("/api/uploads/")||(e.dataset.missingImage="true",e.alt="图片不存在",e.src=Ft()))}function k(t){const e=document.querySelector("[data-md-preview]");e&&(e.innerHTML=Z(t)||"输入 Markdown 后这里会显示预览。")}function Dt(t){const e=document.querySelector("[data-md-source]");if(!e)return;const a=e.selectionStart,o=e.selectionEnd,n=e.value.slice(a,o),i=n||"文本";let r="",s=a,l=a;if(t==="h1"||t==="h2"||t==="h3"){const d=Number(t.slice(1));r=`${"#".repeat(d)} ${i}`,s=a+d+1,l=s+i.length}else if(t==="bold")r=`**${i}**`,s=a+2,l=s+i.length;else if(t==="italic")r=`*${i}*`,s=a+1,l=s+i.length;else if(t==="quote")r=n?n.split(`
`).map(d=>`> ${d}`).join(`
`):"> 引用内容",s=a+2,l=a+r.length;else if(t==="ul")r=n?n.split(`
`).map(d=>`- ${d}`).join(`
`):"- 列表项",s=a+2,l=a+r.length;else if(t==="ol")r=n?n.split(`
`).map((d,u)=>`${u+1}. ${d}`).join(`
`):"1. 列表项",s=a+3,l=a+r.length;else if(t==="inline-code")r=`\`${i}\``,s=a+1,l=s+i.length;else if(t==="code")r=`
\`\`\`ts
${n||"代码"}
\`\`\`
`,s=a+7,l=s+(n||"代码").length;else if(t==="link")r=`[${i}](https://)`,s=a+i.length+3,l=s+8;else return;e.setRangeText(r,a,o,"end"),e.focus(),e.setSelectionRange(s,l),k(e.value)}function Z(t){const o=p(t.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(u,c)=>`<iframe class="embed-preview" src="https:${c}" loading="lazy" allowfullscreen></iframe>`).split(`
`),n=[];let i=[],r=null,s=null;const l=()=>{i.length&&(n.push(`<p>${i.map(x).join("<br />")}</p>`),i=[])},d=()=>{r&&(n.push(`<${r.type}>${r.items.map(u=>`<li>${x(u)}</li>`).join("")}</${r.type}>`),r=null)};for(const u of o){if(u.trim().startsWith("```")){s?(n.push(`<pre><code>${s.join(`
`)}</code></pre>`),s=null):(l(),d(),s=[]);continue}if(s){s.push(u);continue}const c=u.trim();if(!c){l(),d();continue}if(c.startsWith("<iframe ")){l(),d(),n.push(c);continue}const f=c.match(/^!\[(.*?)\]\((.*?)\)$/);if(f){l(),d(),n.push(`<img src="${f[2]}" alt="${f[1]}" loading="lazy" />`);continue}const v=c.match(/^(#{1,6})\s+(.+)$/);if(v){l(),d(),n.push(`<h${v[1].length}>${x(v[2])}</h${v[1].length}>`);continue}const y=c.match(/^(?:>|&gt;)\s+(.+)$/);if(y){l(),d(),n.push(`<blockquote>${x(y[1])}</blockquote>`);continue}const q=c.match(/^[-*]\s+(.+)$/);if(q){l(),(!r||r.type!=="ul")&&(d(),r={type:"ul",items:[]}),r.items.push(q[1]);continue}const L=c.match(/^\d+\.\s+(.+)$/);if(L){l(),(!r||r.type!=="ol")&&(d(),r={type:"ol",items:[]}),r.items.push(L[1]);continue}d(),i.push(c)}return l(),d(),s&&n.push(`<pre><code>${s.join(`
`)}</code></pre>`),n.join("")}function x(t){return t.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(e,a,o)=>`<a href="${o.startsWith("http://")||o.startsWith("https://")||o.startsWith("/")?o:`#${o}`}" target="_blank" rel="noreferrer">${a}</a>`)}function G(t){history.pushState({},"",t),K?.classList.remove("is-open"),C?.classList.remove("is-open"),D(),window.scrollTo({top:0,behavior:T?"auto":"smooth"})}function Bt(t){return t.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function j(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?String(t).slice(0,10):e.toISOString().slice(0,10)}function Nt(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/1024/1024).toFixed(1)} MB`}function Ft(){return`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#fff7fb"/><rect x="24" y="24" width="912" height="492" rx="18" fill="#ffffff" stroke="#ff78ac" stroke-opacity=".35" stroke-width="2"/><path d="M408 288l48-58 42 50 30-36 72 86H360l48-42z" fill="#ffd8e8"/><circle cx="586" cy="202" r="24" fill="#ff78ac" fill-opacity=".55"/><text x="480" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#7d8493">Image missing</text></svg>')}`}function Ot(t){return t.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function p(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function H(t){t.classList.remove("is-clicked"),t.offsetWidth,t.classList.add("is-clicked"),window.setTimeout(()=>t.classList.remove("is-clicked"),220)}function m(t,e="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const o=document.createElement("div");o.className=`toast ${e==="error"?"error":""}`.trim(),o.textContent=t,a.append(o),requestAnimationFrame(()=>o.classList.add("is-visible")),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),220)},2600)}function Rt(){b&&(b.hidden=!1,requestAnimationFrame(()=>{b.classList.add("is-open"),b.querySelector("input")?.focus()}))}function N(){b&&(b.classList.remove("is-open"),window.setTimeout(()=>{b.hidden=!0},180))}function Ut(){fetch("https://v1.hitokoto.cn/?c=a").then(t=>t.json()).then(t=>{const e=document.querySelector("[data-hitokoto]");e&&t.hitokoto&&(e.textContent=t.hitokoto)}).catch(()=>{})}function zt(){const t=document.querySelector("[data-api-status]");t&&fetch("/api/health").then(e=>e.json()).then(e=>{t.textContent=e.ok&&e.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{t.textContent="API: not deployed"})}function Wt(){const t=document.querySelector("[data-mouse-trail]"),e=t?.getContext("2d");if(!t||!e)return;const a=[],o=24,n=520;let i=0,r=0;const s=()=>{const u=window.devicePixelRatio||1;t.width=Math.floor(window.innerWidth*u),t.height=Math.floor(window.innerHeight*u),t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`,e.setTransform(u,0,0,u,0,0)},l=u=>{e.clearRect(0,0,window.innerWidth,window.innerHeight);for(let c=a.length-1;c>=0;c--){const f=a[c],v=u-f.age;if(v>n){a.splice(c,1);continue}const y=v/n,q=(1-y)*.72,L=9-y*6;e.beginPath(),e.fillStyle=`rgba(255, 120, 172, ${q})`,e.shadowColor="rgba(255, 120, 172, 0.34)",e.shadowBlur=12,e.arc(f.x,f.y,L,0,Math.PI*2),e.fill()}e.shadowBlur=0,a.length>0||u-r<900?i=requestAnimationFrame(l):i=0},d=()=>{i===0&&(i=requestAnimationFrame(l))};window.addEventListener("resize",s),window.addEventListener("pointermove",u=>{u.pointerType!=="touch"&&(r=performance.now(),a.push({x:u.clientX,y:u.clientY,age:r}),a.length>o&&a.shift(),d())},{passive:!0}),s()}function Gt(){if(!E)return;let t=0;const e=()=>{t+=.012,E.style.setProperty("--pet-y",`${Math.sin(t)*10}px`),requestAnimationFrame(e)};e()}function Jt(){const t=document.querySelector("[data-wave]");if(!t)return;const e=t.getContext("2d");if(!e)return;const a=(o=0)=>{if(!document.body.contains(t))return;const n=t.clientWidth,i=t.clientHeight,r=window.devicePixelRatio||1;t.width=Math.floor(n*r),t.height=Math.floor(i*r),e.setTransform(r,0,0,r,0,0),e.clearRect(0,0,n,i),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,i);for(let s=0;s<=n;s+=8){const l=44+Math.sin(s*.014+o*.0018)*9+Math.sin(s*.028+o*.001)*5;e.lineTo(s,l)}e.lineTo(n,i),e.closePath(),e.fill(),requestAnimationFrame(a)};a()}function Kt(){const e=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(e,650)}
