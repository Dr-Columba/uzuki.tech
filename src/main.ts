import "./styles.css";

type Post = {
  id?: number;
  slug?: string;
  title: string;
  category: string;
  date: string;
  views: string;
  comments: number;
  excerpt: string;
  image?: string;
  featured?: boolean;
  html?: string;
};

type ApiArticle = {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  coverImage: string | null;
  markdown: string;
  html: string;
  status: "draft" | "published";
  createdAt: string | number;
  updatedAt: string | number;
  publishedAt: string | number | null;
};

type ApiUser = {
  id: number;
  username: string;
  role: "administrator" | "user";
};

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "首页", path: "/" },
  { label: "公告", path: "/announcements" },
  { label: "手记", path: "/notes" },
  { label: "ACG", path: "/acg" },
  { label: "资源", path: "/resources" },
  { label: "相册", path: "/gallery" },
  { label: "留言", path: "/guestbook" },
];

const placeholderPages: Record<string, { title: string; eyebrow: string; description: string }> = {
  "/announcements": {
    title: "公告",
    eyebrow: "Announcements",
    description: "这里预留站点公告、更新日志和重要说明。后续会接入文章分类数据。",
  },
  "/notes": {
    title: "手记",
    eyebrow: "Notes",
    description: "这里预留个人日常、技术札记和迁移记录。",
  },
  "/acg": {
    title: "ACG",
    eyebrow: "Collections",
    description: "这里预留 ACG 相关收藏、感想和条目索引。",
  },
  "/resources": {
    title: "资源",
    eyebrow: "Resources",
    description: "这里预留资源索引。后续可加入权限、下载说明和访问统计。",
  },
  "/gallery": {
    title: "相册",
    eyebrow: "Gallery",
    description: "这里预留图片相册和媒体归档。上传文件会由后端统一管理。",
  },
  "/guestbook": {
    title: "留言",
    eyebrow: "Guestbook",
    description: "这里预留留言和评论聚合入口。后续可接入用户登录和 emoji 评论。",
  },
};

const fallbackPosts: Post[] = [
  {
    title: "迁移记录：从 WordPress 到新的卯月科技",
    category: "公告",
    date: "2026-06-22",
    views: "1.2k",
    comments: 12,
    excerpt: "前端先独立出来，保留原主题的轻盈二次元博客风格，后续再逐步接入文章、评论和后台。",
    image: "/assets/images/post-1.jpg",
    featured: true,
  },
  {
    title: "夏日车站、晚风与待整理的灵感",
    category: "手记",
    date: "2026-06-19",
    views: "864",
    comments: 8,
    excerpt: "把旧站里的图片、文章和分类慢慢归档，新的首页先作为个人入口和内容索引使用。",
    image: "/assets/images/post-3.jpg",
  },
  {
    title: "前端栈选择：Vite、TypeScript 与静态优先",
    category: "技术",
    date: "2026-06-16",
    views: "932",
    comments: 4,
    excerpt: "服务器配置一般时，尽量把首屏和交互交给浏览器静态资源，后端只负责必要的数据接口。",
    image: "/assets/images/post-4.jpg",
  },
  {
    title: "关于博客 UI 动效的边界",
    category: "设计",
    date: "2026-06-12",
    views: "706",
    comments: 6,
    excerpt: "樱花、鼠标轨迹和桌宠都可以有，但需要低消耗，并尊重系统的减少动态效果设置。",
    image: "/assets/images/post-2.jpg",
  },
];

const tags = ["Vite", "TypeScript", "Bun", "Hono", "SQLite", "ACG", "前端", "迁移"];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app root");
}

app.innerHTML = `
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="/" aria-label="卯月科技首页" data-route>
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${navItems.map((item) => `<a href="${item.path}" data-route>${item.label}</a>`).join("")}
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
  <button class="backtop" type="button" aria-label="回到顶部" data-backtop>
    <img src="/assets/images/backtop.gif" alt="" />
  </button>
  <button class="pet" type="button" aria-label="隐藏桌宠" title="隐藏桌宠" data-pet>
    <img src="/assets/images/pet.gif" alt="" />
  </button>
`;

