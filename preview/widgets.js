import { button, container, grid, heading, icon, iconButton, image, input, link, stack, text } from "../design-system/html-first/index.js";
import { getRecommendedJobs, getRecommendedJobsEndpoint } from "./mock-db/recommended-jobs-db.js";

function renderSectionHeader({
  title,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  secondaryCtaLabel,
  secondaryCtaHref = "#",
  secondaryCtaVariant = "secondary"
}) {
  const secondaryClassName = secondaryCtaVariant === "tertiary" ? "phw-btn phw-btn-tertiary phw-btn-inline" : "phw-btn phw-btn-secondary phw-btn-inline";
  return stack(
    [
      heading(title, { level: 2, style: "widget" }),
      subtitle ? text(subtitle, { tone: "default" }) : "",
      ctaLabel || secondaryCtaLabel
        ? `<div class="widget-header-actions">
            ${ctaLabel ? link(ctaLabel, { href: ctaHref, className: "phw-btn phw-btn-primary phw-btn-inline" }) : ""}
            ${secondaryCtaLabel ? link(secondaryCtaLabel, { href: secondaryCtaHref, className: secondaryClassName }) : ""}
          </div>`
        : ""
    ],
    { className: "widget-header", gap: "var(--space-lg)" }
  );
}

function renderMetricCardsWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const cards = [
    { meta: "80%", title: "Retention after onboarding", description: "Structured first 90 days keeps teams aligned and lowers early churn." },
    { meta: "2.4x", title: "Faster hiring decisions", description: "Shared scorecards and aligned interview loops reduce approval lag." },
    { meta: "36h", title: "Median response time", description: "Automations route applications to the right recruiter without queue buildup." },
    { meta: "91%", title: "Candidate satisfaction", description: "Clear status updates and transparent feedback maintain trust." }
  ];

  const cardsHtml = cards.map((item) =>
    stack(
      [
        text(item.meta, { as: "p", tone: "overline", className: "metric-meta" }),
        heading(item.title, { level: 3, style: "card" }),
        text(item.description, { tone: "muted" })
      ],
      { className: "metric-card phw-card", gap: "var(--space-sm)" }
    )
  );

  return container(
    [
      grid(
        [
          renderSectionHeader({
            title: "People analytics at a glance",
            subtitle:
              "Track conversion and candidate experience from the same board. Layout is content-tolerant for short and long card copy.",
            ctaLabel: "Learn more",
            ctaHref: "#",
            secondaryCtaLabel: "Download report",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          grid(cardsHtml, {
            columns: 2,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 2, widescreen: 2 },
            className: "metric-grid",
            gap: "var(--space-lg)"
          })
        ],
        {
          columns: 2,
          columnsByBreakpoint: { mobile: 1, tablet: 1, desktop: 2, widescreen: 2 },
          className: "widget-grid widget-grid-metrics",
          gap: "var(--space-2xl)"
        }
      )
    ],
    {
      className: `widget-shell widget-shell-metrics ${
        isDark ? "widget-shell-dark widget-shell-metrics-dark" : "widget-shell-light widget-shell-metrics-light"
      }`
    }
  );
}

function renderMediaStepsWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const cards = [
    {
      src: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      title: "Apply in minutes",
      description: "A short application flow pre-fills profile data, reduces drop-off, and gives candidates momentum from the first click."
    },
    {
      src: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      title: "Get matched",
      description: "Role-fit scoring surfaces the best opportunities first while keeping transparent alternatives visible."
    },
    {
      src: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
      title: "Meet the team",
      description: "Scheduling automation finds the fastest overlap and sends context-rich reminders before every interview."
    },
    {
      src: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png",
      title: "Start confidently",
      description: "Day-one onboarding includes ownership, milestones, and the right handoffs so new hires can contribute sooner."
    }
  ];

  const cardsHtml = cards.map((item) =>
    `<article class="step-card">
      <figure class="step-media">
        ${image({ src: item.src, alt: item.title, className: "step-image" })}
      </figure>
      ${stack(
        [
          heading(item.title, { level: 3, style: "card" }),
          text(item.description, { tone: "muted" }),
          link("Explore this step", { href: "#", className: "phw-inline-link" })
        ],
        { className: "step-content", gap: "var(--space-sm)" }
      )}
    </article>`
  );

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "How the candidate journey works",
            subtitle: "Each step card keeps media, body copy, and action aligned even when content length differs.",
            ctaLabel: "Explore journey",
            ctaHref: "#",
            secondaryCtaLabel: "Talk to recruiter",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          grid(cardsHtml, {
            columns: 2,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 2, widescreen: 2 },
            className: "steps-grid",
            gap: "var(--space-xl)"
          })
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    {
      className: `widget-shell widget-shell-steps ${
        isDark ? "widget-shell-dark widget-shell-steps-dark" : "widget-shell-light widget-shell-steps-light"
      }`
    }
  );
}

function renderVideoPopupWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const videos = [
    {
      title: "Inside our engineering culture",
      subtitle: "Team leads explain delivery rituals and decision-making.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },
    {
      title: "Hiring manager interview walkthrough",
      subtitle: "What happens after application review and how feedback is shared.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
    },
    {
      title: "Day-one onboarding preview",
      subtitle: "See how workspace setup and role goals are introduced.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
      videoSrc: ""
    }
  ];

  const cardsHtml = videos.map((item, idx) =>
    stack(
      [
        `<div class="video-cover-wrap">
          ${image({ src: item.imageSrc, alt: item.title, className: "video-cover" })}
          ${iconButton({
            iconName: "play",
            variant: "overlay",
            shape: "circle",
            size: "lg",
            label: `Play ${item.title}`,
            className: "video-play-btn",
            attrs: {
              "data-video-src": item.videoSrc,
              "data-video-title": item.title,
              "data-video-index": String(idx)
            }
          })}
        </div>`,
        heading(item.title, { level: 3, style: "card" }),
        text(item.subtitle, { tone: "muted" }),
        link("Transcript", { href: "#", className: "phw-inline-link" })
      ],
      { className: "video-card phw-card", gap: "var(--space-sm)" }
    )
  );

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Video stories and popup player",
            subtitle:
              "Uses existing DS button/link/text patterns. Popup behavior is isolated from schema and can be wired to CMS video fields.",
            ctaLabel: "Browse stories",
            ctaHref: "#",
            secondaryCtaLabel: "Watch trailer",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          grid(cardsHtml, {
            columns: 3,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 3, widescreen: 3 },
            className: "video-grid",
            gap: "var(--space-lg)"
          })
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    {
      className: `widget-shell widget-shell-video ${
        isDark ? "widget-shell-dark widget-shell-video-dark" : "widget-shell-light widget-shell-video-light"
      }`
    }
  );
}

function renderEventRecommendationWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const events = [
    {
      title: "AI in Talent Acquisition Summit",
      description: "Live demos and case studies on reducing time-to-hire with practical AI workflows.",
      date: "Apr 18",
      topic: "AI Hiring",
      location: "Kyiv, UA",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      href: "#"
    },
    {
      title: "Employer Brand Studio Session",
      description: "Hands-on workshop to sharpen EVP messaging for social and career-site channels.",
      date: "May 02",
      topic: "Brand",
      location: "Berlin, DE",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      href: "#"
    },
    {
      title: "Global Recruiting Operations Forum",
      description: "Operating model deep dive for distributed recruiting teams and vendor ecosystems.",
      date: "May 09",
      topic: "Operations",
      location: "Remote",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
      href: "#"
    },
    {
      title: "Campus Pipeline Strategy Day",
      description: "Design internship-to-full-time funnels with clear milestones and manager accountability.",
      date: "Jun 14",
      topic: "Early Careers",
      location: "Warsaw, PL",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png",
      href: "#"
    }
  ];

  const cardClassByIndex = ["event-card-featured", "", "", "event-card-wide"];
  const cardsHtml = events.map((item, index) => {
    const sizeClass = cardClassByIndex[index] || "";
    return `<article class="event-card ${sizeClass}">
      <div class="event-media">
        ${image({ src: item.imageSrc, alt: item.title, className: "event-image" })}
        <div class="event-meta-overlay">
          <span class="event-meta-pill event-meta-date">${item.date}</span>
          <span class="event-meta-pill event-meta-location">${item.location}</span>
        </div>
      </div>
      ${stack(
        [
          `<p class="event-topic">${item.topic}</p>`,
          heading(item.title, { level: 3, style: "card" }),
          text(item.description, { tone: "muted" }),
          link("View event", { href: item.href, className: "phw-inline-link" })
        ],
        { className: "event-body", gap: "var(--space-sm)" }
      )}
    </article>`;
  });

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Recommended events for your hiring goals",
            subtitle:
              "Bento layout prioritizes event discovery while keeping date, topic, and location instantly scannable.",
            ctaLabel: "See full calendar",
            ctaHref: "#",
            secondaryCtaLabel: "Submit event",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          `<div class="event-bento">${cardsHtml.join("")}</div>`
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    {
      className: `widget-shell widget-shell-events ${
        isDark ? "widget-shell-dark widget-shell-events-dark" : "widget-shell-light widget-shell-events-light"
      }`
    }
  );
}

function renderMeetTeamWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const members = [
    {
      name: "Amina Rahman",
      role: "Head of Talent Strategy",
      bio: "Great hiring starts when role clarity and candidate clarity are equally strong.",
      imageSrc: "https://randomuser.me/api/portraits/women/68.jpg",
      links: [
        { label: "LinkedIn", href: "#" },
        { label: "Email", href: "#" }
      ]
    },
    {
      name: "Lucas Moretti",
      role: "Employer Brand Lead",
      bio: "Your brand is strongest when candidates feel the same story from first click to first day.",
      imageSrc: "https://randomuser.me/api/portraits/men/52.jpg",
      links: [{ label: "LinkedIn", href: "#" }]
    },
    {
      name: "Priya Natarajan",
      role: "Recruiting Operations Manager",
      bio: "Operational excellence is making every handoff invisible to the candidate and obvious to the team.",
      imageSrc: "https://randomuser.me/api/portraits/women/44.jpg",
      links: [
        { label: "LinkedIn", href: "#" },
        { label: "Calendar", href: "#" }
      ]
    },
    {
      name: "Miguel Torres",
      role: "Technical Recruiter",
      bio: "The best technical interviews feel challenging, fair, and genuinely human.",
      imageSrc: "https://randomuser.me/api/portraits/men/36.jpg",
      links: []
    },
    {
      name: "Yuki Sato",
      role: "University Programs Partner",
      bio: "Early-career programs succeed when mentorship is structured and growth is visible.",
      imageSrc: "https://randomuser.me/api/portraits/women/21.jpg",
      links: [{ label: "LinkedIn", href: "#" }]
    }
  ];

  const cardsHtml = members.map((member, index) => {
    const linksHtml =
      member.links && member.links.length
        ? `<div class="team-stack-links">${member.links
            .map((item) => link(item.label, { href: item.href, className: "phw-inline-link" }))
            .join("")}</div>`
        : "";

    return `<article class="team-stack-card${index === 0 ? " is-active" : ""}" data-team-card data-card-index="${index}">
      <button class="team-stack-card-toggle" type="button" data-team-card-toggle aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="team-card-body-${index}">
        <figure class="team-stack-photo-wrap">
          ${image({ src: member.imageSrc, alt: member.name, className: "team-stack-photo" })}
        </figure>
        <span class="team-stack-title-wrap">
          <span class="team-stack-name">${member.name}</span>
          <span class="team-stack-role">${member.role}</span>
        </span>
      </button>
      <div class="team-stack-card-body" id="team-card-body-${index}" ${index === 0 ? "" : "hidden"}>
        <blockquote class="team-stack-quote">"${member.bio}"</blockquote>
        ${linksHtml}
      </div>
    </article>`;
  });

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Meet the team",
            subtitle:
              "Team members appear as an interactive stack. Hover to lift a card, click to bring it to the top and reveal bio and links.",
            ctaLabel: "View org chart",
            ctaHref: "#",
            secondaryCtaLabel: "Open positions",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          `<div class="team-stack-widget" data-team-stack-widget>
            <div class="team-stack-stage">
              <div class="team-stack" data-team-stack>${cardsHtml.join("")}</div>
            </div>
            <div class="team-stack-controls" aria-label="Team member navigation">
              <button type="button" class="team-stack-nav" data-team-nav="prev" aria-label="Previous team member">‹</button>
              <div class="team-stack-dots" role="tablist" aria-label="Select team member">
                ${members
                  .map(
                    (_, index) =>
                      `<button type="button" class="team-stack-dot${index === 0 ? " is-active" : ""}" data-team-dot="${index}" aria-label="Show member ${index + 1}" aria-current="${index === 0 ? "true" : "false"}"></button>`
                  )
                  .join("")}
              </div>
              <button type="button" class="team-stack-nav" data-team-nav="next" aria-label="Next team member">›</button>
            </div>
          </div>`
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    {
      className: `widget-shell widget-shell-team ${
        isDark ? "widget-shell-dark widget-shell-team-dark" : "widget-shell-light widget-shell-team-light"
      }`
    }
  );
}

function renderCompanyProjectsWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const projects = [
    {
      name: "Store Leadership Program",
      description:
        "Fast-track path for future store managers: coaching, P&L fundamentals, and hands-on leadership in high-traffic locations.",
      ctaLabel: "Learn about store leadership roles",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png"
    },
    {
      name: "Visual Merchandising Team",
      description:
        "Create seasonal floor sets, optimize product storytelling, and deliver in-store experiences that drive conversion.",
      ctaLabel: "Explore merchandising careers",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png"
    },
    {
      name: "Supply Chain & Logistics",
      description:
        "Keep inventory moving from distribution centers to stores with real-time planning, vendor coordination, and replenishment analytics.",
      ctaLabel: "See logistics opportunities",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png"
    },
    {
      name: "E-commerce Product Team",
      description:
        "Build online shopping journeys: search, recommendations, checkout, and post-purchase flows for millions of customers.",
      ctaLabel: "View digital product roles",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png"
    },
    {
      name: "Customer Experience Operations",
      description:
        "Support store and online customers through service design, issue resolution, and quality standards that build loyalty.",
      ctaLabel: "Discover customer experience jobs",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png"
    }
  ];

  const listHtml = projects
    .map((project, index) => {
      const expanded = index === 0;
      return `<article class="project-list-item${expanded ? " is-active" : ""}" data-project-item data-project-index="${index}">
        <button
          type="button"
          class="project-toggle"
          data-project-toggle
          aria-expanded="${expanded ? "true" : "false"}"
          aria-controls="project-panel-${index}"
        >
          <span class="project-name">${project.name}</span>
          <span class="project-toggle-icon" aria-hidden="true">${expanded ? "-" : "+"}</span>
        </button>
        <div class="project-panel" id="project-panel-${index}" ${expanded ? "" : "hidden"}>
          <p class="project-description">${project.description}</p>
          ${link(project.ctaLabel, { href: project.ctaHref, className: "project-link phw-inline-link" })}
        </div>
      </article>`;
    })
    .join("");

  const mediaHtml = projects
    .map(
      (project, index) =>
        `<figure class="project-media${index === 0 ? " is-active" : ""}" data-project-media data-project-index="${index}">
          ${image({ src: project.imageSrc, alt: project.name, className: "project-media-image" })}
        </figure>`
    )
    .join("");

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Company projects",
            subtitle: "Explore how our retail teams collaborate across stores, supply chain, and digital channels.",
            ctaLabel: "View all career paths",
            ctaHref: "#",
            secondaryCtaLabel: "Join talent community",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          `<section class="projects-widget" data-project-widget>
            <div class="projects-list" role="list">${listHtml}</div>
            <div class="projects-media-stage">${mediaHtml}</div>
          </section>`
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    {
      className: `widget-shell widget-shell-projects ${
        isDark ? "widget-shell-dark widget-shell-projects-dark" : "widget-shell-light widget-shell-projects-light"
      }`
    }
  );
}

function renderFaqAccordionWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const faqItems = [
    {
      question: "How quickly can we launch a new hiring campaign?",
      answer:
        "Most teams publish a campaign in 2-3 business days using existing templates, role scorecards, and approval flows. If your content is ready, launch can happen in a single working session.",
      linkLabel: "See launch checklist",
      linkHref: "#"
    },
    {
      question: "Can we localize job pages for different regions?",
      answer:
        "Yes. The widget supports region-specific copy, legal notes, and CTA labels while preserving one shared structure. This keeps content governance simple and avoids one-off layout forks.",
      linkLabel: "Review localization model",
      linkHref: "#"
    },
    {
      question: "How do we keep candidate communication consistent?",
      answer:
        "Use the shared messaging library: each stage has approved templates for email, status updates, and interview reminders. Teams can adapt tone per role while preserving mandatory policy content.",
      linkLabel: "Open communication templates",
      linkHref: "#"
    },
    {
      question: "What analytics are included for this widget?",
      answer:
        "You can track accordion interaction depth, top-opened questions, and downstream CTA clicks. This helps identify unclear content and refine information architecture over time.",
      linkLabel: "View tracking events",
      linkHref: "#"
    },
    {
      question: "Does the accordion handle long answers without breaking layout?",
      answer:
        "Yes. Answer panels expand to content height, preserve readable line length, and keep spacing rhythm across breakpoints. The layout is tested for short and long editorial copy.",
      linkLabel: "Read content tolerance notes",
      linkHref: "#"
    }
  ];

  const faqListHtml = faqItems
    .map((item, index) => {
      const expanded = index === 0;
      return `<article class="faq-item${expanded ? " is-active" : ""}" data-faq-item data-faq-index="${index}">
        <h3 class="faq-question-wrap">
          <button
            type="button"
            class="faq-toggle"
            data-faq-toggle
            aria-expanded="${expanded ? "true" : "false"}"
            aria-controls="faq-panel-${index}"
          >
            <span class="faq-question">${item.question}</span>
            <span class="faq-toggle-icon" aria-hidden="true">
              ${icon("plus", { size: "sm", className: "faq-toggle-glyph faq-toggle-glyph-plus" })}
              ${icon("minus", { size: "sm", className: "faq-toggle-glyph faq-toggle-glyph-minus" })}
            </span>
          </button>
        </h3>
        <div class="faq-panel" id="faq-panel-${index}" data-faq-panel ${expanded ? "" : "hidden"}>
          <div class="faq-panel-inner">
            ${text(item.answer, { tone: "muted" })}
            ${link(item.linkLabel, { href: item.linkHref, className: "phw-inline-link faq-link" })}
          </div>
        </div>
      </article>`;
    })
    .join("");

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Frequently asked questions",
            subtitle:
              "Built with reusable DS primitives and token-based spacing. Accordion motion is smooth, content-tolerant, and consistent across mobile, tablet, desktop, and widescreen.",
            ctaLabel: "Contact recruiting team",
            ctaHref: "#",
            secondaryCtaLabel: "View all policies",
            secondaryCtaHref: "#",
            secondaryCtaVariant: isDark ? "tertiary" : "secondary"
          }),
          `<section class="faq-widget ${isDark ? "faq-widget-dark" : "faq-widget-light"}" data-faq-widget>
            <div class="faq-list" role="list">
              ${faqListHtml}
            </div>
          </section>`
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    {
      className: `widget-shell widget-shell-faq ${
        isDark ? "widget-shell-dark widget-shell-faq-dark" : "widget-shell-light widget-shell-faq-light"
      }`
    }
  );
}

function renderFaqAccordionLightWidget() {
  return renderFaqAccordionWidget({ variant: "light" });
}

function renderFaqAccordionDarkWidget() {
  return renderFaqAccordionWidget({ variant: "dark" });
}

function renderPromoBannerWidget({ variant = "light" } = {}) {
  const isDark = variant === "dark";
  const promo = {
    title: "Accelerate your creative vision with AI-enabled technology",
    description:
      "As a creative strategist, you strive to invent, reinvent and reimagine what is possible. Join the creative minds to envision and build what is next.",
    ctaLabel: "View Creative Jobs",
    ctaHref: "#",
    secondaryCtaLabel: "Explore Teams",
    secondaryCtaHref: "#",
    imageSrc: isDark
      ? "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png"
      : "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png"
  };

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Promo banner",
            subtitle:
              "Background media with layered overlay keeps text readable across image variations while preserving clean spacing and hierarchy."
          }),
          `<article class="promo-banner-card ${isDark ? "promo-banner-card-dark" : "promo-banner-card-light"}">
            <figure class="promo-banner-media">
              ${image({ src: promo.imageSrc, alt: promo.title, className: "promo-banner-image" })}
            </figure>
            <div class="promo-banner-overlay"></div>
            <div class="promo-banner-content">
              ${heading(promo.title, { level: 3, style: "widget", className: "promo-banner-title" })}
              ${text(promo.description, { tone: "default", className: "promo-banner-copy" })}
              <div class="promo-banner-actions">
                ${link(promo.ctaLabel, { href: promo.ctaHref, className: "phw-btn phw-btn-primary phw-btn-inline" })}
                ${link(
                  promo.secondaryCtaLabel,
                  {
                    href: promo.secondaryCtaHref,
                    className: `phw-btn ${isDark ? "phw-btn-tertiary" : "phw-btn-secondary"} phw-btn-inline`
                  }
                )}
              </div>
            </div>
          </article>`
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    { className: "widget-shell widget-shell-promo" }
  );
}

function renderPromoBannerLightWidget() {
  return renderPromoBannerWidget({ variant: "light" });
}

function renderPromoBannerDarkWidget() {
  return renderPromoBannerWidget({ variant: "dark" });
}

function renderClassicCardGridWidget() {
  const cards = [
    {
      eyebrow: "Foundation",
      title: "Unified content structure",
      description:
        "Use one durable layout model across hiring pages, employer brand blocks, and campaign sections to keep implementation and governance simple.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      imageAlt: "Unified content structure illustration",
      ctaLabel: "Read guidelines",
      ctaHref: "#"
    },
    {
      eyebrow: "Layout",
      title: "Responsive by default",
      description:
        "Cards keep alignment and spacing quality from mobile to widescreen while preserving visual hierarchy and clear scanning order.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      imageAlt: "Responsive card layout example",
      ctaLabel: "View layout rules",
      ctaHref: "#"
    },
    {
      eyebrow: "Components",
      title: "Design-system composition",
      description:
        "Each card is assembled from existing DS primitives, making visual updates straightforward and reducing one-off implementation drift.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
      imageAlt: "Design system components overview",
      ctaLabel: "Open DS reference",
      ctaHref: "#"
    },
    {
      eyebrow: "Readability",
      title: "Editorial content tolerance",
      description:
        "The composition supports short and long text without collapsing spacing, clipping content, or forcing visual hacks in templates.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png",
      imageAlt: "Readable content layout",
      ctaLabel: "See content rules",
      ctaHref: "#"
    },
    {
      eyebrow: "Delivery",
      title: "Implementation-ready handoff",
      description:
        "The widget can be mapped directly to CMS fields with clear required/optional groups and repeatable structures for long-term maintainability.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      imageAlt: "Implementation handoff package",
      ctaLabel: "Review handoff",
      ctaHref: "#"
    },
    {
      eyebrow: "Quality",
      title: "Consistent visual polish",
      description:
        "Subtle hover feedback, dependable spacing, and restrained accents keep the grid professional for static, evergreen information.",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      imageAlt: "Polished static content cards",
      ctaLabel: "View quality checklist",
      ctaHref: "#"
    }
  ];

  const cardsHtml = cards.map((card) => {
    return `<article class="classic-card">
      <figure class="classic-card-media">
        ${image({ src: card.imageSrc, alt: card.imageAlt, className: "classic-card-image" })}
      </figure>
      ${stack(
        [
          card.eyebrow ? text(card.eyebrow, { as: "p", tone: "overline", className: "classic-card-eyebrow" }) : "",
          heading(card.title, { level: 3, style: "card" }),
          text(card.description, { tone: "muted" }),
          `<div class="classic-card-footer">
            ${link(card.ctaLabel, { href: card.ctaHref, className: "phw-inline-link classic-card-link" })}
          </div>`
        ],
        { className: "classic-card-content", gap: "var(--space-sm)" }
      )}
    </article>`;
  });

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Classic card grid",
            subtitle:
              "Evergreen static-content cards with consistent hierarchy, reusable field structure, and layout stability under varied editorial length.",
            ctaLabel: "View all resources",
            ctaHref: "#",
            secondaryCtaLabel: "Download kit",
            secondaryCtaHref: "#",
            secondaryCtaVariant: "secondary"
          }),
          grid(cardsHtml, {
            columns: 3,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 3, widescreen: 3 },
            className: "classic-card-grid",
            gap: "var(--space-lg)"
          })
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    { className: "widget-shell widget-shell-classic-grid widget-shell-light" }
  );
}

