
// imagens = ['imagens/login.png', 'imagens/geral.png', "imagens/layout.png"];

Obj_imagens = [];

 function monta_projetos(projetos){
    var str1 = '';
    for (i = 0; i<projetos.length; i++){
        Obj_imagens.push(projetos[i].imagens);
        console.log(projetos[i].imagens);
        var str = '';
        str = '<div class="content">';
        str+= '<div class="noma_projeto" ><div>'+projetos[i].nome+'</div></div> ';
        str+= '<div class="slide">';
        str+=      '<div class="botoes_slide">'
        str+=           '<button class="btn_anterior" id='+projetos[i].id+'-ant onclick="volta_imagem('+projetos[i].id+')"> <i class="fas fa-chevron-left"></i> </button>';
        str+=           '<button class="btn_expande" onclick="expande_imagem('+projetos[i].id+')"><i class="fas fa-external-link-alt"></i></button>'
        str+=           '<button class="btn_proximo" id='+projetos[i].id+'-prox onclick="proxima_imagem('+projetos[i].id+')"><i class="fas fa-chevron-right"></i> </button>';
        str+=       '</div>'

        str+=   '<div"><img id ="'+projetos[i].id+'" value="0"  src="'+projetos[i].imagens[0]+'">';
        str+='</div>';
        str+='<div class="descricao_projeto">';
        str+=  ' <div>'
        str+=     '<strong>Descrição:</strong>';
        str+=     '<p>'+projetos[i].descricao+'</p>';
        str+=     '<strong>tecnologias</strong>';
        str+=     '<p>'+projetos[i].tecnologias+'</p>';
        str+=    '</div>'
        str+=   '<button> <a href="'+projetos[i].link_git+'"> Acessar <i class="fab fa-github"></i></a></button>';
        str+='</div> </div>'; 
        str1+=str;
    }
    console.log(Obj_imagens);
    return str1;
    
}


function passaimagem(nome_id, imagem, x){
    // alert(nome_id);
    $( nome_id ).animate({
        opacity: 0.0,
      }, 300, function() {
        // Animation complete.
        $(nome_id).attr("src", imagem);
        $(nome_id).attr("value", x);

      }); 
      $( nome_id ).animate({
        opacity: 1.0,
      }, 300);
      
      //---------imagems grande------
      $( ".imagem_grande" ).animate({
        opacity: 0.0,
      }, 300, function() {
        // Animation complete.
        $(".imagem_grande").attr("src", imagem);
        $(".imagem_grande").attr("src", imagem);

      }); 
      $( ".imagem_grande" ).animate({
        opacity: 1.0,
      }, 300);    
}


function proxima_imagem(id){

    let imagens_list = Obj_imagens[id];
    nome_id = "#"+id;
    let x  =  $(nome_id).attr("value");
    x = parseInt(x);
    (x === imagens_list.length -1) ? (x = 0) : (x++); 
    // alert(imagens_list[x]);
    passaimagem( nome_id, imagens_list[x], x);  
}

function volta_imagem(id){
    let imagens_list = Obj_imagens[id];
    let nome_id = "#"+id;
    let x  =  $(nome_id).attr("value");
    x = parseInt(x);
    (x === 0) ? (x = imagens_list.length -1) : (x--);
    passaimagem( nome_id, imagens_list[x], x);  
}


function expande_imagem(id){
    let imagens_list = Obj_imagens[id];
    let str = '000'+id;
    // $("#area_imagem_expandida").html(str);
    $(".imagem_grande").attr("src", imagens_list[0]);
    $(".imagem_grande").attr("id", str);

    $(".slide_grande").toggle("slow");
    $(".slide_grande").css("display", "flex");
    


}

$(document).ready(function(){

    $.getJSON("js/entrada.json", function(data) {
        // console.log(data);
        $('.area_trabalho').html(monta_projetos(data));
    });

    $(".btn_fecha_imagem_expandida").click(function(){
        $(".slide_grande").toggle("slow");
    });
    $(".btn_anterior_grande").click(function(){
        // alert($(".imagem_grande").attr("id"));
        id = parseInt($(".imagem_grande").attr("id"))/1;
        volta_imagem(id)
    });

    $(".btn_proximo_grande").click(function(){
        // alert($(".imagem_grande").attr("id"));
        id = $(".imagem_grande").attr("id")/1;
        proxima_imagem(id)
    });

});
