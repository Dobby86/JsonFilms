$(document).ready(function(){

console.log("we are ready!");
// #TEST RAIN TONIC

// - visualizzare la lista dei film;
// - ricerca del film tramite il titolo;
// - visualizzare il dettaglio di un film;
// - per ciascun film deve essere possibile fornire un voto da 1 a 5, non modificabile;
// - devono essere visibili 2 statistiche: numero di voti inseriti, e la media dei voti inseriti.
      

$.ajax({

    url : 'films.json',
    method : 'GET',
    data:{
        // query: variabileRicerca
    },
    success : function(risultato) {

         console.log(risultato);

     

        var source = $("#entry-template").html();

        var template = Handlebars.compile(source);

        var listaFilm = risultato;

     

        for(var i = 0; i < listaFilm.length; i++) {

            var filmCorrente = listaFilm[i];
          

       
            var voto = filmCorrente.imdbRating;
            console.log(voto);

          
             //media voto
            var votoCorretto = Math.ceil(voto / 2);

            console.log(votoCorretto);

            var context = {
                cover: filmCorrente.Images,
                title: filmCorrente.Title,
                year: filmCorrente.Year,
                language: filmCorrente.Language,
                actors: filmCorrente.Actors,
                cover2: filmCorrente.Images[2],
                stelline : generaStelle(votoCorretto)
                              
            };


            var risultatoDaAggiungere = template(context);

            // console.log(risultatoDaAggiungere);


            $(".film-container").append(risultatoDaAggiungere);


            //mettere voto
            var voti = "";

            $('#premere').on('click',function(){ 
                
                    voti ++ ;
                    var avg = Math.ceil(voti / 9);
                
                if(voti){

                    $(".conteggio").html("N° voted: " + voti /9);
                    $(".avg").html("AVG:" + avg);
                   
                }
       
               }); 
        }

            },
            error : function() {
                alert("error");
            }

        });

        ///////////Ricerca per nome
   

        $("#scrivi").keypress(function() {

                var aggiungi = $("#scrivi").val();

                $(".film").each(function() {

                    var nomeElemento = $(this).find(".title").text().toLowerCase();
                 
                    if (nomeElemento.includes(aggiungi)) {

                        $(this).show();

                        console.log("ok");

                    } else  {

                        $(this).hide();

                        console.log("ok");
                }

                });
        });
        //cambio card
     
        //mouse enter
        
        $(document).on('mouseenter', '.film', function() {
        
        
                            $(this).find(".overlay").show();
                            $(this).find(".backimg").show();
                          
        
        });
        //mouse leave
        $(document).on('mouseleave', '.film', function() {
        
                       
                         $(this).find(".overlay").hide();
        
        
        });

//stelle voto

        function generaStelle (voto){

            var stelleTot = " ";
        
                        for (var i = 0; i < voto; i++){
        
                            stelleTot += '<i id="gold" class="fas fa-star"></i>';
                        }
                        for (var i = 0 ; i < 5 - voto ;  i++ ) {
                            stelleTot += '<i id="yellow" class="far fa-star"></i>';
                        }
                        if(stelleTot < 1){

                            stelleTot += 'ND';                      

                        }

                        return stelleTot;
        }

    });
