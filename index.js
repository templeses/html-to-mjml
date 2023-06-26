const cheerio = require('cheerio');

const html = `<table>
<tr>
  <th>Company</th>
  <th>Contact</th>
  <th>Country</th>
</tr>
<tr>
  <td>Alfreds Futterkiste</td>
  <td>Maria Anders</td>
  <td>Germany</td>
</tr>
<tr>
  <td>Centro comercial Moctezuma</td>
  <td>Francisco Chang</td>
  <td>Mexico</td>
</tr>
</table>`

const $ = cheerio.load(html);

const mjml = `
<mjml>
  <mj-head>
    <!-- Add any necessary styles or attributes here -->
  </mj-head>
  <mj-body>
    ${processHTMLtoMJML($)}
  </mj-body>
</mjml>
`;

console.log('output.mjml', mjml);

function processHTMLtoMJML($) {
  let result = '';

  $('table tr').each((_, row) => {
    result += '<mj-section>';
    $(row)
      .find('td')
      .each((_, cell) => {
        result += '<mj-column>';

        $(cell)
          .find('img')
          .each((_, img) => {
            result += `<mj-image src="${$(img).attr('src')}" alt="${$(img).attr('alt')}"></mj-image>`;
          });

        $(cell)
          .find('p')
          .each((_, p) => {
            result += `<mj-text>${$(p).text()}</mj-text>`;
          });

        result += '</mj-column>';
      });
    result += '</mj-section>';
  });

  return result;
}