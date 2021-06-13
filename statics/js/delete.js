function deleteProduct(id, label){
    var request = confirm(`"${label}" silmək istədiyinizdən əminsinizmi?`);
    if(request == true){
        window.location.href = "/delete/" + id
    }
}