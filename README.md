# 💸 ShopSplit (Split)
Descarga la app en este mismo repositorio: https://github.com/cristobal140/Split2/tree/main/APK

## 🧐 ¿Qué es y qué problema soluciona?
ShopSplit es una aplicación móvil (Android/iOS) diseñada para calcular y administrar fácilmente la división de gastos y cuentas entre amigos. 

Ya sea en una cena, un viaje grupal o una compra de supermercado para varios, suele haber fricciones o dolores de cabeza al calcular exactamente **cuánto le debe cada persona a quien pagó**, especialmente cuando no todos consumieron o participaron en los mismos ítems comprados. 

El proyecto soluciona este problema permitiendo a los usuarios:
- Añadir personas involucradas.
- Registrar los productos adquiridos, su precio y **quién lo pagó originalmente**.
- Marcar de forma interactiva quiénes consumieron de cada producto.
- Obtener instantáneamente un resumen exacto indicando quién debe pagarle a quién y qué montos, reduciendo los cálculos manuales a cero.

## 🛠️ Estructura y Tecnologías
Esta aplicación móvil está diseñada y estructurada bajo el ecosistema moderno de desarrollo de aplicaciones híbridas:

*   **React Native & Expo:** El núcleo del software. Permite construir una aplicación nativa para Android y iOS utilizando JavaScript/React. Expo facilita la compilación, recarga en vivo y despliegue.
*   **Gestión de Estado de React:** Uso nativo de *Hooks* (`useState`, `useEffect`) en una arquitectura de componentes modulares ubicados en `src/components/` (Separados lógicamente por Participantes, Ítems y Resumen).
*   **Estilos Nativos:** Empleo de `StyleSheet` y algunas clases de `NativeWind`. UI limpia basada en colores claros con tipografía e íconos (`@expo/vector-icons`).
*   **Share API:** Integración directa con las funciones de "Compartir" celulares mediante la API nativa de `react-native`, logrando enviar los resúmenes financieros hacia WhatsApp u otras apps al instante.

## 🚀 Cómo correr el proyecto localmente

Para poder utilizar, probar o modificar el proyecto en tu PC, sigue estos pasos:

1. Abre tu terminal de comandos e ingresa a la carpeta del proyecto:
   ```bash
   cd ruta/a/tu/Portafolio_Projects/Split2
   ```

2. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo de Expo:
   ```bash
   npx expo start -c
   ```

4. **Para probar en tu celular:**
   - Instala la app **"Expo Go"** en tu Android o iOS desde sus respectivas tiendas.
   - Escanea el código QR que apareció en tu terminal usando la cámara de tu celular o dentro de la app Expo Go.

5. *(Alternativo)* **Para generar un instalador (APK) manual para Android:**
   ```bash
   npx eas-cli login
   npx eas-cli build -p android --profile preview
   ```

---

## 🌟 Características Principales (Features)
- Interacción rápida y dinámica de componentes sin tiempos de carga (React State).
- Opción para editar los precios de los ítems directamente desde la lista (tabla de gastos).
- Resumen automático e inteligente que consolida saldos positivos y negativos entre todos los participantes en un árbol de deudas simple.
- Tarjeta individual que enlista el desglose de lo pedido por una persona en específico.
- **Exportación e Integración de Redes:** Un botón directo para formatear elegantemente en texto el estado de la cuenta global para que pueda enviarse por WhatsApp a un grupo con solo 1 clic.
