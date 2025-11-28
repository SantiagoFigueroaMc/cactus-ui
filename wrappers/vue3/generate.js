import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import componentsJson from "../components.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const { components } = componentsJson;
const outDir = join(__dirname, "../../dist/vue3/");
mkdirSync(outDir, { recursive: true });

components.forEach(tag => {
  const pascal = tag.split("-")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join("");

  const wrapper = `
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: '${pascal}',
  props: {},
  setup(props, { slots, attrs }) {
    return () => h('${tag}', attrs, slots.default ? slots.default() : []);
  }
});
`;

  writeFileSync(join(outDir, `${pascal}.js`), wrapper);
});

console.log("Vue 3 wrappers generated!");
