(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const shell = document.querySelector(".page-shell");
  const langButtons = document.querySelectorAll("[data-lang]");
  const themeButton = document.querySelector("[data-theme-toggle]");
  let lang = localStorage.getItem("portfolio-lang") || "tr";
  let theme = localStorage.getItem("portfolio-theme") || "light";
  let tick = 0;

  const loc = (value) => {
    if (value && typeof value === "object" && ("tr" in value || "en" in value)) {
      return value[lang] || value.tr || value.en || "";
    }
    return value || "";
  };

  const ui = (key) => data.ui[lang][key] || key;

  function setTheme(nextTheme) {
    theme = nextTheme;
    localStorage.setItem("portfolio-theme", theme);
    if (shell) shell.dataset.theme = theme;
    if (themeButton) themeButton.textContent = theme === "dark" ? ui("themeLight") : ui("themeDark");
  }

  function setLang(nextLang) {
    lang = nextLang;
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.lang = lang;

    langButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = ui(node.dataset.i18n);
    });

    setTheme(theme);
    renderProjects();
    renderDetail();
    updateTicker(true);
  }

  function projectHref(project) {
    return `project.html?slug=${encodeURIComponent(project.slug)}`;
  }

  function buildVideo(project, autoplay) {
    const wrapper = document.createElement("div");
    wrapper.className = "motion-field";

    const label = document.createElement("span");
    label.className = "motion-label";
    label.textContent = project.video || `assets/projects/${project.slug}.mp4`;
    wrapper.append(label);

    if (project.video) {
      const video = document.createElement("video");
      video.className = "project-video";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (autoplay) {
        video.autoplay = true;
        video.controls = true;
      }
      video.src = project.video;
      wrapper.append(video);
    }

    return wrapper;
  }

  function renderProjects() {
    const list = document.querySelector("[data-project-list]");
    const count = document.querySelector("[data-project-count]");
    if (!list) return;

    list.innerHTML = "";
    if (count) count.textContent = String(data.projects.length).padStart(2, "0");

    data.projects.forEach((project, index) => {
      const link = document.createElement("a");
      link.className = "project-row";
      link.href = projectHref(project);

      const no = document.createElement("span");
      no.className = "project-no";
      no.textContent = String(index + 1).padStart(2, "0");

      const main = document.createElement("span");
      main.className = "project-main";

      const title = document.createElement("strong");
      title.textContent = loc(project.name);

      const meta = document.createElement("small");
      meta.textContent = `${loc(project.kind)} · ${project.year}`;

      main.append(title, meta);

      const one = document.createElement("span");
      one.className = "project-one";
      one.textContent = loc(project.one);

      const media = buildVideo(project, false);

      link.append(no, main, one, media);

      link.addEventListener("mouseenter", () => {
        const video = link.querySelector("video");
        if (video) video.play().catch(() => {});
      });
      link.addEventListener("mouseleave", () => {
        const video = link.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      list.append(link);
    });
  }

  function renderDetail() {
    const detail = document.querySelector("[data-project-detail]");
    if (!detail) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || data.projects[0].slug;
    const project = data.projects.find((item) => item.slug === slug);

    detail.innerHTML = "";

    if (!project) {
      detail.innerHTML = `<h1>${ui("missing")}</h1>`;
      document.title = `${ui("missing")} | Umut Uygur`;
      return;
    }

    document.title = `${loc(project.name)} | Umut Uygur`;

    const media = document.createElement("div");
    media.className = "detail-media";
    media.append(buildVideo(project, true));

    const copy = document.createElement("article");
    copy.className = "detail-copy";

    const kicker = document.createElement("p");
    kicker.className = "detail-kicker";
    kicker.textContent = `${loc(project.kind)} · ${project.year}`;

    const title = document.createElement("h1");
    title.textContent = loc(project.name);

    const summary = document.createElement("p");
    summary.className = "detail-summary";
    summary.textContent = loc(project.one);

    const paragraphs = document.createElement("div");
    paragraphs.className = "detail-paragraphs";
    (project.paras[lang] || []).forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      paragraphs.append(p);
    });

    const stackTitle = document.createElement("h2");
    stackTitle.textContent = ui("stack");

    const stack = document.createElement("ul");
    stack.className = "stack-list";
    project.stack.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      stack.append(li);
    });

    const links = document.createElement("div");
    links.className = "detail-links";
    (project.links || []).forEach((item) => {
      const a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = loc(item.label);
      links.append(a);
    });

    copy.append(kicker, title, summary, paragraphs, stackTitle, stack, links);
    detail.append(media, copy);

    const video = detail.querySelector("video");
    if (video) video.play().catch(() => {});
  }

  function updateTicker(immediate) {
    const ticker = document.querySelector("[data-ticker]");
    if (!ticker) return;
    if (immediate) {
      ticker.textContent = loc(data.projects[tick % data.projects.length].name);
      return;
    }
    ticker.classList.add("is-changing");
    window.setTimeout(() => {
      tick = (tick + 1) % data.projects.length;
      ticker.textContent = loc(data.projects[tick].name);
      ticker.classList.remove("is-changing");
    }, 220);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => setLang(button.dataset.lang));
  });

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  }

  setTheme(theme);
  setLang(lang);

  if (document.querySelector("[data-ticker]")) {
    window.setInterval(() => updateTicker(false), 2800);
  }
})();
