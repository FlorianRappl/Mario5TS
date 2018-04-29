export function toUrl(str: string) {
	return `url(${str})`;
}

export function setStyle(element: HTMLElement | null, style: Partial<CSSStyleDeclaration>) {
  if (element) {
    for (const prop of Object.keys(style)) {
      element.style[prop] = style[prop];
    }
  }
}

export function createBox(parent: Element, cls: string) {
  const child = parent.appendChild(document.createElement('div'));
  child.classList.add(cls);
  return child;
}

export function setGauge(world: HTMLElement, cls: string, text: string) {
  const parent = world.parentElement;

  if (parent) {
    const elements = parent.getElementsByClassName(cls);

    for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = text;
    }
  }
}

export function shiftBy(element: HTMLElement | null, prop: 'top' | 'bottom' | 'left' | 'right', dir: number, step: number) {
  if (element) {
    const current = element.style[prop] || '0px';
    const sign = Math.sign(dir);
    const value = +(current.replace('px', ''));
    setStyle(element, {
      [prop]: `${value + sign * step}px`,
    });
  }
}
