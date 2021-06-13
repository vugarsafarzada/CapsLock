const getOrigin = window.location.origin;
const getPath = window.location.pathname;
const route = 'page'
const splitPath = getPath.split('/');
if (splitPath[1] == route) {
    if (splitPath[2]) {
        var id = 'num' + splitPath[2];
        document.getElementById(id).setAttribute('class', 'page-link text-secondary bg-warning');
    };
};

if (getPath == '/'){
    var id = 'num' + 1;
    document.getElementById(id).setAttribute('class', 'page-link text-secondary bg-warning');
}

function next(max) {
    var target = Number(splitPath[2]) + 1;
    if (target <= max) {
        var newURL = `${getOrigin}/${route}/${target}`
        window.location.href = newURL;

    } else if (getPath == '/') {
        var newURL = `${getOrigin}/${route}/2`
        window.location.href = newURL;

    } else {
        document.getElementById('next').setAttribute('class', 'page-link text-secondary disapled');
    };
};

function back(min) {
    var target = Number(splitPath[2]) - 1;
    if (target >= min) {
        var newURL = `${getOrigin}/${route}/${target}`;
        window.location.href = newURL;
    } else {
        document.getElementById('back').setAttribute('class', 'page-link text-secondary disapled');
    };
}