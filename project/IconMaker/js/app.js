// -----------------------------------------------------------
// Votre code ici
// -----------------------------------------------------------
$(function (){



let saveColor = "swatch bg_darkestgreen";
// Fabrique la grille de dim*dim "pixels"
buildGrid(32);


function buildGrid(dim) {
    let pixelItemCount = Math.pow(dim, 2);
    let pixelItem = "<div class='pixel'></div>";
    let pixelItemHTML = "";
    for (i = 1; i <= pixelItemCount; i++) {
        pixelItemHTML += pixelItem;
    }
    $(".app-screen").append(pixelItemHTML);
}


// Système principal :
$(".swatch").click(function(){
    $(".is-active").removeClass("is-active");
    $(this).addClass("is-active");
    saveColor = $(this).attr("class");
});
$(".pixel").click(function(){
    let pixelClass = $(this).attr("class")
    $(this).removeClass(pixelClass)
    $(this).addClass("pixel")
    $(this).addClass(saveColor)
    console.log(saveColor)
});
$(".pixel").dblclick(function(){
    let pixelClass = $(this).attr("class")
    $(this).removeClass(pixelClass)
    $(this).addClass("pixel")
});
$(".reset").click(function(){
    $(".app-screen").find('.swatch').removeClass()
    $(".app-screen").find('.swatch').addClass("pixel")
})
$(".export").click(function(){
    domtoimage.toJpeg(document.getElementById('content'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'pixelart.jpeg';
        link.href = dataUrl;
        link.click();
    });
})


// Nightmode
$(".bgmode").click(function(){
    if ($("body").hasClass("day")){
        $("body").addClass("night");
        $("body").removeClass("day");
    }
    else if ($("body").hasClass("night")){
        $("body").addClass("day");
        $("body").removeClass("night");
    }
})

});