function renderFullImageCardGridWidget() {
  const cards = [
    {
      eyebrow: "Culture",
      title: "Design with clear ownership",
      description: "Align teams around one structure so content, layout, and implementation stay coherent across releases.",
      ctaLabel: "Read principle",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      imageAlt: "Team collaboration space"
    },
    {
      eyebrow: "Delivery",
      title: "Build reusable page sections",
      description: "Use consistent compositions that scale from campaign pages to evergreen platform content.",
      ctaLabel: "Open section guide",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      imageAlt: "Reusable page section preview"
    },
    {
      eyebrow: "Quality",
      title: "Keep spacing rhythm stable",
      description: "Token-based spacing prevents visual drift and preserves hierarchy across breakpoints.",
      ctaLabel: "View spacing rules",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
      imageAlt: "Structured UI layout"
    },
    {
      eyebrow: "Accessibility",
      title: "Readable overlays by default",
      description: "Layered scrims keep text contrast reliable on diverse imagery and in varied lighting conditions.",
      ctaLabel: "See accessibility notes",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png",
      imageAlt: "Overlay contrast example"
    },
    {
      eyebrow: "Governance",
      title: "Content model built for CMS",
      description: "Separate required and optional fields so editors can update safely without breaking card balance.",
      ctaLabel: "Review content model",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      imageAlt: "Content governance model"
    },
    {
      eyebrow: "UX",
      title: "Subtle motion with purpose",
      description: "Hover behavior guides attention without visual noise, while reduced-motion still feels complete.",
      ctaLabel: "Explore interactions",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      imageAlt: "Meaningful interaction states"
    }
  ];

  const cardsHtml = cards.map((card) =>
    `<article class="full-image-card">
      <figure class="full-image-card-media">
        ${image({ src: card.imageSrc, alt: card.imageAlt, className: "full-image-card-image" })}
      </figure>
      <div class="full-image-card-overlay"></div>
      ${stack(
        [
          text(card.eyebrow, { as: "p", tone: "overline", className: "full-image-card-eyebrow" }),
          heading(card.title, { level: 3, style: "card", className: "full-image-card-title" }),
          text(card.description, { tone: "default", className: "full-image-card-copy" }),
          `<div class="full-image-card-footer">
            ${link(card.ctaLabel, { href: card.ctaHref, className: "phw-inline-link full-image-card-link" })}
          </div>`
        ],
        { className: "full-image-card-content", gap: "var(--space-sm)" }
      )}
    </article>`
  );

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Full image card grid",
            subtitle:
              "A static-content card grid with full-card imagery and readable overlays. Built from DS primitives with predictable spacing and interaction states.",
            ctaLabel: "View all references",
            ctaHref: "#",
            secondaryCtaLabel: "Download examples",
            secondaryCtaHref: "#",
            secondaryCtaVariant: "secondary"
          }),
          grid(cardsHtml, {
            columns: 3,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 3, widescreen: 3 },
            className: "full-image-card-grid",
            gap: "var(--space-lg)"
          })
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    { className: "widget-shell widget-shell-full-image-grid widget-shell-light" }
  );
}

function renderFullImageCardGridDynamicWidget() {
  const cards = [
    {
      eyebrow: "Culture",
      title: "Design with clear ownership",
      description: "Align teams around one structure so content, layout, and implementation stay coherent across releases.",
      ctaLabel: "Read principle",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      imageAlt: "Team collaboration space"
    },
    {
      eyebrow: "Delivery",
      title: "Build reusable page sections",
      description: "Use consistent compositions that scale from campaign pages to evergreen platform content.",
      ctaLabel: "Open section guide",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      imageAlt: "Reusable page section preview"
    },
    {
      eyebrow: "Quality",
      title: "Keep spacing rhythm stable",
      description: "Token-based spacing prevents visual drift and preserves hierarchy across breakpoints.",
      ctaLabel: "View spacing rules",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
      imageAlt: "Structured UI layout"
    },
    {
      eyebrow: "Accessibility",
      title: "Readable overlays by default",
      description: "Layered scrims keep text contrast reliable on diverse imagery and in varied lighting conditions.",
      ctaLabel: "See accessibility notes",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png",
      imageAlt: "Overlay contrast example"
    },
    {
      eyebrow: "Governance",
      title: "Content model built for CMS",
      description: "Separate required and optional fields so editors can update safely without breaking card balance.",
      ctaLabel: "Review content model",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
      imageAlt: "Content governance model"
    },
    {
      eyebrow: "UX",
      title: "Subtle motion with purpose",
      description: "Hover behavior guides attention without visual noise, while reduced-motion still feels complete.",
      ctaLabel: "Explore interactions",
      ctaHref: "#",
      imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
      imageAlt: "Meaningful interaction states"
    }
  ];

  const cardsHtml = cards.map(
    (card) => `<article class="full-image-card full-image-card-dynamic">
      <figure class="full-image-card-media">
        ${image({ src: card.imageSrc, alt: card.imageAlt, className: "full-image-card-image" })}
      </figure>
      <div class="full-image-card-overlay"></div>
      ${stack(
        [
          text(card.eyebrow, { as: "p", tone: "overline", className: "full-image-card-eyebrow" }),
          heading(card.title, { level: 3, style: "card", className: "full-image-card-title" }),
          `<div class="full-image-card-reveal">
            ${text(card.description, { tone: "default", className: "full-image-card-copy" })}
            <div class="full-image-card-footer">
              ${link(card.ctaLabel, { href: card.ctaHref, className: "phw-inline-link full-image-card-link" })}
            </div>
          </div>`
        ],
        { className: "full-image-card-content", gap: "var(--space-sm)" }
      )}
    </article>`
  );

  return container(
    [
      stack(
        [
          renderSectionHeader({
            title: "Full image card grid · Dynamic",
            subtitle:
              "Description and CTA stay hidden by default and smoothly reveal on hover/focus, while title remains visible for fast scanning.",
            ctaLabel: "View all references",
            ctaHref: "#",
            secondaryCtaLabel: "Download examples",
            secondaryCtaHref: "#",
            secondaryCtaVariant: "secondary"
          }),
          grid(cardsHtml, {
            columns: 3,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 3, widescreen: 3 },
            className: "full-image-card-grid",
            gap: "var(--space-lg)"
          })
        ],
        { className: "widget-stack", gap: "var(--space-2xl)" }
      )
    ],
    { className: "widget-shell widget-shell-full-image-grid-dynamic widget-shell-light" }
  );
}

function renderMetricCardsLightWidget() {
  return renderMetricCardsWidget({ variant: "light" });
}

function renderMetricCardsDarkWidget() {
  return renderMetricCardsWidget({ variant: "dark" });
}

function renderMediaStepsLightWidget() {
  return renderMediaStepsWidget({ variant: "light" });
}

function renderMediaStepsDarkWidget() {
  return renderMediaStepsWidget({ variant: "dark" });
}

