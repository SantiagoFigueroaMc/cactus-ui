import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import componentsJson from "../components.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const { components } = componentsJson;
const outDir = join(__dirname, "../../dist/vue2/");
mkdirSync(outDir, { recursive: true });

components.forEach(tag => {
  const pascal = tag.split("-")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join("");

  const wrapper = `
export default {
  name: '${pascal}',
  functional: true,
  render(h, { data, children }) {
    return h('${tag}', data, children);
  }
}
`;

  writeFileSync(join(outDir, `${pascal}.js`), wrapper);
});

console.log("Vue 2 wrappers generated!");
