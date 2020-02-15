export const focusDirective = {
    inserted: (element: HTMLElement) => {
        setTimeout(() => {
            element.focus();
        }, 0);
    }
};
