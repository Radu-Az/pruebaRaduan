export const featureCards = [
  { id: "botiquines", title: "Botiquines", icon: "botiquin" },
  { id: "ayuda", title: "Ayuda", icon: "ayuda" },
  { id: "ereceta", title: "e-Receta", icon: "ereceta" },
  { id: "comunicacion", title: "Comunicacion", icon: "comunicacion" },
  { id: "libros", title: "Libros", icon: "libro" },
  { id: "vademecum", title: "Vademecum", icon: "vademecum" },
  { id: "consumo-antibioticos", title: "Consumo antibioticos", icon: "comunicacion" },
  { id: "almacenaje", title: "Almacenaje", icon: "almacenaje" }
];

export const services = [
  {
    id: "ereceta",
    title: "e-Receta",
    icon: "ereceta",
    description:
      "Receta electronica veterinaria con firma ejecutada con certificado digital de todas las partes, donde el veterinario prescribe con total seguridad recetas de medicamentos, piensos, botiquin, recetas de no dispensacion y autovacunas. Disponible para todos los perfiles de usuarios los cuales pueden acceder a ella con sus claves personalizadas: veterinario, ganadero, entidad, dispensador, fabrica pienso, etc."
  },
  {
    id: "comunicacion",
    title: "Comunicacion",
    icon: "comunicacion",
    description:
      "Comunicacion de las recetas de antibioticos conforme al nuevo R.D. 666/2023 a la plataforma Presvet del Mapa y a la plataforma GTR de Cataluna. Comunicacion tambien a Recevex de Extremadura y a Recevet de Andalucia conforme al registro del REGA de las explotaciones ganaderas."
  },
  {
    id: "libro-tratamientos",
    title: "Libro de tratamientos",
    icon: "libro",
    description:
      "Registro digital de todos los tratamientos que se realicen en la explotacion, prescritos previamente por el veterinario. Ordenado por especie y paginado de forma inviolable, permite de forma muy sencilla, agil y eficiente registrar y documentar todos los tratamientos que suceden en la explotacion (se permite introducir recetas externas)."
  },
  {
    id: "vademecum",
    title: "Vademecum",
    icon: "vademecum",
    description:
      "La guia de productos de salud animal a la que todo veterinario puede acceder y consultar. Vademecum veterinario para animales de compania y animales de produccion."
  },
  {
    id: "botiquin-veterinario",
    title: "Botiquin veterinario",
    icon: "botiquin",
    description:
      "Modulo de gestion del botiquin propio del veterinario con control de la trazabilidad del medicamento: registro de entradas y salidas, albaranes, stock e inventario, asi como elaboracion y prescripcion de las recetas de botiquin."
  },
  {
    id: "libro-visitas",
    title: "Libro de visitas",
    icon: "visitas",
    description:
      "Informacion sobre el registro diario de las visitas tanto para veterinarios como para ganaderos. Podras introducir y rellenar el libro y tenerlo siempre a disposicion para su comprobacion."
  },
  {
    id: "almacenaje",
    title: "Almacenaje",
    icon: "almacenaje",
    description:
      "Guardamos todas las recetas y documentos oficiales durante 5 anos y un dia, como exige la ley, para que puedas revisarlas o descargarlas cuando quieras."
  },
  {
    id: "ayuda",
    title: "Ayuda",
    icon: "ayuda",
    description:
      "Disponemos de un departamento de atencion al cliente personalizado y profesional para resolver dudas, errores o inquietudes de los usuarios de generarecetas, con respuestas eficaces y soluciones claras. Tambien se atienden mejoras y sugerencias que han permitido evolucionar la plataforma hasta ser lider en Espana y una referencia profesional en receta electronica y trazabilidad del medicamento."
  }
];

export const connections = [
  {
    id: "presvet",
    title: "Presvet",
    subtitle: "Plataforma MAPA",
    logo: "/images/logos/PresvetLogo.png",
    alt: "PresvetLogo"
  },
  {
    id: "gtr",
    title: "Sistema GTR",
    subtitle: "Gestion Telematica Ramadera",
    logo: null,
    alt: "Sistema GTR"
  },
  {
    id: "recevex",
    title: "RECEVEX",
    subtitle: "Receta Veterinaria de Extremadura",
    logo: null,
    alt: "RECEVEX"
  },
  {
    id: "recevet",
    title: "Recevet",
    subtitle: "Receta Veterinaria",
    logo: "/images/logos/RecevetLogo.png",
    alt: "RecevetLogo"
  }
];