function renderVideoPopupLightWidget() {
  return renderVideoPopupWidget({ variant: "light" });
}

function renderVideoPopupDarkWidget() {
  return renderVideoPopupWidget({ variant: "dark" });
}

function renderEventRecommendationLightWidget() {
  return renderEventRecommendationWidget({ variant: "light" });
}

function renderEventRecommendationDarkWidget() {
  return renderEventRecommendationWidget({ variant: "dark" });
}

function renderMeetTeamLightWidget() {
  return renderMeetTeamWidget({ variant: "light" });
}

function renderMeetTeamDarkWidget() {
  return renderMeetTeamWidget({ variant: "dark" });
}

function renderCompanyProjectsLightWidget() {
  return renderCompanyProjectsWidget({ variant: "light" });
}

function renderCompanyProjectsDarkWidget() {
  return renderCompanyProjectsWidget({ variant: "dark" });
}

function renderHeroSearchBannerWidget() {
  const hero = {
    caption: "Careers",
    title: "Find your next role with teams that build what matters.",
    subtitle:
      "Search by role or department, then choose your preferred location. This hero uses a full-bleed image layer and content-first search controls.",
    imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_4.png",
    imageAlt: "People collaborating in a modern workplace",
    rolePlaceholder: "Role or department",
    locationPlaceholder: "Location",
    ctaLabel: "Search jobs"
  };

  return container(
    [
      `<section class="hero-search-widget">
        <figure class="hero-search-media">
          ${image({ src: hero.imageSrc, alt: hero.imageAlt, className: "hero-search-image" })}
        </figure>
        <div class="hero-search-overlay"></div>
        <div class="hero-search-content">
          ${stack(
            [
              text(hero.caption, { as: "p", tone: "overline", className: "hero-search-caption" }),
              heading(hero.title, { level: 2, style: "widget", className: "hero-search-title" }),
              text(hero.subtitle, { tone: "default", className: "hero-search-subtitle" })
            ],
            { className: "hero-search-copy", gap: "var(--space-sm)" }
          )}
          <form class="hero-search-form" action="#" method="get" role="search" aria-label="Job search">
            ${input({
              name: "role",
              placeholder: hero.rolePlaceholder,
              className: "hero-search-input",
              attrs: { "aria-label": "Role or department" }
            })}
            ${input({
              name: "location",
              placeholder: hero.locationPlaceholder,
              className: "hero-search-input",
              attrs: { "aria-label": "Location" }
            })}
            ${button(hero.ctaLabel, { variant: "primary", className: "hero-search-button", attrs: { type: "submit" } })}
          </form>
        </div>
      </section>`
    ],
    { className: "widget-shell widget-shell-hero-search widget-shell-light" }
  );
}

function renderHeroVideoSearchBannerWidget() {
  const hero = {
    caption: "Careers",
    title: "See the culture, then search the role that fits your growth.",
    subtitle:
      "Autoplay background video adds atmosphere while search stays clear and accessible across mobile, tablet, desktop, and widescreen.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    rolePlaceholder: "Role or department",
    locationPlaceholder: "Location",
    ctaLabel: "Search jobs"
  };

  return container(
    [
      `<section class="hero-search-widget hero-video-widget">
        <video class="hero-video-media" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="${hero.videoSrc}" type="video/mp4" />
        </video>
        <div class="hero-search-overlay"></div>
        <button
          type="button"
          class="phw-btn phw-btn-ghost-inverse phw-btn-inline hero-video-control"
          data-hero-video-toggle
          aria-pressed="false"
          aria-label="Pause background video"
        >
          ${icon("pause", { size: "md", className: "hero-video-control-icon" })}
        </button>
        <div class="hero-search-content">
          ${stack(
            [
              text(hero.caption, { as: "p", tone: "overline", className: "hero-search-caption" }),
              heading(hero.title, { level: 2, style: "widget", className: "hero-search-title" }),
              text(hero.subtitle, { tone: "default", className: "hero-search-subtitle" })
            ],
            { className: "hero-search-copy", gap: "var(--space-sm)" }
          )}
          <form class="hero-search-form" action="#" method="get" role="search" aria-label="Job search">
            ${input({
              name: "role",
              placeholder: hero.rolePlaceholder,
              className: "hero-search-input",
              attrs: { "aria-label": "Role or department" }
            })}
            ${input({
              name: "location",
              placeholder: hero.locationPlaceholder,
              className: "hero-search-input",
              attrs: { "aria-label": "Location" }
            })}
            ${button(hero.ctaLabel, { variant: "primary", className: "hero-search-button", attrs: { type: "submit" } })}
          </form>
        </div>
      </section>`
    ],
    { className: "widget-shell widget-shell-hero-search widget-shell-light" }
  );
}
function renderHeroSearchBannerCenteredWidget() {
  const hero = {
    caption: "Careers",
    title: "Find your next role with teams that build what matters.",
    subtitle:
      "Search by role or department, then choose your preferred location. This centered variant aligns content to the middle of the hero for stronger intro focus.",
    imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_3.png",
    imageAlt: "People collaborating in a modern workplace",
    rolePlaceholder: "Role or department",
    locationPlaceholder: "Location",
    ctaLabel: "Search jobs"
  };

  return container(
    [
      `<section class="hero-search-widget hero-search-widget-centered">
        <figure class="hero-search-media">
          ${image({ src: hero.imageSrc, alt: hero.imageAlt, className: "hero-search-image" })}
        </figure>
        <div class="hero-search-overlay"></div>
        <div class="hero-search-content">
          ${stack(
            [
              text(hero.caption, { as: "p", tone: "overline", className: "hero-search-caption" }),
              heading(hero.title, { level: 2, style: "widget", className: "hero-search-title" }),
              text(hero.subtitle, { tone: "default", className: "hero-search-subtitle" })
            ],
            { className: "hero-search-copy", gap: "var(--space-sm)" }
          )}
          <form class="hero-search-form" action="#" method="get" role="search" aria-label="Job search">
            ${input({
              name: "role",
              placeholder: hero.rolePlaceholder,
              className: "hero-search-input",
              attrs: { "aria-label": "Role or department" }
            })}
            ${input({
              name: "location",
              placeholder: hero.locationPlaceholder,
              className: "hero-search-input",
              attrs: { "aria-label": "Location" }
            })}
            ${button(hero.ctaLabel, { variant: "primary", className: "hero-search-button", attrs: { type: "submit" } })}
          </form>
        </div>
      </section>`
    ],
    { className: "widget-shell widget-shell-hero-search widget-shell-light" }
  );
}


function renderHeroSearchBannerCenteredButtonsWidget() {
  const hero = {
    caption: "Careers",
    title: "Find your next role with teams that build what matters.",
    subtitle:
      "Explore opportunities or learn more about teams. This variant replaces search inputs with direct actions.",
    imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_2.png",
    imageAlt: "People collaborating in a modern workplace",
    primaryCtaLabel: "Browse jobs",
    secondaryCtaLabel: "Learn about teams"
  };

  return container(
    [
      `<section class="hero-search-widget hero-search-widget-centered hero-search-widget-actions-only">
        <figure class="hero-search-media">
          ${image({ src: hero.imageSrc, alt: hero.imageAlt, className: "hero-search-image" })}
        </figure>
        <div class="hero-search-overlay"></div>
        <div class="hero-search-content">
          ${stack(
            [
              text(hero.caption, { as: "p", tone: "overline", className: "hero-search-caption" }),
              heading(hero.title, { level: 2, style: "widget", className: "hero-search-title" }),
              text(hero.subtitle, { tone: "default", className: "hero-search-subtitle" })
            ],
            { className: "hero-search-copy", gap: "var(--space-sm)" }
          )}
          <div class="hero-search-actions">
            ${link(hero.primaryCtaLabel, { href: "#", className: "phw-btn phw-btn-primary phw-btn-inline hero-search-button" })}
            ${link(hero.secondaryCtaLabel, { href: "#", className: "phw-btn phw-btn-tertiary phw-btn-inline hero-search-button-secondary" })}
          </div>
        </div>
      </section>`
    ],
    { className: "widget-shell widget-shell-hero-search widget-shell-light" }
  );
}


