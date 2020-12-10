// si la variable window tiene el value undefined significa que estamos en el server, retorna true (value active si estamos en el browser, retorna false)
export const isServer = () => typeof window === "undefined";
