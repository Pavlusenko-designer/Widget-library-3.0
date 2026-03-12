import { getWidgetDefinitions, renderWidget } from "./widgets.js";

const previewCanvas = document.getElementById("previewCanvas");
const widgetNav = document.getElementById("widgetNav");
const videoDialog = document.getElementById("videoDialog");
const videoDialogPlayer = document.getElementById("videoDialogPlayer");
const videoDialogTitle = document.getElementById("videoDialogTitle");
const videoDialogFallback = document.getElementById("videoDialogFallback");
const resumeDialog = document.getElementById("resumeDialog");
const resumeUploadInput = document.getElementById("resumeUploadInput");
const resumeConsentInput = document.getElementById("resumeConsentInput");
const resumeSelectedFile = document.getElementById("resumeSelectedFile");
const resumeSubmitButton = document.getElementById("resumeSubmitButton");
const widgetDefinitions = getWidgetDefinitions();
const orderedWidgetDefinitions = [...widgetDefinitions].sort((a, b) => {
  const aMatch = /Widget\s+(\d+)/i.exec(a.meta ?? "");
  const bMatch = /Widget\s+(\d+)/i.exec(b.meta ?? "");
  const aRank = aMatch ? Number(aMatch[1]) : 0;
  const bRank = bMatch ? Number(bMatch[1]) : 0;
  if (aRank !== bRank) {
    return bRank - aRank;
  }
  return a.label.localeCompare(b.label);
});
let activeWidgetId = orderedWidgetDefinitions[0]?.id ?? "";
let widgetSearchQuery = "";
let isWidgetPickerOpen = false;
const teamAutoplayTimers = new WeakMap();
let faqAnimationSerial = 0;
const faqWidgetTransitionTimers = new WeakMap();
const faqWidgetActionSerial = new WeakMap();

function updateResumeSubmitState() {
  if (!resumeSubmitButton) {
    return;
  }
  const hasFile = Boolean(resumeUploadInput?.files?.length);
  const hasConsent = Boolean(resumeConsentInput?.checked);
  resumeSubmitButton.disabled = !(hasFile && hasConsent);
}

function activateTeamCard(stack, requestedCard) {
  const cards = Array.from(stack.querySelectorAll("[data-team-card]"));
  if (!cards.length) {
    return;
  }

  const activeIndex = cards.indexOf(requestedCard);
  const resolvedActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  cards.forEach((card, index) => {
    const toggle = card.querySelector("[data-team-card-toggle]");
    const body = card.querySelector(".team-stack-card-body");
    const relative = index - resolvedActiveIndex;
    const isActive = relative === 0;

    let position = "off-right";
    if (relative === 0) {
      position = "active";
    } else if (relative === -1) {
      position = "prev";
    } else if (relative === 1) {
      position = "next";
    } else if (relative < -1) {
      position = "off-left";
    }

    card.classList.toggle("is-active", isActive);
    card.setAttribute("data-position", position);

    if (toggle) {
      toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    }
    if (body) {
      body.hidden = !isActive;
    }
  });

  syncTeamStackControls(stack);
}

function syncTeamStackControls(stack) {
  const widget = stack.closest("[data-team-stack-widget]");
  if (!widget) {
    return;
  }

  const cards = Array.from(stack.querySelectorAll("[data-team-card]"));
  const activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
  const resolvedActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  const dots = Array.from(widget.querySelectorAll("[data-team-dot]"));
  dots.forEach((dot, index) => {
    const isActive = index === resolvedActiveIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });

  const prev = widget.querySelector("[data-team-nav='prev']");
  const next = widget.querySelector("[data-team-nav='next']");
  if (prev) {
    prev.disabled = cards.length <= 1;
  }
  if (next) {
    next.disabled = cards.length <= 1;
  }
}

function initTeamStacks(root = previewCanvas) {
  const stacks = Array.from(root.querySelectorAll("[data-team-stack]"));
  stacks.forEach((stack) => {
    const cards = Array.from(stack.querySelectorAll("[data-team-card]"));
    if (!cards.length) {
      return;
    }
    const activeCard = cards.find((card) => card.classList.contains("is-active")) ?? cards[0];
    activateTeamCard(stack, activeCard);
    setupTeamStackAutoplay(stack);
  });
}

