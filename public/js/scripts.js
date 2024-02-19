const elemsTooltip = document.querySelectorAll(".tooltipped");
const instanceTooltip = M.Tooltip.init(elemsTooltip, {
    position: "left"
});

document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.datepicker');
   var instances = M.Datepicker.init(elems, options);
 });