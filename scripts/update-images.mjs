import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace: import nameIcon from "../../../assets/images/name.svg"; or ?url
    // With: const nameIcon = "/images/name.svg";
    let modified = content.replace(/import (\w+) from "(?:\.\.\/)*assets\/images\/([^"]+)";/g, (match, param1, param2) => {
        let cleanFile = param2.replace('?url', '');
        return `const ${param1} = "/images/${cleanFile}";`;
    });
    
    // Find literal static usages: <img src="/src/assets/images/xyz.png" />
    modified = modified.replace(/\/src\/assets\/images\//g, '/images/');
    
    if (content !== modified) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log('Fixed', filePath);
    }
  }
});