function activateProjectItem(widget, targetIndex, options = {}) {
  const items = Array.from(widget.querySelectorAll("[data-project-item]"));
  const media = Array.from(widget.querySelectorAll("[data-project-media]"));
  if (!items.length) {
    return;
  }

  const allowCollapse = options.allowCollapse === true;
  const currentIndex = items.findIndex((item) => item.classList.contains("is-active"));
  let resolvedIndex = targetIndex >= 0 && targetIndex < items.length ? targetIndex : 0;
  if (allowCollapse && resolvedIndex === currentIndex) {
    resolvedIndex = -1;
  }

  items.forEach((item, index) => {
    const isActive = resolvedIndex >= 0 && index === resolvedIndex;
    const toggle = item.querySelector("[data-project-toggle]");
    const panel = item.querySelector(".project-panel");
    const icon = item.querySelector(".project-toggle-icon");

    item.classList.toggle("is-active", isActive);
    if (toggle) {
      toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    }
    if (panel) {
      panel.hidden = !isActive;
    }
    if (icon) {
      icon.textContent = isActive ? "-" : "+";
    }
  });

  const mediaIndex = resolvedIndex >= 0 ? resolvedIndex : 0;
  media.forEach((entry, index) => {
    entry.classList.toggle("is-active", index === mediaIndex);
  });
}

function initProjectWidgets(root = previewCanvas) {
  const widgets = Array.from(root.querySelectorAll("[data-project-widget]"));
  widgets.forEach((widget) => {
    const items = Array.from(widget.querySelectorAll("[data-project-item]"));
    const initialIndex = items.findIndex((item) => item.classList.contains("is-active"));
    activateProjectItem(widget, initialIndex >= 0 ? initialIndex : 0);
  });
}

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setFaqItemExpanded(item, nextExpanded, options = {}) {
  const { animate = true } = options;
  const panel = item.querySelector("[data-faq-panel]");
  const toggle = item.querySelector("[data-faq-toggle]");
  if (!panel || !toggle) {
    return;
  }

  const isCurrentlyExpanded = toggle.getAttribute("aria-expanded") === "true" && !panel.hidden;
  const reduceMotion = shouldReduceMotion();
  const allowAnimation = animate && !reduceMotion;
  const durationMs = 260;
  const animationId = String(++faqAnimationSerial);
  panel.setAttribute("data-faq-anim-id", animationId);

  item.classList.toggle("is-active", nextExpanded);
  toggle.setAttribute("aria-expanded", nextExpanded ? "true" : "false");

  if (isCurrentlyExpanded === nextExpanded) {
    panel.hidden = !nextExpanded;
    panel.style.height = "";
    panel.style.opacity = "";
    panel.style.overflow = "";
    panel.style.transition = "";
    return;
  }

  if (!nextExpanded && panel.hidden) {
    panel.style.height = "";
    panel.style.opacity = "";
    panel.style.overflow = "";
    panel.style.transition = "";
    return;
  }

  if (!allowAnimation) {
    panel.hidden = !nextExpanded;
    panel.style.height = "";
    panel.style.opacity = "";
    panel.style.overflow = "";
    panel.style.transition = "";
    return;
  }

  panel.style.transition = "";
  panel.style.overflow = "hidden";

  if (nextExpanded) {
    panel.hidden = false;
    panel.style.height = "0px";
    panel.style.opacity = "0";
    panel.getBoundingClientRect();
    const targetHeight = panel.scrollHeight;
    panel.style.transition = `height ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${durationMs}ms ease`;
    requestAnimationFrame(() => {
      if (panel.getAttribute("data-faq-anim-id") !== animationId) {
        return;
      }
      panel.style.height = `${targetHeight}px`;
      panel.style.opacity = "1";
    });

    const onExpandEnd = (event) => {
      if (event.propertyName !== "height") {
        return;
      }
      if (panel.getAttribute("data-faq-anim-id") !== animationId) {
        panel.removeEventListener("transitionend", onExpandEnd);
        return;
      }
      panel.style.height = "";
      panel.style.opacity = "";
      panel.style.overflow = "";
      panel.style.transition = "";
      panel.removeEventListener("transitionend", onExpandEnd);
    };
    panel.addEventListener("transitionend", onExpandEnd);
    return;
  }

  const currentHeight = panel.scrollHeight;
  panel.hidden = false;
  panel.style.height = `${currentHeight}px`;
  panel.style.opacity = "1";
  panel.getBoundingClientRect();
  panel.style.transition = `height ${durationMs}ms cubic-bezier(0.4, 0, 1, 1), opacity ${Math.round(durationMs * 0.75)}ms ease`;
  requestAnimationFrame(() => {
    if (panel.getAttribute("data-faq-anim-id") !== animationId) {
      return;
    }
    panel.style.height = "0px";
    panel.style.opacity = "0";
  });

  const onCollapseEnd = (event) => {
    if (event.propertyName !== "height") {
      return;
    }
    if (panel.getAttribute("data-faq-anim-id") !== animationId) {
      panel.removeEventListener("transitionend", onCollapseEnd);
      return;
    }
    panel.hidden = true;
    panel.style.height = "";
    panel.style.opacity = "";
    panel.style.overflow = "";
    panel.style.transition = "";
    panel.removeEventListener("transitionend", onCollapseEnd);
  };
  panel.addEventListener("transitionend", onCollapseEnd);
}

