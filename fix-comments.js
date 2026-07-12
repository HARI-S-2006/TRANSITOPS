const fs = require('fs');
const path = require('path');

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove HTML comments
      content = content.replace(/<!--[\s\S]*?-->/g, '');
      
      // Fix JSX attributes
      content = content.replace(/\sfor=/g, ' htmlFor=');
      content = content.replace(/\sreadonly(="")?/g, ' readOnly');
      content = content.replace(/\schecked(="")?/g, ' defaultChecked');
      content = content.replace(/\sautocomplete=/g, ' autoComplete=');
      content = content.replace(/\sdisabled(="")?/g, ' disabled');
      content = content.replace(/\srequired(="")?/g, ' required');
      content = content.replace(/\sselected(="")?/g, ' defaultValue="true"');
      
      // Fix style="key: value;"
      content = content.replace(/style="([^"]*)"/g, (match, p1) => {
        const rules = p1.split(';').filter(Boolean);
        const objStr = rules.map(rule => {
          let [key, val] = rule.split(':');
          if (!key || !val) return '';
          key = key.trim();
          val = val.trim();
          // if val has quotes, we should be careful, e.g. 'FILL' 1
          // just stringify the val
          return `${kebabToCamel(key)}: "${val.replace(/"/g, '\\"')}"`;
        }).filter(Boolean).join(', ');
        return `style={{ ${objStr} }}`;
      });

      fs.writeFileSync(fullPath, content);
      console.log('Fixed', fullPath);
    }
  }
}

processDir('./src/app');
