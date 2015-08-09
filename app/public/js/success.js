window.addEventListener("load",function(){
  var button = document.querySelector("button");
  button.addEventListener("click",function(){
    if(document.querySelector("input[type='hidden']").value)
      location.href = "/app";
  });
});

