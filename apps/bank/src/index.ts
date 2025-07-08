import express from "express";
import path from "path";

const app = express();

// Serve static files from the "web-pages" directory
app.use("/web-pages", express.static(path.join(__dirname, "web-pages")));

app.get("/hdfc", (req, res) => {
  // Try to open the page in a new browser window (not just a tab)
  const fileUrl = `http://localhost:3005/web-pages/hdfc.html?amount=${req.query.amount}&token=${req.query.token}&userId=${req.query.userId}`;
  res.send(`
    <html>
      <head>
        <script>
          window.onload = function() {
            // Try to open in a new window with features to force a window (not a tab)
            var win = window.open('${fileUrl}', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600');
            if (!win) {
              // If popup blocked, show a message
              document.getElementById('popup-msg').style.display = 'block';
            }
          }
        </script>
      </head>
      <body>
        <div id="popup-msg" style="display:none;color:red;">
          Popup was blocked! Please <a href="${fileUrl}" target="_blank" onclick="window.open('${fileUrl}', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600'); return false;">click here</a> to open the HDFC page in a new window.
        </div>
        <noscript>
          JavaScript is required to open the HDFC page in a new window. <a href="${fileUrl}" target="_blank">Click here</a> to open it manually.
        </noscript>
      </body>
    </html>
  `);
});

app.get("/axis", (req, res) => {
  // Try to open the page in a new browser window (not just a tab)
  const fileUrl = `http://localhost:3005/web-pages/axis.html?amount=${req.query.amount}&token=${req.query.token}&userId=${req.query.userId}`;
  res.send(`
      <html>
        <head>
          <script>
            window.onload = function() {
              // Try to open in a new window with features to force a window (not a tab)
              var win = window.open('${fileUrl}', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600');
              if (!win) {
                // If popup blocked, show a message
                document.getElementById('popup-msg').style.display = 'block';
              }
            }
          </script>
        </head>
        <body>
          <div id="popup-msg" style="display:none;color:red;">
            Popup was blocked! Please <a href="${fileUrl}" target="_blank" onclick="window.open('${fileUrl}', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600'); return false;">click here</a> to open the HDFC page in a new window.
          </div>
          <noscript>
            JavaScript is required to open the AXIS page in a new window. <a href="${fileUrl}" target="_blank">Click here</a> to open it manually.
          </noscript>
        </body>
      </html>
    `);
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