const pageRoot = document.querySelector<HTMLElement>("#page-root");
const header = document.querySelector<HTMLElement>("[data-header]");
const menuButton = document.querySelector<HTMLButtonElement>("[data-menu-button]");
const navLinks = document.querySelector<HTMLElement>("[data-nav-links]");
const searchModal = document.querySelector<HTMLElement>("[data-search-modal]");
const searchOpen = document.querySelector<HTMLButtonElement>("[data-search-open]");
const searchClose = document.querySelector<HTMLButtonElement>("[data-search-close]");
const backtop = document.querySelector<HTMLButtonElement>("[data-backtop]");
const pet = document.querySelector<HTMLButtonElement>("[data-pet]");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

renderRoute();

window.addEventListener("popstate", renderRoute);
window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
  backtop?.classList.toggle("is-visible", window.scrollY > 420);
});

menuButton?.addEventListener("click", () => {
  navLinks?.classList.toggle("is-open");
  menuButton.classList.toggle("is-open");
});

searchOpen?.addEventListener("click", () => openSearch());
searchClose?.addEventListener("click", () => closeSearch());
searchModal?.addEventListener("click", (event) => {
  if (event.target === searchModal) closeSearch();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSearch();
});

backtop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
pet?.addEventListener("click", () => pet.classList.add("is-hidden"));
document.addEventListener("click", handleInteractiveClick);
document.addEventListener("keydown", handleInteractiveKeydown);
document.addEventListener("input", handleAdminPreview);
document.addEventListener("change", handleAdminUploadChange);

if (!reducedMotion) {
  installMouseTrail();
  installPetDrift();
  installSakura();
}

function renderRoute(): void {
  if (!pageRoot) return;
  const path = window.location.pathname;
  setActiveNav(path);

  if (path === "/admin") {
    pageRoot.innerHTML = renderAdminPage();
    checkApiStatus();
    checkAdminSession();
    return;
  }

  if (path.startsWith("/articles/")) {
    pageRoot.innerHTML = renderArticleLoading();
    loadArticle(decodeURIComponent(path.replace("/articles/", "")));
    return;
  }

  if (path !== "/" && placeholderPages[path]) {
    pageRoot.innerHTML = renderPlaceholderPage(placeholderPages[path]);
    return;
  }

  pageRoot.innerHTML = renderHomePage();
  installWave();
  fetchHitokoto();
  loadPublishedArticles();
}

function setActiveNav(path: string): void {
  document.querySelectorAll<HTMLAnchorElement>("[data-route]").forEach((link) => {
    const isActive = link.pathname === path || (path === "/" && link.pathname === "/");
    link.classList.toggle("is-active", isActive);
  });
}

function renderHomePage(): string {
  return `
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
        ${fallbackPosts.map(renderPost).join("")}
        ${renderPagination()}
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
            ${tags.map((tag) => `<a href="#" data-static-action>${tag}</a>`).join("")}
          </div>
        </section>
      </aside>
    </section>
  `;
}

function renderPlaceholderPage(page: { title: string; eyebrow: string; description: string }): string {
  return `
    <section class="subpage-hero">
      <div>
        <span>${page.eyebrow}</span>
        <h1>${page.title}</h1>
        <p>${page.description}</p>
      </div>
    </section>
    <section class="empty-state">
      <h2>内容准备中</h2>
      <p>这个页面已经预留路由、导航和基础样式，后续接入后端文章分类后会自动填充内容。</p>
    </section>
  `;
}

function renderAdminPage(): string {
  return `
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
  `;
}

function renderPost(post: Post): string {
  const className = post.featured ? "post-card featured" : "post-card";
  const href = post.slug ? `/articles/${encodeURIComponent(post.slug)}` : "#";
  const routeAttr = post.slug ? "data-route" : "";
  return `
    <article class="${className}" role="button" tabindex="0" data-static-action>
      ${
        post.image
          ? `<a class="post-image" href="${href}" ${routeAttr}><img src="${escapeHtml(post.image)}" alt="" loading="lazy" width="1024" height="659" /></a>`
          : ""
      }
      <div class="post-body">
        <a class="category" href="#" data-static-action>${escapeHtml(post.category)}</a>
        <h2><a href="${href}" ${routeAttr}>${escapeHtml(post.title)}</a></h2>
        <p>${escapeHtml(post.excerpt)}</p>
        <div class="post-meta">
          <span>${escapeHtml(post.date)}</span>
          <span>${post.views} views</span>
          <span>${post.comments} comments</span>
        </div>
      </div>
    </article>
  `;
}

