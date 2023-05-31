list=[];
var item_url = "https://monoame.com/awi_class/api/command.php?type=get&name=itemdata";

$.ajax({
    url: item_url,
    success: function (res) {
        list = JSON.parse(res);
        shade();
    }
});

$(".addbtn").click(
    function () {
        if (($(".input_name").val() && $(".input_price").val()) !="") {
            list.push(
                {
                    name: $(".input_name").val(),
                    price: $(".input_price").val()
                }
                )
            $(".input_name").val("");
            $(".input_price").val("");
        }
        shade();
        console.log(1)
    }
);

function shade(){
    $(".itemlist").html("");
    var sum=0;
    for (let i = 0; i < list.length; i++) {
        var item_html = ("<div class='itemlist'><li class='item'>{{num}}.{{name}}<div class='price'>{{price}}$</div><div class='del_btn' id={{id}}>X</div></li></div>")
        var current_item_html = item_html.replace("{{num}}",i+1)
                                         .replace("{{name}}",list[i].name)
                                         .replace("{{price}}",list[i].price)
                                         .replace("{{id}}",i);
        $(".content").append(current_item_html);
        sum+=parseInt(list[i].price);

        $("#"+i).click(function () { 
                list.splice(i,1);
                shade();
            });
    }
    $(".content").append("<div class='itemlist'><div class='sum_of_price'>總價:<div class='sum'>"+sum+"$</div></div></div>");
}
