(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const ct=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],_={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},B={"/announcements":"公告","/notes":"手记","/acg":"ACG","/resources":"资源","/gallery":"相册"};let S=null,w={total:0,published:0,drafts:0,media:0},H=0;const at=document.querySelector("#app");if(!at)throw new Error("Missing #app root");at.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${ct.map(t=>`<a href="${t.path}" data-route>${t.label}</a>`).join("")}
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
`;const v=document.querySelector("#page-root"),lt=document.querySelector("[data-header]"),U=document.querySelector("[data-menu-button]"),nt=document.querySelector("[data-nav-links]"),$=document.querySelector("[data-search-modal]"),dt=document.querySelector("[data-search-open]"),ut=document.querySelector("[data-search-close]"),ot=document.querySelector("[data-backtop]"),P=document.querySelector("[data-pet]"),T=window.matchMedia("(prefers-reduced-motion: reduce)").matches;W();window.addEventListener("popstate",W);window.addEventListener("scroll",()=>{lt?.classList.toggle("is-scrolled",window.scrollY>20),ot?.classList.toggle("is-visible",window.scrollY>420)});U?.addEventListener("click",()=>{nt?.classList.toggle("is-open"),U.classList.toggle("is-open")});dt?.addEventListener("click",()=>ie());ut?.addEventListener("click",()=>Y());$?.addEventListener("click",t=>{t.target===$&&Y()});document.addEventListener("keydown",t=>{t.key==="Escape"&&Y()});ot?.addEventListener("click",()=>window.scrollTo({top:0,behavior:T?"auto":"smooth"}));P?.addEventListener("click",()=>P.classList.add("is-hidden"));document.addEventListener("click",Gt);document.addEventListener("keydown",Kt);document.addEventListener("submit",Vt);document.addEventListener("input",Jt);document.addEventListener("change",Yt);document.addEventListener("focusin",_t);document.addEventListener("focusout",Xt);document.addEventListener("error",Qt,!0);T||(ce(),le(),ue());function W(){if(!v)return;const t=window.location.pathname;if(document.body.classList.toggle("is-admin-route",t==="/admin"),mt(t),t==="/admin"){v.innerHTML=ht(),se(),At();return}if(t.startsWith("/articles/")){v.innerHTML=bt(),Lt(decodeURIComponent(t.replace("/articles/","")));return}if(t.startsWith("/categories/")){const e=decodeURIComponent(t.replace("/categories/",""));v.innerHTML=N(e,"分类"),L({category:e});return}if(t.startsWith("/tags/")){const e=decodeURIComponent(t.replace("/tags/",""));v.innerHTML=N(e,"标签"),L({tag:e});return}if(B[t]){v.innerHTML=N(B[t],"分类"),L({category:B[t]});return}if(t!=="/"&&_[t]){v.innerHTML=ft(_[t]);return}v.innerHTML=pt(),de(),re(),L(),wt()}function mt(t){document.querySelectorAll("[data-route]").forEach(e=>{const a=e.pathname===t||t==="/"&&e.pathname==="/";e.classList.toggle("is-active",a)})}function pt(){return`
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
        ${C("正在读取文章...")}
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
            ${k("暂无分类")}
          </div>
        </section>
        <section class="side-panel">
          <h2>标签</h2>
          <div class="tag-cloud" data-tag-cloud>
            ${k("暂无标签")}
          </div>
        </section>
      </aside>
    </section>
  `}function N(t,e){return`
    <section class="subpage-hero">
      <div>
        <span>${u(e)}</span>
        <h1>${u(t)}</h1>
        <p>这里会展示后端中属于该${u(e)}的已发布文章。</p>
      </div>
    </section>
    <section class="content-shell listing-shell">
      <div class="post-column" data-post-column>
        ${C("正在读取文章...")}
      </div>
    </section>
  `}function ft(t){return`
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
  `}function ht(){return`
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
            <button type="button" data-upload-button>上传图片</button>
          </div>
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

        <form class="admin-panel editor-panel" data-admin-content data-admin-section="editor" data-article-editor novalidate hidden>
          <div class="admin-panel-title">
            <h2>Markdown 编辑器</h2>
            <button type="button" data-new-article>新建文章</button>
          </div>
          <p class="editor-state" data-editor-state>当前：新建文章</p>
          <label>标题<input type="text" placeholder="文章标题" data-article-title /><small class="field-error" data-field-error="title"></small></label>
          <label>Slug<input type="text" placeholder="article-slug" data-article-slug /><small class="field-error" data-field-error="slug"></small></label>
          <label>分类<input type="text" placeholder="公告 / 手记 / ACG / 资源 / 相册" data-article-category /></label>
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
          <label>正文<textarea data-md-source rows="14" placeholder="支持 Markdown。Bilibili iframe 可粘贴到这里预览。"></textarea><small class="field-error" data-field-error="markdown"></small></label>
          <input type="file" accept="image/*" data-upload-file hidden />
          <p class="editor-validation-summary" data-editor-validation aria-live="assertive"></p>
          <div class="editor-actions">
            <button type="submit" data-save-draft data-article-submit="draft">保存草稿</button>
            <button type="submit" data-publish-article data-article-submit="published">发布</button>
            <button type="button" data-upload-button>上传并插入正文</button>
          </div>
        </form>

        <section class="admin-panel preview-panel" data-admin-content data-admin-section="editor" hidden>
          <h2>预览</h2>
          <div class="markdown-preview" data-md-preview>输入 Markdown 后这里会显示预览。</div>
        </section>
      </section>
    </section>
  `}function gt(t){const e=t.featured?"post-card featured":"post-card",a=t.slug?`/articles/${encodeURIComponent(t.slug)}`:"#",o=t.slug?"data-route":"";return`
    <article class="${e}" role="button" tabindex="0" data-static-action>
      ${t.image?`<a class="post-image" href="${a}" ${o}><img src="${u(t.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="/categories/${encodeURIComponent(t.category)}" data-route>${u(t.category)}</a>
        <h2><a href="${a}" ${o}>${u(t.title)}</a></h2>
        <p>${u(t.excerpt)}</p>
        <div class="post-meta">
          <span>${u(t.date)}</span>
          <span>${t.views} views</span>
          <span>${t.comments} comments</span>
        </div>
      </div>
    </article>
  `}function yt(){return`
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `}function bt(){return`
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `}function vt(t){return`
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${t.coverImage?`<img class="article-cover" src="${u(t.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${u(t.category)}</p>
      <h1>${u(t.title)}</h1>
      <p class="article-meta">${F(t.publishedAt??t.updatedAt)}</p>
      <div class="article-content">${t.html||st(t.markdown)}</div>
    </article>
  `}async function L(t={}){const e=document.querySelector("[data-post-column]");if(e)try{const a=new URLSearchParams;t.category&&a.set("category",t.category),t.tag&&a.set("tag",t.tag);const o=await fetch(`/api/articles${a.size?`?${a.toString()}`:""}`);if(!o.ok)throw new Error("Failed to load articles");const n=await o.json();if(!n.articles?.length){e.innerHTML=C("暂无已发布文章");return}const r=n.articles.map((i,s)=>kt(i,s===0));e.innerHTML=`${r.map(gt).join("")}${yt()}`}catch{e.innerHTML=C("文章读取失败，请稍后再试")}}async function wt(){await Promise.all([$t(),St()])}async function $t(){const t=document.querySelector("[data-category-list]");if(t)try{const e=await fetch("/api/categories");if(!e.ok)throw new Error("Failed to load categories");const o=(await e.json()).categories??[];t.innerHTML=o.length?o.map(n=>`<a href="/categories/${n.slug}" data-route>${u(n.name)} <span>${n.count}</span></a>`).join(""):k("暂无分类")}catch{t.innerHTML=k("分类读取失败")}}async function St(){const t=document.querySelector("[data-tag-cloud]");if(t)try{const e=await fetch("/api/tags");if(!e.ok)throw new Error("Failed to load tags");const o=(await e.json()).tags??[];t.innerHTML=o.length?o.map(n=>`<a href="/tags/${n.slug}" data-route>${u(n.name)}</a>`).join(""):k("暂无标签")}catch{t.innerHTML=k("标签读取失败")}}function C(t){return`
    <section class="empty-state inline-empty">
      <h2>${u(t)}</h2>
      <p>发布文章后，这里会自动显示最新内容。</p>
    </section>
  `}function k(t){return`<p class="sidebar-empty">${u(t)}</p>`}async function Lt(t){if(v)try{const e=await fetch(`/api/articles/${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Not found");const a=await e.json();if(!a.article)throw new Error("Not found");v.innerHTML=vt(a.article)}catch{v.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function kt(t,e=!1){return{id:t.id,slug:t.slug,title:t.title,category:t.category,date:F(t.publishedAt??t.updatedAt),views:"0",comments:0,excerpt:t.summary||oe(t.html).slice(0,96),image:t.coverImage||void 0,featured:e,html:t.html}}async function At(){try{const t=await fetch("/api/admin/me",{credentials:"include"});if(!t.ok)throw new Error("Session unavailable");const e=await t.json();if(e.user?.role==="administrator"){it(e.user),await A(),await D();return}}catch{}b("")}async function qt(){const t=document.querySelector("[data-login-username]")?.value.trim()??"",e=document.querySelector("[data-login-password]")?.value??"";b("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:e})});if(!a.ok)throw new Error("登录失败");const o=await a.json();it(o.user),p("登录成功。"),await A(),await D()}catch{b("登录失败，请检查密码。","error"),p("登录失败，请检查密码。","error")}}async function Mt(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!0}),V(),b("已退出登录。"),p("已退出登录。")}function it(t){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!1}),j("articles"),b(`已登录：${t.username}`)}function b(t,e="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=t,a.classList.toggle("error",e==="error"))}async function A(){const t=document.querySelector("[data-admin-article-list]");if(!t)return;t.textContent="正在读取...";const e=document.querySelector("[data-article-search]")?.value.trim()??"";try{const a=await fetch(`/api/admin/articles${e?`?q=${encodeURIComponent(e)}`:""}`,{credentials:"include"});if(!a.ok)throw new Error("Failed to load admin articles");const n=(await a.json()).articles??[];e||Tt(n),t.innerHTML=n.length?`
        <div class="admin-ledger" role="table" aria-label="文章台账">
          ${n.map(Et).join("")}
        </div>
      `:"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{t.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}function Et(t){return`
    <article class="ledger-row" data-article-id="${t.id}" data-article-slug="${u(t.slug)}" role="row">
      <div class="ledger-main">
        <strong>${u(t.title)}</strong>
        <small>${u(t.slug)} · ${u(t.category)} · ${t.status==="published"?"已发布":"草稿"} · ${F(t.updatedAt)}</small>
      </div>
      <div class="ledger-actions">
        ${M("查看","view",t.id,"↗")}
        ${M("编辑","edit",t.id,"✎")}
        ${M("上移","up",t.id,"↑")}
        ${M("下移","down",t.id,"↓")}
        ${M("删除","delete",t.id,"×","danger")}
      </div>
    </article>
  `}function M(t,e,a,o,n=""){return`
    <button type="button" class="icon-action ${n}" aria-label="${t}" data-tooltip="${t}" data-article-action="${e}" data-article-id="${a}">
      ${o}
    </button>
  `}function Tt(t){w={...w,total:t.length,published:t.filter(e=>e.status==="published").length,drafts:t.filter(e=>e.status==="draft").length},rt()}function rt(){const t=(e,a)=>{const o=document.querySelector(e);o&&(o.textContent=String(a))};t("[data-stat-total]",w.total),t("[data-stat-published]",w.published),t("[data-stat-drafts]",w.drafts),t("[data-stat-media]",w.media),Ht()}async function G(){const t=document.querySelector("[data-system-info]");if(t)try{const e=await fetch("/api/admin/system",{credentials:"include"});if(!e.ok)throw new Error("Failed to load system info");const a=await e.json();t.innerHTML=xt(a)}catch{t.innerHTML="<p>系统信息读取失败，请确认后端已更新并处于登录状态。</p>"}}function xt(t){return`
    ${R("CPU",t.cpu.percent,`${t.cpu.percent}%`,`Load ${t.loadAverage.map(e=>e.toFixed(2)).join(" / ")}`)}
    ${R("内存",t.memory.percent,`${t.memory.percent}%`,`${E(t.memory.used)} / ${E(t.memory.total)}`)}
    ${R("存储",t.disk.percent,`${t.disk.percent}%`,`${E(t.disk.used)} / ${E(t.disk.total)} · ${u(t.disk.mount)}`)}
    <div class="system-card">
      <span>运行时间</span>
      <strong>${ae(t.uptimeSeconds)}</strong>
      <small>采样 ${new Date(t.sampledAt).toLocaleTimeString()}</small>
    </div>
  `}function R(t,e,a,o){return`
    <div class="system-card">
      <span>${t}</span>
      <strong>${a}</strong>
      <div class="system-meter" aria-label="${t} ${a}">
        <i style="width: ${Math.min(100,Math.max(0,e))}%"></i>
      </div>
      <small>${o}</small>
    </div>
  `}function It(){V(),H=window.setInterval(()=>{G()},5e3)}function V(){H&&(window.clearInterval(H),H=0)}function Ht(){const t=document.querySelector("[data-admin-pie]");if(!t)return;const e=[{label:"已发布",value:w.published,color:"#ff78ac"},{label:"草稿",value:w.drafts,color:"#7fc8ff"},{label:"媒体",value:w.media,color:"#ffd166"}].filter(n=>n.value>0),a=e.reduce((n,r)=>n+r.value,0);if(!a){t.innerHTML='<circle cx="60" cy="60" r="38" fill="rgba(255, 120, 172, 0.14)"></circle><text x="60" y="64" text-anchor="middle" class="pie-empty">No data</text>';return}let o=-90;t.innerHTML=e.map(n=>{const r=n.value/a*360,i=Pt(60,60,42,o,o+r),s=Math.round(n.value/a*100);return o+=r,`<path class="pie-slice" d="${i}" fill="${n.color}" tabindex="0" aria-label="${n.label} ${n.value}，${s}%"><title>${n.label}: ${n.value} (${s}%)</title></path>`}).join("")}function Pt(t,e,a,o,n){const r=X(t,e,a,n),i=X(t,e,a,o),s=n-o<=180?"0":"1";return[`M ${t} ${e}`,`L ${r.x} ${r.y}`,`A ${a} ${a} 0 ${s} 0 ${i.x} ${i.y}`,"Z"].join(" ")}function X(t,e,a,o){const n=o*Math.PI/180;return{x:(t+a*Math.cos(n)).toFixed(3),y:(e+a*Math.sin(n)).toFixed(3)}}async function D(){const t=document.querySelector("[data-admin-media-list]");if(t){t.textContent="正在读取...";try{const e=await fetch("/api/admin/uploads",{credentials:"include"});if(!e.ok)throw new Error("Failed to load uploads");const o=(await e.json()).uploads??[];w.media=o.length,rt(),t.innerHTML=o.length?o.map(Ct).join(""):"<p>还没有上传图片。上传后会出现在这里，可复用为封面或正文图片。</p>"}catch{t.innerHTML="<p>媒体库读取失败，请确认后端已启动并已登录。</p>"}}}function Ct(t){return`
    <article class="media-item">
      <img src="${u(t.path)}" alt="${u(t.originalName)}" loading="lazy" />
      <div>
        <strong title="${u(t.originalName)}">${u(t.originalName)}</strong>
        <small>${E(t.size)} · ${F(t.createdAt)}</small>
        <div class="media-actions">
          <button type="button" data-media-cover="${u(t.path)}">设为封面</button>
          <button type="button" data-media-insert="${u(t.path)}" data-media-name="${u(t.originalName)}">插入正文</button>
          <button type="button" class="icon-action danger" aria-label="删除" data-tooltip="删除" data-media-delete="${t.id}">×</button>
        </div>
      </div>
    </article>
  `}async function jt(t){const e=document.querySelector("[data-article-title]"),a=document.querySelector("[data-article-slug]"),o=document.querySelector("[data-article-category]"),n=document.querySelector("[data-article-tags]"),r=document.querySelector("[data-article-summary]"),i=document.querySelector("[data-article-cover]"),s=document.querySelector("[data-md-source]"),l=e?.value.trim()??"",d=a?.value.trim()??"",m=te(d),c=o?.value.trim()||"手记",g=s?.value??"";[e,a,s].forEach(h=>{h&&J(h)});const f=[];if(!l&&e&&f.push({label:"标题",message:"请填写标题。",field:e}),!d&&a&&f.push({label:"Slug",message:"请填写 Slug。",field:a}),d&&!m&&a&&f.push({label:"Slug",message:"Slug 需包含英文字母、数字或连字符。",field:a}),!g.trim()&&s&&f.push({label:"正文",message:"请填写正文。",field:s}),f.length>0){const h=f.length===1?f[0].message:`请填写：${Array.from(new Set(f.map(y=>y.label))).join("、")}。`;b(h,"error"),O(h),p(h,"error"),f.forEach(y=>Wt(y.field,y.message)),zt(f.map(y=>y.field));return}O(""),b(t==="published"?"正在发布...":"正在保存草稿..."),p(t==="published"?"正在发布文章...":"正在保存草稿..."),Z(!0);try{const h=await fetch(S?`/api/admin/articles/${S}`:"/api/admin/articles",{method:S?"PUT":"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:l,slug:m,category:c,tags:ee(n?.value??""),summary:r?.value.trim()??"",coverImage:i?.value.trim()??"",markdown:g,status:t})});if(!h.ok)throw new Error("Save failed");const y=await h.json();S=y.article.id,a.value=y.article.slug,b(t==="published"?"文章已发布。":"草稿已保存。"),p(t==="published"?"文章已发布。":"草稿已保存。"),await A(),t==="published"&&await L(),t==="published"&&K()}catch{b("保存失败。Slug 可能已存在，或登录状态已过期。","error"),p("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{Z(!1)}}async function Dt(t){b("正在上传图片..."),p("正在上传图片..."),tt(!0);const e=new FormData;e.append("file",t);try{const a=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:e});if(!a.ok)throw new Error("Upload failed");const o=await a.json(),n=o.upload?.path;if(!n)throw new Error("Upload path missing");const r=document.querySelector("[data-article-cover]"),i=document.querySelector("[data-md-source]");r&&!r.value&&(r.value=n),i&&(i.value=`${i.value.trim()}

![${t.name}](${n})`.trim(),q(i.value)),await D();const s=o.reused?"图片已存在，已复用并插入正文。":"图片已上传，并已插入正文。";b(s),p(s)}catch{b("图片上传失败，请确认已登录且文件小于 5MB。","error"),p("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{tt(!1)}}async function Ft(t){try{const e=await fetch("/api/admin/articles",{credentials:"include"});if(!e.ok)throw new Error("Failed to load articles");const o=(await e.json()).articles?.find(n=>n.id===t);if(!o)throw new Error("Article not found");Nt(o),j("editor"),p("已载入文章。")}catch{p("载入文章失败。","error")}}async function Bt(t){if(window.confirm("确定删除这篇文章？此操作不可恢复。"))try{if(!(await fetch(`/api/admin/articles/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete failed");S===t&&K(),await A(),await L(),p("文章已删除。")}catch{p("删除失败。","error")}}async function Q(t,e){try{if(!(await fetch(`/api/admin/articles/${t}/move`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({direction:e})})).ok)throw new Error("Move failed");await A(),await L(),p(e==="up"?"已上移。":"已下移。")}catch{p("调整顺序失败。","error")}}function Nt(t){S=t.id,document.querySelector("[data-article-title]").value=t.title,document.querySelector("[data-article-slug]").value=t.slug,document.querySelector("[data-article-category]").value=t.category,document.querySelector("[data-article-tags]").value=(t.tags??[]).join(", "),document.querySelector("[data-article-summary]").value=t.summary,document.querySelector("[data-article-cover]").value=t.coverImage??"",document.querySelector("[data-md-source]").value=t.markdown;const e=document.querySelector("[data-editor-state]");e&&(e.textContent=`当前：编辑 #${t.id} · ${t.status==="published"?"已发布":"草稿"}`),q(t.markdown)}function j(t){document.querySelectorAll("[data-admin-section]").forEach(e=>{e.hidden=e.dataset.adminSection!==t}),document.querySelectorAll("[data-admin-tab]").forEach(e=>{e.classList.toggle("is-active",e.dataset.adminTab===t)}),t==="system"?(G(),It()):V()}function Rt(t){const e=document.querySelector("[data-article-cover]");!e||!t||(e.value=t,p("已设为封面图。"))}function Ut(t,e="image"){const a=document.querySelector("[data-md-source]");!a||!t||(a.value=`${a.value.trim()}

![${e}](${t})`.trim(),q(a.value),p("已插入正文。"))}async function Ot(t){if(window.confirm("确定删除这张图片？使用它的文章会显示图片不存在占位图。"))try{if(!(await fetch(`/api/admin/uploads/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete upload failed");await D(),p("图片已删除。")}catch{p("图片删除失败。","error")}}function Z(t){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function tt(t){document.querySelectorAll("[data-upload-button]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function K(){S=null,document.querySelectorAll("[data-article-title], [data-article-slug], [data-article-category], [data-article-tags], [data-article-summary], [data-article-cover], [data-md-source]").forEach(e=>{e.value="",J(e)});const t=document.querySelector("[data-editor-state]");t&&(t.textContent="当前：新建文章"),O(""),q("")}function zt(t){t.forEach(a=>{a.setAttribute("aria-invalid","true"),a.classList.remove("field-validation-pulse"),a.offsetWidth,a.classList.add("field-validation-pulse")});const e=t[0];e.scrollIntoView({behavior:T?"auto":"smooth",block:"center"}),e.focus({preventScroll:!0})}function J(t){t.removeAttribute("aria-invalid"),t.classList.remove("field-validation-pulse");const e=t.matches("[data-article-title]")?"title":t.matches("[data-article-slug]")?"slug":t.matches("[data-md-source]")?"markdown":"";if(e){const a=document.querySelector(`[data-field-error="${e}"]`);a&&(a.textContent="")}}function Wt(t,e){const a=t.parentElement?.querySelector("[data-field-error]");a&&(a.textContent=e)}function O(t){const e=document.querySelector("[data-editor-validation]");e&&(e.textContent=t)}function Gt(t){const e=t.target;if(!(e instanceof Element))return;const a=e.closest("[data-admin-tab]");if(a){t.preventDefault();const c=a.dataset.adminTab;(c==="articles"||c==="editor"||c==="media"||c==="system")&&j(c);return}if(e.closest("[data-system-refresh]")){t.preventDefault(),G();return}if(e.closest("[data-new-article]")){t.preventDefault(),K(),j("editor"),p("已切换为新建文章。");return}if(e.closest("[data-login-button]")){t.preventDefault(),qt();return}if(e.closest("[data-logout-button]")){t.preventDefault(),Mt();return}if(e.closest("[data-upload-button]")){t.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const o=e.closest("[data-md-tool]");if(o){t.preventDefault(),Zt(o.dataset.mdTool??"");return}const n=e.closest("[data-article-action]");if(n){t.preventDefault();const c=Number(n.dataset.articleId),g=n.dataset.articleAction;if(g==="view"){const h=n.closest("[data-article-slug]")?.dataset.articleSlug;h&&et(`/articles/${encodeURIComponent(h)}`);return}g==="edit"&&Ft(c),g==="delete"&&Bt(c),g==="up"&&Q(c,"up"),g==="down"&&Q(c,"down");return}const r=e.closest("[data-media-cover]");if(r){t.preventDefault(),Rt(r.dataset.mediaCover??"");return}const i=e.closest("[data-media-insert]");if(i){t.preventDefault(),Ut(i.dataset.mediaInsert??"",i.dataset.mediaName??"image");return}const s=e.closest("[data-media-delete]");if(s){t.preventDefault(),Ot(Number(s.dataset.mediaDelete));return}const l=e.closest("a[data-route]");if(l){t.preventDefault(),et(l.pathname);return}const d=e.closest('a[href^="#"]');if(d){t.preventDefault(),z(d);const c=d.getAttribute("href")?.slice(1);c&&document.getElementById(c)?.scrollIntoView({behavior:T?"auto":"smooth"});return}const m=e.closest("[data-static-action]");m&&z(m)}function Vt(t){const e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches("[data-article-editor]"))return;t.preventDefault();const a=t.submitter,o=a instanceof HTMLButtonElement?a.dataset.articleSubmit:void 0;jt(o==="published"?"published":"draft")}function Kt(t){if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;e instanceof HTMLElement&&e.matches("[data-static-action]")&&(t.preventDefault(),z(e))}function Jt(t){const e=t.target;if((e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&e.matches("[data-article-title], [data-article-slug], [data-md-source]")&&J(e),e instanceof HTMLInputElement&&e.matches("[data-article-search]")){A();return}!(e instanceof HTMLTextAreaElement)||!e.matches("[data-md-source]")||q(e.value)}function Yt(t){const e=t.target;if(!(e instanceof HTMLInputElement)||!e.matches("[data-upload-file]"))return;const a=e.files?.[0];a&&(Dt(a),e.value="")}function _t(t){const e=t.target;e instanceof HTMLElement&&(!e.matches("[data-md-source]")&&!e.closest("[data-md-toolbar]")||document.querySelector(".editor-panel")?.classList.add("has-md-focus"))}function Xt(){window.setTimeout(()=>{const t=document.activeElement,e=document.querySelector(".editor-panel");!e||t instanceof HTMLElement&&(t.matches("[data-md-source]")||t.closest("[data-md-toolbar]"))||e.classList.remove("has-md-focus")},80)}function Qt(t){const e=t.target;e instanceof HTMLImageElement&&e.dataset.missingImage!=="true"&&(!e.currentSrc.includes("/api/uploads/")&&!e.src.includes("/api/uploads/")||(e.dataset.missingImage="true",e.alt="图片不存在",e.src=ne()))}function q(t){const e=document.querySelector("[data-md-preview]");e&&(e.innerHTML=st(t)||"输入 Markdown 后这里会显示预览。")}function Zt(t){const e=document.querySelector("[data-md-source]");if(!e)return;const a=e.selectionStart,o=e.selectionEnd,n=e.value.slice(a,o),r=n||"文本";let i="",s=a,l=a;if(t==="h1"||t==="h2"||t==="h3"){const d=Number(t.slice(1));i=`${"#".repeat(d)} ${r}`,s=a+d+1,l=s+r.length}else if(t==="bold")i=`**${r}**`,s=a+2,l=s+r.length;else if(t==="italic")i=`*${r}*`,s=a+1,l=s+r.length;else if(t==="quote")i=n?n.split(`
`).map(d=>`> ${d}`).join(`
`):"> 引用内容",s=a+2,l=a+i.length;else if(t==="ul")i=n?n.split(`
`).map(d=>`- ${d}`).join(`
`):"- 列表项",s=a+2,l=a+i.length;else if(t==="ol")i=n?n.split(`
`).map((d,m)=>`${m+1}. ${d}`).join(`
`):"1. 列表项",s=a+3,l=a+i.length;else if(t==="inline-code")i=`\`${r}\``,s=a+1,l=s+r.length;else if(t==="code")i=`
\`\`\`ts
${n||"代码"}
\`\`\`
`,s=a+7,l=s+(n||"代码").length;else if(t==="link")i=`[${r}](https://)`,s=a+r.length+3,l=s+8;else return;e.setRangeText(i,a,o,"end"),e.focus(),e.setSelectionRange(s,l),q(e.value)}function st(t){const o=u(t.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(m,c)=>`<iframe class="embed-preview" src="https:${c}" loading="lazy" allowfullscreen></iframe>`).split(`
`),n=[];let r=[],i=null,s=null;const l=()=>{r.length&&(n.push(`<p>${r.map(I).join("<br />")}</p>`),r=[])},d=()=>{i&&(n.push(`<${i.type}>${i.items.map(m=>`<li>${I(m)}</li>`).join("")}</${i.type}>`),i=null)};for(const m of o){if(m.trim().startsWith("```")){s?(n.push(`<pre><code>${s.join(`
`)}</code></pre>`),s=null):(l(),d(),s=[]);continue}if(s){s.push(m);continue}const c=m.trim();if(!c){l(),d();continue}if(c.startsWith("<iframe ")){l(),d(),n.push(c);continue}const g=c.match(/^!\[(.*?)\]\((.*?)\)$/);if(g){l(),d(),n.push(`<img src="${g[2]}" alt="${g[1]}" loading="lazy" />`);continue}const f=c.match(/^(#{1,6})\s+(.+)$/);if(f){l(),d(),n.push(`<h${f[1].length}>${I(f[2])}</h${f[1].length}>`);continue}const h=c.match(/^(?:>|&gt;)\s+(.+)$/);if(h){l(),d(),n.push(`<blockquote>${I(h[1])}</blockquote>`);continue}const y=c.match(/^[-*]\s+(.+)$/);if(y){l(),(!i||i.type!=="ul")&&(d(),i={type:"ul",items:[]}),i.items.push(y[1]);continue}const x=c.match(/^\d+\.\s+(.+)$/);if(x){l(),(!i||i.type!=="ol")&&(d(),i={type:"ol",items:[]}),i.items.push(x[1]);continue}d(),r.push(c)}return l(),d(),s&&n.push(`<pre><code>${s.join(`
`)}</code></pre>`),n.join("")}function I(t){return t.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(e,a,o)=>`<a href="${o.startsWith("http://")||o.startsWith("https://")||o.startsWith("/")?o:`#${o}`}" target="_blank" rel="noreferrer">${a}</a>`)}function et(t){history.pushState({},"",t),nt?.classList.remove("is-open"),U?.classList.remove("is-open"),W(),window.scrollTo({top:0,behavior:T?"auto":"smooth"})}function te(t){return t.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function ee(t){return Array.from(new Set(t.split(",").map(e=>e.trim()).filter(Boolean))).slice(0,12)}function F(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?String(t).slice(0,10):e.toISOString().slice(0,10)}function E(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/1024/1024).toFixed(1)} MB`}function ae(t){const e=Math.floor(t/86400),a=Math.floor(t%86400/3600),o=Math.floor(t%3600/60);return e>0?`${e}天 ${a}小时`:a>0?`${a}小时 ${o}分钟`:`${o}分钟`}function ne(){return`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#fff7fb"/><rect x="24" y="24" width="912" height="492" rx="18" fill="#ffffff" stroke="#ff78ac" stroke-opacity=".35" stroke-width="2"/><path d="M408 288l48-58 42 50 30-36 72 86H360l48-42z" fill="#ffd8e8"/><circle cx="586" cy="202" r="24" fill="#ff78ac" fill-opacity=".55"/><text x="480" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#7d8493">Image missing</text></svg>')}`}function oe(t){return t.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function u(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function z(t){t.classList.remove("is-clicked"),t.offsetWidth,t.classList.add("is-clicked"),window.setTimeout(()=>t.classList.remove("is-clicked"),220)}function p(t,e="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const o=document.createElement("div");o.className=`toast ${e==="error"?"error":""}`.trim(),o.textContent=t,a.append(o),requestAnimationFrame(()=>o.classList.add("is-visible")),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),220)},2600)}function ie(){$&&($.hidden=!1,requestAnimationFrame(()=>{$.classList.add("is-open"),$.querySelector("input")?.focus()}))}function Y(){$&&($.classList.remove("is-open"),window.setTimeout(()=>{$.hidden=!0},180))}function re(){fetch("https://v1.hitokoto.cn/?c=a").then(t=>t.json()).then(t=>{const e=document.querySelector("[data-hitokoto]");e&&t.hitokoto&&(e.textContent=t.hitokoto)}).catch(()=>{})}function se(){const t=document.querySelector("[data-api-status]");t&&fetch("/api/health").then(e=>e.json()).then(e=>{t.textContent=e.ok&&e.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{t.textContent="API: not deployed"})}function ce(){const t=document.querySelector("[data-mouse-trail]"),e=t?.getContext("2d");if(!t||!e)return;const a=[],o=24,n=520;let r=0,i=0;const s=()=>{const m=window.devicePixelRatio||1;t.width=Math.floor(window.innerWidth*m),t.height=Math.floor(window.innerHeight*m),t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`,e.setTransform(m,0,0,m,0,0)},l=m=>{e.clearRect(0,0,window.innerWidth,window.innerHeight);for(let c=a.length-1;c>=0;c--){const g=a[c],f=m-g.age;if(f>n){a.splice(c,1);continue}const h=f/n,y=(1-h)*.72,x=9-h*6;e.beginPath(),e.fillStyle=`rgba(255, 120, 172, ${y})`,e.shadowColor="rgba(255, 120, 172, 0.34)",e.shadowBlur=12,e.arc(g.x,g.y,x,0,Math.PI*2),e.fill()}e.shadowBlur=0,a.length>0||m-i<900?r=requestAnimationFrame(l):r=0},d=()=>{r===0&&(r=requestAnimationFrame(l))};window.addEventListener("resize",s),window.addEventListener("pointermove",m=>{m.pointerType!=="touch"&&(i=performance.now(),a.push({x:m.clientX,y:m.clientY,age:i}),a.length>o&&a.shift(),d())},{passive:!0}),s()}function le(){if(!P)return;let t=0;const e=()=>{t+=.012,P.style.setProperty("--pet-y",`${Math.sin(t)*10}px`),requestAnimationFrame(e)};e()}function de(){const t=document.querySelector("[data-wave]");if(!t)return;const e=t.getContext("2d");if(!e)return;const a=(o=0)=>{if(!document.body.contains(t))return;const n=t.clientWidth,r=t.clientHeight,i=window.devicePixelRatio||1;t.width=Math.floor(n*i),t.height=Math.floor(r*i),e.setTransform(i,0,0,i,0,0),e.clearRect(0,0,n,r),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,r);for(let s=0;s<=n;s+=8){const l=44+Math.sin(s*.014+o*.0018)*9+Math.sin(s*.028+o*.001)*5;e.lineTo(s,l)}e.lineTo(n,r),e.closePath(),e.fill(),requestAnimationFrame(a)};a()}function ue(){const e=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(e,650)}