function renderPagination(): string {
  return `
    <nav class="pagination" aria-label="分页">
      <a class="active" href="#">1</a><a href="#">2</a><a href="#">3</a><span>...</span><a href="#">尾页</a>
    </nav>
  `;
}

function renderArticleLoading(): string {
  return `
    <section class="article-shell">
      <p class="eyebrow">Article</p>
      <h1>文章读取中</h1>
      <p class="article-meta">正在从后端获取内容...</p>
    </section>
  `;
}

function renderArticle(article: ApiArticle): string {
  return `
    <article class="article-shell">
      <a class="article-back" href="/" data-route>返回首页</a>
      ${article.coverImage ? `<img class="article-cover" src="${escapeHtml(article.coverImage)}" alt="" />` : ""}
      <p class="eyebrow">${escapeHtml(article.category)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="article-meta">${formatDate(article.publishedAt ?? article.updatedAt)}</p>
      <div class="article-content">${article.html || renderMarkdownPreview(article.markdown)}</div>
    </article>
  `;
}

async function loadPublishedArticles(): Promise<void> {
  const column = document.querySelector<HTMLElement>("[data-post-column]");
  if (!column) return;

  try {
    const response = await fetch("/api/articles");
    if (!response.ok) throw new Error("Failed to load articles");
    const data = (await response.json()) as { articles?: ApiArticle[] };
    if (!data.articles?.length) return;
    const posts = data.articles.map((article, index) => apiArticleToPost(article, index === 0));
    column.innerHTML = `${posts.map(renderPost).join("")}${renderPagination()}`;
  } catch {
    // Keep static fallback posts when the backend is not available.
  }
}

async function loadArticle(slug: string): Promise<void> {
  if (!pageRoot) return;
  try {
    const response = await fetch(`/api/articles/${encodeURIComponent(slug)}`);
    if (!response.ok) throw new Error("Not found");
    const data = (await response.json()) as { article?: ApiArticle };
    if (!data.article) throw new Error("Not found");
    pageRoot.innerHTML = renderArticle(data.article);
  } catch {
    pageRoot.innerHTML = `
      <section class="empty-state article-empty">
        <h2>文章不存在或尚未发布</h2>
        <p>请确认链接是否正确，草稿文章不会出现在公开页面。</p>
        <p><a href="/" data-route>返回首页</a></p>
      </section>
    `;
  }
}

function apiArticleToPost(article: ApiArticle, featured = false): Post {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category,
    date: formatDate(article.publishedAt ?? article.updatedAt),
    views: "0",
    comments: 0,
    excerpt: article.summary || stripHtml(article.html).slice(0, 96),
    image: article.coverImage || "/assets/images/post-1.jpg",
    featured,
    html: article.html,
  };
}

async function checkAdminSession(): Promise<void> {
  try {
    const response = await fetch("/api/admin/me", { credentials: "include" });
    if (!response.ok) throw new Error("Session unavailable");
    const data = (await response.json()) as { user?: ApiUser | null };
    if (data.user?.role === "administrator") {
      setAdminAuthenticated(data.user);
      await loadAdminArticles();
      return;
    }
  } catch {
    // The login form remains visible when there is no active session.
  }
  setAdminMessage("请输入 administrator 密码登录。");
}

async function loginAdmin(): Promise<void> {
  const username = document.querySelector<HTMLInputElement>("[data-login-username]")?.value.trim() ?? "";
  const password = document.querySelector<HTMLInputElement>("[data-login-password]")?.value ?? "";
  setAdminMessage("正在登录...");

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("登录失败");
    const data = (await response.json()) as { user: ApiUser };
    setAdminAuthenticated(data.user);
    await loadAdminArticles();
  } catch {
    setAdminMessage("登录失败，请检查密码。", "error");
  }
}

