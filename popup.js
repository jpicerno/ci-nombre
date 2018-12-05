
$("#ci").on("keyup",function(){
  var value = $("#ci").val();
  if(validate_ci(value)){
    $("#obtener").removeAttr('disabled');
  }else{
    $("#obtener").attr("disabled", "disabled");
  }
  $("#name ").val("");

});


$("#obtener").on("click",function(){
  var value = $("#ci").val();
  var ci =  clean_ci(value);
  $.getJSON( "http://formularios.mec.gub.uy/tramites/Tramites.nsf/ObtenerPersona?OpenAgent&Cedula="+ci, function( data ){
    if(data.mensajeError!=""){
      $("#name").val(data.mensajeError);
    }else{
      var primerNombre = data.primerNombre;
      var segundoNombre = data.segundoNombre;
      var primerApellido = data.primerApellido;
      var segundoApellido = data.segundoApellido;
      primerNombre = primerNombre.toLowerCase();
      segundoNombre = segundoNombre.toLowerCase();
      primerApellido = primerApellido.toLowerCase();
      segundoApellido = segundoApellido.toLowerCase();
      primerNombre = primerNombre.charAt(0).toUpperCase()+primerNombre.slice(1);
      primerApellido = primerApellido.charAt(0).toUpperCase()+primerApellido.slice(1);
      if(segundoNombre.length>0) segundoNombre = segundoNombre.charAt(0).toUpperCase()+segundoNombre.slice(1);
      if(segundoNombre.length>0) segundoApellido = segundoApellido.charAt(0).toUpperCase()+segundoApellido.slice(1);
      $("#name").val(""+primerApellido+(segundoApellido.length>0?" ":"")+segundoApellido+", "+primerNombre+" "+segundoNombre);
    }

    /*
    primerApellido: "PICERNO"
    primerNombre: "JUAN"
    segundoApellido: "DEUS"
    segundoNombre: "MANUEL"
    */

  });



});
