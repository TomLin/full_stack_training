// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function previewImage(inputFile) {
    if (inputFile.files && inputFile.files[0]) {
        var allowType = "image.*";				//允許檔案格式
        if (inputFile.files[0].type.match(allowType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#Picture").prev().attr('src', e.target.result);
                $("#Picture").prev().attr('title', inputFile.files[0].name);
                $('.btn').prop('disabled', false);
            };
            reader.readAsDataURL(inputFile.files[0]);
        }
        else {
            alert("不支援上傳的檔案格式!");
            $('.btn').prop('disabled', true);
            inputFile.value = "";
            $("#Picture").prev().attr('src', "/images/NoImage.png");
            $("#Picture").prev().attr('title', "尚無圖片");
        }
    }
}