async function logoutAdmin(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
  document.querySelector<HTMLFormElement>("[data-admin-login]")?.removeAttribute("hidden");
  document.querySelectorAll<HTMLElement>("[data-admin-content]").forEach((element) => {
    element.hidden = true;
  });
  setAdminMessage("已退出登录。");
}

function setAdminAuthenticated(user: ApiUser): void {
  document.querySelector<HTMLFormElement>("[data-admin-login]")?.setAttribute("hidden", "true");
  document.querySelectorAll<HTMLElement>("[data-admin-content]").forEach((element) => {
    element.hidden = false;
  });
  setAdminMessage(`已登录：${user.username}`);
}

function setAdminMessage(message: string, type: "info" | "error" = "info"): void {
  const target = document.querySelector<HTMLElement>("[data-admin-message]");
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("error", type === "error");
}

async function loadAdminArticles(): Promise<void> {
  const target = document.querySelector<HTMLElement>("[data-admin-article-list]");
  if (!target) return;
  target.textContent = "正在读取...";

  try {
    const response = await fetch("/api/admin/articles", { credentials: "include" });
    if (!response.ok) throw new Error("Failed to load admin articles");
    const data = (await response.json()) as { articles?: ApiArticle[] };
    const articles = data.articles ?? [];
    target.innerHTML = articles.length
      ? articles
          .map(
            (article) => `
              <button type="button" class="admin-list-item" data-static-action>
                <span>${escapeHtml(article.title)}</span>
                <small>${article.status === "published" ? "已发布" : "草稿"} · ${formatDate(article.updatedAt)}</small>
              </button>
            `,
          )
          .join("")
      : `<p>还没有文章。可以先在右侧编辑器保存一篇草稿或发布一篇文章。</p>`;
  } catch {
    target.innerHTML = `<p>文章列表读取失败，请确认后端已启动并已登录。</p>`;
  }
}

async function saveArticle(status: "draft" | "published"): Promise<void> {
  const titleInput = document.querySelector<HTMLInputElement>("[data-article-title]");
  const slugInput = document.querySelector<HTMLInputElement>("[data-article-slug]");
  const categoryInput = document.querySelector<HTMLInputElement>("[data-article-category]");
  const summaryInput = document.querySelector<HTMLTextAreaElement>("[data-article-summary]");
  const coverInput = document.querySelector<HTMLInputElement>("[data-article-cover]");
  const markdownInput = document.querySelector<HTMLTextAreaElement>("[data-md-source]");

  const title = titleInput?.value.trim() ?? "";
  const slug = normalizeSlug(slugInput?.value || title);
  const category = categoryInput?.value.trim() || "手记";
  const markdown = markdownInput?.value ?? "";

  if (!title || !slug || !markdown.trim()) {
    setAdminMessage("标题、Slug 和正文不能为空。", "error");
    return;
  }

  setAdminMessage(status === "published" ? "正在发布..." : "正在保存草稿...");

  try {
    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        slug,
        category,
        summary: summaryInput?.value.trim() ?? "",
        coverImage: coverInput?.value.trim() ?? "",
        markdown,
        status,
      }),
    });
    if (!response.ok) throw new Error("Save failed");
    const data = (await response.json()) as { article: ApiArticle };
    slugInput!.value = data.article.slug;
    setAdminMessage(status === "published" ? "文章已发布。" : "草稿已保存。");
    await loadAdminArticles();
    if (status === "published") await loadPublishedArticles();
  } catch {
    setAdminMessage("保存失败。Slug 可能已存在，或登录状态已过期。", "error");
  }
}

