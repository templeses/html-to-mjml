const cheerio = require('cheerio');


const html = `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Add your styles here */
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td>
          <img src="logo.png" alt="Logo" />
        </td>
      </tr>
      <tr>
        <td>
          <p>Hello, this is a sample email content.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`

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