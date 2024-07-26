var bp = document.createElement('script');
bp.src = "https://cdn.jsdelivr.net/npm/qexo-static@1.6.0/hexo/statistic.js";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(bp, s);
addEventListener("load", function () {
    loadStatistic("https://qexo.zuwei.top");
}, false);