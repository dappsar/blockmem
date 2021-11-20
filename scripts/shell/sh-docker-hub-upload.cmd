#docker login --username delsud
docker build --rm . -t delsud/javit-front
docker tag delsud/javit-front delsud/javit-front:1.0
docker push delsud/javit-front
docker push delsud/javit-front:1.0

