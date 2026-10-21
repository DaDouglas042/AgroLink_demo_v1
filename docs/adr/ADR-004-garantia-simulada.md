# ADR-004 · Garantía de pago simulada

- **Estado:** Propuesto
- **Contexto:** La confianza y el pago garantizado al entregar son lo que más piden los productores entrevistados, y es lo que AgroOferta no ofrecía según el reporte (Smattcom lo resuelve con su "Transacción Protegida").
- **Decisión:** El MVP simula la retención y liberación del pago mediante estados del pedido. No se mueve ni se custodia dinero real y la interfaz lo indica claramente.
- **Razones:** Custodiar fondos de terceros puede requerir autorización regulatoria en México (**por investigar**) y no es viable en un proyecto de curso.
- **Consecuencia:** La demo prueba la experiencia y la confianza percibida, no la operación financiera. El camino a producción sería un socio regulado (pasarela o fintech).
