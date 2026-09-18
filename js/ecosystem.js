/**
 * WETTER ecosystem diagram: data-driven SVG edges (always on).
 *
 * Layout contract (desktop ≥821px):
 * - Blocks are absolutely placed with --x/--y/--w % on the stage (edit in index.html).
 * - Ocean docks rise under each target’s horizontal center.
 * - Edges: thick base + traveling dash pulse (direction without arrowheads).
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
    { id: "ocean-curated", from: "raw-data-ocean", to: "curated", group: "wolke" },
    { id: "ocean-donner", from: "raw-data-ocean", to: "donner", group: "direct" },
    { id: "ocean-blitz", from: "raw-data-ocean", to: "blitz", group: "direct" },
    { id: "ocean-sidecars", from: "raw-data-ocean", to: "sidecars", group: "sidecar" },
    { id: "dampf-keim", from: "dampf", to: "keim", group: "wolke" },
    { id: "keim-wolke", from: "keim", to: "wolke", group: "wolke" },
    { id: "wolke-viewers", from: "wolke", to: "viewers", group: "wolke" },
    { id: "sidecars-viewers", from: "sidecars", to: "viewers", group: "sidecar" },
  ];

  /** Soft emphasis only — never dims the rest. */
  const EMPHASIZE = {
    curated: "wolke",
    dampf: "wolke",
    keim: "wolke",
    wolke: "wolke",
    sidecars: "sidecar",
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

  /** Prefer readable routes: vertical straight, side links shallow S-curves. */
  function curvePath(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (Math.abs(dx) < 14) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
    if (Math.abs(dx) >= Math.abs(dy) * 1.15) {
      const mx = x1 + dx * 0.5;
      return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
    }
    const cx1 = x1 + dx * 0.08;
    const cy1 = y1 + dy * 0.42;
    const cx2 = x2 - dx * 0.08;
    const cy2 = y2 - dy * 0.42;
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
      const fromEl = nodeEl(edge.from);
      const toEl = nodeEl(edge.to);
      if (!fromEl || !toEl) continue;

      const { a, b } = endpoints(edge, fromEl, toEl);
      const d = curvePath(a.x, a.y, b.x, b.y);
      upsertPath(existing, edge.id, "base", edge.group, d);
      upsertPath(existing, edge.id, "flow", edge.group, d);
    }

    for (const stale of existing.values()) stale.remove();
  }

  function clearEmphasis() {
    stage.classList.remove("is-emphasize-wolke", "is-emphasize-sidecar");
  }

  function applyEmphasis(nodeId) {
    const group = EMPHASIZE[nodeId];
    clearEmphasis();
    if (!group) return;
    stage.classList.add(
      group === "wolke" ? "is-emphasize-wolke" : "is-emphasize-sidecar"
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
  stage.querySelectorAll(".eco-node").forEach((node) => {
    const tip = node.querySelector(":scope > .eco-tip");
    if (!tip) return;

    node.addEventListener("click", (event) => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (event.target instanceof Element && event.target.closest("a")) return;
      const open = node.classList.contains("is-tip-open");
      stage.querySelectorAll(".eco-node.is-tip-open").forEach((n) => {
        n.classList.remove("is-tip-open");
      });
      if (!open) {
        node.classList.add("is-tip-open");
      }
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(".eco-node.is-tip-open")) return;
    stage.querySelectorAll(".eco-node.is-tip-open").forEach((n) => {
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