function renderHorizontalSplitCardWidget() {
  const card = {
    caption: "Featured team",
    title: "Build products with fast-moving, collaborative teams.",
    subtitle:
      "Join engineers, designers, and product leaders shipping customer-facing experiences with clear ownership and modern tooling.",
    imageSrc: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png",
    imageAlt: "Team collaborating around a desk",
    primaryCtaLabel: "Explore roles",
    secondaryCtaLabel: "Meet the team"
  };

  return container(
    [
      `<article class="horizontal-split-card" data-horizontal-split-card>
        <div class="horizontal-split-content">
          ${stack(
            [
              text(card.caption, { as: "p", tone: "overline", className: "horizontal-split-caption" }),
              heading(card.title, { level: 2, style: "widget", className: "horizontal-split-title" }),
              text(card.subtitle, { tone: "default", className: "horizontal-split-subtitle" }),
              `<div class="horizontal-split-actions">
                ${link(card.primaryCtaLabel, { href: "#", className: "phw-btn phw-btn-primary phw-btn-inline" })}
                ${link(card.secondaryCtaLabel, { href: "#", className: "phw-btn phw-btn-tertiary phw-btn-inline" })}
              </div>`
            ],
            { className: "horizontal-split-copy", gap: "var(--space-sm)" }
          )}
        </div>
        <figure class="horizontal-split-media">
          ${image({ src: card.imageSrc, alt: card.imageAlt, className: "horizontal-split-image" })}
        </figure>
      </article>`
    ],
    { className: "widget-shell widget-shell-horizontal-split widget-shell-light" }
  );
}



function renderLogoMarqueeWidget() {
  const logos = ["Atlas", "Nova", "Vertex", "BlueCore", "Northstar", "Lumina", "Orbit", "Helix", "Pulse", "Summit"];

  const logoItems = logos
    .map((name) => `<li class="logo-marquee-item"><span class="logo-marquee-mark" aria-hidden="true">${name.slice(0, 1)}</span><span class="logo-marquee-name">${name}</span></li>`)
    .join("");

  return container(
    [
      stack(
        [
          heading("Trusted by global teams", { level: 2, style: "widget" }),
          text("Normalized logo sizing with continuous right-to-left motion.", { tone: "default" }),
          `<div class="logo-marquee" aria-label="Partner logos">
            <ul class="logo-marquee-track">
              ${logoItems}
              ${logoItems}
            </ul>
          </div>`
        ],
        { className: "widget-stack", gap: "var(--space-xl)" }
      )
    ],
    { className: "widget-shell widget-shell-logo-marquee widget-shell-light" }
  );
}

function renderCompanyStatsWidget() {
  const cards = [
    { meta: "1,200+", title: "Employees worldwide", description: "Distributed teams across product, engineering, design, and operations." },
    { meta: "28", title: "Countries represented", description: "A global talent footprint with strong regional hiring programs." },
    { meta: "4.7/5", title: "Employee satisfaction", description: "Based on internal engagement and workplace-experience surveys." },
    { meta: "94%", title: "Offer acceptance rate", description: "Strong employer brand and candidate experience across pipelines." }
  ];

  const cardsHtml = cards.map((item) =>
    stack(
      [
        text(item.meta, { as: "p", tone: "overline", className: "company-stats-meta" }),
        heading(item.title, { level: 3, style: "card" }),
        text(item.description, { tone: "muted" })
      ],
      { className: "company-stats-card phw-card", gap: "var(--space-sm)" }
    )
  );

  return container(
    [
      stack(
        [
          heading("Company in stats", { level: 2, style: "widget" }),
          text("A static 4-card overview for quick trust and scale communication.", { tone: "default" }),
          grid(cardsHtml, {
            columns: 4,
            columnsByBreakpoint: { mobile: 1, tablet: 2, desktop: 4, widescreen: 4 },
            className: "company-stats-grid",
            gap: "var(--space-md)"
          })
        ],
        { className: "widget-stack", gap: "var(--space-lg)" }
      )
    ],
    { className: "widget-shell widget-shell-company-stats widget-shell-light" }
  );
}

