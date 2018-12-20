
loadFile(element, property, value, important) {
    if (element.style.setProperty)
        element.style.setProperty(property, '');
    else
        element.style.setAttribute(property, '');

    element.setAttribute('style', element.style.cssText +
        property + ':' + value + ((important) ? ' !important' : '') + ';');
}


function loadFile(path, type){
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", path);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}


loadFile("root.css", 'css');
