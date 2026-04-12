const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts.json');

const files = fs.readdirSync(postsDir);
const mdFiles = files.filter(f => f.endsWith('.md'));

const posts = [];

for (const file of mdFiles) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    let title = file.replace('.md', '');
    let date = "2020-01-01"; // 默认日期
    let tags = [];
    
    // 解析 FrontMatter
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = content.match(frontMatterRegex);
    
    if (match) {
        const frontMatter = match[1];
        
        const titleMatch = frontMatter.match(/title:\s*['"]?(.*?)['"]?$/m);
        if (titleMatch) title = titleMatch[1];
        
        const dateMatch = frontMatter.match(/date:\s*(.*)$/m);
        if (dateMatch) date = dateMatch[1];
        
        const tagsMatch = frontMatter.match(/tags:\s*\[(.*?)\]/m);
        if (tagsMatch) {
            tags = tagsMatch[1].split(',').map(t => t.trim());
        }
    }
    
    // 生成简短摘要 (去除 FrontMatter 和 markdown 标记，截取前 100 个字符)
    let excerpt = content.replace(frontMatterRegex, '')
                         .replace(/[#*`>\[\]()-]/g, '')
                         .replace(/\n+/g, ' ')
                         .trim();
    excerpt = excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '');
    
    posts.push({
        id: file.replace('.md', ''),
        title,
        date,
        tags,
        excerpt
    });
}

// 按日期倒序排序
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated posts.json with ${posts.length} articles.`);