function renderRecommendedJobsWidget() {
  const widgetCopy = {
    caption: "Recommended for you",
    title: "Open roles matching your profile",
    subtitle:
      "This widget is data-driven and currently uses a local fake DB adapter. Swap the data provider to your real endpoint later without changing widget markup.",
    primaryCtaLabel: "View all jobs",
    secondaryCtaLabel: "Set job alerts"
  };

  const jobResults = getRecommendedJobs({ roleOrDepartment: "", location: "", limit: 4 });
  const dataSourcePath = getRecommendedJobsEndpoint();

  const jobCards = jobResults
    .map(
      (job) => {
        const extraTags = Array.isArray(job.tags) ? job.tags : [];
        const extraTagPills = extraTags.map((tag) => `<span class="recommended-job-pill">${tag}</span>`).join("");
        return `<article class="recommended-job-card" data-job-id="${job.id}">
        <div class="recommended-job-main">
          ${text(job.department, { as: "p", tone: "overline", className: "recommended-job-department" })}
          ${heading(job.title, { level: 3, style: "card", className: "recommended-job-title" })}
          <p class="recommended-job-meta">
            <span class="recommended-job-pill">${job.location}</span>
            <span class="recommended-job-pill">${job.workplace}</span>
            <span class="recommended-job-pill">${job.employmentType}</span>
            ${extraTagPills}
          </p>
        </div>
        <div class="recommended-job-footer">
          ${link("See role", { href: `#/jobs/${job.slug}`, className: "phw-inline-link recommended-job-cta" })}
          ${iconButton({
            iconName: "save",
            size: "sm",
            shape: "circle",
            label: `Save ${job.title}`,
            className: "recommended-job-save",
            attrs: { "data-save-job-id": job.id }
          })}
        </div>
      </article>`;
      }
    )
    .join("");

  return container(
    [
      stack(
        [
          stack(
            [
              text(widgetCopy.caption, { as: "p", tone: "overline" }),
              heading(widgetCopy.title, { level: 2, style: "widget" }),
              text(widgetCopy.subtitle, { tone: "default" })
            ],
            { className: "recommended-jobs-copy", gap: "var(--space-sm)" }
          ),
          `<div class="recommended-jobs-actions">
            ${link(widgetCopy.primaryCtaLabel, { href: "#", className: "phw-btn phw-btn-primary phw-btn-inline" })}
            ${link(widgetCopy.secondaryCtaLabel, { href: "#", className: "phw-btn phw-btn-tertiary phw-btn-inline" })}
          </div>`,
          `<section class="recommended-jobs-list" role="list" aria-label="Recommended jobs from data source">
            ${jobCards}
          </section>`,
          `<p class="recommended-jobs-source">Data source: <code>${dataSourcePath}</code> (mock adapter)</p>`
        ],
        { className: "widget-stack", gap: "var(--space-xl)" }
      )
    ],
    { className: "widget-shell widget-shell-recommended-jobs widget-shell-light" }
  );
}

function renderRecommendedJobsWidgetV2() {
  const widgetCopy = {
    caption: "Recommended for you",
    title: "Curated roles based on your profile",
    subtitle:
      "Same dynamic data source, redesigned layout. A featured job leads the view while additional recommendations stay quickly scannable.",
    primaryCtaLabel: "Explore all jobs",
    secondaryCtaLabel: "Set alerts"
  };

  const jobResults = getRecommendedJobs({ roleOrDepartment: "", location: "", limit: 4 });
  const dataSourcePath = getRecommendedJobsEndpoint();
  const [featuredJob, ...secondaryJobs] = jobResults;

  const featuredPosted = featuredJob ? new Date(featuredJob.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

  const featuredCard = featuredJob
    ? (() => {
        const featuredTags = Array.isArray(featuredJob.tags) ? featuredJob.tags : [];
        const featuredTagPills = featuredTags.map((tag) => `<span class="recommended-v2-pill">${tag}</span>`).join("");
        return `<article class="recommended-v2-featured" data-job-id="${featuredJob.id}">
        ${iconButton({
          iconName: "save",
          size: "sm",
          shape: "circle",
          label: `Save ${featuredJob.title}`,
          className: "recommended-v2-save",
          attrs: { "data-save-job-id": featuredJob.id }
        })}
        <div class="recommended-v2-featured-main">
          ${text(featuredJob.department, { as: "p", tone: "overline", className: "recommended-v2-department" })}
          ${heading(featuredJob.title, { level: 3, style: "widget", className: "recommended-v2-title" })}
          <p class="recommended-v2-meta">
            <span class="recommended-v2-pill">${featuredJob.location}</span>
            <span class="recommended-v2-pill">${featuredJob.workplace}</span>
            <span class="recommended-v2-pill">${featuredJob.employmentType}</span>
            <span class="recommended-v2-pill">Posted ${featuredPosted}</span>
            ${featuredTagPills}
          </p>
        </div>
        <div class="recommended-v2-featured-actions">
          ${link("See role", { href: `#/jobs/${featuredJob.slug}`, className: "phw-inline-link" })}
        </div>
      </article>`;
      })()
    : "";

  const secondaryCards = secondaryJobs
    .map((job) => {
      const posted = new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const extraTags = Array.isArray(job.tags) ? job.tags : [];
      const extraTagPills = extraTags.map((tag) => `<span class="recommended-v2-pill">${tag}</span>`).join("");
      return `<article class="recommended-v2-card" data-job-id="${job.id}">
        ${iconButton({
          iconName: "save",
          size: "sm",
          shape: "circle",
          label: `Save ${job.title}`,
          className: "recommended-v2-save",
          attrs: { "data-save-job-id": job.id }
        })}
        <div class="recommended-v2-card-main">
          ${text(job.department, { as: "p", tone: "overline", className: "recommended-v2-department" })}
          ${heading(job.title, { level: 3, style: "card", className: "recommended-v2-card-title" })}
          <p class="recommended-v2-meta">
            <span class="recommended-v2-pill">${job.location}</span>
            <span class="recommended-v2-pill">${job.workplace}</span>
            <span class="recommended-v2-pill">Posted ${posted}</span>
            ${extraTagPills}
          </p>
        </div>
        ${link("See role", { href: `#/jobs/${job.slug}`, className: "phw-inline-link" })}
      </article>`;
    })
    .join("");

  return container(
    [
      stack(
        [
          `<section class="recommended-v2-head">
            ${stack(
              [
                text(widgetCopy.caption, { as: "p", tone: "overline" }),
                heading(widgetCopy.title, { level: 2, style: "widget" }),
                text(widgetCopy.subtitle, { tone: "default" })
              ],
              { className: "recommended-v2-copy", gap: "var(--space-sm)" }
            )}
            <div class="recommended-v2-actions">
              ${link(widgetCopy.primaryCtaLabel, { href: "#", className: "phw-btn phw-btn-primary phw-btn-inline" })}
              ${link(widgetCopy.secondaryCtaLabel, { href: "#", className: "phw-btn phw-btn-secondary phw-btn-inline" })}
            </div>
          </section>`,
          `<section class="recommended-v2-layout" role="list" aria-label="Recommended jobs from data source">
            ${featuredCard}
            <div class="recommended-v2-list">${secondaryCards}</div>
          </section>`,
          `<p class="recommended-jobs-source">Data source: <code>${dataSourcePath}</code> (mock adapter)</p>`
        ],
        { className: "widget-stack", gap: "var(--space-xl)" }
      )
    ],
    { className: "widget-shell widget-shell-recommended-jobs widget-shell-recommended-jobs-v2 widget-shell-light" }
  );
}

function renderRecommendedJobsWidgetOneColumn() {
  const widgetCopy = {
    caption: "Recommended for you",
    title: "Open roles matching your profile",
    subtitle: "Single-column layout variant for narrower placements and long-content tolerance.",
    primaryCtaLabel: "View all jobs"
  };

  const jobResults = getRecommendedJobs({ roleOrDepartment: "", location: "", limit: 3 });
  const dataSourcePath = getRecommendedJobsEndpoint();

  const jobCards = jobResults
    .map((job) => {
      const extraTags = Array.isArray(job.tags) ? job.tags : [];
      const extraTagPills = extraTags.map((tag) => `<span class="recommended-job-pill">${tag}</span>`).join("");
      return `<article class="recommended-job-card" data-job-id="${job.id}">
        <div class="recommended-job-main">
          ${text(job.department, { as: "p", tone: "overline", className: "recommended-job-department" })}
          ${heading(job.title, { level: 3, style: "card", className: "recommended-job-title" })}
          <p class="recommended-job-meta">
            <span class="recommended-job-pill">${job.location}</span>
            <span class="recommended-job-pill">${job.workplace}</span>
            <span class="recommended-job-pill">${job.employmentType}</span>
            ${extraTagPills}
          </p>
        </div>
        <div class="recommended-job-footer">
          ${link("See role", { href: `#/jobs/${job.slug}`, className: "phw-inline-link recommended-job-cta" })}
          ${iconButton({
            iconName: "save",
            size: "sm",
            shape: "circle",
            label: `Save ${job.title}`,
            className: "recommended-job-save",
            attrs: { "data-save-job-id": job.id }
          })}
        </div>
      </article>`;
    })
    .join("");

  return container(
    [
      stack(
        [
          stack(
            [
              text(widgetCopy.caption, { as: "p", tone: "overline" }),
              heading(widgetCopy.title, { level: 2, style: "widget" }),
              text(widgetCopy.subtitle, { tone: "default" })
            ],
            { className: "recommended-jobs-copy", gap: "var(--space-sm)" }
          ),
          `<section class="recommended-jobs-list recommended-jobs-list-single" role="list" aria-label="Recommended jobs from data source">
            ${jobCards}
          </section>`,
          `<div class="recommended-jobs-footer-action">
            ${link(widgetCopy.primaryCtaLabel, { href: "#", className: "phw-btn phw-btn-primary phw-btn-inline" })}
          </div>`,
          `<p class="recommended-jobs-source">Data source: <code>${dataSourcePath}</code> (mock adapter)</p>`
        ],
        { className: "widget-stack", gap: "var(--space-xl)" }
      )
    ],
    { className: "widget-shell widget-shell-recommended-jobs widget-shell-recommended-jobs-compact widget-shell-light" }
  );
}

function renderResumeSearchLightWidget() {
  const content = {
    caption: "Recommended",
    title: "Get matched in 10 seconds!",
    subtitle: "Upload your resume and let AI find the best jobs for you",
    ctaLabel: "Search with Resume"
  };

  return container(
    [
      `<section class="resume-search-widget-light">
        <div class="resume-search-panel">
          ${stack(
            [
              text(content.caption, { as: "p", tone: "overline", className: "resume-search-caption" }),
              heading(content.title, { level: 2, style: "widget", className: "resume-search-title" }),
              text(content.subtitle, { tone: "default", className: "resume-search-subtitle" }),
              button(content.ctaLabel, {
                variant: "primary",
                className: "resume-search-cta",
                attrs: { type: "button", "data-resume-open": "true" }
              })
            ],
            { className: "resume-search-stack", gap: "var(--space-md)" }
          )}
        </div>
      </section>`
    ],
    { className: "widget-shell widget-shell-resume-search-light widget-shell-light" }
  );
}

function renderJobCategoryCardsWidget() {
  const categories = [
    {
      title: "Engineering",
      description: "Frontend, backend, platform, and QA roles building core product experiences.",
      href: "#/jobs/categories/engineering"
    },
    {
      title: "Product & Design",
      description: "Product managers, UX, UI, and research opportunities across global teams.",
      href: "#/jobs/categories/product-design"
    },
    {
      title: "Data & AI",
      description: "Data science, analytics, ML engineering, and applied AI positions.",
      href: "#/jobs/categories/data-ai"
    },
    {
      title: "Sales & Customer Success",
      description: "Revenue, partnerships, onboarding, and long-term customer growth roles.",
      href: "#/jobs/categories/sales-success"
    },
    {
      title: "Marketing & Content",
      description: "Brand, lifecycle, content strategy, and demand generation openings.",
      href: "#/jobs/categories/marketing-content"
    },
    {
      title: "People & Operations",
      description: "Talent acquisition, HR, workplace, finance, and operations roles.",
      href: "#/jobs/categories/people-operations"
    }
  ];

  const cards = categories
    .map(
      (category) => `<a class="job-category-card" href="${category.href}" aria-label="${category.title} category">
        <figure class="job-category-icon-wrap">
          ${icon("file", { size: "sm", className: "job-category-icon", attrs: { "aria-hidden": "true" } })}
        </figure>
        <div class="job-category-card-main">
          ${heading(category.title, { level: 3, style: "card", className: "job-category-title" })}
          ${text(category.description, { tone: "muted", className: "job-category-description" })}
        </div>
        <div class="job-category-card-footer">
          <span class="job-category-arrow" aria-hidden="true">${icon("chevronRight", { size: "sm" })}</span>
        </div>
      </a>`
    )
    .join("");

  return container(
    [
      stack(
        [
          heading("Browse jobs by category", { level: 2, style: "widget" }),
          text("Select a category to jump directly to relevant openings. Entire cards are clickable for faster navigation.", { tone: "default" }),
          `<section class="job-category-grid" role="list" aria-label="Job categories">
            ${cards}
          </section>`
        ],
        { className: "widget-stack", gap: "var(--space-lg)" }
      )
    ],
    { className: "widget-shell widget-shell-job-categories widget-shell-light" }
  );
}

export function getWidgetDefinitions() {
  return [
    {
      id: "content-cards-light",
      label: "Content Cards Light",
      meta: "Widget 1 · Content cards light (rebuilt)",
      render: renderMetricCardsLightWidget
    },
    {
      id: "content-cards-dark",
      label: "Content Cards Dark",
      meta: "Widget 2 · Content cards dark (rebuilt)",
      render: renderMetricCardsDarkWidget
    },
    {
      id: "media-cards-light",
      label: "Media Cards Light",
      meta: "Widget 3 · Media cards light (rebuilt)",
      render: renderMediaStepsLightWidget
    },
    {
      id: "media-cards-dark",
      label: "Media Cards Dark",
      meta: "Widget 4 · Media cards dark (rebuilt)",
      render: renderMediaStepsDarkWidget
    },
    {
      id: "video-popup-light",
      label: "Video Popup Light",
      meta: "Widget 5 · Video popup light (rebuilt)",
      render: renderVideoPopupLightWidget
    },
    {
      id: "video-popup-dark",
      label: "Video Popup Dark",
      meta: "Widget 6 · Video popup dark (rebuilt)",
      render: renderVideoPopupDarkWidget
    },
    {
      id: "event-recommendations-light",
      label: "Event Recommendations Light",
      meta: "Widget 7 · Event recommendations light (bento grid)",
      render: renderEventRecommendationLightWidget
    },
    {
      id: "event-recommendations-dark",
      label: "Event Recommendations Dark",
      meta: "Widget 8 · Event recommendations dark (bento grid)",
      render: renderEventRecommendationDarkWidget
    },
    {
      id: "meet-the-team-light",
      label: "Meet the Team Light",
      meta: "Widget 9 · Meet the team light",
      render: renderMeetTeamLightWidget
    },
    {
      id: "meet-the-team-dark",
      label: "Meet the Team Dark",
      meta: "Widget 10 · Meet the team dark",
      render: renderMeetTeamDarkWidget
    },
    {
      id: "company-projects-light",
      label: "Company Projects Light",
      meta: "Widget 11 · Company projects light",
      render: renderCompanyProjectsLightWidget
    },
    {
      id: "company-projects-dark",
      label: "Company Projects Dark",
      meta: "Widget 12 · Company projects dark",
      render: renderCompanyProjectsDarkWidget
    },
    {
      id: "faq-accordion-light",
      label: "FAQ Accordion Light",
      meta: "Widget 13 · FAQ accordion light",
      render: renderFaqAccordionLightWidget
    },
    {
      id: "faq-accordion-dark",
      label: "FAQ Accordion Dark",
      meta: "Widget 14 · FAQ accordion dark",
      render: renderFaqAccordionDarkWidget
    },
    {
      id: "promo-banner-light",
      label: "Promo Banner Light",
      meta: "Widget 15 · Promo banner light",
      render: renderPromoBannerLightWidget
    },
    {
      id: "promo-banner-dark",
      label: "Promo Banner Dark",
      meta: "Widget 16 · Promo banner dark",
      render: renderPromoBannerDarkWidget
    },
    {
      id: "classic-card-grid",
      label: "Classic Card Grid",
      meta: "Widget 17 · Classic card grid",
      render: renderClassicCardGridWidget
    },
    {
      id: "full-image-card-grid",
      label: "Immersive Media Card Grid",
      meta: "Widget 18 · Immersive media card grid",
      render: renderFullImageCardGridWidget
    },
    {
      id: "full-image-card-grid-dynamic",
      label: "Immersive Media Grid Interactive",
      meta: "Widget 19 · Interactive immersive media grid",
      render: renderFullImageCardGridDynamicWidget
    },
    {
      id: "hero-search-banner",
      label: "Hero Search Banner",
      meta: "Widget 20 · Hero banner with double search",
      render: renderHeroSearchBannerWidget
    },
    {
      id: "hero-video-search-banner",
      label: "Video Hero Job Search",
      meta: "Widget 21 · Video hero with search and playback control",
      render: renderHeroVideoSearchBannerWidget
    },
    {
      id: "hero-search-banner-centered",
      label: "Centered Hero Job Search",
      meta: "Widget 22 · Centered hero with dual search fields",
      render: renderHeroSearchBannerCenteredWidget
    },
    {
      id: "hero-search-banner-centered-buttons",
      label: "Centered Hero Action Banner",
      meta: "Widget 23 · Centered hero with dual actions",
      render: renderHeroSearchBannerCenteredButtonsWidget
    },
    {
      id: "horizontal-split-card",
      label: "Horizontal Split Card",
      meta: "Widget 24 · Horizontal card 50/50",
      render: renderHorizontalSplitCardWidget
    },
    {
      id: "logo-marquee",
      label: "Logo Marquee",
      meta: "Widget 25 · Infinite scrolling logos",
      render: renderLogoMarqueeWidget
    },
    {
      id: "recommended-jobs-dynamic",
      label: "Recommended Jobs Feed",
      meta: "Widget 26 · Data-driven recommended jobs feed",
      render: renderRecommendedJobsWidget
    },
    {
      id: "recommended-jobs-dynamic-v2",
      label: "Recommended Jobs Spotlight",
      meta: "Widget 27 · Spotlight layout for recommended jobs",
      render: renderRecommendedJobsWidgetV2
    },
    {
      id: "recommended-jobs-dynamic-one-column",
      label: "Recommended Jobs One Column",
      meta: "Widget 28 · Single-column recommended jobs layout",
      render: renderRecommendedJobsWidgetOneColumn
    },
    {
      id: "resume-search-light",
      label: "Resume Search Light",
      meta: "Widget 29 · Search by resume with upload modal",
      render: renderResumeSearchLightWidget
    },
    {
      id: "company-stats-static",
      label: "Company Stats Static",
      meta: "Widget 30 · Company in stats 4-card static",
      render: renderCompanyStatsWidget
    },
    {
      id: "job-category-cards",
      label: "Job Category Cards",
      meta: "Widget 31 · Clickable job category navigation cards",
      render: renderJobCategoryCardsWidget
    }
  ];
}
export function renderWidget(definition) {
  return `<section class="widget-preview-block">
    <p class="widget-label">${definition.meta}</p>
    ${definition.render()}
  </section>`;
}


























