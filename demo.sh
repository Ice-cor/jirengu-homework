if [ -d $1 ]; then
  echo 'error: dir exists'
  exit
else
  mkdir $1
  cd $1
  mkdir css js

  echo "h1{color: red;}" > css/style.css

  echo "<!DOCTYPE>
 <title>Hello</title>
 <h1>Hi</h1>" > index.html

  echo 'var string = "Hello World"
  alert(string)' > js/main.js

  echo 'success'
  exit
fi