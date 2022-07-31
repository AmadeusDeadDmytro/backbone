const creator = (allClasses, cls) => cls(allClasses);

class Base {
    constructor() {
        this.base = true;
    }
}

export const classExtender = (...classes) => classes.reduce(creator, Base);