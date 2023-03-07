//gestion erreur argument
function gestErrArgt(){
    let nomPlateau=process.argv.slice(2);
    if(nomPlateau.length!=1){
        throw `erreur argument: il faut 1 seul nom de fichier`
    }
    else if (nomPlateau.length===1){
        return nomPlateau;
    }
}
let nomPlateau2=gestErrArgt();

//main code
function findOut(namePlateau){
    /*recuperer le contenu du fichier namePlateau2 et le stocker dans une variable*/
    let fs=require('fs'), colors=require('colors'), plateauV, plateauT=[''], index=0, finish;
    plateauV=fs.readFileSync(namePlateau[0],{encoding:'utf-8'}); //console.log(plateauV);
    
    /*mettre chaque ligne du plateauV dans un index de plateauT*/
    for(let i=0; i<=plateauV.length-1; i++){
        for(let j=index; j<=plateauV.length-1; j++){
            if(plateauV[j]==="\n"){
                index=j+1; break;
            }
            else if(plateauV[j]==="."|| plateauV[j]==="*"|| plateauV[j]==='1'|| plateauV[j]==='2'){
                plateauT[i]+=plateauV[j];
            }
            if(j===plateauV.length-1){
                finish=true;
            }
        }
        if(finish===true){break};    
    } //console.log(plateauT);
    
    /*supprimez la premiere ligne et le caractere undefined de plateauT puis mettre chaque colonne dans un index */
    for (let i=0; i<=plateauT.length-1; i++){
        if(i===0){plateauT.shift()};
        plateauT[i]=plateauT[i].split('undefined');
        plateauT[i].shift();
        plateauT[i]=plateauT[i][0].split('');
    } nbrElementD1Ligne=plateauT[0].length; //console.log(plateauT);
    
    //rechercher l'entrée(coordonée)
    let coordEnter;
    function findEnter(){
        for(let l=0; l<=plateauT.length-1; l++){
            for(let c=0; c<=plateauT.length-1; c++){
                if(plateauT[l][c]==='1'){
                    return coordEnter=`${l}:${c}`;
                }
            }
            
        }
    } coordEnter=findEnter(); //console.log(`Coordonnée de l'entrée ligne:colonne ${coordEnter}`); 
   
    //convertir coordEnter en tableau et convetir chaque element en number
    coordEnter=coordEnter.split(':');
    for(let i=0; i<=coordEnter.length-1; i++){coordEnter[i]=Number(coordEnter[i]);}

    //rechercher la sortie(coordonee)
    let coordExit;
    function findExit(){
        for(let l=0; l<=plateauT.length-1; l++){
            for(let c=0; c<=plateauT.length-1; c++){
                if(plateauT[l][c]==='2'){
                    return coordExit=`${l}:${c}`;
                }
            }
        }
    } coordExit=findExit(); //console.log(`Coordonnée de la sortie ligne:colonne ${coordExit}`); 
    
    //convertir coordExit en tableau et convertir chaque element en number
    coordExit=coordExit.split(':');
    for(let i=0; i<=coordExit.length-1; i++){coordExit[i]=Number(coordExit[i]);} 
    
    let nbrLigne=plateauT.length-1, nbreColonne=plateauT[0].length-1, debutL=coordEnter[0], debutC=coordEnter[1], sortieL=coordExit[0], sortieC=coordExit[1], aVisiter=[], coupFinal=undefined; //console.log(nbrLigne,nbreColonne,debutL,debutC,sortieL,sortieC);
    
    //inserer à la position 0 de aVisiter les coordonnées de depart et ajouter les case à visiter
    aVisiter.push([debutL,debutC]); aVisiter[0][0]=Number(aVisiter[0][0]); aVisiter[0][1]=Number(aVisiter[0][1]); //console.log(aVisiter);
    
    //je demarre à l'entrée
    console.log(`je demarre au coordonée ligne: ${debutL} et colonne: ${debutC}`.green);
    
    //affecter 0 coups dans l'entrée 1
    plateauT[debutL][debutC]=0; //console.log(plateauT);
    
    //acceder au case vide de plateauT pour effectuer les deplacements possibles
    for(let i=0; i<=aVisiter.length-1; i++){
        function moveNord(l,c){
            if(l<=nbrLigne && l>0){
                if(plateauT[l-1][c]==='.'){console.log('on vient de: ', l, c);
                    console.log('au nord il y a: '+plateauT[l-1][c]);
                    plateauT[l-1][c]=plateauT[l][c]+1; console.log(`deplacement nord de ${plateauT[l-1][c]} coup`);
                    //aVisiter[post+1]=l-1+':'+c; aVisiter[post+1]=aVisiter[post+1].split(':'); aVisiter[post+1][0]=Number(aVisiter[post+1][0]); aVisiter[post+1][1]=Number(aVisiter[post+1][1]); console.log(aVisiter);
                    aVisiter.push([l-1,c]); //console.log(aVisiter)
                }
                if(plateauT[l-1][c]==='2'){
                    console.log('on vient de: ', l,c);
                    console.log('au nord il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[l][c]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
                
            }
        } moveNord(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    
        function moveSud(lS,cS){
            if(0<=lS && lS<nbrLigne){
                if(plateauT[lS+1][cS]==='.'){console.log('on vient de: ',lS,cS);
                    console.log('sud: '+plateauT[lS+1][cS]);
                    plateauT[lS+1][cS]=plateauT[lS][cS]+1; console.log(`deplacement sud de ${plateauT[lS+1][cS]} coup`);
                    aVisiter.push([lS+1,cS]);
                }
                if(plateauT[lS+1][cS]==='2'){
                    console.log('on vient de: ', lS,cS);
                    console.log('au sud il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[lS][cS]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
                
            }
        }moveSud(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    
        function moveEst(lE,cE){ 
            if(cE>=0 && cE<nbreColonne){
                if(plateauT[lE][cE+1]==='.'){console.log('on vient de: ',lE,cE);
                    console.log('est il y a: '+plateauT[lE][cE+1]);
                    plateauT[lE][cE+1]=plateauT[lE][cE]+1; console.log(`deplacement est de ${plateauT[lE][cE+1]}`);
                    aVisiter.push([lE,cE+1]);
                }
                if(plateauT[lE][cE+1]==='2'){
                    console.log('on vient de: ', lE,cE);
                    console.log('à est il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[lE][cE]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
            }
        }moveEst(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    
        function moveOuest(lO,cO){
            if(cO>0 && cO<=nbreColonne){
                if(plateauT[lO][cO-1]==='.'){console.log('on vient de: ',lO,cO);
                    console.log('ouest il y a: '+plateauT[lO][cO-1]);
                    plateauT[lO][cO-1]=plateauT[lO][cO]+1; console.log(`deplacement ouest de ${plateauT[lO][cO-1]}`);
                    aVisiter.push([lO,cO-1]);
                }
                if(plateauT[lO][cO-1]==='2'){
                    console.log('on vient de: ', lO,cO);
                    console.log('à ouest il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[lO][cO]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
            }   
        }moveOuest(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    }//console.log(plateauT);

    function resultat(){
        if(coupFinal===undefined){
            //convertir plateauT en variable
            for(let i=0; i<=plateauT.length-1; i++){
                plateauT[i]=plateauT[i].join('');
            }
            plateauT=plateauT.join('\n'); console.log(plateauT); return `il n'y a pas de sortie possible`.red;
        }
        else{
            //convertir plateauT en variable
            for(let i=0; i<=plateauT.length-1; i++){
                plateauT[i]=plateauT[i].join('');
            }
            plateauT=plateauT.join('\n'); console.log(plateauT); return `On est sortie du labyrinthe en: ${coupFinal} coups`.yellow;
        }
    }console.log(resultat());
        
}findOut(nomPlateau2);