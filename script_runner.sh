#!/bin/bash

#Installing npm dependencies
npm install --prefix ./recipe-front-end

if ! java -version  &> /dev/null
then
    echo "Java est nécessaire pour lancer cette application"
    exit
fi

if ! npm -v &> /dev/null
then
    echo echo "npm est nécessaire pour lancer cette application"
    exit
fi

# Terminaison d'app utilisant les memes ports
for PORT in 9001 8080 3000 
do
	kill -9 $(lsof -t -i tcp:$PORT)
done

echo "Démarrage du serveur de BD"
nohup java -classpath hsqldb/lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:hsqldb/dbdata/mydb --dbname.0 xdb >/dev/null 2>&1 &
sleep 10


echo "Démarrage du back end"
java -Xss200m -jar recipe-back-end/target/recipe.jar >/dev/null 2>&1 &
sleep 5

echo "Démarrage du front end"
nohup npm --prefix recipe-front-end/ run start >/dev/null 2>&1 &



echo "Le serveur front end peut prendre quelques minutes pour démarrer ..."