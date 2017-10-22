on postman, to call env variable, use the following:

{{VARIABLE_NAME}}

npm install body-parser@1.13.3 --save


sublime: 

package control


https://packagecontrol.io/installation#st2

in sublime, go to view, show console

install package:

jsformat


https://github.com/jdc0589/JsFormat

open up the command pallet 

control shift p on pc (command shift p on mac)

to change theme, first go to package console and install package

then pick the theme package you want to install (flatland theme)

Then go to preference-> user setting

add:

https://github.com/thinkpixellab/flatland


{
  "theme": "Flatland Dark.sublime-theme",
  "color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme"
}

-------------

install sql stuff

npm install sequelize@3.5.1 --save
npm install sqlite3@3.0.10 --save

windows failed to install 3.0.10, 3.1.13 works  "sqlite3": "^3.1.13",


---sqlite browser

sqlitebrowser.org

---
.keep is used to prevent inconsistency between different operating systems.
because if a folder is empty, it will nto be commited to repository

---

to remove a file from staged list, 

git reset HEAD path/filename

---

Once you commit, you can amend if you made some change and wants to push toeghter:

git commit --amend -am "my msg"



to add heroku postgres:

heroku addons:create heroku-postgresql:hobby-dev

you can use 

heroku pg:wait

which will sit around and wait until your database's completed.

---
now, we are going to install npm for postgres

npm install pg@4.4.1 --save

npm install pg-hstore@2.3.2 --save


-----------------------------------

npm install bcrypt@0.8.5 --save

---

npm install jsonwebtoken@5.0.5 --save 
npm install crypto-js@3.1.5 --save 
