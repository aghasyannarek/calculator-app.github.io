let typingArea = document.getElementById("typing_area");
let buttons = Array.from(document.getElementsByClassName("button"));

buttons.map(button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                typingArea.innerText = '';
                break; 
                case '⟵':
                    if(typingArea.innerText){
                        typingArea.innerText = typingArea.innerText.slice(0, -1);
                    }
                    break;
                    case "=":
                        try{
                            typingArea.innerText = eval(typingArea.innerText);
                        }catch{
                            typingArea.innerText = "Error!";
                        } 
                        break;
            default:
                typingArea.innerText += e.target.innerText;
        }
    });
});