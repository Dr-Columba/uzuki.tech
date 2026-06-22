import "./styles.css";

type Post = {
  title: string;
  category: string;
  date: string;
  views: string;
  comments: number;
  excerpt: string;
  image?: string;
  featured?: boolean;
};

const navItems = ["首页", "公告", "手记", "ACG", "资源", "相册", "留言"];

const posts: Post[] = [
  {
    title: "迁移记录：从 WordPress 到新的 uzuki.tech",
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
    excerpt: "樱花、鼠标跟随和桌宠都可以有，但需要可关闭、低消耗，并尊重系统的减少动态效果设置。",
    image: "/assets/images/post-2.jpg",
  },
  {
    title: "旧相册整理：一些值得留在首页的瞬间",
    category: "相册",
    date: "2026-06-05",
    views: "1.8k",
    comments: 15,
    excerpt: "从旧 WordPress 媒体库中挑出适合展示的轻量缩略图，避免直接使用数 MB 原图拖慢加载。",
    image: "/assets/images/post-5.jpg",
  },
  {
    title: "待办：评论、搜索、归档与管理后台",
    category: "路线图",
    date: "2026-06-01",
    views: "520",
    comments: 3,
    excerpt: "当前版本先完成视觉和静态结构，之后可接入 REST API、Markdown/MDX 或轻量数据库。",
    image: "/assets/images/post-6.jpg",
  },
];

const tags = ["Vite", "TypeScript", "ACG", "日常", "相册", "前端", "性能", "迁移"];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app root");
}

app.innerHTML = `
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="主导航">
      <a class="brand" href="#" aria-label="uzuki.tech 首页">
        <img src="/assets/images/site-logo.png" alt="卯月科技" />
      </a>
      <button class="icon-button mobile-menu" type="button" aria-label="打开导航" data-menu-button>
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${navItems.map((item) => `<a href="#${item === "首页" ? "top" : "posts"}">${item}</a>`).join("")}
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
        ${posts.map(renderPost).join("")}
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
            ${tags.map((tag) => `<a href="#">${tag}</a>`).join("")}
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

  <canvas class="mouse-trail" data-mouse-trail aria-hidden="true"></canvas>
  <button class="backtop" type="button" aria-label="回到顶部" data-backtop>
    <img src="/assets/images/backtop.gif" alt="" />
  </button>
  <button class="pet" type="button" aria-label="隐藏桌宠" title="隐藏桌宠" data-pet>
    <img src="/assets/images/pet.gif" alt="" />
  </button>
`;

function renderPost(post: Post): string {
  const className = post.featured ? "post-card featured" : "post-card";
  return `
    <article class="${className}" role="button" tabindex="0" data-static-action>
      ${post.image ? `<a class="post-image" href="#"><img src="${post.image}" alt="" loading="lazy" width="1024" height="659" /></a>` : ""}
      <div class="post-body">
        <a class="category" href="#">${post.category}</a>
        <h2><a href="#">${post.title}</a></h2>
        <p>${post.excerpt}</p>
        <div class="post-meta">
          <span>${post.date}</span>
          <span>${post.views} views</span>
          <span>${post.comments} comments</span>
        </div>
      </div>
    </article>
  `;
}

const header = document.querySelector<HTMLElement>("[data-header]");
const menuButton = document.querySelector<HTMLButtonElement>("[data-menu-button]");
const navLinks = document.querySelector<HTMLElement>("[data-nav-links]");
const searchModal = document.querySelector<HTMLElement>("[data-search-modal]");
const searchOpen = document.querySelector<HTMLButtonElement>("[data-search-open]");
const searchClose = document.querySelector<HTMLButtonElement>("[data-search-close]");
const backtop = document.querySelector<HTMLButtonElement>("[data-backtop]");
const pet = document.querySelector<HTMLButtonElement>("[data-pet]");
const wave = document.querySelector<HTMLCanvasElement>("[data-wave]");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function handleInteractiveClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (link) {
    event.preventDefault();
    playClickFeedback(link);
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

function playClickFeedback(element: HTMLElement): void {
  element.classList.remove("is-clicked");
  void element.offsetWidth;
  element.classList.add("is-clicked");
  window.setTimeout(() => element.classList.remove("is-clicked"), 220);
}

if (!reducedMotion) {
  installMouseTrail();
  installPetDrift();
  installWave();
  installSakura();
}

fetch("https://v1.hitokoto.cn/?c=a")
  .then((response) => response.json() as Promise<{ hitokoto?: string }>)
  .then((data) => {
    const target = document.querySelector<HTMLElement>("[data-hitokoto]");
    if (target && data.hitokoto) target.textContent = data.hitokoto;
  })
  .catch(() => undefined);

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
  if (!wave) return;
  const context = wave.getContext("2d");
  if (!context) return;

  const draw = (time = 0) => {
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
