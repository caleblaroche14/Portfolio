h = window.innerHeight;
w = window.innerWidth;

var p = document.getElementsByClassName('platform');
p[0].style.top = (h-(p[0].offsetHeight)) + 'px';
p[0].style.left = 0 + 'px';

p[3].style.top = ((h)-(p[3].offsetHeight)) + 'px';
p[3].style.left = ((w*.25)-p[3].offsetWidth/2) + 'px';

p[1].style.top = ((h)-(p[1].offsetHeight)) + 'px';
p[1].style.left = ((w/2)-p[1].offsetWidth/2) + 'px';

p[2].style.top = ((h)-(p[2].offsetHeight)) + 'px';
p[2].style.left = ((w*.75)-p[2].offsetWidth/2) + 'px';

