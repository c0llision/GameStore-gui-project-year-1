
function createHTMLTag(type, className, parentTag)
{
   var tag = document.createElement(type);
   tag.className = className;
   parentTag.appendChild(tag);
   return tag
}

