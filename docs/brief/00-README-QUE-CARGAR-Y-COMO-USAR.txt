BRIEF PARA CLAUDE / COPILOT — LANDING LUCAS CASALINS / PROGRAMA ARETÉ

Objetivo de este ZIP:
Adjuntar esta carpeta de brief al proyecto para que Claude/Copilot tenga todas las instrucciones, copy, estructura, assets esperados, dirección visual, animaciones y reglas técnicas antes de crear la landing.

Cómo usarlo:
1. Crear el proyecto React + Vite + Tailwind.
2. Copiar la carpeta docs/brief dentro de la raíz del proyecto.
3. Copiar también la carpeta .agents y/o .claude con las skills de GSAP en la raíz del proyecto.
4. Cargar los assets reales dentro de public/assets siguiendo el archivo 03-assets-map.txt.
5. En Claude/Copilot, pegar el prompt del archivo 07-claude-master-prompt.txt.
6. Pedirle que lea todos los .txt antes de escribir código.

IMPORTANTE SOBRE LAS IMÁGENES
Claude crea el código, componentes, estructura y animaciones, pero NO crea ni inventa las imágenes reales del cliente.

Los paths como:
- /assets/program/training.webp
- /assets/program/biomechanics.webp
- /assets/program/nutrition.webp
- /assets/program/app-community.webp

son rutas esperadas dentro de public/assets. Es decir: vos tenés que colocar ahí las imágenes reales, o renombrar los archivos según las imágenes que tengas.

Qué significa cada carpeta de assets:
- public/assets/brand/        Logo, favicon, marca.
- public/assets/hero/         Video principal del hero y poster del video.
- public/assets/lucas/        Fotos principales de Lucas.
- public/assets/testimonials/ Imágenes de casos de éxito / antes y después.
- public/assets/program/      Imágenes para los bloques del programa: entrenamiento, biomecánica, nutrición, app/comunidad.
- public/assets/icons/        Íconos personalizados si existieran.

Si no tenés exactamente esos nombres de archivos, podés hacer dos cosas:
1. Renombrar tus imágenes para que coincidan con estos paths.
2. Editar 03-assets-map.txt y LandingCopy.js para usar los nombres reales.

Recomendación:
Usar imágenes .webp optimizadas. Si solo tenés .jpg o .png, Claude puede usar esos paths, pero conviene convertirlas a .webp para performance.

IMPORTANTE SOBRE EL COPY
El copy de este ZIP fue armado a partir de la landing actual de lucascoacharete.com y las capturas compartidas.
En el código final, todo el copy debe vivir en:

src/content/LandingCopy.js

Ningún componente .jsx debe tener textos hardcodeados.
