
$(document).ready(function(){
    const audio = document.querySelector('.player audio');
    audio.addEventListener('play', play_evento , false);
    audio.addEventListener('canplay', play_evento , false);
    audio.addEventListener('timeupdate', atualizar , false);

    $('#backward').click( function(ev){
        audio.currentTime -= 10;
    });
    $('#forward').click( function(ev){
        audio.currentTime += 10;
    });

    $('#plus-volume').click( function(ev){
        if(audio.volume + 0.1 > 1){
            audio.volume = 1;
            return;
        }
        audio.volume += 0.1;
        
    });
    $('#minus-volume').click( function(ev){
        if(audio.volume - 0.1 < 0){
            audio.volume = 0;
            return;
        }  
        
        audio.volume -= 0.1;
        
    });

    $('#play').click( function(){
        if(audio.paused){
            audio.play();
            $('#play i').removeClass('fa-play');
            $('#play i').addClass('fa-pause');
        }else{
            audio.pause();
            $('#play i').removeClass('fa-pause');
            $('#play i').addClass('fa-play');
        }
    });

    function play_evento(){
        $('#current-time').html( secToStr( audio.currentTime) );
        $('#total-time').html( secToStr( audio.duration ) );
 
        $('.player progress').attr('max', audio.duration);
        $('.player progress').attr('value', audio.currentTime);
    }
 
    function atualizar(){
        $('#current-time').html( secToStr( audio.currentTime) );
        $('.player progress').attr('value', audio.currentTime);
    }

});


function secToStr( sec_num ) {
    sec_num = Math.floor( sec_num );
    var horas   = Math.floor(sec_num / 3600);
    var minutos = Math.floor((sec_num - (horas * 3600)) / 60);
    var segundos = sec_num - (horas * 3600) - (minutos * 60);

    if (horas   < 10) {horas   = "0"+horas;}
    if (minutos < 10) {minutos = "0"+minutos;}
    if (segundos < 10) {segundos = "0"+segundos;}
    var tempo    = horas+':'+minutos+':'+segundos;
    return tempo;
}