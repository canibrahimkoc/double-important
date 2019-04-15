(function(){
    $.ajax({
		url:"../dist/double-important.css",
		dataType:"script",
		cache: true,
		success:function(data){
			var $importData = data;
			//$("body").append("<div id='double-important'><style>" + $importData + "</style></div>");
			// $importData
		}
	});
	var htmlInput = source ? source.getValue() : jQuery("#double-important").html();
	var out = doInline(htmlInput);
	var finalOutput = htmlInput.indexOf("<html>") === 0 ?
		"<html>\n" + out + "\n</html>" : "";
	if (!output) {
		document.getElementById("final").innerHTML = finalOutput;
		output = CodeMirror.fromTextArea(document.getElementById("final"), codeMirrorOpts);
	} else
		output.setValue(finalOutput);
    function createCSSRuleObject (stylesArray) {
        var cssObj = {};
        for(_s in stylesArray){
            var S = stylesArray[_s].split(":");
            if(S[0].trim()==""||S[1].trim()=="")continue;
            cssObj[S[0].trim()] = S[1].trim();
        }
        return cssObj;
    }
    function interpretAppendedStylesheet ($out) { 
        var stylesheet = $out[0].styleSheets[0];
        for(r in stylesheet.cssRules){
            try{
                var rule = stylesheet.cssRules[r]; 
                if(!isNaN(rule))break;
                var $destObj = $out.find(rule.selectorText);
                var obj = rule.cssText.replace(rule.selectorText, '');
                obj = obj.replace('{','').replace('}','');
                var styles = obj.split("!important;");
                $destObj.css(createCSSRuleObject(styles));
            } catch (e) { }
        }
    };
    function isPatternRelevant (newHTML, pattern, relevantPatterns) {
        if( newHTML.indexOf(pattern) > -1 )
            relevantPatterns.push(new RegExp(pattern,"i"));
    };
    function inlinify (input) {
        var tmpWindow = window.open("", "tmpHtml", "width=0,height=0");
        window.blur();
        var tmpDoc = tmpWindow.document;
        var $tmpDoc = jQuery(tmpDoc);
        tmpDoc.write(input);
        interpretAppendedStylesheet($tmpDoc);
        $tmpDoc.find("style").remove();
        var newHTML = $tmpDoc.find("html").html();
        tmpWindow.close();
        var relevantPatterns = [];
        isPatternRelevant(newHTML, "href=\"", relevantPatterns);
        isPatternRelevant(newHTML, "src=\"", relevantPatterns);
        return sanitize( newHTML, relevantPatterns );
    };
    function sanitize(html, patterns){
        var ret = html;
        for(var i=0; i<patterns.length; i++){
            ret = san(ret, patterns[i])
        }  
        return ret;
    };
    function san(html, pattern){
        var ret = "";
        var remainingString;
        var hrefIndex;
        for(var i=0; i<html.length; i++){
            remainingString = html.substring(i);
            hrefIndex = remainingString.search(pattern);
            if( hrefIndex === 0 ){
               (function(){
                   var startIndex = remainingString.indexOf("\"");
                   var endIndex = remainingString.indexOf("\"",startIndex+1);
                   var newHREF = html.substring(i+startIndex+1, i+endIndex+1);
                   newHREF = newHREF.replace(/&amp;/g, '&');
                   var regExpStartLen = "/".length;
                   var regExpFlagsLen = "/i".length;
                   ret += String(pattern).substring( regExpStartLen, String(pattern).length - regExpFlagsLen)
                        + newHREF;
                   i += endIndex;
               })();
               continue;
            } else { 
                if( hrefIndex > 0 ) {
                    ret += html.substring(i, hrefIndex);
                    i = hrefIndex-1;
                } else { 
                    ret += html.substring(i);
                    break;
                }
            }
        }
        return ret;
    };
    doInline = function(input) {
        return inlinify(input);
    }
})();


