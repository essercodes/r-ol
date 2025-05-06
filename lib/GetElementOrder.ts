/**
 * Returns the index of an element in relation to its siblings. If the element
 * has no parent it returns 0.
 * @param element
 */
export function getElementOrder(element: HTMLElement) {
    const parent = element?.parentNode;
    if (!parent) return 0;

    return Array.from(parent.children).indexOf(element);
}