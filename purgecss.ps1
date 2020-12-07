#!/bin/bash

# run production build
ng build --prod --output-hashing none

# go to the dist/pedacinhos-de-amor folder
Set-Location './dist/pedacinhos-de-amor'

# make a new directory named 'css' (you can name it anything)
mkdir css

# run PurgeCSS & make a new '.css' file inside the 'css' directory
purgecss --css './styles.css' --content './index.html' './*.js' --output './css'

# replace the 'dist/pedacinhos-de-amor/styles.css' file with the 'dist/pedacinhos-de-amor/css/styles.css' file
Move-Item './css/styles.css' './styles.css'

# delete the previously created 'css' directory
Remove-Item -r 'css'