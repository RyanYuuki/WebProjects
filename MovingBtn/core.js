const btn = document.getElementById('btn');
let Horizontal = 20;
let Vertical = 20;
let MoveSpeed = 20;
document.addEventListener('keydown', (event) => {
    if(event.key == "ArrowRight")
    {
        Horizontal += MoveSpeed;
    }
    else if(event.key == "ArrowLeft")
    {
        Horizontal -= MoveSpeed;
    }
    else if(event.key == "ArrowUp")
    {
        Vertical -= MoveSpeed;
    }
    else if(event.key == "ArrowDown")
    {
        Vertical += MoveSpeed;
    }

    btn.style.top = `${Vertical}px`;
    btn.style.left = `${Horizontal}px`;
});