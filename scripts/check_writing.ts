#!/usr/bin/env bun
// 万构界写作校验器 —— 工作流循环的自动质检环节
// 用法: bun run scripts/check_writing.ts [卷目录...]   默认全部正文卷
// 检查: 1)篇幅 2)逐字破折号劣化 3)格言收束连续>2 4)开头回扣弱(启发式) 5)锚点出现统计
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, basename } from "path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const BODY = join(ROOT, "正文");

// 每卷配置: target=新写/返工目标字数; mode=enforce(本卷按新规执行)|audit(存量卷只报告)
const CFG: Record<string, { target: number; mode: "enforce" | "audit"; from?: number }> = {
  "01_驭器卷": { target: 2300, mode: "audit" },
  "02_化形卷": { target: 2300, mode: "audit" },
  "03_简阵卷": { target: 2300, mode: "audit" },
  "04_明契卷": { target: 2300, mode: "audit" },
  "05_容断卷": { target: 1800, mode: "audit" },
  "06_通界卷": { target: 2300, mode: "audit" },
  "07_守序卷": { target: 2300, mode: "audit", from: 41 }, // Ch41+ 文体劣化重点
  "08_求式卷": { target: 2300, mode: "enforce" },
};

const ANCHORS: Record<string, RegExp> = {
  "约检信号": /约[－-]?检|约检/,
  "首约条款": /首约第?[一二三]条?/,
  "求式欠条R": /R-\d\d/,
  "渡桥司": /渡桥司/,
  "顾迁舟/衡": /顾迁[舟衡]/,
  "四蚀": /四蚀/,
  "创始者留白": /创始者.{0,6}留白|留白.{0,4}创始者?/,
};

const clean = (t: string) => t.replace(/[#*\s→←·`\-]{1,}/g, "").replace(/\[.*?\]\(.*?\)/g, "");
const paras = (t: string) => t.split(/\n\s*\n/).map(p => p.trim()).filter(p => p && !p.startsWith("#") && !p.startsWith("←"));

function bigrams(s: string): Set<string> {
  const g = new Set<string>();
  const c = s.replace(/[^\u4e00-\u9fff]/g, "");
  for (let i = 0; i + 1 < c.length; i++) g.add(c.slice(i, i + 2));
  return g;
}

function dashRatio(t: string): number {
  const n = clean(t).length || 1;
  return (t.match(/——/g) || []).length / n;
}

const isAphorismEnd = (p: string): boolean => {
  if (!p || p.length > 200) return false;
  if (/说|问|答|道|喊|笑|写|念|喊|叫|："|：“/.test(p)) return false;
  if (/^卷|^下一站|\*\*/.test(p)) return true;
  return !/[「“"]/.test(p) && /[。！]$/.test(p);
};

const rows: string[] = [];
const anchorCounts: Record<string, Record<string, number>> = {};
let fails = 0, warns = 0;

for (const vol of readdirSync(BODY).sort()) {
  const cfg = CFG[vol]; if (!cfg) continue;
  const dir = join(BODY, vol);
  const files = readdirSync(dir).filter(f => /^第\d+章/.test(f)).sort((a, b) => {
    const na = +basename(a).match(/\d+/)![0], nb = +basename(b).match(/\d+/)![0]; return na - nb;
  });
  let aphRun = 0, volChars = 0, volDash = 0, nShort = 0, nDegenerate = 0, nWeakLink = 0;
  const issues: string[] = [];

  files.forEach((f, i) => {
    const raw = readFileSync(join(dir, f), "utf8");
    const chars = clean(raw).length; volChars += chars;
    const dr = dashRatio(raw); volDash += dr;
    const chNo = +basename(f).match(/\d+/)![0];
    const enforce = cfg.mode === "enforce" || (cfg.from !== undefined && chNo >= cfg.from);

    if (chars < cfg.target) { nShort++; if (enforce) issues.push(`L${chNo} 篇幅 ${chars}<${cfg.target}`); }
    if (dr > 0.15) { nDegenerate++; if (enforce) issues.push(`L${chNo} 逐字破折号 ratio=${(dr * 100).toFixed(1)}%`); }

    const ps = paras(raw);
    const lastP = ps[ps.length - 1] ?? "";
    if (isAphorismEnd(lastP)) { aphRun++; if (enforce && aphRun > 2) issues.push(`L${chNo} 格言收束连续${aphRun}章`); } else aphRun = 0;

    // 开头回扣: 上一章末段与本卷首3段的双字组重合率
    if (i > 0 && !/开门|终$/.test(f)) {
      const prevRaw = readFileSync(join(dir, files[i - 1]), "utf8");
      const pp = paras(prevRaw); const tail = bigrams(pp[pp.length - 1] ?? "");
      const head = bigrams(ps.slice(0, 3).join(""));
      let shared = 0; for (const g of tail) if (head.has(g)) shared++;
      const overlap = tail.size ? shared / Math.min(tail.size, 60) : 1;
      if (overlap < 0.05) { nWeakLink++; if (enforce && i > 0) issues.push(`L${chNo} 开头回扣弱(${(overlap * 100).toFixed(0)}%)`); }
    }

    for (const [name, re] of Object.entries(ANCHORS)) {
      const m = raw.match(new RegExp(re.source, "g"));
      if (m) ((anchorCounts[vol] ??= {})[name] ??= 0), (anchorCounts[vol][name] += m.length);
    }
  });

  fails += issues.filter(s => s.startsWith("L")).length;
  warns += nShort + nDegenerate + nWeakLink - issues.length > 0 ? 1 : 0;
  rows.push(`| ${vol} | ${files.length}章 | 均${Math.round(volChars / files.length)}字 | 破折号均值${(volDash / files.length * 100).toFixed(1)}% | 短${nShort} 劣化${nDegenerate} 弱衔接${nWeakLink} | ${issues.length ? issues.slice(0, 8).join("；") + (issues.length > 8 ? ` …共${issues.length}` : "") : "✅"} |`);
}

const report = [
  "# 写作校验报告", "",
  `> 生成: ${new Date().toISOString()} · 规则见 canon/26 §三`, "",
  "| 卷 | 章数 | 篇幅 | 文体 | 问题计数 | enforce违规(前8) |", "|---|---|---|---|---|---|", ...rows, "",
  "## 锚点出现统计（与 canon/26 账本对账）", "", "| 卷 | " + Object.keys(ANCHORS).join(" | ") + " |", "|---|" + Object.keys(ANCHORS).map(() => "---").join("|") + "|",
  ...Object.entries(anchorCounts).map(([v, c]) => `| ${v} | ` + Object.keys(ANCHORS).map(a => c[a] ?? "-").join(" | ") + " |"),
].join("\n");

mkdirSync(join(ROOT, ".claude/workspace/校验报告"), { recursive: true });
writeFileSync(join(ROOT, ".claude/workspace/校验报告/latest.md"), report);
console.log(report);
console.log(`\nenforce违规: ${fails}`);
