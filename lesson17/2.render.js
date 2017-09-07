var fs = require('fs');
process.chdir(__dirname);

module.exports = function redner(app) {
  app.use(function(req, res, next) {
    res.render = function(filename, obj) {
      fs.readFile(filename, 'utf8', function(err, str) {
        res.send(compile(str, obj));
      });
    }
    next(); // 继续配置下一个中间件(并非调用阶段)
  });
}

function compile(template, obj) {
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template // 这里预置替换内容中$表示正则匹配的到索引为1的字符串,其实也就是表达式
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
    `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return eval(script)(obj);
}

// var template = `
// <ul>
//   <% for(var i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;

// // var parse = eval(compile(template));

// console.log(compile(template ,{ supplies: ["broom", "mop", "cleaner"] }));

// "<ul>
// <% for(var i=0; i < data.articles.length; i++) { %>
//     <li>
//         <a href="/article?id=<%= data.articles[i].id %>">
//             <%= data.articles[i].title %>
//         </a>
//     </li>
// <% } %>
// </ul>"
// //////////--->>>////
// "<ul>
// <% for(var i=0; i < data.articles.length; i++) { %>
//     <li>
//         <a href="/article?id=`); 
// echo(  data.articles[i].id  ); 
// echo(`">
//             `); 
// echo(  data.articles[i].title  ); 
// echo(`
//         </a>
//     </li>
// <% } %>
// </ul>"
////////-->>>/////////
// "<ul>
// `); 
// for(var i=0; i < data.articles.length; i++) {  
// echo(`
//     <li>
//         <a href="/article?id=`); 
// echo(  data.articles[i].id  ); 
// echo(`">
//             `); 
// echo(  data.articles[i].title  ); 
// echo(`
//         </a>
//     </li>
// `); 
// }  
// echo(`
// </ul>"