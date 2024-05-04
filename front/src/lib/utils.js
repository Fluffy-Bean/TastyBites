export function expandOnTyping(element) {
    element.oninput = (event) => {
        event.target.style.height = "";
        event.target.style.height = event.target.scrollHeight + 2 + "px";
    };
}
