const createSubprofile = (slug, name) => ({
  slug,
  name
});

const defaultServicesIntro =
  "Tiene acceso a multiples servicios de manera sencilla accediendo a Generarecetas con su usuario y contrasena. Para ello necesitaras estar registrado. A continuacion, los servicios que incluye nuestra aplicacion:";

const defaultServices = [
  "e-Receta",
  "Pedidos",
  "Albaranes",
  "Guias",
  "Pesos medios",
  "Censos",
  "Especies",
  "Libro de tratamientos",
  "Libro de visitas",
  "Inspecciones",
  "Consumo antibiotico",
  "Avisos",
  "Asistencia",
  "Etc."
];

const profilePageDetails = {
  ganadero: {
    overview:
      "Perfil para persona que gestiona un REGA individualmente o de una sola ganaderia o pecuaria.",
    stats: [
      {
        label: "REGA",
        value: "1"
      },
      {
        label: "USUARIOS TIPO (posibles)",
        value: "1"
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: defaultServices
  },
  "agrupacion-ganadera": {
    overview:
      "Este perfil es idoneo para personas fisicas o juridicas que obtengan mas de una ganaderia o pecuaria.",
    stats: [
      {
        label: "REGA",
        value: "Mas de un REGA."
      },
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Puede tener 2 tipos de usuarios. Un administrador y otro por cada ganaderia."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: defaultServices
  },
  "otros-propietarios": {
    displayTitle: "Rehala, Coto, Corral domestico, etc.",
    overview:
      "Tutor, dueno o cuidador que quiera mantener la trazabilidad de medicamentos para pequenos animales, rehalas, cotos, corral domestico o autoconsumo.",
    stats: [
      {
        label: "REGA",
        value: "NO"
      },
      {
        label: "USUARIOS TIPO (posibles)",
        value: "1"
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: defaultServices
  },
  veterinario: {
    overview:
      "Persona que se halla legalmente autorizada para profesar y ejercer la veterinaria. Para poder prescribir a una ganaderia o pecuaria, previamente tiene que estar asignado a ella.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "1"
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: defaultServices
  },
  "servicios-veterinarios": {
    overview:
      "Personas fisicas o juridicas que obtengan mas de un veterinario y quieran administrar todo de manera correcta.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "1"
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: defaultServices
  },
  farmaceutico: {
    overview:
      "Persona que se halla legalmente autorizada para procesar y ejercer de farmaceutico con sus labores de supervision y control en la dispensacion de medicamentos veterinarios.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "1"
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "Supervision e-Recetas",
      "Validacion de las recetas prescritas y dispensadas",
      "Listado de salidas de medicamentos y piensos"
    ]
  },
  dispensador: {
    overview:
      "Comercializacion y distribucion de productos y servicios de salud animal.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Cabe la posibilidad de obtener 3 tipos de usuarios diferentes: Administrador (central), tecnico y/o delegacion (almacen)."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Especies",
      "Listado de salidas de medicamentos y piensos",
      "Informes",
      "Gestion almacenes",
      "Integracion en ERP para trazabilidad",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  },
  farmacia: {
    overview:
      "Comercializacion y distribucion de productos, medicamentos veterinarios y servicios de salud animal.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Cabe la posibilidad de obtener 2 tipos de usuarios diferentes: Administrador (central) y tecnico."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Especies",
      "Listado de salidas de medicamentos y piensos",
      "Informes",
      "Gestion almacenes",
      "Integracion en ERP para trazabilidad",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  },
  "entidad-integradora": {
    displayTitle: "Entidad - Integradora",
    overview:
      "Con y sin comercializacion y distribucion de productos, medicamentos veterinarios y servicios de salud animal. Incluye los servicios tecnicos y sanitarios que desarrollan a sus socios o integrados.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Cabe la posibilidad de obtener 4 tipos de usuarios diferentes: Administrador (central), tecnico, veterinario y ganadero."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Especies",
      "Pesos medios",
      "Censos",
      "Libro de tratamientos",
      "Libro de visitas",
      "Listado de salidas de medicamentos y piensos",
      "Informes",
      "Gestion almacenes",
      "Integracion en ERP para trazabilidad",
      "Inspecciones",
      "Consumo antibiotico",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  },
  cooperativa: {
    overview:
      "Con y sin comercializacion y distribucion de productos, medicamentos veterinarios y servicios de salud animal. Incluye los servicios tecnicos y sanitarios que desarrollan a sus socios o integrados.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Cabe la posibilidad de obtener 4 tipos de usuarios diferentes: Administrador (central), tecnico, veterinario y ganadero."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Especies",
      "Pesos medios",
      "Censos",
      "Libro de tratamientos",
      "Libro de visitas",
      "Listado de salidas de medicamentos y piensos",
      "Informes",
      "Gestion almacenes",
      "Integracion en ERP para trazabilidad",
      "Inspecciones",
      "Consumo antibiotico",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  },
  "clinica-veterinaria": {
    displayTitle: "Clinica veterinaria",
    overview:
      "Con y sin comercializacion y distribucion de productos, medicamentos veterinarios y servicios de salud animal. Incluye los servicios tecnicos y sanitarios que desarrollan a sus socios o integrados.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Cabe la posibilidad de obtener 2 tipos de usuarios diferentes: Administrador (central) y veterinario."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Guias",
      "Pesos medios",
      "Censos",
      "Especies",
      "Libro de tratamientos",
      "Inspecciones",
      "Consumo antibiotico",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  },
  fabrica: {
    displayTitle: "Fabrica",
    overview:
      "Fabricantes y distribuidores de piensos medicamentosos o blancos. Incluye los servicios tecnicos y sanitarios que desarrollan a sus socios, entidades o integrados.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "Cabe la posibilidad de obtener 3 tipos de usuarios diferentes: Administrador (central), tecnico y bascula."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Especies",
      "Pesos medios",
      "Censos",
      "Libro de tratamientos",
      "Libro de visitas",
      "Listado de salidas de medicamentos y piensos",
      "Balance de Nitrogeno",
      "Huella carbono de la fabrica pienso",
      "Informes",
      "Gestion almacenes",
      "Integracion en ERP para trazabilidad",
      "Inspecciones",
      "Consumo antibiotico",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  },
  laboratorio: {
    displayTitle: "Laboratorio",
    overview:
      "Con y sin comercializacion y distribucion de productos, medicamentos veterinarios y servicios de salud animal. Incluye los servicios tecnicos y sanitarios que desarrollan a sus socios o integrados.",
    stats: [
      {
        label: "USUARIOS TIPO (posibles)",
        value: "1 tipo de usuario: Administrador (central)."
      }
    ],
    servicesTitle: "Servicios",
    servicesIntro: defaultServicesIntro,
    services: [
      "e-Receta",
      "Pedidos",
      "Albaranes",
      "Especies",
      "Pesos medios",
      "Censos",
      "Libro de tratamientos",
      "Libro de visitas",
      "Listado de salidas de medicamentos y piensos",
      "Informes",
      "Gestion almacenes",
      "Integracion en ERP para trazabilidad",
      "Inspecciones",
      "Consumo antibiotico",
      "Avisos",
      "Asistencia",
      "Etc."
    ]
  }
};

export const profiles = [
  {
    id: "propietarios-animales",
    name: "Propietarios de animales",
    slug: null,
    image: "/images/PerfilPropAnimales.png",
    subprofiles: [
      createSubprofile("ganadero", "Ganadero/a"),
      createSubprofile("agrupacion-ganadera", "Agr. ganadera"),
      createSubprofile("otros-propietarios", "Otros")
    ]
  },
  {
    id: "profesionales",
    name: "Profesionales",
    slug: null,
    image: "/images/PerfilProfesionales.png",
    subprofiles: [
      createSubprofile("veterinario", "Veterinario/a"),
      createSubprofile("servicios-veterinarios", "Servicios Veterinarios"),
      createSubprofile("farmaceutico", "Farmaceutico")
    ]
  },
  {
    id: "comercializadoras",
    name: "Comercializadoras",
    slug: null,
    image: "/images/PerfilComercializadora.png",
    subprofiles: [
      createSubprofile("dispensador", "Dispensador"),
      createSubprofile("farmacia", "Farmacia")
    ]
  },
  {
    id: "entidades",
    name: "Entidades",
    slug: null,
    image: "/images/PerfilEntidades.png",
    subprofiles: [
      createSubprofile("entidad-integradora", "Entidad - integradora"),
      createSubprofile("cooperativa", "Cooperativa")
    ]
  },
  {
    id: "clinica-veterinaria",
    name: "Clinica veterinaria",
    slug: "clinica-veterinaria",
    image: "/images/PerfilClinicaVet.png",
    subprofiles: []
  },
  {
    id: "fabrica",
    name: "Fabrica",
    slug: "fabrica",
    image: "/images/PerfilFabrica.png",
    subprofiles: []
  },
  {
    id: "laboratorio",
    name: "Laboratorio",
    slug: "laboratorio",
    image: "/images/PerfilLaboratorio.png",
    subprofiles: []
  }
];

export const profilePages = profiles.flatMap((profile) => {
  if (profile.subprofiles.length > 0) {
    return profile.subprofiles.map((subprofile) => ({
      slug: subprofile.slug,
      title: subprofile.name,
      parentId: profile.id,
      parentName: profile.name,
      isSubprofile: true,
      detail: profilePageDetails[subprofile.slug] ?? null
    }));
  }

  return [
    {
      slug: profile.slug,
      title: profile.name,
      parentId: profile.id,
      parentName: null,
      isSubprofile: false,
      detail: profilePageDetails[profile.slug] ?? null
    }
  ];
});

export const getProfilePageBySlug = (slug) => profilePages.find((page) => page.slug === slug) ?? null;
