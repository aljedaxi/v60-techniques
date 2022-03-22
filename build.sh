buildAndDeploy() {
	url=$1
	yarn build
	pushd build
	echo $url > ./CNAME
	echo "\n" | surge
	popd
}

buildApp() {
	technique=$1
	echo "REACT_APP_TECHNIQUE=$technique" > .env.production
	cp $technique.ico public/favicon.ico
	case $technique in
		"Eldric")      url="eldric-v60.surge.sh";;
		"Hoffmann")    url="hoffmann-v60.surge.sh";;
		"FrenchPress") url="hoffmann-french-press.surge.sh";;
		"Index")       url="coffee-recipes.surge.sh";;
	esac
	buildAndDeploy $url
}

command=$1
if [ $command = "all" ]
then
	for techne in Hoffmann Eldric FrenchPress Index
	do
		buildApp $techne
	done
else
	buildApp $technique
fi
