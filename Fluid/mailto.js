/*
Fluid App URL Handler script
FastMail web interface
URL pattern: mailto:*

from: https://github.com/melomac/Fluid/blob/master/mailto.js
*/

function transform(inURLString)
{
	return "https://www.fastmail.com/action/compose/?mailto=" + inURLString;
}
