# 00 · Visión y alcance

## Problema (Decidido: viene del Experimento Cero)

Pequeños productores venden su cosecha perecedera a intermediarios ("coyotes") que se quedan con la mayor parte del margen. Ejemplo recogido en entrevistas: limón comprado en huerta a $8–10/kg y revendido a ~$40/kg en destino. El productor pierde poder de negociación porque su producto se echa a perder, y pierde visibilidad de su mercancía en cuanto entra a la báscula del intermediario.

Datos de contexto del pitch: INEGI Censo Agropecuario 2022 (Jalisco, 9.3% señala a los intermediarios como problema); FIRA Programa Institucional 2025-2030 (53% de las unidades comercializa vía intermediarios). Ver `research/fuentes-y-discrepancias.md` para la cifra de pérdida poscosecha (FAO 13.2% vs. PNUMA 13%) que hay que unificar.

## JTBD (Propuesto, trabajo en curso)

- **Principal (lado productor):** *Vender* / *mi cosecha a un comprador confiable y a un precio justo* / *antes de que pierda su valor*.
- **Secundario (lado comprador, evidencia débil):** *Abastecerme* / *de producto fresco en la cantidad y calidad acordadas* / *cada semana, con proveedores confiables*.

## Qué es el MVP

Una **bolsa de cosechas**: el productor publica un lote; el comprador hace una oferta; si pactan, el pedido avanza por estados con pago en garantía simulado hasta que ambos confirman el peso y se libera el pago.

Hipótesis que el MVP debe poder probar con usuarios reales:

1. El productor publica un lote en menos de 2 minutos desde su celular.
2. El pago en garantía (aunque simulado) hace que confíen en tratar con un comprador desconocido.
3. Ver "cuánto me quedo vs. cuánto me deja el coyote" cambia su decisión de vender.

Las hipótesis 2 y 3 se validan con maquetas funcionales en entrevistas (Experimento Dos), no con pagos reales.

## Vertical (Propuesto)

Limón y hortalizas perecederas, empezando por una zona de Jalisco. El reporte sugiere berries (sur de Jalisco) o aguacate (zona montañosa) por margen alto; nuestras entrevistas hablan de limón. **Abierto:** confirmar contra las entrevistas qué cultivo y región tienen más evidencia (en el Experimento Cero hay Jalisco y Michoacán).

## Dentro del alcance

Registro de productor/comprador · publicación de lotes · ofertas · pedido con estados · garantía simulada · confirmación de peso por ambas partes · calificaciones · comparador de margen · enlaces `wa.me` a WhatsApp · modo sin señal (cola de acciones) · pedido colectivo opcional.

## Fuera del alcance (por ahora)

Pagos reales y custodia de dinero real · cadena de frío · flete · exportación · facturación (**Por investigar**: una entrevista indicó que la falta de factura le cerró puertas; no la resolvemos en el MVP pero hay que tratarla en la narrativa) · IA predictiva · blockchain · app nativa · Kubernetes.

## Restricciones

- **Capa gratuita** en todo (ver `docs/03-arquitectura.md`, sección "Qué corre dónde").
- Equipo de estudiantes con otras materias: priorizar un flujo completo y simple sobre muchas funciones a medias.
- Los usuarios objetivo piden extrema simplicidad y pago garantizado al entregar.
