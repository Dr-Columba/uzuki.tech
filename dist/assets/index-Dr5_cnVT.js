(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const yt=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],et={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},U={"/announcements":"公告","/notes":"手记","/acg":"ACG","/resources":"资源","/gallery":"相册"},J=[{name:"公告",slugPrefix:"announcements"},{name:"手记",slugPrefix:"notes"},{name:"ACG",slugPrefix:"acg"},{name:"资源",slugPrefix:"resources"},{name:"相册",slugPrefix:"gallery"}],ct=Object.fromEntries(J.map(t=>[t.name,t.slugPrefix]));let L=null,$={total:0,published:0,drafts:0,media:0},k=[],lt="",q="updated-desc",z=0;const bt=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"}),dt=document.querySelector("#app");if(!dt)throw new Error("Missing #app root");dt.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${yt.map(t=>`<a href="${t.path}" data-route>${t.label}</a>`).join("")}
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
`;const v=document.querySelector("#page-root"),vt=document.querySelector("[data-header]"),G=document.querySelector("[data-menu-button]"),ut=document.querySelector("[data-nav-links]"),S=document.querySelector("[data-search-modal]"),wt=document.querySelector("[data-search-open]"),$t=document.querySelector("[data-search-close]"),mt=document.querySelector("[data-backtop]"),B=document.querySelector("[data-pet]"),H=window.matchMedia("(prefers-reduced-motion: reduce)").matches;K();window.addEventListener("popstate",K);window.addEventListener("scroll",()=>{vt?.classList.toggle("is-scrolled",window.scrollY>20),mt?.classList.toggle("is-visible",window.scrollY>420)});G?.addEventListener("click",()=>{ut?.classList.toggle("is-open"),G.classList.toggle("is-open")});wt?.addEventListener("click",()=>he());$t?.addEventListener("click",()=>tt());S?.addEventListener("click",t=>{t.target===S&&tt()});document.addEventListener("keydown",t=>{t.key==="Escape"&&tt()});mt?.addEventListener("click",()=>window.scrollTo({top:0,behavior:H?"auto":"smooth"}));B?.addEventListener("click",()=>B.classList.add("is-hidden"));document.addEventListener("click",te);document.addEventListener("keydown",ee);document.addEventListener("input",ae);document.addEventListener("change",ne);document.addEventListener("focusin",ie);document.addEventListener("focusout",re);document.addEventListener("error",se,!0);H||(be(),ve(),$e());function K(){if(!v)return;const t=window.location.pathname;if(document.body.classList.toggle("is-admin-route",t==="/admin"),St(t),t==="/admin"){v.innerHTML=kt(),ye(),jt();return}if(t.startsWith("/articles/")){v.innerHTML=Mt(),Ct(decodeURIComponent(t.replace("/articles/","")));return}if(t.startsWith("/categories/")){const e=decodeURIComponent(t.replace("/categories/",""));v.innerHTML=O(e,"分类"),x({category:e});return}if(t.startsWith("/tags/")){const e=decodeURIComponent(t.replace("/tags/",""));v.innerHTML=O(e,"标签"),x({tag:e});return}if(U[t]){v.innerHTML=O(U[t],"分类"),x({category:U[t]});return}if(t!=="/"&&et[t]){v.innerHTML=At(et[t]);return}v.innerHTML=Lt(),we(),ge(),x(),Et()}function St(t){document.querySelectorAll("[data-route]").forEach(e=>{const a=e.pathname===t||t==="/"&&e.pathname==="/";e.classList.toggle("is-active",a)})}function Lt(){return`
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
        ${F("正在读取文章...")}
      </div>

      <aside class="sidebar" id="about" aria-label="侧边栏">
        <section class="profile-panel">
          <img src="/assets/images/hero-alt.jpg" alt="" />
          <h2>Uzuki</h2>
          <p>个人博客重建中。这里会放技术笔记、生活记录、ACG 收藏和项目进度。</p>
        </section>
        <section class="side-panel">
          <h2>分类</h2>
          <div data-category-list>
            ${E("暂无分类")}
          </div>
        </section>
        <section class="side-panel">
          <h2>标签</h2>
          <div class="tag-cloud" data-tag-cloud>
            ${E("暂无标签")}
          </div>
        </section>
      </aside>
    </section>
  `}function O(t,e){return`
    <section class="subpage-hero">
      <div>
        <span>${d(e)}</span>
        <h1>${d(t)}</h1>
        <p>这里会展示后端中属于该${d(e)}的已发布文章。</p>
      </div>
    </section>
    <section class="content-shell listing-shell">
      <div class="post-column" data-post-column>
        ${F("正在读取文章...")}
      </div>
    </section>
  `}function At(t){return`
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
  `}function kt(){return`
    <section class="admin-shell">
      <header class="admin-head" data-admin-content hidden>
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
          <label>密码<input type="password" autocomplete="current-password" data-login-password /></label>
          <button type="button" data-login-button>登录</button>
          <p class="admin-message" data-admin-message></p>
        </form>

        <nav class="admin-tabs" data-admin-content hidden aria-label="后台功能">
          <button type="button" class="is-active" data-admin-tab="articles">文章</button>
          <button type="button" data-admin-tab="editor">编辑器</button>
          <button type="button" data-admin-tab="media">媒体库</button>
          <button type="button" data-admin-tab="system">系统信息</button>
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
            <div class="media-upload-controls">
              <label class="media-compress-option">
                <input type="checkbox" data-compress-upload checked />
                <span>WebP 有损压缩</span>
              </label>
              <button type="button" data-upload-button>上传图片</button>
            </div>
          </div>
          <div class="media-library-toolbar">
            <input type="search" placeholder="搜索原文件名、格式或存储路径" aria-label="搜索媒体" data-media-search />
            <select aria-label="媒体排序" data-media-sort>
              <option value="updated-desc">修改时间：新到旧</option>
              <option value="updated-asc">修改时间：旧到新</option>
              <option value="size-desc">大小：大到小</option>
              <option value="size-asc">大小：小到大</option>
              <option value="name-asc">名称：A 到 Z</option>
              <option value="name-desc">名称：Z 到 A</option>
            </select>
          </div>
          <p class="media-result-count" data-media-result-count></p>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" data-upload-file hidden />
          <div class="media-list" data-admin-media-list>正在读取...</div>
        </section>

        <section class="admin-panel system-panel" data-admin-content data-admin-section="system" hidden>
          <div class="admin-panel-title">
            <h2>系统信息</h2>
            <button type="button" data-system-refresh>刷新</button>
          </div>
          <div class="system-grid" data-system-info>
            <p>正在读取...</p>
          </div>
        </section>

        <form class="admin-panel editor-panel" data-admin-content data-admin-section="editor" data-article-editor hidden>
          <div class="admin-panel-title">
            <h2>Markdown 编辑器</h2>
            <button type="button" data-new-article>新建文章</button>
          </div>
          <p class="editor-state" data-editor-state>当前：新建文章</p>
          <label>标题<input type="text" placeholder="文章标题" data-article-title /></label>
          <label>分类<select data-article-category>
            ${J.map(t=>`<option value="${t.name}"${t.name==="手记"?" selected":""}>${t.name}</option>`).join("")}
          </select></label>
          <label>Slug<input type="text" value="notes-" placeholder="notes-article-slug" data-article-slug /></label>
          <label>标签<input type="text" placeholder="用英文逗号分隔，例如 Bun, SQLite" data-article-tags /></label>
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
          <div class="editor-actions">
            <button type="button" data-save-draft>保存草稿</button>
            <button type="button" data-publish-article>发布</button>
            <button type="button" data-open-media>上传图片</button>
          </div>
        </form>

        <section class="admin-panel preview-panel" data-admin-content data-admin-section="editor" hidden>
          <h2>预览</h2>
          <div class="markdown-preview" data-md-preview>输入 Markdown 后这里会显示预览。</div>
        </section>
      </section>
    </section>
  `}function xt(t){const e=t.featured?"post-card featured":"post-card",a=t.slug?`/articles/${encodeURIComponent(t.slug)}`:"#",o=t.slug?"data-route":"";return`
    <article class="${e}" role="button" tabindex="0" data-static-action>
      ${t.image?`<a class="post-image" href="${a}" ${o}><img src="${d(t.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="/categories/${encodeURIComponent(t.category)}" data-route>${d(t.category)}</a>
        <h2><a href="${a}" ${o}>${d(t.title)}</a></h2>
        <p>${d(t.excerpt)}</p>
        <div class="post-meta">
          <span>${d(t.date)}</span>
          <span>${t.views} views</span>
          <span>${t.comments} comments</span>
        </div>
      </div>
    </article>
  `}function Tt(){return`
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `}function Mt(){return`
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `}function qt(t){return`
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${t.coverImage?`<img class="article-cover" src="${d(t.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${d(t.category)}</p>
      <h1>${d(t.title)}</h1>
      <p class="article-meta">${X(t.publishedAt??t.updatedAt)}</p>
      <div class="article-content">${t.html||ht(t.markdown)}</div>
    </article>
  `}async function x(t={}){const e=document.querySelector("[data-post-column]");if(e)try{const a=new URLSearchParams;t.category&&a.set("category",t.category),t.tag&&a.set("tag",t.tag);const o=await fetch(`/api/articles${a.size?`?${a.toString()}`:""}`);if(!o.ok)throw new Error("Failed to load articles");const n=await o.json();if(!n.articles?.length){e.innerHTML=F("暂无已发布文章");return}const i=n.articles.map((r,s)=>Ht(r,s===0));e.innerHTML=`${i.map(xt).join("")}${Tt()}`}catch{e.innerHTML=F("文章读取失败，请稍后再试")}}async function Et(){await Promise.all([It(),Pt()])}async function It(){const t=document.querySelector("[data-category-list]");if(t)try{const e=await fetch("/api/categories");if(!e.ok)throw new Error("Failed to load categories");const o=(await e.json()).categories??[];t.innerHTML=o.length?o.map(n=>`<a href="/categories/${n.slug}" data-route>${d(n.name)} <span>${n.count}</span></a>`).join(""):E("暂无分类")}catch{t.innerHTML=E("分类读取失败")}}async function Pt(){const t=document.querySelector("[data-tag-cloud]");if(t)try{const e=await fetch("/api/tags");if(!e.ok)throw new Error("Failed to load tags");const o=(await e.json()).tags??[];t.innerHTML=o.length?o.map(n=>`<a href="/tags/${n.slug}" data-route>${d(n.name)}</a>`).join(""):E("暂无标签")}catch{t.innerHTML=E("标签读取失败")}}function F(t){return`
    <section class="empty-state inline-empty">
      <h2>${d(t)}</h2>
      <p>发布文章后，这里会自动显示最新内容。</p>
    </section>
  `}function E(t){return`<p class="sidebar-empty">${d(t)}</p>`}async function Ct(t){if(v)try{const e=await fetch(`/api/articles/${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Not found");const a=await e.json();if(!a.article)throw new Error("Not found");v.innerHTML=qt(a.article)}catch{v.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function Ht(t,e=!1){return{id:t.id,slug:t.slug,title:t.title,category:t.category,date:X(t.publishedAt??t.updatedAt),views:"0",comments:0,excerpt:t.summary||fe(t.html).slice(0,96),image:t.coverImage||void 0,featured:e,html:t.html}}async function jt(){try{const t=await fetch("/api/admin/me",{credentials:"include"});if(!t.ok)throw new Error("Session unavailable");const e=await t.json();if(e.user?.role==="administrator"){pt(e.user),await I(),await R();return}}catch{}y("")}async function Nt(){const t=document.querySelector("[data-login-username]")?.value.trim()??"",e=document.querySelector("[data-login-password]")?.value??"";y("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:e})});if(!a.ok)throw new Error("登录失败");const o=await a.json();pt(o.user),p("登录成功。"),await I(),await R()}catch{y("登录失败，请检查密码。","error"),p("登录失败，请检查密码。","error")}}async function Dt(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!0}),Z(),y("已退出登录。"),p("已退出登录。")}function pt(t){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!1}),C("articles"),y(`已登录：${t.username}`)}function y(t,e="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=t,a.classList.toggle("error",e==="error"))}async function I(){const t=document.querySelector("[data-admin-article-list]");if(!t)return;t.textContent="正在读取...";const e=document.querySelector("[data-article-search]")?.value.trim()??"";try{const a=await fetch(`/api/admin/articles${e?`?q=${encodeURIComponent(e)}`:""}`,{credentials:"include"});if(!a.ok)throw new Error("Failed to load admin articles");const n=(await a.json()).articles??[];e||Bt(n),t.innerHTML=n.length?`
        <div class="admin-ledger" role="table" aria-label="文章台账">
          ${n.map(zt).join("")}
        </div>
      `:"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{t.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}function zt(t){return`
    <article class="ledger-row" data-article-id="${t.id}" data-ledger-article-slug="${d(t.slug)}" role="row">
      <div class="ledger-main">
        <strong>${d(t.title)}</strong>
        <small>${d(t.slug)} · ${d(t.category)} · ${t.status==="published"?"已发布":"草稿"} · ${X(t.updatedAt)}</small>
      </div>
      <div class="ledger-actions">
        ${P("查看","view",t.id,"↗")}
        ${P("编辑","edit",t.id,"✎")}
        ${P("上移","up",t.id,"↑")}
        ${P("下移","down",t.id,"↓")}
        ${P("删除","delete",t.id,"×","danger")}
      </div>
    </article>
  `}function P(t,e,a,o,n=""){return`
    <button type="button" class="icon-action ${n}" aria-label="${t}" data-tooltip="${t}" data-article-action="${e}" data-article-id="${a}">
      ${o}
    </button>
  `}function Bt(t){$={...$,total:t.length,published:t.filter(e=>e.status==="published").length,drafts:t.filter(e=>e.status==="draft").length},ft()}function ft(){const t=(e,a)=>{const o=document.querySelector(e);o&&(o.textContent=String(a))};t("[data-stat-total]",$.total),t("[data-stat-published]",$.published),t("[data-stat-drafts]",$.drafts),t("[data-stat-media]",$.media),Ut()}async function V(){const t=document.querySelector("[data-system-info]");if(t)try{const e=await fetch("/api/admin/system",{credentials:"include"});if(!e.ok)throw new Error("Failed to load system info");const a=await e.json();t.innerHTML=Ft(a)}catch{t.innerHTML="<p>系统信息读取失败，请确认后端已更新并处于登录状态。</p>"}}function Ft(t){return`
    ${W("CPU",t.cpu.percent,`${t.cpu.percent}%`,`Load ${t.loadAverage.map(e=>e.toFixed(2)).join(" / ")}`)}
    ${W("内存",t.memory.percent,`${t.memory.percent}%`,`${A(t.memory.used)} / ${A(t.memory.total)}`)}
    ${W("存储",t.disk.percent,`${t.disk.percent}%`,`${A(t.disk.used)} / ${A(t.disk.total)} · ${d(t.disk.mount)}`)}
    <div class="system-card">
      <span>运行时间</span>
      <strong>${me(t.uptimeSeconds)}</strong>
      <small>采样 ${new Date(t.sampledAt).toLocaleTimeString()}</small>
    </div>
  `}function W(t,e,a,o){return`
    <div class="system-card">
      <span>${t}</span>
      <strong>${a}</strong>
      <div class="system-meter" aria-label="${t} ${a}">
        <i style="width: ${Math.min(100,Math.max(0,e))}%"></i>
      </div>
      <small>${o}</small>
    </div>
  `}function Rt(){Z(),z=window.setInterval(()=>{V()},5e3)}function Z(){z&&(window.clearInterval(z),z=0)}function Ut(){const t=document.querySelector("[data-admin-pie]");if(!t)return;const e=[{label:"已发布",value:$.published,color:"#ff78ac"},{label:"草稿",value:$.drafts,color:"#7fc8ff"},{label:"媒体",value:$.media,color:"#ffd166"}].filter(n=>n.value>0),a=e.reduce((n,i)=>n+i.value,0);if(!a){t.innerHTML='<circle cx="60" cy="60" r="38" fill="rgba(255, 120, 172, 0.14)"></circle><text x="60" y="64" text-anchor="middle" class="pie-empty">No data</text>';return}let o=-90;t.innerHTML=e.map(n=>{const i=n.value/a*360,r=Ot(60,60,42,o,o+i),s=Math.round(n.value/a*100);return o+=i,`<path class="pie-slice" d="${r}" fill="${n.color}" tabindex="0" aria-label="${n.label} ${n.value}，${s}%"><title>${n.label}: ${n.value} (${s}%)</title></path>`}).join("")}function Ot(t,e,a,o,n){const i=at(t,e,a,n),r=at(t,e,a,o),s=n-o<=180?"0":"1";return[`M ${t} ${e}`,`L ${i.x} ${i.y}`,`A ${a} ${a} 0 ${s} 0 ${r.x} ${r.y}`,"Z"].join(" ")}function at(t,e,a,o){const n=o*Math.PI/180;return{x:(t+a*Math.cos(n)).toFixed(3),y:(e+a*Math.sin(n)).toFixed(3)}}async function R(){const t=document.querySelector("[data-admin-media-list]");if(t){t.textContent="正在读取...";try{const e=await fetch("/api/admin/uploads",{credentials:"include"});if(!e.ok)throw new Error("Failed to load uploads");k=(await e.json()).uploads??[],$.media=k.length,ft(),_()}catch{k=[],t.innerHTML="<p>媒体库读取失败，请确认后端已启动并已登录。</p>"}}}function _(){const t=document.querySelector("[data-admin-media-list]"),e=document.querySelector("[data-media-result-count]");if(!t)return;const a=lt.toLocaleLowerCase("zh-CN"),o=k.filter(n=>a?[n.originalName,n.mimeType,n.path].some(i=>i.toLocaleLowerCase("zh-CN").includes(a)):!0).sort(Wt);e&&(e.textContent=k.length?`显示 ${o.length} / ${k.length}`:""),t.innerHTML=o.length?o.map(Gt).join(""):k.length?"<p>没有匹配的图片。</p>":"<p>还没有上传图片。上传后会出现在这里，可复用为封面或正文图片。</p>"}function Wt(t,e){const a=new Date(t.updatedAt??t.createdAt).getTime(),o=new Date(e.updatedAt??e.createdAt).getTime();if(q==="updated-asc")return a-o;if(q==="updated-desc")return o-a;if(q==="size-asc")return t.size-e.size;if(q==="size-desc")return e.size-t.size;const n=bt.compare(t.originalName,e.originalName);return q==="name-desc"?-n:n}function Gt(t){const e=t.mimeType.replace("image/","").toUpperCase();return`
    <article class="media-item">
      <img src="${d(t.path)}" alt="${d(t.originalName)}" loading="lazy" />
      <div>
        <strong title="${d(t.originalName)}">${d(t.originalName)}</strong>
        <small>${d(e)} · ${A(t.size)} · ${ue(t.updatedAt??t.createdAt)}</small>
        <div class="media-actions">
          <button type="button" data-media-cover="${d(t.path)}">设为封面</button>
          <button type="button" data-media-insert="${d(t.path)}" data-media-name="${d(t.originalName)}">插入正文</button>
          <button type="button" class="icon-action danger" aria-label="删除" data-tooltip="删除" data-media-delete="${t.id}">×</button>
        </div>
      </div>
    </article>
  `}function T(){return document.querySelector("[data-article-editor]")}async function nt(t){const e=T();if(!e){p("编辑器未正确加载，请刷新页面后重试。","error");return}const a=e.querySelector("[data-article-title]"),o=e.querySelector("[data-article-slug]"),n=e.querySelector("[data-article-category]"),i=e.querySelector("[data-article-tags]"),r=e.querySelector("[data-article-summary]"),s=e.querySelector("[data-article-cover]"),c=e.querySelector("[data-md-source]"),u=a?.value.trim()??"",m=o?.value.trim()??"",l=le(m),f=n?.value.trim()||"手记",g=ct[f],b=c?.value??"",h=[];if(!u&&a&&h.push({label:"标题",message:"标题不能为空。",element:a}),!m&&o&&h.push({label:"Slug",message:"Slug 不能为空。",element:o}),!L&&g&&m===`${g}-`&&o?h.push({label:"Slug",message:`请在 ${g}- 后填写 Slug 内容。`,element:o}):m&&!l&&o&&h.push({label:"Slug",message:"Slug 格式无效，仅支持英文字母、数字和连字符。",element:o}),!b.trim()&&c&&h.push({label:"正文",message:"正文不能为空。",element:c}),h.length>0){const w=h.length===1?h[0].message:`${h.map(M=>M.label).join("、")}不能为空。`;y(w,"error"),p(w,"error"),h.forEach(({element:M})=>{M.setAttribute("aria-invalid","true"),M.classList.remove("validation-pulse"),M.offsetWidth,M.classList.add("validation-pulse")});const N=h[0].element,gt=window.scrollY+N.getBoundingClientRect().top-Math.max(96,window.innerHeight*.2);window.scrollTo({top:Math.max(0,gt),behavior:H?"auto":"smooth"});return}y(t==="published"?"正在发布...":"正在保存草稿..."),p(t==="published"?"正在发布文章...":"正在保存草稿..."),it(!0);try{const w=await fetch(L?`/api/admin/articles/${L}`:"/api/admin/articles",{method:L?"PUT":"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:u,slug:l,category:f,tags:de(i?.value??""),summary:r?.value.trim()??"",coverImage:s?.value.trim()??"",markdown:b,status:t})});if(!w.ok)throw new Error("Save failed");const N=await w.json();L=N.article.id,o.value=N.article.slug,y(t==="published"?"文章已发布。":"草稿已保存。"),p(t==="published"?"文章已发布。":"草稿已保存。"),await I(),t==="published"&&await x(),t==="published"&&Q()}catch{y("保存失败。Slug 可能已存在，或登录状态已过期。","error"),p("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{it(!1)}}async function Yt(t){const e=document.querySelector("[data-compress-upload]")?.checked??!1;y("正在上传图片..."),p(e?"正在处理并上传图片...":"正在上传图片..."),rt(!0);try{const a=e?await Jt(t):t;if(a.size>5*1024*1024)throw new Error("File too large");const o=new FormData;o.append("file",a),o.append("originalName",t.name);const n=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:o});if(!n.ok)throw new Error("Upload failed");const i=await n.json();if(!i.upload?.path)throw new Error("Upload path missing");await R();const s=a!==t?`${A(t.size)} → ${A(a.size)}`:A(a.size),c=i.reused?"图片已存在，已复用媒体库文件。":`图片已上传到媒体库（${s}）。`;y(c),p(c)}catch{y("图片上传失败，请确认已登录且文件小于 5MB。","error"),p("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{rt(!1)}}async function Jt(t){if(t.type==="image/webp")return t;if(t.type!=="image/jpeg"&&t.type!=="image/png")return p("此格式不进行有损转换，将保留原文件上传。"),t;try{const e=await createImageBitmap(t),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const o=a.getContext("2d");if(!o)throw e.close(),new Error("Canvas unavailable");try{o.drawImage(e,0,0,e.width,e.height)}finally{e.close()}const n=await new Promise(r=>a.toBlob(r,"image/webp",.82));if(a.width=0,a.height=0,!n||n.size>=t.size)return p("WebP 未减少文件大小，将保留原文件上传。"),t;const i=t.name.replace(/\.[^.]+$/,"")||"image";return new File([n],`${i}.webp`,{type:"image/webp",lastModified:t.lastModified})}catch{return p("浏览器无法压缩这张图片，将保留原文件上传。","error"),t}}async function Kt(t){try{const e=await fetch("/api/admin/articles",{credentials:"include"});if(!e.ok)throw new Error("Failed to load articles");const o=(await e.json()).articles?.find(n=>n.id===t);if(!o)throw new Error("Article not found");Zt(o),C("editor"),p("已载入文章。")}catch{p("载入文章失败。","error")}}async function Vt(t){if(window.confirm("确定删除这篇文章？此操作不可恢复。"))try{if(!(await fetch(`/api/admin/articles/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete failed");L===t&&Q(),await I(),await x(),p("文章已删除。")}catch{p("删除失败。","error")}}async function ot(t,e){try{if(!(await fetch(`/api/admin/articles/${t}/move`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({direction:e})})).ok)throw new Error("Move failed");await I(),await x(),p(e==="up"?"已上移。":"已下移。")}catch{p("调整顺序失败。","error")}}function Zt(t){const e=T();if(!e){p("编辑器未正确加载，请刷新页面后重试。","error");return}L=t.id,e.querySelector("[data-article-title]").value=t.title,e.querySelector("[data-article-slug]").value=t.slug;const a=e.querySelector("[data-article-category]");[...a.options].some(n=>n.value===t.category)||a.add(new Option(t.category,t.category)),a.value=t.category,e.querySelector("[data-article-tags]").value=(t.tags??[]).join(", "),e.querySelector("[data-article-summary]").value=t.summary,e.querySelector("[data-article-cover]").value=t.coverImage??"",e.querySelector("[data-md-source]").value=t.markdown;const o=e.querySelector("[data-editor-state]");o&&(o.textContent=`当前：编辑 #${t.id} · ${t.status==="published"?"已发布":"草稿"}`),j(t.markdown)}function C(t){document.querySelectorAll("[data-admin-section]").forEach(e=>{e.hidden=e.dataset.adminSection!==t}),document.querySelectorAll("[data-admin-tab]").forEach(e=>{e.classList.toggle("is-active",e.dataset.adminTab===t)}),t==="system"?(V(),Rt()):Z()}function _t(t){const e=T()?.querySelector("[data-article-cover]");!e||!t||(e.value=t,p("已设为封面图。"))}function Qt(t,e="image"){const a=T()?.querySelector("[data-md-source]");!a||!t||(a.value=`${a.value.trim()}

![${e}](${t})`.trim(),j(a.value),p("已插入正文。"))}async function Xt(t){if(window.confirm("确定删除这张图片？使用它的文章会显示图片不存在占位图。"))try{if(!(await fetch(`/api/admin/uploads/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete upload failed");await R(),p("图片已删除。")}catch{p("图片删除失败。","error")}}function it(t){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function rt(t){document.querySelectorAll("[data-upload-button]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function Q(){L=null;const t=T();t?.querySelectorAll("[data-article-title], [data-article-slug], [data-article-tags], [data-article-summary], [data-article-cover], [data-md-source]").forEach(n=>{n.value="",n.removeAttribute("aria-invalid"),n.classList.remove("validation-pulse")});const e=t?.querySelector("[data-article-category]");e&&(e.value="手记");const a=t?.querySelector("[data-article-slug]");a&&(a.value="notes-");const o=t?.querySelector("[data-editor-state]");o&&(o.textContent="当前：新建文章"),j("")}function te(t){const e=t.target;if(!(e instanceof Element))return;const a=e.closest("[data-admin-tab]");if(a){t.preventDefault();const l=a.dataset.adminTab;(l==="articles"||l==="editor"||l==="media"||l==="system")&&C(l);return}if(e.closest("[data-system-refresh]")){t.preventDefault(),V();return}if(e.closest("[data-new-article]")){t.preventDefault(),Q(),C("editor"),p("已切换为新建文章。");return}if(e.closest("[data-login-button]")){t.preventDefault(),Nt();return}if(e.closest("[data-logout-button]")){t.preventDefault(),Dt();return}if(e.closest("[data-save-draft]")){t.preventDefault(),nt("draft");return}if(e.closest("[data-publish-article]")){t.preventDefault(),nt("published");return}if(e.closest("[data-open-media]")){t.preventDefault(),C("media"),p("请在媒体库上传图片，再选择设为封面或插入正文。");return}if(e.closest("[data-upload-button]")){t.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const o=e.closest("[data-md-tool]");if(o){t.preventDefault(),ce(o.dataset.mdTool??"");return}const n=e.closest("[data-article-action]");if(n){t.preventDefault();const l=Number(n.dataset.articleId),f=n.dataset.articleAction;if(f==="view"){const b=n.closest("[data-ledger-article-slug]")?.dataset.ledgerArticleSlug;b&&st(`/articles/${encodeURIComponent(b)}`);return}f==="edit"&&Kt(l),f==="delete"&&Vt(l),f==="up"&&ot(l,"up"),f==="down"&&ot(l,"down");return}const i=e.closest("[data-media-cover]");if(i){t.preventDefault(),_t(i.dataset.mediaCover??"");return}const r=e.closest("[data-media-insert]");if(r){t.preventDefault(),Qt(r.dataset.mediaInsert??"",r.dataset.mediaName??"image");return}const s=e.closest("[data-media-delete]");if(s){t.preventDefault(),Xt(Number(s.dataset.mediaDelete));return}const c=e.closest("a[data-route]");if(c){t.preventDefault(),st(c.pathname);return}const u=e.closest('a[href^="#"]');if(u){t.preventDefault(),Y(u);const l=u.getAttribute("href")?.slice(1);l&&document.getElementById(l)?.scrollIntoView({behavior:H?"auto":"smooth"});return}const m=e.closest("[data-static-action]");m&&Y(m)}function ee(t){if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;e instanceof HTMLElement&&e.matches("[data-static-action]")&&(t.preventDefault(),Y(e))}function ae(t){const e=t.target;if((e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&e.matches("[data-article-title], [data-article-slug], [data-md-source]")&&(e.removeAttribute("aria-invalid"),e.classList.remove("validation-pulse")),e instanceof HTMLInputElement&&e.matches("[data-article-search]")){I();return}if(e instanceof HTMLInputElement&&e.matches("[data-media-search]")){lt=e.value.trim(),_();return}!(e instanceof HTMLTextAreaElement)||!e.matches("[data-md-source]")||j(e.value)}function ne(t){const e=t.target;if(e instanceof HTMLSelectElement&&e.matches("[data-article-category]")){oe(e.value);return}if(e instanceof HTMLSelectElement&&e.matches("[data-media-sort]")){q=e.value,_();return}if(!(e instanceof HTMLInputElement)||!e.matches("[data-upload-file]"))return;const a=e.files?.[0];a&&(Yt(a),e.value="")}function oe(t){const e=T()?.querySelector("[data-article-slug]"),a=ct[t];if(!e||!a)return;const o=e.value.trim(),n=J.map(r=>`${r.slugPrefix}-`).find(r=>o.startsWith(r)),i=n?o.slice(n.length):o;e.value=`${a}-${i}`,e.removeAttribute("aria-invalid"),e.classList.remove("validation-pulse")}function ie(t){const e=t.target;e instanceof HTMLElement&&(!e.matches("[data-md-source]")&&!e.closest("[data-md-toolbar]")||document.querySelector(".editor-panel")?.classList.add("has-md-focus"))}function re(){window.setTimeout(()=>{const t=document.activeElement,e=document.querySelector(".editor-panel");!e||t instanceof HTMLElement&&(t.matches("[data-md-source]")||t.closest("[data-md-toolbar]"))||e.classList.remove("has-md-focus")},80)}function se(t){const e=t.target;e instanceof HTMLImageElement&&e.dataset.missingImage!=="true"&&(!e.currentSrc.includes("/api/uploads/")&&!e.src.includes("/api/uploads/")||(e.dataset.missingImage="true",e.alt="图片不存在",e.src=pe()))}function j(t){const e=document.querySelector("[data-md-preview]");e&&(e.innerHTML=ht(t)||"输入 Markdown 后这里会显示预览。")}function ce(t){const e=T()?.querySelector("[data-md-source]");if(!e)return;const a=e.selectionStart,o=e.selectionEnd,n=e.value.slice(a,o),i=n||"文本";let r="",s=a,c=a;if(t==="h1"||t==="h2"||t==="h3"){const u=Number(t.slice(1));r=`${"#".repeat(u)} ${i}`,s=a+u+1,c=s+i.length}else if(t==="bold")r=`**${i}**`,s=a+2,c=s+i.length;else if(t==="italic")r=`*${i}*`,s=a+1,c=s+i.length;else if(t==="quote")r=n?n.split(`
`).map(u=>`> ${u}`).join(`
`):"> 引用内容",s=a+2,c=a+r.length;else if(t==="ul")r=n?n.split(`
`).map(u=>`- ${u}`).join(`
`):"- 列表项",s=a+2,c=a+r.length;else if(t==="ol")r=n?n.split(`
`).map((u,m)=>`${m+1}. ${u}`).join(`
`):"1. 列表项",s=a+3,c=a+r.length;else if(t==="inline-code")r=`\`${i}\``,s=a+1,c=s+i.length;else if(t==="code")r=`
\`\`\`ts
${n||"代码"}
\`\`\`
`,s=a+7,c=s+(n||"代码").length;else if(t==="link")r=`[${i}](https://)`,s=a+i.length+3,c=s+8;else return;e.setRangeText(r,a,o,"end"),e.focus(),e.setSelectionRange(s,c),j(e.value)}function ht(t){const o=d(t.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(m,l)=>`<iframe class="embed-preview" src="https:${l}" loading="lazy" allowfullscreen></iframe>`).split(`
`),n=[];let i=[],r=null,s=null;const c=()=>{i.length&&(n.push(`<p>${i.map(D).join("<br />")}</p>`),i=[])},u=()=>{r&&(n.push(`<${r.type}>${r.items.map(m=>`<li>${D(m)}</li>`).join("")}</${r.type}>`),r=null)};for(const m of o){if(m.trim().startsWith("```")){s?(n.push(`<pre><code>${s.join(`
`)}</code></pre>`),s=null):(c(),u(),s=[]);continue}if(s){s.push(m);continue}const l=m.trim();if(!l){c(),u();continue}if(l.startsWith("<iframe ")){c(),u(),n.push(l);continue}const f=l.match(/^!\[(.*?)\]\((.*?)\)$/);if(f){c(),u(),n.push(`<img src="${f[2]}" alt="${f[1]}" loading="lazy" />`);continue}const g=l.match(/^(#{1,6})\s+(.+)$/);if(g){c(),u(),n.push(`<h${g[1].length}>${D(g[2])}</h${g[1].length}>`);continue}const b=l.match(/^(?:>|&gt;)\s+(.+)$/);if(b){c(),u(),n.push(`<blockquote>${D(b[1])}</blockquote>`);continue}const h=l.match(/^[-*]\s+(.+)$/);if(h){c(),(!r||r.type!=="ul")&&(u(),r={type:"ul",items:[]}),r.items.push(h[1]);continue}const w=l.match(/^\d+\.\s+(.+)$/);if(w){c(),(!r||r.type!=="ol")&&(u(),r={type:"ol",items:[]}),r.items.push(w[1]);continue}u(),i.push(l)}return c(),u(),s&&n.push(`<pre><code>${s.join(`
`)}</code></pre>`),n.join("")}function D(t){return t.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(e,a,o)=>`<a href="${o.startsWith("http://")||o.startsWith("https://")||o.startsWith("/")?o:`#${o}`}" target="_blank" rel="noreferrer">${a}</a>`)}function st(t){history.pushState({},"",t),ut?.classList.remove("is-open"),G?.classList.remove("is-open"),K(),window.scrollTo({top:0,behavior:H?"auto":"smooth"})}function le(t){return t.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function de(t){return Array.from(new Set(t.split(",").map(e=>e.trim()).filter(Boolean))).slice(0,12)}function X(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?String(t).slice(0,10):e.toISOString().slice(0,10)}function ue(t){const e=new Date(t);return Number.isNaN(e.getTime())?String(t):new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function A(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/1024/1024).toFixed(1)} MB`}function me(t){const e=Math.floor(t/86400),a=Math.floor(t%86400/3600),o=Math.floor(t%3600/60);return e>0?`${e}天 ${a}小时`:a>0?`${a}小时 ${o}分钟`:`${o}分钟`}function pe(){return`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#fff7fb"/><rect x="24" y="24" width="912" height="492" rx="18" fill="#ffffff" stroke="#ff78ac" stroke-opacity=".35" stroke-width="2"/><path d="M408 288l48-58 42 50 30-36 72 86H360l48-42z" fill="#ffd8e8"/><circle cx="586" cy="202" r="24" fill="#ff78ac" fill-opacity=".55"/><text x="480" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#7d8493">Image missing</text></svg>')}`}function fe(t){return t.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function d(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Y(t){t.classList.remove("is-clicked"),t.offsetWidth,t.classList.add("is-clicked"),window.setTimeout(()=>t.classList.remove("is-clicked"),220)}function p(t,e="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const o=document.createElement("div");o.className=`toast ${e==="error"?"error":""}`.trim(),o.textContent=t,a.append(o),requestAnimationFrame(()=>o.classList.add("is-visible")),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),220)},2600)}function he(){S&&(S.hidden=!1,requestAnimationFrame(()=>{S.classList.add("is-open"),S.querySelector("input")?.focus()}))}function tt(){S&&(S.classList.remove("is-open"),window.setTimeout(()=>{S.hidden=!0},180))}function ge(){fetch("https://v1.hitokoto.cn/?c=a").then(t=>t.json()).then(t=>{const e=document.querySelector("[data-hitokoto]");e&&t.hitokoto&&(e.textContent=t.hitokoto)}).catch(()=>{})}function ye(){const t=document.querySelector("[data-api-status]");t&&fetch("/api/health").then(e=>e.json()).then(e=>{t.textContent=e.ok&&e.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{t.textContent="API: not deployed"})}function be(){const t=document.querySelector("[data-mouse-trail]"),e=t?.getContext("2d");if(!t||!e)return;const a=[],o=24,n=520;let i=0,r=0;const s=()=>{const m=window.devicePixelRatio||1;t.width=Math.floor(window.innerWidth*m),t.height=Math.floor(window.innerHeight*m),t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`,e.setTransform(m,0,0,m,0,0)},c=m=>{e.clearRect(0,0,window.innerWidth,window.innerHeight);for(let l=a.length-1;l>=0;l--){const f=a[l],g=m-f.age;if(g>n){a.splice(l,1);continue}const b=g/n,h=(1-b)*.72,w=9-b*6;e.beginPath(),e.fillStyle=`rgba(255, 120, 172, ${h})`,e.shadowColor="rgba(255, 120, 172, 0.34)",e.shadowBlur=12,e.arc(f.x,f.y,w,0,Math.PI*2),e.fill()}e.shadowBlur=0,a.length>0||m-r<900?i=requestAnimationFrame(c):i=0},u=()=>{i===0&&(i=requestAnimationFrame(c))};window.addEventListener("resize",s),window.addEventListener("pointermove",m=>{m.pointerType!=="touch"&&(r=performance.now(),a.push({x:m.clientX,y:m.clientY,age:r}),a.length>o&&a.shift(),u())},{passive:!0}),s()}function ve(){if(!B)return;let t=0;const e=()=>{t+=.012,B.style.setProperty("--pet-y",`${Math.sin(t)*10}px`),requestAnimationFrame(e)};e()}function we(){const t=document.querySelector("[data-wave]");if(!t)return;const e=t.getContext("2d");if(!e)return;const a=(o=0)=>{if(!document.body.contains(t))return;const n=t.clientWidth,i=t.clientHeight,r=window.devicePixelRatio||1;t.width=Math.floor(n*r),t.height=Math.floor(i*r),e.setTransform(r,0,0,r,0,0),e.clearRect(0,0,n,i),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,i);for(let s=0;s<=n;s+=8){const c=44+Math.sin(s*.014+o*.0018)*9+Math.sin(s*.028+o*.001)*5;e.lineTo(s,c)}e.lineTo(n,i),e.closePath(),e.fill(),requestAnimationFrame(a)};a()}function $e(){const e=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(e,650)}
