## http://packadvisor.herokuapp.com/

# Installing Node and Modules

This [link](https://phoenixnap.com/kb/install-node-js-npm-on-windows) shows how to install node.js with npm (which is the package
manager for node) on Windows. Then we need to install a couple packages for our project using npm. Use the following commands:
```
npm install -g express
npm install -g node-sass
```

# Running Node

To run the project, navigate to the root directory of the project and use the command `node index.js` to start the node server.
To connect to it, open [localhost:3000](http://localhost:3000/) in any web browser and it should work. Reading through index.js is
pretty straightforward. We basically use a module called express to start a server and then handle the GET requests for
different html pages. Note that we are listening on the port 3000. This is where we will provide each page with the data needed.

# File organization

All the front end stuff is located in the frontEnd folder. Html files are in the html folder, javascript in js and css files in the css folder.
Instead of css, we are using "sass" which is just fancier and nicer css. These files have an extension of ".scss". Only edit
these when editing the css files. The sass interpreter will be installed via node as described above. To generate the css
from scss, use the command:

`sass --watch globalStyles.scss globalStyles.css`

This will watch the globalStyles.scss file for further changes and keep converting to css. Replace `globalStyles.scss` with
other scss files to convert them to scss. Scss really helps in saving variables and making faster changes.