async function uploadAdminImage(file: File): Promise<void> {
  setAdminMessage("正在上传图片...");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    const data = (await response.json()) as { upload?: { path: string } };
    const path = data.upload?.path;
    if (!path) throw new Error("Upload path missing");
    const coverInput = document.querySelector<HTMLInputElement>("[data-article-cover]");
    const markdownInput = document.querySelector<HTMLTextAreaElement>("[data-md-source]");
    if (coverInput && !coverInput.value) coverInput.value = path;
    if (markdownInput) {
      markdownInput.value = `${markdownInput.value.trim()}\n\n![${file.name}](${path})`.trim();
      updateMarkdownPreview(markdownInput.value);
    }
    setAdminMessage("图片已上传，并已插入正文。");
  } catch {
    setAdminMessage("图片上传失败，请确认已登录且文件小于 5MB。", "error");
  }
}

function handleInteractiveClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("[data-login-button]")) {
    event.preventDefault();
    void loginAdmin();
    return;
  }

  if (target.closest("[data-logout-button]")) {
    event.preventDefault();
    void logoutAdmin();
    return;
  }

  if (target.closest("[data-save-draft]")) {
    event.preventDefault();
    void saveArticle("draft");
    return;
  }

  if (target.closest("[data-publish-article]")) {
    event.preventDefault();
    void saveArticle("published");
    return;
  }

  if (target.closest("[data-upload-button]")) {
    event.preventDefault();
    document.querySelector<HTMLInputElement>("[data-upload-file]")?.click();
    return;
  }

  const routeLink = target.closest<HTMLAnchorElement>("a[data-route]");
  if (routeLink) {
    event.preventDefault();
    navigate(routeLink.pathname);
    return;
  }

  const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (link) {
    event.preventDefault();
    playClickFeedback(link);
    const id = link.getAttribute("href")?.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    return;
  }

  const staticAction = target.closest<HTMLElement>("[data-static-action]");
  if (staticAction) {
    playClickFeedback(staticAction);
  }
}

function handleInteractiveKeydown(event: KeyboardEvent): void {
  if (event.key !== "Enter" && event.key !== " ") return;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (!target.matches("[data-static-action]")) return;

  event.preventDefault();
  playClickFeedback(target);
}

function handleAdminPreview(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement) || !target.matches("[data-md-source]")) return;
  updateMarkdownPreview(target.value);
}

function handleAdminUploadChange(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches("[data-upload-file]")) return;
  const file = target.files?.[0];
  if (!file) return;
  void uploadAdminImage(file);
  target.value = "";
}

function updateMarkdownPreview(markdown: string): void {
  const preview = document.querySelector<HTMLElement>("[data-md-preview]");
  if (!preview) return;
  preview.innerHTML = renderMarkdownPreview(markdown);
}

