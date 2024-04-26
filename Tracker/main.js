const Pointer = document.getElementById('pointer');

document.body.addEventListener('mousemove', (event) => {
    Pointer.style.top = event.clientY + "px";
    Pointer.style.left = event.clientX + "px";
    console.log(event);
})