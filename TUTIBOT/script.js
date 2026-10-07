/* ============================================================
   🌟🤖 TUTIBOT
   INFINITE STAR
   CHATBOT EDUCATIVO
============================================================ */


/* ============================================================
   CONFIGURACIÓN
============================================================ */

const MANUAL_URL =
"https://drive.google.com/file/d/1aUBNz0-c13GkFKzUc_ZtbwruCsNaxjIM/view?usp=sharing";

let perfilActual = "";
let nombreActual = "";


/* ============================================================
   NORMALIZADOR
============================================================ */

function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[¿?¡!.,;:()[\]{}"'`]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* ============================================================
   HORA
============================================================ */

function horaActual() {

    return new Date().toLocaleTimeString(
        "es-MX",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* ============================================================
   REGISTRO
============================================================ */

function seleccionarPerfil(perfil) {

    const nombre =
        document
            .getElementById("nombreUsuario")
            .value
            .trim();

    if (!nombre) {

        const input =
            document.getElementById("nombreUsuario");

        input.focus();

        input.style.borderColor = "#ff426d";

        setTimeout(() => {

            input.style.borderColor = "";

        }, 1500);

        return;

    }


    nombreActual = nombre;

    perfilActual = perfil;


    localStorage.setItem(
        "tutibot_nombre",
        nombre
    );

    localStorage.setItem(
        "tutibot_perfil",
        perfil
    );


    iniciarChat();

}


/* ============================================================
   INICIAR
============================================================ */

function iniciarChat() {

    document
        .getElementById("registro")
        .classList.add("hidden");

    document
        .getElementById("chatApp")
        .classList.remove("hidden");


    const avatar =
        document.getElementById("avatarPerfil");

    const tipo =
        document.getElementById("tipoPerfil");

    const badge =
        document.getElementById("perfilBadge");

    const icon =
        document.getElementById("topicIcon");

    const title =
        document.getElementById("topicTitle");


    if (perfilActual === "estudiante") {

        avatar.textContent = "🎓";

        tipo.textContent = "Estudiante";

        badge.textContent = "ESTUDIANTE";

        icon.textContent = "🎓";

        title.textContent =
            "Orientación para estudiantes";

    } else {

        avatar.textContent = "👨‍🏫";

        tipo.textContent = "Docente / Tutor";

        badge.textContent = "DOCENTE / TUTOR";

        icon.textContent = "👨‍🏫";

        title.textContent =
            "Orientación para docentes y tutores";

    }


    document
        .getElementById("nombrePerfil")
        .textContent = nombreActual;


    mostrarBienvenida();

    cargarSugerencias();

}


/* ============================================================
   BIENVENIDA
============================================================ */

function mostrarBienvenida() {

    const chat =
        document.getElementById("chatMessages");

    chat.innerHTML = "";


    let mensaje = "";


    if (perfilActual === "estudiante") {

        mensaje = `

        <strong>¡Hola, ${escapeHTML(nombreActual)}! 👋</strong>

        <br><br>

        Soy <strong>🌟🤖 TUTIBOT</strong>,
        el asistente académico de
        <strong>INFINITE STAR</strong>.

        <br><br>

        Estoy aquí para apoyarte cuando tengas dudas
        sobre tu aprendizaje en línea.

        <br><br>

        <strong>📚 Puedo ayudarte con:</strong>

        <br>🎓 ¿Qué es la tutoría online?
        <br>📘 ¿Qué es Google Classroom?
        <br>📤 ¿Cómo subir una actividad?
        <br>📄 ¿Cómo entregar un PDF o Word?
        <br>⏰ ¿Cómo organizar mi tiempo?
        <br>📚 ¿Cómo estudiar?
        <br>💬 ¿Cómo pedir ayuda al tutor?
        <br>⭐ ¿Cómo mejorar mi autonomía?

        <br><br>

        También puedes preguntarme de manera informal.

        <br><br>

        Por ejemplo:

        <br>
        <em>"classroom"</em>

        <br>
        <em>"no entiendo mi tarea"</em>

        <br>
        <em>"como subo esto"</em>

        <br>
        <em>"tengo muchas tareas"</em>

        <br><br>

        Y si necesitas consultar el manual,
        utiliza el botón <strong>📘</strong>.
        `;

    } else {

        mensaje = `

        <strong>¡Bienvenido, ${escapeHTML(nombreActual)}! 👨‍🏫</strong>

        <br><br>

        Soy <strong>🌟🤖 TUTIBOT</strong>,
        asistente de apoyo para la tutoría online
        de <strong>INFINITE STAR</strong>.

        <br><br>

        Puedes consultarme sobre:

        <br>🎓 Concepto de tutoría online
        <br>👨‍🏫 Funciones del tutor
        <br>📘 Google Classroom
        <br>💻 ¿Qué es un LMS?
        <br>🏫 Organización de cursos
        <br>📊 Seguimiento académico
        <br>📝 Retroalimentación
        <br>💬 Comunicación
        <br>❤️ Motivación
        <br>⚙️ Problemas técnicos
        <br>📉 Bajo rendimiento
        <br>👥 Situaciones tutoriales

        <br><br>

        Puedes describir una situación directamente.

        <br><br>

        Ejemplo:

        <br>
        <em>"Un estudiante no entrega tareas"</em>

        <br>
        <em>"¿Cómo debo atender a un alumno desmotivado?"</em>

        <br>
        <em>"¿Qué debe hacer un tutor?"</em>

        <br>
        <em>"¿Cómo organizo mi Classroom?"</em>
        `;

    }


    agregarMensaje(
        mensaje,
        "bot"
    );

}


/* ============================================================
   MENSAJE
============================================================ */

function agregarMensaje(texto, tipo) {

    const chat =
        document.getElementById(
            "chatMessages"
        );


    const mensaje =
        document.createElement("div");

    mensaje.className =
        `message ${tipo}`;


    const contenido =
        document.createElement("div");

    contenido.className =
        "message-content";


    const burbuja =
        document.createElement("div");

    burbuja.className =
        "bubble";

    burbuja.innerHTML =
        texto;


    const hora =
        document.createElement("div");

    hora.className =
        "message-time";

    hora.textContent =
        horaActual();


    contenido.appendChild(
        burbuja
    );

    contenido.appendChild(
        hora
    );

    mensaje.appendChild(
        contenido
    );

    chat.appendChild(
        mensaje
    );


    chat.scrollTop =
        chat.scrollHeight;

}


/* ============================================================
   ENVIAR
============================================================ */

function enviarMensaje() {

    const input =
        document.getElementById(
            "userInput"
        );


    const texto =
        input.value.trim();


    if (!texto) return;


    agregarMensaje(
        escapeHTML(texto),
        "user"
    );


    input.value = "";


    mostrarTyping();


    setTimeout(() => {

        ocultarTyping();


        const respuesta =
            generarRespuesta(texto);


        agregarMensaje(
            respuesta,
            "bot"
        );


    }, 450 + Math.random() * 650);

}


/* ============================================================
   ENTER
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById(
                "userInput"
            );


        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    enviarMensaje();

                }

            }
        );


        const nombre =
            localStorage.getItem(
                "tutibot_nombre"
            );

        const perfil =
            localStorage.getItem(
                "tutibot_perfil"
            );


        if (
            nombre &&
            perfil
        ) {

            nombreActual = nombre;

            perfilActual = perfil;

        }

    }
);


/* ============================================================
   50 SITUACIONES ESTUDIANTE
============================================================ */

const ESTUDIANTE = [

{
keys:[
"que es la tutoria online",
"que es tutoria online",
"tutoria online",
"tutoria en linea"
],
answer:`
<strong>¿Qué es la tutoría online?</strong>

Es un proceso de acompañamiento educativo que utiliza
herramientas digitales y plataformas virtuales.

El tutor orienta, resuelve dudas, proporciona
retroalimentación, da seguimiento y ayuda al estudiante
a desarrollar progresivamente su autonomía.
`
},

{
keys:[
"objetivo tutoria",
"para que sirve tutor",
"para que sirve tutoria"
],
answer:`
<strong>Objetivo de la tutoría online:</strong>

Acompañarte durante tu proceso académico para ayudarte
a comprender qué debes hacer, cómo hacerlo, qué estás
realizando correctamente y qué necesitas mejorar.

La finalidad es que cada vez puedas trabajar con mayor
autonomía.
`
},

{
keys:[
"importancia tutoria",
"por que es importante tutor",
"importante tutoria"
],
answer:`
La tutoría es importante porque permite recibir orientación,
comunicación, seguimiento y retroalimentación.

También ayuda cuando existen dificultades académicas,
técnicas, organizativas o de motivación.
`
},

{
keys:[
"que hace un tutor",
"funciones tutor",
"que hace tutor"
],
answer:`
<strong>Un tutor puede:</strong>

• Orientar.
• Acompañar.
• Resolver dudas.
• Dar retroalimentación.
• Corregir.
• Motivar.
• Dar seguimiento.
• Detectar dificultades.
• Favorecer la autonomía.

El tutor no realiza las actividades por el estudiante.
`
},

{
keys:[
"antes actividad",
"tutor antes",
"que hace tutor antes"
],
answer:`
Antes de una actividad, el tutor debe explicar:

• Objetivo.
• Instrucciones.
• Recursos.
• Producto esperado.
• Tiempo.
• Forma de evaluación.

También debe comprobar que las indicaciones sean claras.
`
},

{
keys:[
"durante actividad",
"tutor durante",
"que hace tutor durante"
],
answer:`
Durante una actividad, el tutor acompaña, responde dudas,
orienta, proporciona retroalimentación y observa el avance.

Su intervención debe permitir que el estudiante continúe
realizando su propio trabajo.
`
},

{
keys:[
"despues actividad",
"tutor despues",
"cuando entregue"
],
answer:`
Después de una actividad, el tutor revisa el trabajo,
proporciona retroalimentación, identifica fortalezas,
señala aspectos de mejora y da seguimiento.
`
},

{
keys:[
"tutor puede hacer tarea",
"hacer tarea por mi",
"que haga mi tarea"
],
answer:`
No. El tutor no debe realizar tu tarea.

Puede ayudarte mediante explicaciones, ejemplos,
preguntas orientadoras y recursos para que tú puedas
resolverla.
`
},

{
keys:[
"no entiendo actividad",
"no entiendo tarea",
"no entiendo"
],
answer:`
Si no entiendes una actividad:

1. Lee nuevamente las instrucciones.
2. Identifica exactamente qué parte no comprendes.
3. Revisa los materiales.
4. Intenta comenzar.
5. Pregunta al tutor explicando tu dificultad.

No necesitas saber cómo resolver todo antes de pedir ayuda.
`
},

{
keys:[
"como pedir ayuda",
"necesito ayuda",
"ayuda tutor"
],
answer:`
Cuando pidas ayuda, explica:

• Qué actividad estás realizando.
• Qué comprendiste.
• Qué parte no entiendes.
• Qué intentaste hacer.

Así el tutor podrá orientarte mejor.
`
},

{
keys:[
"que es classroom",
"google classroom",
"classroom"
],
answer:`
<strong>Google Classroom</strong> es una plataforma educativa
que permite organizar cursos, publicar materiales,
asignar actividades, establecer fechas, recibir trabajos,
comunicar información y proporcionar retroalimentación.
`
},

{
keys:[
"para que sirve classroom",
"funciona classroom",
"uso classroom"
],
answer:`
Classroom sirve para consultar materiales, revisar
actividades, conocer fechas, entregar trabajos, recibir
comentarios y mantener organizada tu actividad académica.
`
},

{
keys:[
"entrar classroom",
"como entro classroom",
"ingresar classroom"
],
answer:`
Para entrar a Classroom:

1. Abre Google Classroom.
2. Inicia sesión.
3. Selecciona tu clase.
4. Revisa la sección de Trabajo de clase.

Si tienes problemas para acceder, comunícalo a tu docente.
`
},

{
keys:[
"codigo classroom",
"codigo de clase",
"unirme a classroom"
],
answer:`
Para unirte mediante código:

1. Ingresa a Classroom.
2. Selecciona la opción para unirte a una clase.
3. Escribe el código proporcionado por tu docente.
4. Confirma.
`
},

{
keys:[
"ver tareas",
"donde estan tareas",
"mis tareas"
],
answer:`
En Classroom puedes consultar tus actividades desde
<strong>Trabajo de clase</strong>.

Selecciona una actividad para revisar instrucciones,
materiales y fecha de entrega.
`
},

{
keys:[
"fecha tarea",
"cuando entregar",
"fecha entrega"
],
answer:`
Abre la actividad correspondiente y revisa la fecha y hora
establecidas.

También puedes revisar tus actividades pendientes desde
Classroom.
`
},

{
keys:[
"subir actividad",
"subir tarea",
"como subo una tarea",
"como entrego"
],
answer:`
<strong>Para subir una actividad:</strong>

1. Abre la actividad.
2. Lee las instrucciones.
3. Agrega o crea el archivo.
4. Espera a que termine de cargar.
5. Comprueba que sea el archivo correcto.
6. Presiona <strong>Entregar</strong>.
`
},

{
keys:[
"subir word",
"word classroom",
"documento word"
],
answer:`
Para subir un documento Word:

1. Abre la actividad.
2. Selecciona agregar archivo.
3. Busca tu documento.
4. Espera la carga.
5. Comprueba el archivo.
6. Entrega la actividad.
`
},

{
keys:[
"subir pdf",
"pdf classroom",
"documento pdf"
],
answer:`
Para subir un PDF:

1. Abre la actividad.
2. Selecciona agregar archivo.
3. Busca el PDF.
4. Espera a que termine la carga.
5. Comprueba el documento.
6. Selecciona Entregar.
`
},

{
keys:[
"archivo equivocado",
"subi archivo equivocado",
"me equivoque archivo"
],
answer:`
Si Classroom permite modificar la entrega, reemplaza
el archivo incorrecto por el correcto.

Si no puedes hacerlo, comunícate con tu docente o tutor
para saber qué procedimiento seguir.
`
},

{
keys:[
"no puedo subir",
"classroom no me deja",
"no puedo entregar"
],
answer:`
Comprueba:

• Internet.
• Formato.
• Tamaño del archivo.
• Inicio de sesión.
• Espacio disponible.

Si el problema continúa, informa al docente y explica
qué sucede.
`
},

{
keys:[
"organizar tiempo",
"organizar mi tiempo",
"tiempo estudio"
],
answer:`
Para organizar tu tiempo:

1. Haz una lista de actividades.
2. Revisa fechas.
3. Establece prioridades.
4. Divide tareas grandes.
5. Define horarios.
6. Incluye descansos.
`
},

{
keys:[
"hacer horario",
"horario estudio",
"organizar horario"
],
answer:`
Crea un horario considerando tus clases, tareas,
descansos y otras responsabilidades.

Procura distribuir las actividades en diferentes días
en lugar de concentrarlas todas al final.
`
},

{
keys:[
"muchas tareas",
"muchas actividades",
"demasiadas tareas"
],
answer:`
Si tienes muchas tareas:

• Haz una lista.
• Ordena por fecha.
• Identifica cuáles requieren más tiempo.
• Divide las actividades.
• Trabaja una a la vez.
`
},

{
keys:[
"me atrase",
"estoy atrasado",
"atrasado"
],
answer:`
Primero identifica qué actividades tienes pendientes.

Después ordénalas por prioridad y fecha.

Si existe una dificultad que impide cumplir una fecha,
comunícala al docente o tutor.
`
},

{
keys:[
"procrastino",
"dejar todo al ultimo",
"ultima hora"
],
answer:`
Para evitar dejar todo al último:

• Empieza con anticipación.
• Divide tareas grandes.
• Establece pequeñas metas.
• Utiliza horarios.
• Define avances antes de la fecha oficial.
`
},

{
keys:[
"priorizar tareas",
"que tarea hago primero",
"prioridad"
],
answer:`
Prioriza considerando:

1. Fecha más cercana.
2. Tiempo necesario.
3. Importancia.
4. Dependencia de otras actividades.

Después continúa con las siguientes.
`
},

{
keys:[
"como estudiar",
"estudiar mejor",
"mejorar estudio"
],
answer:`
Para estudiar mejor:

• Establece horarios.
• Reduce distracciones.
• Usa técnicas de estudio.
• Realiza descansos.
• Explica el tema con tus propias palabras.
• Comprueba lo que realmente comprendiste.
`
},

{
keys:[
"no me concentro",
"no puedo concentrarme",
"me distraigo"
],
answer:`
Reduce notificaciones y distracciones.

Define una meta pequeña para cada sesión de estudio
y trabaja durante un periodo determinado antes de tomar
un descanso.
`
},

{
keys:[
"no se por donde empezar",
"por donde empiezo",
"como empiezo"
],
answer:`
Empieza identificando qué debes entregar.

Después divide la actividad:

1. Leer.
2. Identificar.
3. Buscar información.
4. Elaborar.
5. Revisar.
6. Entregar.
`
},

{
keys:[
"no entiendo tema",
"no entiendo contenido",
"tema dificil"
],
answer:`
Identifica exactamente qué concepto no comprendes.

Después busca un ejemplo, revisa el material y pregunta
al tutor explicando qué parte te resulta difícil.
`
},

{
keys:[
"pena preguntar",
"me da pena preguntar",
"miedo preguntar"
],
answer:`
No necesitas sentir vergüenza por tener dudas.

Las preguntas forman parte del aprendizaje.

Puedes comenzar diciendo:

"Entiendo esta parte, pero tengo dificultad con..."
`
},

{
keys:[
"cometi error",
"me equivoque",
"error"
],
answer:`
Un error puede ayudarte a aprender.

Identifica qué ocurrió, comprende por qué y realiza
la corrección.

Después intenta aplicar lo aprendido nuevamente.
`
},

{
keys:[
"mejorar trabajo",
"mejorar tarea",
"corregir trabajo"
],
answer:`
Antes de entregar revisa:

• Instrucciones.
• Contenido.
• Ortografía.
• Organización.
• Evidencias solicitadas.
• Formato.
• Fecha de entrega.
`
},

{
keys:[
"como saber si aprendo",
"estoy aprendiendo",
"saber si aprendo"
],
answer:`
Puedes comprobarlo intentando:

• Explicar el tema sin copiar.
• Resolver un ejercicio.
• Responder preguntas.
• Aplicar el conocimiento a otra situación.
`
},

{
keys:[
"examen",
"preparar examen",
"estudiar examen"
],
answer:`
Para prepararte para un examen:

1. Identifica los temas.
2. Organiza sesiones.
3. Realiza preguntas.
4. Practica.
5. Revisa errores.
6. Explica los contenidos con tus propias palabras.
`
},

{
keys:[
"no tengo ganas estudiar",
"sin ganas",
"no quiero estudiar"
],
answer:`
Empieza con una actividad pequeña.

Establece una meta concreta y alcanzable y reconoce
el avance que logres.

No necesitas completar todo en una sola sesión.
`
},

{
keys:[
"siento que no puedo",
"no puedo",
"es muy dificil"
],
answer:`
Cuando algo parece demasiado difícil, divídelo en partes
más pequeñas.

Empieza por la parte que puedas comprender y solicita
orientación sobre la dificultad específica.
`
},

{
keys:[
"ser autonomo",
"aprendizaje autonomo",
"ser mas autonomo"
],
answer:`
Para desarrollar autonomía:

• Organiza tu tiempo.
• Busca información.
• Intenta resolver problemas.
• Evalúa tus avances.
• Aprende de tus errores.
• Solicita ayuda cuando la necesites.
`
},

{
keys:[
"establecer metas",
"metas academicas",
"objetivos estudio"
],
answer:`
Establece metas específicas.

Ejemplo:

"Terminaré la actividad de Classroom antes del jueves
y revisaré mi trabajo antes de entregarlo."
`
},

{
keys:[
"que mejorar",
"que necesito mejorar",
"areas de mejora"
],
answer:`
Revisa tu retroalimentación y observa qué errores se repiten.

Selecciona uno o dos aspectos para mejorar primero y
aplícalos en las siguientes actividades.
`
},

{
keys:[
"bajo rendimiento",
"me esta yendo mal",
"bajas calificaciones"
],
answer:`
Identifica qué puede estar afectando tu rendimiento:

• Organización.
• Comprensión.
• Entregas.
• Tiempo.
• Dificultades técnicas.
• Participación.

Después habla con tu tutor.
`
},

{
keys:[
"no puedo cumplir fecha",
"no alcanzare",
"no voy a entregar"
],
answer:`
Comunica la situación lo antes posible.

Explica brevemente la dificultad y pregunta qué alternativas
existen de acuerdo con las reglas del curso.
`
},

{
keys:[
"retroalimentacion",
"comentarios tutor",
"feedback"
],
answer:`
La retroalimentación te ayuda a identificar:

<strong>Qué está bien → qué mejorar → cómo mejorar.</strong>

No te limites a observar la calificación.
Lee también los comentarios.
`
},

{
keys:[
"herramientas tutoria",
"herramientas digitales",
"herramientas tutor"
],
answer:`
Un tutor puede utilizar:

• LMS.
• Classroom.
• Videoconferencias.
• Chats.
• Correo.
• Formularios.
• Documentos colaborativos.
• Recursos multimedia.
`
},

{
keys:[
"comunicacion tutor",
"hablar tutor",
"contactar tutor"
],
answer:`
Utiliza los canales establecidos por el curso.

Explica qué actividad realizas, qué comprendiste y
cuál es tu dificultad.
`
},

{
keys:[
"diferencia online presencial",
"online presencial",
"tutoria presencial"
],
answer:`
La tutoría presencial se desarrolla principalmente en
un espacio físico.

La tutoría online utiliza herramientas digitales y puede
ser síncrona o asíncrona.

La diferencia principal está en el medio utilizado.
`
},

{
keys:[
"manual classroom",
"manual de classroom",
"manual estudiante",
"manual"
],
answer:`
Claro. Puedes consultar directamente el manual de apoyo
para Google Classroom.

<br>

<a href="${MANUAL_URL}"
target="_blank"
rel="noopener noreferrer"
class="bot-link">

📘 ABRIR MANUAL DE CLASSROOM

</a>

<br><br>

Si tienes otra duda, puedes continuar preguntándome
en este mismo espacio.
`
},

{
keys:[
"que puedo preguntarte",
"en que me ayudas",
"que puedes hacer",
"ayuda"
],
answer:`
Puedes preguntarme sobre:

🎓 Tutoría online
📘 Classroom
📤 Actividades
⏰ Organización
📚 Estudio
💬 Comunicación
⭐ Autonomía
📝 Retroalimentación
💻 Problemas técnicos

Y si tu duda no aparece exactamente, descríbeme
tu situación con tus propias palabras.
`
}

];


/* ============================================================
   50 SITUACIONES DOCENTE / TUTOR
============================================================ */

const DOCENTE = [

{
keys:["que es tutoria","tutoria online","tutoria en linea"],
answer:`
<strong>¿Qué es la tutoría online?</strong>

Es un proceso de acompañamiento educativo mediante
herramientas digitales.

El tutor orienta, comunica, acompaña, retroalimenta,
da seguimiento y favorece la autonomía del estudiante.
`
},

{
keys:["funciones tutor","que hace tutor","funcion tutor"],
answer:`
<strong>Funciones principales del tutor:</strong>

• Orientador.
• Facilitador.
• Comunicador.
• Motivador.
• Evaluador.
• Acompañante.
• Proveedor de retroalimentación.
• Responsable del seguimiento.

Su función principal es acompañar el aprendizaje,
no realizar las actividades del estudiante.
`
},

{
keys:["perfil tutor","como debe ser tutor","habilidades tutor"],
answer:`
Un tutor necesita habilidades:

• Pedagógicas.
• Tecnológicas.
• Comunicativas.
• Organizativas.
• Sociales.

Debe observar, analizar, identificar necesidades,
orientar, comunicar, retroalimentar, motivar y evaluar.
`
},

{
keys:["que es lms","lms","plataforma lms"],
answer:`
<strong>LMS</strong> significa
<strong>Learning Management System</strong>.

Es un sistema de gestión del aprendizaje que permite
organizar cursos, contenidos, actividades, comunicación,
evaluación y seguimiento académico.

Google Classroom puede utilizarse como entorno de gestión
para organizar el trabajo educativo.
`
},

{
keys:["organizar classroom","organizar curso","organizar clase"],
answer:`
Para organizar un curso en Classroom:

1. Define la estructura.
2. Organiza temas.
3. Publica materiales.
4. Crea actividades.
5. Establece fechas.
6. Define criterios.
7. Comunica indicaciones.
8. Da seguimiento.
9. Retroalimenta.
`
},

{
keys:["crear actividad classroom","crear tarea","publicar tarea"],
answer:`
Antes de publicar una actividad revisa:

• Título.
• Instrucciones.
• Recursos.
• Producto esperado.
• Fecha.
• Criterios de evaluación.
• Forma de entrega.

Después comprueba que sea comprensible desde la perspectiva
del estudiante.
`
},

{
keys:["estudiante confundido","no entiende instrucciones","confundido"],
answer:`
<strong>Estudiante confundido:</strong>

Primero identifica qué parte no comprende.

Después:

1. Explica.
2. Utiliza un ejemplo.
3. Haz una pregunta para comprobar comprensión.
4. Permite que el estudiante continúe.

No realices la actividad por él.
`
},

{
keys:["no entrega","no entrega tareas","dejo de entregar"],
answer:`
<strong>Estudiante que dejó de entregar:</strong>

No comiences directamente con una sanción.

Observa su desempeño anterior, establece comunicación
privada, identifica la dificultad y acuerda una acción
de seguimiento.
`
},

{
keys:["bajo rendimiento","rendimiento bajo","bajo desempeño"],
answer:`
<strong>Bajo rendimiento:</strong>

Observa cambios en:

• Entregas.
• Participación.
• Calidad.
• Comunicación.
• Fechas.

Después dialoga con el estudiante para identificar
qué puede estar ocurriendo.
`
},

{
keys:["desmotivado","falta motivacion","estudiante sin ganas"],
answer:`
<strong>Desmotivación:</strong>

No basta con decir "tú puedes".

Identifica qué está dificultando su participación,
reconoce avances y establece una meta concreta.
`
},

{
keys:["problema tecnico","problemas tecnologia","problema plataforma"],
answer:`
<strong>Problema técnico:</strong>

1. Escucha.
2. Identifica el problema.
3. Orienta sobre pasos básicos.
4. Busca alternativas.
5. Canaliza a soporte si es necesario.

No asumas automáticamente falta de compromiso.
`
},

{
keys:["no puede subir tarea","no puede entregar","no puede cargar"],
answer:`
Comprueba conexión, formato, tamaño del archivo y acceso
a Classroom.

Si continúa el problema, solicita información del error
y busca una alternativa o canalización.
`
},

{
keys:["sin internet","problema conectividad","no tiene internet"],
answer:`
Identifica qué acceso tiene disponible el estudiante.

Analiza cómo afecta la actividad y busca alternativas
razonables de acuerdo con las posibilidades del curso
y de la institución.
`
},

{
keys:["sin computadora","no tiene equipo","sin dispositivo"],
answer:`
Pregunta qué dispositivo tiene disponible.

Después identifica qué actividades puede realizar con él
y considera alternativas accesibles cuando sea posible.
`
},

{
keys:["muchas tareas","sobrecarga","muchas actividades"],
answer:`
Analiza la carga de trabajo y las fechas.

Ayuda a establecer prioridades y revisa si la distribución
de actividades e instrucciones es adecuada.
`
},

{
keys:["atrasado","estudiante atrasado","actividades atrasadas"],
answer:`
Ayuda al estudiante a identificar pendientes, prioridades
y fechas.

Después establezcan un plan de recuperación realista
y un momento de seguimiento.
`
},

{
keys:["poca participacion","no participa","grupo no participa"],
answer:`
Analiza las causas.

Puede existir una dificultad académica, técnica,
organizativa o de comunicación.

Propón actividades breves y canales claros de participación.
`
},

{
keys:["no responde","no contesta","no responde mensajes"],
answer:`
Realiza seguimiento respetuoso.

Revisa si existen actividades recientes, utiliza el canal
establecido y documenta el seguimiento conforme a los
procedimientos del curso.
`
},

{
keys:["problema personal","situacion personal","dificultad personal"],
answer:`
Escucha y mantén una comunicación respetuosa.

Si la situación supera el ámbito académico, orienta al
estudiante hacia los servicios institucionales correspondientes.

El tutor no debe asumir funciones profesionales para las
que no está preparado.
`
},

{
keys:["conflicto estudiantes","problema entre estudiantes","conflicto grupo"],
answer:`
Ante un conflicto:

1. Escucha las partes.
2. Evita asumir culpabilidades.
3. Mantén comunicación respetuosa.
4. Revisa normas.
5. Busca una solución educativa.
6. Canaliza si es necesario.
`
},

{
keys:["falta respeto","insulto","lenguaje irrespetuoso"],
answer:`
Establece límites claros y recuerda las normas de
convivencia digital.

Mantén una respuesta profesional y evita responder
mediante confrontación.
`
},

{
keys:["no entiende tema","dificultad academica","problema academico"],
answer:`
Identifica el concepto específico que presenta dificultad.

Después utiliza ejemplos, preguntas orientadoras,
recursos complementarios o actividades de refuerzo.
`
},

{
keys:["mismo error","muchos cometen error","error frecuente"],
answer:`
Si varios estudiantes cometen el mismo error, revisa
también la instrucción y el material.

Tal vez sea necesario agregar un ejemplo o reforzar
el contenido.
`
},

{
keys:["como retroalimentar","retroalimentacion","feedback estudiante"],
answer:`
Una buena fórmula es:

<strong>Reconocer → oportunidad de mejora → orientación.</strong>

Ejemplo:

"Tu definición es correcta. Falta relacionarla con un
ejemplo. Agrega una situación que muestre su aplicación."
`
},

{
keys:["calificacion baja","baja calificacion","mala calificacion"],
answer:`
Una calificación baja debe acompañarse de información
sobre qué necesita mejorar.

Explica fortalezas, dificultades y acciones concretas
de mejora.
`
},

{
keys:["estudiante discute calificacion","no esta de acuerdo","reclama calificacion"],
answer:`
Escucha el planteamiento y revisa los criterios de evaluación.

Explica cómo se obtuvo la calificación utilizando evidencias
y criterios previamente establecidos.
`
},

{
keys:["recalificar","revisar calificacion","quiere otra calificacion"],
answer:`
Revisa el trabajo y los criterios establecidos.

Si existe un error en la evaluación, corrígelo.

Si no existe, explica de manera clara la evidencia que
sustenta la calificación.
`
},

{
keys:["trabajo incompleto","actividad incompleta","tarea incompleta"],
answer:`
Identifica qué elementos están presentes y cuáles faltan.

Evita limitarte a decir "incompleto".

Explica qué falta y cómo puede completarlo.
`
},

{
keys:["entrega tarde","entrega tardia","fuera de fecha"],
answer:`
Revisa la política del curso.

Analiza la situación y aplica criterios consistentes.

Si existe una dificultad justificada, orienta sobre
las alternativas disponibles.
`
},

{
keys:["copio","plagio","trabajo copiado"],
answer:`
Ante una posible situación de deshonestidad académica,
aplica el procedimiento institucional.

Evita acusaciones públicas y documenta la situación
de acuerdo con las normas.
`
},

{
keys:["uso ia","inteligencia artificial tarea","trabajo con ia"],
answer:`
Si existe una duda sobre el uso de herramientas de IA,
revisa las reglas del curso y la evidencia disponible.

No afirmes que un detector por sí solo demuestra
deshonestidad. Utiliza criterios académicos y
procedimientos institucionales.
`
},

{
keys:["estudiante aislado","aislamiento","se siente solo"],
answer:`
Favorece la comunicación, interacción y participación.

Si el estudiante expresa una situación que requiere
atención especializada, canalízala al servicio correspondiente.
`
},

{
keys:["grupo muchas dudas","todos preguntan","muchas dudas"],
answer:`
Si muchos estudiantes preguntan lo mismo, revisa la
instrucción.

Puede ser útil publicar una explicación general,
un ejemplo o un recurso complementario.
`
},

{
keys:["instrucciones confusas","actividad confusa","no entienden actividad"],
answer:`
Revisa si las instrucciones explican:

• Qué hacer.
• Cómo hacerlo.
• Qué entregar.
• Qué recursos utilizar.
• Cuándo entregar.
• Cómo será evaluado.

Si muchos estudiantes tienen la misma duda, mejora
la instrucción.
`
},

{
keys:["antes del curso","preparar curso","antes iniciar"],
answer:`
Antes del curso:

• Organiza contenidos.
• Prepara recursos.
• Establece actividades.
• Define evaluación.
• Organiza fechas.
• Comprueba accesibilidad.
• Anticipa dificultades.
• Define canales de comunicación.
`
},

{
keys:["durante curso","acompañamiento curso","tutor durante"],
answer:`
Durante el curso debes:

• Orientar.
• Resolver dudas.
• Dar seguimiento.
• Comunicar.
• Retroalimentar.
• Motivar.
• Detectar dificultades.
`
},

{
keys:["despues curso","final curso","cerrar curso"],
answer:`
Al finalizar el curso:

• Revisa resultados.
• Analiza avances.
• Identifica dificultades recurrentes.
• Proporciona retroalimentación.
• Registra aprendizajes.
• Propón aspectos de mejora.
`
},

{
keys:["diagnostico inicial","diagnostico estudiantes","conocimientos previos"],
answer:`
El diagnóstico permite conocer los saberes previos,
necesidades y posibles dificultades del grupo.

Puede realizarse mediante preguntas, cuestionarios,
actividades o evidencias iniciales.
`
},

{
keys:["seguimiento","seguimiento academico","dar seguimiento"],
answer:`
El seguimiento implica observar:

• Entregas.
• Participación.
• Calidad.
• Fechas.
• Comunicación.
• Retroalimentación.
• Cambios en el desempeño.
`
},

{
keys:["plan seguimiento","plan tutorial","plan de seguimiento"],
answer:`
Un plan puede incluir:

1. Situación identificada.
2. Necesidad.
3. Acción tutorial.
4. Fecha.
5. Evidencia.
6. Seguimiento posterior.
`
},

{
keys:["evaluar","evaluacion tutor","como evaluar"],
answer:`
La evaluación puede utilizar:

• Rúbricas.
• Listas de cotejo.
• Cuestionarios.
• Proyectos.
• Actividades prácticas.
• Autoevaluación.
• Coevaluación.
`
},

{
keys:["motivacion","motivar estudiante","como motivar"],
answer:`
Motivar implica reconocer avances, detectar barreras,
favorecer participación y establecer metas alcanzables.

No consiste solamente en utilizar frases motivacionales.
`
},

{
keys:["facilitador","tutor facilitador","facilitar aprendizaje"],
answer:`
El tutor como facilitador ayuda mediante preguntas,
ejemplos, recursos, casos, actividades y retroalimentación.

No se limita a proporcionar respuestas.
`
},

{
keys:["comunicador","tutor comunicador","comunicacion"],
answer:`
La comunicación tutorial debe ser:

<strong>Clara + respetuosa + oportuna + pertinente.</strong>

Puede realizarse mediante anuncios, mensajes,
comentarios, correo o videoconferencias.
`
},

{
keys:["orientador","tutor orientador","orientar estudiante"],
answer:`
El tutor orientador ayuda al estudiante a comprender:

¿Qué debo hacer?
¿Cómo debo hacerlo?
¿Cuándo debo hacerlo?

La orientación debe facilitar que el estudiante avance
por sí mismo.
`
},

{
keys:["autonomia","favorecer autonomia","autonomia estudiante"],
answer:`
Para favorecer autonomía, el tutor debe permitir que
el estudiante tome decisiones, busque información,
resuelva problemas y evalúe sus avances.

Acompañar no significa hacer el trabajo.
`
},

{
keys:["que no debe hacer tutor","tutor no debe","errores tutor"],
answer:`
El tutor no debe:

• Hacer tareas.
• Ignorar dudas.
• Dar siempre respuestas directas.
• Utilizar retroalimentación genérica.
• Exponer situaciones personales.
• Etiquetar estudiantes.
• Diagnosticar situaciones clínicas.
`
},

{
keys:["docente es tutor","maestro tutor","profesor tutor"],
answer:`
Depende de la organización del programa.

Un docente puede realizar funciones tutoriales cuando
orienta, acompaña, responde dudas, revisa actividades
y proporciona retroalimentación.

También pueden existir tutores especializados.
`
},

{
keys:["canalizar","cuando canalizar","canalizacion"],
answer:`
Cuando una situación supera el ámbito académico o las
competencias del tutor, debe orientarse y canalizarse
hacia el servicio correspondiente.
`
},

{
keys:["privacidad","informacion personal","datos estudiante"],
answer:`
La información académica y personal debe manejarse
responsablemente.

Evita publicar situaciones particulares, calificaciones
o problemas personales en espacios públicos.
`
},

{
keys:["capacitar tutor","capacitacion docente","formacion tutor"],
answer:`
La formación tutorial debe considerar:

1. Dimensión pedagógica.
2. Dimensión tecnológica.
3. Dimensión comunicativa.
4. Dimensión tutorial.

No basta con aprender a utilizar una plataforma.
`
},

{
keys:["tutoria efectiva","buena tutoria","tutoria online efectiva"],
answer:`
Una tutoría efectiva debe ser:

• Clara.
• Oportuna.
• Respetuosa.
• Pertinente.
• Personalizada.
• Continua.
• Formativa.
• Orientada a la autonomía.
`
},

{
keys:["manual classroom docente","manual","manual classroom"],
answer:`
Puedes consultar el manual de apoyo de Google Classroom.

<a href="${MANUAL_URL}"
target="_blank"
rel="noopener noreferrer"
class="bot-link">

📘 ABRIR MANUAL DE CLASSROOM

</a>

<br><br>

Si necesitas orientación sobre una situación tutorial,
puedes continuar escribiendo aquí.
`
}

];


/* ============================================================
   MOTOR INTELIGENTE
============================================================ */

function generarRespuesta(texto) {

    const pregunta =
        normalizar(texto);


    /* RESPUESTAS SOCIALES */

    if (
        pregunta === "hola" ||
        pregunta.includes("buenos dias") ||
        pregunta.includes("buenas tardes") ||
        pregunta === "hey"
    ) {

        return `
        ¡Hola, <strong>${escapeHTML(nombreActual)}</strong>! 👋

        <br><br>

        Soy 🌟🤖 <strong>TUTIBOT</strong>.

        Cuéntame qué necesitas y buscaré una orientación
        dentro de mi base académica.
        `;

    }


    if (
        pregunta.includes("gracias") ||
        pregunta.includes("muchas gracias")
    ) {

        return `
        ¡Con gusto! 🌟

        Puedes continuar preguntándome.
        Si tu duda es diferente, escríbela con tus propias
        palabras y trataré de encontrar la orientación
        más adecuada.
        `;

    }


    const base =
        perfilActual === "estudiante"
            ? ESTUDIANTE
            : DOCENTE;


    let mejor = null;

    let mejorPuntaje = 0;


    /* =====================================================
       BUSCAR COINCIDENCIAS
    ===================================================== */

    base.forEach(item => {

        let puntaje = 0;


        item.keys.forEach(key => {

            const palabra =
                normalizar(key);


            /* Coincidencia exacta */

            if (
                pregunta === palabra
            ) {

                puntaje += 20;

            }


            /* Frase contenida */

            if (
                pregunta.includes(palabra)
            ) {

                puntaje +=
                    Math.min(
                        palabra.length / 2,
                        10
                    );

            }


            /* Palabras individuales */

            const partes =
                palabra.split(" ");


            partes.forEach(parte => {

                if (
                    parte.length >= 4 &&
                    pregunta.includes(parte)
                ) {

                    puntaje += 1;

                }

            });

        });


        if (
            puntaje > mejorPuntaje
        ) {

            mejorPuntaje =
                puntaje;

            mejor =
                item.answer;

        }

    });


    if (mejor) {

        return mejor;

    }


    return respuestaNoEncontrada();

}


/* ============================================================
   FALLBACK
============================================================ */

function respuestaNoEncontrada() {

    if (
        perfilActual === "estudiante"
    ) {

        return `

        <strong>🤖 Todavía estoy aprendiendo de esa pregunta.</strong>

        <br><br>

        Pero puedes describirme la situación con tus propias
        palabras.

        <br><br>

        Puedes escribir:

        <br>📘 <em>classroom</em>
        <br>📤 <em>como subo una tarea</em>
        <br>📚 <em>no entiendo mi actividad</em>
        <br>⏰ <em>tengo muchas tareas</em>
        <br>🎓 <em>que es la tutoria online</em>
        <br>📖 <em>manual classroom</em>

        <br><br>

        Si tu duda es diferente, escríbela y
        <strong>TUTIBOT continuará apoyándote en este mismo espacio.</strong>

        `;

    }


    return `

    <strong>🤖 No encontré una coincidencia exacta.</strong>

    <br><br>

    Describe la situación con un poco más de contexto.

    <br><br>

    Por ejemplo:

    <br>👨‍🏫 <em>Un estudiante no entrega tareas.</em>
    <br>📉 <em>Su rendimiento está bajando.</em>
    <br>💬 <em>No responde mis mensajes.</em>
    <br>📝 <em>¿Cómo debo retroalimentar?</em>
    <br>💻 <em>No puede subir una actividad.</em>
    <br>📘 <em>¿Cómo organizo mi Classroom?</em>

    <br><br>

    Intentaré encontrar la orientación más cercana
    dentro de mi base de tutoría.
    `;

}


/* ============================================================
   SUGERENCIAS
============================================================ */

function cargarSugerencias() {

    const contenedor =
        document.getElementById(
            "sugerencias"
        );


    contenedor.innerHTML = "";


    let opciones;


    if (
        perfilActual === "estudiante"
    ) {

        opciones = [

            "¿Qué es la tutoría online?",

            "¿Qué es Classroom?",

            "¿Cómo subo una actividad?",

            "No entiendo mi tarea",

            "Tengo muchas tareas",

            "Manual Classroom"

        ];

    } else {

        opciones = [

            "¿Qué es la tutoría online?",

            "¿Qué funciones tiene un tutor?",

            "¿Qué es un LMS?",

            "¿Cómo organizo Classroom?",

            "Un estudiante no entrega",

            "¿Cómo retroalimento?"

        ];

    }


    opciones.forEach(
        texto => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "suggestion";


            boton.textContent =
                texto;


            boton.onclick =
                () => {

                    document
                        .getElementById(
                            "userInput"
                        )
                        .value = texto;


                    enviarMensaje();

                };


            contenedor.appendChild(
                boton
            );

        }
    );

}


/* ============================================================
   TYPING
============================================================ */

function mostrarTyping() {

    document
        .getElementById("typing")
        .classList.remove(
            "hidden"
        );

}


function ocultarTyping() {

    document
        .getElementById("typing")
        .classList.add(
            "hidden"
        );

}


/* ============================================================
   EMOJI
============================================================ */

function insertarEmoji() {

    const input =
        document.getElementById(
            "userInput"
        );

    input.value += " 😊";

    input.focus();

}


/* ============================================================
   MANUAL
============================================================ */

function abrirManual() {

    document
        .getElementById(
            "modalManual"
        )
        .classList.remove(
            "hidden"
        );

}


function cerrarManual() {

    document
        .getElementById(
            "modalManual"
        )
        .classList.add(
            "hidden"
        );

}


function abrirPDF() {

    window.open(
        MANUAL_URL,
        "_blank",
        "noopener,noreferrer"
    );

}


/* ============================================================
   AYUDA
============================================================ */

function mostrarAyuda() {

    document
        .getElementById(
            "modalAyuda"
        )
        .classList.remove(
            "hidden"
        );

}


function cerrarModal() {

    document
        .getElementById(
            "modalAyuda"
        )
        .classList.add(
            "hidden"
        );

}


/* ============================================================
   CAMBIAR PERFIL
============================================================ */

function cambiarPerfil() {

    const confirmar =
        confirm(
            "¿Quieres cambiar de perfil?"
        );


    if (!confirmar) return;


    localStorage.removeItem(
        "tutibot_nombre"
    );

    localStorage.removeItem(
        "tutibot_perfil"
    );


    location.reload();

}


/* ============================================================
   REINICIAR CHAT
============================================================ */

function reiniciarChat() {

    const confirmar =
        confirm(
            "¿Quieres comenzar nuevamente la conversación?"
        );


    if (!confirmar) return;


    mostrarBienvenida();

}


/* ============================================================
   ESCAPAR HTML
============================================================ */

function escapeHTML(texto) {

    return texto

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}