function renderMarkdownPreview(markdown: string): string {
  const escaped = escapeHtml(markdown.trim());
  const withIframe = escaped.replace(
    /&lt;iframe\s+[^&]*src=&quot;(\/\/player\.bilibili\.com\/player\.html\?.+?)&quot;[^&]*&gt;&lt;\/iframe&gt;/g,
    (_match, src: string) => `<iframe class="embed-preview" src="https:${src}" loading="lazy" allowfullscreen></iframe>`,
  );

  return withIframe
    .split(/\n{2,}/)
    .map((block) => {
      if (block.startsWith("# ")) return `<h1>${block.slice(2)}</h1>`;
      if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
      const imageBlock = block.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageBlock) return `<img src="${imageBlock[2]}" alt="${imageBlock[1]}" loading="lazy" />`;
      return `<p>${block.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

function navigate(path: string): void {
  history.pushState({}, "", path);
  navLinks?.classList.remove("is-open");
  menuButton?.classList.remove("is-open");
  renderRoute();
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function formatDate(value: string | number | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function playClickFeedback(element: HTMLElement): void {
  element.classList.remove("is-clicked");
  void element.offsetWidth;
  element.classList.add("is-clicked");
  window.setTimeout(() => element.classList.remove("is-clicked"), 220);
}

function openSearch(): void {
  if (!searchModal) return;
  searchModal.hidden = false;
  requestAnimationFrame(() => {
    searchModal.classList.add("is-open");
    searchModal.querySelector<HTMLInputElement>("input")?.focus();
  });
}

function closeSearch(): void {
  if (!searchModal) return;
  searchModal.classList.remove("is-open");
  window.setTimeout(() => {
    searchModal.hidden = true;
  }, 180);
}

function fetchHitokoto(): void {
  fetch("https://v1.hitokoto.cn/?c=a")
    .then((response) => response.json() as Promise<{ hitokoto?: string }>)
    .then((data) => {
      const target = document.querySelector<HTMLElement>("[data-hitokoto]");
      if (target && data.hitokoto) target.textContent = data.hitokoto;
    })
    .catch(() => undefined);
}

function checkApiStatus(): void {
  const target = document.querySelector<HTMLElement>("[data-api-status]");
  if (!target) return;
  fetch("/api/health")
    .then((response) => response.json() as Promise<{ ok?: boolean; service?: string }>)
    .then((data) => {
      target.textContent = data.ok && data.service === "uzuki-backend" ? "API: online" : "API: unavailable";
    })
    .catch(() => {
      target.textContent = "API: not deployed";
    });
}

function installMouseTrail(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-mouse-trail]");
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  type TrailPoint = {
    x: number;
    y: number;
    age: number;
  };

  const points: TrailPoint[] = [];
  const maxPoints = 24;
  const maxAge = 520;
  let animationFrame = 0;
  let lastMoveAt = 0;

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = (time: number) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let index = points.length - 1; index >= 0; index--) {
      const point = points[index];
      const age = time - point.age;
      if (age > maxAge) {
        points.splice(index, 1);
        continue;
      }

      const progress = age / maxAge;
      const alpha = (1 - progress) * 0.72;
      const radius = 9 - progress * 6;
      context.beginPath();
      context.fillStyle = `rgba(255, 120, 172, ${alpha})`;
      context.shadowColor = "rgba(255, 120, 172, 0.34)";
      context.shadowBlur = 12;
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
    }

    context.shadowBlur = 0;
    if (points.length > 0 || time - lastMoveAt < 900) {
      animationFrame = requestAnimationFrame(draw);
    } else {
      animationFrame = 0;
    }
  };

  const start = () => {
    if (animationFrame === 0) {
      animationFrame = requestAnimationFrame(draw);
    }
  };

  window.addEventListener("resize", resize);
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      lastMoveAt = performance.now();
      points.push({ x: event.clientX, y: event.clientY, age: lastMoveAt });
      if (points.length > maxPoints) points.shift();
      start();
    },
    { passive: true },
  );

  resize();
}

function installPetDrift(): void {
  if (!pet) return;
  let phase = 0;
  const tick = () => {
    phase += 0.012;
    pet.style.setProperty("--pet-y", `${Math.sin(phase) * 10}px`);
    requestAnimationFrame(tick);
  };
  tick();
}

function installWave(): void {
  const wave = document.querySelector<HTMLCanvasElement>("[data-wave]");
  if (!wave) return;
  const context = wave.getContext("2d");
  if (!context) return;

  const draw = (time = 0) => {
    if (!document.body.contains(wave)) return;
    const width = wave.clientWidth;
    const height = wave.clientHeight;
    const ratio = window.devicePixelRatio || 1;
    wave.width = Math.floor(width * ratio);
    wave.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.beginPath();
    context.moveTo(0, height);
    for (let x = 0; x <= width; x += 8) {
      const y = 44 + Math.sin(x * 0.014 + time * 0.0018) * 9 + Math.sin(x * 0.028 + time * 0.001) * 5;
      context.lineTo(x, y);
    }
    context.lineTo(width, height);
    context.closePath();
    context.fill();
    requestAnimationFrame(draw);
  };
  draw();
}

function installSakura(): void {
  const maxPetals = 22;
  const spawn = () => {
    if (document.querySelectorAll(".sakura").length >= maxPetals) return;
    const petal = document.createElement("span");
    const size = 8 + Math.random() * 10;
    petal.className = "sakura";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${7 + Math.random() * 7}s`;
    petal.style.animationDelay = `${Math.random() * 1.8}s`;
    document.body.append(petal);
    window.setTimeout(() => petal.remove(), 15000);
  };
  window.setInterval(spawn, 650);
}
