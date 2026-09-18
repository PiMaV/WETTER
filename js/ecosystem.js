/**
 * WETTER ecosystem diagram: data-driven SVG edges (always on).
 *
 * Layout contract (desktop ≥821px):
 * - Stage is a CSS grid: Viewers → Curated | Direct | Sidecars → Ocean.
 * - Edges are straight vertical hops, centered on the cards (not group frames).
 * - Direct is one Ocean→Viewers hop in the gap between BLITZ and DONNER.
 * - Edges: quiet pulse (direction without arrowheads).
 * - Below 821px the stage is a normal flow stack; edges are not drawn.
 */
(function () {
  const stage = document.querySelector("[data-eco-stage]");
  const svg = document.querySelector("[data-eco-edges]");
  if (!stage || !svg) return;

  const DESKTOP_MQ = window.matchMedia("(min-width: 821px)");
  const NS = "http://www.w3.org/2000/svg";

  /** @type {{ id: string, from: string, to: string, group: "direct" | "wolke" | "sidecar" }[]} */
  const EDGES = [
    { id: "ocean-curated", from: "raw-data-ocean", to: "wolke", group: "direct" },
    { id: "ocean-sidecars", from: "raw-data-ocean", to: "evt", group: "direct" },
    { id: "ocean-direct", from: "raw-data-ocean", to: "viewers", group: "direct" },
    { id: "dampf-wolke", from: "dampf", to: "wolke", group: "wolke" },
    { id: "keim-wolke", from: "keim", to: "wolke", group: "wolke" },
    { id: "wolke-blitz", from: "wolke", to: "blitz", group: "wolke" },
    { id: "evt-donner", from: "evt", to: "donner", group: "sidecar" },
  ];

  /** Soft emphasis only — never dims the rest. */
  const EMPHASIZE = {
    curated: "wolke",
    dampf: "wolke",
    keim: "wolke",
    wolke: "wolke",
    sidecars: "sidecar",
    evt: "sidecar",
    direct: "direct",
  };

  function nodeEl(id) {
    return stage.querySelector(`[data-node="${id}"]`);
  }

  function stagePoint(clientX, clientY) {
    const sr = stage.getBoundingClientRect();
    return { x: clientX - sr.left, y: clientY - sr.top };
  }

  function localX(clientX) {
    return stagePoint(clientX, 0).x;
  }

  function localY(clientY) {
    return stagePoint(0, clientY).y;
  }

  function box(el) {
    return el.getBoundingClientRect();
  }

  /** Horizontal center of a card. */
  function centerX(el) {
    const r = box(el);
    return localX(r.left + r.width / 2);
  }

  function topY(el) {
    return localY(box(el).top);
  }

  function bottomY(el) {
    return localY(box(el).bottom);
  }

  function verticalPath(x, y1, y2) {
    return `M ${x} ${y1} L ${x} ${y2}`;
  }

  function endpoints(edge) {
    const ocean = nodeEl("raw-data-ocean");
    const blitz = nodeEl("blitz");
    const donner = nodeEl("donner");
    const wolke = nodeEl("wolke");
    const dampf = nodeEl("dampf");
    const keim = nodeEl("keim");
    const evt = nodeEl("evt");

    if (edge.id === "ocean-direct" && blitz && donner && ocean) {
      const x = (localX(box(blitz).right) + localX(box(donner).left)) / 2;
      return { x, y1: topY(ocean), y2: bottomY(blitz) };
    }

    if (edge.id === "ocean-curated" && ocean && wolke) {
      const x = centerX(wolke);
      return { x, y1: topY(ocean), y2: bottomY(wolke) };
    }

    if (edge.id === "ocean-sidecars" && ocean && evt) {
      const x = centerX(evt);
      return { x, y1: topY(ocean), y2: bottomY(evt) };
    }

    if (edge.id === "dampf-wolke" && dampf && wolke) {
      const x = centerX(dampf);
      return { x, y1: topY(dampf), y2: bottomY(wolke) };
    }

    if (edge.id === "keim-wolke" && keim && wolke) {
      const x = centerX(keim);
      return { x, y1: topY(keim), y2: bottomY(wolke) };
    }

    if (edge.id === "wolke-blitz" && wolke && blitz) {
      const x = centerX(wolke);
      return { x, y1: topY(wolke), y2: bottomY(blitz) };
    }

    if (edge.id === "evt-donner" && evt && donner) {
      const x = centerX(evt);
      return { x, y1: topY(evt), y2: bottomY(donner) };
    }

    return null;
  }

  function clearEdges() {
    svg.querySelectorAll("path[data-edge-id]").forEach((p) => p.remove());
    stage.classList.remove("is-desktop-edges");
  }

  function upsertPath(map, id, role, group, d) {
    const key = `${id}::${role}`;
    let path = map.get(key);
    if (!path) {
      path = document.createElementNS(NS, "path");
      path.setAttribute("data-edge-id", id);
      path.setAttribute("data-edge-role", role);
      path.setAttribute("data-group", group);
      svg.appendChild(path);
    } else {
      map.delete(key);
    }
    path.setAttribute("d", d);
    path.setAttribute("data-group", group);
    return path;
  }

  function drawEdges() {
    if (!DESKTOP_MQ.matches) {
      clearEdges();
      return;
    }

    stage.classList.add("is-desktop-edges");

    const sr = stage.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${sr.width} ${sr.height}`);
    svg.setAttribute("width", String(sr.width));
    svg.setAttribute("height", String(sr.height));

    const existing = new Map(
      [...svg.querySelectorAll("path[data-edge-id]")].map((p) => [
        `${p.getAttribute("data-edge-id")}::${p.getAttribute("data-edge-role") || "flow"}`,
        p,
      ])
    );

    for (const edge of EDGES) {
      const ends = endpoints(edge);
      if (!ends) continue;
      const d = verticalPath(ends.x, ends.y1, ends.y2);
      upsertPath(existing, edge.id, "base", edge.group, d);
      upsertPath(existing, edge.id, "flow", edge.group, d);
    }

    for (const stale of existing.values()) stale.remove();
  }

  function applyEmphasis(nodeId) {
    const group = EMPHASIZE[nodeId];
    clearEmphasis();
    if (!group) return;
    const cls =
      group === "wolke"
        ? "is-emphasize-wolke"
        : group === "sidecar"
          ? "is-emphasize-sidecar"
          : "is-emphasize-direct";
    stage.classList.add(cls);
  }

  function clearEmphasis() {
    stage.classList.remove(
      "is-emphasize-wolke",
      "is-emphasize-sidecar",
      "is-emphasize-direct"
    );
  }

  function bindSoftEmphasis(el, nodeId) {
    if (!nodeId || !EMPHASIZE[nodeId]) return;
    el.addEventListener("pointerenter", () => applyEmphasis(nodeId));
    el.addEventListener("pointerleave", clearEmphasis);
    el.addEventListener("focus", () => applyEmphasis(nodeId));
    el.addEventListener("blur", clearEmphasis);
  }

  stage.querySelectorAll("[data-node]").forEach((el) => {
    const id = el.getAttribute("data-hover-node") || el.getAttribute("data-node");
    bindSoftEmphasis(el, id);
  });
  stage.querySelectorAll("[data-hover-node]").forEach((el) => {
    if (el.hasAttribute("data-node")) return;
    bindSoftEmphasis(el, el.getAttribute("data-hover-node"));
  });

  /** Tap/focus tooltips on touch devices (hover alone is unreliable). */
  function bindTipHost(host) {
    const tip = host.querySelector(":scope > .eco-tip");
    if (!tip) return;

    host.addEventListener("click", (event) => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (event.target instanceof Element && event.target.closest("a")) return;
      const open = host.classList.contains("is-tip-open");
      stage.querySelectorAll(".is-tip-open").forEach((n) => {
        n.classList.remove("is-tip-open");
      });
      if (!open) {
        host.classList.add("is-tip-open");
      }
    });
  }

  stage.querySelectorAll(".eco-node").forEach(bindTipHost);
  stage.querySelectorAll(".eco-ocean-tile").forEach(bindTipHost);

  document.addEventListener("pointerdown", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(".is-tip-open")) return;
    stage.querySelectorAll(".is-tip-open").forEach((n) => {
      n.classList.remove("is-tip-open");
    });
  });

  let resizeTimer = 0;
  const scheduleDraw = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(drawEdges, 40);
  };

  window.addEventListener("resize", scheduleDraw);
  if (typeof DESKTOP_MQ.addEventListener === "function") {
    DESKTOP_MQ.addEventListener("change", scheduleDraw);
  } else if (typeof DESKTOP_MQ.addListener === "function") {
    DESKTOP_MQ.addListener(scheduleDraw);
  }
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(scheduleDraw).observe(stage);
  }

  requestAnimationFrame(() => {
    drawEdges();
    requestAnimationFrame(drawEdges);
  });

  document.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.key !== "b" && event.key !== "B") return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.closest("input, textarea, select, [contenteditable='true']")
    ) {
      return;
    }
    document.body.classList.toggle("is-bg-off");
  });
})();
