docker build -t delsud/javit-front .
echo "Image Builded"
echo "Running..."
docker run --rm -p 3000:80 -p 3500:443 -e REACT_APP_API_REMOTE -e REACT_APP_CAPTCHA_KEY -e REACT_APP_CAPTCHA_KEY -e REACT_APP_PUBLIC_AC_1 -e REACT_APP_PUBLIC_AC_2 delsud/javit-front
