export const sayHello2 = () => 'hello';

document.getElementById('btn')?.addEventListener('click', function () {
  this.innerText = 'hello';
});