function activateFaqItem(widget, targetIndex, options = {}) {
  const { animate = true, allowCollapse = true } = options;
  const items = Array.from(widget.querySelectorAll("[data-faq-item]"));
  if (!items.length) {
    return;
  }

  const nextActionSerial = (faqWidgetActionSerial.get(widget) ?? 0) + 1;
  faqWidgetActionSerial.set(widget, nextActionSerial);
  const existingTimer = faqWidgetTransitionTimers.get(widget);
  if (existingTimer) {
    clearTimeout(existingTimer);
    faqWidgetTransitionTimers.delete(widget);
  }

  const currentIndex = items.findIndex((item) => item.classList.contains("is-active"));
  const hasActive = currentIndex >= 0;
  const requestedIndex = targetIndex >= 0 && targetIndex < items.length ? targetIndex : 0;
  const shouldCollapseAll = allowCollapse && currentIndex === requestedIndex;

  if (animate && !shouldReduceMotion() && !shouldCollapseAll && currentIndex >= 0 && currentIndex !== requestedIndex) {
    items.forEach((item, index) => {
      if (index !== currentIndex && index !== requestedIndex) {
        setFaqItemExpanded(item, false, { animate: false });
      }
    });

    setFaqItemExpanded(items[currentIndex], false, { animate: true });
    const delayMs = 140;
    const timer = setTimeout(() => {
      if (faqWidgetActionSerial.get(widget) !== nextActionSerial) {
        return;
      }
      setFaqItemExpanded(items[requestedIndex], true, { animate: true });
      faqWidgetTransitionTimers.delete(widget);
    }, delayMs);
    faqWidgetTransitionTimers.set(widget, timer);
    return;
  }

  items.forEach((item, index) => {
    const nextExpanded = shouldCollapseAll ? false : index === requestedIndex;
    const shouldAnimateItem = animate && (nextExpanded || (hasActive && index === currentIndex));
    setFaqItemExpanded(item, nextExpanded, { animate: shouldAnimateItem });
  });
}

function initFaqWidgets(root = previewCanvas) {
  const widgets = Array.from(root.querySelectorAll("[data-faq-widget]"));
  widgets.forEach((widget) => {
    const items = Array.from(widget.querySelectorAll("[data-faq-item]"));
    const initialIndex = items.findIndex((item) => item.classList.contains("is-active"));
    const resolvedIndex = initialIndex >= 0 ? initialIndex : 0;
    activateFaqItem(widget, resolvedIndex, { animate: false, allowCollapse: false });
  });
}

function stopTeamStackAutoplay(stack) {
  const timer = teamAutoplayTimers.get(stack);
  if (timer) {
    clearInterval(timer);
    teamAutoplayTimers.delete(stack);
  }
}

function moveTeamStackNext(stack) {
  const cards = Array.from(stack.querySelectorAll("[data-team-card]"));
  if (cards.length <= 1) {
    return;
  }
  const activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
  const resolvedIndex = activeIndex >= 0 ? activeIndex : 0;
  const nextIndex = (resolvedIndex + 1) % cards.length;
  activateTeamCard(stack, cards[nextIndex]);
}

