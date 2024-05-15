export function expandOnTyping(element: HTMLTextAreaElement) {
    element.oninput = () => {
        element.style.height = ""; // skipcq: JS-W1032
        element.style.height = `${element.scrollHeight + 2}px`;
    };
}
