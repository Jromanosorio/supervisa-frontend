// Funcion para formatear los valores numericos con puntos y comas

export default function FormatNumber(n: number) {
    let numberFormatted

    numberFormatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    }).format(n)

    return numberFormatted
}