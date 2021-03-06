$(document).ready(function () {
    if (!window.sessionStorage.getItem("userId")) {
        window.location.replace("/");
    }

    $("#newCharacter").on("click", function (e) {
        e.preventDefault();
        $('#characterCreator').modal('show')
    });


    $("#createCharacter").on("click", function (e) {
        e.preventDefault();

        var name = $("#character-name").val().trim();
        var roast = $("#skill_R").val().trim();
        var knife = $("#skill_K").val().trim();
        var grill = $("#skill_G").val().trim();
        var sauce = $("#skill_S").val().trim();
        var dough = $("#skill_D").val().trim();
        var userId = window.sessionStorage.getItem("userId");

        var valid = true;
        var nameInput = $("#character-name");
        var inputs = $("input[type=number]");

        nameInput.removeClass("border border-danger");
        nameInput.nextAll().attr("hidden", "hidden").attr("aria-hidden", "hidden");
        inputs.removeClass("border border-danger");


        if (nameInput.val().trim() === "" || !nameInput) {

            nameInput.addClass("border border-danger").nextAll().attr("aria-hidden", "false").removeAttr("hidden");
            valid = false;
        }
        for (var i = 0; i < inputs.length; i++) {
            $(inputs[i]).nextAll().attr("hidden", "hidden").attr("aria-hidden", "true");
            console.log(inputs[i]);
            var userInput = $(inputs[i]).val().trim();

            if (userInput === "" || !typeof userInput === "number") {
                $(inputs[i]).addClass("border border-danger").nextAll().attr("aria-hidden", "false").removeAttr("hidden");
                valid = false;
            }
        }

        if (valid) {
            createCharacter(name, roast, knife, grill, sauce, dough, userId);
        }


    })

    function createCharacter(name, roast, knife, grill, sauce, dough, userId) {
        $.post("/api/createCharacter", {
            name: name,
            skill_R: roast,
            skill_K: knife,
            skill_G: grill,
            skill_S: sauce,
            skill_D: dough,
            UserId: userId

        }).then(function (result) {
            console.log("createCharacter api call: " + result);
            window.location.reload();
        });
    };

    //go to home page when character is selected
    $(".selectCharacter").on("click", function (e) {
        e.preventDefault();
        var charId = $(this).data("id");
        console.log(charId);
        console.log("the charID is: " + charId);
        window.sessionStorage.setItem("charId", charId);
        window.location.replace("/home");
    })


}); //close document ready