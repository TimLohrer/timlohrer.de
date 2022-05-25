const fs = require('fs')

module.exports = function build_page (name, index, replacement) {
    let global_css = ''
    fs.readdirSync(`${__dirname}/../public/css/global`).forEach(file => {
        global_css += `<style GLOBAL=true>\n${fs.readFileSync(`${__dirname}/../public/css/global/${file}`, 'utf-8')}\n</style>\n`
    })
    let global_js = ''
    fs.readdirSync(`${__dirname}/../public/js/global`).forEach(file => {
        global_js += `<script GLOBAL=true>\n${fs.readFileSync(`${__dirname}/../public/js/global/${file}`, 'utf-8').replaceAll('{{ url }}', process.env.URL)}\n</script>\n`
    })

    let html = fs.readFileSync(`${__dirname}/../public/html/${name}.html`, 'utf-8').replaceAll('{{ url }}', process.env.URL).replaceAll(index, replacement)

    let css = '/* NO CSS FILE */'
    try {
        css = fs.readFileSync(`${__dirname}/../public/css/${name}.css`, 'utf-8')
    } catch (err) {}

    let js = '// NO JS FILE'
    try {
        js = fs.readFileSync(`${__dirname}/../public/js/${name}.js`, 'utf-8').replaceAll('{{ url }}', process.env.URL).replaceAll(index, replacement)
    } catch (err) {}
    
    html = html.replace('{{ css }}', `<style>\n${css}\n</style>`).replace('{{ js }}', `<script>\n${js}\n</script>`).replace('{{ global_css }}', `${global_css}`).replace('{{ global_js }}', global_js)
    return html;
}