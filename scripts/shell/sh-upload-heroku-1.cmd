
echo. remove old images
docker rm $(docker ps -a -q)

echo. Build image
docker build --build-arg reactAppHttps=${REACT_APP_HTTPS} --build-arg reactAppCaptchaKey=${REACT_APP_CAPTCHA_KEY} --build-arg reactAppPublicAc1=${REACT_APP_PUBLIC_AC_1} --build-arg reactAppPublicAc2=${REACT_APP_PUBLIC_AC_2} -t javit-staging .

echo. Login heroku
echo. **** Puede ser que este paso, corte el script en windows! (seguir manualmente el resto de pasos)
heroku login

echo. Login heroku container
heroku container:login

echo. Tag image:
docker tag javit-staging registry.heroku.com/javit-staging/web

echo. Build the image locally and push it to Heroku’s Container Registry:
docker push registry.heroku.com/javit-staging/web

echo. Release image
heroku container:release web -a javit-staging
