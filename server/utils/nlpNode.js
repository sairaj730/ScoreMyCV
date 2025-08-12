// server/utils/nlpNode.js
const skillsList = [
  "react", "react.js", "redux", "node", "node.js", "express", "javascript", "typescript",
  "python", "django", "flask", "java", "spring", "sql", "postgresql", "mysql", "mongodb",
  "aws", "azure", "gcp", "docker", "kubernetes", "git", "rest", "graphql", "tensorflow", "pytorch"
];

function normalize(text = "") {
  return text.toLowerCase().replace(/[^\w+#.-]/g, " ");
}

export function extractSkillsFromText(text = "") {
  const norm = normalize(text);
  const found = new Set();
  for (const s of skillsList) {
    if (norm.includes(s.toLowerCase())) found.add(s);
  }
  return Array.from(found);
}

export function scoreSkills(jdSkills = [], resumeSkills = []) {
  if (!jdSkills.length) return { score: 0, matched: [], missing: jdSkills };
  const matched = jdSkills.filter(s => resumeSkills.includes(s));
  const missing = jdSkills.filter(s => !resumeSkills.includes(s));
  const score = Math.round((matched.length / jdSkills.length) * 100);
  return { score, matched, missing };
}
