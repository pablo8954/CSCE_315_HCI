//load data from APIs
window.onload = function()
{
    this.console.log("HELLO");
    this.console.log(this.sessionStorage.getItem('source_city'));
    this.document.getElementById('source').innerHTML = this.sessionStorage.getItem('source_city');
}