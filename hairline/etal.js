/**
 * Étal: a market stall of twenty lidded jars on a rounded board. The pointer
 * is projected onto the board, and every jar near it lifts off on its own
 * spring, the nearest highest: a post reaching the people around it. At rest
 * two jars are already up, as if just shown. The lid of the jar under the
 * pointer, or of the highest at rest, takes the bright stroke. The slider is
 * the reach, in cells.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  mk, pointer, put, register, disposer, solid,
} = HL;

const NI = 4, NJ = 5, CELL = 16, R = 5.4, H = 11, LID = 2.6, LMAX = 30, PB = 6, M = 7;
const EI = NI * CELL, EJ = NJ * CELL;

/** Share of the full lift at u reaches from the pointer: 1 → .3 at 40% → .06 at the edge, floor beyond. */
const falloff = (u) => (u <= 0 ? 1 : u <= 0.4 ? 1 - (u / 0.4) * 0.7 : u <= 1 ? 0.3 - ((u - 0.4) / 0.6) * 0.24 : 0.06);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.45);
  fit(C, [[-M, -M, -PB], [EI + M, EJ + M, -PB], [EI + M, -M, -PB], [-M, EJ + M, -PB], [EI / 2, EJ / 2, LMAX + H + LID]], 200, 166);
  const P = proj(C), front = facing(C);
  let reach = value * CELL, over = null;

  const g = mk("g", {}, svg), jars = [];
  const [br, bi] = rings(-M, -M, EI + M, EJ + M, 10, 2.2);
  put(solid(g), prism(P, front, br, bi, -PB, 0));
  // Diagonal by diagonal from the far corner: appending is painting back to front.
  for (let s = 0; s <= NI + NJ - 2; s++) for (let i = 0; i < NI; i++) {
    const j = s - i;
    if (j < 0 || j >= NJ) continue;
    const cx = (i + 0.5) * CELL, cy = (j + 0.5) * CELL, u = i / (NI - 1), v = j / (NJ - 1);
    const l0 = 22 * Math.exp(-((u - 0.68) ** 2 + (v - 0.3) ** 2) / 0.05) + 11 * Math.exp(-((u - 0.2) ** 2 + (v - 0.78) ** 2) / 0.04);
    const body = rings(cx - R, cy - R, cx + R, cy + R, R, 1.1);
    const lid = rings(cx - R - 0.7, cy - R - 0.7, cx + R + 0.7, cy + R + 0.7, R + 0.7, 0.9);
    jars.push({ i, j, l0, body, lid, sp: spring(l0, { eps: 0.04 }), b: solid(g), t: solid(g), drawn: NaN });
  }
  const peak = jars.reduce((a, b) => (b.l0 > a.l0 ? b : a));
  const byCell = new Map(jars.map((k) => [k.i + "," + k.j, k]));
  let want = peak, lit = null;

  function drawJar(k) {
    const z = Math.max(0, k.sp.x);
    if (z === k.drawn) return;
    k.drawn = z;
    put(k.b, prism(P, front, k.body[0], k.body[1], z, z + H));
    put(k.t, prism(P, front, k.lid[0], k.lid[1], z + H, z + H + LID));
  }
  function drawMark() {
    if (want === lit) return;
    if (lit) lit.t.sil.classList.remove("hi");
    lit = want;
    lit.t.sil.classList.add("hi");
  }

  const B = register(stage, (dt) => {
    let moving = false;
    for (const k of jars) { if (stepS(k.sp, dt)) moving = true; drawJar(k); }
    drawMark();
    return moving;
  });
  bag.add(B.unregister);

  function retarget() {
    for (const k of jars) {
      if (!over) { k.sp.t = k.l0; continue; }
      const dx = (k.i + 0.5) * CELL - over[0], dy = (k.j + 0.5) * CELL - over[1];
      k.sp.t = LMAX * falloff(Math.hypot(dx, dy) / reach);
    }
    if (over) {
      const i = clamp(Math.floor(over[0] / CELL), 0, NI - 1), j = clamp(Math.floor(over[1] / CELL), 0, NJ - 1);
      want = byCell.get(i + "," + j);
      read.textContent = `pot ${i + 1}·${j + 1}`;
    } else { want = peak; read.textContent = "rest"; }
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = v * CELL; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "etal",
  means: "A stall of jars: the ones near the pointer lift off, the nearest highest, like a post reaching the people around it.",
  rules: [1, 3, 4, 5, 9],
  range: [1.2, 2.2, 3.6],
  tour: [[150, 130], [250, 170], [190, 220], null],
  mount,
});
