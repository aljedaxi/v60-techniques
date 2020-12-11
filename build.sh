buildApp() {
	technique=$1
	echo "REACT_APP_TECHNIQUE=$technique" > .env.production
	cp $technique.ico public/favicon.ico
	yarn build
	pushd build
	case $technique in
		"Eldric") echo "eldric-v60.surge.sh" > './CNAME';;
		"Hoffmann") echo "hoffmann-v60.surge.sh" > './CNAME';;
	esac
	echo "\n" | surge
	popd
}

command=$1
if [ $command = "all" ]
then
	for techne in Hoffmann Eldric
	do
		buildApp $techne
	done
else
	buildApp $technique
fi
