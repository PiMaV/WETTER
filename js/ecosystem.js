/**
 * WETTER ecosystem diagram: data-driven edges + hover highlight.
 *
 * Layout contract (desktop):
 * - Blocks are absolutely placed with --x/--y/--w % on the stage (edit in index.html).
 * - Ocean docks rise under each target’s horizontal center.
 * - Curated + sidecars are group nodes; one path style for all edges.
 */
(function () {
  const stage = document.querySelector("[data-eco-stage]");
  const svg = document.querySelector("[data-eco-edges]");
  if (!stage || !svg) return;

  /** @type {{ id: string, from: string, to: string, group: "direct" | "wolke" | "sidecar" }[]} */
  const EDGES = [
    { id: "ocean-curated", from: "raw-data-ocean", to: "curated", group: "wolke" },
    { id: "ocean-donner", from: "raw-data-ocean", to: "donner", group: "direct" },
    { id: "ocean-blitz", from: "raw-data-ocean", to: "blitz", group: "direct" },
    { id: "ocean-sidecars", from: "raw-data-ocean", to: "sidecars", group: "sidecar" },
    { id: "dampf-keim", from: "dampf", to: "keim", group: "wolke" },
    { id: "keim-wolke", from: "keim", to: "wolke", group: "wolke" },
    { id: "wolke-blitz", from: "wolke", to: "blitz", group: "wolke" },
    { id: "wolke-donner", from: "wolke", to: "donner", group: "wolke" },
    { id: "sidecars-blitz", from: "sidecars", to: "blitz", group: "sidecar" },
    { id: "sidecars-donner", from: "sidecars", to: "donner", group: "sidecar" },
  ];

  const WOLKE_PATH = [
    "ocean-curated",
    "dampf-keim",
    "keim-wolke",
    "wolke-blitz",
    "wolke-donner",
  ];

  const SIDECAR_PATH = ["ocean-sidecars", "sidecars-blitz", "sidecars-donner"];

  const HOVER_EDGES = {
    blitz: ["ocean-blitz", "wolke-blitz", "sidecars-blitz"],
    donner: ["ocean-donner", "wolke-donner", "sidecars-donner"],
    curated: WOLKE_PATH,
    wolke: WOLKE_PATH,
    dampf: WOLKE_PATH,
    keim: WOLKE_PATH,
    sidecars: SIDECAR_PATH,
    "raw-data-ocean": [
      "ocean-curated",
      "ocean-donner",
      "ocean-blitz",
      "ocean-sidecars",
    ],
  };

  function nodeEl(id) {
    return stage.querySelector(`[data-node="${id}"]`);
  }

  function stagePoint(clientX, clientY) {
    const sr = stage.getBoundingClientRect();
    return { x: clientX - sr.left, y: clientY - sr.top };
  }

  /** Ocean dock: rise under the target's horizontal center (clamped to ocean). */
  function oceanDock(oceanEl, targetEl) {
    const o = oceanEl.getBoundingClientRect();
    const t = targetEl.getBoundingClientRect();
    const pad = 12;
    const x = Math.min(
      o.right - pad,
      Math.max(o.left + pad, t.left + t.width / 2)
    );
    return stagePoint(x, o.top);
  }

  function sideAnchor(el, toward) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    if (!toward) return stagePoint(cx, cy);

    const tx = toward.left + toward.width / 2;
    const ty = toward.top + toward.height / 2;
    const dx = tx - cx;
    const dy = ty - cy;

    if (Math.abs(dx) > Math.abs(dy)) {
      return stagePoint(dx > 0 ? r.right : r.left, cy);
    }
    return stagePoint(cx, dy > 0 ? r.bottom : r.top);
  }

  function bottomCenter(el) {
    const r = el.getBoundingClientRect();
    return stagePoint(r.left + r.width / 2, r.bottom);
  }

  function curvePath(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (Math.abs(dx) < 8) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
    const cx1 = x1 + dx * 0.15;
    const cy1 = y1 + dy * 0.55;
    const cx2 = x2 - dx * 0.15;
    const cy2 = y2 - dy * 0.55;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  function endpoints(edge, fromEl, toEl) {
    if (edge.from === "raw-data-ocean") {
      return {
        a: oceanDock(fromEl, toEl),
        b: bottomCenter(toEl),
      };
    }
    const toRect = toEl.getBoundingClientRect();
    const fromRect = fromEl.getBoundingClientRect();
    return {
      a: sideAnchor(fromEl, toRect),
      b: sideAnchor(toEl, fromRect),
    };
  }

  function drawEdges() {
    const sr = stage.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${sr.width} ${sr.height}`);
    svg.setAttribute("width", String(sr.width));
    svg.setAttribute("height", String(sr.height));

    const existing = new Map(
      [...svg.querySelectorAll("path[data-edge-id]")].map((p) => [
        p.getAttribute("data-edge-id"),
        p,
      ])
    );

    for (const edge of EDGES) {
      const fromEl = nodeEl(edge.from);
      const toEl = nodeEl(edge.to);
      if (!fromEl || !toEl) continue;

      const { a, b } = endpoints(edge, fromEl, toEl);
      const d = curvePath(a.x, a.y, b.x, b.y);

      let path = existing.get(edge.id);
      if (!path) {
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("data-edge-id", edge.id);
        path.setAttribute("data-group", edge.group);
        svg.appendChild(path);
      } else {
        existing.delete(edge.id);
      }
      path.setAttribute("d", d);
    }

    for (const stale of existing.values()) stale.remove();
  }

  function nodesForEdges(edgeIds) {
    const set = new Set();
    for (const id of edgeIds) {
      const edge = EDGES.find((e) => e.id === id);
      if (!edge) continue;
      set.add(edge.from);
      set.add(edge.to);
    }
    return set;
  }

  function clearHover() {
    stage.classList.remove("is-hovering");
    stage.querySelectorAll(".is-active").forEach((el) => el.classList.remove("is-active"));
  }

  function applyHover(nodeId) {
    const edgeIds = HOVER_EDGES[nodeId];
    if (!edgeIds) {
      clearHover();
      return;
    }

    stage.classList.add("is-hovering");
    stage.querySelectorAll(".is-active").forEach((el) => el.classList.remove("is-active"));

    for (const id of edgeIds) {
      const path = svg.querySelector(`[data-edge-id="${id}"]`);
      if (path) path.classList.add("is-active");
    }

    for (const id of nodesForEdges(edgeIds)) {
      const el = nodeEl(id);
      if (el) el.classList.add("is-active");
    }

    // Curated path also lights DAMPF/KEIM/WOLKE plates inside the group.
    if (edgeIds === WOLKE_PATH || nodeId === "curated") {
      ["dampf", "keim", "wolke", "curated"].forEach((id) => {
        const el = nodeEl(id);
        if (el) el.classList.add("is-active");
      });
    }

    const self = nodeEl(nodeId);
    if (self) self.classList.add("is-active");
  }

  function bindHoverTarget(el, nodeId) {
    if (!nodeId || !HOVER_EDGES[nodeId]) return;
    const enter = () => applyHover(nodeId);
    const leave = () => clearHover();
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focus", enter);
    el.addEventListener("blur", leave);
  }

  stage.querySelectorAll("[data-node]").forEach((el) => {
    // Prefer explicit hover alias when present (e.g. plates inside curated).
    const hoverId = el.getAttribute("data-hover-node") || el.getAttribute("data-node");
    bindHoverTarget(el, hoverId);
  });
  stage.querySelectorAll("[data-hover-node]").forEach((el) => {
    if (el.hasAttribute("data-node")) return;
    bindHoverTarget(el, el.getAttribute("data-hover-node"));
  });

  let resizeTimer = 0;
  const scheduleDraw = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(drawEdges, 40);
  };

  window.addEventListener("resize", scheduleDraw);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(scheduleDraw).observe(stage);
  }

  requestAnimationFrame(() => {
    drawEdges();
    requestAnimationFrame(drawEdges);
  });
})();
