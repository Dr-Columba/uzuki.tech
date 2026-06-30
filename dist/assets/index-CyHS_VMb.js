const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/syntax-highlight-D1YpSocS.js","assets/syntax-highlight-Dfs9RUU9.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const $t="modulepreload",St=function(t){return"/"+t},nt={},Lt=function(e,a,o){let n=Promise.resolve();if(a&&a.length>0){let u=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var s=u;document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=r?.nonce||r?.getAttribute("nonce");n=u(a.map(c=>{if(c=St(c),c in nt)return;nt[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":$t,d||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),d)return new Promise((v,g)=>{f.addEventListener("load",v),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return n.then(r=>{for(const l of r||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})},kt=[{label:"首页",path:"/"},{label:"公告",path:"/announcements"},{label:"手记",path:"/notes"},{label:"ACG",path:"/acg"},{label:"资源",path:"/resources"},{label:"相册",path:"/gallery"},{label:"留言",path:"/guestbook"}],ot={"/announcements":{title:"公告",eyebrow:"Announcements",description:"这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。"},"/notes":{title:"手记",eyebrow:"Notes",description:"这里预留个人日常、技术札记和迁移记录。"},"/acg":{title:"ACG",eyebrow:"Collections",description:"这里预留 ACG 相关收藏、感想和条目索引。"},"/resources":{title:"资源",eyebrow:"Resources",description:"这里预留资源索引。后续可加入权限、下载说明和访问统计。"},"/gallery":{title:"相册",eyebrow:"Gallery",description:"这里预留图片相册和媒体归档。上传文件会由后端统一管理。"},"/guestbook":{title:"留言",eyebrow:"Guestbook",description:"这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。"}},O={"/announcements":"公告","/notes":"手记","/acg":"ACG","/resources":"资源","/gallery":"相册"},V=[{name:"公告",slugPrefix:"announcements"},{name:"手记",slugPrefix:"notes"},{name:"ACG",slugPrefix:"acg"},{name:"资源",slugPrefix:"resources"},{name:"相册",slugPrefix:"gallery"}],mt=Object.fromEntries(V.map(t=>[t.name,t.slugPrefix])),xt={"c#":"cs","c++":"cpp",csharp:"cs",html:"xml",js:"javascript",jsonc:"json",py:"python",sh:"bash",shell:"bash",text:"plaintext",ts:"typescript"},At=new Set(["bash","c","cpp","cs","css","go","java","javascript","json","plaintext","python","rust","sql","typescript","xml"]);let L=null,$={total:0,published:0,drafts:0,media:0},T=[],pt="",q="updated-desc",z=0;const Tt=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"}),ft=document.querySelector("#app");if(!ft)throw new Error("Missing #app root");ft.innerHTML=`
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${kt.map(t=>`<a href="${t.path}" data-route>${t.label}</a>`).join("")}
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
`;const y=document.querySelector("#page-root"),Et=document.querySelector("[data-header]"),G=document.querySelector("[data-menu-button]"),ht=document.querySelector("[data-nav-links]"),S=document.querySelector("[data-search-modal]"),Mt=document.querySelector("[data-search-open]"),qt=document.querySelector("[data-search-close]"),gt=document.querySelector("[data-backtop]"),R=document.querySelector("[data-pet]"),N=window.matchMedia("(prefers-reduced-motion: reduce)").matches;Y();window.addEventListener("popstate",Y);window.addEventListener("scroll",()=>{Et?.classList.toggle("is-scrolled",window.scrollY>20),gt?.classList.toggle("is-visible",window.scrollY>420)});G?.addEventListener("click",()=>{ht?.classList.toggle("is-open"),G.classList.toggle("is-open")});Mt?.addEventListener("click",()=>Ae());qt?.addEventListener("click",()=>at());S?.addEventListener("click",t=>{t.target===S&&at()});document.addEventListener("keydown",t=>{t.key==="Escape"&&at()});gt?.addEventListener("click",()=>window.scrollTo({top:0,behavior:N?"auto":"smooth"}));R?.addEventListener("click",()=>R.classList.add("is-hidden"));document.addEventListener("click",le);document.addEventListener("keydown",de);document.addEventListener("input",ue);document.addEventListener("change",me);document.addEventListener("focusin",fe);document.addEventListener("focusout",he);document.addEventListener("error",ge,!0);N||(Me(),qe(),Ie());function Y(){if(!y)return;const t=window.location.pathname;if(document.body.classList.toggle("is-admin-route",t==="/admin"),Ct(t),t==="/admin"){y.innerHTML=Ht(),Ee(),Wt();return}if(t.startsWith("/articles/")){y.innerHTML=Dt(),Ft(decodeURIComponent(t.replace("/articles/","")));return}if(t.startsWith("/categories/")){const e=decodeURIComponent(t.replace("/categories/",""));y.innerHTML=W(e,"分类"),E({category:e});return}if(t.startsWith("/tags/")){const e=decodeURIComponent(t.replace("/tags/",""));y.innerHTML=W(e,"标签"),E({tag:e});return}if(O[t]){y.innerHTML=W(O[t],"分类"),E({category:O[t]});return}if(t!=="/"&&ot[t]){y.innerHTML=Pt(ot[t]);return}y.innerHTML=It(),Ce(),Te(),E(),zt()}function Ct(t){document.querySelectorAll("[data-route]").forEach(e=>{const a=e.pathname===t||t==="/"&&e.pathname==="/";e.classList.toggle("is-active",a)})}function It(){return`
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
        ${U("正在读取文章...")}
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
            ${C("暂无分类")}
          </div>
        </section>
        <section class="side-panel">
          <h2>标签</h2>
          <div class="tag-cloud" data-tag-cloud>
            ${C("暂无标签")}
          </div>
        </section>
      </aside>
    </section>
  `}function W(t,e){return`
    <section class="subpage-hero">
      <div>
        <span>${m(e)}</span>
        <h1>${m(t)}</h1>
        <p>这里会展示后端中属于该${m(e)}的已发布文章。</p>
      </div>
    </section>
    <section class="content-shell listing-shell">
      <div class="post-column" data-post-column>
        ${U("正在读取文章...")}
      </div>
    </section>
  `}function Pt(t){return`
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
  `}function Ht(){return`
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
            ${V.map(t=>`<option value="${t.name}"${t.name==="手记"?" selected":""}>${t.name}</option>`).join("")}
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
            <select class="markdown-code-language" data-code-language aria-label="插入代码块并选择语言" title="插入代码块并选择语言">
              <option value="" selected>{ }</option>
              <option value="plaintext">Text</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="xml">HTML / XML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
              <option value="bash">Bash</option>
              <option value="python">Python</option>
              <option value="sql">SQL</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="cs">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
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
  `}function jt(t){const e=t.featured?"post-card featured":"post-card",a=t.slug?`/articles/${encodeURIComponent(t.slug)}`:"#",o=t.slug?"data-route":"";return`
    <article class="${e}" role="button" tabindex="0" data-static-action>
      ${t.image?`<a class="post-image" href="${a}" ${o}><img src="${m(t.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`:""}
      <div class="post-body">
        <a class="category" href="/categories/${encodeURIComponent(t.category)}" data-route>${m(t.category)}</a>
        <h2><a href="${a}" ${o}>${m(t.title)}</a></h2>
        <p>${m(t.excerpt)}</p>
        <div class="post-meta">
          <span>${m(t.date)}</span>
          <span>${t.views} views</span>
          <span>${t.comments} comments</span>
        </div>
      </div>
    </article>
  `}function Nt(){return`
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `}function Dt(){return`
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `}function Bt(t){return`
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${t.coverImage?`<img class="article-cover" src="${m(t.coverImage)}" alt="" />`:""}
      <p class="eyebrow">${m(t.category)}</p>
      <h1>${m(t.title)}</h1>
      <p class="article-meta">${et(t.publishedAt??t.updatedAt)}</p>
      <div class="article-content">${t.html||wt(t.markdown)}</div>
    </article>
  `}async function E(t={}){const e=document.querySelector("[data-post-column]");if(e)try{const a=new URLSearchParams;t.category&&a.set("category",t.category),t.tag&&a.set("tag",t.tag);const o=await fetch(`/api/articles${a.size?`?${a.toString()}`:""}`);if(!o.ok)throw new Error("Failed to load articles");const n=await o.json();if(!n.articles?.length){e.innerHTML=U("暂无已发布文章");return}const i=n.articles.map((s,r)=>Ot(s,r===0));e.innerHTML=`${i.map(jt).join("")}${Nt()}`}catch{e.innerHTML=U("文章读取失败，请稍后再试")}}async function zt(){await Promise.all([Rt(),Ut()])}async function Rt(){const t=document.querySelector("[data-category-list]");if(t)try{const e=await fetch("/api/categories");if(!e.ok)throw new Error("Failed to load categories");const o=(await e.json()).categories??[];t.innerHTML=o.length?o.map(n=>`<a href="/categories/${n.slug}" data-route>${m(n.name)} <span>${n.count}</span></a>`).join(""):C("暂无分类")}catch{t.innerHTML=C("分类读取失败")}}async function Ut(){const t=document.querySelector("[data-tag-cloud]");if(t)try{const e=await fetch("/api/tags");if(!e.ok)throw new Error("Failed to load tags");const o=(await e.json()).tags??[];t.innerHTML=o.length?o.map(n=>`<a href="/tags/${n.slug}" data-route>${m(n.name)}</a>`).join(""):C("暂无标签")}catch{t.innerHTML=C("标签读取失败")}}function U(t){return`
    <section class="empty-state inline-empty">
      <h2>${m(t)}</h2>
      <p>发布文章后，这里会自动显示最新内容。</p>
    </section>
  `}function C(t){return`<p class="sidebar-empty">${m(t)}</p>`}async function Ft(t){if(y)try{const e=await fetch(`/api/articles/${encodeURIComponent(t)}`);if(!e.ok)throw new Error("Not found");const a=await e.json();if(!a.article)throw new Error("Not found");y.innerHTML=Bt(a.article);const o=y.querySelector(".article-content");o&&bt(o,a.article.markdown)}catch{y.innerHTML=`
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `}}function Ot(t,e=!1){return{id:t.id,slug:t.slug,title:t.title,category:t.category,date:et(t.publishedAt??t.updatedAt),views:"0",comments:0,excerpt:t.summary||xe(t.html).slice(0,96),image:t.coverImage||void 0,featured:e,html:t.html}}async function Wt(){try{const t=await fetch("/api/admin/me",{credentials:"include"});if(!t.ok)throw new Error("Session unavailable");const e=await t.json();if(e.user?.role==="administrator"){vt(e.user),await I(),await F();return}}catch{}b("")}async function _t(){const t=document.querySelector("[data-login-username]")?.value.trim()??"",e=document.querySelector("[data-login-password]")?.value??"";b("正在登录...");try{const a=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:e})});if(!a.ok)throw new Error("登录失败");const o=await a.json();vt(o.user),p("登录成功。"),await I(),await F()}catch{b("登录失败，请检查密码。","error"),p("登录失败，请检查密码。","error")}}async function Gt(){await fetch("/api/admin/logout",{method:"POST",credentials:"include"}).catch(()=>{}),document.querySelector("[data-admin-login]")?.removeAttribute("hidden"),document.querySelectorAll("[data-admin-content]").forEach(t=>{t.hidden=!0}),Q(),b("已退出登录。"),p("已退出登录。")}function vt(t){document.querySelector("[data-admin-login]")?.setAttribute("hidden","true"),document.querySelectorAll("[data-admin-content]").forEach(e=>{e.hidden=!1}),j("articles"),b(`已登录：${t.username}`)}function b(t,e="info"){const a=document.querySelector("[data-admin-message]");a&&(a.textContent=t,a.classList.toggle("error",e==="error"))}async function I(){const t=document.querySelector("[data-admin-article-list]");if(!t)return;t.textContent="正在读取...";const e=document.querySelector("[data-article-search]")?.value.trim()??"";try{const a=await fetch(`/api/admin/articles${e?`?q=${encodeURIComponent(e)}`:""}`,{credentials:"include"});if(!a.ok)throw new Error("Failed to load admin articles");const n=(await a.json()).articles??[];e||Vt(n),t.innerHTML=n.length?`
        <div class="admin-ledger" role="table" aria-label="文章台账">
          ${n.map(Jt).join("")}
        </div>
      `:"<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>"}catch{t.innerHTML="<p>文章列表读取失败，请确认后端已启动并已登录。</p>"}}function Jt(t){return`
    <article class="ledger-row" data-article-id="${t.id}" data-ledger-article-slug="${m(t.slug)}" role="row">
      <div class="ledger-main">
        <strong>${m(t.title)}</strong>
        <small>${m(t.slug)} · ${m(t.category)} · ${t.status==="published"?"已发布":"草稿"} · ${et(t.updatedAt)}</small>
      </div>
      <div class="ledger-actions">
        ${H("查看","view",t.id,"↗")}
        ${H("编辑","edit",t.id,"✎")}
        ${H("上移","up",t.id,"↑")}
        ${H("下移","down",t.id,"↓")}
        ${H("删除","delete",t.id,"×","danger")}
      </div>
    </article>
  `}function H(t,e,a,o,n=""){return`
    <button type="button" class="icon-action ${n}" aria-label="${t}" data-tooltip="${t}" data-article-action="${e}" data-article-id="${a}">
      ${o}
    </button>
  `}function Vt(t){$={...$,total:t.length,published:t.filter(e=>e.status==="published").length,drafts:t.filter(e=>e.status==="draft").length},yt()}function yt(){const t=(e,a)=>{const o=document.querySelector(e);o&&(o.textContent=String(a))};t("[data-stat-total]",$.total),t("[data-stat-published]",$.published),t("[data-stat-drafts]",$.drafts),t("[data-stat-media]",$.media),Qt()}async function K(){const t=document.querySelector("[data-system-info]");if(t)try{const e=await fetch("/api/admin/system",{credentials:"include"});if(!e.ok)throw new Error("Failed to load system info");const a=await e.json();t.innerHTML=Yt(a)}catch{t.innerHTML="<p>系统信息读取失败，请确认后端已更新并处于登录状态。</p>"}}function Yt(t){return`
    ${_("CPU",t.cpu.percent,`${t.cpu.percent}%`,`Load ${t.loadAverage.map(e=>e.toFixed(2)).join(" / ")}`)}
    ${_("内存",t.memory.percent,`${t.memory.percent}%`,`${k(t.memory.used)} / ${k(t.memory.total)}`)}
    ${_("存储",t.disk.percent,`${t.disk.percent}%`,`${k(t.disk.used)} / ${k(t.disk.total)} · ${m(t.disk.mount)}`)}
    <div class="system-card">
      <span>运行时间</span>
      <strong>${Le(t.uptimeSeconds)}</strong>
      <small>采样 ${new Date(t.sampledAt).toLocaleTimeString()}</small>
    </div>
  `}function _(t,e,a,o){return`
    <div class="system-card">
      <span>${t}</span>
      <strong>${a}</strong>
      <div class="system-meter" aria-label="${t} ${a}">
        <i style="width: ${Math.min(100,Math.max(0,e))}%"></i>
      </div>
      <small>${o}</small>
    </div>
  `}function Kt(){Q(),z=window.setInterval(()=>{K()},5e3)}function Q(){z&&(window.clearInterval(z),z=0)}function Qt(){const t=document.querySelector("[data-admin-pie]");if(!t)return;const e=[{label:"已发布",value:$.published,color:"#ff78ac"},{label:"草稿",value:$.drafts,color:"#7fc8ff"},{label:"媒体",value:$.media,color:"#ffd166"}].filter(n=>n.value>0),a=e.reduce((n,i)=>n+i.value,0);if(!a){t.innerHTML='<circle cx="60" cy="60" r="38" fill="rgba(255, 120, 172, 0.14)"></circle><text x="60" y="64" text-anchor="middle" class="pie-empty">No data</text>';return}let o=-90;t.innerHTML=e.map(n=>{const i=n.value/a*360,s=Xt(60,60,42,o,o+i),r=Math.round(n.value/a*100);return o+=i,`<path class="pie-slice" d="${s}" fill="${n.color}" tabindex="0" aria-label="${n.label} ${n.value}，${r}%"><title>${n.label}: ${n.value} (${r}%)</title></path>`}).join("")}function Xt(t,e,a,o,n){const i=it(t,e,a,n),s=it(t,e,a,o),r=n-o<=180?"0":"1";return[`M ${t} ${e}`,`L ${i.x} ${i.y}`,`A ${a} ${a} 0 ${r} 0 ${s.x} ${s.y}`,"Z"].join(" ")}function it(t,e,a,o){const n=o*Math.PI/180;return{x:(t+a*Math.cos(n)).toFixed(3),y:(e+a*Math.sin(n)).toFixed(3)}}async function F(){const t=document.querySelector("[data-admin-media-list]");if(t){t.textContent="正在读取...";try{const e=await fetch("/api/admin/uploads",{credentials:"include"});if(!e.ok)throw new Error("Failed to load uploads");T=(await e.json()).uploads??[],$.media=T.length,yt(),X()}catch{T=[],t.innerHTML="<p>媒体库读取失败，请确认后端已启动并已登录。</p>"}}}function X(){const t=document.querySelector("[data-admin-media-list]"),e=document.querySelector("[data-media-result-count]");if(!t)return;const a=pt.toLocaleLowerCase("zh-CN"),o=T.filter(n=>a?[n.originalName,n.mimeType,n.path].some(i=>i.toLocaleLowerCase("zh-CN").includes(a)):!0).sort(Zt);e&&(e.textContent=T.length?`显示 ${o.length} / ${T.length}`:""),t.innerHTML=o.length?o.map(te).join(""):T.length?"<p>没有匹配的图片。</p>":"<p>还没有上传图片。上传后会出现在这里，可复用为封面或正文图片。</p>"}function Zt(t,e){const a=new Date(t.updatedAt??t.createdAt).getTime(),o=new Date(e.updatedAt??e.createdAt).getTime();if(q==="updated-asc")return a-o;if(q==="updated-desc")return o-a;if(q==="size-asc")return t.size-e.size;if(q==="size-desc")return e.size-t.size;const n=Tt.compare(t.originalName,e.originalName);return q==="name-desc"?-n:n}function te(t){const e=t.mimeType.replace("image/","").toUpperCase();return`
    <article class="media-item">
      <img src="${m(t.path)}" alt="${m(t.originalName)}" loading="lazy" />
      <div>
        <strong title="${m(t.originalName)}">${m(t.originalName)}</strong>
        <small>${m(e)} · ${k(t.size)} · ${Se(t.updatedAt??t.createdAt)}</small>
        <div class="media-actions">
          <button type="button" data-media-cover="${m(t.path)}">设为封面</button>
          <button type="button" data-media-insert="${m(t.path)}" data-media-name="${m(t.originalName)}">插入正文</button>
          <button type="button" class="icon-action danger" aria-label="删除" data-tooltip="删除" data-media-delete="${t.id}">×</button>
        </div>
      </div>
    </article>
  `}function x(){return document.querySelector("[data-article-editor]")}async function st(t){const e=x();if(!e){p("编辑器未正确加载，请刷新页面后重试。","error");return}const a=e.querySelector("[data-article-title]"),o=e.querySelector("[data-article-slug]"),n=e.querySelector("[data-article-category]"),i=e.querySelector("[data-article-tags]"),s=e.querySelector("[data-article-summary]"),r=e.querySelector("[data-article-cover]"),l=e.querySelector("[data-md-source]"),u=a?.value.trim()??"",c=o?.value.trim()??"",d=we(c),h=n?.value.trim()||"手记",f=mt[h],v=l?.value??"",g=[];if(!u&&a&&g.push({label:"标题",message:"标题不能为空。",element:a}),!c&&o&&g.push({label:"Slug",message:"Slug 不能为空。",element:o}),!L&&f&&c===`${f}-`&&o?g.push({label:"Slug",message:`请在 ${f}- 后填写 Slug 内容。`,element:o}):c&&!d&&o&&g.push({label:"Slug",message:"Slug 格式无效，仅支持英文字母、数字和连字符。",element:o}),!v.trim()&&l&&g.push({label:"正文",message:"正文不能为空。",element:l}),g.length>0){const w=g.length===1?g[0].message:`${g.map(M=>M.label).join("、")}不能为空。`;b(w,"error"),p(w,"error"),g.forEach(({element:M})=>{M.setAttribute("aria-invalid","true"),M.classList.remove("validation-pulse"),M.offsetWidth,M.classList.add("validation-pulse")});const A=g[0].element,D=window.scrollY+A.getBoundingClientRect().top-Math.max(96,window.innerHeight*.2);window.scrollTo({top:Math.max(0,D),behavior:N?"auto":"smooth"});return}b(t==="published"?"正在发布...":"正在保存草稿..."),p(t==="published"?"正在发布文章...":"正在保存草稿..."),ct(!0);try{const w=await fetch(L?`/api/admin/articles/${L}`:"/api/admin/articles",{method:L?"PUT":"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({title:u,slug:d,category:h,tags:$e(i?.value??""),summary:s?.value.trim()??"",coverImage:r?.value.trim()??"",markdown:v,status:t})});if(!w.ok)throw new Error("Save failed");const A=await w.json();L=A.article.id,o.value=A.article.slug,b(t==="published"?"文章已发布。":"草稿已保存。"),p(t==="published"?"文章已发布。":"草稿已保存。"),await I(),t==="published"&&await E(),t==="published"&&Z()}catch{b("保存失败。Slug 可能已存在，或登录状态已过期。","error"),p("保存失败。Slug 可能已存在，或登录状态已过期。","error")}finally{ct(!1)}}async function ee(t){const e=document.querySelector("[data-compress-upload]")?.checked??!1;b("正在上传图片..."),p(e?"正在处理并上传图片...":"正在上传图片..."),lt(!0);try{const a=e?await ae(t):t;if(a.size>5*1024*1024)throw new Error("File too large");const o=new FormData;o.append("file",a),o.append("originalName",t.name);const n=await fetch("/api/admin/uploads",{method:"POST",credentials:"include",body:o});if(!n.ok)throw new Error("Upload failed");const i=await n.json();if(!i.upload?.path)throw new Error("Upload path missing");await F();const r=a!==t?`${k(t.size)} → ${k(a.size)}`:k(a.size),l=i.reused?"图片已存在，已复用媒体库文件。":`图片已上传到媒体库（${r}）。`;b(l),p(l)}catch{b("图片上传失败，请确认已登录且文件小于 5MB。","error"),p("图片上传失败，请确认已登录且文件小于 5MB。","error")}finally{lt(!1)}}async function ae(t){if(t.type==="image/webp")return t;if(t.type!=="image/jpeg"&&t.type!=="image/png")return p("此格式不进行有损转换，将保留原文件上传。"),t;try{const e=await createImageBitmap(t),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const o=a.getContext("2d");if(!o)throw e.close(),new Error("Canvas unavailable");try{o.drawImage(e,0,0,e.width,e.height)}finally{e.close()}const n=await new Promise(s=>a.toBlob(s,"image/webp",.82));if(a.width=0,a.height=0,!n||n.size>=t.size)return p("WebP 未减少文件大小，将保留原文件上传。"),t;const i=t.name.replace(/\.[^.]+$/,"")||"image";return new File([n],`${i}.webp`,{type:"image/webp",lastModified:t.lastModified})}catch{return p("浏览器无法压缩这张图片，将保留原文件上传。","error"),t}}async function ne(t){try{const e=await fetch("/api/admin/articles",{credentials:"include"});if(!e.ok)throw new Error("Failed to load articles");const o=(await e.json()).articles?.find(n=>n.id===t);if(!o)throw new Error("Article not found");ie(o),j("editor"),p("已载入文章。")}catch{p("载入文章失败。","error")}}async function oe(t){if(window.confirm("确定删除这篇文章？此操作不可恢复。"))try{if(!(await fetch(`/api/admin/articles/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete failed");L===t&&Z(),await I(),await E(),p("文章已删除。")}catch{p("删除失败。","error")}}async function rt(t,e){try{if(!(await fetch(`/api/admin/articles/${t}/move`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({direction:e})})).ok)throw new Error("Move failed");await I(),await E(),p(e==="up"?"已上移。":"已下移。")}catch{p("调整顺序失败。","error")}}function ie(t){const e=x();if(!e){p("编辑器未正确加载，请刷新页面后重试。","error");return}L=t.id,e.querySelector("[data-article-title]").value=t.title,e.querySelector("[data-article-slug]").value=t.slug;const a=e.querySelector("[data-article-category]");[...a.options].some(n=>n.value===t.category)||a.add(new Option(t.category,t.category)),a.value=t.category,e.querySelector("[data-article-tags]").value=(t.tags??[]).join(", "),e.querySelector("[data-article-summary]").value=t.summary,e.querySelector("[data-article-cover]").value=t.coverImage??"",e.querySelector("[data-md-source]").value=t.markdown;const o=e.querySelector("[data-editor-state]");o&&(o.textContent=`当前：编辑 #${t.id} · ${t.status==="published"?"已发布":"草稿"}`),P(t.markdown)}function j(t){document.querySelectorAll("[data-admin-section]").forEach(e=>{e.hidden=e.dataset.adminSection!==t}),document.querySelectorAll("[data-admin-tab]").forEach(e=>{e.classList.toggle("is-active",e.dataset.adminTab===t)}),t==="system"?(K(),Kt()):Q()}function se(t){const e=x()?.querySelector("[data-article-cover]");!e||!t||(e.value=t,p("已设为封面图。"))}function re(t,e="image"){const a=x()?.querySelector("[data-md-source]");!a||!t||(a.value=`${a.value.trim()}

![${e}](${t})`.trim(),P(a.value),p("已插入正文。"))}async function ce(t){if(window.confirm("确定删除这张图片？使用它的文章会显示图片不存在占位图。"))try{if(!(await fetch(`/api/admin/uploads/${t}`,{method:"DELETE",credentials:"include"})).ok)throw new Error("Delete upload failed");await F(),p("图片已删除。")}catch{p("图片删除失败。","error")}}function ct(t){document.querySelectorAll("[data-save-draft], [data-publish-article]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function lt(t){document.querySelectorAll("[data-upload-button]").forEach(e=>{e.disabled=t,e.classList.toggle("is-busy",t)})}function Z(){L=null;const t=x();t?.querySelectorAll("[data-article-title], [data-article-slug], [data-article-tags], [data-article-summary], [data-article-cover], [data-md-source]").forEach(n=>{n.value="",n.removeAttribute("aria-invalid"),n.classList.remove("validation-pulse")});const e=t?.querySelector("[data-article-category]");e&&(e.value="手记");const a=t?.querySelector("[data-article-slug]");a&&(a.value="notes-");const o=t?.querySelector("[data-editor-state]");o&&(o.textContent="当前：新建文章"),P("")}function le(t){const e=t.target;if(!(e instanceof Element))return;const a=e.closest("[data-admin-tab]");if(a){t.preventDefault();const d=a.dataset.adminTab;(d==="articles"||d==="editor"||d==="media"||d==="system")&&j(d);return}if(e.closest("[data-system-refresh]")){t.preventDefault(),K();return}if(e.closest("[data-new-article]")){t.preventDefault(),Z(),j("editor"),p("已切换为新建文章。");return}if(e.closest("[data-login-button]")){t.preventDefault(),_t();return}if(e.closest("[data-logout-button]")){t.preventDefault(),Gt();return}if(e.closest("[data-save-draft]")){t.preventDefault(),st("draft");return}if(e.closest("[data-publish-article]")){t.preventDefault(),st("published");return}if(e.closest("[data-open-media]")){t.preventDefault(),j("media"),p("请在媒体库上传图片，再选择设为封面或插入正文。");return}if(e.closest("[data-upload-button]")){t.preventDefault(),document.querySelector("[data-upload-file]")?.click();return}const o=e.closest("[data-md-tool]");if(o){t.preventDefault(),ye(o.dataset.mdTool??"");return}const n=e.closest("[data-article-action]");if(n){t.preventDefault();const d=Number(n.dataset.articleId),h=n.dataset.articleAction;if(h==="view"){const v=n.closest("[data-ledger-article-slug]")?.dataset.ledgerArticleSlug;v&&ut(`/articles/${encodeURIComponent(v)}`);return}h==="edit"&&ne(d),h==="delete"&&oe(d),h==="up"&&rt(d,"up"),h==="down"&&rt(d,"down");return}const i=e.closest("[data-media-cover]");if(i){t.preventDefault(),se(i.dataset.mediaCover??"");return}const s=e.closest("[data-media-insert]");if(s){t.preventDefault(),re(s.dataset.mediaInsert??"",s.dataset.mediaName??"image");return}const r=e.closest("[data-media-delete]");if(r){t.preventDefault(),ce(Number(r.dataset.mediaDelete));return}const l=e.closest("a[data-route]");if(l){t.preventDefault(),ut(l.pathname);return}const u=e.closest('a[href^="#"]');if(u){t.preventDefault(),J(u);const d=u.getAttribute("href")?.slice(1);d&&document.getElementById(d)?.scrollIntoView({behavior:N?"auto":"smooth"});return}const c=e.closest("[data-static-action]");c&&J(c)}function de(t){if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;e instanceof HTMLElement&&e.matches("[data-static-action]")&&(t.preventDefault(),J(e))}function ue(t){const e=t.target;if((e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&e.matches("[data-article-title], [data-article-slug], [data-md-source]")&&(e.removeAttribute("aria-invalid"),e.classList.remove("validation-pulse")),e instanceof HTMLInputElement&&e.matches("[data-article-search]")){I();return}if(e instanceof HTMLInputElement&&e.matches("[data-media-search]")){pt=e.value.trim(),X();return}!(e instanceof HTMLTextAreaElement)||!e.matches("[data-md-source]")||P(e.value)}function me(t){const e=t.target;if(e instanceof HTMLSelectElement&&e.matches("[data-code-language]")){e.value&&be(e.value),e.value="";return}if(e instanceof HTMLSelectElement&&e.matches("[data-article-category]")){pe(e.value);return}if(e instanceof HTMLSelectElement&&e.matches("[data-media-sort]")){q=e.value,X();return}if(!(e instanceof HTMLInputElement)||!e.matches("[data-upload-file]"))return;const a=e.files?.[0];a&&(ee(a),e.value="")}function pe(t){const e=x()?.querySelector("[data-article-slug]"),a=mt[t];if(!e||!a)return;const o=e.value.trim(),n=V.map(s=>`${s.slugPrefix}-`).find(s=>o.startsWith(s)),i=n?o.slice(n.length):o;e.value=`${a}-${i}`,e.removeAttribute("aria-invalid"),e.classList.remove("validation-pulse")}function fe(t){const e=t.target;e instanceof HTMLElement&&(!e.matches("[data-md-source]")&&!e.closest("[data-md-toolbar]")||document.querySelector(".editor-panel")?.classList.add("has-md-focus"))}function he(){window.setTimeout(()=>{const t=document.activeElement,e=document.querySelector(".editor-panel");!e||t instanceof HTMLElement&&(t.matches("[data-md-source]")||t.closest("[data-md-toolbar]"))||e.classList.remove("has-md-focus")},80)}function ge(t){const e=t.target;e instanceof HTMLImageElement&&e.dataset.missingImage!=="true"&&(!e.currentSrc.includes("/api/uploads/")&&!e.src.includes("/api/uploads/")||(e.dataset.missingImage="true",e.alt="图片不存在",e.src=ke()))}function P(t){const e=document.querySelector("[data-md-preview]");e&&(e.innerHTML=wt(t)||"输入 Markdown 后这里会显示预览。",bt(e,t))}async function bt(t,e){const a=t.querySelectorAll("pre code");if(!a.length)return;const o=ve(e);a.forEach((i,s)=>{[...i.classList].some(r=>r.startsWith("language-"))||i.classList.add(`language-${o[s]??"plaintext"}`)});const{highlightCodeBlocks:n}=await Lt(async()=>{const{highlightCodeBlocks:i}=await import("./syntax-highlight-D1YpSocS.js");return{highlightCodeBlocks:i}},__vite__mapDeps([0,1]));t.isConnected&&n(t)}function ve(t){const e=[];let a=!1;for(const o of t.split(`
`)){const n=o.trim().match(/^```([^\s`]*)\s*$/);n&&(a||e.push(tt(n[1])),a=!a)}return e}function ye(t){const e=x()?.querySelector("[data-md-source]");if(!e)return;const a=e.selectionStart,o=e.selectionEnd,n=e.value.slice(a,o),i=n||"文本";let s="",r=a,l=a;if(t==="h1"||t==="h2"||t==="h3"){const u=Number(t.slice(1));s=`${"#".repeat(u)} ${i}`,r=a+u+1,l=r+i.length}else if(t==="bold")s=`**${i}**`,r=a+2,l=r+i.length;else if(t==="italic")s=`*${i}*`,r=a+1,l=r+i.length;else if(t==="quote")s=n?n.split(`
`).map(u=>`> ${u}`).join(`
`):"> 引用内容",r=a+2,l=a+s.length;else if(t==="ul")s=n?n.split(`
`).map(u=>`- ${u}`).join(`
`):"- 列表项",r=a+2,l=a+s.length;else if(t==="ol")s=n?n.split(`
`).map((u,c)=>`${c+1}. ${u}`).join(`
`):"1. 列表项",r=a+3,l=a+s.length;else if(t==="inline-code")s=`\`${i}\``,r=a+1,l=r+i.length;else if(t==="link")s=`[${i}](https://)`,r=a+i.length+3,l=r+8;else return;e.setRangeText(s,a,o,"end"),e.focus(),e.setSelectionRange(r,l),P(e.value)}function be(t){const e=x()?.querySelector("[data-md-source]");if(!e)return;const a=e.selectionStart,o=e.selectionEnd,n=e.value.slice(a,o)||"代码",i=`
\`\`\`${tt(t)}
`,s=`${i}${n}
\`\`\`
`;e.setRangeText(s,a,o,"end"),e.focus(),e.setSelectionRange(a+i.length,a+i.length+n.length),P(e.value)}function wt(t){const o=m(t.trim()).replace(/&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,(d,h)=>`<iframe class="embed-preview" src="https:${h}" loading="lazy" allowfullscreen></iframe>`).split(`
`),n=[];let i=[],s=null,r=null,l="";const u=()=>{i.length&&(n.push(`<p>${i.map(B).join("<br />")}</p>`),i=[])},c=()=>{s&&(n.push(`<${s.type}>${s.items.map(d=>`<li>${B(d)}</li>`).join("")}</${s.type}>`),s=null)};for(const d of o){const h=d.trim().match(/^```([^\s`]*)\s*$/);if(h){r?(n.push(dt(r,l)),r=null,l=""):(u(),c(),r=[],l=tt(h[1]));continue}if(r){r.push(d);continue}const f=d.trim();if(!f){u(),c();continue}if(f.startsWith("<iframe ")){u(),c(),n.push(f);continue}const v=f.match(/^!\[(.*?)\]\((.*?)\)$/);if(v){u(),c(),n.push(`<img src="${v[2]}" alt="${v[1]}" loading="lazy" />`);continue}const g=f.match(/^(#{1,6})\s+(.+)$/);if(g){u(),c(),n.push(`<h${g[1].length}>${B(g[2])}</h${g[1].length}>`);continue}const w=f.match(/^(?:>|&gt;)\s+(.+)$/);if(w){u(),c(),n.push(`<blockquote>${B(w[1])}</blockquote>`);continue}const A=f.match(/^[-*]\s+(.+)$/);if(A){u(),(!s||s.type!=="ul")&&(c(),s={type:"ul",items:[]}),s.items.push(A[1]);continue}const D=f.match(/^\d+\.\s+(.+)$/);if(D){u(),(!s||s.type!=="ol")&&(c(),s={type:"ol",items:[]}),s.items.push(D[1]);continue}c(),i.push(f)}return u(),c(),r&&n.push(dt(r,l)),n.join("")}function dt(t,e){return`<pre><code class="language-${e}">${t.join(`
`)}</code></pre>`}function tt(t){const e=t.trim().toLowerCase(),a=xt[e]??e;return At.has(a)?a:"plaintext"}function B(t){return t.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(e,a,o)=>`<a href="${o.startsWith("http://")||o.startsWith("https://")||o.startsWith("/")?o:`#${o}`}" target="_blank" rel="noreferrer">${a}</a>`)}function ut(t){history.pushState({},"",t),ht?.classList.remove("is-open"),G?.classList.remove("is-open"),Y(),window.scrollTo({top:0,behavior:N?"auto":"smooth"})}function we(t){return t.trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)}function $e(t){return Array.from(new Set(t.split(",").map(e=>e.trim()).filter(Boolean))).slice(0,12)}function et(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?String(t).slice(0,10):e.toISOString().slice(0,10)}function Se(t){const e=new Date(t);return Number.isNaN(e.getTime())?String(t):new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function k(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/1024/1024).toFixed(1)} MB`}function Le(t){const e=Math.floor(t/86400),a=Math.floor(t%86400/3600),o=Math.floor(t%3600/60);return e>0?`${e}天 ${a}小时`:a>0?`${a}小时 ${o}分钟`:`${o}分钟`}function ke(){return`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#fff7fb"/><rect x="24" y="24" width="912" height="492" rx="18" fill="#ffffff" stroke="#ff78ac" stroke-opacity=".35" stroke-width="2"/><path d="M408 288l48-58 42 50 30-36 72 86H360l48-42z" fill="#ffd8e8"/><circle cx="586" cy="202" r="24" fill="#ff78ac" fill-opacity=".55"/><text x="480" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#7d8493">Image missing</text></svg>')}`}function xe(t){return t.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()}function m(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function J(t){t.classList.remove("is-clicked"),t.offsetWidth,t.classList.add("is-clicked"),window.setTimeout(()=>t.classList.remove("is-clicked"),220)}function p(t,e="info"){const a=document.querySelector("[data-toast-root]");if(!a)return;const o=document.createElement("div");o.className=`toast ${e==="error"?"error":""}`.trim(),o.textContent=t,a.append(o),requestAnimationFrame(()=>o.classList.add("is-visible")),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),220)},2600)}function Ae(){S&&(S.hidden=!1,requestAnimationFrame(()=>{S.classList.add("is-open"),S.querySelector("input")?.focus()}))}function at(){S&&(S.classList.remove("is-open"),window.setTimeout(()=>{S.hidden=!0},180))}function Te(){fetch("https://v1.hitokoto.cn/?c=a").then(t=>t.json()).then(t=>{const e=document.querySelector("[data-hitokoto]");e&&t.hitokoto&&(e.textContent=t.hitokoto)}).catch(()=>{})}function Ee(){const t=document.querySelector("[data-api-status]");t&&fetch("/api/health").then(e=>e.json()).then(e=>{t.textContent=e.ok&&e.service==="uzuki-backend"?"API: online":"API: unavailable"}).catch(()=>{t.textContent="API: not deployed"})}function Me(){const t=document.querySelector("[data-mouse-trail]"),e=t?.getContext("2d");if(!t||!e)return;const a=[],o=24,n=520;let i=0,s=0;const r=()=>{const c=window.devicePixelRatio||1;t.width=Math.floor(window.innerWidth*c),t.height=Math.floor(window.innerHeight*c),t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`,e.setTransform(c,0,0,c,0,0)},l=c=>{e.clearRect(0,0,window.innerWidth,window.innerHeight);for(let d=a.length-1;d>=0;d--){const h=a[d],f=c-h.age;if(f>n){a.splice(d,1);continue}const v=f/n,g=(1-v)*.72,w=9-v*6;e.beginPath(),e.fillStyle=`rgba(255, 120, 172, ${g})`,e.shadowColor="rgba(255, 120, 172, 0.34)",e.shadowBlur=12,e.arc(h.x,h.y,w,0,Math.PI*2),e.fill()}e.shadowBlur=0,a.length>0||c-s<900?i=requestAnimationFrame(l):i=0},u=()=>{i===0&&(i=requestAnimationFrame(l))};window.addEventListener("resize",r),window.addEventListener("pointermove",c=>{c.pointerType!=="touch"&&(s=performance.now(),a.push({x:c.clientX,y:c.clientY,age:s}),a.length>o&&a.shift(),u())},{passive:!0}),r()}function qe(){if(!R)return;let t=0;const e=()=>{t+=.012,R.style.setProperty("--pet-y",`${Math.sin(t)*10}px`),requestAnimationFrame(e)};e()}function Ce(){const t=document.querySelector("[data-wave]");if(!t)return;const e=t.getContext("2d");if(!e)return;const a=(o=0)=>{if(!document.body.contains(t))return;const n=t.clientWidth,i=t.clientHeight,s=window.devicePixelRatio||1;t.width=Math.floor(n*s),t.height=Math.floor(i*s),e.setTransform(s,0,0,s,0,0),e.clearRect(0,0,n,i),e.fillStyle="rgba(255, 255, 255, 0.96)",e.beginPath(),e.moveTo(0,i);for(let r=0;r<=n;r+=8){const l=44+Math.sin(r*.014+o*.0018)*9+Math.sin(r*.028+o*.001)*5;e.lineTo(r,l)}e.lineTo(n,i),e.closePath(),e.fill(),requestAnimationFrame(a)};a()}function Ie(){const e=()=>{if(document.querySelectorAll(".sakura").length>=22)return;const a=document.createElement("span"),o=8+Math.random()*10;a.className="sakura",a.style.left=`${Math.random()*100}vw`,a.style.width=`${o}px`,a.style.height=`${o}px`,a.style.animationDuration=`${7+Math.random()*7}s`,a.style.animationDelay=`${Math.random()*1.8}s`,document.body.append(a),window.setTimeout(()=>a.remove(),15e3)};window.setInterval(e,650)}
