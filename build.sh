technique=$1
echo "REACT_APP_TECHNIQUE=$technique" > .env.production
yarn build
pushd build
case $technique in
	"Eldric") echo "eldric-v60.surge.sh" > './CNAME';;
	"Hoffmann") echo "hoffmann-v60.surge.sh" > './CNAME';;
esac
surge
popd
