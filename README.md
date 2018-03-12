# DiplomePlease
Paper please like for fun in the browser

# Build and run
We recommand using docker for the node and yarn client:
```bash
docker run --name DP -p 8080:8080 -it -v ${pwd}:/var/www -w /var/www node /bin/bash
```

Development server:
```bash
yarn
yarn serve
```

Build:
```bash
yarn
yarn build
```
