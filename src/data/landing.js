export const featureCards = [
  { id: "botiquines", title: "Botiquines", icon: "botiquin" },
  { id: "ayuda", title: "Ayuda", icon: "ayuda" },
  { id: "ereceta", title: "e-Receta", icon: "ereceta" },
  { id: "comunicacion", title: "Comunicación", icon: "comunicacion" },
  { id: "libros", title: "Libros", icon: "libro" },
  { id: "vademecum", title: "Vademecum", icon: "vademecum" },
  { id: "consumo-antibioticos", title: "Consumo antibióticos", icon: "comunicacion" },
  { id: "almacenaje", title: "Almacenaje", icon: "almacenaje" }
];

export const services = [
  {
    id: "ereceta",
    title: "e-Receta",
    icon: "ereceta",
    description:
      "Receta electrónica veterinaria con firma ejecutada con certificado digital de todas las partes, donde el veterinario prescribe con total seguridad recetas de medicamentos, piensos, botiquín, recetas de no dispensación y autovacunas. Disponible para todos los perfiles de usuarios los cuales pueden acceder a ella con sus claves personalizadas: veterinario, ganadero, entidad, dispensador, fábrica pienso, etc."
  },
  {
    id: "comunicacion",
    title: "Comunicación",
    icon: "comunicacion",
    description:
      "Comunicación de las recetas de antibióticos conforme al nuevo R.D. 666/2023 a la plataforma Presvet del Mapa y a la plataforma GTR de Cataluña. Comunicación también a Recevex de Extremadura y a Recevet de Andalucía conforme al registro del REGA de las explotaciones ganaderas."
  },
  {
    id: "libro-tratamientos",
    title: "Libro de tratamientos",
    icon: "libro",
    description:
      "Registro digital de todos los tratamientos que se realicen en la explotación, prescritos previamente por el veterinario. Ordenado por especie y paginado de forma inviolable, permite de forma muy sencilla, ágil y eficiente registrar y documentar todos los tratamientos que suceden en la explotación (se permite introducir recetas externas)."
  },
  {
    id: "vademecum",
    title: "Vademecum",
    icon: "vademecum",
    description:
      "La guía de productos de salud animal a la que todo veterinario puede acceder y consultar. Vademecum veterinario para animales de compañía y animales de producción."
  },
  {
    id: "botiquin-veterinario",
    title: "Botiquín veterinario",
    icon: "botiquin",
    description:
      "Módulo de gestión del botiquín propio del veterinario con control de la trazabilidad del medicamento: registro de entradas y salidas, albaranes, stock e inventario, así como elaboración y prescripción de las recetas de botiquín."
  },
  {
    id: "libro-visitas",
    title: "Libro de visitas",
    icon: "visitas",
    description:
      "Información sobre el registro diario de las visitas tanto para veterinarios como para ganaderos. Podrás introducir y rellenar el libro y tenerlo siempre a disposición para su comprobación."
  },
  {
    id: "almacenaje",
    title: "Almacenaje",
    icon: "almacenaje",
    description:
      "Guardamos todas las recetas y documentos oficiales durante 5 años y un día, como exige la ley, para que puedas revisarlas o descargarlas cuando quieras."
  },
  {
    id: "ayuda",
    title: "Ayuda",
    icon: "ayuda",
    description:
      "Disponemos de un departamento de atención al cliente personalizado y profesional para resolver dudas, errores o inquietudes de los usuarios de generarecetas, con respuestas eficaces y soluciones claras. También se atienden mejoras y sugerencias que han permitido evolucionar la plataforma hasta ser líder en España y una referencia profesional en receta electrónica y trazabilidad del medicamento."
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
    subtitle: "Gestión Telemática Ramadera",
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