function startTeamStackAutoplay(stack) {
  if (teamAutoplayTimers.has(stack)) {
    return;
  }
  const timer = setInterval(() => {
    moveTeamStackNext(stack);
  }, 5000);
  teamAutoplayTimers.set(stack, timer);
}

function setupTeamStackAutoplay(stack) {
  stopTeamStackAutoplay(stack);
  startTeamStackAutoplay(stack);

  stack.addEventListener("mouseenter", () => stopTeamStackAutoplay(stack));
  stack.addEventListener("mouseleave", () => startTeamStackAutoplay(stack));
}

function applyWidgetFilter() {
  const normalizedQuery = widgetSearchQuery.trim().toLowerCase();
  const options = Array.from(widgetNav.querySelectorAll("[data-widget-option]"));
  const emptyState = widgetNav.querySelector("[data-widget-empty]");

  let visibleCount = 0;
  options.forEach((option) => {
    const searchText = option.getAttribute("data-widget-search") ?? "";
    const isVisible = !normalizedQuery || searchText.includes(normalizedQuery);
    option.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

function syncActiveWidgetOption() {
  const options = Array.from(widgetNav.querySelectorAll("[data-widget-option]"));
  options.forEach((option) => {
    const isActive = option.getAttribute("data-widget-id") === activeWidgetId;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  const pickerToggle = widgetNav.querySelector("[data-widget-picker-toggle]");
  const activeWidget = widgetDefinitions.find((item) => item.id === activeWidgetId);
  if (pickerToggle && activeWidget) {
    pickerToggle.textContent = activeWidget.meta ?? activeWidget.label;
  }
}

function setWidgetPickerOpen(nextOpen) {
  isWidgetPickerOpen = nextOpen;
  const panel = widgetNav.querySelector("[data-widget-picker-panel]");
  const toggle = widgetNav.querySelector("[data-widget-picker-toggle]");
  if (!panel || !toggle) {
    return;
  }
  panel.hidden = !isWidgetPickerOpen;
  toggle.setAttribute("aria-expanded", isWidgetPickerOpen ? "true" : "false");

  if (isWidgetPickerOpen) {
    const searchInput = widgetNav.querySelector("[data-widget-search-input]");
    searchInput?.focus();
    searchInput?.select();
  }
}

function renderWidgetNavigation() {
  widgetNav.className = "widget-nav";
  widgetNav.innerHTML = "";

  const picker = document.createElement("div");
  picker.className = "widget-picker";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "widget-picker-toggle";
  toggle.setAttribute("data-widget-picker-toggle", "");
  toggle.setAttribute("aria-haspopup", "listbox");
  toggle.setAttribute("aria-expanded", "false");
  picker.appendChild(toggle);

  const panel = document.createElement("div");
  panel.className = "widget-picker-panel";
  panel.setAttribute("data-widget-picker-panel", "");
  panel.hidden = true;

  const label = document.createElement("label");
  label.className = "widget-picker-search";
  label.setAttribute("for", "widgetSearch");
  label.textContent = "Find widget";

  const input = document.createElement("input");
  input.id = "widgetSearch";
  input.type = "search";
  input.className = "widget-picker-input";
  input.placeholder = "Search by widget name";
  input.setAttribute("data-widget-search-input", "");
  input.setAttribute("autocomplete", "off");
  input.value = widgetSearchQuery;
  label.appendChild(input);

  const list = document.createElement("div");
  list.className = "widget-picker-list";
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", "Widgets");

  orderedWidgetDefinitions.forEach((widget) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "widget-picker-option";
    option.setAttribute("data-widget-option", "");
    option.setAttribute("data-widget-id", widget.id);
    option.setAttribute("data-widget-search", `${widget.label} ${widget.meta ?? ""}`.toLowerCase());
    option.textContent = widget.meta ?? widget.label;
    list.appendChild(option);
  });

  const emptyState = document.createElement("p");
  emptyState.className = "widget-picker-empty";
  emptyState.setAttribute("data-widget-empty", "");
  emptyState.textContent = "No widgets match your search.";
  emptyState.hidden = true;

  panel.appendChild(label);
  panel.appendChild(list);
  panel.appendChild(emptyState);
  picker.appendChild(panel);
  widgetNav.appendChild(picker);

  applyWidgetFilter();
  syncActiveWidgetOption();
  setWidgetPickerOpen(false);
}

function renderActiveWidget() {
  const widget = widgetDefinitions.find((item) => item.id === activeWidgetId) ?? widgetDefinitions[0];
  if (!widget) {
    previewCanvas.innerHTML = "";
    return;
  }
  previewCanvas.id = "previewPanel";
  previewCanvas.setAttribute("role", "tabpanel");
  previewCanvas.setAttribute("tabindex", "0");
  previewCanvas.setAttribute("aria-label", widget.meta ?? widget.label);
  previewCanvas.innerHTML = renderWidget(widget);
  initTeamStacks(previewCanvas);
  initProjectWidgets(previewCanvas);
  initFaqWidgets(previewCanvas);
}

renderWidgetNavigation();
renderActiveWidget();

widgetNav.addEventListener("input", (event) => {
  const searchInput = event.target.closest("[data-widget-search-input]");
  if (!searchInput) {
    return;
  }
  widgetSearchQuery = searchInput.value;
  applyWidgetFilter();
});

widgetNav.addEventListener("click", (event) => {
  const pickerToggle = event.target.closest("[data-widget-picker-toggle]");
  if (pickerToggle) {
    setWidgetPickerOpen(!isWidgetPickerOpen);
    return;
  }

  const target = event.target.closest("[data-widget-option]");
  if (!target) {
    return;
  }

  const requestedWidgetId = target.getAttribute("data-widget-id");
  if (!requestedWidgetId || requestedWidgetId === activeWidgetId) {
    return;
  }

  activeWidgetId = requestedWidgetId;
  syncActiveWidgetOption();
  renderActiveWidget();
  setWidgetPickerOpen(false);
});

widgetNav.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isWidgetPickerOpen) {
    setWidgetPickerOpen(false);
    return;
  }

  const searchInput = event.target.closest("[data-widget-search-input]");
  if (!searchInput) {
    return;
  }

  const visibleOptions = Array.from(widgetNav.querySelectorAll("[data-widget-option]")).filter((option) => !option.hidden);
  if (!visibleOptions.length) {
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    visibleOptions[0].click();
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    visibleOptions[0].focus();
  }
});

document.addEventListener("click", (event) => {
  if (!isWidgetPickerOpen) {
    return;
  }
  if (event.target.closest("#widgetNav")) {
    return;
  }
  setWidgetPickerOpen(false);
});

previewCanvas.addEventListener("click", (event) => {
  const resumeOpenTrigger = event.target.closest("[data-resume-open]");
  if (resumeOpenTrigger && resumeDialog) {
    event.preventDefault();
    if (typeof resumeDialog.showModal === "function") {
      resumeDialog.showModal();
    } else {
      resumeDialog.setAttribute("open", "");
    }
    return;
  }

  const heroVideoToggle = event.target.closest("[data-hero-video-toggle]");
  if (heroVideoToggle) {
    const heroWidget = heroVideoToggle.closest(".hero-video-widget");
    const heroVideo = heroWidget?.querySelector(".hero-video-media");
    if (!heroVideo) {
      return;
    }

    const playIcon = '<svg class="phw-icon hero-video-control-icon" viewBox="0 0 24 24" width="var(--icon-size-md)" height="var(--icon-size-md)" aria-hidden="true"><path d="M8.5 6.5L18 12L8.5 17.5V6.5Z" fill="currentColor"></path></svg>';
    const pauseIcon = '<svg class="phw-icon hero-video-control-icon" viewBox="0 0 24 24" width="var(--icon-size-md)" height="var(--icon-size-md)" aria-hidden="true"><path d="M9 7V17M15 7V17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

    if (heroVideo.paused) {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      heroVideoToggle.innerHTML = pauseIcon;
      heroVideoToggle.setAttribute("aria-pressed", "false");
      heroVideoToggle.setAttribute("aria-label", "Pause background video");
    } else {
      heroVideo.pause();
      heroVideoToggle.innerHTML = playIcon;
      heroVideoToggle.setAttribute("aria-pressed", "true");
      heroVideoToggle.setAttribute("aria-label", "Play background video");
    }
    return;
  }

  const trigger = event.target.closest(".video-play-btn");
  if (trigger) {
    const title = trigger.getAttribute("data-video-title") ?? "Video";
    const src = trigger.getAttribute("data-video-src") ?? "";
    videoDialogTitle.textContent = title;

    if (src) {
      videoDialogPlayer.hidden = false;
      videoDialogFallback.hidden = true;
      videoDialogPlayer.src = src;
    } else {
      videoDialogPlayer.hidden = true;
      videoDialogFallback.hidden = false;
      videoDialogPlayer.removeAttribute("src");
    }

    videoDialog.showModal();
    return;
  }

  const teamToggle = event.target.closest("[data-team-card-toggle]");
  if (teamToggle) {
    const teamCard = teamToggle.closest("[data-team-card]");
    const teamStack = teamToggle.closest("[data-team-stack]");
    if (teamCard && teamStack) {
      activateTeamCard(teamStack, teamCard);
    }
    return;
  }

  const teamDot = event.target.closest("[data-team-dot]");
  if (teamDot) {
    const teamWidget = teamDot.closest("[data-team-stack-widget]");
    const teamStack = teamWidget?.querySelector("[data-team-stack]");
    if (!teamStack) {
      return;
    }
    const cards = Array.from(teamStack.querySelectorAll("[data-team-card]"));
    const targetIndex = Number(teamDot.getAttribute("data-team-dot"));
    const targetCard = cards[targetIndex];
    if (targetCard) {
      activateTeamCard(teamStack, targetCard);
    }
    return;
  }

  const teamNav = event.target.closest("[data-team-nav]");
  if (teamNav) {
    const teamWidget = teamNav.closest("[data-team-stack-widget]");
    const teamStack = teamWidget?.querySelector("[data-team-stack]");
    if (!teamStack) {
      return;
    }

    const cards = Array.from(teamStack.querySelectorAll("[data-team-card]"));
    if (!cards.length) {
      return;
    }
    const activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
    const resolvedIndex = activeIndex >= 0 ? activeIndex : 0;
    const direction = teamNav.getAttribute("data-team-nav");
    const nextIndex = direction === "prev" ? (resolvedIndex - 1 + cards.length) % cards.length : (resolvedIndex + 1) % cards.length;
    activateTeamCard(teamStack, cards[nextIndex]);
    return;
  }

  const projectToggle = event.target.closest("[data-project-toggle]");
  if (projectToggle) {
    const projectItem = projectToggle.closest("[data-project-item]");
    const projectWidget = projectToggle.closest("[data-project-widget]");
    if (!projectItem || !projectWidget) {
      return;
    }
    const index = Number(projectItem.getAttribute("data-project-index"));
    activateProjectItem(projectWidget, index, { allowCollapse: true });
    return;
  }

  const faqToggle = event.target.closest("[data-faq-toggle]");
  if (faqToggle) {
    const faqItem = faqToggle.closest("[data-faq-item]");
    const faqWidget = faqToggle.closest("[data-faq-widget]");
    if (!faqItem || !faqWidget) {
      return;
    }
    const index = Number(faqItem.getAttribute("data-faq-index"));
    activateFaqItem(faqWidget, index, { animate: true, allowCollapse: true });
  }
});

document.addEventListener("click", (event) => {
  const resumeOpenTrigger = event.target.closest("[data-resume-open]");
  if (!resumeOpenTrigger || !resumeDialog) {
    return;
  }
  event.preventDefault();
  if (typeof resumeDialog.showModal === "function") {
    resumeDialog.showModal();
  } else {
    resumeDialog.setAttribute("open", "");
  }
});

resumeDialog?.addEventListener("click", (event) => {
  const cancelButton = event.target.closest("[data-resume-cancel]");
  if (cancelButton) {
    resumeDialog.close();
  }
});

resumeUploadInput?.addEventListener("change", () => {
  const file = resumeUploadInput.files?.[0];
  resumeSelectedFile.textContent = file ? `Selected: ${file.name}` : "";
  updateResumeSubmitState();
});

resumeConsentInput?.addEventListener("change", () => {
  updateResumeSubmitState();
});

resumeDialog?.addEventListener("close", () => {
  if (!resumeUploadInput || !resumeConsentInput || !resumeSelectedFile) {
    return;
  }
  resumeUploadInput.value = "";
  resumeConsentInput.checked = false;
  resumeSelectedFile.textContent = "";
  updateResumeSubmitState();
});

videoDialog.addEventListener("close", () => {
  videoDialogPlayer.pause();
  videoDialogPlayer.removeAttribute("src");
  videoDialogPlayer.load();
});



