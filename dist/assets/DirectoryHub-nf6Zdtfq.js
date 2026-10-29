import {
  d as Ie,
  o as s,
  c as a,
  g as U,
  a as n,
  t as i,
  F as x,
  k as _,
  f as u,
  q as Le,
  h as me,
  U as Kt,
  r as K,
  N as Oe,
  y as k,
  _ as Te,
  w as pe,
  E as Pe,
  p as zt,
  V as ct,
  x as v,
  b as ut,
  W as Re,
  X as Be,
  Y as nt,
  Z as jt,
  D as qt,
  $ as Vt,
  a0 as Ht,
  s as Wt,
  v as Gt,
  i as Yt,
  a1 as Jt,
  a2 as Qt,
  a3 as Zt,
  a4 as Xt,
  a5 as es,
  a6 as ts,
  a7 as ss,
  a8 as ls,
  a9 as as,
  aa as ns,
  ab as it,
} from "./index-DaFfIKeO.js";
const is = { class: "skill-card-top" },
  os = ["src", "alt"],
  rs = { key: 1, class: "skill-card-avatar-fallback" },
  cs = { class: "skill-card-info" },
  us = { class: "skill-card-header" },
  ds = { class: "skill-card-name" },
  vs = { key: 0, class: "skill-card-badge-disabled" },
  ys = { key: 1, class: "skill-card-badge" },
  hs = { key: 0, class: "skill-card-owner" },
  ps = ["title"],
  ms = { key: 0, class: "skill-card-desc" },
  fs = { key: 1, class: "skill-card-meta-row" },
  ks = Ie({
    __name: "SkillCard",
    props: {
      skill: {},
      showStatusBadge: { type: Boolean, default: !0 },
      showBrowseAction: { type: Boolean, default: !0 },
      showOwner: { type: Boolean, default: !0 },
    },
    emits: ["select"],
    setup(p) {
      const z = p,
        { t: g } = Oe(),
        T = k(() => z.showStatusBadge !== !1),
        D = k(() => z.showBrowseAction !== !1),
        j = k(() => z.showOwner !== !1),
        A = k(() => {
          const b = z.skill.path;
          return b ? (b.endsWith("/SKILL.md") ? b.slice(0, -9) : b) : "";
        });
      function N() {
        const b = A.value;
        b &&
          window.open(
            `/codex-local-browse${encodeURI(b)}`,
            "_blank",
            "noopener,noreferrer",
          );
      }
      const $ = k(() => {
          const b = z.skill.publishedAt;
          if (!b) return "";
          const L = new Date(b),
            P = Date.now() - b;
          return P < 36e5
            ? `${Math.floor(P / 6e4)}m ago`
            : P < 864e5
              ? `${Math.floor(P / 36e5)}h ago`
              : P < 2592e6
                ? `${Math.floor(P / 864e5)}d ago`
                : L.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
        }),
        F = k(() => {
          const b = [];
          return (
            z.skill.installCountLabel && b.push(z.skill.installCountLabel),
            $.value && b.push($.value),
            b
          );
        });
      function R(b) {
        const L = b.target;
        L.style.display = "none";
      }
      return (b, L) => (
        s(),
        a(
          "button",
          {
            class: U([
              "skill-card",
              { "is-disabled": p.skill.installed && p.skill.enabled === !1 },
            ]),
            type: "button",
            onClick: L[0] || (L[0] = (m) => b.$emit("select", p.skill)),
          },
          [
            n("div", is, [
              p.skill.avatarUrl
                ? (s(),
                  a(
                    "img",
                    {
                      key: 0,
                      class: "skill-card-avatar",
                      src: p.skill.avatarUrl,
                      alt: p.skill.owner,
                      loading: "lazy",
                      onError: R,
                    },
                    null,
                    40,
                    os,
                  ))
                : (s(), a("div", rs, i(p.skill.owner.charAt(0)), 1)),
              n("div", cs, [
                n("div", us, [
                  n("span", ds, i(p.skill.displayName || p.skill.name), 1),
                  T.value
                    ? (s(),
                      a(
                        x,
                        { key: 0 },
                        [
                          p.skill.installed && p.skill.enabled === !1
                            ? (s(), a("span", vs, i(_(g)("Disabled")), 1))
                            : p.skill.installed
                              ? (s(), a("span", ys, i(_(g)("Installed")), 1))
                              : u("", !0),
                        ],
                        64,
                      ))
                    : u("", !0),
                ]),
                j.value ? (s(), a("span", hs, i(p.skill.owner), 1)) : u("", !0),
              ]),
              D.value && p.skill.installed && A.value
                ? (s(),
                  a(
                    "button",
                    {
                      key: 2,
                      class: "skill-card-browse",
                      type: "button",
                      title: _(g)("Browse files"),
                      onClick: Le(N, ["stop"]),
                    },
                    [me(Kt, { class: "skill-card-browse-icon" })],
                    8,
                    ps,
                  ))
                : u("", !0),
            ]),
            p.skill.description
              ? (s(), a("p", ms, i(p.skill.description), 1))
              : u("", !0),
            F.value.length > 0
              ? (s(),
                a("div", fs, [
                  (s(!0),
                  a(
                    x,
                    null,
                    K(
                      F.value,
                      (m) => (
                        s(),
                        a("span", { key: m, class: "skill-card-meta" }, i(m), 1)
                      ),
                    ),
                    128,
                  )),
                ]))
              : u("", !0),
          ],
          2,
        )
      );
    },
  }),
  ot = Te(ks, [["__scopeId", "data-v-76c12421"]]),
  gs = { class: "sdm-panel" },
  bs = { class: "sdm-header" },
  _s = { class: "sdm-title-area" },
  $s = ["src", "alt"],
  ws = { class: "sdm-title-col" },
  Ss = { class: "sdm-title-row" },
  Cs = { class: "sdm-title" },
  As = { key: 0, class: "sdm-badge-disabled" },
  Ps = { class: "sdm-owner" },
  Is = ["aria-label"],
  Ls = { class: "sdm-body" },
  Ts = { key: 0, class: "sdm-desc" },
  Es = { key: 1, class: "sdm-readme-loading" },
  Ms = ["innerHTML"],
  Ns = ["href"],
  Us = { class: "sdm-footer" },
  Ds = { class: "sdm-footer-actions" },
  Fs = ["disabled"],
  xs = ["disabled"],
  Rs = ["disabled"],
  Bs = ["disabled"],
  Os = Ie({
    __name: "SkillDetailModal",
    props: {
      skill: {},
      visible: { type: Boolean },
      isInstalling: { type: Boolean },
      isUninstalling: { type: Boolean },
      isTrying: { type: Boolean },
    },
    emits: ["close", "install", "uninstall", "toggle-enabled", "try"],
    setup(p, { emit: z }) {
      const g = p,
        T = z,
        D = v(null),
        j = v(""),
        A = v(""),
        N = v(!1),
        { t: $ } = Oe(),
        F = k(() => D.value ?? g.skill.enabled ?? !0),
        R = k(() => g.isInstalling === !0 || g.isUninstalling === !0),
        b = k(() => j.value || g.skill.description),
        L = k(() => {
          const f = g.skill.path;
          return f ? (f.endsWith("/SKILL.md") ? f.slice(0, -9) : f) : "";
        }),
        m = k(() => {
          const f = A.value;
          if (!f) return "";
          const E = f.replace(/^---[\s\S]*?---\s*/, "");
          return P(E);
        });
      function P(f) {
        return f
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/^### (.+)$/gm, "<h4>$1</h4>")
          .replace(/^## (.+)$/gm, "<h3>$1</h3>")
          .replace(/^# (.+)$/gm, "<h2>$1</h2>")
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          .replace(/^- (.+)$/gm, "<li>$1</li>")
          .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
          .replace(/\n{2,}/g, "<br/><br/>")
          .replace(/\n/g, "<br/>");
      }
      async function W() {
        if (!(!g.skill.owner || !g.skill.name)) {
          ((N.value = !0), (j.value = ""), (A.value = ""));
          try {
            const f = new URLSearchParams({
              owner: g.skill.owner,
              name: g.skill.name,
            });
            (g.skill.installed && f.set("installed", "true"),
              g.skill.path && f.set("path", g.skill.path));
            const E = await fetch(`/codex-api/skills-hub/readme?${f}`);
            if (!E.ok) return;
            const G = await E.json();
            ((A.value = G.content ?? ""), (j.value = G.description ?? ""));
          } catch {
          } finally {
            N.value = !1;
          }
        }
      }
      pe(
        () => g.visible,
        (f) => {
          f && ((D.value = null), (j.value = ""), (A.value = ""), W());
        },
      );
      function Q() {
        T("install", g.skill);
      }
      function O() {
        T("uninstall", g.skill);
      }
      function J() {
        const f = !F.value;
        ((D.value = f), T("toggle-enabled", g.skill, f));
      }
      function S() {
        g.isTrying || T("try", g.skill);
      }
      function q() {
        const f = L.value;
        f &&
          window.open(
            `/codex-local-browse${encodeURI(f)}`,
            "_blank",
            "noopener,noreferrer",
          );
      }
      return (f, E) => (
        s(),
        Pe(ct, { to: "body" }, [
          p.visible
            ? (s(),
              a(
                "div",
                {
                  key: 0,
                  class: "sdm-overlay",
                  onClick:
                    E[1] || (E[1] = Le((G) => f.$emit("close"), ["self"])),
                },
                [
                  n("div", gs, [
                    n("div", bs, [
                      n("div", _s, [
                        p.skill.avatarUrl
                          ? (s(),
                            a(
                              "img",
                              {
                                key: 0,
                                class: "sdm-avatar",
                                src: p.skill.avatarUrl,
                                alt: p.skill.owner,
                                loading: "lazy",
                              },
                              null,
                              8,
                              $s,
                            ))
                          : u("", !0),
                        n("div", ws, [
                          n("div", Ss, [
                            n(
                              "h3",
                              Cs,
                              i(p.skill.displayName || p.skill.name),
                              1,
                            ),
                            p.skill.installed && !F.value
                              ? (s(), a("span", As, i(_($)("Disabled")), 1))
                              : u("", !0),
                          ]),
                          n("span", Ps, i(p.skill.owner), 1),
                        ]),
                      ]),
                      n(
                        "button",
                        {
                          class: "sdm-close",
                          type: "button",
                          "aria-label": _($)("Close"),
                          onClick: E[0] || (E[0] = (G) => f.$emit("close")),
                        },
                        [me(zt, { class: "sdm-close-icon" })],
                        8,
                        Is,
                      ),
                    ]),
                    n("div", Ls, [
                      b.value ? (s(), a("p", Ts, i(b.value), 1)) : u("", !0),
                      N.value
                        ? (s(),
                          a("div", Es, i(_($)("Loading skill contents...")), 1))
                        : A.value
                          ? (s(),
                            a(
                              "div",
                              {
                                key: 2,
                                class: "sdm-readme",
                                innerHTML: m.value,
                              },
                              null,
                              8,
                              Ms,
                            ))
                          : u("", !0),
                      p.skill.url
                        ? (s(),
                          a(
                            "a",
                            {
                              key: 3,
                              class: "sdm-link",
                              href: p.skill.url,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            },
                            i(_($)("View on GitHub")),
                            9,
                            Ns,
                          ))
                        : u("", !0),
                    ]),
                    n("div", Us, [
                      n("div", Ds, [
                        p.skill.installed
                          ? (s(),
                            a(
                              "button",
                              {
                                key: 0,
                                class: "sdm-btn sdm-btn-danger",
                                type: "button",
                                disabled: R.value,
                                onClick: O,
                              },
                              i(
                                g.isUninstalling
                                  ? _($)("Uninstalling...")
                                  : _($)("Uninstall"),
                              ),
                              9,
                              Fs,
                            ))
                          : (s(),
                            a(
                              "button",
                              {
                                key: 1,
                                class: "sdm-btn sdm-btn-primary",
                                type: "button",
                                disabled: R.value,
                                onClick: Q,
                              },
                              i(
                                g.isInstalling
                                  ? _($)("Installing...")
                                  : _($)("Install"),
                              ),
                              9,
                              xs,
                            )),
                        p.skill.installed
                          ? (s(),
                            a(
                              "button",
                              {
                                key: 2,
                                class: "sdm-btn sdm-btn-secondary",
                                type: "button",
                                disabled: R.value,
                                onClick: J,
                              },
                              i(F.value ? _($)("Disable") : _($)("Enable")),
                              9,
                              Rs,
                            ))
                          : u("", !0),
                        p.skill.installed && F.value
                          ? (s(),
                            a(
                              "button",
                              {
                                key: 3,
                                class: "sdm-btn sdm-btn-primary",
                                type: "button",
                                disabled: R.value || g.isTrying,
                                onClick: S,
                              },
                              i(g.isTrying ? "Starting..." : "Try it!"),
                              9,
                              Bs,
                            ))
                          : u("", !0),
                        p.skill.installed && L.value
                          ? (s(),
                            a(
                              "button",
                              {
                                key: 4,
                                class: "sdm-btn sdm-btn-secondary",
                                type: "button",
                                onClick: q,
                              },
                              i(_($)("Browse files")),
                              1,
                            ))
                          : u("", !0),
                      ]),
                    ]),
                  ]),
                ],
              ))
            : u("", !0),
        ])
      );
    },
  }),
  Ks = Te(Os, [["__scopeId", "data-v-8ab621f9"]]),
  zs = { class: "skills-hub" },
  js = { class: "skills-hub-header" },
  qs = { class: "skills-hub-title" },
  Vs = { class: "skills-hub-subtitle" },
  Hs = { class: "skills-search-panel" },
  Ws = { class: "skills-search-header" },
  Gs = { class: "skills-search-copy" },
  Ys = {
    class: "skills-directory-link",
    href: "https://skills.anyclaw.store/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  Js = ["placeholder"],
  Qs = ["disabled"],
  Zs = { key: 0, class: "skills-hub-error" },
  Xs = ["href"],
  el = { key: 1, class: "skills-hub-section" },
  tl = { class: "skills-hub-section-title" },
  sl = { key: 0, class: "skills-hub-grid" },
  ll = { key: 2, class: "skills-hub-section" },
  al = { class: "skills-hub-section-title" },
  nl = { key: 0, class: "skills-hub-grid" },
  il = { class: "skills-hub-section" },
  ol = { key: 0, class: "skills-hub-loading" },
  rl = { key: 1, class: "skills-hub-error" },
  cl = ["href"],
  ul = { key: 2, class: "skills-hub-empty" },
  dl = Ie({
    __name: "SkillsHub",
    props: { tryInFlightKey: {} },
    emits: ["skills-changed", "try-item"],
    setup(p, { emit: z }) {
      const g = {
          name: "",
          owner: "",
          description: "",
          url: "",
          installed: !1,
        },
        T = v([]),
        D = v([]),
        j = v(!1),
        A = v(!1),
        N = v(""),
        $ = v(""),
        F = v(""),
        R = v(!0),
        b = v(!0),
        L = v(!1),
        m = v(g),
        P = v(null),
        W = v(""),
        Q = v(!1),
        O = v(!1);
      let J = null;
      const { t: S } = Oe(),
        {
          buildFeedbackMailto: q,
          feedbackMailtoBase: f,
          recordVisibleFailure: E,
        } = qt(),
        G = f(),
        ie = p,
        se = z,
        $e = k(() => {
          var r;
          return ((r = P.value) == null ? void 0 : r.type) === "error"
            ? "skills-hub-toast-error"
            : "skills-hub-toast-success";
        }),
        le = k(() => `${m.value.owner}/${m.value.name}`),
        oe = k(() => Q.value && W.value === le.value),
        re = k(() => O.value && W.value === le.value),
        X = k(() => T.value);
      function V(r, c = "success") {
        ((P.value = { text: r, type: c }),
          J && clearTimeout(J),
          (J = setTimeout(() => {
            P.value = null;
          }, 3e3)));
      }
      function h(r, c) {
        E(c);
        const d = r.currentTarget;
        d instanceof HTMLAnchorElement && (d.href = q());
      }
      function w(r) {
        if (((T.value = r.installed ?? []), D.value.length > 0)) {
          const c = new Map(T.value.map((d) => [d.name, d]));
          D.value = D.value.map((d) => {
            const I = c.get(d.name);
            return I ? ce(d, I) : d;
          });
        }
      }
      function ce(r, c) {
        return { ...r, installed: !0, path: c.path, enabled: c.enabled };
      }
      function ue(r, c) {
        return {
          ...r,
          installed: !0,
          source: c.source,
          publishedAt: c.publishedAt,
        };
      }
      async function ee() {
        ((j.value = !0), (N.value = ""));
        try {
          const r = await fetch("/codex-api/skills-hub");
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const c = await r.json();
          w(c);
        } catch (r) {
          N.value = r instanceof Error ? r.message : "Failed to load skills";
        } finally {
          j.value = !1;
        }
      }
      function B(r) {
        const c = r.installed ? T.value.find((d) => d.name === r.name) : void 0;
        ((m.value = c ? ue(c, r) : r), (L.value = !0));
      }
      async function fe() {
        const r = $.value.trim();
        if (!(r.length < 2)) {
          ((A.value = !0), (F.value = ""));
          try {
            const c = new URLSearchParams({ q: r }),
              d = await fetch(`/codex-api/skills-hub/search?${c}`),
              I = await d.json();
            if (!d.ok) throw new Error(I.error || `HTTP ${d.status}`);
            const Z = new Map(T.value.map((Y) => [Y.name, Y]));
            ((D.value = (I.results ?? []).map((Y) => {
              const ge = Z.get(Y.name);
              return ge ? ce(Y, ge) : Y;
            })),
              (b.value = !0),
              D.value.length === 0 &&
                V(S("No matching skills found."), "error"));
          } catch (c) {
            F.value =
              c instanceof Error ? c.message : "Failed to search skills";
          } finally {
            A.value = !1;
          }
        }
      }
      async function de(r) {
        ((W.value = `${r.owner}/${r.name}`), (Q.value = !0));
        try {
          const d = await (
            await fetch("/codex-api/skills-hub/install", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                owner: r.owner,
                name: r.name,
                source: r.source,
              }),
            })
          ).json();
          if (!d.ok) throw new Error(d.error || "Install failed");
          if (!d.path)
            throw new Error(
              "Install completed but no local skill path was returned",
            );
          await ee();
          const I = T.value.find((Z) => Z.name === r.name);
          if (!(I != null && I.path))
            throw new Error(
              "Install completed but the local skill was not found after refresh",
            );
          ((m.value = ue(I, r)),
            V(`${r.displayName || r.name} skill installed`),
            (L.value = !1),
            se("skills-changed"));
        } catch (c) {
          V(
            c instanceof Error ? c.message : "Failed to install skill",
            "error",
          );
        } finally {
          Q.value = !1;
        }
      }
      async function ve(r) {
        ((W.value = `${r.owner}/${r.name}`), (O.value = !0));
        try {
          const d = await (
            await fetch("/codex-api/skills-hub/uninstall", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: r.name, path: r.path }),
            })
          ).json();
          if (!d.ok) throw new Error(d.error || "Uninstall failed");
          ((T.value = T.value.filter((I) => I.name !== r.name)),
            V(`${r.displayName || r.name} skill uninstalled`),
            (L.value = !1),
            se("skills-changed"));
        } catch (c) {
          V(
            c instanceof Error ? c.message : "Failed to uninstall skill",
            "error",
          );
        } finally {
          O.value = !1;
        }
      }
      async function ye(r, c) {
        try {
          if (
            !(
              await fetch("/codex-api/rpc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  method: "skills/config/write",
                  params: { path: r.path, enabled: c },
                }),
              })
            ).ok
          )
            throw new Error("Failed to update skill");
          (V(`${r.displayName || r.name} skill ${c ? "enabled" : "disabled"}`),
            await ee());
        } catch (d) {
          V(d instanceof Error ? d.message : "Failed to update skill", "error");
        }
      }
      function ae(r) {
        !r.installed ||
          r.enabled === !1 ||
          ie.tryInFlightKey ||
          (se("try-item", {
            kind: "skill",
            name: r.name,
            displayName: r.displayName || r.name,
            skillPath: r.path,
          }),
          (L.value = !1));
      }
      function ke(r) {
        return `skill:${r.name}:${r.path ?? ""}`;
      }
      const Ee = [F, N];
      return (
        ut(() => {
          ee();
        }),
        pe(Ee, (r, c) => {
          r.forEach((d, I) => {
            if (d === c[I]) return;
            const Z = d.trim();
            Z && E(Z);
          });
        }),
        (r, c) => (
          s(),
          a("div", zs, [
            n("div", js, [
              n("h2", qs, i(_(S)("Skills Hub")), 1),
              n("p", Vs, i(_(S)("Manage installed skills on this machine")), 1),
            ]),
            P.value
              ? (s(),
                a(
                  "div",
                  { key: 0, class: U(["skills-hub-toast", $e.value]) },
                  i(P.value.text),
                  3,
                ))
              : u("", !0),
            n("div", Hs, [
              n("div", Ws, [
                n("div", Gs, [
                  n("strong", null, i(_(S)("Find skills")), 1),
                  n(
                    "span",
                    null,
                    i(_(S)("Search the Skills registry with npx skills find.")),
                    1,
                  ),
                ]),
                n("a", Ys, i(_(S)("Skills directory")), 1),
              ]),
              n(
                "form",
                { class: "skills-search-form", onSubmit: Le(fe, ["prevent"]) },
                [
                  Re(
                    n(
                      "input",
                      {
                        "onUpdate:modelValue":
                          c[0] || (c[0] = (d) => ($.value = d)),
                        class: "skills-search-input",
                        type: "search",
                        placeholder: _(S)("Search skills..."),
                        "aria-label": "Search skills",
                      },
                      null,
                      8,
                      Js,
                    ),
                    [[Be, $.value]],
                  ),
                  n(
                    "button",
                    {
                      class: "skills-hub-sort",
                      type: "submit",
                      disabled: A.value || $.value.trim().length < 2,
                    },
                    i(A.value ? _(S)("Searching...") : _(S)("Search")),
                    9,
                    Qs,
                  ),
                ],
                32,
              ),
              F.value
                ? (s(),
                  a("div", Zs, [
                    n("span", null, i(F.value), 1),
                    n(
                      "a",
                      {
                        class: "skills-error-feedback",
                        href: _(G),
                        onClick: c[1] || (c[1] = (d) => h(d, F.value)),
                      },
                      i(_(S)("Send feedback")),
                      9,
                      Xs,
                    ),
                  ]))
                : u("", !0),
            ]),
            D.value.length > 0
              ? (s(),
                a("div", el, [
                  n(
                    "button",
                    {
                      class: "skills-hub-section-toggle",
                      type: "button",
                      onClick: c[2] || (c[2] = (d) => (b.value = !b.value)),
                    },
                    [
                      n(
                        "span",
                        tl,
                        i(
                          _(S)("Search results ({count})", {
                            count: D.value.length,
                          }),
                        ),
                        1,
                      ),
                      me(
                        nt,
                        {
                          class: U([
                            "skills-hub-section-chevron",
                            { "is-open": b.value },
                          ]),
                        },
                        null,
                        8,
                        ["class"],
                      ),
                    ],
                  ),
                  b.value
                    ? (s(),
                      a("div", sl, [
                        (s(!0),
                        a(
                          x,
                          null,
                          K(
                            D.value,
                            (d) => (
                              s(),
                              Pe(
                                ot,
                                {
                                  key: d.source || `${d.owner}/${d.name}`,
                                  skill: d,
                                  "show-browse-action": !1,
                                  onSelect: (I) => B(I),
                                },
                                null,
                                8,
                                ["skill", "onSelect"],
                              )
                            ),
                          ),
                          128,
                        )),
                      ]))
                    : u("", !0),
                ]))
              : u("", !0),
            jt(r.$slots, "before-installed", {}, void 0),
            X.value.length > 0
              ? (s(),
                a("div", ll, [
                  n(
                    "button",
                    {
                      class: "skills-hub-section-toggle",
                      type: "button",
                      onClick: c[3] || (c[3] = (d) => (R.value = !R.value)),
                    },
                    [
                      n(
                        "span",
                        al,
                        i(
                          _(S)("Installed skills ({count})", {
                            count: X.value.length,
                          }),
                        ),
                        1,
                      ),
                      me(
                        nt,
                        {
                          class: U([
                            "skills-hub-section-chevron",
                            { "is-open": R.value },
                          ]),
                        },
                        null,
                        8,
                        ["class"],
                      ),
                    ],
                  ),
                  R.value
                    ? (s(),
                      a("div", nl, [
                        (s(!0),
                        a(
                          x,
                          null,
                          K(
                            X.value,
                            (d) => (
                              s(),
                              Pe(
                                ot,
                                {
                                  key: d.name,
                                  skill: d,
                                  "show-status-badge": !1,
                                  "show-owner": !1,
                                  onSelect: (I) => B(I),
                                },
                                null,
                                8,
                                ["skill", "onSelect"],
                              )
                            ),
                          ),
                          128,
                        )),
                      ]))
                    : u("", !0),
                ]))
              : u("", !0),
            n("div", il, [
              j.value
                ? (s(), a("div", ol, i(_(S)("Loading skills...")), 1))
                : N.value
                  ? (s(),
                    a("div", rl, [
                      n("span", null, i(N.value), 1),
                      n(
                        "a",
                        {
                          class: "skills-error-feedback",
                          href: _(G),
                          onClick: c[4] || (c[4] = (d) => h(d, N.value)),
                        },
                        i(_(S)("Send feedback")),
                        9,
                        cl,
                      ),
                    ]))
                  : T.value.length === 0
                    ? (s(),
                      a("div", ul, i(_(S)("No installed skills found.")), 1))
                    : u("", !0),
            ]),
            me(
              Ks,
              {
                skill: m.value,
                visible: L.value,
                "is-installing": oe.value,
                "is-uninstalling": re.value,
                "is-trying": ie.tryInFlightKey === ke(m.value),
                onClose: c[5] || (c[5] = (d) => (L.value = !1)),
                onInstall: de,
                onUninstall: ve,
                onToggleEnabled: ye,
                onTry: ae,
              },
              null,
              8,
              [
                "skill",
                "visible",
                "is-installing",
                "is-uninstalling",
                "is-trying",
              ],
            ),
          ])
        )
      );
    },
  }),
  vl = Te(dl, [["__scopeId", "data-v-9a7817d5"]]),
  yl = { class: "directory-hub" },
  hl = { class: "directory-header" },
  pl = { class: "directory-subtitle" },
  ml = { class: "directory-header-actions" },
  fl = ["disabled"],
  kl = {
    class: "directory-tabs",
    role: "tablist",
    "aria-label": "Directory sections",
  },
  gl = ["aria-selected", "onClick"],
  bl = { key: 1, class: "directory-section" },
  _l = { class: "directory-toolbar" },
  $l = {
    class: "directory-sort-group",
    role: "group",
    "aria-label": "Sort plugins",
  },
  wl = { key: 0, class: "directory-empty" },
  Sl = { key: 1, class: "directory-error" },
  Cl = { key: 2, class: "directory-loading" },
  Al = { key: 3, class: "directory-empty" },
  Pl = { key: 4, class: "directory-grid" },
  Il = ["onClick"],
  Ll = { class: "directory-card-top" },
  Tl = ["src", "alt"],
  El = { class: "directory-card-main" },
  Ml = { class: "directory-card-title-row" },
  Nl = { class: "directory-card-title" },
  Ul = { key: 0, class: "directory-badge is-muted" },
  Dl = { key: 1, class: "directory-badge" },
  Fl = { class: "directory-card-meta" },
  xl = { key: 0, class: "directory-card-description" },
  Rl = { class: "directory-chip-row" },
  Bl = { key: 0, class: "directory-chip" },
  Ol = { key: 2, class: "directory-section" },
  Kl = { class: "directory-toolbar" },
  zl = {
    class: "directory-sort-group",
    role: "group",
    "aria-label": "Sort apps",
  },
  jl = { key: 0, class: "directory-empty" },
  ql = { key: 1, class: "directory-error" },
  Vl = { key: 2, class: "directory-loading" },
  Hl = { key: 3, class: "directory-empty" },
  Wl = { key: 4, class: "directory-grid" },
  Gl = { class: "directory-card-top" },
  Yl = ["src", "alt"],
  Jl = { key: 1, class: "directory-card-fallback" },
  Ql = { class: "directory-card-main" },
  Zl = { class: "directory-card-title-row" },
  Xl = { class: "directory-card-title" },
  ea = { key: 0, class: "directory-badge is-muted" },
  ta = { key: 1, class: "directory-badge" },
  sa = { class: "directory-card-meta" },
  la = { key: 0, class: "directory-card-description" },
  aa = { class: "directory-chip-row" },
  na = { key: 0, class: "directory-chip" },
  ia = { class: "directory-card-actions" },
  oa = ["disabled", "onClick"],
  ra = ["onClick"],
  ca = ["disabled", "onClick"],
  ua = { key: 3, class: "directory-section" },
  da = { class: "skills-embedded-section" },
  va = { class: "skills-embedded-title" },
  ya = { key: 0, class: "skills-embedded-body" },
  ha = { key: 0, class: "directory-empty" },
  pa = { key: 1, class: "directory-error" },
  ma = { key: 2, class: "directory-loading" },
  fa = { key: 3, class: "directory-empty" },
  ka = { key: 4, class: "mcp-skill-grid" },
  ga = ["onClick"],
  ba = { class: "mcp-skill-card-top" },
  _a = { class: "mcp-skill-avatar-fallback" },
  $a = { class: "mcp-skill-info" },
  wa = { class: "mcp-skill-header" },
  Sa = { class: "mcp-skill-name" },
  Ca = { class: "mcp-skill-meta" },
  Aa = { key: 0, class: "directory-mcp-detail" },
  Pa = { key: 0 },
  Ia = { class: "directory-mini-list" },
  La = { key: 1 },
  Ta = { class: "directory-mini-list" },
  Ea = { class: "directory-modal" },
  Ma = { class: "directory-modal-header" },
  Na = { class: "directory-card-top" },
  Ua = ["src", "alt"],
  Da = { key: 1, class: "directory-card-fallback" },
  Fa = { class: "directory-card-main" },
  xa = { class: "directory-modal-title" },
  Ra = { class: "directory-card-meta" },
  Ba = { class: "directory-modal-body" },
  Oa = { key: 0, class: "directory-error" },
  Ka = { key: 1, class: "directory-loading" },
  za = { key: 0, class: "directory-detail-description" },
  ja = { key: 1, class: "directory-detail-block" },
  qa = { class: "directory-chip-row" },
  Va = { class: "directory-detail-grid" },
  Ha = { key: 0, class: "directory-detail-block" },
  Wa = { key: 0, class: "directory-auth-status is-warning" },
  Ga = ["onClick"],
  Ya = { key: 1, class: "directory-detail-block" },
  Ja = { class: "directory-mini-list" },
  Qa = { key: 2, class: "directory-detail-block" },
  Za = ["disabled", "onClick"],
  Xa = { key: 2, class: "directory-screenshots" },
  en = ["src"],
  tn = { key: 3, class: "directory-auth-panel" },
  sn = ["onClick"],
  ln = { class: "directory-modal-footer" },
  an = ["disabled"],
  nn = ["disabled"],
  on = { key: 2, class: "directory-action", type: "button", disabled: "" },
  rn = ["disabled"],
  cn = ["disabled"],
  rt = 100,
  un = Ie({
    __name: "DirectoryHub",
    props: { cwd: {}, threadId: {}, tryInFlightKey: {} },
    emits: ["skills-changed", "try-item"],
    setup(p, { emit: z }) {
      const g = [
          [/^gmail$/i, 3e4],
          [/^google calendar$/i, 29500],
          [/^outlook( email| calendar)?$/i, 29e3],
          [/^google drive$/i, 28500],
          [/^google docs$/i, 28e3],
          [/^google sheets$/i, 27500],
          [/^dropbox$/i, 27e3],
          [/^box$/i, 26500],
          [/^slack$/i, 26e3],
          [/^notion$/i, 25500],
          [/^canva$/i, 25e3],
          [/^figma$/i, 24500],
          [/^github$/i, 24e3],
          [/^trello$/i, 23500],
          [/^asana$/i, 23e3],
          [/^basecamp$/i, 22500],
          [/^clickup$/i, 22e3],
          [/^linear$/i, 21500],
          [/^gitlab( issues)?$/i, 21e3],
          [/^jira$/i, 20500],
          [/^zapier$/i, 2e4],
          [/^hubspot$/i, 19500],
          [/^salesforce$/i, 19e3],
          [/^netlify$/i, 18500],
          [/^vercel$/i, 18e3],
          [
            /^(spotify|youtube|netflix|hulu|disney|booking|expedia|uber|airbnb)$/i,
            17500,
          ],
        ],
        T = [
          [
            /(email|mail|inbox|calendar|event|availability|contact|message|chat)/i,
            450,
          ],
          [
            /(drive|document|docs|sheet|slide|file|storage|pdf|note|page)/i,
            380,
          ],
          [
            /(image|design|presentation|diagram|video|audio|photo|media|music)/i,
            320,
          ],
          [
            /(travel|flight|hotel|restaurant|recipe|food|shopping|delivery|map|weather)/i,
            260,
          ],
          [
            /(learn|education|study|language|health|fitness|finance|budget)/i,
            220,
          ],
          [
            /(task|project|issue|repository|deploy|database|crm|sales|support)/i,
            120,
          ],
        ],
        D = [
          [
            /(computer use|github|gitlab|linear|slack|notion|browser|web|filesystem|terminal)/i,
            120,
          ],
          [
            /(calendar|email|drive|docs|design|deploy|project|issue|search|database)/i,
            55,
          ],
        ],
        j = [
          [
            /(github|gitlab|linear|slack|notion|filesystem|browser|computer|web|postgres|sqlite|database)/i,
            120,
          ],
          [
            /(search|drive|docs|calendar|terminal|shell|deploy|cloud|memory)/i,
            55,
          ],
        ],
        A = p,
        N = z,
        $ = Vt(),
        F = Ht(),
        R = [
          {
            id: "plugins",
            label: "Plugins",
            subtitle: "Plugins make Codex work your way.",
          },
          {
            id: "apps",
            label: "Apps",
            subtitle: "Connect Codex to external apps and services.",
          },
          {
            id: "skills",
            label: "Skills",
            subtitle: "MCPs first, then installed skills.",
          },
        ];
      function b(e) {
        return e === "plugins" || e === "apps" || e === "skills";
      }
      function L() {
        return b($.query.tab) ? $.query.tab : "skills";
      }
      const m = v(L()),
        P = v(new Set()),
        W = v(!1),
        Q = v([]),
        O = v([]),
        J = v([]),
        S = v("popular"),
        q = v("popular"),
        f = v(""),
        E = v(""),
        G = v(!1),
        ie = v(!1),
        se = v(!1),
        $e = v(!1),
        le = v(!1),
        oe = v(!0),
        re = v(""),
        X = v(""),
        V = v(""),
        h = v(null),
        w = v(null),
        ce = v(!1),
        ue = v(!1),
        ee = v(""),
        B = v(!1),
        fe = v(""),
        de = v([]),
        ve = v(""),
        ye = v(new Set()),
        ae = v(null);
      let ke = null;
      const Ee = k(() => R.find((e) => e.id === m.value) ?? R[0]),
        r = k(
          () =>
            !W.value ||
            [
              "plugin/list",
              "plugin/read",
              "plugin/install",
              "plugin/uninstall",
            ].every((e) => P.value.has(e)),
        ),
        c = k(() => !W.value || P.value.has("app/list")),
        d = k(() => !W.value || P.value.has("mcpServerStatus/list")),
        I = k(() => P.value.has("config/mcpServer/reload")),
        Z = k(() => P.value.has("mcpServer/oauth/login")),
        Y = k(() => (A.tryInFlightKey ?? "").length > 0),
        ge = k(() => {
          var e, t, o;
          return (
            ((e = w.value) == null ? void 0 : e.description) ||
            ((t = w.value) == null ? void 0 : t.summary.longDescription) ||
            ((o = w.value) == null ? void 0 : o.summary.description) ||
            ""
          );
        }),
        Ke = k(() => {
          var t;
          const e = (t = w.value) == null ? void 0 : t.summary;
          return e
            ? [...e.screenshotUrls, ...e.screenshots.map(Ce)].filter(Boolean)
            : [];
        }),
        Me = k(() => {
          var o;
          const e = ((o = w.value) == null ? void 0 : o.apps) ?? [];
          if (e.length === 0) return !1;
          const t = new Set();
          for (const y of O.value)
            (t.add(y.id.trim().toLowerCase()), t.add(We(y.name)));
          return e.some((y) => {
            const M = y.id.trim().toLowerCase(),
              te = We(y.name),
              ne = M.length > 0 && t.has(M),
              l = te.length > 0 && t.has(te);
            return !ne && !l;
          });
        }),
        dt = k(() => {
          var e, t;
          return (
            ((e = h.value) == null ? void 0 : e.installPolicy) ===
              "NOT_AVAILABLE" ||
            (((t = w.value) == null ? void 0 : t.apps.some((o) => Ve(o))) ?? !1)
          );
        }),
        ze = k(() => bt(St($t(Q.value, f.value), S.value), S.value, f.value)),
        je = k(() => _t(Ct(wt(O.value, E.value), q.value), q.value, E.value)),
        Ne = k(() => At(J.value)),
        vt = k(() => new Map(J.value.map((e) => [e.name, e])));
      function we(e) {
        return e.trim().toLowerCase();
      }
      function yt(e) {
        return we(e)
          .replace(/\s+\((synced|legacy)\)\s*$/iu, "")
          .replace(/\s+\(.*?\)\s*$/u, "")
          .replace(/[-_]+/gu, " ")
          .replace(/\s+plugin$/iu, "")
          .replace(/\s+/gu, " ")
          .trim();
      }
      function qe(...e) {
        const t = new Set();
        for (const o of e) {
          const y = yt(o);
          y && (t.add(y), t.add(y.replace(/\s+/gu, "")));
        }
        return Array.from(t);
      }
      function ht(e) {
        return !e.isAccessible && e.installUrl.trim().length === 0;
      }
      function pt(e) {
        const t = e.id.trim();
        if (t) {
          const y = O.value.find((M) => M.id === t);
          if (y) return y;
        }
        const o = qe(e.name);
        return (
          O.value.find((y) => qe(y.name).some((M) => o.includes(M))) ?? null
        );
      }
      function Ve(e) {
        const t = pt(e);
        return t ? ht(t) : e.needsAuth && e.installUrl.trim().length === 0;
      }
      function He(e, t) {
        const o = we(t);
        return o
          ? e.some((y) => (y == null ? void 0 : y.toLowerCase().includes(o)))
          : !0;
      }
      function Se(e, t) {
        return t.reduce((o, [y, M]) => o + (y.test(e) ? M : 0), 0);
      }
      function Ue(e) {
        return e
          .replace(/\s+\((synced|legacy)\)\s*$/iu, "")
          .replace(/\s+\(.*?\)\s*$/u, "")
          .trim();
      }
      function We(e) {
        return Ue(e).toLowerCase();
      }
      function mt(e) {
        return e === "DEFAULT_OAI_CATALOG"
          ? "OpenAI catalog"
          : e === "ECOSYSTEM_DIRECTORY"
            ? "Ecosystem directory"
            : e
              ? e
                  .replace(/_/gu, " ")
                  .toLowerCase()
                  .replace(/\b\w/gu, (t) => t.toUpperCase())
              : "";
      }
      function ft(e) {
        return e.developer || mt(e.distributionChannel) || "App";
      }
      function De(e) {
        var t;
        return (
          ((t = vt.value.get(e)) == null ? void 0 : t.authStatus) ?? "unknown"
        );
      }
      function Ge(e) {
        const t = De(e);
        return t === "oAuth"
          ? "Logged in"
          : t === "bearerToken"
            ? "Bearer token"
            : t === "notLoggedIn"
              ? "Login required"
              : t === "unsupported"
                ? "Auth unsupported"
                : "Status unknown";
      }
      function kt(e) {
        const t = De(e);
        return t === "oAuth" || t === "bearerToken"
          ? "is-ok"
          : t === "notLoggedIn"
            ? "is-warning"
            : "is-muted";
      }
      function gt(e) {
        return e === "oAuth" || e === "bearerToken"
          ? "mcp-skill-badge-ok"
          : e === "notLoggedIn"
            ? "mcp-skill-badge-warning"
            : "mcp-skill-badge-muted";
      }
      function Ye(e) {
        return Z.value && De(e) === "notLoggedIn";
      }
      function bt(e, t, o) {
        return t === "popular" && we(o).length === 0 ? e.slice(0, rt) : e;
      }
      function _t(e, t, o) {
        if (t !== "popular" || we(o).length > 0) return e;
        const y = new Set(),
          M = [];
        for (const te of e) {
          const ne = Ue(te.name).toLowerCase();
          if (!y.has(ne) && (y.add(ne), M.push(te), M.length >= rt)) break;
        }
        return M;
      }
      function $t(e, t) {
        return e.filter((o) =>
          He(
            [
              o.displayName,
              o.name,
              o.description,
              o.developerName,
              o.category,
              o.marketplaceDisplayName,
              ...o.capabilities,
            ],
            t,
          ),
        );
      }
      function wt(e, t) {
        return e.filter((o) =>
          He(
            [
              o.name,
              o.description,
              o.developer,
              o.category,
              o.distributionChannel,
              ...o.pluginDisplayNames,
            ],
            t,
          ),
        );
      }
      function Je(e) {
        return (
          (e.installed ? 500 : 0) +
          (e.enabled ? 40 : 0) +
          (e.developerName.toLowerCase().includes("openai") ? 140 : 0) +
          (e.sourceType === "local" ? 80 : 0) +
          e.capabilities.length * 12 +
          Se(`${e.displayName} ${e.name} ${e.description} ${e.category}`, D)
        );
      }
      function Qe(e) {
        const t = Ue(e.name);
        return (
          (e.isAccessible ? 1e4 : 0) +
          Se(t, g) +
          (e.pluginDisplayNames.length > 0 ? 260 : 0) +
          (e.distributionChannel === "DEFAULT_OAI_CATALOG" ? 120 : 0) +
          (e.isEnabled ? 40 : 0) +
          (e.installUrl ? 20 : 0) +
          Se(
            `${e.name} ${e.description} ${e.category} ${e.pluginDisplayNames.join(" ")}`,
            T,
          ) -
          e.catalogRank * 0.001
        );
      }
      function Ze(e) {
        return (
          (e.authStatus === "oAuth" ? 180 : 0) +
          (e.authStatus === "bearerToken" ? 140 : 0) +
          Math.min(e.tools.length, 50) * 6 +
          Math.min(e.resources.length + e.resourceTemplates.length, 30) * 3 +
          Se(e.name, j)
        );
      }
      function St(e, t) {
        return t === "name"
          ? [...e].sort((o, y) => o.displayName.localeCompare(y.displayName))
          : t === "date"
            ? [...e]
            : [...e].sort(
                (o, y) =>
                  Je(y) - Je(o) || o.displayName.localeCompare(y.displayName),
              );
      }
      function Ct(e, t) {
        return t === "name"
          ? [...e].sort((o, y) => o.name.localeCompare(y.name))
          : t === "date"
            ? [...e].sort((o, y) => o.catalogRank - y.catalogRank)
            : [...e].sort(
                (o, y) => Qe(y) - Qe(o) || o.name.localeCompare(y.name),
              );
      }
      function At(e, t) {
        return [...e].sort(
          (o, y) => Ze(y) - Ze(o) || o.name.localeCompare(y.name),
        );
      }
      function H(e, t = "success") {
        ((ae.value = { text: e, type: t }),
          ke && clearTimeout(ke),
          (ke = setTimeout(() => {
            ae.value = null;
          }, 3e3)));
      }
      function Ce(e) {
        return e
          ? e.startsWith("connectors://")
            ? `/codex-api/connector-logo?src=${encodeURIComponent(e)}`
            : /^https?:\/\//i.test(e) || e.startsWith("data:")
              ? e
              : e.startsWith("/")
                ? `/codex-local-image?path=${encodeURIComponent(e)}`
                : ""
          : "";
      }
      function Ae(e) {
        return e
          ? e.logoUrl ||
              Ce(e.logoPath) ||
              e.composerIconUrl ||
              Ce(e.composerIconPath)
          : "";
      }
      function Xe(e) {
        return Ce(e.logoUrlDark || e.logoUrl);
      }
      function Pt(e) {
        return `app:${e.id}:`;
      }
      function It(e) {
        Y.value ||
          N("try-item", { kind: "app", name: e.id, displayName: e.name });
      }
      function Lt(e) {
        return `plugin:${e.name}:`;
      }
      function Tt(e) {
        Y.value ||
          N("try-item", {
            kind: "plugin",
            name: e.name,
            displayName: e.displayName,
          });
      }
      function be(e) {
        const t = e.trim();
        /^https?:\/\//i.test(t) && window.location.assign(t);
      }
      function Et(e) {
        const t = e.find((o) => o.needsAuth && o.installUrl.trim().length > 0);
        return t ? (be(t.installUrl), !0) : !1;
      }
      function Mt(e) {
        return e.brandColor
          ? { backgroundColor: e.brandColor, color: "#fff" }
          : {};
      }
      async function Nt() {
        try {
          P.value = new Set(await Jt());
        } catch {
          P.value = new Set();
        } finally {
          W.value = !0;
        }
      }
      async function he() {
        var e;
        if (r.value) {
          ((G.value = !0), (re.value = ""));
          try {
            const t = (e = A.cwd) == null ? void 0 : e.trim(),
              [o] = await Promise.all([
                Qt(t ? [t] : void 0),
                c.value ? _e() : Promise.resolve(),
              ]);
            Q.value = o;
          } catch (t) {
            re.value =
              t instanceof Error ? t.message : "Failed to load plugins";
          } finally {
            G.value = !1;
          }
        }
      }
      async function _e() {
        var e;
        if (c.value) {
          ((ie.value = !0), (X.value = ""));
          try {
            O.value = await Zt(
              ((e = A.threadId) == null ? void 0 : e.trim()) || void 0,
            );
          } catch (t) {
            X.value = t instanceof Error ? t.message : "Failed to load apps";
          } finally {
            ie.value = !1;
          }
        }
      }
      async function Fe() {
        if (d.value) {
          ((se.value = !0), (V.value = ""));
          try {
            J.value = await it();
          } catch (e) {
            V.value =
              e instanceof Error ? e.message : "Failed to load MCP servers";
          } finally {
            se.value = !1;
          }
        }
      }
      async function et() {
        var e;
        if (!(!d.value || !((e = w.value) != null && e.mcpServers.length)))
          try {
            J.value = await it();
          } catch {}
      }
      function tt(e = !1) {
        (m.value === "plugins" && he(),
          m.value === "apps" && _e(),
          m.value === "skills" && (e && I.value ? at() : Fe()));
      }
      async function Ut() {
        le.value = !0;
        try {
          m.value === "plugins"
            ? await he()
            : m.value === "apps"
              ? await _e()
              : m.value === "skills" && I.value
                ? await at()
                : m.value === "skills" && (await Fe());
        } finally {
          le.value = !1;
        }
      }
      async function st(e) {
        ((h.value = e),
          (w.value = null),
          (ee.value = ""),
          (de.value = []),
          (ce.value = !0),
          (ue.value = !0));
        try {
          ((w.value = await Xt(e)),
            (h.value = w.value.summary),
            c.value && O.value.length === 0 && (await _e()),
            await et());
        } catch (t) {
          ee.value = t instanceof Error ? t.message : "Failed to load plugin";
        } finally {
          ue.value = !1;
        }
      }
      async function lt(e) {
        if (!Z.value) return !1;
        ve.value = e;
        try {
          const t = await es(e);
          return t.authorizationUrl
            ? (be(t.authorizationUrl), !0)
            : (H(`No login URL returned for ${e}`, "error"), !1);
        } catch (t) {
          return (
            H(
              t instanceof Error ? t.message : `Failed to start login for ${e}`,
              "error",
            ),
            !1
          );
        } finally {
          ve.value = "";
        }
      }
      async function Dt(e) {
        await et();
        const t = e.mcpServers.find((o) => Ye(o));
        t && (await lt(t));
      }
      function xe() {
        ce.value = !1;
      }
      async function Ft() {
        if (h.value && !Me.value) {
          B.value = !0;
          try {
            const e = await ts(h.value);
            ((de.value = e.appsNeedingAuth),
              H(`${h.value.displayName} plugin installed`));
            const t = Et(e.appsNeedingAuth);
            await he();
            const o = Q.value.find((y) => {
              var M;
              return y.id === ((M = h.value) == null ? void 0 : M.id);
            });
            o && (await st(o), !t && w.value && (await Dt(w.value)));
          } catch (e) {
            H(
              e instanceof Error ? e.message : "Failed to install plugin",
              "error",
            );
          } finally {
            B.value = !1;
          }
        }
      }
      async function xt() {
        if (h.value) {
          B.value = !0;
          try {
            const e = h.value.displayName;
            (await ss(h.value.id),
              H(`${e} plugin uninstalled`),
              xe(),
              await he());
          } catch (e) {
            H(
              e instanceof Error ? e.message : "Failed to uninstall plugin",
              "error",
            );
          } finally {
            B.value = !1;
          }
        }
      }
      async function Rt() {
        if (h.value) {
          B.value = !0;
          try {
            const e = !h.value.enabled;
            (await ls(h.value.id, e),
              (h.value = { ...h.value, enabled: e }),
              w.value &&
                (w.value = {
                  ...w.value,
                  summary: { ...w.value.summary, enabled: e },
                }),
              H(`${h.value.displayName} plugin ${e ? "enabled" : "disabled"}`),
              await he());
          } catch (e) {
            H(
              e instanceof Error ? e.message : "Failed to update plugin",
              "error",
            );
          } finally {
            B.value = !1;
          }
        }
      }
      async function Bt(e) {
        fe.value = e.id;
        try {
          const t = !e.isEnabled;
          (await as(e.id, t),
            (O.value = O.value.map((o) =>
              o.id === e.id ? { ...o, isEnabled: t } : o,
            )),
            H(`${e.name} app ${t ? "enabled" : "disabled"}`));
        } catch (t) {
          H(t instanceof Error ? t.message : "Failed to update app", "error");
        } finally {
          fe.value = "";
        }
      }
      async function at() {
        $e.value = !0;
        try {
          (await ns(), await Fe(), H("MCP servers reloaded"));
        } catch (e) {
          H(
            e instanceof Error ? e.message : "Failed to reload MCP servers",
            "error",
          );
        } finally {
          $e.value = !1;
        }
      }
      function Ot(e) {
        const t = new Set(ye.value);
        (t.has(e) ? t.delete(e) : t.add(e), (ye.value = t));
      }
      return (
        pe(m, (e) => {
          ($.name === "skills" &&
            $.query.tab !== e &&
            F.replace({ name: "skills", query: { ...$.query, tab: e } }),
            tt());
        }),
        pe(
          () => $.query.tab,
          () => {
            if ($.name !== "skills") return;
            const e = L();
            m.value !== e && (m.value = e);
          },
        ),
        pe(
          () => A.cwd,
          () => {
            m.value === "plugins" && he();
          },
        ),
        pe(
          () => A.threadId,
          () => {
            (m.value === "apps" || m.value === "plugins") && _e();
          },
        ),
        ut(async () => {
          (await Nt(), tt());
        }),
        (e, t) => {
          var o, y, M, te, ne;
          return (
            s(),
            a("div", yl, [
              n("div", hl, [
                n("div", null, [
                  t[12] ||
                    (t[12] = n(
                      "h2",
                      { class: "directory-title" },
                      "Skills & Apps",
                      -1,
                    )),
                  n("p", pl, i(Ee.value.subtitle), 1),
                ]),
                n("div", ml, [
                  n(
                    "button",
                    {
                      class: "directory-refresh",
                      type: "button",
                      disabled: le.value,
                      onClick: Ut,
                    },
                    i(le.value ? "Refreshing..." : "Refresh"),
                    9,
                    fl,
                  ),
                ]),
              ]),
              n("div", kl, [
                (s(),
                a(
                  x,
                  null,
                  K(R, (l) =>
                    n(
                      "button",
                      {
                        key: l.id,
                        class: U([
                          "directory-tab",
                          { "is-active": m.value === l.id },
                        ]),
                        type: "button",
                        role: "tab",
                        "aria-selected": m.value === l.id,
                        onClick: (C) => (m.value = l.id),
                      },
                      i(l.label),
                      11,
                      gl,
                    ),
                  ),
                  64,
                )),
              ]),
              ae.value
                ? (s(),
                  a(
                    "div",
                    {
                      key: 0,
                      class: U([
                        "directory-toast",
                        { "is-error": ae.value.type === "error" },
                      ]),
                    },
                    i(ae.value.text),
                    3,
                  ))
                : u("", !0),
              m.value === "plugins"
                ? (s(),
                  a("section", bl, [
                    n("div", _l, [
                      Re(
                        n(
                          "input",
                          {
                            "onUpdate:modelValue":
                              t[0] || (t[0] = (l) => (f.value = l)),
                            class: "directory-search",
                            type: "search",
                            placeholder: "Search plugins...",
                            "aria-label": "Search plugins",
                          },
                          null,
                          512,
                        ),
                        [[Be, f.value]],
                      ),
                      n("div", $l, [
                        n(
                          "button",
                          {
                            class: U([
                              "directory-sort-button",
                              { "is-active": S.value === "popular" },
                            ]),
                            type: "button",
                            onClick:
                              t[1] || (t[1] = (l) => (S.value = "popular")),
                          },
                          " Popular ",
                          2,
                        ),
                        n(
                          "button",
                          {
                            class: U([
                              "directory-sort-button",
                              { "is-active": S.value === "name" },
                            ]),
                            type: "button",
                            onClick: t[2] || (t[2] = (l) => (S.value = "name")),
                          },
                          " A-Z ",
                          2,
                        ),
                        n(
                          "button",
                          {
                            class: U([
                              "directory-sort-button",
                              { "is-active": S.value === "date" },
                            ]),
                            type: "button",
                            onClick: t[3] || (t[3] = (l) => (S.value = "date")),
                          },
                          " Date ",
                          2,
                        ),
                      ]),
                    ]),
                    r.value
                      ? re.value
                        ? (s(), a("div", Sl, i(re.value), 1))
                        : G.value
                          ? (s(), a("div", Cl, "Loading plugins..."))
                          : ze.value.length === 0
                            ? (s(), a("div", Al, "No plugins found."))
                            : (s(),
                              a("div", Pl, [
                                (s(!0),
                                a(
                                  x,
                                  null,
                                  K(
                                    ze.value,
                                    (l) => (
                                      s(),
                                      a(
                                        "button",
                                        {
                                          key: l.id,
                                          class: U([
                                            "directory-card",
                                            {
                                              "is-disabled":
                                                l.installed && !l.enabled,
                                            },
                                          ]),
                                          type: "button",
                                          onClick: (C) => st(l),
                                        },
                                        [
                                          n("div", Ll, [
                                            Ae(l)
                                              ? (s(),
                                                a(
                                                  "img",
                                                  {
                                                    key: 0,
                                                    class:
                                                      "directory-card-icon",
                                                    src: Ae(l),
                                                    alt: l.displayName,
                                                    loading: "lazy",
                                                  },
                                                  null,
                                                  8,
                                                  Tl,
                                                ))
                                              : (s(),
                                                a(
                                                  "div",
                                                  {
                                                    key: 1,
                                                    class:
                                                      "directory-card-fallback",
                                                    style: Wt(Mt(l)),
                                                  },
                                                  i(l.displayName.charAt(0)),
                                                  5,
                                                )),
                                            n("div", El, [
                                              n("div", Ml, [
                                                n(
                                                  "span",
                                                  Nl,
                                                  i(l.displayName),
                                                  1,
                                                ),
                                                l.installed && !l.enabled
                                                  ? (s(),
                                                    a("span", Ul, "Disabled"))
                                                  : l.installed
                                                    ? (s(),
                                                      a(
                                                        "span",
                                                        Dl,
                                                        "Installed",
                                                      ))
                                                    : u("", !0),
                                              ]),
                                              n(
                                                "span",
                                                Fl,
                                                i(
                                                  l.developerName ||
                                                    l.marketplaceDisplayName ||
                                                    l.marketplaceName ||
                                                    "Plugin",
                                                ),
                                                1,
                                              ),
                                            ]),
                                          ]),
                                          l.description
                                            ? (s(),
                                              a("p", xl, i(l.description), 1))
                                            : u("", !0),
                                          n("div", Rl, [
                                            l.category
                                              ? (s(),
                                                a("span", Bl, i(l.category), 1))
                                              : u("", !0),
                                            (s(!0),
                                            a(
                                              x,
                                              null,
                                              K(
                                                l.capabilities.slice(0, 2),
                                                (C) => (
                                                  s(),
                                                  a(
                                                    "span",
                                                    {
                                                      key: C,
                                                      class: "directory-chip",
                                                    },
                                                    i(C),
                                                    1,
                                                  )
                                                ),
                                              ),
                                              128,
                                            )),
                                          ]),
                                        ],
                                        10,
                                        Il,
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]))
                      : (s(),
                        a(
                          "div",
                          wl,
                          " Plugin APIs unavailable in this Codex CLI. Update Codex CLI to use plugin catalog features. ",
                        )),
                  ]))
                : m.value === "apps"
                  ? (s(),
                    a("section", Ol, [
                      n("div", Kl, [
                        Re(
                          n(
                            "input",
                            {
                              "onUpdate:modelValue":
                                t[4] || (t[4] = (l) => (E.value = l)),
                              class: "directory-search",
                              type: "search",
                              placeholder: "Search apps...",
                              "aria-label": "Search apps",
                            },
                            null,
                            512,
                          ),
                          [[Be, E.value]],
                        ),
                        n("div", zl, [
                          n(
                            "button",
                            {
                              class: U([
                                "directory-sort-button",
                                { "is-active": q.value === "popular" },
                              ]),
                              type: "button",
                              onClick:
                                t[5] || (t[5] = (l) => (q.value = "popular")),
                            },
                            " Popular ",
                            2,
                          ),
                          n(
                            "button",
                            {
                              class: U([
                                "directory-sort-button",
                                { "is-active": q.value === "name" },
                              ]),
                              type: "button",
                              onClick:
                                t[6] || (t[6] = (l) => (q.value = "name")),
                            },
                            " A-Z ",
                            2,
                          ),
                          n(
                            "button",
                            {
                              class: U([
                                "directory-sort-button",
                                { "is-active": q.value === "date" },
                              ]),
                              type: "button",
                              onClick:
                                t[7] || (t[7] = (l) => (q.value = "date")),
                            },
                            " Date ",
                            2,
                          ),
                        ]),
                      ]),
                      c.value
                        ? X.value
                          ? (s(), a("div", ql, i(X.value), 1))
                          : ie.value
                            ? (s(), a("div", Vl, "Loading apps..."))
                            : je.value.length === 0
                              ? (s(), a("div", Hl, "No apps found."))
                              : (s(),
                                a("div", Wl, [
                                  (s(!0),
                                  a(
                                    x,
                                    null,
                                    K(
                                      je.value,
                                      (l) => (
                                        s(),
                                        a(
                                          "article",
                                          {
                                            key: l.id,
                                            class: "directory-card",
                                          },
                                          [
                                            n("div", Gl, [
                                              Xe(l)
                                                ? (s(),
                                                  a(
                                                    "img",
                                                    {
                                                      key: 0,
                                                      class:
                                                        "directory-card-icon",
                                                      src: Xe(l),
                                                      alt: l.name,
                                                      loading: "lazy",
                                                    },
                                                    null,
                                                    8,
                                                    Yl,
                                                  ))
                                                : (s(),
                                                  a(
                                                    "div",
                                                    Jl,
                                                    i(l.name.charAt(0)),
                                                    1,
                                                  )),
                                              n("div", Ql, [
                                                n("div", Zl, [
                                                  n("span", Xl, i(l.name), 1),
                                                  l.isEnabled
                                                    ? l.isAccessible
                                                      ? (s(),
                                                        a(
                                                          "span",
                                                          ta,
                                                          "Connected",
                                                        ))
                                                      : u("", !0)
                                                    : (s(),
                                                      a(
                                                        "span",
                                                        ea,
                                                        "Disabled",
                                                      )),
                                                ]),
                                                n("span", sa, i(ft(l)), 1),
                                              ]),
                                            ]),
                                            l.description
                                              ? (s(),
                                                a("p", la, i(l.description), 1))
                                              : u("", !0),
                                            n("div", aa, [
                                              l.category
                                                ? (s(),
                                                  a(
                                                    "span",
                                                    na,
                                                    i(l.category),
                                                    1,
                                                  ))
                                                : u("", !0),
                                              (s(!0),
                                              a(
                                                x,
                                                null,
                                                K(
                                                  l.pluginDisplayNames.slice(
                                                    0,
                                                    2,
                                                  ),
                                                  (C) => (
                                                    s(),
                                                    a(
                                                      "span",
                                                      {
                                                        key: C,
                                                        class: "directory-chip",
                                                      },
                                                      i(C),
                                                      1,
                                                    )
                                                  ),
                                                ),
                                                128,
                                              )),
                                            ]),
                                            n("div", ia, [
                                              n(
                                                "button",
                                                {
                                                  class: "directory-action",
                                                  type: "button",
                                                  disabled: fe.value === l.id,
                                                  onClick: (C) => Bt(l),
                                                },
                                                i(
                                                  l.isEnabled
                                                    ? "Disable"
                                                    : "Enable",
                                                ),
                                                9,
                                                oa,
                                              ),
                                              l.installUrl
                                                ? (s(),
                                                  a(
                                                    "button",
                                                    {
                                                      key: 0,
                                                      class:
                                                        "directory-action-link",
                                                      type: "button",
                                                      onClick: (C) =>
                                                        be(l.installUrl),
                                                    },
                                                    i(
                                                      l.isAccessible
                                                        ? "Manage"
                                                        : "Login",
                                                    ),
                                                    9,
                                                    ra,
                                                  ))
                                                : u("", !0),
                                              l.isAccessible && l.isEnabled
                                                ? (s(),
                                                  a(
                                                    "button",
                                                    {
                                                      key: 1,
                                                      class: "directory-action",
                                                      type: "button",
                                                      disabled: Y.value,
                                                      onClick: (C) => It(l),
                                                    },
                                                    i(
                                                      A.tryInFlightKey === Pt(l)
                                                        ? "Starting..."
                                                        : "Try it!",
                                                    ),
                                                    9,
                                                    ca,
                                                  ))
                                                : u("", !0),
                                            ]),
                                          ],
                                        )
                                      ),
                                    ),
                                    128,
                                  )),
                                ]))
                        : (s(),
                          a(
                            "div",
                            jl,
                            " Apps APIs unavailable in this Codex CLI. Update Codex CLI to manage apps. ",
                          )),
                    ]))
                  : m.value === "skills"
                    ? (s(),
                      a("section", ua, [
                        me(
                          vl,
                          {
                            "try-in-flight-key": A.tryInFlightKey,
                            onSkillsChanged:
                              t[9] || (t[9] = (l) => N("skills-changed")),
                            onTryItem:
                              t[10] || (t[10] = (l) => N("try-item", l)),
                          },
                          {
                            "before-installed": Gt(() => [
                              n("div", da, [
                                n(
                                  "button",
                                  {
                                    class: "skills-embedded-toggle",
                                    type: "button",
                                    onClick:
                                      t[8] ||
                                      (t[8] = (l) => (oe.value = !oe.value)),
                                  },
                                  [
                                    n(
                                      "span",
                                      va,
                                      "MCPs(" + i(Ne.value.length) + ")",
                                      1,
                                    ),
                                    n(
                                      "span",
                                      {
                                        class: U([
                                          "skills-embedded-chevron",
                                          { "is-open": oe.value },
                                        ]),
                                      },
                                      "›",
                                      2,
                                    ),
                                  ],
                                ),
                                oe.value
                                  ? (s(),
                                    a("div", ya, [
                                      d.value
                                        ? V.value
                                          ? (s(), a("div", pa, i(V.value), 1))
                                          : se.value
                                            ? (s(),
                                              a(
                                                "div",
                                                ma,
                                                "Loading MCP servers...",
                                              ))
                                            : Ne.value.length === 0
                                              ? (s(),
                                                a(
                                                  "div",
                                                  fa,
                                                  "No MCP servers configured.",
                                                ))
                                              : (s(),
                                                a("div", ka, [
                                                  (s(!0),
                                                  a(
                                                    x,
                                                    null,
                                                    K(
                                                      Ne.value,
                                                      (l) => (
                                                        s(),
                                                        a(
                                                          "article",
                                                          { key: l.name },
                                                          [
                                                            n(
                                                              "button",
                                                              {
                                                                class:
                                                                  "mcp-skill-card skill-card",
                                                                type: "button",
                                                                onClick: (C) =>
                                                                  Ot(l.name),
                                                              },
                                                              [
                                                                n("div", ba, [
                                                                  n(
                                                                    "div",
                                                                    _a,
                                                                    i(
                                                                      l.name.charAt(
                                                                        0,
                                                                      ),
                                                                    ),
                                                                    1,
                                                                  ),
                                                                  n("div", $a, [
                                                                    n(
                                                                      "div",
                                                                      wa,
                                                                      [
                                                                        n(
                                                                          "span",
                                                                          Sa,
                                                                          i(
                                                                            l.name,
                                                                          ),
                                                                          1,
                                                                        ),
                                                                        n(
                                                                          "span",
                                                                          {
                                                                            class:
                                                                              U(
                                                                                [
                                                                                  "mcp-skill-badge",
                                                                                  gt(
                                                                                    l.authStatus,
                                                                                  ),
                                                                                ],
                                                                              ),
                                                                          },
                                                                          i(
                                                                            Ge(
                                                                              l.name,
                                                                            ),
                                                                          ),
                                                                          3,
                                                                        ),
                                                                      ],
                                                                    ),
                                                                    t[13] ||
                                                                      (t[13] =
                                                                        n(
                                                                          "span",
                                                                          {
                                                                            class:
                                                                              "mcp-skill-owner",
                                                                          },
                                                                          "mcp",
                                                                          -1,
                                                                        )),
                                                                  ]),
                                                                  n(
                                                                    "span",
                                                                    {
                                                                      class: U([
                                                                        "mcp-skill-chevron",
                                                                        {
                                                                          "is-open":
                                                                            ye.value.has(
                                                                              l.name,
                                                                            ),
                                                                        },
                                                                      ]),
                                                                    },
                                                                    "›",
                                                                    2,
                                                                  ),
                                                                ]),
                                                                n(
                                                                  "p",
                                                                  Ca,
                                                                  i(
                                                                    l.tools
                                                                      .length,
                                                                  ) +
                                                                    " tools · " +
                                                                    i(
                                                                      l
                                                                        .resources
                                                                        .length +
                                                                        l
                                                                          .resourceTemplates
                                                                          .length,
                                                                    ) +
                                                                    " resources",
                                                                  1,
                                                                ),
                                                                ye.value.has(
                                                                  l.name,
                                                                )
                                                                  ? (s(),
                                                                    a(
                                                                      "div",
                                                                      Aa,
                                                                      [
                                                                        l.tools
                                                                          .length >
                                                                        0
                                                                          ? (s(),
                                                                            a(
                                                                              "div",
                                                                              Pa,
                                                                              [
                                                                                t[14] ||
                                                                                  (t[14] =
                                                                                    n(
                                                                                      "h3",
                                                                                      {
                                                                                        class:
                                                                                          "directory-mini-heading",
                                                                                      },
                                                                                      "Tools",
                                                                                      -1,
                                                                                    )),
                                                                                n(
                                                                                  "p",
                                                                                  Ia,
                                                                                  i(
                                                                                    l.tools
                                                                                      .map(
                                                                                        (
                                                                                          C,
                                                                                        ) =>
                                                                                          C.title ||
                                                                                          C.name,
                                                                                      )
                                                                                      .join(
                                                                                        ", ",
                                                                                      ),
                                                                                  ),
                                                                                  1,
                                                                                ),
                                                                              ],
                                                                            ))
                                                                          : u(
                                                                              "",
                                                                              !0,
                                                                            ),
                                                                        l
                                                                          .resources
                                                                          .length >
                                                                          0 ||
                                                                        l
                                                                          .resourceTemplates
                                                                          .length >
                                                                          0
                                                                          ? (s(),
                                                                            a(
                                                                              "div",
                                                                              La,
                                                                              [
                                                                                t[15] ||
                                                                                  (t[15] =
                                                                                    n(
                                                                                      "h3",
                                                                                      {
                                                                                        class:
                                                                                          "directory-mini-heading",
                                                                                      },
                                                                                      "Resources",
                                                                                      -1,
                                                                                    )),
                                                                                n(
                                                                                  "p",
                                                                                  Ta,
                                                                                  i(
                                                                                    [
                                                                                      ...l.resources.map(
                                                                                        (
                                                                                          C,
                                                                                        ) =>
                                                                                          C.title ||
                                                                                          C.name ||
                                                                                          C.uri,
                                                                                      ),
                                                                                      ...l.resourceTemplates.map(
                                                                                        (
                                                                                          C,
                                                                                        ) =>
                                                                                          C.title ||
                                                                                          C.name ||
                                                                                          C.uriTemplate,
                                                                                      ),
                                                                                    ].join(
                                                                                      ", ",
                                                                                    ),
                                                                                  ),
                                                                                  1,
                                                                                ),
                                                                              ],
                                                                            ))
                                                                          : u(
                                                                              "",
                                                                              !0,
                                                                            ),
                                                                      ],
                                                                    ))
                                                                  : u("", !0),
                                                              ],
                                                              8,
                                                              ga,
                                                            ),
                                                          ],
                                                        )
                                                      ),
                                                    ),
                                                    128,
                                                  )),
                                                ]))
                                        : (s(),
                                          a(
                                            "div",
                                            ha,
                                            " MCP status APIs unavailable in this Codex CLI. Update Codex CLI to inspect MCP servers. ",
                                          )),
                                    ]))
                                  : u("", !0),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["try-in-flight-key"],
                        ),
                      ]))
                    : u("", !0),
              (s(),
              Pe(ct, { to: "body" }, [
                ce.value
                  ? (s(),
                    a(
                      "div",
                      {
                        key: 0,
                        class: "directory-modal-overlay",
                        onClick: Le(xe, ["self"]),
                      },
                      [
                        n("article", Ea, [
                          n("div", Ma, [
                            n("div", Na, [
                              h.value && Ae(h.value)
                                ? (s(),
                                  a(
                                    "img",
                                    {
                                      key: 0,
                                      class: "directory-card-icon",
                                      src: Ae(h.value),
                                      alt: h.value.displayName,
                                      loading: "lazy",
                                    },
                                    null,
                                    8,
                                    Ua,
                                  ))
                                : (s(),
                                  a(
                                    "div",
                                    Da,
                                    i(
                                      (o = h.value) == null
                                        ? void 0
                                        : o.displayName.charAt(0),
                                    ),
                                    1,
                                  )),
                              n("div", Fa, [
                                n(
                                  "h3",
                                  xa,
                                  i(
                                    ((y = h.value) == null
                                      ? void 0
                                      : y.displayName) || "Plugin",
                                  ),
                                  1,
                                ),
                                n(
                                  "span",
                                  Ra,
                                  i(
                                    ((M = h.value) == null
                                      ? void 0
                                      : M.developerName) ||
                                      ((te = h.value) == null
                                        ? void 0
                                        : te.marketplaceDisplayName) ||
                                      ((ne = h.value) == null
                                        ? void 0
                                        : ne.marketplaceName),
                                  ),
                                  1,
                                ),
                              ]),
                            ]),
                            n(
                              "button",
                              {
                                class: "directory-modal-close",
                                type: "button",
                                "aria-label": "Close plugin detail",
                                onClick: xe,
                              },
                              "Close",
                            ),
                          ]),
                          n("div", Ba, [
                            ee.value
                              ? (s(), a("div", Oa, i(ee.value), 1))
                              : ue.value
                                ? (s(), a("div", Ka, "Loading plugin..."))
                                : w.value
                                  ? (s(),
                                    a(
                                      x,
                                      { key: 2 },
                                      [
                                        ge.value
                                          ? (s(), a("p", za, i(ge.value), 1))
                                          : u("", !0),
                                        w.value.summary.capabilities.length > 0
                                          ? (s(),
                                            a("div", ja, [
                                              t[16] ||
                                                (t[16] = n(
                                                  "h4",
                                                  {
                                                    class:
                                                      "directory-detail-heading",
                                                  },
                                                  "Capabilities",
                                                  -1,
                                                )),
                                              n("div", qa, [
                                                (s(!0),
                                                a(
                                                  x,
                                                  null,
                                                  K(
                                                    w.value.summary
                                                      .capabilities,
                                                    (l) => (
                                                      s(),
                                                      a(
                                                        "span",
                                                        {
                                                          key: l,
                                                          class:
                                                            "directory-chip",
                                                        },
                                                        i(l),
                                                        1,
                                                      )
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ]),
                                            ]))
                                          : u("", !0),
                                        n("div", Va, [
                                          w.value.apps.length > 0
                                            ? (s(),
                                              a("div", Ha, [
                                                t[17] ||
                                                  (t[17] = n(
                                                    "h4",
                                                    {
                                                      class:
                                                        "directory-detail-heading",
                                                    },
                                                    "Apps",
                                                    -1,
                                                  )),
                                                (s(!0),
                                                a(
                                                  x,
                                                  null,
                                                  K(
                                                    w.value.apps,
                                                    (l) => (
                                                      s(),
                                                      a(
                                                        "div",
                                                        {
                                                          key: l.id,
                                                          class:
                                                            "directory-include-row",
                                                        },
                                                        [
                                                          n(
                                                            "span",
                                                            null,
                                                            i(l.name),
                                                            1,
                                                          ),
                                                          Ve(l)
                                                            ? (s(),
                                                              a(
                                                                "span",
                                                                Wa,
                                                                "GPT Plus account required",
                                                              ))
                                                            : l.installUrl
                                                              ? (s(),
                                                                a(
                                                                  "button",
                                                                  {
                                                                    key: 1,
                                                                    type: "button",
                                                                    onClick: (
                                                                      C,
                                                                    ) =>
                                                                      be(
                                                                        l.installUrl,
                                                                      ),
                                                                  },
                                                                  i(
                                                                    l.needsAuth
                                                                      ? "Login"
                                                                      : "Manage",
                                                                  ),
                                                                  9,
                                                                  Ga,
                                                                ))
                                                              : u("", !0),
                                                        ],
                                                      )
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ]))
                                            : u("", !0),
                                          w.value.skills.length > 0
                                            ? (s(),
                                              a("div", Ya, [
                                                t[18] ||
                                                  (t[18] = n(
                                                    "h4",
                                                    {
                                                      class:
                                                        "directory-detail-heading",
                                                    },
                                                    "Skills",
                                                    -1,
                                                  )),
                                                n(
                                                  "p",
                                                  Ja,
                                                  i(
                                                    w.value.skills
                                                      .map(
                                                        (l) =>
                                                          l.displayName ||
                                                          l.name,
                                                      )
                                                      .join(", "),
                                                  ),
                                                  1,
                                                ),
                                              ]))
                                            : u("", !0),
                                          w.value.mcpServers.length > 0
                                            ? (s(),
                                              a("div", Qa, [
                                                t[19] ||
                                                  (t[19] = n(
                                                    "h4",
                                                    {
                                                      class:
                                                        "directory-detail-heading",
                                                    },
                                                    "MCP servers",
                                                    -1,
                                                  )),
                                                (s(!0),
                                                a(
                                                  x,
                                                  null,
                                                  K(
                                                    w.value.mcpServers,
                                                    (l) => (
                                                      s(),
                                                      a(
                                                        "div",
                                                        {
                                                          key: l,
                                                          class:
                                                            "directory-include-row",
                                                        },
                                                        [
                                                          n("span", null, [
                                                            Yt(i(l) + " ", 1),
                                                            n(
                                                              "span",
                                                              {
                                                                class: U([
                                                                  "directory-auth-status",
                                                                  kt(l),
                                                                ]),
                                                              },
                                                              i(Ge(l)),
                                                              3,
                                                            ),
                                                          ]),
                                                          Ye(l)
                                                            ? (s(),
                                                              a(
                                                                "button",
                                                                {
                                                                  key: 0,
                                                                  type: "button",
                                                                  disabled:
                                                                    ve.value ===
                                                                    l,
                                                                  onClick: (
                                                                    C,
                                                                  ) => lt(l),
                                                                },
                                                                i(
                                                                  ve.value === l
                                                                    ? "Opening..."
                                                                    : "Authenticate",
                                                                ),
                                                                9,
                                                                Za,
                                                              ))
                                                            : u("", !0),
                                                        ],
                                                      )
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ]))
                                            : u("", !0),
                                        ]),
                                        Ke.value.length > 0
                                          ? (s(),
                                            a("div", Xa, [
                                              (s(!0),
                                              a(
                                                x,
                                                null,
                                                K(
                                                  Ke.value,
                                                  (l) => (
                                                    s(),
                                                    a(
                                                      "img",
                                                      {
                                                        key: l,
                                                        src: l,
                                                        alt: "",
                                                        loading: "lazy",
                                                      },
                                                      null,
                                                      8,
                                                      en,
                                                    )
                                                  ),
                                                ),
                                                128,
                                              )),
                                            ]))
                                          : u("", !0),
                                        de.value.length > 0
                                          ? (s(),
                                            a("div", tn, [
                                              t[20] ||
                                                (t[20] = n(
                                                  "strong",
                                                  null,
                                                  "Apps needing auth",
                                                  -1,
                                                )),
                                              (s(!0),
                                              a(
                                                x,
                                                null,
                                                K(
                                                  de.value,
                                                  (l) => (
                                                    s(),
                                                    a(
                                                      "div",
                                                      {
                                                        key: l.id,
                                                        class:
                                                          "directory-include-row",
                                                      },
                                                      [
                                                        n(
                                                          "span",
                                                          null,
                                                          i(l.name),
                                                          1,
                                                        ),
                                                        l.installUrl
                                                          ? (s(),
                                                            a(
                                                              "button",
                                                              {
                                                                key: 0,
                                                                type: "button",
                                                                onClick: (C) =>
                                                                  be(
                                                                    l.installUrl,
                                                                  ),
                                                              },
                                                              "Login",
                                                              8,
                                                              sn,
                                                            ))
                                                          : u("", !0),
                                                      ],
                                                    )
                                                  ),
                                                ),
                                                128,
                                              )),
                                            ]))
                                          : u("", !0),
                                      ],
                                      64,
                                    ))
                                  : u("", !0),
                          ]),
                          n("div", ln, [
                            h.value && h.value.installed
                              ? (s(),
                                a(
                                  "button",
                                  {
                                    key: 0,
                                    class: "directory-action danger",
                                    type: "button",
                                    disabled: B.value,
                                    onClick: xt,
                                  },
                                  i(B.value ? "Uninstalling..." : "Uninstall"),
                                  9,
                                  an,
                                ))
                              : h.value && !dt.value
                                ? (s(),
                                  a(
                                    "button",
                                    {
                                      key: 1,
                                      class: "directory-action primary",
                                      type: "button",
                                      disabled:
                                        B.value ||
                                        h.value.installPolicy ===
                                          "NOT_AVAILABLE" ||
                                        Me.value,
                                      onClick: Ft,
                                    },
                                    i(
                                      Me.value
                                        ? "ChatGPT Plus"
                                        : B.value
                                          ? "Installing..."
                                          : "Install",
                                    ),
                                    9,
                                    nn,
                                  ))
                                : h.value
                                  ? (s(),
                                    a(
                                      "button",
                                      on,
                                      " GPT Plus account required ",
                                    ))
                                  : u("", !0),
                            h.value && h.value.installed
                              ? (s(),
                                a(
                                  "button",
                                  {
                                    key: 3,
                                    class: "directory-action",
                                    type: "button",
                                    disabled: B.value,
                                    onClick: Rt,
                                  },
                                  i(h.value.enabled ? "Disable" : "Enable"),
                                  9,
                                  rn,
                                ))
                              : u("", !0),
                            h.value && h.value.installed && h.value.enabled
                              ? (s(),
                                a(
                                  "button",
                                  {
                                    key: 4,
                                    class: "directory-action primary",
                                    type: "button",
                                    disabled: B.value || Y.value,
                                    onClick:
                                      t[11] || (t[11] = (l) => Tt(h.value)),
                                  },
                                  i(
                                    A.tryInFlightKey === Lt(h.value)
                                      ? "Starting..."
                                      : "Try it!",
                                  ),
                                  9,
                                  cn,
                                ))
                              : u("", !0),
                          ]),
                        ]),
                      ],
                    ))
                  : u("", !0),
              ])),
            ])
          );
        }
      );
    },
  }),
  vn = Te(un, [["__scopeId", "data-v-a83a90a8"]]);
export { vn as default };
